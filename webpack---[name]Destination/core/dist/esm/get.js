export function get(r, e) {
    if ("" === e || "." === e) return r;
    if (null === e || null == e) return;
    return (Array.isArray(e) ? e : e.match(/([^[.\]])+/g)).reduce(((r, e) => r && r[e]), r)
}