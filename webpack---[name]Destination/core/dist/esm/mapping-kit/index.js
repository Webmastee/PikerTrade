import {
    get
} from "../get";
import {
    isDirective
} from "./is-directive";
import {
    render
} from "./placeholders";
import {
    realTypeOf,
    isObject,
    isArray
} from "../real-type-of";
import {
    removeUndefined
} from "../remove-undefined";
import validate from "./validate";
import {
    arrify
} from "../arrify";
const directives = {},
    directiveRegExp = /^@[a-z][a-zA-Z0-9]+$/;

function registerDirective(e, r) {
    if (!directiveRegExp.exec(e)) throw new Error(`"${e}" is an invalid directive name`);
    directives[e] = r
}

function registerStringDirective(e, r) {
    registerDirective(e, ((t, i) => {
        const o = resolve(t, i);
        if ("string" != typeof o) throw new Error(`${e}: expected string, got ${realTypeOf(o)}`);
        return r(o, i)
    }))
}

function runDirective(e, r) {
    const t = Object.keys(e).find((e => e.startsWith("@"))),
        i = directives[t],
        o = e[t];
    if ("function" != typeof i) throw new Error(`${t} is not a valid directive, got ${realTypeOf(i)}`);
    return i(o, r)
}

function resolve(e, r) {
    if (!isObject(e) && !isArray(e)) return e;
    if (isDirective(e)) return runDirective(e, r);
    if (Array.isArray(e)) return e.map((e => resolve(e, r)));
    const t = {};
    for (const i of Object.keys(e)) t[i] = resolve(e[i], r);
    return t
}
registerDirective("@if", ((e, r) => {
    let t = !1;
    if (!isObject(e)) throw new Error('@if requires an object with an "exists" key');
    if (!e.exists && !e.blank) throw new Error('@if requires an "exists" key or a "blank" key');
    if (void 0 !== e.exists) {
        const i = resolve(e.exists, r);
        t = null != i
    } else if (void 0 !== e.blank) {
        const i = resolve(e.blank, r);
        t = null != i && "" != i
    }
    return t && void 0 !== e.then ? resolve(e.then, r) : !t && e.else ? resolve(e.else, r) : void 0
})), registerDirective("@case", ((e, r) => {
    if (!isObject(e)) throw new Error('@case requires an object with a "operator" key');
    if (!e.operator) throw new Error('@case requires a "operator" key');
    const t = e.operator;
    if (e.value) {
        const i = resolve(e.value, r);
        if ("string" == typeof i) switch (t) {
            case "lower":
                return i.toLowerCase();
            case "upper":
                return i.toUpperCase();
            default:
                throw new Error('operator key should have a value of "lower" or "upper"')
        }
        return i
    }
})), registerDirective("@arrayPath", ((e, r) => {
    if (!Array.isArray(e)) throw new Error(`@arrayPath expected array, got ${realTypeOf(e)}`);
    const [t, i] = e, o = "string" == typeof t ? get(r, t.replace("$.", "")) : resolve(t, r);
    return ["object", "array"].includes(realTypeOf(o)) && "object" === realTypeOf(i) && Object.keys(i).length > 0 ? arrify(o).map((e => resolve(i, e))) : o
})), registerStringDirective("@path", ((e, r) => get(r, e.replace("$.", "")))), registerStringDirective("@template", ((e, r) => render(e, r))), registerDirective("@literal", ((e, r) => resolve(e, r)));
export function transform(e, r = {}) {
    const t = realTypeOf(r);
    if ("object" !== t) throw new Error(`data must be an object, got ${t}`);
    validate(e);
    const i = resolve(e, r);
    return removeUndefined(i)
}
export function transformBatch(e, r = []) {
    const t = realTypeOf(r);
    if (!isArray(r)) throw new Error(`data must be an array, got ${t}`);
    validate(e);
    const i = r.map((r => resolve(e, r)));
    return removeUndefined(i)
}