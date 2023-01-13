import {
    isObject
} from "./real-type-of";
export function removeUndefined(e) {
    if (Array.isArray(e)) return e.map((e => removeUndefined(e)));
    if (isObject(e)) {
        const r = Object.assign({}, e);
        return Object.keys(r).forEach((e => {
            void 0 === r[e] ? delete r[e] : r[e] = removeUndefined(r[e])
        })), r
    }
    return e
}