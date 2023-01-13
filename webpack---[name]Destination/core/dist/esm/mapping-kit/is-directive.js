import {
    isObject
} from "../real-type-of";
export function isDirective(t) {
    if (!isObject(t)) return !1;
    const e = Object.keys(t);
    if (!e.some((t => t.startsWith("@")))) return !1;
    return 0 === e.filter((t => !t.startsWith("@") && "_metadata" !== t)).length
}