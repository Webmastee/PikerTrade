import {
    isArray,
    isObject
} from "./real-type-of";
export function arrify(r, e = !0) {
    return null == r ? e ? [] : r : isArray(r) ? r : [r]
}
export function arrifyFields(r, e = {}) {
    if (!isObject(r)) return r;
    if (!e.properties) return r;
    for (const t of Object.keys(r)) {
        const i = e.properties[t];
        i && ("array" === i.type && (r[t] = arrify(r[t], !1)))
    }
    return r
}