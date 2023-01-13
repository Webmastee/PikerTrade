import {
    get
} from "../get";
import {
    realTypeOf
} from "../real-type-of";
export function render(e, r = {}) {
    if ("string" != typeof e) throw new TypeError(`Invalid template! Template should be a "string" but ${realTypeOf(e)} was given.`);

    function t(e) {
        return t => {
            t = t.slice(e, -e).trim();
            return get(r, t) ? ? ""
        }
    }
    return e.replace(/\{\{\{([^}]+)\}\}\}/g, t(3)).replace(/\{\{([^}]+)\}\}/g, t(2))
}