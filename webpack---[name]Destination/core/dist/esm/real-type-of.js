export function realTypeOf(r) {
    return Object.prototype.toString.call(r).slice(8, -1).toLowerCase()
}
export function isObject(r) {
    return "object" === realTypeOf(r)
}
export function isArray(r) {
    return Array.isArray(r)
}
export function isString(r) {
    return "string" == typeof r
}