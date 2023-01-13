(self.webpackChunk_name_Destination = self.webpackChunk_name_Destination || []).push([
    [688], {
        6461: (e, t, r) => {
            "use strict";
            r.d(t, {
                R: () => n
            });
            const n = "-1"
        },
        936: (e, t, r) => {
            "use strict";
            r.d(t, {
                ZP: () => u
            });
            class n {
                constructor(e) {
                    this.code = e, this.position = 0
                }
                forward() {
                    if (this.code.length === this.position) return {
                        char: "",
                        isEOS: !0
                    };
                    const e = this.code.charAt(this.position);
                    return this.position += 1, {
                        char: e,
                        isEOS: !1
                    }
                }
                backward() {
                    if (0 === this.position) throw new RangeError;
                    const e = this.code.charAt(this.position);
                    return this.position -= 1, {
                        char: e,
                        isEOS: !1
                    }
                }
                getPosition() {
                    return this.position
                }
            }
            var o = r(5404),
                s = r(6461),
                a = r(9867);
            class i extends Error {
                constructor(e, t) {
                    super(e), this.message = e, this.name = "LexerError", this.stack = (new Error).stack, this.cursor = t
                }
            }

            function u(e) {
                try {
                    return {
                        tokens: new c(e).lex()
                    }
                } catch (e) {
                    return {
                        tokens: [],
                        error: e
                    }
                }
            }
            class c {
                constructor(e) {
                    this.reader = new n(e), this.cursor = {
                        line: 0,
                        column: 0
                    }
                }
                lex() {
                    const e = [];
                    for (;;) {
                        const {
                            char: t,
                            isEOS: r
                        } = this.next();
                        if (r) return e.push(o.t.EOS()), e;
                        if (!(0, a.cb)(t)) {
                            if ("!" === t) {
                                const t = this.peek();
                                if ((0, a.$9)(t) || "(" === t) {
                                    e.push(o.t.Operator("!"));
                                    continue
                                }
                            }
                            if ((0, a.$9)(t) || "!" === t || "=" === t || ">" === t || "<" === t || "\\" === t || "_" === t) e.push(this.lexOperatorOrConditional(t));
                            else if ((0, a.hj)(t) || "-" === t || "+" === t) e.push(this.lexNumber(t));
                            else if ('"' !== t && "'" !== t)
                                if ("." !== t)
                                    if ("[" !== t)
                                        if ("]" !== t)
                                            if ("," !== t)
                                                if ("(" !== t) {
                                                    if (")" !== t) throw new i(`invalid character "${t}"`, this.cursor);
                                                    e.push(o.t.ParenRight())
                                                } else e.push(o.t.ParenLeft());
                            else e.push(o.t.Comma());
                            else e.push(o.t.BrackRight());
                            else e.push(o.t.BrackLeft());
                            else e.push(o.t.Dot());
                            else e.push(this.lexString(t))
                        }
                    }
                }
                lexString(e) {
                    let t = "";
                    for (; this.peek() !== e;) {
                        const {
                            char: e,
                            isEOS: r
                        } = this.next();
                        if (t += e, r) throw new i("unterminated string", this.cursor);
                        if (t.length >= 1e5) throw new i("unreasonable string length", this.cursor)
                    }
                    return this.accept(e), o.t.String(`${e}${t}${e}`)
                }
                lexNumber(e) {
                    let t = "",
                        r = this.peek(),
                        n = !1;
                    for (;
                        (0, a.hj)(r) || "." === r;) {
                        const {
                            char: e
                        } = this.next();
                        if (t += e, "." === r) {
                            if ((0, a.CY)(this.peek())) throw new i("unexpected terminator after decimal point", this.cursor);
                            if (n) throw new i("multiple decimal points in one number", this.cursor);
                            n = !0
                        }
                        if (t.length >= 1e5) throw new i("unreasonable number length", this.cursor);
                        r = this.peek()
                    }
                    return o.t.Number(e + t)
                }
                lexOperatorOrConditional(e) {
                    if ("=" === e) return o.t.Operator("=");
                    if ("!" === e) {
                        if (this.accept("=")) return o.t.Operator("!=");
                        throw new i(`expected '=' after '!', got '${this.peek()}'`, this.cursor)
                    }
                    return "a" === e ? this.accept("nd") ? o.t.Conditional("and") : this.lexIdent(e) : "o" === e ? this.accept("r") ? o.t.Conditional("or") : this.lexIdent(e) : "n" === e ? this.accept("ull") ? o.t.Null() : this.lexIdent(e) : "<" === e || ">" === e ? this.accept("=") ? o.t.Operator(e + "=") : o.t.Operator(e) : this.lexIdent(e)
                }
                lexIdent(e) {
                    let t = "",
                        r = e;
                    for (;;) {
                        if ("\\" === r) {
                            if (this.peek() === s.R) throw new i("expected character after escape character, got EOS", this.cursor);
                            r = this.next().char
                        }
                        if (t += r, t.length >= 1e5) throw new i("unreasonable literal length", this.cursor);
                        if (!(0, a.pH)(this.peek())) break;
                        r = this.next().char
                    }
                    const n = this.peek();
                    if (n !== s.R && !(0, a.CY)(n) && "." !== n && "(" !== n && "=" !== n && "!" !== n) throw new i(`expected termination character after identifier, got ${n}`, this.cursor);
                    return o.t.Ident(t)
                }
                accept(e) {
                    let t = "";
                    for (const r of e) {
                        const {
                            char: e,
                            isEOS: r
                        } = this.next();
                        if (t += e, r) return !1;
                        if ((0, a.CY)(e)) break
                    }
                    return !(e !== t || !(0, a.CY)(this.peek())) || (this.backup(t.length), !1)
                }
                next() {
                    const {
                        char: e,
                        isEOS: t
                    } = this.reader.forward();
                    (0, a.K0)(e) ? (this.cursor.line += 1, this.cursor.column = 0) : this.cursor.column += 1;
                    return {
                        char: t ? s.R : e,
                        isEOS: t
                    }
                }
                peek() {
                    const {
                        char: e,
                        isEOS: t
                    } = this.next();
                    return t || this.backup(1), e
                }
                backup(e) {
                    for (let t = e; t > 0; t--) {
                        let e;
                        try {
                            e = this.reader.backward().char
                        } catch (e) {
                            return
                        }(0, a.K0)(e) ? (this.cursor.line -= 1, this.cursor.column = 0) : this.cursor.column -= 1
                    }
                }
            }
        },
        9867: (e, t, r) => {
            "use strict";
            r.d(t, {
                K0: () => o,
                cb: () => s,
                $9: () => a,
                hj: () => i,
                pH: () => u,
                CY: () => c
            });
            var n = r(6461);

            function o(e) {
                return "\r" === e || "\n" === e
            }

            function s(e) {
                return " " === e || "\t" === e || "\n" === e
            }

            function a(e) {
                return !!e.match(/[a-z]/i)
            }

            function i(e) {
                return e !== n.R && (!isNaN(parseFloat(e)) && isFinite(parseInt(e, 10)))
            }

            function u(e) {
                return e !== n.R && (a(e) || i(e) || "_" === e || "-" === e || "\\" === e)
            }

            function c(e) {
                return e === n.R || s(e) || "," === e || "]" === e || ")" === e
            }
        },
        5404: (e, t, r) => {
            "use strict";

            function n(e) {
                return void 0 !== e.type && "string" == typeof e.value
            }
            var o;
            r.d(t, {
                    h: () => n,
                    i: () => o,
                    t: () => s
                }),
                function(e) {
                    e.Err = "err", e.Ident = "ident", e.Dot = "dot", e.Operator = "operator", e.Conditional = "conditional", e.String = "string", e.Number = "number", e.Null = "null", e.BrackLeft = "brackleft", e.BrackRight = "brackright", e.ParenLeft = "parenleft", e.ParenRight = "parenright", e.Comma = "comma", e.EOS = "eos"
                }(o || (o = {}));
            const s = {
                Err: () => ({
                    type: o.Err,
                    value: "err"
                }),
                Ident: e => ({
                    type: o.Ident,
                    value: e
                }),
                Dot: () => ({
                    type: o.Dot,
                    value: "."
                }),
                Operator: e => ({
                    type: o.Operator,
                    value: e
                }),
                Conditional: e => ({
                    type: o.Conditional,
                    value: e
                }),
                String: e => ({
                    type: o.String,
                    value: e
                }),
                Number: e => ({
                    type: o.Number,
                    value: e
                }),
                Null: () => ({
                    type: o.Null,
                    value: "null"
                }),
                BrackLeft: () => ({
                    type: o.BrackLeft,
                    value: "["
                }),
                BrackRight: () => ({
                    type: o.BrackRight,
                    value: "]"
                }),
                ParenLeft: () => ({
                    type: o.ParenLeft,
                    value: "("
                }),
                ParenRight: () => ({
                    type: o.ParenRight,
                    value: ")"
                }),
                Comma: () => ({
                    type: o.Comma,
                    value: ","
                }),
                EOS: () => ({
                    type: o.EOS,
                    value: "eos"
                })
            }
        },
        1291: (e, t, r) => {
            "use strict";
            const n = r(6150),
                o = r(6086);
            class s extends Error {
                constructor(e) {
                    if (!Array.isArray(e)) throw new TypeError("Expected input to be an Array, got " + typeof e);
                    let t = (e = [...e].map((e => e instanceof Error ? e : null !== e && "object" == typeof e ? Object.assign(new Error(e.message), e) : new Error(e)))).map((e => "string" == typeof e.stack ? o(e.stack).replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "") : String(e))).join("\n");
                    t = "\n" + n(t, 4), super(t), this.name = "AggregateError", Object.defineProperty(this, "_errors", {
                        value: e
                    })
                }*[Symbol.iterator]() {
                    for (const e of this._errors) yield e
                }
            }
            e.exports = s
        },
        6086: (e, t, r) => {
            "use strict";
            const n = r(1209),
                o = /\s+at.*(?:\(|\s)(.*)\)?/,
                s = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/,
                a = void 0 === n.homedir ? "" : n.homedir();
            e.exports = (e, t) => (t = Object.assign({
                pretty: !1
            }, t), e.replace(/\\/g, "/").split("\n").filter((e => {
                const t = e.match(o);
                if (null === t || !t[1]) return !0;
                const r = t[1];
                return !r.includes(".app/Contents/Resources/electron.asar") && !r.includes(".app/Contents/Resources/default_app.asar") && !s.test(r)
            })).filter((e => "" !== e.trim())).map((e => t.pretty ? e.replace(o, ((e, t) => e.replace(t, t.replace(a, "~")))) : e)).join("\n"))
        },
        6150: e => {
            "use strict";
            e.exports = (e, t = 1, r) => {
                if (r = {
                        indent: " ",
                        includeEmptyLines: !1,
                        ...r
                    }, "string" != typeof e) throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
                if ("number" != typeof t) throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
                if ("string" != typeof r.indent) throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
                if (0 === t) return e;
                const n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
                return e.replace(n, r.indent.repeat(t))
            }
        },
        8688: (e, t, r) => {
            "use strict";
            r.r(t), r.d(t, {
                generatePlugins: () => w
            });
            var n = r(9476);

            function o(e, t, r) {
                if (!t) return r;
                const n = (Array.isArray(t) ? t : t.match(/([^[.\]])+/g)).reduce(((e, t) => e && e[t]), e);
                return void 0 === n ? r : n
            }
            const s = (e, t) => "and" === e.operator ? e.children.every((e => i(e, t))) : "or" === e.operator && e.children.some((e => i(e, t))),
                a = (e, t) => !e.error && void 0 !== t && s(e, t),
                i = (e, t) => "event-type" === e.type ? u(t.type, e.operator, e.value) : "event" === e.type ? u(t.event, e.operator, e.value) : "name" === e.type ? u(t.name, e.operator, e.value) : "userId" === e.type ? u(t.userId, e.operator, e.value) : "event-property" === e.type ? u(o(t.properties, e.name), e.operator, e.value) : "event-trait" === e.type ? u(o(t.traits, e.name), e.operator, e.value) : "event-context" === e.type ? u(o(t.context, e.name), e.operator, e.value) : "group" === e.type && s(e, t),
                u = (e, t, r) => {
                    switch (t) {
                        case "=":
                            return e === String(r);
                        case "!=":
                            return e !== String(r);
                        case "<":
                            return Number(e) < Number(r);
                        case "<=":
                            return Number(e) <= Number(r);
                        case ">":
                            return Number(e) > Number(r);
                        case ">=":
                            return Number(e) >= Number(r);
                        case "contains":
                            return "string" == typeof e && e.includes(String(r));
                        case "not_contains":
                            return "string" == typeof e && !e.includes(String(r));
                        case "starts_with":
                            return "string" == typeof e && e.startsWith(String(r));
                        case "not_starts_with":
                            return "string" == typeof e && !e.startsWith(String(r));
                        case "ends_with":
                            return "string" == typeof e && e.endsWith(String(r));
                        case "not_ends_with":
                            return "string" == typeof e && !e.endsWith(String(r));
                        case "exists":
                            return null != e;
                        case "not_exists":
                            return null == e;
                        case "is_true":
                            return "boolean" == typeof e && !0 === e;
                        case "is_false":
                            return "boolean" == typeof e && !1 === e;
                        default:
                            return !1
                    }
                };
            var c = r(5404),
                p = r(936);
            const l = {
                    type: "event-type",
                    event: "event",
                    name: "name",
                    userId: "userId",
                    context: "event-context",
                    properties: "event-property",
                    traits: "event-trait"
                },
                h = e => "string" === e.type ? e.value.replace(/^"/, "").replace(/"$/, "") : "number" === e.type ? Number(e.value) : "ident" === e.type && ["true", "false"].includes(e.value) ? "true" === e.value : String(e.value),
                f = e => "ident" === e.type && ["contains", "match"].includes(e.value),
                d = (e, t, r, {
                    negate: n
                } = {
                    negate: !1
                }) => {
                    if ("contains" === e) {
                        r.shift();
                        const e = r.shift();
                        if (!e) throw new Error("contains() is missing a 1st argument");
                        r.shift();
                        const o = r.shift();
                        if (!o) throw new Error("contains() is missing a 2nd argument");
                        r.shift(), ["event", "name", "userId"].includes(e.value) && t.push({
                            type: e.value,
                            operator: n ? "not_contains" : "contains",
                            value: String(h(o))
                        }), /^(properties)/.test(e.value) && t.push({
                            type: "event-property",
                            name: e.value.replace(/^(properties)\./, ""),
                            operator: n ? "not_contains" : "contains",
                            value: String(h(o))
                        }), /^(traits)/.test(e.value) && t.push({
                            type: "event-trait",
                            name: e.value.replace(/^(traits)\./, ""),
                            operator: n ? "not_contains" : "contains",
                            value: String(h(o))
                        }), /^(context)/.test(e.value) && t.push({
                            type: "event-context",
                            name: e.value.replace(/^(context)\./, ""),
                            operator: n ? "not_contains" : "contains",
                            value: String(h(o))
                        })
                    }
                    if ("match" === e) {
                        r.shift();
                        const e = r.shift();
                        if (!e) throw new Error("match() is missing a 1st argument");
                        r.shift();
                        const o = r.shift();
                        if (!o) throw new Error("match() is missing a 2nd argument");
                        let s, a;
                        r.shift(), o.value.endsWith('*"') ? (s = n ? "not_starts_with" : "starts_with", a = String(h(o)).slice(0, -1)) : (s = n ? "not_ends_with" : "ends_with", a = String(h(o)).slice(1)), ["event", "name", "userId"].includes(e.value) && t.push({
                            type: e.value,
                            operator: s,
                            value: a
                        }), /^(properties)/.test(e.value) && t.push({
                            type: "event-property",
                            name: e.value.replace(/^(properties)\./, ""),
                            operator: s,
                            value: a
                        }), /^(traits)/.test(e.value) && t.push({
                            type: "event-trait",
                            name: e.value.replace(/^(traits)\./, ""),
                            operator: s,
                            value: a
                        }), /^(context)/.test(e.value) && t.push({
                            type: "event-context",
                            name: e.value.replace(/^(context)\./, ""),
                            operator: s,
                            value: a
                        })
                    }
                },
                v = e => {
                    var t;
                    const r = [];
                    let n = "and",
                        o = e.shift();
                    for (; o && "eos" !== o.type;) {
                        if ("ident" === o.type) {
                            const [n] = (null !== (t = o.value) && void 0 !== t ? t : "").split("."), s = l[n];
                            if (s) {
                                const t = e.shift();
                                if (!t) throw new Error("Operator token is missing");
                                const n = e.shift();
                                if (!n) throw new Error("Value token is missing");
                                const a = "=" === t.value && "true" === n.value,
                                    i = "=" === t.value && "false" === n.value,
                                    u = "!=" === t.value && "null" === n.value,
                                    c = "=" === t.value && "null" === n.value;
                                "event" === s ? r.push({
                                    type: "event",
                                    operator: t.value,
                                    value: String(h(n))
                                }) : "event-type" === s ? r.push({
                                    type: "event-type",
                                    operator: t.value,
                                    value: String(h(n))
                                }) : "name" === s ? u ? r.push({
                                    type: "name",
                                    operator: "exists"
                                }) : c ? r.push({
                                    type: "name",
                                    operator: "not_exists"
                                }) : r.push({
                                    type: "name",
                                    operator: t.value,
                                    value: String(h(n))
                                }) : "userId" === s ? u ? r.push({
                                    type: "userId",
                                    operator: "exists"
                                }) : c ? r.push({
                                    type: "userId",
                                    operator: "not_exists"
                                }) : a ? r.push({
                                    type: "userId",
                                    operator: "is_true"
                                }) : i ? r.push({
                                    type: "userId",
                                    operator: "is_false"
                                }) : r.push({
                                    type: "userId",
                                    operator: t.value,
                                    value: String(h(n))
                                }) : "event-property" === s ? u ? r.push({
                                    type: "event-property",
                                    name: o.value.replace(/^(properties)\./, ""),
                                    operator: "exists"
                                }) : c ? r.push({
                                    type: "event-property",
                                    name: o.value.replace(/^(properties)\./, ""),
                                    operator: "not_exists"
                                }) : a ? r.push({
                                    type: "event-property",
                                    name: o.value.replace(/^(properties)\./, ""),
                                    operator: "is_true"
                                }) : i ? r.push({
                                    type: "event-property",
                                    name: o.value.replace(/^(properties)\./, ""),
                                    operator: "is_false"
                                }) : r.push({
                                    type: "event-property",
                                    name: o.value.replace(/^(properties)\./, ""),
                                    operator: t.value,
                                    value: h(n)
                                }) : "event-trait" === s ? u ? r.push({
                                    type: "event-trait",
                                    name: o.value.replace(/^(traits)\./, ""),
                                    operator: "exists"
                                }) : c ? r.push({
                                    type: "event-trait",
                                    name: o.value.replace(/^(traits)\./, ""),
                                    operator: "not_exists"
                                }) : a ? r.push({
                                    type: "event-trait",
                                    name: o.value.replace(/^(traits)\./, ""),
                                    operator: "is_true"
                                }) : i ? r.push({
                                    type: "event-trait",
                                    name: o.value.replace(/^(traits)\./, ""),
                                    operator: "is_false"
                                }) : r.push({
                                    type: "event-trait",
                                    name: o.value.replace(/^(traits)\./, ""),
                                    operator: t.value,
                                    value: h(n)
                                }) : "event-context" === s && (u ? r.push({
                                    type: "event-context",
                                    name: o.value.replace(/^(context)\./, ""),
                                    operator: "exists"
                                }) : c ? r.push({
                                    type: "event-context",
                                    name: o.value.replace(/^(context)\./, ""),
                                    operator: "not_exists"
                                }) : a ? r.push({
                                    type: "event-context",
                                    name: o.value.replace(/^(context)\./, ""),
                                    operator: "is_true"
                                }) : i ? r.push({
                                    type: "event-context",
                                    name: o.value.replace(/^(context)\./, ""),
                                    operator: "is_false"
                                }) : r.push({
                                    type: "event-context",
                                    name: o.value.replace(/^(context)\./, ""),
                                    operator: t.value,
                                    value: h(n)
                                }))
                            }
                            f(o) && d(o.value, r, e)
                        }
                        if ("operator" === o.type && "!" === o.value && f(e[0])) {
                            const t = e[0].value;
                            e.shift(), d(t, r, e, {
                                negate: !0
                            })
                        }
                        if ("parenleft" === o.type) {
                            const t = [];
                            let n = e.shift();
                            for (;
                                "parenright" !== n.type;) t.push(n), n = e.shift();
                            t.push({
                                type: c.i.EOS,
                                value: "eos"
                            }), r.push(v(t))
                        }
                        "conditional" === o.type && (n = o.value), o = e.shift()
                    }
                    return r.length > 1 ? {
                        type: "group",
                        operator: n,
                        children: r
                    } : r[0]
                },
                y = e => {
                    try {
                        const t = v((e => {
                            const t = [];
                            let r = 0;
                            for (; e[r];) {
                                const n = t[t.length - 1],
                                    o = e[r],
                                    s = e[r + 1];
                                if ("ident" === (null == n ? void 0 : n.type) && "dot" === o.type && "ident" === (null == s ? void 0 : s.type)) {
                                    const e = t.pop();
                                    t.push({
                                        type: c.i.Ident,
                                        value: `${null==e?void 0:e.value}${o.value}${s.value}`
                                    }), r += 2
                                } else t.push(e[r]), r++
                            }
                            return t
                        })((0, p.ZP)(e).tokens));
                        return "group" !== t.type ? {
                            type: "group",
                            operator: "and",
                            children: [t]
                        } : t
                    } catch (t) {
                        return {
                            error: t instanceof Error ? t : new Error(`Error while parsing ${e}`)
                        }
                    }
                };
            async function g(e, t) {
                const r = Array.from(window.document.querySelectorAll("script")).find((t => t.src === e));
                if (void 0 !== r) {
                    const e = r ? .getAttribute("status");
                    if ("loaded" === e) return r;
                    if ("loading" === e) return new Promise(((e, t) => {
                        r.addEventListener("load", (() => e(r))), r.addEventListener("error", (e => t(e)))
                    }))
                }
                return new Promise(((r, n) => {
                    const o = window.document.createElement("script");
                    o.type = "text/javascript", o.src = e, o.async = !0, o.setAttribute("status", "loading");
                    for (const [e, r] of Object.entries(t ? ? {})) o.setAttribute(e, r);
                    o.onload = () => {
                        o.onerror = o.onload = null, o.setAttribute("status", "loaded"), r(o)
                    }, o.onerror = () => {
                        o.onerror = o.onload = null, o.setAttribute("status", "error"), n(new Error(`Failed to load ${e}`))
                    };
                    const s = window.document.getElementsByTagName("script")[0];
                    s.parentElement ? .insertBefore(o, s)
                }))
            }
            async function m(e, t) {
                return new Promise(((r, n) => {
                    if (e()) return void r();
                    const o = () => setTimeout((() => {
                        e() ? r() : o()
                    }), t);
                    o()
                }))
            }

            function w(e, t, r) {
                let o, s, i, u = !1;
                const c = async (r, n) => {
                    u || (i ? await i : (s = n, i = e.initialize ? .({
                        settings: t,
                        analytics: s
                    }, {
                        loadScript: g,
                        resolveWhen: m
                    }), o = await i, u = !0))
                };
                return Object.entries(e.actions).reduce(((i, [p, l]) => {
                    const h = r.filter((e => e.enabled && e.partnerAction === p));
                    if (0 === h.length) return i;
                    async function f(e) {
                        const r = [];
                        for (const i of h) {
                            if (!a(y(i.subscribe), e.event)) continue;
                            const u = i.mapping ? ? {},
                                c = {
                                    payload: (0, n.v)(u, e.event),
                                    mapping: u,
                                    settings: t,
                                    analytics: s,
                                    context: e
                                };
                            r.push(l.perform(o, c))
                        }
                        return await Promise.all(r), e
                    }
                    const d = {
                        name: `${e.name} ${p}`,
                        type: l.lifecycleHook ? ? "destination",
                        version: "0.1.0",
                        ready: () => Promise.resolve(),
                        isLoaded: () => u,
                        load: c,
                        track: f,
                        page: f,
                        alias: f,
                        identify: f,
                        group: f
                    };
                    return i.push(d), i
                }), [])
            }
        },
        9476: (e, t, r) => {
            "use strict";

            function n(e, t) {
                return "" === t || "." === t ? e : null !== t && null != t ? (Array.isArray(t) ? t : t.match(/([^[.\]])+/g)).reduce(((e, t) => e && e[t]), e) : void 0
            }
            r.d(t, {
                v: () => P
            });
            var o = r(6933);

            function s(e) {
                if (!(0, o.Kn)(e)) return !1;
                const t = Object.keys(e);
                return !!t.some((e => e.startsWith("@"))) && 0 === t.filter((e => !e.startsWith("@") && "_metadata" !== e)).length
            }

            function a(e) {
                if (Array.isArray(e)) return e.map((e => a(e)));
                if ((0, o.Kn)(e)) {
                    const t = Object.assign({}, e);
                    return Object.keys(t).forEach((e => {
                        void 0 === t[e] ? delete t[e] : t[e] = a(t[e])
                    })), t
                }
                return e
            }
            var i = r(1291),
                u = r.n(i),
                c = r(2501);
            class p extends c.CustomError {
                constructor(e, t = []) {
                    super(`/${t.join("/")} ${e}.`)
                }
            }

            function l(e) {
                const t = [];
                return e.forEach((e => {
                    e instanceof u() ? t.push(...e) : t.push(e)
                })), t
            }

            function h(e) {
                const t = (0, o.X6)(e);
                return "object" === t && Object.keys(e).some((e => e.startsWith("@"))) ? "directive" : t
            }
            const f = {};

            function d(e, t = []) {
                if (!s(e) && !(0, o.Kn)(e)) {
                    const r = (0, o.X6)(e);
                    throw new p(`should be a directive object but it is ${E(r)} ${r}`, t)
                }
                const r = Object.keys(e),
                    n = r.filter((e => e.startsWith("@")));
                if (n.length > 1) throw new p(`should only have one @-prefixed key but it has ${n.length} keys`, t);
                if (r.filter((e => !e.startsWith("@") && "_metadata" !== e)).length > 0) throw new p(`should only have one @-prefixed key but it has ${r.length} keys`, t);
                const a = n[0],
                    i = f[a];
                if ("function" != typeof i) throw new p(`has an invalid directive: ${a}`, t);
                i(e[a], t)
            }

            function v(e, t = []) {
                const r = h(e);
                switch (r) {
                    case "directive":
                        return d(e, t);
                    case "object":
                    case "array":
                    case "boolean":
                    case "string":
                    case "number":
                    case "null":
                        return;
                    default:
                        throw new p(`should be a mapping directive or a JSON value but it is ${E(r)} ${r}`, t)
                }
            }

            function y(e, t = []) {
                const r = h(e);
                switch (r) {
                    case "directive":
                        return d(e, t);
                    case "string":
                        return;
                    default:
                        throw new p(`should be a string or a mapping directive but it is ${E(r)} ${r}`, t)
                }
            }

            function g(e, t = []) {
                const r = h(e);
                if ("string" !== r) throw new p(`should be a string but it is ${E(r)} ${r}`, t)
            }

            function m(e, t = []) {
                const r = h(e);
                if ("object" !== r) throw new p(`should be an object but it is ${E(r)} ${r}`, t);
                const n = e,
                    o = Object.keys(n),
                    s = o.find((e => "@" === e.charAt(0)));
                if (s) throw new p(`shouldn't have directive (@-prefixed) keys but it has ${JSON.stringify(s)}`, t);
                const a = [];
                if (o.forEach((e => {
                        try {
                            k(n[e], [...t, e])
                        } catch (e) {
                            a.push(e)
                        }
                    })), a.length) throw new(u())(l(a))
            }

            function w(e, t, r = []) {
                m(e, r);
                const n = [],
                    o = e;
                if (Object.entries(t).forEach((([e, {
                        required: t,
                        optional: s
                    }]) => {
                        try {
                            if (t) {
                                if (void 0 === o[e]) throw new p(`should have field ${JSON.stringify(e)} but it doesn't`, r);
                                t(o[e], [...r, e])
                            } else s && void 0 !== o[e] && s(o[e], [...r, e])
                        } catch (e) {
                            n.push(e)
                        }
                    })), n.length) throw new(u())(l(n))
            }

            function b(e, t = []) {
                const r = (0, o.X6)(e);
                if ("array" !== r) throw new p(`should be an array but it is ${E(r)} ${r}`, t)
            }

            function x(e, t) {
                Array.isArray(e) || (e = [e]), e.forEach((e => {
                    f[e] = (r, n = []) => {
                        try {
                            t(r, [...n, e])
                        } catch (e) {
                            if (e instanceof p || e instanceof u()) throw e;
                            throw new p(e.message, n)
                        }
                    }
                }))
            }

            function E(e) {
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

            function k(e, t = []) {
                switch (h(e)) {
                    case "directive":
                        return d(e, t);
                    case "object":
                        return m(e, t);
                    case "array":
                        return b(e, t);
                    default:
                        return null
                }
            }

            function O(e, t = !0) {
                return null == e ? t ? [] : e : (0, o.kJ)(e) ? e : [e]
            }
            x("@if", ((e, t) => {
                w(e, {
                    exists: {
                        optional: v
                    },
                    then: {
                        optional: v
                    },
                    else: {
                        optional: v
                    }
                }, t)
            })), x("@case", ((e, t) => {
                w(e, {
                    operator: {
                        optional: g
                    },
                    value: {
                        optional: y
                    }
                }, t)
            })), x("@arrayPath", ((e, t) => {
                const r = e;
                b(r, t), y(r[0], t), k(r[1], t)
            })), x("@path", ((e, t) => {
                y(e, t)
            })), x("@template", ((e, t) => {
                y(e, t)
            })), x("@literal", ((e, t) => {
                v(e, t)
            }));
            const _ = {},
                $ = /^@[a-z][a-zA-Z0-9]+$/;

            function S(e, t) {
                if (!$.exec(e)) throw new Error(`"${e}" is an invalid directive name`);
                _[e] = t
            }

            function j(e, t) {
                S(e, ((r, n) => {
                    const s = A(r, n);
                    if ("string" != typeof s) throw new Error(`${e}: expected string, got ${(0,o.X6)(s)}`);
                    return t(s, n)
                }))
            }

            function A(e, t) {
                if (!(0, o.Kn)(e) && !(0, o.kJ)(e)) return e;
                if (s(e)) return function(e, t) {
                    const r = Object.keys(e).find((e => e.startsWith("@"))),
                        n = _[r],
                        s = e[r];
                    if ("function" != typeof n) throw new Error(`${r} is not a valid directive, got ${(0,o.X6)(n)}`);
                    return n(s, t)
                }(e, t);
                if (Array.isArray(e)) return e.map((e => A(e, t)));
                const r = {};
                for (const n of Object.keys(e)) r[n] = A(e[n], t);
                return r
            }

            function P(e, t = {}) {
                const r = (0, o.X6)(t);
                if ("object" !== r) throw new Error(`data must be an object, got ${r}`);
                k(e);
                return a(A(e, t))
            }
            S("@if", ((e, t) => {
                let r = !1;
                if (!(0, o.Kn)(e)) throw new Error('@if requires an object with an "exists" key');
                if (!e.exists && !e.blank) throw new Error('@if requires an "exists" key or a "blank" key');
                if (void 0 !== e.exists) {
                    r = null != A(e.exists, t)
                } else if (void 0 !== e.blank) {
                    const n = A(e.blank, t);
                    r = null != n && "" != n
                }
                return r && void 0 !== e.then ? A(e.then, t) : !r && e.else ? A(e.else, t) : void 0
            })), S("@case", ((e, t) => {
                if (!(0, o.Kn)(e)) throw new Error('@case requires an object with a "operator" key');
                if (!e.operator) throw new Error('@case requires a "operator" key');
                const r = e.operator;
                if (e.value) {
                    const n = A(e.value, t);
                    if ("string" == typeof n) switch (r) {
                        case "lower":
                            return n.toLowerCase();
                        case "upper":
                            return n.toUpperCase();
                        default:
                            throw new Error('operator key should have a value of "lower" or "upper"')
                    }
                    return n
                }
            })), S("@arrayPath", ((e, t) => {
                if (!Array.isArray(e)) throw new Error(`@arrayPath expected array, got ${(0,o.X6)(e)}`);
                const [r, s] = e, a = "string" == typeof r ? n(t, r.replace("$.", "")) : A(r, t);
                return ["object", "array"].includes((0, o.X6)(a)) && "object" === (0, o.X6)(s) && Object.keys(s).length > 0 ? O(a).map((e => A(s, e))) : a
            })), j("@path", ((e, t) => n(t, e.replace("$.", "")))), j("@template", ((e, t) => function(e, t = {}) {
                if ("string" != typeof e) throw new TypeError(`Invalid template! Template should be a "string" but ${(0,o.X6)(e)} was given.`);

                function r(e) {
                    return r => (r = r.slice(e, -e).trim(), n(t, r) ? ? "")
                }
                return e.replace(/\{\{\{([^}]+)\}\}\}/g, r(3)).replace(/\{\{([^}]+)\}\}/g, r(2))
            }(e, t))), S("@literal", ((e, t) => A(e, t)))
        },
        6933: (e, t, r) => {
            "use strict";

            function n(e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
            }

            function o(e) {
                return "object" === n(e)
            }

            function s(e) {
                return Array.isArray(e)
            }
            r.d(t, {
                X6: () => n,
                Kn: () => o,
                kJ: () => s
            })
        },
        1209: () => {},
        2501: (e, t, r) => {
            "use strict";

            function n(e, t) {
                void 0 === t && (t = e.constructor);
                var r = Error.captureStackTrace;
                r && r(e, t)
            }
            r.r(t), r.d(t, {
                CustomError: () => a,
                customErrorFactory: () => u
            });
            var o, s = (o = function(e, t) {
                    return o = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                    }, o(e, t)
                }, function(e, t) {
                    function r() {
                        this.constructor = e
                    }
                    o(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
                }),
                a = function(e) {
                    function t(t) {
                        var r, o, s, a = this.constructor,
                            i = e.call(this, t) || this;
                        return Object.defineProperty(i, "name", {
                            value: a.name,
                            enumerable: !1,
                            configurable: !0
                        }), r = i, o = a.prototype, (s = Object.setPrototypeOf) ? s(r, o) : r.__proto__ = o, n(i), i
                    }
                    return s(t, e), t
                }(Error),
                i = function() {
                    for (var e = arguments, t = 0, r = 0, n = arguments.length; r < n; r++) t += e[r].length;
                    var o = Array(t),
                        s = 0;
                    for (r = 0; r < n; r++)
                        for (var a = arguments[r], i = 0, u = a.length; i < u; i++, s++) o[s] = a[i];
                    return o
                };

            function u(e, t) {
                function r() {
                    for (var o = arguments, s = [], a = 0; a < arguments.length; a++) s[a] = o[a];
                    if (!(this instanceof r)) return new(r.bind.apply(r, i([void 0], s)));
                    t.apply(this, s), Object.defineProperty(this, "name", {
                        value: e.name || t.name,
                        enumerable: !1,
                        configurable: !0
                    }), e.apply(this, s), n(this, r)
                }
                return void 0 === t && (t = Error), Object.defineProperties(r, {
                    prototype: {
                        value: Object.create(t.prototype, {
                            constructor: {
                                value: r,
                                writable: !0,
                                configurable: !0
                            }
                        })
                    }
                })
            }
        }
    }
]);
//# sourceMappingURL=688.js.map