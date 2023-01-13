(self.webpackChunk_segment_analytics_next = self.webpackChunk_segment_analytics_next || []).push([
    [464], {
        9254: function(t, n, i) {
            "use strict";

            function e(t, n) {
                var i, e;
                return "boolean" == typeof(null == n ? void 0 : n.enabled) ? n.enabled : null === (e = null === (i = null == t ? void 0 : t.__default) || void 0 === i ? void 0 : i.enabled) || void 0 === e || e
            }
            i.d(n, {
                n: function() {
                    return e
                }
            })
        },
        3252: function(t, n, i) {
            "use strict";
            i.r(n), i.d(n, {
                LegacyDestination: function() {
                    return P
                },
                ajsDestinations: function() {
                    return k
                }
            });
            var e = i(5163),
                r = i(4122),
                o = i(94),
                s = i(7547),
                a = i(204),
                u = i(1365),
                c = i(5346),
                l = i(9254),
                d = i(5944),
                h = i(8044),
                f = i(4443),
                v = i(3061),
                p = i(6338),
                g = i(7566),
                m = i(7070);

            function y(t) {
                return t.toLowerCase().replace(".", "").replace(/\s+/g, "-")
            }

            function w(t, n) {
                return void 0 === n && (n = !1), n ? btoa(t).replace(/=/g, "") : void 0
            }

            function b(t, n, i, r, o, s) {
                return (0, e.mG)(this, void 0, Promise, (function() {
                    var a, u, c, l, d, h, f, v;
                    return (0, e.Jh)(this, (function(p) {
                        switch (p.label) {
                            case 0:
                                a = y(i), u = w(a, s), c = (0, g.Kg)(), l = "".concat(c, "/integrations/").concat(null != u ? u : a, "/").concat(r, "/").concat(null != u ? u : a, ".dynamic.js.gz"), p.label = 1;
                            case 1:
                                return p.trys.push([1, 3, , 4]), [4, (0, m.v)(l)];
                            case 2:
                                return p.sent(),
                                    function(t, n, i) {
                                        var r, o;
                                        try {
                                            var s = (null !== (o = null === (r = null === window || void 0 === window ? void 0 : window.performance) || void 0 === r ? void 0 : r.getEntriesByName(t, "resource")) && void 0 !== o ? o : [])[0];
                                            s && n.stats.gauge("legacy_destination_time", Math.round(s.duration), (0, e.ev)([i], s.duration < 100 ? ["cached"] : [], !0))
                                        } catch (t) {}
                                    }(l, t, i), [3, 4];
                            case 3:
                                throw d = p.sent(), t.stats.gauge("legacy_destination_time", -1, ["plugin:".concat(i), "failed"]), d;
                            case 4:
                                return h = window["".concat(a, "Deps")], [4, Promise.all(h.map((function(t) {
                                    return (0, m.v)(c + t + ".gz")
                                })))];
                            case 5:
                                return p.sent(), window["".concat(a, "Loader")](), (f = window["".concat(a, "Integration")]).Integration && (f({
                                    user: function() {
                                        return n.user()
                                    },
                                    addIntegration: function() {}
                                }), f = f.Integration), (v = new f(o)).analytics = n, [2, v]
                        }
                    }))
                }))
            }

            function _(t, n) {
                return (0, e.mG)(this, void 0, Promise, (function() {
                    var i, r = this;
                    return (0, e.Jh)(this, (function(a) {
                        switch (a.label) {
                            case 0:
                                return i = [], (0, o.s)() ? [2, n] : [4, (0, h.x)((function() {
                                    return n.length > 0 && (0, o.G)()
                                }), (function() {
                                    return (0, e.mG)(r, void 0, void 0, (function() {
                                        var r, o;
                                        return (0, e.Jh)(this, (function(e) {
                                            switch (e.label) {
                                                case 0:
                                                    return (r = n.pop()) ? [4, (0, u.a)(r, t)] : [2];
                                                case 1:
                                                    return o = e.sent(), o instanceof s._ || i.push(r), [2]
                                            }
                                        }))
                                    }))
                                }))];
                            case 1:
                                return a.sent(), i.map((function(t) {
                                    return n.pushWithBackoff(t)
                                })), [2, n]
                        }
                    }))
                }))
            }
            var P = function() {
                function t(t, n, i, r) {
                    void 0 === i && (i = {}), this.options = {}, this.type = "destination", this.middleware = [], this._ready = !1, this._initialized = !1, this.flushing = !1, this.name = t, this.version = n, this.settings = (0, e.pi)({}, i), this.disableAutoISOConversion = r.disableAutoISOConversion || !1, this.settings.type && "browser" === this.settings.type && delete this.settings.type, this.options = r, this.buffer = r.disableClientPersistence ? new f.Z(4, []) : new v.$(4, "dest-".concat(t)), this.scheduleFlush()
                }
                return t.prototype.isLoaded = function() {
                    return this._ready
                }, t.prototype.ready = function() {
                    var t;
                    return null !== (t = this.onReady) && void 0 !== t ? t : Promise.resolve()
                }, t.prototype.load = function(t, n) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        var i, r = this;
                        return (0, e.Jh)(this, (function(e) {
                            switch (e.label) {
                                case 0:
                                    return this._ready || void 0 !== this.onReady ? [2] : (i = this, [4, b(t, n, this.name, this.version, this.settings, this.options.obfuscate)]);
                                case 1:
                                    i.integration = e.sent(), this.onReady = new Promise((function(t) {
                                        r.integration.once("ready", (function() {
                                            r._ready = !0, t(!0)
                                        }))
                                    })), this.onInitialize = new Promise((function(t) {
                                        r.integration.on("initialize", (function() {
                                            r._initialized = !0, t(!0)
                                        }))
                                    }));
                                    try {
                                        t.stats.increment("analytics_js.integration.invoke", 1, ["method:initialize", "integration_name:".concat(this.name)]), this.integration.initialize()
                                    } catch (n) {
                                        throw t.stats.increment("analytics_js.integration.invoke.error", 1, ["method:initialize", "integration_name:".concat(this.name)]), n
                                    }
                                    return [2]
                            }
                        }))
                    }))
                }, t.prototype.unload = function(t, n) {
                    return function(t, n, i) {
                        return (0, e.mG)(this, void 0, Promise, (function() {
                            var r, o, s, a;
                            return (0, e.Jh)(this, (function(e) {
                                return r = (0, g.Kg)(), o = y(t), s = w(t, i), a = "".concat(r, "/integrations/").concat(null != s ? s : o, "/").concat(n, "/").concat(null != s ? s : o, ".dynamic.js.gz"), [2, (0, m.t)(a)]
                            }))
                        }))
                    }(this.name, this.version, this.options.obfuscate)
                }, t.prototype.addMiddleware = function() {
                    for (var t, n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                    this.middleware = (t = this.middleware).concat.apply(t, n)
                }, t.prototype.shouldBuffer = function(t) {
                    return "page" !== t.event.type && ((0, o.s)() || !1 === this._ready || !1 === this._initialized)
                }, t.prototype.send = function(t, n, i) {
                    var r, o;
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        var a, u, d, h, f, v;
                        return (0, e.Jh)(this, (function(g) {
                            switch (g.label) {
                                case 0:
                                    if (this.shouldBuffer(t)) return this.buffer.push(t), this.scheduleFlush(), [2, t];
                                    if (a = null === (o = null === (r = this.options) || void 0 === r ? void 0 : r.plan) || void 0 === o ? void 0 : o.track, u = t.event.event, a && u && "Segment.io" !== this.name) {
                                        if (d = a[u], !(0, l.n)(a, d)) return t.updateEvent("integrations", (0, e.pi)((0, e.pi)({}, t.event.integrations), {
                                            All: !1,
                                            "Segment.io": !0
                                        })), t.cancel(new s.Y({
                                            retry: !1,
                                            reason: "Event ".concat(u, " disabled for integration ").concat(this.name, " in tracking plan"),
                                            type: "Dropped by plan"
                                        })), [2, t];
                                        if (t.updateEvent("integrations", (0, e.pi)((0, e.pi)({}, t.event.integrations), null == d ? void 0 : d.integrations)), (null == d ? void 0 : d.enabled) && !1 === (null == d ? void 0 : d.integrations[this.name])) return t.cancel(new s.Y({
                                            retry: !1,
                                            reason: "Event ".concat(u, " disabled for integration ").concat(this.name, " in tracking plan"),
                                            type: "Dropped by plan"
                                        })), [2, t]
                                    }
                                    return [4, (0, p.applyDestinationMiddleware)(this.name, t.event, this.middleware)];
                                case 1:
                                    if (null === (h = g.sent())) return [2, t];
                                    f = new n(h, {
                                        traverse: !this.disableAutoISOConversion
                                    }), t.stats.increment("analytics_js.integration.invoke", 1, ["method:".concat(i), "integration_name:".concat(this.name)]), g.label = 2;
                                case 2:
                                    return g.trys.push([2, 5, , 6]), this.integration ? [4, (0, c.O)(this.integration.invoke.call(this.integration, i, f))] : [3, 4];
                                case 3:
                                    g.sent(), g.label = 4;
                                case 4:
                                    return [3, 6];
                                case 5:
                                    throw v = g.sent(), t.stats.increment("analytics_js.integration.invoke.error", 1, ["method:".concat(i), "integration_name:".concat(this.name)]), v;
                                case 6:
                                    return [2, t]
                            }
                        }))
                    }))
                }, t.prototype.track = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Track, "track")]
                        }))
                    }))
                }, t.prototype.page = function(t) {
                    var n;
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        var i = this;
                        return (0, e.Jh)(this, (function(e) {
                            return (null === (n = this.integration) || void 0 === n ? void 0 : n._assumesPageview) && !this._initialized && this.integration.initialize(), [2, this.onInitialize.then((function() {
                                return i.send(t, r.Page, "page")
                            }))]
                        }))
                    }))
                }, t.prototype.identify = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Identify, "identify")]
                        }))
                    }))
                }, t.prototype.alias = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Alias, "alias")]
                        }))
                    }))
                }, t.prototype.group = function(t) {
                    return (0, e.mG)(this, void 0, Promise, (function() {
                        return (0, e.Jh)(this, (function(n) {
                            return [2, this.send(t, r.Group, "group")]
                        }))
                    }))
                }, t.prototype.scheduleFlush = function() {
                    var t = this;
                    this.flushing || setTimeout((function() {
                        return (0, e.mG)(t, void 0, void 0, (function() {
                            var t;
                            return (0, e.Jh)(this, (function(n) {
                                switch (n.label) {
                                    case 0:
                                        return this.flushing = !0, t = this, [4, _(this, this.buffer)];
                                    case 1:
                                        return t.buffer = n.sent(), this.flushing = !1, this.buffer.todo > 0 && this.scheduleFlush(), [2]
                                }
                            }))
                        }))
                    }), 5e3 * Math.random())
                }, t
            }();

            function k(t, n, i, e) {
                var r, o;
                if (void 0 === n && (n = {}), void 0 === i && (i = {}), (0, a.s)()) return [];
                t.plan && ((i = null != i ? i : {}).plan = t.plan);
                var s = null !== (o = null === (r = t.middlewareSettings) || void 0 === r ? void 0 : r.routingRules) && void 0 !== o ? o : [],
                    u = (0, d.o)(t, null != i ? i : {});
                return Object.entries(t.integrations).map((function(t) {
                    var r, o = t[0],
                        a = t[1];
                    if (!o.startsWith("Segment")) {
                        var c = !1 === n.All && void 0 === n[o];
                        if (!1 !== n[o] && !c) {
                            var l = a.type,
                                d = a.bundlingStatus,
                                h = a.versionSettings;
                            if (("unbundled" !== d && ("browser" === l || (null === (r = null == h ? void 0 : h.componentTypes) || void 0 === r ? void 0 : r.includes("browser"))) || "Segment.io" === o) && "Iterable" !== o) {
                                var f = function(t) {
                                        var n, i, e, r;
                                        return null !== (r = null !== (i = null === (n = t.versionSettings) || void 0 === n ? void 0 : n.override) && void 0 !== i ? i : null === (e = t.versionSettings) || void 0 === e ? void 0 : e.version) && void 0 !== r ? r : "latest"
                                    }(a),
                                    v = new P(o, f, u[o], i);
                                return s.filter((function(t) {
                                    return t.destinationName === o
                                })).length > 0 && e && v.addMiddleware(e), v
                            }
                        }
                    }
                })).filter((function(t) {
                    return void 0 !== t
                }))
            }
        }
    }
]);
//# sourceMappingURL=ajs-destination.bundle.f10d3096539d72f6123e.js.map