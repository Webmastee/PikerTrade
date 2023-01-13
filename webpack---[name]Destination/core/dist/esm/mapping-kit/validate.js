import AggregateError from "aggregate-error";
import {
    CustomError
} from "ts-custom-error";
import {
    isDirective
} from "./is-directive";
import {
    isObject,
    realTypeOf
} from "../real-type-of";
class ValidationError extends CustomError {
    constructor(e, t = []) {
        super(`/${t.join("/")} ${e}.`)
    }
}

function flatAggregate(e) {
    const t = [];
    return e.forEach((e => {
        e instanceof AggregateError ? t.push(...e) : t.push(e)
    })), t
}

function realTypeOrDirective(e) {
    const t = realTypeOf(e);
    return "object" === t && Object.keys(e).some((e => e.startsWith("@"))) ? "directive" : t
}
const directives = {};

function validateDirective(e, t = []) {
    if (!isDirective(e) && !isObject(e)) {
        const i = realTypeOf(e);
        throw new ValidationError(`should be a directive object but it is ${indefiniteArticle(i)} ${i}`, t)
    }
    const i = Object.keys(e),
        r = i.filter((e => e.startsWith("@")));
    if (r.length > 1) throw new ValidationError(`should only have one @-prefixed key but it has ${r.length} keys`, t);
    if (i.filter((e => !e.startsWith("@") && "_metadata" !== e)).length > 0) throw new ValidationError(`should only have one @-prefixed key but it has ${i.length} keys`, t);
    const a = r[0],
        n = directives[a];
    if ("function" != typeof n) throw new ValidationError(`has an invalid directive: ${a}`, t);
    n(e[a], t)
}

function validateDirectiveOrRaw(e, t = []) {
    const i = realTypeOrDirective(e);
    switch (i) {
        case "directive":
            return validateDirective(e, t);
        case "object":
        case "array":
        case "boolean":
        case "string":
        case "number":
        case "null":
            return;
        default:
            throw new ValidationError(`should be a mapping directive or a JSON value but it is ${indefiniteArticle(i)} ${i}`, t)
    }
}

function validateDirectiveOrString(e, t = []) {
    const i = realTypeOrDirective(e);
    switch (i) {
        case "directive":
            return validateDirective(e, t);
        case "string":
            return;
        default:
            throw new ValidationError(`should be a string or a mapping directive but it is ${indefiniteArticle(i)} ${i}`, t)
    }
}

function validateString(e, t = []) {
    const i = realTypeOrDirective(e);
    if ("string" !== i) throw new ValidationError(`should be a string but it is ${indefiniteArticle(i)} ${i}`, t)
}

function validateObject(e, t = []) {
    const i = realTypeOrDirective(e);
    if ("object" !== i) throw new ValidationError(`should be an object but it is ${indefiniteArticle(i)} ${i}`, t);
    const r = e,
        a = Object.keys(r),
        n = a.find((e => "@" === e.charAt(0)));
    if (n) throw new ValidationError(`shouldn't have directive (@-prefixed) keys but it has ${JSON.stringify(n)}`, t);
    const o = [];
    if (a.forEach((e => {
            try {
                validate(r[e], [...t, e])
            } catch (e) {
                o.push(e)
            }
        })), o.length) throw new AggregateError(flatAggregate(o))
}

function validateObjectWithFields(e, t, i = []) {
    validateObject(e, i);
    const r = [],
        a = e;
    if (Object.entries(t).forEach((([e, {
            required: t,
            optional: n
        }]) => {
            try {
                if (t) {
                    if (void 0 === a[e]) throw new ValidationError(`should have field ${JSON.stringify(e)} but it doesn't`, i);
                    t(a[e], [...i, e])
                } else n && void 0 !== a[e] && n(a[e], [...i, e])
            } catch (e) {
                r.push(e)
            }
        })), r.length) throw new AggregateError(flatAggregate(r))
}

function validateArray(e, t = []) {
    const i = realTypeOf(e);
    if ("array" !== i) throw new ValidationError(`should be an array but it is ${indefiniteArticle(i)} ${i}`, t)
}

function directive(e, t) {
    Array.isArray(e) || (e = [e]), e.forEach((e => {
        directives[e] = (i, r = []) => {
            try {
                t(i, [...r, e])
            } catch (e) {
                if (e instanceof ValidationError || e instanceof AggregateError) throw e;
                throw new ValidationError(e.message, r)
            }
        }
    }))
}

function indefiniteArticle(e) {
    switch (e.charAt(0)) {
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
            return "an";
        default:
            return "a"
    }
}
directive("@if", ((e, t) => {
    validateObjectWithFields(e, {
        exists: {
            optional: validateDirectiveOrRaw
        },
        then: {
            optional: validateDirectiveOrRaw
        },
        else: {
            optional: validateDirectiveOrRaw
        }
    }, t)
})), directive("@case", ((e, t) => {
    validateObjectWithFields(e, {
        operator: {
            optional: validateString
        },
        value: {
            optional: validateDirectiveOrString
        }
    }, t)
})), directive("@arrayPath", ((e, t) => {
    const i = e;
    validateArray(i, t), validateDirectiveOrString(i[0], t), validate(i[1], t)
})), directive("@path", ((e, t) => {
    validateDirectiveOrString(e, t)
})), directive("@template", ((e, t) => {
    validateDirectiveOrString(e, t)
})), directive("@literal", ((e, t) => {
    validateDirectiveOrRaw(e, t)
}));
export default function validate(e, t = []) {
    switch (realTypeOrDirective(e)) {
        case "directive":
            return validateDirective(e, t);
        case "object":
            return validateObject(e, t);
        case "array":
            return validateArray(e, t);
        default:
            return null
    }
}