var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define([ "exports" ], e) : e(t.echarts = {});
}(void 0, function(t) {
    function e(t, e) {
        "createCanvas" === t && (vl = null), gl[t] = e;
    }
    function b(t) {
        if (null == t || "object" != (void 0 === t ? "undefined" : _typeof(t))) return t;
        var e = t, n = ll.call(t);
        if ("[object Array]" === n) {
            if (!D(t)) {
                e = [];
                for (var i = 0, r = t.length; i < r; i++) e[i] = b(t[i]);
            }
        } else if (sl[n]) {
            if (!D(t)) {
                var a = t.constructor;
                if (t.constructor.from) e = a.from(t); else {
                    e = new a(t.length);
                    for (i = 0, r = t.length; i < r; i++) e[i] = b(t[i]);
                }
            }
        } else if (!ol[n] && !D(t) && !s(t)) for (var o in e = {}, t) t.hasOwnProperty(o) && (e[o] = b(t[o]));
        return e;
    }
    function p(t, e, n) {
        if (!M(e) || !M(t)) return n ? b(e) : t;
        for (var i in e) if (e.hasOwnProperty(i)) {
            var r = t[i], a = e[i];
            !M(a) || !M(r) || A(a) || A(r) || s(a) || s(r) || o(a) || o(r) || D(a) || D(r) ? !n && i in t || (t[i] = b(e[i])) : p(r, a, n);
        }
        return t;
    }
    function h(t, e) {
        for (var n = t[0], i = 1, r = t.length; i < r; i++) n = p(n, t[i], e);
        return n;
    }
    function k(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }
    function C(t, e, n) {
        for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);
        return t;
    }
    function i() {
        return vl || (vl = ml().getContext("2d")), vl;
    }
    function d(t, e) {
        if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
        }
        return -1;
    }
    function a(t, e) {
        function n() {}
        var i = t.prototype;
        for (var r in n.prototype = e.prototype, t.prototype = new n(), i) t.prototype[r] = i[r];
        (t.prototype.constructor = t).superClass = e;
    }
    function r(t, e, n) {
        C(t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, n);
    }
    function N(t) {
        return t ? "string" != typeof t && "number" == typeof t.length : void 0;
    }
    function R(t, e, n) {
        if (t && e) if (t.forEach && t.forEach === hl) t.forEach(e, n); else if (t.length === +t.length) for (var i = 0, r = t.length; i < r; i++) e.call(n, t[i], i, t); else for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t);
    }
    function T(t, e, n) {
        if (t && e) {
            if (t.map && t.map === fl) return t.map(e, n);
            for (var i = [], r = 0, a = t.length; r < a; r++) i.push(e.call(n, t[r], r, t));
            return i;
        }
    }
    function g(t, e, n, i) {
        if (t && e) {
            if (t.reduce && t.reduce === pl) return t.reduce(e, n, i);
            for (var r = 0, a = t.length; r < a; r++) n = e.call(i, n, t[r], r, t);
            return n;
        }
    }
    function m(t, e, n) {
        if (t && e) {
            if (t.filter && t.filter === cl) return t.filter(e, n);
            for (var i = [], r = 0, a = t.length; r < a; r++) e.call(n, t[r], r, t) && i.push(t[r]);
            return i;
        }
    }
    function v(t, e) {
        var n = dl.call(arguments, 2);
        return function() {
            return t.apply(e, n.concat(dl.call(arguments)));
        };
    }
    function y(t) {
        var e = dl.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(dl.call(arguments)));
        };
    }
    function A(t) {
        return "[object Array]" === ll.call(t);
    }
    function _(t) {
        return "function" == typeof t;
    }
    function S(t) {
        return "[object String]" === ll.call(t);
    }
    function M(t) {
        var e = void 0 === t ? "undefined" : _typeof(t);
        return "function" === e || !!t && "object" == e;
    }
    function o(t) {
        return !!ol[ll.call(t)];
    }
    function x(t) {
        return !!sl[ll.call(t)];
    }
    function s(t) {
        return "object" == (void 0 === t ? "undefined" : _typeof(t)) && "number" == typeof t.nodeType && "object" == _typeof(t.ownerDocument);
    }
    function w(t) {
        return t != t;
    }
    function L() {
        for (var t = 0, e = arguments.length; t < e; t++) if (null != arguments[t]) return arguments[t];
    }
    function P(t, e) {
        return null != t ? t : e;
    }
    function O(t, e, n) {
        return null != t ? t : null != e ? e : n;
    }
    function l() {
        return Function.call.apply(dl, arguments);
    }
    function u(t) {
        if ("number" == typeof t) return [ t, t, t, t ];
        var e = t.length;
        return 2 === e ? [ t[0], t[1], t[0], t[1] ] : 3 === e ? [ t[0], t[1], t[2], t[1] ] : t;
    }
    function c(t, e) {
        if (!t) throw new Error(e);
    }
    function f(t) {
        return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    function I(t) {
        t[yl] = !0;
    }
    function D(t) {
        return t[yl];
    }
    function E(t) {
        function e(t, e) {
            n ? i.set(t, e) : i.set(e, t);
        }
        var n = A(t), i = this;
        t instanceof E ? t.each(e) : t && R(t, e);
    }
    function z(t) {
        return new E(t);
    }
    function B() {}
    function n(t, e) {
        var n = new xl(2);
        return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n;
    }
    function F(t, e) {
        return t[0] = e[0], t[1] = e[1], t;
    }
    function V(t) {
        var e = new xl(2);
        return e[0] = t[0], e[1] = t[1], e;
    }
    function G(t, e, n) {
        return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;
    }
    function W(t, e, n, i) {
        return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t;
    }
    function H(t, e, n) {
        return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;
    }
    function q(t) {
        return Math.sqrt(j(t));
    }
    function j(t) {
        return t[0] * t[0] + t[1] * t[1];
    }
    function U(t, e, n) {
        return t[0] = e[0] * n, t[1] = e[1] * n, t;
    }
    function X(t, e) {
        var n = q(e);
        return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;
    }
    function Y(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
    }
    function Z(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
    }
    function $(t, e, n) {
        var i = e[0], r = e[1];
        return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;
    }
    function K(t, e, n) {
        return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;
    }
    function Q(t, e, n) {
        return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;
    }
    function J() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), 
        this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this);
    }
    function tt(t, e) {
        return {
            target: t,
            topTarget: e && e.topTarget
        };
    }
    function et() {}
    function nt(t, e, n) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
            for (var i, r = t; r; ) {
                if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
                r.silent && (i = !0), r = r.parent;
            }
            return !i || Tl;
        }
        return !1;
    }
    function it() {
        var t = new Ll(6);
        return rt(t), t;
    }
    function rt(t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
    }
    function at(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], 
        t;
    }
    function ot(t, e, n) {
        var i = e[0] * n[0] + e[2] * n[1], r = e[1] * n[0] + e[3] * n[1], a = e[0] * n[2] + e[2] * n[3], o = e[1] * n[2] + e[3] * n[3], s = e[0] * n[4] + e[2] * n[5] + e[4], l = e[1] * n[4] + e[3] * n[5] + e[5];
        return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t;
    }
    function st(t, e, n) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], 
        t;
    }
    function lt(t, e, n) {
        var i = e[0], r = e[2], a = e[4], o = e[1], s = e[3], l = e[5], u = Math.sin(n), h = Math.cos(n);
        return t[0] = i * h + o * u, t[1] = -i * u + o * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, 
        t[4] = h * a + u * l, t[5] = h * l - u * a, t;
    }
    function ut(t, e, n) {
        var i = n[0], r = n[1];
        return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, 
        t[5] = e[5] * r, t;
    }
    function ht(t, e) {
        var n = e[0], i = e[2], r = e[4], a = e[1], o = e[3], s = e[5], l = n * o - a * i;
        return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, 
        t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null;
    }
    function ct(t) {
        return 5e-5 < t || t < -5e-5;
    }
    function dt(t) {
        this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, 
        this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, 
        this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, 
        this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1;
    }
    function ft(t) {
        return (t = Math.round(t)) < 0 ? 0 : 255 < t ? 255 : t;
    }
    function pt(t) {
        return t < 0 ? 0 : 1 < t ? 1 : t;
    }
    function gt(t) {
        return ft(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10));
    }
    function mt(t) {
        return pt(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t));
    }
    function vt(t, e, n) {
        return n < 0 ? n += 1 : 1 < n && (n -= 1), 6 * n < 1 ? t + (e - t) * n * 6 : 2 * n < 1 ? e : 3 * n < 2 ? t + (e - t) * (2 / 3 - n) * 6 : t;
    }
    function yt(t, e, n) {
        return t + (e - t) * n;
    }
    function _t(t, e, n, i, r) {
        return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;
    }
    function xt(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
    }
    function wt(t, e) {
        jl && xt(jl, e), jl = ql.put(t, jl || e.slice());
    }
    function bt(t, e) {
        if (t) {
            e = e || [];
            var n = ql.get(t);
            if (n) return xt(e, n);
            var i = (t += "").replace(/ /g, "").toLowerCase();
            if (i in Hl) return xt(e, Hl[i]), wt(t, e), e;
            if ("#" !== i.charAt(0)) {
                var r = i.indexOf("("), a = i.indexOf(")");
                if (-1 !== r && a + 1 === i.length) {
                    var o = i.substr(0, r), s = i.substr(r + 1, a - (r + 1)).split(","), l = 1;
                    switch (o) {
                      case "rgba":
                        if (4 !== s.length) return void _t(e, 0, 0, 0, 1);
                        l = mt(s.pop());

                      case "rgb":
                        return 3 !== s.length ? void _t(e, 0, 0, 0, 1) : (_t(e, gt(s[0]), gt(s[1]), gt(s[2]), l), 
                        wt(t, e), e);

                      case "hsla":
                        return 4 !== s.length ? void _t(e, 0, 0, 0, 1) : (s[3] = mt(s[3]), St(s, e), wt(t, e), 
                        e);

                      case "hsl":
                        return 3 !== s.length ? void _t(e, 0, 0, 0, 1) : (St(s, e), wt(t, e), e);

                      default:
                        return;
                    }
                }
                _t(e, 0, 0, 0, 1);
            } else {
                var u;
                if (4 === i.length) return 0 <= (u = parseInt(i.substr(1), 16)) && u <= 4095 ? (_t(e, (3840 & u) >> 4 | (3840 & u) >> 8, 240 & u | (240 & u) >> 4, 15 & u | (15 & u) << 4, 1), 
                wt(t, e), e) : void _t(e, 0, 0, 0, 1);
                if (7 === i.length) return 0 <= (u = parseInt(i.substr(1), 16)) && u <= 16777215 ? (_t(e, (16711680 & u) >> 16, (65280 & u) >> 8, 255 & u, 1), 
                wt(t, e), e) : void _t(e, 0, 0, 0, 1);
            }
        }
    }
    function St(t, e) {
        var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = mt(t[1]), r = mt(t[2]), a = r <= .5 ? r * (i + 1) : r + i - r * i, o = 2 * r - a;
        return _t(e = e || [], ft(255 * vt(o, a, n + 1 / 3)), ft(255 * vt(o, a, n)), ft(255 * vt(o, a, n - 1 / 3)), 1), 
        4 === t.length && (e[3] = t[3]), e;
    }
    function Mt(t, e) {
        var n = bt(t);
        if (n) {
            for (var i = 0; i < 3; i++) n[i] = e < 0 ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, 
            255 < n[i] ? n[i] = 255 : t[i] < 0 && (n[i] = 0);
            return Tt(n, 4 === n.length ? "rgba" : "rgb");
        }
    }
    function It(t, e, n) {
        if (e && e.length && 0 <= t && t <= 1) {
            n = n || [];
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = e[r], s = e[a], l = i - r;
            return n[0] = ft(yt(o[0], s[0], l)), n[1] = ft(yt(o[1], s[1], l)), n[2] = ft(yt(o[2], s[2], l)), 
            n[3] = pt(yt(o[3], s[3], l)), n;
        }
    }
    function Dt(t, e, n) {
        if (e && e.length && 0 <= t && t <= 1) {
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = bt(e[r]), s = bt(e[a]), l = i - r, u = Tt([ ft(yt(o[0], s[0], l)), ft(yt(o[1], s[1], l)), ft(yt(o[2], s[2], l)), pt(yt(o[3], s[3], l)) ], "rgba");
            return n ? {
                color: u,
                leftIndex: r,
                rightIndex: a,
                value: i
            } : u;
        }
    }
    function Ct(t, e) {
        return (t = bt(t)) && null != e ? (t[3] = pt(e), Tt(t, "rgba")) : void 0;
    }
    function Tt(t, e) {
        if (t && t.length) {
            var n = t[0] + "," + t[1] + "," + t[2];
            return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";
        }
    }
    function kt(t, e) {
        return t[e];
    }
    function At(t, e, n) {
        t[e] = n;
    }
    function Lt(t, e, n) {
        return (e - t) * n + t;
    }
    function Pt(t, e, n) {
        return .5 < n ? e : t;
    }
    function Ot(t, e, n, i, r) {
        var a = t.length;
        if (1 == r) for (var o = 0; o < a; o++) i[o] = Lt(t[o], e[o], n); else {
            var s = a && t[0].length;
            for (o = 0; o < a; o++) for (var l = 0; l < s; l++) i[o][l] = Lt(t[o][l], e[o][l], n);
        }
    }
    function Nt(t, e, n) {
        var i = t.length, r = e.length;
        if (i !== r) if (r < i) t.length = r; else for (var a = i; a < r; a++) t.push(1 === n ? e[a] : Zl.call(e[a]));
        var o = t[0] && t[0].length;
        for (a = 0; a < t.length; a++) if (1 === n) isNaN(t[a]) && (t[a] = e[a]); else for (var s = 0; s < o; s++) isNaN(t[a][s]) && (t[a][s] = e[a][s]);
    }
    function Et(t, e, n) {
        if (t === e) return !0;
        var i = t.length;
        if (i !== e.length) return !1;
        if (1 === n) {
            for (var r = 0; r < i; r++) if (t[r] !== e[r]) return !1;
        } else {
            var a = t[0].length;
            for (r = 0; r < i; r++) for (var o = 0; o < a; o++) if (t[r][o] !== e[r][o]) return !1;
        }
        return !0;
    }
    function zt(t, e, n, i, r, a, o, s, l) {
        var u = t.length;
        if (1 == l) for (var h = 0; h < u; h++) s[h] = Rt(t[h], e[h], n[h], i[h], r, a, o); else {
            var c = t[0].length;
            for (h = 0; h < u; h++) for (var d = 0; d < c; d++) s[h][d] = Rt(t[h][d], e[h][d], n[h][d], i[h][d], r, a, o);
        }
    }
    function Rt(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }
    function Bt(t) {
        if (N(t)) {
            var e = t.length;
            if (N(t[0])) {
                for (var n = [], i = 0; i < e; i++) n.push(Zl.call(t[i]));
                return n;
            }
            return Zl.call(t);
        }
        return t;
    }
    function Ft(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), 
        "rgba(" + t.join(",") + ")";
    }
    function Vt(t, e, n, i, a, r) {
        var o, s, l = t._getter, u = t._setter, h = "spline" === e, c = i.length;
        if (c) {
            var d, f = N(i[0].value), p = !1, g = !1, m = f ? N((s = (o = i)[o.length - 1].value) && s[0]) ? 2 : 1 : 0;
            i.sort(function(t, e) {
                return t.time - e.time;
            }), d = i[c - 1].time;
            for (var v = [], y = [], _ = i[0].value, x = !0, w = 0; w < c; w++) {
                v.push(i[w].time / d);
                var b = i[w].value;
                if (f && Et(b, _, m) || !f && b === _ || (x = !1), "string" == typeof (_ = b)) {
                    var S = bt(b);
                    S ? (b = S, p = !0) : g = !0;
                }
                y.push(b);
            }
            if (r || !x) {
                var M = y[c - 1];
                for (w = 0; w < c - 1; w++) f ? Nt(y[w], M, m) : !isNaN(y[w]) || isNaN(M) || g || p || (y[w] = M);
                f && Nt(l(t._target, a), M, m);
                var I, D, C, T, k, A = 0, L = 0;
                if (p) var P = [ 0, 0, 0, 0 ];
                var O = new dt({
                    target: t._target,
                    life: d,
                    loop: t._loop,
                    delay: t._delay,
                    onframe: function(t, e) {
                        var n;
                        if (e < 0) n = 0; else if (e < L) {
                            for (n = Math.min(A + 1, c - 1); 0 <= n && !(v[n] <= e); n--) ;
                            n = Math.min(n, c - 2);
                        } else {
                            for (n = A; n < c && !(v[n] > e); n++) ;
                            n = Math.min(n - 1, c - 2);
                        }
                        L = e;
                        var i = v[(A = n) + 1] - v[n];
                        if (0 !== i) if (I = (e - v[n]) / i, h) if (C = y[n], D = y[0 === n ? n : n - 1], 
                        T = y[c - 2 < n ? c - 1 : n + 1], k = y[c - 3 < n ? c - 1 : n + 2], f) zt(D, C, T, k, I, I * I, I * I * I, l(t, a), m); else {
                            if (p) r = zt(D, C, T, k, I, I * I, I * I * I, P, 1), r = Ft(P); else {
                                if (g) return Pt(C, T, I);
                                r = Rt(D, C, T, k, I, I * I, I * I * I);
                            }
                            u(t, a, r);
                        } else if (f) Ot(y[n], y[n + 1], I, l(t, a), m); else {
                            var r;
                            if (p) Ot(y[n], y[n + 1], I, P, 1), r = Ft(P); else {
                                if (g) return Pt(y[n], y[n + 1], I);
                                r = Lt(y[n], y[n + 1], I);
                            }
                            u(t, a, r);
                        }
                    },
                    ondestroy: n
                });
                return e && "spline" !== e && (O.easing = e), O;
            }
        }
    }
    function Gt(t, e, n, i) {
        n < 0 && (t += n, n = -n), i < 0 && (e += i, i = -i), this.x = t, this.y = e, this.width = n, 
        this.height = i;
    }
    function Wt(t, e, n, i) {
        var r = e + 1;
        if (r === n) return 1;
        if (i(t[r++], t[e]) < 0) {
            for (;r < n && i(t[r], t[r - 1]) < 0; ) r++;
            !function(t, e, n) {
                for (n--; e < n; ) {
                    var i = t[e];
                    t[e++] = t[n], t[n--] = i;
                }
            }(t, e, r);
        } else for (;r < n && 0 <= i(t[r], t[r - 1]); ) r++;
        return r - e;
    }
    function Ht(t, e, n, i, r) {
        for (i === e && i++; i < n; i++) {
            for (var a, o = t[i], s = e, l = i; s < l; ) r(o, t[a = s + l >>> 1]) < 0 ? l = a : s = a + 1;
            var u = i - s;
            switch (u) {
              case 3:
                t[s + 3] = t[s + 2];

              case 2:
                t[s + 2] = t[s + 1];

              case 1:
                t[s + 1] = t[s];
                break;

              default:
                for (;0 < u; ) t[s + u] = t[s + u - 1], u--;
            }
            t[s] = o;
        }
    }
    function qt(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (0 < a(t, e[n + r])) {
            for (s = i - r; l < s && 0 < a(t, e[n + r + l]); ) (l = 1 + ((o = l) << 1)) <= 0 && (l = s);
            s < l && (l = s), o += r, l += r;
        } else {
            for (s = r + 1; l < s && a(t, e[n + r - l]) <= 0; ) (l = 1 + ((o = l) << 1)) <= 0 && (l = s);
            s < l && (l = s);
            var u = o;
            o = r - l, l = r - u;
        }
        for (o++; o < l; ) {
            var h = o + (l - o >>> 1);
            0 < a(t, e[n + h]) ? o = h + 1 : l = h;
        }
        return l;
    }
    function jt(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (a(t, e[n + r]) < 0) {
            for (s = r + 1; l < s && a(t, e[n + r - l]) < 0; ) (l = 1 + ((o = l) << 1)) <= 0 && (l = s);
            s < l && (l = s);
            var u = o;
            o = r - l, l = r - u;
        } else {
            for (s = i - r; l < s && 0 <= a(t, e[n + r + l]); ) (l = 1 + ((o = l) << 1)) <= 0 && (l = s);
            s < l && (l = s), o += r, l += r;
        }
        for (o++; o < l; ) {
            var h = o + (l - o >>> 1);
            a(t, e[n + h]) < 0 ? l = h : o = h + 1;
        }
        return l;
    }
    function Ut(p, g) {
        function e(t) {
            var e = o[t], n = s[t], i = o[t + 1], r = s[t + 1];
            s[t] = n + r, t === l - 3 && (o[t + 1] = o[t + 2], s[t + 1] = s[t + 2]), l--;
            var a = jt(p[i], p, e, n, 0, g);
            e += a, 0 !== (n -= a) && (0 !== (r = qt(p[e + n - 1], p, i, r, r - 1, g)) && (n <= r ? function(t, e, n, i) {
                var r = 0;
                for (r = 0; r < e; r++) v[r] = p[t + r];
                var a = 0, o = n, s = t;
                if (p[s++] = p[o++], 0 != --i) {
                    if (1 === e) {
                        for (r = 0; r < i; r++) p[s + r] = p[o + r];
                        return p[s + i] = v[a];
                    }
                    for (var l, u, h, c = m; ;) {
                        u = l = 0, h = !1;
                        do {
                            if (g(p[o], v[a]) < 0) {
                                if (p[s++] = p[o++], u++, (l = 0) == --i) {
                                    h = !0;
                                    break;
                                }
                            } else if (p[s++] = v[a++], l++, u = 0, 1 == --e) {
                                h = !0;
                                break;
                            }
                        } while ((l | u) < c);
                        if (h) break;
                        do {
                            if (0 !== (l = jt(p[o], v, a, e, 0, g))) {
                                for (r = 0; r < l; r++) p[s + r] = v[a + r];
                                if (s += l, a += l, (e -= l) <= 1) {
                                    h = !0;
                                    break;
                                }
                            }
                            if (p[s++] = p[o++], 0 == --i) {
                                h = !0;
                                break;
                            }
                            if (0 !== (u = qt(v[a], p, o, i, 0, g))) {
                                for (r = 0; r < u; r++) p[s + r] = p[o + r];
                                if (s += u, o += u, 0 === (i -= u)) {
                                    h = !0;
                                    break;
                                }
                            }
                            if (p[s++] = v[a++], 1 == --e) {
                                h = !0;
                                break;
                            }
                            c--;
                        } while (du <= l || du <= u);
                        if (h) break;
                        c < 0 && (c = 0), c += 2;
                    }
                    if ((m = c) < 1 && (m = 1), 1 === e) {
                        for (r = 0; r < i; r++) p[s + r] = p[o + r];
                        p[s + i] = v[a];
                    } else {
                        if (0 === e) throw new Error();
                        for (r = 0; r < e; r++) p[s + r] = v[a + r];
                    }
                } else for (r = 0; r < e; r++) p[s + r] = v[a + r];
            }(e, n, i, r) : function(t, e, n, i) {
                var r = 0;
                for (r = 0; r < i; r++) v[r] = p[n + r];
                var a = t + e - 1, o = i - 1, s = n + i - 1, l = 0, u = 0;
                if (p[s--] = p[a--], 0 != --e) {
                    if (1 === i) {
                        for (u = (s -= e) + 1, l = (a -= e) + 1, r = e - 1; 0 <= r; r--) p[u + r] = p[l + r];
                        return p[s] = v[o];
                    }
                    for (var h = m; ;) {
                        var c = 0, d = 0, f = !1;
                        do {
                            if (g(v[o], p[a]) < 0) {
                                if (p[s--] = p[a--], c++, (d = 0) == --e) {
                                    f = !0;
                                    break;
                                }
                            } else if (p[s--] = v[o--], d++, c = 0, 1 == --i) {
                                f = !0;
                                break;
                            }
                        } while ((c | d) < h);
                        if (f) break;
                        do {
                            if (0 !== (c = e - jt(v[o], p, t, e, e - 1, g))) {
                                for (e -= c, u = (s -= c) + 1, l = (a -= c) + 1, r = c - 1; 0 <= r; r--) p[u + r] = p[l + r];
                                if (0 === e) {
                                    f = !0;
                                    break;
                                }
                            }
                            if (p[s--] = v[o--], 1 == --i) {
                                f = !0;
                                break;
                            }
                            if (0 !== (d = i - qt(p[a], v, 0, i, i - 1, g))) {
                                for (i -= d, u = (s -= d) + 1, l = (o -= d) + 1, r = 0; r < d; r++) p[u + r] = v[l + r];
                                if (i <= 1) {
                                    f = !0;
                                    break;
                                }
                            }
                            if (p[s--] = p[a--], 0 == --e) {
                                f = !0;
                                break;
                            }
                            h--;
                        } while (du <= c || du <= d);
                        if (f) break;
                        h < 0 && (h = 0), h += 2;
                    }
                    if ((m = h) < 1 && (m = 1), 1 === i) {
                        for (u = (s -= e) + 1, l = (a -= e) + 1, r = e - 1; 0 <= r; r--) p[u + r] = p[l + r];
                        p[s] = v[o];
                    } else {
                        if (0 === i) throw new Error();
                        for (l = s - (i - 1), r = 0; r < i; r++) p[l + r] = v[r];
                    }
                } else for (l = s - (i - 1), r = 0; r < i; r++) p[l + r] = v[r];
            }(e, n, i, r)));
        }
        var o, s, m = du, l = 0, v = [];
        o = [], s = [], this.mergeRuns = function() {
            for (;1 < l; ) {
                var t = l - 2;
                if (1 <= t && s[t - 1] <= s[t] + s[t + 1] || 2 <= t && s[t - 2] <= s[t] + s[t - 1]) s[t - 1] < s[t + 1] && t--; else if (s[t] > s[t + 1]) break;
                e(t);
            }
        }, this.forceMergeRuns = function() {
            for (;1 < l; ) {
                var t = l - 2;
                0 < t && s[t - 1] < s[t + 1] && t--, e(t);
            }
        }, this.pushRun = function(t, e) {
            o[l] = t, s[l] = e, l += 1;
        };
    }
    function Xt(t, e, n, i) {
        n || (n = 0), i || (i = t.length);
        var r = i - n;
        if (!(r < 2)) {
            var a = 0;
            if (r < cu) return void Ht(t, n, i, n + (a = Wt(t, n, i, e)), e);
            var o = new Ut(t, e), s = function(t) {
                for (var e = 0; cu <= t; ) e |= 1 & t, t >>= 1;
                return t + e;
            }(r);
            do {
                if ((a = Wt(t, n, i, e)) < s) {
                    var l = r;
                    s < l && (l = s), Ht(t, n, n + l, n + a, e), a = l;
                }
                o.pushRun(n, a), o.mergeRuns(), r -= a, n += a;
            } while (0 !== r);
            o.forceMergeRuns();
        }
    }
    function Yt(t, e) {
        return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;
    }
    function Zt(t, e, n) {
        var i = null == e.x ? 0 : e.x, r = null == e.x2 ? 1 : e.x2, a = null == e.y ? 0 : e.y, o = null == e.y2 ? 0 : e.y2;
        return e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, 
        o = o * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, 
        o = isNaN(o) ? 0 : o, t.createLinearGradient(i, a, r, o);
    }
    function $t(t, e, n) {
        var i = n.width, r = n.height, a = Math.min(i, r), o = null == e.x ? .5 : e.x, s = null == e.y ? .5 : e.y, l = null == e.r ? .5 : e.r;
        return e.global || (o = o * i + n.x, s = s * r + n.y, l *= a), t.createRadialGradient(o, s, 0, o, s, l);
    }
    function Kt() {
        return !1;
    }
    function Qt(t, e, n) {
        var i = ml(), r = e.getWidth(), a = e.getHeight(), o = i.style;
        return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", 
        o.height = a + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = a * n, 
        i;
    }
    function Jt(t) {
        if ("string" == typeof t) {
            var e = Mu.get(t);
            return e && e.image;
        }
        return t;
    }
    function te(t, e, n, i, r) {
        if (t) {
            if ("string" == typeof t) {
                if (e && e.__zrImageSrc === t || !n) return e;
                var a = Mu.get(t), o = {
                    hostEl: n,
                    cb: i,
                    cbPayload: r
                };
                return a ? !ne(e = a.image) && a.pending.push(o) : (!e && (e = new Image()), e.onload = ee, 
                Mu.put(t, e.__cachedImgObj = {
                    image: e,
                    pending: [ o ]
                }), e.src = e.__zrImageSrc = t), e;
            }
            return t;
        }
        return e;
    }
    function ee() {
        var t = this.__cachedImgObj;
        this.onload = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
            var n = t.pending[e], i = n.cb;
            i && i(this, n.cbPayload), n.hostEl.dirty();
        }
        t.pending.length = 0;
    }
    function ne(t) {
        return t && t.width && t.height;
    }
    function ie(t, e) {
        var n, i, r = t + ":" + (e = e || ku);
        if (Iu[r]) return Iu[r];
        for (var a = (t + "").split("\n"), o = 0, s = 0, l = a.length; s < l; s++) o = Math.max((n = a[s], 
        i = e, Au.measureText(n, i)).width, o);
        return Cu < Du && (Du = 0, Iu = {}), Du++, Iu[r] = o;
    }
    function re(t, e, n, i, r, a, o) {
        return a ? (l = i, u = fe(t, {
            rich: a,
            truncate: o,
            font: e,
            textAlign: s = n,
            textPadding: r
        }), h = u.outerWidth, c = u.outerHeight, d = ae(0, h, s), f = oe(0, c, l), new Gt(d, f, h, c)) : function(t, e, n, i, r, a) {
            var o = de(t, e, r, a), s = ie(t, e);
            r && (s += r[1] + r[3]);
            var l = o.outerHeight, u = ae(0, s, n), h = oe(0, l, i), c = new Gt(u, h, s, l);
            return c.lineHeight = o.lineHeight, c;
        }(t, e, n, i, r, o);
        var s, l, u, h, c, d, f;
    }
    function ae(t, e, n) {
        return "right" === n ? t -= e : "center" === n && (t -= e / 2), t;
    }
    function oe(t, e, n) {
        return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t;
    }
    function se(t, e, n, i, r) {
        if (!e) return "";
        var a = (t + "").split("\n");
        r = le(e, n, i, r);
        for (var o = 0, s = a.length; o < s; o++) a[o] = ue(a[o], r);
        return a.join("\n");
    }
    function le(t, e, n, i) {
        (i = k({}, i)).font = e;
        n = P(n, "...");
        i.maxIterations = P(i.maxIterations, 2);
        var r = i.minChar = P(i.minChar, 0);
        i.cnCharWidth = ie("国", e);
        var a = i.ascCharWidth = ie("a", e);
        i.placeholder = P(i.placeholder, "");
        for (var o = t = Math.max(0, t - 1), s = 0; s < r && a <= o; s++) o -= a;
        var l = ie(n);
        return o < l && (n = "", l = 0), o = t - l, i.ellipsis = n, i.ellipsisWidth = l, 
        i.contentWidth = o, i.containerWidth = t, i;
    }
    function ue(t, e) {
        var n = e.containerWidth, i = e.font, r = e.contentWidth;
        if (!n) return "";
        var a = ie(t, i);
        if (a <= n) return t;
        for (var o = 0; ;o++) {
            if (a <= r || o >= e.maxIterations) {
                t += e.ellipsis;
                break;
            }
            var s = 0 === o ? he(t, r, e.ascCharWidth, e.cnCharWidth) : 0 < a ? Math.floor(t.length * r / a) : 0;
            a = ie(t = t.substr(0, s), i);
        }
        return "" === t && (t = e.placeholder), t;
    }
    function he(t, e, n, i) {
        for (var r = 0, a = 0, o = t.length; a < o && r < e; a++) {
            var s = t.charCodeAt(a);
            r += 0 <= s && s <= 127 ? n : i;
        }
        return a;
    }
    function ce(t) {
        return ie("国", t);
    }
    function de(t, e, n, i) {
        null != t && (t += "");
        var r = ce(e), a = t ? t.split("\n") : [], o = a.length * r, s = o;
        if (n && (s += n[0] + n[2]), t && i) {
            var l = i.outerHeight, u = i.outerWidth;
            if (null != l && l < s) t = "", a = []; else if (null != u) for (var h = le(u - (n ? n[1] + n[3] : 0), e, i.ellipsis, {
                minChar: i.minChar,
                placeholder: i.placeholder
            }), c = 0, d = a.length; c < d; c++) a[c] = ue(a[c], h);
        }
        return {
            lines: a,
            height: o,
            outerHeight: s,
            lineHeight: r
        };
    }
    function fe(t, e) {
        var n = {
            lines: [],
            width: 0,
            height: 0
        };
        if (null != t && (t += ""), !t) return n;
        for (var i, r = Tu.lastIndex = 0; null != (i = Tu.exec(t)); ) {
            var a = i.index;
            r < a && pe(n, t.substring(r, a)), pe(n, i[2], i[1]), r = Tu.lastIndex;
        }
        r < t.length && pe(n, t.substring(r, t.length));
        var o = n.lines, s = 0, l = 0, u = [], h = e.textPadding, c = e.truncate, d = c && c.outerWidth, f = c && c.outerHeight;
        h && (null != d && (d -= h[1] + h[3]), null != f && (f -= h[0] + h[2]));
        for (var p = 0; p < o.length; p++) {
            for (var g = o[p], m = 0, v = 0, y = 0; y < g.tokens.length; y++) {
                var _ = (k = g.tokens[y]).styleName && e.rich[k.styleName] || {}, x = k.textPadding = _.textPadding, w = k.font = _.font || e.font, b = k.textHeight = P(_.textHeight, ce(w));
                if (x && (b += x[0] + x[2]), k.height = b, k.lineHeight = O(_.textLineHeight, e.textLineHeight, b), 
                k.textAlign = _ && _.textAlign || e.textAlign, k.textVerticalAlign = _ && _.textVerticalAlign || "middle", 
                null != f && s + k.lineHeight > f) return {
                    lines: [],
                    width: 0,
                    height: 0
                };
                k.textWidth = ie(k.text, w);
                var S = _.textWidth, M = null == S || "auto" === S;
                if ("string" == typeof S && "%" === S.charAt(S.length - 1)) k.percentWidth = S, 
                u.push(k), S = 0; else {
                    if (M) {
                        S = k.textWidth;
                        var I = _.textBackgroundColor, D = I && I.image;
                        D && (ne(D = Jt(D)) && (S = Math.max(S, D.width * b / D.height)));
                    }
                    var C = x ? x[1] + x[3] : 0;
                    S += C;
                    var T = null != d ? d - v : null;
                    null != T && T < S && (!M || T < C ? (k.text = "", k.textWidth = S = 0) : (k.text = se(k.text, T - C, w, c.ellipsis, {
                        minChar: c.minChar
                    }), k.textWidth = ie(k.text, w), S = k.textWidth + C));
                }
                v += k.width = S, _ && (m = Math.max(m, k.lineHeight));
            }
            g.width = v, s += g.lineHeight = m, l = Math.max(l, v);
        }
        n.outerWidth = n.width = P(e.textWidth, l), n.outerHeight = n.height = P(e.textHeight, s), 
        h && (n.outerWidth += h[1] + h[3], n.outerHeight += h[0] + h[2]);
        for (p = 0; p < u.length; p++) {
            var k, A = (k = u[p]).percentWidth;
            k.width = parseInt(A, 10) / 100 * l;
        }
        return n;
    }
    function pe(t, e, n) {
        for (var i = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
            var s = r[o], l = {
                styleName: n,
                text: s,
                isLineHolder: !s && !i
            };
            if (o) a.push({
                tokens: [ l ]
            }); else {
                var u = (a[a.length - 1] || (a[0] = {
                    tokens: []
                })).tokens, h = u.length;
                1 === h && u[0].isLineHolder ? u[0] = l : (s || !h || i) && u.push(l);
            }
        }
    }
    function ge(t, e) {
        var n, i, r, a, o, s = e.x, l = e.y, u = e.width, h = e.height, c = e.r;
        u < 0 && (s += u, u = -u), h < 0 && (l += h, h = -h), "number" == typeof c ? n = i = r = a = c : c instanceof Array ? 1 === c.length ? n = i = r = a = c[0] : 2 === c.length ? (n = r = c[0], 
        i = a = c[1]) : 3 === c.length ? (n = c[0], i = a = c[1], r = c[2]) : (n = c[0], 
        i = c[1], r = c[2], a = c[3]) : n = i = r = a = 0, u < n + i && (n *= u / (o = n + i), 
        i *= u / o), u < r + a && (r *= u / (o = r + a), a *= u / o), h < i + r && (i *= h / (o = i + r), 
        r *= h / o), h < n + a && (n *= h / (o = n + a), a *= h / o), t.moveTo(s + n, l), 
        t.lineTo(s + u - i, l), 0 !== i && t.arc(s + u - i, l + i, i, -Math.PI / 2, 0), 
        t.lineTo(s + u, l + h - r), 0 !== r && t.arc(s + u - r, l + h - r, r, 0, Math.PI / 2), 
        t.lineTo(s + a, l + h), 0 !== a && t.arc(s + a, l + h - a, a, Math.PI / 2, Math.PI), 
        t.lineTo(s, l + n), 0 !== n && t.arc(s + n, l + n, n, Math.PI, 1.5 * Math.PI);
    }
    function me(t) {
        return ve(t), R(t.rich, ve), t;
    }
    function ve(t) {
        if (t) {
            t.font = (r = ((i = t).fontSize || i.fontFamily) && [ i.fontStyle, i.fontWeight, (i.fontSize || 12) + "px", i.fontFamily || "sans-serif" ].join(" ")) && f(r) || i.textFont || i.font;
            var e = t.textAlign;
            "middle" === e && (e = "center"), t.textAlign = null == e || Lu[e] ? e : "left";
            var n = t.textVerticalAlign || t.textBaseline;
            "center" === n && (n = "middle"), t.textVerticalAlign = null == n || Pu[n] ? n : "top", 
            t.textPadding && (t.textPadding = u(t.textPadding));
        }
        var i, r;
    }
    function ye(t, e, n, i, r) {
        var a, o, s, l, u, h;
        i.rich ? (o = e, s = n, l = i, u = r, (!(h = (a = t).__textCotentBlock) || a.__dirty) && (h = a.__textCotentBlock = fe(s, l)), 
        function(t, e, n, i, r) {
            var a = n.width, o = n.outerWidth, s = n.outerHeight, l = i.textPadding, u = Me(s, i, r), h = u.baseX, c = u.baseY, d = u.textAlign, f = u.textVerticalAlign;
            _e(e, i, r, h, c);
            var p = ae(h, o, d), g = oe(c, s, f), m = p, v = g;
            l && (m += l[3], v += l[0]);
            var y = m + a;
            we(i) && be(t, e, i, p, g, o, s);
            for (var _ = 0; _ < n.lines.length; _++) {
                for (var x, w = n.lines[_], b = w.tokens, S = b.length, M = w.lineHeight, I = w.width, D = 0, C = m, T = y, k = S - 1; D < S && (!(x = b[D]).textAlign || "left" === x.textAlign); ) xe(t, e, x, i, M, v, C, "left"), 
                I -= x.width, C += x.width, D++;
                for (;0 <= k && "right" === (x = b[k]).textAlign; ) xe(t, e, x, i, M, v, T, "right"), 
                I -= x.width, T -= x.width, k--;
                for (C += (a - (C - m) - (y - T) - I) / 2; D <= k; ) x = b[D], xe(t, e, x, i, M, v, C + x.width / 2, "center"), 
                C += x.width, D++;
                v += M;
            }
        }(a, o, h, l, u)) : function(t, e, n, i, r) {
            var a = Ie(e, "font", i.font || ku), o = i.textPadding, s = t.__textCotentBlock;
            (!s || t.__dirty) && (s = t.__textCotentBlock = de(n, a, o, i.truncate));
            var l = s.outerHeight, u = s.lines, h = s.lineHeight, c = Me(l, i, r), d = c.baseX, f = c.baseY, p = c.textAlign, g = c.textVerticalAlign;
            _e(e, i, r, d, f);
            var m = oe(f, l, g), v = d, y = m, _ = we(i);
            if (_ || o) {
                var x = ie(n, a), w = x;
                o && (w += o[1] + o[3]);
                var b = ae(d, w, p);
                _ && be(t, e, i, b, m, w, l), o && (v = ke(d, p, o), y += o[0]);
            }
            Ie(e, "textAlign", p || "left"), Ie(e, "textBaseline", "middle"), Ie(e, "shadowBlur", i.textShadowBlur || 0), 
            Ie(e, "shadowColor", i.textShadowColor || "transparent"), Ie(e, "shadowOffsetX", i.textShadowOffsetX || 0), 
            Ie(e, "shadowOffsetY", i.textShadowOffsetY || 0), y += h / 2;
            var S = i.textStrokeWidth, M = De(i.textStroke, S), I = Ce(i.textFill);
            M && (Ie(e, "lineWidth", S), Ie(e, "strokeStyle", M)), I && Ie(e, "fillStyle", I);
            for (var D = 0; D < u.length; D++) M && e.strokeText(u[D], v, y), I && e.fillText(u[D], v, y), 
            y += h;
        }(t, e, n, i, r);
    }
    function _e(t, e, n, i, r) {
        if (n && e.textRotation) {
            var a = e.textOrigin;
            "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, 
            r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r);
        }
    }
    function xe(t, e, n, i, r, a, o, s) {
        var l = i.rich[n.styleName] || {}, u = n.textVerticalAlign, h = a + r / 2;
        "top" === u ? h = a + n.height / 2 : "bottom" === u && (h = a + r - n.height / 2), 
        !n.isLineHolder && we(l) && be(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, h - n.height / 2, n.width, n.height);
        var c = n.textPadding;
        c && (o = ke(o, s, c), h -= n.height / 2 - c[2] - n.textHeight / 2), Ie(e, "shadowBlur", O(l.textShadowBlur, i.textShadowBlur, 0)), 
        Ie(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), Ie(e, "shadowOffsetX", O(l.textShadowOffsetX, i.textShadowOffsetX, 0)), 
        Ie(e, "shadowOffsetY", O(l.textShadowOffsetY, i.textShadowOffsetY, 0)), Ie(e, "textAlign", s), 
        Ie(e, "textBaseline", "middle"), Ie(e, "font", n.font || ku);
        var d = De(l.textStroke || i.textStroke, p), f = Ce(l.textFill || i.textFill), p = P(l.textStrokeWidth, i.textStrokeWidth);
        d && (Ie(e, "lineWidth", p), Ie(e, "strokeStyle", d), e.strokeText(n.text, o, h)), 
        f && (Ie(e, "fillStyle", f), e.fillText(n.text, o, h));
    }
    function we(t) {
        return t.textBackgroundColor || t.textBorderWidth && t.textBorderColor;
    }
    function be(t, e, n, i, r, a, o) {
        var s = n.textBackgroundColor, l = n.textBorderWidth, u = n.textBorderColor, h = S(s);
        if (Ie(e, "shadowBlur", n.textBoxShadowBlur || 0), Ie(e, "shadowColor", n.textBoxShadowColor || "transparent"), 
        Ie(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), Ie(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), 
        h || l && u) {
            e.beginPath();
            var c = n.textBorderRadius;
            c ? ge(e, {
                x: i,
                y: r,
                width: a,
                height: o,
                r: c
            }) : e.rect(i, r, a, o), e.closePath();
        }
        if (h) Ie(e, "fillStyle", s), e.fill(); else if (M(s)) {
            var d = s.image;
            (d = te(d, null, t, Se, s)) && ne(d) && e.drawImage(d, i, r, a, o);
        }
        l && u && (Ie(e, "lineWidth", l), Ie(e, "strokeStyle", u), e.stroke());
    }
    function Se(t, e) {
        e.image = t;
    }
    function Me(t, e, n) {
        var i = e.x || 0, r = e.y || 0, a = e.textAlign, o = e.textVerticalAlign;
        if (n) {
            var s = e.textPosition;
            if (s instanceof Array) i = n.x + Te(s[0], n.width), r = n.y + Te(s[1], n.height); else {
                var l = function(t, e, n) {
                    var i = e.x, r = e.y, a = e.height, o = e.width, s = a / 2, l = "left", u = "top";
                    switch (t) {
                      case "left":
                        i -= n, r += s, l = "right", u = "middle";
                        break;

                      case "right":
                        i += n + o, r += s, u = "middle";
                        break;

                      case "top":
                        i += o / 2, r -= n, l = "center", u = "bottom";
                        break;

                      case "bottom":
                        i += o / 2, r += a + n, l = "center";
                        break;

                      case "inside":
                        i += o / 2, r += s, l = "center", u = "middle";
                        break;

                      case "insideLeft":
                        i += n, r += s, u = "middle";
                        break;

                      case "insideRight":
                        i += o - n, r += s, l = "right", u = "middle";
                        break;

                      case "insideTop":
                        i += o / 2, r += n, l = "center";
                        break;

                      case "insideBottom":
                        i += o / 2, r += a - n, l = "center", u = "bottom";
                        break;

                      case "insideTopLeft":
                        i += n, r += n;
                        break;

                      case "insideTopRight":
                        i += o - n, r += n, l = "right";
                        break;

                      case "insideBottomLeft":
                        i += n, r += a - n, u = "bottom";
                        break;

                      case "insideBottomRight":
                        i += o - n, r += a - n, l = "right", u = "bottom";
                    }
                    return {
                        x: i,
                        y: r,
                        textAlign: l,
                        textVerticalAlign: u
                    };
                }(s, n, e.textDistance);
                i = l.x, r = l.y, a = a || l.textAlign, o = o || l.textVerticalAlign;
            }
            var u = e.textOffset;
            u && (i += u[0], r += u[1]);
        }
        return {
            baseX: i,
            baseY: r,
            textAlign: a,
            textVerticalAlign: o
        };
    }
    function Ie(t, e, n) {
        return t[e] = gu(t, e, n), t[e];
    }
    function De(t, e) {
        return null == t || e <= 0 || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
    }
    function Ce(t) {
        return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
    }
    function Te(t, e) {
        return "string" == typeof t ? 0 <= t.lastIndexOf("%") ? parseFloat(t) / 100 * e : parseFloat(t) : t;
    }
    function ke(t, e, n) {
        return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];
    }
    function Ae(t, e) {
        return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding);
    }
    function Le(t) {
        for (var e in t = t || {}, nu.call(this, t), t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new vu(t.style, this), this._rect = null, this.__clipPaths = [];
    }
    function Pe(t) {
        Le.call(this, t);
    }
    function Oe(t) {
        return parseInt(t, 10);
    }
    function Ne(t, e, n, i) {
        return n = n || {}, i || !al.canvasSupported ? Ee(t, e, n) : al.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, 
        n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : Ee(t, e, n), 
        n;
    }
    function Ee(t, e, n) {
        var i, r = (i = t).getBoundingClientRect ? i.getBoundingClientRect() : {
            left: 0,
            top: 0
        };
        n.zrX = e.clientX - r.left, n.zrY = e.clientY - r.top;
    }
    function ze(t, e, n) {
        if (null != (e = e || window.event).zrX) return e;
        var i = e.type;
        if (i && 0 <= i.indexOf("touch")) {
            var r = "touchend" != i ? e.targetTouches[0] : e.changedTouches[0];
            r && Ne(t, r, e, n);
        } else Ne(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
        var a = e.button;
        return null == e.which && void 0 !== a && Vu.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), 
        e;
    }
    function Re(t) {
        var e = t[1][0] - t[0][0], n = t[1][1] - t[0][1];
        return Math.sqrt(e * e + n * n);
    }
    function Be(t) {
        return "mousewheel" === t && al.browser.firefox ? "DOMMouseScroll" : t;
    }
    function Fe(t, e, n) {
        var i = t._gestureMgr;
        "start" === n && i.clear();
        var r = i.recognize(e, t.handler.findHover(e.zrX, e.zrY, null).target, t.dom);
        if ("end" === n && i.clear(), r) {
            var a = r.type;
            e.gestureEvent = a, t.handler.dispatchToElement({
                target: r.target
            }, a, r.event);
        }
    }
    function Ve(t) {
        t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function() {
            t._touching = !1;
        }, 700);
    }
    function Ge(t) {
        var e = t.pointerType;
        return "pen" === e || "touch" === e;
    }
    function We(a) {
        function t(t, r) {
            R(t, function(t) {
                var e, n, i;
                e = a, n = Be(t), i = r._handlers[t], Fu ? e.addEventListener(n, i) : e.attachEvent("on" + n, i);
            }, r);
        }
        var i;
        Cl.call(this), this.dom = a, this._touching = !1, this._touchTimer, this._gestureMgr = new Wu(), 
        this._handlers = {}, i = this, R(ju, function(t) {
            i._handlers[t] = v(Yu[t], i);
        }), R(Xu, function(t) {
            i._handlers[t] = v(Yu[t], i);
        }), R(qu, function(t) {
            var e, n;
            i._handlers[t] = (e = Yu[t], n = i, function() {
                return n._touching ? void 0 : e.apply(n, arguments);
            });
        }), al.pointerEventsSupported ? t(Xu, this) : (al.touchEventsSupported && t(ju, this), 
        t(qu, this));
    }
    function He(t, e) {
        var n = new Ju(rl(), t, e);
        return Qu[n.id] = n;
    }
    function qe(t) {
        return t instanceof Array ? t : null == t ? [] : [ t ];
    }
    function je(t, e, n) {
        if (t) {
            t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
            for (var i = 0, r = n.length; i < r; i++) {
                var a = n[i];
                !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a]);
            }
        }
    }
    function Ue(t) {
        return !nh(t) || ih(t) || t instanceof Date ? t : t.value;
    }
    function Xe(t, r) {
        r = (r || []).slice();
        var a = T(t || [], function(t) {
            return {
                exist: t
            };
        });
        return eh(r, function(t, e) {
            if (nh(t)) {
                for (var n = 0; n < a.length; n++) if (!a[n].option && null != t.id && a[n].exist.id === t.id + "") return a[n].option = t, 
                void (r[e] = null);
                for (n = 0; n < a.length; n++) {
                    var i = a[n].exist;
                    if (!(a[n].option || null != i.id && null != t.id || null == t.name || Ze(t) || Ze(i) || i.name !== t.name + "")) return a[n].option = t, 
                    void (r[e] = null);
                }
            }
        }), eh(r, function(t) {
            if (nh(t)) {
                for (var e = 0; e < a.length; e++) {
                    var n = a[e].exist;
                    if (!a[e].option && !Ze(n) && null == t.id) {
                        a[e].option = t;
                        break;
                    }
                }
                e >= a.length && a.push({
                    option: t
                });
            }
        }), a;
    }
    function Ye(t) {
        var e = t.name;
        return !(!e || !e.indexOf(rh));
    }
    function Ze(t) {
        return nh(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0");
    }
    function $e(e, t) {
        return null != t.dataIndexInside ? t.dataIndexInside : null != t.dataIndex ? A(t.dataIndex) ? T(t.dataIndex, function(t) {
            return e.indexOfRawIndex(t);
        }) : e.indexOfRawIndex(t.dataIndex) : null != t.name ? A(t.name) ? T(t.name, function(t) {
            return e.indexOfName(t);
        }) : e.indexOfName(t.name) : void 0;
    }
    function Ke() {
        var e = "__\0ec_inner_" + oh++ + "_" + Math.random().toFixed(5);
        return function(t) {
            return t[e] || (t[e] = {});
        };
    }
    function Qe(s, l, u) {
        if (S(l)) {
            var t = {};
            t[l + "Index"] = 0, l = t;
        }
        var e = u && u.defaultMainType;
        !e || Je(l, e + "Index") || Je(l, e + "Id") || Je(l, e + "Name") || (l[e + "Index"] = 0);
        var h = {};
        return eh(l, function(t, e) {
            t = l[e];
            if ("dataIndex" !== e && "dataIndexInside" !== e) {
                var n = e.match(/^(\w+)(Index|Id|Name)$/) || [], i = n[1], r = (n[2] || "").toLowerCase();
                if (!(!i || !r || null == t || "index" === r && "none" === t || u && u.includeMainTypes && d(u.includeMainTypes, i) < 0)) {
                    var a = {
                        mainType: i
                    };
                    ("index" !== r || "all" !== t) && (a[r] = t);
                    var o = s.queryComponents(a);
                    h[i + "Models"] = o, h[i + "Model"] = o[0];
                }
            } else h[e] = t;
        }), h;
    }
    function Je(t, e) {
        return t && t.hasOwnProperty(e);
    }
    function tn(t, e, n) {
        t.setAttribute ? t.setAttribute(e, n) : t[e] = n;
    }
    function en(t) {
        var e = {
            main: "",
            sub: ""
        };
        return t && (t = t.split(sh), e.main = t[0] || "", e.sub = t[1] || ""), e;
    }
    function nn(t) {
        (t.$constructor = t).extend = function(t) {
            var e = this, n = function() {
                t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments);
            };
            return k(n.prototype, t), n.extend = this.extend, n.superCall = an, n.superApply = on, 
            a(n, this), n.superClass = e, n;
        };
    }
    function rn(t) {
        var e = [ "__\0is_clz", uh++, Math.random().toFixed(3) ].join("_");
        t.prototype[e] = !0, t.isInstance = function(t) {
            return !(!t || !t[e]);
        };
    }
    function an(t, e) {
        var n = l(arguments, 2);
        return this.superClass.prototype[e].apply(t, n);
    }
    function on(t, e, n) {
        return this.superClass.prototype[e].apply(t, n);
    }
    function sn(n, t) {
        t = t || {};
        var a = {};
        if (n.registerClass = function(t, e) {
            if (e) if (c(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(r = e), 'componentType "' + r + '" illegal'), 
            (e = en(e)).sub) {
                if (e.sub !== lh) ((i = a[(n = e).main]) && i[lh] || ((i = a[n.main] = {})[lh] = !0), 
                i)[e.sub] = t;
            } else a[e.main] = t;
            var n, i, r;
            return t;
        }, n.getClass = function(t, e, n) {
            var i = a[t];
            if (i && i[lh] && (i = e ? i[e] : null), n && !i) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
            return i;
        }, n.getClassesByMainType = function(t) {
            t = en(t);
            var n = [], e = a[t.main];
            return e && e[lh] ? R(e, function(t, e) {
                e !== lh && n.push(t);
            }) : n.push(e), n;
        }, n.hasClass = function(t) {
            return t = en(t), !!a[t.main];
        }, n.getAllClassMainTypes = function() {
            var n = [];
            return R(a, function(t, e) {
                n.push(e);
            }), n;
        }, n.hasSubTypes = function(t) {
            t = en(t);
            var e = a[t.main];
            return e && e[lh];
        }, n.parseClassType = en, t.registerWhenExtend) {
            var i = n.extend;
            i && (n.extend = function(t) {
                var e = i.call(this, t);
                return n.registerClass(e, t.type);
            });
        }
        return n;
    }
    function ln(t) {
        return -vh < t && t < vh;
    }
    function un(t) {
        return vh < t || t < -vh;
    }
    function hn(t, e, n, i, r) {
        var a = 1 - r;
        return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n);
    }
    function cn(t, e, n, i, r) {
        var a = 1 - r;
        return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r);
    }
    function dn(t, e, n, i, r) {
        var a = 6 * n - 12 * e + 6 * t, o = 9 * e + 3 * i - 3 * t - 9 * n, s = 3 * e - 3 * t, l = 0;
        if (ln(o)) {
            if (un(a)) 0 <= (h = -s / a) && h <= 1 && (r[l++] = h);
        } else {
            var u = a * a - 4 * o * s;
            if (ln(u)) r[0] = -a / (2 * o); else if (0 < u) {
                var h, c = mh(u), d = (-a - c) / (2 * o);
                0 <= (h = (-a + c) / (2 * o)) && h <= 1 && (r[l++] = h), 0 <= d && d <= 1 && (r[l++] = d);
            }
        }
        return l;
    }
    function fn(t, e, n, i, r, a) {
        var o = (e - t) * r + t, s = (n - e) * r + e, l = (i - n) * r + n, u = (s - o) * r + o, h = (l - s) * r + s, c = (h - u) * r + u;
        a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = i;
    }
    function pn(t, e, n, i) {
        var r = 1 - i;
        return r * (r * t + 2 * i * e) + i * i * n;
    }
    function gn(t, e, n, i) {
        return 2 * ((1 - i) * (e - t) + i * (n - e));
    }
    function mn(t, e, n) {
        var i = t + n - 2 * e;
        return 0 === i ? .5 : (t - e) / i;
    }
    function vn(t, e, n, i, r) {
        var a = (e - t) * i + t, o = (n - e) * i + e, s = (o - a) * i + a;
        r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n;
    }
    function yn(t, e, n) {
        if (0 !== t.length) {
            var i, r = t[0], a = r[0], o = r[0], s = r[1], l = r[1];
            for (i = 1; i < t.length; i++) r = t[i], a = Mh(a, r[0]), o = Ih(o, r[0]), s = Mh(s, r[1]), 
            l = Ih(l, r[1]);
            e[0] = a, e[1] = s, n[0] = o, n[1] = l;
        }
    }
    function _n(t, e, n, i, r, a) {
        r[0] = Mh(t, n), r[1] = Mh(e, i), a[0] = Ih(t, n), a[1] = Ih(e, i);
    }
    function xn(t, e, n, i, r, a, o, s, l, u) {
        var h, c = dn, d = hn, f = c(t, n, r, o, Ph);
        for (l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0, h = 0; h < f; h++) {
            var p = d(t, n, r, o, Ph[h]);
            l[0] = Mh(p, l[0]), u[0] = Ih(p, u[0]);
        }
        for (f = c(e, i, a, s, Oh), h = 0; h < f; h++) {
            var g = d(e, i, a, s, Oh[h]);
            l[1] = Mh(g, l[1]), u[1] = Ih(g, u[1]);
        }
        l[0] = Mh(t, l[0]), u[0] = Ih(t, u[0]), l[0] = Mh(o, l[0]), u[0] = Ih(o, u[0]), 
        l[1] = Mh(e, l[1]), u[1] = Ih(e, u[1]), l[1] = Mh(s, l[1]), u[1] = Ih(s, u[1]);
    }
    function wn(t, e, n, i, r, a, o, s, l) {
        var u = K, h = Q, c = Math.abs(r - a);
        if (c % Th < 1e-4 && 1e-4 < c) return s[0] = t - n, s[1] = e - i, l[0] = t + n, 
        void (l[1] = e + i);
        if (kh[0] = Ch(r) * n + t, kh[1] = Dh(r) * i + e, Ah[0] = Ch(a) * n + t, Ah[1] = Dh(a) * i + e, 
        u(s, kh, Ah), h(l, kh, Ah), (r %= Th) < 0 && (r += Th), (a %= Th) < 0 && (a += Th), 
        a < r && !o ? a += Th : r < a && o && (r += Th), o) {
            var d = a;
            a = r, r = d;
        }
        for (var f = 0; f < a; f += Math.PI / 2) r < f && (Lh[0] = Ch(f) * n + t, Lh[1] = Dh(f) * i + e, 
        u(s, Lh, s), h(l, Lh, l));
    }
    function bn(t, e, n, i, r, a, o) {
        if (0 === r) return !1;
        var s, l = r;
        if (e + l < o && i + l < o || o < e - l && o < i - l || t + l < a && n + l < a || a < t - l && a < n - l) return !1;
        if (t === n) return Math.abs(a - t) <= l / 2;
        var u = (s = (e - i) / (t - n)) * a - o + (t * i - n * e) / (t - n);
        return u * u / (s * s + 1) <= l / 2 * l / 2;
    }
    function Sn(t, e, n, i, r, a, o, s, l, u, h) {
        if (0 === l) return !1;
        var c = l;
        return !(e + c < h && i + c < h && a + c < h && s + c < h || h < e - c && h < i - c && h < a - c && h < s - c || t + c < u && n + c < u && r + c < u && o + c < u || u < t - c && u < n - c && u < r - c && u < o - c) && function(t, e, n, i, r, a, o, s, l, u, h) {
            var c, d, f, p, g, m = .005, v = 1 / 0;
            wh[0] = l, wh[1] = u;
            for (var y = 0; y < 1; y += .05) bh[0] = hn(t, n, r, o, y), bh[1] = hn(e, i, a, s, y), 
            (p = Ml(wh, bh)) < v && (c = y, v = p);
            v = 1 / 0;
            for (var _ = 0; _ < 32 && !(m < yh); _++) d = c - m, f = c + m, bh[0] = hn(t, n, r, o, d), 
            bh[1] = hn(e, i, a, s, d), p = Ml(bh, wh), 0 <= d && p < v ? (c = d, v = p) : (Sh[0] = hn(t, n, r, o, f), 
            Sh[1] = hn(e, i, a, s, f), g = Ml(Sh, wh), f <= 1 && g < v ? (c = f, v = g) : m *= .5);
            return h && (h[0] = hn(t, n, r, o, c), h[1] = hn(e, i, a, s, c)), mh(v);
        }(t, e, n, i, r, a, o, s, u, h, null) <= c / 2;
    }
    function Mn(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var u = o;
        return !(e + u < l && i + u < l && a + u < l || l < e - u && l < i - u && l < a - u || t + u < s && n + u < s && r + u < s || s < t - u && s < n - u && s < r - u) && function(t, e, n, i, r, a, o, s, l) {
            var u, h = .005, c = 1 / 0;
            wh[0] = o, wh[1] = s;
            for (var d = 0; d < 1; d += .05) bh[0] = pn(t, n, r, d), bh[1] = pn(e, i, a, d), 
            (m = Ml(wh, bh)) < c && (u = d, c = m);
            c = 1 / 0;
            for (var f = 0; f < 32 && !(h < yh); f++) {
                var p = u - h, g = u + h;
                bh[0] = pn(t, n, r, p), bh[1] = pn(e, i, a, p);
                var m = Ml(bh, wh);
                if (0 <= p && m < c) u = p, c = m; else {
                    Sh[0] = pn(t, n, r, g), Sh[1] = pn(e, i, a, g);
                    var v = Ml(Sh, wh);
                    g <= 1 && v < c ? (u = g, c = v) : h *= .5;
                }
            }
            return l && (l[0] = pn(t, n, r, u), l[1] = pn(e, i, a, u)), mh(c);
        }(t, e, n, i, r, a, s, l, null) <= u / 2;
    }
    function In(t) {
        return (t %= Xh) < 0 && (t += Xh), t;
    }
    function Dn(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var u = o;
        s -= t, l -= e;
        var h = Math.sqrt(s * s + l * l);
        if (n < h - u || h + u < n) return !1;
        if (Math.abs(i - r) % Yh < 1e-4) return !0;
        if (a) {
            var c = i;
            i = In(r), r = In(c);
        } else i = In(i), r = In(r);
        r < i && (r += Yh);
        var d = Math.atan2(l, s);
        return d < 0 && (d += Yh), i <= d && d <= r || i <= d + Yh && d + Yh <= r;
    }
    function Cn(t, e, n, i, r, a) {
        if (e < a && i < a || a < e && a < i) return 0;
        if (i === e) return 0;
        var o = i < e ? 1 : -1, s = (a - e) / (i - e);
        (1 === s || 0 === s) && (o = i < e ? .5 : -.5);
        var l = s * (n - t) + t;
        return l === r ? 1 / 0 : r < l ? o : 0;
    }
    function Tn(t, e, n, i, r, a, o, s, l, u) {
        if (e < u && i < u && a < u && s < u || u < e && u < i && u < a && u < s) return 0;
        var h, c = function(t, e, n, i, r, a) {
            var o = i + 3 * (e - n) - t, s = 3 * (n - 2 * e + t), l = 3 * (e - t), u = t - r, h = s * s - 3 * o * l, c = s * l - 9 * o * u, d = l * l - 3 * s * u, f = 0;
            if (ln(h) && ln(c)) ln(s) ? a[0] = 0 : 0 <= (M = -l / s) && M <= 1 && (a[f++] = M); else {
                var p = c * c - 4 * h * d;
                if (ln(p)) {
                    var g = c / h, m = -g / 2;
                    0 <= (M = -s / o + g) && M <= 1 && (a[f++] = M), 0 <= m && m <= 1 && (a[f++] = m);
                } else if (0 < p) {
                    var v = mh(p), y = h * s + 1.5 * o * (-c + v), _ = h * s + 1.5 * o * (-c - v);
                    0 <= (M = (-s - ((y = y < 0 ? -gh(-y, xh) : gh(y, xh)) + (_ = _ < 0 ? -gh(-_, xh) : gh(_, xh)))) / (3 * o)) && M <= 1 && (a[f++] = M);
                } else {
                    var x = (2 * h * s - 3 * o * c) / (2 * mh(h * h * h)), w = Math.acos(x) / 3, b = mh(h), S = Math.cos(w), M = (-s - 2 * b * S) / (3 * o), I = (m = (-s + b * (S + _h * Math.sin(w))) / (3 * o), 
                    (-s + b * (S - _h * Math.sin(w))) / (3 * o));
                    0 <= M && M <= 1 && (a[f++] = M), 0 <= m && m <= 1 && (a[f++] = m), 0 <= I && I <= 1 && (a[f++] = I);
                }
            }
            return f;
        }(e, i, a, s, u, Qh);
        if (0 === c) return 0;
        for (var d, f, p = 0, g = -1, m = 0; m < c; m++) {
            var v = Qh[m], y = 0 === v || 1 === v ? .5 : 1;
            hn(t, n, r, o, v) < l || (g < 0 && (g = dn(e, i, a, s, Jh), Jh[1] < Jh[0] && 1 < g && (void 0, 
            h = Jh[0], Jh[0] = Jh[1], Jh[1] = h), d = hn(e, i, a, s, Jh[0]), 1 < g && (f = hn(e, i, a, s, Jh[1]))), 
            p += 2 == g ? v < Jh[0] ? d < e ? y : -y : v < Jh[1] ? f < d ? y : -y : s < f ? y : -y : v < Jh[0] ? d < e ? y : -y : s < d ? y : -y);
        }
        return p;
    }
    function kn(t, e, n, i, r, a, o, s) {
        if (e < s && i < s && a < s || s < e && s < i && s < a) return 0;
        var l = function(t, e, n, i, r) {
            var a = t - 2 * e + n, o = 2 * (e - t), s = t - i, l = 0;
            if (ln(a)) un(o) && 0 <= (h = -s / o) && h <= 1 && (r[l++] = h); else {
                var u = o * o - 4 * a * s;
                if (ln(u)) 0 <= (h = -o / (2 * a)) && h <= 1 && (r[l++] = h); else if (0 < u) {
                    var h, c = mh(u), d = (-o - c) / (2 * a);
                    0 <= (h = (-o + c) / (2 * a)) && h <= 1 && (r[l++] = h), 0 <= d && d <= 1 && (r[l++] = d);
                }
            }
            return l;
        }(e, i, a, s, Qh);
        if (0 === l) return 0;
        var u = mn(e, i, a);
        if (0 <= u && u <= 1) {
            for (var h = 0, c = pn(e, i, a, u), d = 0; d < l; d++) {
                var f = 0 === Qh[d] || 1 === Qh[d] ? .5 : 1;
                pn(t, n, r, Qh[d]) < o || (h += Qh[d] < u ? c < e ? f : -f : a < c ? f : -f);
            }
            return h;
        }
        f = 0 === Qh[0] || 1 === Qh[0] ? .5 : 1;
        return pn(t, n, r, Qh[0]) < o ? 0 : a < e ? f : -f;
    }
    function An(t, e, n, i, r, a, o, s) {
        if (n < (s -= e) || s < -n) return 0;
        var l = Math.sqrt(n * n - s * s);
        Qh[0] = -l, Qh[1] = l;
        var u = Math.abs(i - r);
        if (u < 1e-4) return 0;
        if (u % $h < 1e-4) {
            r = $h;
            var h = a ? 1 : -1;
            return o >= Qh[i = 0] + t && o <= Qh[1] + t ? h : 0;
        }
        if (a) {
            l = i;
            i = In(r), r = In(l);
        } else i = In(i), r = In(r);
        r < i && (r += $h);
        for (var c = 0, d = 0; d < 2; d++) {
            var f = Qh[d];
            if (o < f + t) {
                var p = Math.atan2(s, f);
                h = a ? 1 : -1;
                p < 0 && (p = $h + p), (i <= p && p <= r || i <= p + $h && p + $h <= r) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (h = -h), 
                c += h);
            }
        }
        return c;
    }
    function Ln(t, e, n, i, r) {
        for (var a = 0, o = 0, s = 0, l = 0, u = 0, h = 0; h < t.length; ) {
            var c = t[h++];
            switch (c === Zh.M && 1 < h && (n || (a += Cn(o, s, l, u, i, r))), 1 == h && (l = o = t[h], 
            u = s = t[h + 1]), c) {
              case Zh.M:
                o = l = t[h++], s = u = t[h++];
                break;

              case Zh.L:
                if (n) {
                    if (bn(o, s, t[h], t[h + 1], e, i, r)) return !0;
                } else a += Cn(o, s, t[h], t[h + 1], i, r) || 0;
                o = t[h++], s = t[h++];
                break;

              case Zh.C:
                if (n) {
                    if (Sn(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0;
                } else a += Tn(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
                o = t[h++], s = t[h++];
                break;

              case Zh.Q:
                if (n) {
                    if (Mn(o, s, t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0;
                } else a += kn(o, s, t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
                o = t[h++], s = t[h++];
                break;

              case Zh.A:
                var d = t[h++], f = t[h++], p = t[h++], g = t[h++], m = t[h++], v = t[h++], y = (t[h++], 
                1 - t[h++]), _ = Math.cos(m) * p + d, x = Math.sin(m) * g + f;
                1 < h ? a += Cn(o, s, _, x, i, r) : (l = _, u = x);
                var w = (i - d) * g / p + d;
                if (n) {
                    if (Dn(d, f, g, m, m + v, y, e, w, r)) return !0;
                } else a += An(d, f, g, m, m + v, y, w, r);
                o = Math.cos(m + v) * p + d, s = Math.sin(m + v) * g + f;
                break;

              case Zh.R:
                l = o = t[h++], u = s = t[h++];
                _ = l + t[h++], x = u + t[h++];
                if (n) {
                    if (bn(l, u, _, u, e, i, r) || bn(_, u, _, x, e, i, r) || bn(_, x, l, x, e, i, r) || bn(l, x, l, u, e, i, r)) return !0;
                } else a += Cn(_, u, _, x, i, r), a += Cn(l, x, l, u, i, r);
                break;

              case Zh.Z:
                if (n) {
                    if (bn(o, s, l, u, e, i, r)) return !0;
                } else a += Cn(o, s, l, u, i, r);
                o = l, s = u;
            }
        }
        return n || (b = s, S = u, Math.abs(b - S) < Kh) || (a += Cn(o, s, l, u, i, r) || 0), 
        0 !== a;
        var b, S;
    }
    function Pn(t) {
        Le.call(this, t), this.path = null;
    }
    function On(t, e, n, i, r, a, o, s, l, u, h) {
        var c = l * (dc / 180), d = cc(c) * (t - n) / 2 + hc(c) * (e - i) / 2, f = -1 * hc(c) * (t - n) / 2 + cc(c) * (e - i) / 2, p = d * d / (o * o) + f * f / (s * s);
        1 < p && (o *= uc(p), s *= uc(p));
        var g = (r === a ? -1 : 1) * uc((o * o * s * s - o * o * f * f - s * s * d * d) / (o * o * f * f + s * s * d * d)) || 0, m = g * o * f / s, v = g * -s * d / o, y = (t + n) / 2 + cc(c) * m - hc(c) * v, _ = (e + i) / 2 + hc(c) * m + cc(c) * v, x = gc([ 1, 0 ], [ (d - m) / o, (f - v) / s ]), w = [ (d - m) / o, (f - v) / s ], b = [ (-1 * d - m) / o, (-1 * f - v) / s ], S = gc(w, b);
        pc(w, b) <= -1 && (S = dc), 1 <= pc(w, b) && (S = 0), 0 === a && 0 < S && (S -= 2 * dc), 
        1 === a && S < 0 && (S += 2 * dc), h.addData(u, y, _, o, s, x, S, c, a);
    }
    function Nn(t, e) {
        var n = function(t) {
            if (!t) return [];
            var e, n = t.replace(/-/g, " -").replace(/  /g, " ").replace(/ /g, ",").replace(/,,/g, ",");
            for (e = 0; e < lc.length; e++) n = n.replace(new RegExp(lc[e], "g"), "|" + lc[e]);
            var i, r = n.split("|"), a = 0, o = 0, s = new Uh(), l = Uh.CMD;
            for (e = 1; e < r.length; e++) {
                var u, h = r[e], c = h.charAt(0), d = 0, f = h.slice(1).replace(/e,-/g, "e-").split(",");
                0 < f.length && "" === f[0] && f.shift();
                for (var p = 0; p < f.length; p++) f[p] = parseFloat(f[p]);
                for (;d < f.length && !isNaN(f[d]) && !isNaN(f[0]); ) {
                    var g, m, v, y, _, x, w, b = a, S = o;
                    switch (c) {
                      case "l":
                        a += f[d++], o += f[d++], u = l.L, s.addData(u, a, o);
                        break;

                      case "L":
                        a = f[d++], o = f[d++], u = l.L, s.addData(u, a, o);
                        break;

                      case "m":
                        a += f[d++], o += f[d++], u = l.M, s.addData(u, a, o), c = "l";
                        break;

                      case "M":
                        a = f[d++], o = f[d++], u = l.M, s.addData(u, a, o), c = "L";
                        break;

                      case "h":
                        a += f[d++], u = l.L, s.addData(u, a, o);
                        break;

                      case "H":
                        a = f[d++], u = l.L, s.addData(u, a, o);
                        break;

                      case "v":
                        o += f[d++], u = l.L, s.addData(u, a, o);
                        break;

                      case "V":
                        o = f[d++], u = l.L, s.addData(u, a, o);
                        break;

                      case "C":
                        u = l.C, s.addData(u, f[d++], f[d++], f[d++], f[d++], f[d++], f[d++]), a = f[d - 2], 
                        o = f[d - 1];
                        break;

                      case "c":
                        u = l.C, s.addData(u, f[d++] + a, f[d++] + o, f[d++] + a, f[d++] + o, f[d++] + a, f[d++] + o), 
                        a += f[d - 2], o += f[d - 1];
                        break;

                      case "S":
                        g = a, m = o;
                        var M = s.len(), I = s.data;
                        i === l.C && (g += a - I[M - 4], m += o - I[M - 3]), u = l.C, b = f[d++], S = f[d++], 
                        a = f[d++], o = f[d++], s.addData(u, g, m, b, S, a, o);
                        break;

                      case "s":
                        g = a, m = o, M = s.len(), I = s.data, i === l.C && (g += a - I[M - 4], m += o - I[M - 3]), 
                        u = l.C, b = a + f[d++], S = o + f[d++], a += f[d++], o += f[d++], s.addData(u, g, m, b, S, a, o);
                        break;

                      case "Q":
                        b = f[d++], S = f[d++], a = f[d++], o = f[d++], u = l.Q, s.addData(u, b, S, a, o);
                        break;

                      case "q":
                        b = f[d++] + a, S = f[d++] + o, a += f[d++], o += f[d++], u = l.Q, s.addData(u, b, S, a, o);
                        break;

                      case "T":
                        g = a, m = o, M = s.len(), I = s.data, i === l.Q && (g += a - I[M - 4], m += o - I[M - 3]), 
                        a = f[d++], o = f[d++], u = l.Q, s.addData(u, g, m, a, o);
                        break;

                      case "t":
                        g = a, m = o, M = s.len(), I = s.data, i === l.Q && (g += a - I[M - 4], m += o - I[M - 3]), 
                        a += f[d++], o += f[d++], u = l.Q, s.addData(u, g, m, a, o);
                        break;

                      case "A":
                        v = f[d++], y = f[d++], _ = f[d++], x = f[d++], w = f[d++], On(b = a, S = o, a = f[d++], o = f[d++], x, w, v, y, _, u = l.A, s);
                        break;

                      case "a":
                        v = f[d++], y = f[d++], _ = f[d++], x = f[d++], w = f[d++], On(b = a, S = o, a += f[d++], o += f[d++], x, w, v, y, _, u = l.A, s);
                    }
                }
                ("z" === c || "Z" === c) && (u = l.Z, s.addData(u)), i = u;
            }
            return s.toStatic(), s;
        }(t);
        return (e = e || {}).buildPath = function(t) {
            if (t.setData) {
                t.setData(n.data), (e = t.getContext()) && t.rebuildPath(e);
            } else {
                var e = t;
                n.rebuildPath(e);
            }
        }, e.applyTransform = function(t) {
            sc(n, t), this.dirty(!0);
        }, e;
    }
    function En(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e;
    }
    function zn(t, e, n) {
        var i = e.points, r = e.smooth;
        if (i && 2 <= i.length) {
            if (r && "spline" !== r) {
                var a = function(t, e, n, i) {
                    var r, a, o, s, l = [], u = [], h = [], c = [];
                    if (i) {
                        o = [ 1 / 0, 1 / 0 ], s = [ -1 / 0, -1 / 0 ];
                        for (var d = 0, f = t.length; d < f; d++) K(o, o, t[d]), Q(s, s, t[d]);
                        K(o, o, i[0]), Q(s, s, i[1]);
                    }
                    for (var d = 0, f = t.length; d < f; d++) {
                        var p = t[d];
                        if (n) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f]; else {
                            if (0 === d || d === f - 1) {
                                l.push(V(t[d]));
                                continue;
                            }
                            r = t[d - 1], a = t[d + 1];
                        }
                        H(u, a, r), U(u, u, e);
                        var g = Y(p, r), m = Y(p, a), v = g + m;
                        0 !== v && (g /= v, m /= v), U(h, u, -g), U(c, u, m);
                        var y = G([], p, h), _ = G([], p, c);
                        i && (Q(y, y, o), K(y, y, s), Q(_, _, o), K(_, _, s)), l.push(y), l.push(_);
                    }
                    return n && l.push(l.shift()), l;
                }(i, r, n, e.smoothConstraint);
                t.moveTo(i[0][0], i[0][1]);
                for (var o = i.length, s = 0; s < (n ? o : o - 1); s++) {
                    var l = a[2 * s], u = a[2 * s + 1], h = i[(s + 1) % o];
                    t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
                }
            } else {
                "spline" === r && (i = function(t, e) {
                    for (var n = t.length, i = [], r = 0, a = 1; a < n; a++) r += Y(t[a - 1], t[a]);
                    var o = r / 2;
                    o = o < n ? n : o;
                    for (var a = 0; a < o; a++) {
                        var s, l, u, h = a / (o - 1) * (e ? n : n - 1), c = Math.floor(h), d = h - c, f = t[c % n];
                        e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], u = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], 
                        l = t[n - 2 < c ? n - 1 : c + 1], u = t[n - 3 < c ? n - 1 : c + 2]);
                        var p = d * d, g = d * p;
                        i.push([ En(s[0], f[0], l[0], u[0], d, p, g), En(s[1], f[1], l[1], u[1], d, p, g) ]);
                    }
                    return i;
                }(i, n)), t.moveTo(i[0][0], i[0][1]);
                s = 1;
                for (var c = i.length; s < c; s++) t.lineTo(i[s][0], i[s][1]);
            }
            n && t.closePath();
        }
    }
    function Rn(t, e, n) {
        var i = t.cpx2, r = t.cpy2;
        return null === i || null === r ? [ (n ? cn : hn)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? cn : hn)(t.y1, t.cpy1, t.cpy2, t.y2, e) ] : [ (n ? gn : pn)(t.x1, t.cpx1, t.x2, e), (n ? gn : pn)(t.y1, t.cpy1, t.y2, e) ];
    }
    function Bn(t) {
        Le.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, 
        this.notClear = !0;
    }
    function Fn(t) {
        return Pn.extend(t);
    }
    function Vn(t, e, n, i) {
        var r = new Pn(Nn(t, e)), a = r.getBoundingRect();
        return n && ("center" === i && (n = Wn(n, a)), Hn(r, n)), r;
    }
    function Gn(t, n, i) {
        var r = new Pe({
            style: {
                image: t,
                x: n.x,
                y: n.y,
                width: n.width,
                height: n.height
            },
            onload: function(t) {
                if ("center" === i) {
                    var e = {
                        width: t.width,
                        height: t.height
                    };
                    r.setStyle(Wn(n, e));
                }
            }
        });
        return r;
    }
    function Wn(t, e) {
        var n, i = e.width / e.height, r = t.height * i;
        return r <= t.width ? n = t.height : n = (r = t.width) / i, {
            x: t.x + t.width / 2 - r / 2,
            y: t.y + t.height / 2 - n / 2,
            width: r,
            height: n
        };
    }
    function Hn(t, e) {
        if (t.applyTransform) {
            var n = t.getBoundingRect().calculateTransform(e);
            t.applyTransform(n);
        }
    }
    function qn(t) {
        var e = t.shape, n = t.style.lineWidth;
        return Nc(2 * e.x1) === Nc(2 * e.x2) && (e.x1 = e.x2 = Un(e.x1, n, !0)), Nc(2 * e.y1) === Nc(2 * e.y2) && (e.y1 = e.y2 = Un(e.y1, n, !0)), 
        t;
    }
    function jn(t) {
        var e = t.shape, n = t.style.lineWidth, i = e.x, r = e.y, a = e.width, o = e.height;
        return e.x = Un(e.x, n, !0), e.y = Un(e.y, n, !0), e.width = Math.max(Un(i + a, n, !1) - e.x, 0 === a ? 0 : 1), 
        e.height = Math.max(Un(r + o, n, !1) - e.y, 0 === o ? 0 : 1), t;
    }
    function Un(t, e, n) {
        var i = Nc(2 * t);
        return (i + Nc(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
    }
    function Xn(t) {
        return null != t && "none" != t;
    }
    function Yn(t) {
        return "string" == typeof t ? Mt(t, -.1) : t;
    }
    function Zn(t) {
        if (t.__hoverStlDirty) {
            var e = t.style.stroke, n = t.style.fill, i = t.__hoverStl;
            i.fill = i.fill || (Xn(n) ? Yn(n) : null), i.stroke = i.stroke || (Xn(e) ? Yn(e) : null);
            var r = {};
            for (var a in i) null != i[a] && (r[a] = t.style[a]);
            t.__normalStl = r, t.__hoverStlDirty = !1;
        }
    }
    function $n(t) {
        if (!t.__isHover) {
            if (Zn(t), t.useHoverLayer) t.__zr && t.__zr.addHover(t, t.__hoverStl); else {
                var e = t.style, n = e.insideRollbackOpt;
                n && ((r = (i = e).insideRollback) && (i.textFill = r.textFill, i.textStroke = r.textStroke, 
                i.textStrokeWidth = r.textStrokeWidth)), e.extendFrom(t.__hoverStl), n && (ci(e, e.insideOriginalTextPosition, n), 
                null == e.textFill && (e.textFill = n.autoColor)), t.dirty(!1), t.z2 += 1;
            }
            t.__isHover = !0;
        }
        var i, r;
    }
    function Kn(t) {
        if (t.__isHover) {
            var e = t.__normalStl;
            t.useHoverLayer ? t.__zr && t.__zr.removeHover(t) : (e && t.setStyle(e), t.z2 -= 1), 
            t.__isHover = !1;
        }
    }
    function Qn(t) {
        "group" === t.type ? t.traverse(function(t) {
            "group" !== t.type && $n(t);
        }) : $n(t);
    }
    function Jn(t) {
        "group" === t.type ? t.traverse(function(t) {
            "group" !== t.type && Kn(t);
        }) : Kn(t);
    }
    function ti(t, e) {
        t.__hoverStl = t.hoverStyle || e || {}, t.__hoverStlDirty = !0, t.__isHover && Zn(t);
    }
    function ei(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && Qn(this);
    }
    function ni(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && Jn(this);
    }
    function ii() {
        this.__isEmphasis = !0, Qn(this);
    }
    function ri() {
        this.__isEmphasis = !1, Jn(this);
    }
    function ai(t, e, n) {
        t.__hoverSilentOnTouch = n && n.hoverSilentOnTouch, "group" === t.type ? t.traverse(function(t) {
            "group" !== t.type && ti(t, e);
        }) : ti(t, e), t.on("mouseover", ei).on("mouseout", ni), t.on("emphasis", ii).on("normal", ri);
    }
    function oi(t, e, n, i, r, a, o) {
        var s, l = (r = r || Rc).labelFetcher, u = r.labelDataIndex, h = r.labelDimIndex, c = n.getShallow("show"), d = i.getShallow("show");
        (c || d) && (l && (s = l.getFormattedLabel(u, "normal", null, h)), null == s && (s = _(r.defaultText) ? r.defaultText(u, r) : r.defaultText));
        var f = c ? s : null, p = d ? P(l ? l.getFormattedLabel(u, "emphasis", null, h) : null, s) : null;
        (null != f || null != p) && (si(t, n, a, r), si(e, i, o, r, !0)), t.text = f, e.text = p;
    }
    function si(t, e, n, i, r) {
        return li(t, e, i, r), n && k(t, n), t.host && t.host.dirty && t.host.dirty(!1), 
        t;
    }
    function li(t, e, n, i) {
        if ((n = n || Rc).isRectText) {
            var r = e.getShallow("position") || (i ? null : "inside");
            "outside" === r && (r = "top"), t.textPosition = r, t.textOffset = e.getShallow("offset");
            var a = e.getShallow("rotate");
            null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = P(e.getShallow("distance"), i ? null : 5);
        }
        var o, s = e.ecModel, l = s && s.option.textStyle, u = function(t) {
            for (var e; t && t !== t.ecModel; ) {
                var n = (t.option || Rc).rich;
                if (n) for (var i in e = e || {}, n) n.hasOwnProperty(i) && (e[i] = 1);
                t = t.parentModel;
            }
            return e;
        }(e);
        if (u) for (var h in o = {}, u) if (u.hasOwnProperty(h)) {
            var c = e.getModel([ "rich", h ]);
            ui(o[h] = {}, c, l, n, i);
        }
        return t.rich = o, ui(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), 
        t;
    }
    function ui(t, e, n, i, r, a) {
        if (n = !r && n || Rc, t.textFill = hi(e.getShallow("color"), i) || n.color, t.textStroke = hi(e.getShallow("textBorderColor"), i) || n.textBorderColor, 
        t.textStrokeWidth = P(e.getShallow("textBorderWidth"), n.textBorderWidth), !r) {
            if (a) {
                var o = t.textPosition;
                t.insideRollback = ci(t, o, i), t.insideOriginalTextPosition = o, t.insideRollbackOpt = i;
            }
            null == t.textFill && (t.textFill = i.autoColor);
        }
        t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, 
        t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, 
        t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), 
        t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), 
        t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = hi(e.getShallow("backgroundColor"), i), 
        t.textPadding = e.getShallow("padding"), t.textBorderColor = hi(e.getShallow("borderColor"), i), 
        t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), 
        t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), 
        t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), 
        t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, 
        t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, 
        t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY;
    }
    function hi(t, e) {
        return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;
    }
    function ci(t, e, n) {
        var i, r = n.useInsideStyle;
        return null == t.textFill && !1 !== r && (!0 === r || n.isRectText && e && "string" == typeof e && 0 <= e.indexOf("inside")) && (i = {
            textFill: null,
            textStroke: t.textStroke,
            textStrokeWidth: t.textStrokeWidth
        }, t.textFill = "#fff", null == t.textStroke && (t.textStroke = n.autoColor, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), 
        i;
    }
    function di(t, e) {
        var n = e || e.getModel("textStyle");
        return f([ t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif" ].join(" "));
    }
    function fi(t, e, n, i, r, a) {
        if ("function" == typeof r && (a = r, r = null), i && i.isAnimationEnabled()) {
            var o = t ? "Update" : "", s = i.getShallow("animationDuration" + o), l = i.getShallow("animationEasing" + o), u = i.getShallow("animationDelay" + o);
            "function" == typeof u && (u = u(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), 
            "function" == typeof s && (s = s(r)), 0 < s ? e.animateTo(n, s, u || 0, l, a, !!a) : (e.stopAnimation(), 
            e.attr(n), a && a());
        } else e.stopAnimation(), e.attr(n), a && a();
    }
    function pi(t, e, n, i, r) {
        fi(!0, t, e, n, i, r);
    }
    function gi(t, e, n, i, r) {
        fi(!1, t, e, n, i, r);
    }
    function mi(t, e, n) {
        return e && !N(e) && (e = Nl.getLocalTransform(e)), n && (e = ht([], e)), $([], t, e);
    }
    function vi(t, e, i) {
        function r(t) {
            var e = {
                position: V(t.position),
                rotation: t.rotation
            };
            return t.shape && (e.shape = k({}, t.shape)), e;
        }
        if (t && e) {
            var a = (n = {}, t.traverse(function(t) {
                !t.isGroup && t.anid && (n[t.anid] = t);
            }), n);
            e.traverse(function(t) {
                if (!t.isGroup && t.anid) {
                    var e = a[t.anid];
                    if (e) {
                        var n = r(t);
                        t.attr(r(e)), pi(t, n, i, t.dataIndex);
                    }
                }
            });
        }
        var n;
    }
    function yi(t, e, n) {
        var i = (e = k({
            rectHover: !0
        }, e)).style = {
            strokeNoScale: !0
        };
        return n = n || {
            x: -1,
            y: -1,
            width: 2,
            height: 2
        }, t ? 0 === t.indexOf("image://") ? (i.image = t.slice(8), C(i, n), new Pe(e)) : Vn(t.replace("path://", ""), e, n, "center") : void 0;
    }
    function _i(t, e, n) {
        this.parentModel = e, this.ecModel = n, this.option = t;
    }
    function xi(t, e, n) {
        for (var i = 0; i < e.length && (!e[i] || null != (t = t && "object" == (void 0 === t ? "undefined" : _typeof(t)) ? t[e[i]] : null)); i++) ;
        return null == t && n && (t = n.get(e)), t;
    }
    function wi(t, e) {
        var n = jc(t).getParent;
        return n ? n.call(t, e) : t.parentModel;
    }
    function bi(t) {
        return [ t || "", Yc++, Math.random().toFixed(5) ].join("_");
    }
    function Si(t, e, n, i) {
        var r = e[1] - e[0], a = n[1] - n[0];
        if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;
        if (i) if (0 < r) {
            if (t <= e[0]) return n[0];
            if (t >= e[1]) return n[1];
        } else {
            if (t >= e[0]) return n[0];
            if (t <= e[1]) return n[1];
        } else {
            if (t === e[0]) return n[0];
            if (t === e[1]) return n[1];
        }
        return (t - e[0]) / r * a + n[0];
    }
    function Mi(t, e) {
        switch (t) {
          case "center":
          case "middle":
            t = "50%";
            break;

          case "left":
          case "top":
            t = "0%";
            break;

          case "right":
          case "bottom":
            t = "100%";
        }
        return "string" == typeof t ? (n = t, n.replace(/^\s+/, "").replace(/\s+$/, "")).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t;
        var n;
    }
    function Ii(t, e, n) {
        return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), 
        n ? t : +t;
    }
    function Di(t) {
        if (t = +t, isNaN(t)) return 0;
        for (var e = 1, n = 0; Math.round(t * e) / e !== t; ) e *= 10, n++;
        return n;
    }
    function Ci(t) {
        var e = t.toString(), n = e.indexOf("e");
        if (0 < n) {
            var i = +e.slice(n + 1);
            return i < 0 ? -i : 0;
        }
        var r = e.indexOf(".");
        return r < 0 ? 0 : e.length - 1 - r;
    }
    function Ti(t, e) {
        var n = Math.log, i = Math.LN10, r = Math.floor(n(t[1] - t[0]) / i), a = Math.round(n(Math.abs(e[1] - e[0])) / i), o = Math.min(Math.max(-r + a, 0), 20);
        return isFinite(o) ? o : 20;
    }
    function ki(t, e, n) {
        if (!t[e]) return 0;
        var i = g(t, function(t, e) {
            return t + (isNaN(e) ? 0 : e);
        }, 0);
        if (0 === i) return 0;
        for (var r = Math.pow(10, n), a = T(t, function(t) {
            return (isNaN(t) ? 0 : t) / i * r * 100;
        }), o = 100 * r, s = T(a, function(t) {
            return Math.floor(t);
        }), l = g(s, function(t, e) {
            return t + e;
        }, 0), u = T(a, function(t, e) {
            return t - s[e];
        }); l < o; ) {
            for (var h = Number.NEGATIVE_INFINITY, c = null, d = 0, f = u.length; d < f; ++d) u[d] > h && (h = u[d], 
            c = d);
            ++s[c], u[c] = 0, ++l;
        }
        return s[e] / r;
    }
    function Ai(t) {
        var e = 2 * Math.PI;
        return (t % e + e) % e;
    }
    function Li(t) {
        return -Zc < t && t < Zc;
    }
    function Pi(t) {
        if (t instanceof Date) return t;
        if ("string" == typeof t) {
            var e = $c.exec(t);
            if (!e) return new Date(NaN);
            if (e[8]) {
                var n = +e[4] || 0;
                return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0));
            }
            return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0);
        }
        return new Date(null == t ? NaN : Math.round(t));
    }
    function Oi(t) {
        return Math.pow(10, Ni(t));
    }
    function Ni(t) {
        return Math.floor(Math.log(t) / Math.LN10);
    }
    function Ei(t, e) {
        var n = Ni(t), i = Math.pow(10, n), r = t / i;
        return t = (e ? r < 1.5 ? 1 : r < 2.5 ? 2 : r < 4 ? 3 : r < 7 ? 5 : 10 : r < 1 ? 1 : r < 2 ? 2 : r < 3 ? 3 : r < 5 ? 5 : 10) * i, 
        -20 <= n ? +t.toFixed(n < 0 ? -n : 0) : t;
    }
    function zi(t) {
        return isNaN(t) ? "-" : (t = (t + "").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (1 < t.length ? "." + t[1] : "");
    }
    function Ri(t) {
        return null == t ? "" : (t + "").replace(Jc, function(t, e) {
            return td[e];
        });
    }
    function Bi(t, e, n) {
        A(e) || (e = [ e ]);
        var i = e.length;
        if (!i) return "";
        for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
            var o = ed[a];
            t = t.replace(nd(o), nd(o, 0));
        }
        for (var s = 0; s < i; s++) for (var l = 0; l < r.length; l++) {
            var u = e[s][r[l]];
            t = t.replace(nd(ed[l], s), n ? Ri(u) : u);
        }
        return t;
    }
    function Fi(t, e) {
        var n = (t = S(t) ? {
            color: t,
            extraCssText: e
        } : t || {}).color, i = t.type;
        e = t.extraCssText;
        return n ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Ri(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + Ri(n) + ";" + (e || "") + '"></span>' : "";
    }
    function Vi(t, e) {
        return "0000".substr(0, e - (t += "").length) + t;
    }
    function Gi(t, e, n) {
        ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
        var i = Pi(e), r = n ? "UTC" : "", a = i["get" + r + "FullYear"](), o = i["get" + r + "Month"]() + 1, s = i["get" + r + "Date"](), l = i["get" + r + "Hours"](), u = i["get" + r + "Minutes"](), h = i["get" + r + "Seconds"](), c = i["get" + r + "Milliseconds"]();
        return t.replace("MM", Vi(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", Vi(s, 2)).replace("d", s).replace("hh", Vi(l, 2)).replace("h", l).replace("mm", Vi(u, 2)).replace("m", u).replace("ss", Vi(h, 2)).replace("s", h).replace("SSS", Vi(c, 3));
    }
    function Wi(h, c, d, f, p) {
        var g = 0, m = 0;
        null == f && (f = 1 / 0), null == p && (p = 1 / 0);
        var v = 0;
        c.eachChild(function(t, e) {
            var n, i, r = t.position, a = t.getBoundingRect(), o = c.childAt(e + 1), s = o && o.getBoundingRect();
            if ("horizontal" === h) {
                var l = a.width + (s ? -s.x + a.x : 0);
                f < (n = g + l) || t.newline ? (g = 0, n = l, m += v + d, v = a.height) : v = Math.max(v, a.height);
            } else {
                var u = a.height + (s ? -s.y + a.y : 0);
                p < (i = m + u) || t.newline ? (g += v + d, m = 0, i = u, v = a.width) : v = Math.max(v, a.width);
            }
            t.newline || (r[0] = g, r[1] = m, "horizontal" === h ? g = n + d : m = i + d);
        });
    }
    function Hi(t, e, n) {
        n = Qc(n || 0);
        var i = e.width, r = e.height, a = Mi(t.left, i), o = Mi(t.top, r), s = Mi(t.right, i), l = Mi(t.bottom, r), u = Mi(t.width, i), h = Mi(t.height, r), c = n[2] + n[0], d = n[1] + n[3], f = t.aspect;
        switch (isNaN(u) && (u = i - s - d - a), isNaN(h) && (h = r - l - c - o), null != f && (isNaN(u) && isNaN(h) && (i / r < f ? u = .8 * i : h = .8 * r), 
        isNaN(u) && (u = f * h), isNaN(h) && (h = u / f)), isNaN(a) && (a = i - s - u - d), 
        isNaN(o) && (o = r - l - h - c), t.left || t.right) {
          case "center":
            a = i / 2 - u / 2 - n[3];
            break;

          case "right":
            a = i - u - d;
        }
        switch (t.top || t.bottom) {
          case "middle":
          case "center":
            o = r / 2 - h / 2 - n[0];
            break;

          case "bottom":
            o = r - h - c;
        }
        a = a || 0, o = o || 0, isNaN(u) && (u = i - d - a - (s || 0)), isNaN(h) && (h = r - c - o - (l || 0));
        var p = new Gt(a + n[3], o + n[0], u, h);
        return p.margin = n, p;
    }
    function qi(l, u, t) {
        function e(t, e) {
            var n = {}, i = 0, r = {}, a = 0;
            if (od(t, function(t) {
                r[t] = l[t];
            }), od(t, function(t) {
                h(u, t) && (n[t] = r[t] = u[t]), c(n, t) && i++, c(r, t) && a++;
            }), d[e]) return c(u, t[1]) ? r[t[2]] = null : c(u, t[2]) && (r[t[1]] = null), r;
            if (2 !== a && i) {
                if (2 <= i) return n;
                for (var o = 0; o < t.length; o++) {
                    var s = t[o];
                    if (!h(n, s) && h(l, s)) {
                        n[s] = l[s];
                        break;
                    }
                }
                return n;
            }
            return r;
        }
        function h(t, e) {
            return t.hasOwnProperty(e);
        }
        function c(t, e) {
            return null != t[e] && "auto" !== t[e];
        }
        function n(t, e, n) {
            od(t, function(t) {
                e[t] = n[t];
            });
        }
        !M(t) && (t = {});
        var d = t.ignoreSize;
        !A(d) && (d = [ d, d ]);
        var i = e(ld[0], 0), r = e(ld[1], 1);
        n(ld[0], l, i), n(ld[1], l, r);
    }
    function ji(t) {
        return e = {}, (n = t) && e && od(sd, function(t) {
            n.hasOwnProperty(t) && (e[t] = n[t]);
        }), e;
        var e, n;
    }
    function Ui(t) {
        var e = t.get("coordinateSystem"), n = {
            coordSysName: e,
            coordSysDims: [],
            axisMap: z(),
            categoryAxisMap: z()
        }, i = vd[e];
        return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0;
    }
    function Xi(t) {
        return "category" === t.get("type");
    }
    function Yi(t) {
        this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === wd ? {} : []), 
        this.sourceFormat = t.sourceFormat || bd, this.seriesLayoutBy = t.seriesLayoutBy || Md, 
        this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && z(t.encodeDefine), 
        this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount;
    }
    function Zi(t) {
        var e, n, i = t.option, r = i.data, a = x(r) ? Sd : yd, o = !1, s = i.seriesLayoutBy, l = i.sourceHeader, u = i.dimensions, h = (n = (e = t).option).data ? void 0 : e.ecModel.getComponent("dataset", n.datasetIndex || 0);
        if (h) {
            var c = h.option;
            r = c.source, a = Dd(h).sourceFormat, o = !0, s = s || c.seriesLayoutBy, null == l && (l = c.sourceHeader), 
            u = u || c.dimensions;
        }
        var d = function(t, e, n, i, r) {
            if (!t) return {
                dimensionsDefine: $i(r)
            };
            var a, o, s, l;
            if (e === _d) "auto" === i || null == i ? Ki(function(t) {
                null != t && "-" !== t && (S(t) ? null == o && (o = 1) : o = 0);
            }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], Ki(function(t, e) {
                r[e] = null != t ? t : "";
            }, n, t)), a = r ? r.length : n === Id ? t.length : t[0] ? t[0].length : null; else if (e === xd) r || (r = function(t) {
                for (var e, n = 0; n < t.length && !(e = t[n++]); ) ;
                if (e) {
                    var i = [];
                    return R(e, function(t, e) {
                        i.push(e);
                    }), i;
                }
            }(t), s = !0); else if (e === wd) r || (r = [], s = !0, R(t, function(t, e) {
                r.push(e);
            })); else if (e === yd) {
                var u = Ue(t[0]);
                a = A(u) && u.length || 1;
            }
            return s && R(r, function(t, e) {
                "name" === (M(t) ? t.name : t) && (l = e);
            }), {
                startIndex: o,
                dimensionsDefine: $i(r),
                dimensionsDetectCount: a,
                potentialNameDimIndex: l
            };
        }(r, a, s, l, u), f = i.encode;
        !f && h && (f = function(t, e, n, i, r, a) {
            var o = Ui(t), s = {}, l = [], u = [], h = t.subType, c = z([ "pie", "map", "funnel" ]), d = z([ "line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot" ]);
            if (o && null != d.get(h)) {
                var f = t.ecModel, p = Dd(f).datasetMap, g = e.uid + "_" + r, m = p.get(g) || p.set(g, {
                    categoryWayDim: 1,
                    valueWayDim: 0
                });
                R(o.coordSysDims, function(t) {
                    if (null == o.firstCategoryDimIndex) {
                        var e = m.valueWayDim++;
                        s[t] = e, u.push(e);
                    } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0); else {
                        var e = m.categoryWayDim++;
                        s[t] = e, u.push(e);
                    }
                });
            } else if (null != c.get(h)) {
                for (var v, y = 0; y < 5 && null == v; y++) Qi(n, i, r, a.dimensionsDefine, a.startIndex, y) || (v = y);
                if (null != v) {
                    s.value = v;
                    var _ = a.potentialNameDimIndex || Math.max(v - 1, 0);
                    u.push(_), l.push(_);
                }
            }
            return l.length && (s.itemName = l), u.length && (s.seriesName = u), s;
        }(t, h, r, a, s, d)), Dd(t).source = new Yi({
            data: r,
            fromDataset: o,
            seriesLayoutBy: s,
            sourceFormat: a,
            dimensionsDefine: d.dimensionsDefine,
            startIndex: d.startIndex,
            dimensionsDetectCount: d.dimensionsDetectCount,
            encodeDefine: f
        });
    }
    function $i(t) {
        if (t) {
            var n = z();
            return T(t, function(t) {
                if (null == (t = k({}, M(t) ? t : {
                    name: t
                })).name) return t;
                t.name += "", null == t.displayName && (t.displayName = t.name);
                var e = n.get(t.name);
                return e ? t.name += "-" + e.count++ : n.set(t.name, {
                    count: 1
                }), t;
            });
        }
    }
    function Ki(t, e, n, i) {
        if (null == i && (i = 1 / 0), e === Id) for (var r = 0; r < n.length && r < i; r++) t(n[r] ? n[r][0] : null, r); else {
            var a = n[0] || [];
            for (r = 0; r < a.length && r < i; r++) t(a[r], r);
        }
    }
    function Qi(t, e, n, i, r, a) {
        function o(t) {
            return (null == t || !isFinite(t) || "" === t) && (!(!S(t) || "-" === t) || void 0);
        }
        var s, l;
        if (x(t)) return !1;
        if (i && (l = M(l = i[a]) ? l.name : l), e === _d) if (n === Id) {
            for (var u = t[a], h = 0; h < (u || []).length && h < 5; h++) if (null != (s = o(u[r + h]))) return s;
        } else for (h = 0; h < t.length && h < 5; h++) {
            var c = t[r + h];
            if (c && null != (s = o(c[a]))) return s;
        } else if (e === xd) {
            if (!l) return;
            for (h = 0; h < t.length && h < 5; h++) {
                if ((d = t[h]) && null != (s = o(d[l]))) return s;
            }
        } else if (e === wd) {
            if (!l) return;
            if (!(u = t[l]) || x(u)) return !1;
            for (h = 0; h < u.length && h < 5; h++) if (null != (s = o(u[h]))) return s;
        } else if (e === yd) for (h = 0; h < t.length && h < 5; h++) {
            var d, f = Ue(d = t[h]);
            if (!A(f)) return !1;
            if (null != (s = o(f[a]))) return s;
        }
        return !1;
    }
    function Ji(t) {
        var n, e, i;
        t = t, this.option = {}, this.option[Cd] = 1, this._componentsMap = z({
            series: []
        }), this._seriesIndices, this._seriesIndicesMap, n = t, e = this._theme.option, 
        i = n.color && !n.colorLayer, R(e, function(t, e) {
            "colorLayer" === e && i || dd.hasClass(e) || ("object" == (void 0 === t ? "undefined" : _typeof(t)) ? n[e] = n[e] ? p(n[e], t, !1) : b(t) : null == n[e] && (n[e] = t));
        }), p(t, pd, !1), this.mergeOption(t);
    }
    function tr(t, e) {
        t._seriesIndicesMap = z(t._seriesIndices = T(e, function(t) {
            return t.componentIndex;
        }) || []);
    }
    function er(t, e) {
        return e.hasOwnProperty("subType") ? m(t, function(t) {
            return t.subType === e.subType;
        }) : t;
    }
    function nr(e) {
        R(kd, function(t) {
            this[t] = v(e[t], e);
        }, this);
    }
    function ir() {
        this._coordinateSystems = [];
    }
    function rr(t) {
        this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, 
        this._currentMediaIndices = [], this._optionBackup, this._newBaseOption;
    }
    function ar(t, e, n) {
        var l = {
            width: e,
            height: n,
            aspectratio: e / n
        }, u = !0;
        return R(t, function(t, e) {
            var n, i, r, a = e.match(Ed);
            if (a && a[1] && a[2]) {
                var o = a[1], s = a[2].toLowerCase();
                n = l[s], i = t, ("min" === (r = o) ? i <= n : "max" === r ? n <= i : n === i) || (u = !1);
            }
        }), u;
    }
    function or(t) {
        var e = t && t.itemStyle;
        if (e) for (var n = 0, i = Bd.length; n < i; n++) {
            var r = Bd[n], a = e.normal, o = e.emphasis;
            a && a[r] && (t[r] = t[r] || {}, t[r].normal ? p(t[r].normal, a[r]) : t[r].normal = a[r], 
            a[r] = null), o && o[r] && (t[r] = t[r] || {}, t[r].emphasis ? p(t[r].emphasis, o[r]) : t[r].emphasis = o[r], 
            o[r] = null);
        }
    }
    function sr(t, e, n) {
        if (t && t[e] && (t[e].normal || t[e].emphasis)) {
            var i = t[e].normal, r = t[e].emphasis;
            i && (n ? (t[e].normal = t[e].emphasis = null, C(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, 
            t.emphasis[e] = r);
        }
    }
    function lr(t) {
        sr(t, "itemStyle"), sr(t, "lineStyle"), sr(t, "areaStyle"), sr(t, "label"), sr(t, "labelLine"), 
        sr(t, "upperLabel"), sr(t, "edgeLabel");
    }
    function ur(t, e) {
        var n = Rd(t) && t[e], i = Rd(n) && n.textStyle;
        if (i) for (var r = 0, a = ah.length; r < a; r++) {
            e = ah[r];
            i.hasOwnProperty(e) && (n[e] = i[e]);
        }
    }
    function hr(t) {
        t && (lr(t), ur(t, "label"), t.emphasis && ur(t.emphasis, "label"));
    }
    function cr(t) {
        return A(t) ? t : t ? [ t ] : [];
    }
    function dr(t) {
        return (A(t) ? t[0] : t) || {};
    }
    function fr(e) {
        R(Vd, function(t) {
            t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
        });
    }
    function pr(m) {
        R(m, function(h, c) {
            var d = [], f = [ NaN, NaN ], t = [ h.stackResultDimension, h.stackedOverDimension ], p = h.data, g = h.isStackedByIndex, e = p.map(t, function(t, e, n) {
                var i, r, a = p.get(h.stackedDimension, n);
                if (isNaN(a)) return f;
                g ? r = p.getRawIndex(n) : i = p.get(h.stackedByDimension, n);
                for (var o = NaN, s = c - 1; 0 <= s; s--) {
                    var l = m[s];
                    if (g || (r = l.data.rawIndexOf(l.stackedByDimension, i)), 0 <= r) {
                        var u = l.data.getByRawIndex(l.stackResultDimension, r);
                        if (0 <= a && 0 < u || a <= 0 && u < 0) {
                            a += u, o = u;
                            break;
                        }
                    }
                }
                return d[0] = a, d[1] = o, d;
            });
            p.hostModel.setData(e), h.data = e;
        });
    }
    function gr(t, e) {
        Yi.isInstance(t) || (t = Yi.seriesDataToSource(t)), this._source = t;
        var n = this._data = t.data, i = t.sourceFormat;
        i === Sd && (this._offset = 0, this._dimSize = e, this._data = n), k(this, qd[i === _d ? i + "_" + t.seriesLayoutBy : i]);
    }
    function mr() {
        return this._data.length;
    }
    function vr(t) {
        return this._data[t];
    }
    function yr(t) {
        for (var e = 0; e < t.length; e++) this._data.push(t[e]);
    }
    function _r(t, e, n) {
        return null != n ? t[n] : t;
    }
    function xr(t, e, n, i) {
        return wr(t[i], this._dimensionInfos[e]);
    }
    function wr(t, e) {
        var n = e && e.type;
        if ("ordinal" === n) {
            var i = e && e.ordinalMeta;
            return i ? i.parseAndCollect(t) : t;
        }
        return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +Pi(t)), 
        null == t || "" === t ? NaN : +t;
    }
    function br(t, e, n) {
        if (t) {
            var i = t.getRawDataItem(e);
            if (null != i) {
                var r, a, o = t.getProvider().getSource().sourceFormat, s = t.getDimensionInfo(n);
                return s && (r = s.name, a = s.index), jd[o](i, e, a, r);
            }
        }
    }
    function Sr(t, e, n) {
        if (t) {
            var i = t.getProvider().getSource().sourceFormat;
            if (i === yd || i === xd) {
                var r = t.getRawDataItem(e);
                return i !== yd || M(r) || (r = null), r ? r[n] : void 0;
            }
        }
    }
    function Mr(t) {
        return new Ir(t);
    }
    function Ir(t) {
        t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, 
        this._onDirty = t.onDirty, this._dirty = !0, this.context;
    }
    function Dr(t, e, n, i, r, a) {
        $d.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
            start: n,
            end: i,
            count: i - n,
            next: $d.next
        }, t.context);
    }
    function Cr(t) {
        var n, e, i, r = t.name;
        Ye(t) || (t.name = (n = t.getRawData(), e = n.mapDimension("seriesName", !0), i = [], 
        R(e, function(t) {
            var e = n.getDimensionInfo(t);
            e.displayName && i.push(e.displayName);
        }), i.join(" ") || r));
    }
    function Tr(t) {
        return t.model.getRawData().count();
    }
    function kr(t) {
        var e = t.model;
        return e.setData(e.getRawData().cloneShallow()), Ar;
    }
    function Ar(t, e) {
        t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);
    }
    function Lr(e, n) {
        R(e.CHANGABLE_METHODS, function(t) {
            e.wrapMethod(t, y(Pr, n));
        });
    }
    function Pr(t) {
        var e = Or(t);
        e && e.setOutputEnd(this.count());
    }
    function Or(t) {
        var e = (t.ecModel || {}).scheduler, n = e && e.getPipeline(t.uid);
        if (n) {
            var i = n.currentTask;
            if (i) {
                var r = i.agentStubMap;
                r && (i = r.get(t.uid));
            }
            return i;
        }
    }
    function Nr() {
        this.group = new hu(), this.uid = bi("viewChart"), this.renderTask = Mr({
            plan: Rr,
            reset: Br
        }), this.renderTask.context = {
            view: this
        };
    }
    function Er(t, e) {
        if (t && (t.trigger(e), "group" === t.type)) for (var n = 0; n < t.childCount(); n++) Er(t.childAt(n), e);
    }
    function zr(e, t, n) {
        var i = $e(e, t);
        null != i ? R(qe(i), function(t) {
            Er(e.getItemGraphicEl(t), n);
        }) : e.eachItemGraphicEl(function(t) {
            Er(t, n);
        });
    }
    function Rr(t) {
        return rf(t.model);
    }
    function Br(t) {
        var e = t.model, n = t.ecModel, i = t.api, r = t.payload, a = e.pipelineContext.progressiveRender, o = t.view, s = r && nf(r).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
        return "render" !== l && o[l](e, n, i, r), of[l];
    }
    function Fr(t, n, i) {
        function r() {
            c = new Date().getTime(), d = null, t.apply(s, l || []);
        }
        var a, o, s, l, u, h = 0, c = 0, d = null;
        n = n || 0;
        var e = function() {
            a = new Date().getTime(), s = this, l = arguments;
            var t = u || n, e = u || i;
            u = null, o = a - (e ? h : c) - t, clearTimeout(d), e ? d = setTimeout(r, t) : 0 <= o ? r() : d = setTimeout(r, -o), 
            h = a;
        };
        return e.clear = function() {
            d && (clearTimeout(d), d = null);
        }, e.debounceNextCall = function(t) {
            u = t;
        }, e;
    }
    function Vr(t, e, n, i) {
        this.ecInstance = t, this.api = e, this.unfinished;
        n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice();
        this._allHandlers = n.concat(i), this._stageTaskMap = z();
    }
    function Gr(s, t, l, u, h) {
        function c(t, e) {
            return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
        }
        var d;
        h = h || {}, R(t, function(n) {
            if (!h.visualType || h.visualType === n.visualType) {
                var t = s._stageTaskMap.get(n.uid), e = t.seriesTaskMap, i = t.overallTask;
                if (i) {
                    var r, a = i.agentStubMap;
                    a.each(function(t) {
                        c(h, t) && (t.dirty(), r = !0);
                    }), r && i.dirty(), df(i, u);
                    var o = s.getPerformArgs(i, h.block);
                    a.each(function(t) {
                        t.perform(o);
                    }), d |= i.perform(o);
                } else e && e.each(function(t) {
                    c(h, t) && t.dirty();
                    var e = s.getPerformArgs(t, h.block);
                    e.skip = !n.performRawSeries && l.isSeriesFiltered(t.context.model), df(t, u), d |= t.perform(e);
                });
            }
        }), s.unfinished |= d;
    }
    function Wr(t) {
        t.overallReset(t.ecModel, t.api, t.payload);
    }
    function Hr(t) {
        return t.overallProgress && qr;
    }
    function qr() {
        this.agent.dirty(), this.getDownstream().dirty();
    }
    function jr() {
        this.agent && this.agent.dirty();
    }
    function Ur(t) {
        return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload);
    }
    function Xr(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = t.resetDefines = qe(t.reset(t.model, t.ecModel, t.api, t.payload));
        return 1 < e.length ? T(e, function(t, e) {
            return Yr(e);
        }) : ff;
    }
    function Yr(a) {
        return function(t, e) {
            var n = e.data, i = e.resetDefines[a];
            if (i && i.dataEach) for (var r = t.start; r < t.end; r++) i.dataEach(n, r); else i && i.progress && i.progress(t, n);
        };
    }
    function Zr(t) {
        return t.data.count();
    }
    function $r(t, e, n) {
        var i = e.uid, r = t._pipelineMap.get(i);
        !r.head && (r.head = n), r.tail && r.tail.pipe(n), (r.tail = n).__idxInPipeline = r.count++, 
        n.__pipeline = r;
    }
    function Kr(t, e) {
        for (var n in e.prototype) t[n] = B;
    }
    function Qr(i) {
        return function(t, e, n) {
            t = t && t.toLowerCase(), Cl.prototype[i].call(this, t, e, n);
        };
    }
    function Jr() {
        Cl.call(this);
    }
    function ta(t, e, n) {
        function i(t, e) {
            return t.__prio - e.__prio;
        }
        n = n || {}, "string" == typeof e && (e = Gf[e]), this.id, this.group, this._dom = t;
        var r = this._zr = He(t, {
            renderer: n.renderer || "canvas",
            devicePixelRatio: n.devicePixelRatio,
            width: n.width,
            height: n.height
        });
        this._throttledZrFlush = Fr(v(r.flush, r), 17), (e = b(e)) && Wd(e, !0), this._theme = e, 
        this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, 
        this._coordSysMgr = new ir();
        var a, o, s, l, u = this._api = (o = (a = this)._coordSysMgr, k(new nr(a), {
            getCoordinateSystems: v(o.getCoordinateSystems, o),
            getComponentByElement: function(t) {
                for (;t; ) {
                    var e = t.__ecComponentInfo;
                    if (null != e) return a._model.getComponent(e.mainType, e.index);
                    t = t.parent;
                }
            }
        }));
        Xt(Vf, i), Xt(Rf, i), this._scheduler = new Vr(this, u, Rf, Vf), Cl.call(this), 
        this._messageCenter = new Jr(), this._initEvents(), this.resize = v(this.resize, this), 
        this._pendingActions = [], r.animation.on("frame", this._onframe, this), l = this, 
        (s = r).on("rendered", function() {
            l.trigger("rendered"), !s.animation.isFinished() || l[Af] || l._scheduler.unfinished || l._pendingActions.length || l.trigger("finished");
        }), I(this);
    }
    function ea(t, e, n) {
        var i, r = this._model, a = this._coordSysMgr.getCoordinateSystems();
        e = Qe(r, e);
        for (var o = 0; o < a.length; o++) {
            var s = a[o];
            if (s[t] && null != (i = s[t](r, e, n))) return i;
        }
    }
    function na(t) {
        var e = t._model, n = t._scheduler;
        n.restorePipelines(e), n.prepareStageTasks(), la(t, "component", e, n), la(t, "chart", e, n), 
        n.plan();
    }
    function ia(e, n, i, r, t) {
        function a(t) {
            t && t.__alive && t[n] && t[n](t.__model, o, e._api, i);
        }
        var o = e._model;
        if (r) {
            var s = {};
            s[r + "Id"] = i[r + "Id"], s[r + "Index"] = i[r + "Index"], s[r + "Name"] = i[r + "Name"];
            var l = {
                mainType: r,
                query: s
            };
            t && (l.subType = t);
            var u = i.excludeSeriesId;
            null != u && (u = z(qe(u))), o && o.eachComponent(l, function(t) {
                u && null != u.get(t.id) || a(e["series" === r ? "_chartsMap" : "_componentsMap"][t.__viewId]);
            }, e);
        } else Mf(e._componentsViews.concat(e._chartsViews), a);
    }
    function ra(t, e) {
        var n = t._chartsMap, i = t._scheduler;
        e.eachSeries(function(t) {
            i.updateStreamModes(t, n[t.__viewId]);
        });
    }
    function aa(e, t) {
        var n = e.type, i = e.escapeConnect, r = Ef[n], a = r.actionInfo, o = (a.update || "update").split(":"), s = o.pop();
        o = null != o[0] && Cf(o[0]), this[kf] = !0;
        var l = [ e ], u = !1;
        e.batch && (u = !0, l = T(e.batch, function(t) {
            return (t = C(k({}, t), e)).batch = null, t;
        }));
        var h, c = [], d = "highlight" === n || "downplay" === n;
        Mf(l, function(t) {
            (h = (h = r.action(t, this._model, this._api)) || k({}, t)).type = a.event || h.type, 
            c.push(h), d ? ia(this, s, t, "series") : o && ia(this, s, t, o.main, o.sub);
        }, this), "none" === s || d || o || (this[Af] ? (na(this), Of.update.call(this, e), 
        this[Af] = !1) : Of[s].call(this, e)), h = u ? {
            type: a.event || n,
            escapeConnect: i,
            batch: c
        } : c[0], this[kf] = !1, !t && this._messageCenter.trigger(h.type, h);
    }
    function oa(t) {
        for (var e = this._pendingActions; e.length; ) {
            var n = e.shift();
            aa.call(this, n, t);
        }
    }
    function sa(t) {
        !t && this.trigger("updated");
    }
    function la(t, e, r, a) {
        function n(t) {
            var e = "_ec_" + t.id + "_" + t.type, n = l[e];
            if (!n) {
                var i = Cf(t.type);
                (n = new (o ? Jd.getClass(i.main, i.sub) : Nr.getClass(i.sub))()).init(r, h), l[e] = n, 
                s.push(n), u.add(n.group);
            }
            t.__viewId = n.__id = e, n.__alive = !0, n.__model = t, n.group.__ecComponentInfo = {
                mainType: t.mainType,
                index: t.componentIndex
            }, !o && a.prepareView(n, t, r, h);
        }
        for (var o = "component" === e, s = o ? t._componentsViews : t._chartsViews, l = o ? t._componentsMap : t._chartsMap, u = t._zr, h = t._api, i = 0; i < s.length; i++) s[i].__alive = !1;
        o ? r.eachComponent(function(t, e) {
            "series" !== t && n(e);
        }) : r.eachSeries(n);
        for (i = 0; i < s.length; ) {
            var c = s[i];
            c.__alive ? i++ : (!o && c.renderTask.dispose(), u.remove(c.group), c.dispose(r, h), 
            s.splice(i, 1), delete l[c.__id], c.__id = c.group.__ecComponentInfo = null);
        }
    }
    function ua(t) {
        t.clearColorPalette(), t.eachSeries(function(t) {
            t.clearColorPalette();
        });
    }
    function ha(t, e, n, i) {
        var r, a, o, s, l;
        r = t, a = e, o = n, s = i, Mf(l || r._componentsViews, function(t) {
            var e = t.__model;
            t.render(e, a, o, s), fa(e, t);
        }), Mf(t._chartsViews, function(t) {
            t.__alive = !1;
        }), ca(t, e, n, i), Mf(t._chartsViews, function(t) {
            t.__alive || t.remove(e, n);
        });
    }
    function ca(a, t, e, o, s) {
        var l, n, i, r, u, h = a._scheduler;
        t.eachSeries(function(t) {
            var e = a._chartsMap[t.__viewId];
            e.__alive = !0;
            var n, i, r = e.renderTask;
            h.updatePayload(r, o), s && s.get(t.uid) && r.dirty(), l |= r.perform(h.getPerformArgs(r)), 
            e.group.silent = !!t.get("silent"), fa(t, e), n = e, i = t.get("blendMode") || null, 
            n.group.traverse(function(t) {
                t.isGroup || t.style.blend !== i && t.setStyle("blend", i), t.eachPendingDisplayable && t.eachPendingDisplayable(function(t) {
                    t.setStyle("blend", i);
                });
            });
        }), h.unfinished |= l, n = a._zr, i = t, r = n.storage, u = 0, r.traverse(function(t) {
            t.isGroup || u++;
        }), u > i.get("hoverLayerThreshold") && !al.node && r.traverse(function(t) {
            t.isGroup || (t.useHoverLayer = !0);
        }), uf(a._zr.dom, t);
    }
    function da(e, n) {
        Mf(Ff, function(t) {
            t(e, n);
        });
    }
    function fa(t, e) {
        var n = t.get("z"), i = t.get("zlevel");
        e.group.traverse(function(t) {
            "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i));
        });
    }
    function pa(t) {
        qf[t] = !1;
    }
    function ga(t) {
        return Hf[(e = t, n = Xf, e.getAttribute ? e.getAttribute(n) : e[n])];
        var e, n;
    }
    function ma(t, e) {
        Gf[t] = e;
    }
    function va(t) {
        Bf.push(t);
    }
    function ya(t, e) {
        ba(Rf, t, e, 1e3);
    }
    function _a(t, e, n) {
        "function" == typeof e && (n = e, e = "");
        var i = Df(t) ? t.type : [ t, t = {
            event: e
        } ][0];
        t.event = (t.event || i).toLowerCase(), e = t.event, Sf(Lf.test(i) && Lf.test(e)), 
        Ef[i] || (Ef[i] = {
            action: n,
            actionInfo: t
        }), zf[e] = i;
    }
    function xa(t, e) {
        ba(Vf, t, e, 1e3, "layout");
    }
    function wa(t, e) {
        ba(Vf, t, e, 3e3, "visual");
    }
    function ba(t, e, n, i, r) {
        (If(e) || Df(e)) && (n = e, e = i);
        var a = Vr.wrapStageHandler(n, r);
        return a.__prio = e, a.__raw = n, t.push(a), a;
    }
    function Sa(t, e) {
        Wf[t] = e;
    }
    function Ma(t) {
        return dd.extend(t);
    }
    function Ia(t) {
        return Jd.extend(t);
    }
    function Da(t) {
        return Qd.extend(t);
    }
    function Ca(t) {
        return Nr.extend(t);
    }
    function Ta(t) {
        return t;
    }
    function ka(t, e, n, i, r) {
        this._old = t, this._new = e, this._oldKeyGetter = n || Ta, this._newKeyGetter = i || Ta, 
        this.context = r;
    }
    function Aa(t, e, n, i, r) {
        for (var a = 0; a < t.length; a++) {
            var o = "_ec_" + r[i](t[a], a), s = e[o];
            null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [ s ]), s.push(a));
        }
    }
    function La(t) {
        return 65535 < t._rawCount ? tp : ep;
    }
    function Pa(e, n) {
        R(np.concat(n.__wrappedMethods || []), function(t) {
            n.hasOwnProperty(t) && (e[t] = n[t]);
        }), e.__wrappedMethods = n.__wrappedMethods, R(ip, function(t) {
            e[t] = b(n[t]);
        }), e._calculationInfo = k(n._calculationInfo);
    }
    function Oa(t, e, n) {
        var i;
        if (null != e) {
            var r = t._chunkSize, a = Math.floor(n / r), o = n % r, s = t.dimensions[e], l = t._storage[s][a];
            if (l) {
                i = l[o];
                var u = t._dimensionInfos[s].ordinalMeta;
                u && u.categories.length && (i = u.categories[i]);
            }
        }
        return i;
    }
    function Na(t) {
        return t;
    }
    function Ea(t) {
        return t < this._count && 0 <= t ? this._indices[t] : -1;
    }
    function za(t, e) {
        var n = t._idList[e];
        return null == n && (n = Oa(t, t._idDimIdx, e)), null == n && (n = "e\0\0" + e), 
        n;
    }
    function Ra(t) {
        return A(t) || (t = [ t ]), t;
    }
    function Ba(t, e) {
        var n = t.dimensions, i = new rp(T(n, t.getDimensionInfo, t), t.hostModel);
        Pa(i, t);
        for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
            var s = n[o];
            a[s] && (0 <= d(e, s) ? (r[s] = Fa(a[s]), i._rawExtent[s] = [ 1 / 0, -1 / 0 ], i._extent[s] = null) : r[s] = a[s]);
        }
        return i;
    }
    function Fa(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = (i = t[n], r = void 0, 
        (r = i.constructor) === Array ? i.slice() : new r(i));
        var i, r;
        return e;
    }
    function Va(t, e, n) {
        function l(t, e, n) {
            null != $f.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, a.set(e, !0));
        }
        Yi.isInstance(e) || (e = Yi.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();
        for (var i = (n.dimsDef || []).slice(), u = z(n.encodeDef), r = z(), a = z(), h = [], o = function(t, e, n, i) {
            var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
            return R(e, function(t) {
                var e = t.dimsDef;
                e && (r = Math.max(r, e.length));
            }), r;
        }(e, t, i, n.dimCount), s = 0; s < o; s++) {
            var c = i[s] = k({}, M(i[s]) ? i[s] : {
                name: i[s]
            }), d = c.name, f = h[s] = {
                otherDims: {}
            };
            null != d && null == r.get(d) && (f.name = f.displayName = d, r.set(d, s)), null != c.type && (f.type = c.type), 
            null != c.displayName && (f.displayName = c.displayName);
        }
        u.each(function(t, n) {
            t = qe(t).slice();
            var i = u.set(n, []);
            R(t, function(t, e) {
                S(t) && (t = r.get(t)), null != t && t < o && (i[e] = t, l(h[t], n, e));
            });
        });
        var p = 0;
        R(t, function(r) {
            var a, o, s;
            if (S(r)) a = r, r = {}; else {
                a = r.name;
                var t = r.ordinalMeta;
                r.ordinalMeta = null, (r = b(r)).ordinalMeta = t, o = r.dimsDef, s = r.otherDims, 
                r.name = r.coordDim = r.coordDimIndex = r.dimsDef = r.otherDims = null;
            }
            var e = qe(u.get(a));
            if (!e.length) for (var n = 0; n < (o && o.length || 1); n++) {
                for (;p < h.length && null != h[p].coordDim; ) p++;
                p < h.length && e.push(p++);
            }
            R(e, function(t, e) {
                var n = h[t];
                if (l(C(n, r), a, e), null == n.name && o) {
                    var i = o[e];
                    !M(i) && (i = {
                        name: i
                    }), n.name = n.displayName = i.name, n.defaultTooltip = i.defaultTooltip;
                }
                s && C(n.otherDims, s);
            });
        });
        var g, m, v = n.generateCoord, y = n.generateCoordCount, _ = null != y;
        y = v ? y || 1 : 0;
        for (var x = v || "value", w = 0; w < o; w++) {
            null == (f = h[w] = h[w] || {}).coordDim && (f.coordDim = Ga(x, a, _), f.coordDimIndex = 0, 
            (!v || y <= 0) && (f.isExtraCoord = !0), y--), null == f.name && (f.name = Ga(f.coordDim, r)), 
            null == f.type && (g = e, m = w, f.name, Qi(g.data, g.sourceFormat, g.seriesLayoutBy, g.dimensionsDefine, g.startIndex, m)) && (f.type = "ordinal");
        }
        return h;
    }
    function Ga(t, e, n) {
        if (n || null != e.get(t)) {
            for (var i = 0; null != e.get(t + i); ) i++;
            t += i;
        }
        return e.set(t, !0), t;
    }
    function Wa(t, n, e) {
        var i, r, a, o, s = (e = e || {}).byIndex, l = e.stackedCoordDimension, u = !(!t || !t.get("stack"));
        if (R(n, function(t, e) {
            S(t) && (n[e] = t = {
                name: t
            }), u && !t.isExtraCoord && (s || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t));
        }), !r || s || i || (s = !0), r) {
            a = "__\0ecstackresult", o = "__\0ecstackedover", i && (i.createInvertedIndices = !0);
            var h = r.coordDim, c = r.type, d = 0;
            R(n, function(t) {
                t.coordDim === h && d++;
            }), n.push({
                name: a,
                coordDim: h,
                coordDimIndex: d,
                type: c,
                isExtraCoord: !0,
                isCalculationCoord: !0
            }), d++, n.push({
                name: o,
                coordDim: o,
                coordDimIndex: d,
                type: c,
                isExtraCoord: !0,
                isCalculationCoord: !0
            });
        }
        return {
            stackedDimension: r && r.name,
            stackedByDimension: i && i.name,
            isStackedByIndex: s,
            stackedOverDimension: o,
            stackResultDimension: a
        };
    }
    function Ha(t, e) {
        return !!e && e === t.getCalculationInfo("stackedDimension");
    }
    function qa(t, e) {
        return Ha(t, e) ? t.getCalculationInfo("stackResultDimension") : e;
    }
    function ja(t, e, n) {
        n = n || {}, Yi.isInstance(t) || (t = Yi.seriesDataToSource(t));
        var i, r = e.get("coordinateSystem"), a = ir.get(r), o = Ui(e);
        o && (i = T(o.coordSysDims, function(t) {
            var e, n = {
                name: t
            }, i = o.axisMap.get(t);
            if (i) {
                var r = i.get("type");
                n.type = "category" === (e = r) ? "ordinal" : "time" === e ? "time" : "float";
            }
            return n;
        })), i || (i = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || [ "x", "y" ]);
        var s, l, u = sp(t, {
            coordDimensions: i,
            generateCoord: n.generateCoord
        });
        o && R(u, function(t, e) {
            var n = t.coordDim, i = o.categoryAxisMap.get(n);
            i && (null == s && (s = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0);
        }), l || null == s || (u[s].otherDims.itemName = 0);
        var h = Wa(e, u), c = new rp(u, e);
        c.setCalculationInfo(h);
        var d = null != s && function(t) {
            if (t.sourceFormat === yd) {
                var e = function(t) {
                    for (var e = 0; e < t.length && null == t[e]; ) e++;
                    return t[e];
                }(t.data || []);
                return null != e && !A(Ue(e));
            }
        }(t) ? function(t, e, n, i) {
            return i === s ? n : this.defaultDimValueGetter(t, e, n, i);
        } : null;
        return c.hasItemOption = !1, c.initData(t, null, d), c;
    }
    function Ua(t) {
        this._setting = t || {}, this._extent = [ 1 / 0, -1 / 0 ], this._interval = 0, this.init && this.init.apply(this, arguments);
    }
    function Xa(t) {
        this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, 
        this._map;
    }
    function Ya(t) {
        return t._map || (t._map = z(t.categories));
    }
    function Za(t) {
        return M(t) && null != t.value ? t.value : t + "";
    }
    function $a(t) {
        return Ci(t) + 2;
    }
    function Ka(t, e, n) {
        t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
    }
    function Qa(t, e) {
        !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), Ka(t, 0, e), 
        Ka(t, 1, e), t[0] > t[1] && (t[0] = t[1]);
    }
    function Ja(t) {
        return t.get("stack") || pp + t.seriesIndex;
    }
    function to(t) {
        return t.dim + t.index;
    }
    function eo(t, e) {
        var n = [];
        return e.eachSeriesByType(t, function(t) {
            ro(t) && !ao(t) && n.push(t);
        }), n;
    }
    function no(t) {
        var u = [];
        return R(t, function(t) {
            var e = t.getData(), n = t.coordinateSystem.getBaseAxis(), i = n.getExtent(), r = "category" === n.type ? n.getBandWidth() : Math.abs(i[1] - i[0]) / e.count(), a = Mi(t.get("barWidth"), r), o = Mi(t.get("barMaxWidth"), r), s = t.get("barGap"), l = t.get("barCategoryGap");
            u.push({
                bandWidth: r,
                barWidth: a,
                barMaxWidth: o,
                barGap: s,
                barCategoryGap: l,
                axisKey: to(n),
                stackId: Ja(t)
            });
        }), function(t) {
            var h = {};
            R(t, function(t) {
                var e = t.axisKey, n = t.bandWidth, i = h[e] || {
                    bandWidth: n,
                    remainedWidth: n,
                    autoWidthCount: 0,
                    categoryGap: "20%",
                    gap: "30%",
                    stacks: {}
                }, r = i.stacks;
                h[e] = i;
                var a = t.stackId;
                r[a] || i.autoWidthCount++, r[a] = r[a] || {
                    width: 0,
                    maxWidth: 0
                };
                var o = t.barWidth;
                o && !r[a].width && (r[a].width = o, o = Math.min(i.remainedWidth, o), i.remainedWidth -= o);
                var s = t.barMaxWidth;
                s && (r[a].maxWidth = s);
                var l = t.barGap;
                null != l && (i.gap = l);
                var u = t.barCategoryGap;
                null != u && (i.categoryGap = u);
            });
            var d = {};
            return R(h, function(t, n) {
                d[n] = {};
                var e = t.stacks, i = t.bandWidth, r = Mi(t.categoryGap, i), a = Mi(t.gap, 1), o = t.remainedWidth, s = t.autoWidthCount, l = (o - r) / (s + (s - 1) * a);
                l = Math.max(l, 0), R(e, function(t) {
                    var e = t.maxWidth;
                    e && e < l && (e = Math.min(e, o), t.width && (e = Math.min(e, t.width)), o -= e, 
                    t.width = e, s--);
                }), l = (o - r) / (s + (s - 1) * a), l = Math.max(l, 0);
                var u, h = 0;
                R(e, function(t) {
                    t.width || (t.width = l), h += (u = t).width * (1 + a);
                }), u && (h -= u.width * a);
                var c = -h / 2;
                R(e, function(t, e) {
                    d[n][e] = d[n][e] || {
                        offset: c,
                        width: t.width
                    }, c += t.width * (1 + a);
                });
            }), d;
        }(u);
    }
    function io(t, e, n) {
        if (t && e) {
            var i = t[to(e)];
            return null != i && null != n && (i = i[Ja(n)]), i;
        }
    }
    function ro(t) {
        return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type;
    }
    function ao(t) {
        return t.pipelineContext && t.pipelineContext.large;
    }
    function oo(t, e, n) {
        return 0 <= d(t.getAxesOnZeroOf(), e) || n ? e.toGlobalCoord(e.dataToCoord(0)) : e.getGlobalExtent()[0];
    }
    function so(t, e) {
        return Cp(t, Dp(e));
    }
    function lo(t, e) {
        var n, i, r, a = t.type, o = e.getMin(), s = e.getMax(), l = null != o, u = null != s, h = t.getExtent();
        "ordinal" === a ? n = e.getCategories().length : (A(i = e.get("boundaryGap")) || (i = [ i || 0, i || 0 ]), 
        "boolean" == typeof i[0] && (i = [ 0, 0 ]), i[0] = Mi(i[0], 1), i[1] = Mi(i[1], 1), 
        r = h[1] - h[0] || Math.abs(h[0])), null == o && (o = "ordinal" === a ? n ? 0 : NaN : h[0] - i[0] * r), 
        null == s && (s = "ordinal" === a ? n ? n - 1 : NaN : h[1] + i[1] * r), "dataMin" === o ? o = h[0] : "function" == typeof o && (o = o({
            min: h[0],
            max: h[1]
        })), "dataMax" === s ? s = h[1] : "function" == typeof s && (s = s({
            min: h[0],
            max: h[1]
        })), (null == o || !isFinite(o)) && (o = NaN), (null == s || !isFinite(s)) && (s = NaN), 
        t.setBlank(w(o) || w(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), 
        e.getNeedCrossZero() && (0 < o && 0 < s && !l && (o = 0), o < 0 && s < 0 && !u && (s = 0));
        var c = e.ecModel;
        if (c && "time" === a) {
            var d, f = eo("bar", c);
            if (R(f, function(t) {
                d |= t.getBaseAxis() === e.axis;
            }), d) {
                var p = no(f), g = function(t, e, n, i) {
                    var r = n.axis.getExtent(), a = r[1] - r[0], o = io(i, n.axis);
                    if (void 0 === o) return {
                        min: t,
                        max: e
                    };
                    var s = 1 / 0;
                    R(o, function(t) {
                        s = Math.min(t.offset, s);
                    });
                    var l = -1 / 0;
                    R(o, function(t) {
                        l = Math.max(t.offset + t.width, l);
                    }), s = Math.abs(s), l = Math.abs(l);
                    var u = s + l, h = e - t, c = h / (1 - (s + l) / a) - h;
                    return {
                        min: t -= c * (s / u),
                        max: e += c * (l / u)
                    };
                }(o, s, e, p);
                o = g.min, s = g.max;
            }
        }
        return [ o, s ];
    }
    function uo(t, e) {
        var n = lo(t, e), i = null != e.getMin(), r = null != e.getMax(), a = e.get("splitNumber");
        "log" === t.type && (t.base = e.get("logBase"));
        var o = t.type;
        t.setExtent(n[0], n[1]), t.niceExtent({
            splitNumber: a,
            fixMin: i,
            fixMax: r,
            minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null,
            maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null
        });
        var s = e.get("interval");
        null != s && t.setInterval && t.setInterval(s);
    }
    function ho(t, e) {
        if (e = e || t.get("type")) switch (e) {
          case "category":
            return new hp(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [ 1 / 0, -1 / 0 ]);

          case "value":
            return new fp();

          default:
            return (Ua.getClass(e) || fp).create(t);
        }
    }
    function co(r) {
        var e, a = r.getLabelModel().get("formatter"), o = "category" === r.type ? r.scale.getExtent()[0] : null;
        return "string" == typeof a ? (e = a, a = function(t) {
            return e.replace("{value}", null != t ? t : "");
        }) : "function" == typeof a ? function(t, e) {
            return null != o && (e = t - o), a((i = t, "category" === (n = r).type ? n.scale.getLabel(i) : i), e);
            var n, i;
        } : function(t) {
            return r.scale.getLabel(t);
        };
    }
    function fo(t, e) {
        if ("image" !== this.type) {
            var n = this.style, i = this.shape;
            i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, 
            n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1);
        }
    }
    function po(t, e, n, i, r, a, o) {
        var s, l = 0 === t.indexOf("empty");
        return l && (t = t.substr(5, 1).toLowerCase() + t.substr(6)), (s = 0 === t.indexOf("image://") ? Gn(t.slice(8), new Gt(e, n, i, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? Vn(t.slice(7), {}, new Gt(e, n, i, r), o ? "center" : "cover") : new Vp({
            shape: {
                symbolType: t,
                x: e,
                y: n,
                width: i,
                height: r
            }
        })).__isEmptyBrush = l, s.setColor = fo, s.setColor(a), s;
    }
    function go(t, e) {
        return Math.abs(t - e) < Hp;
    }
    function mo(t, e, n) {
        var i = 0, r = t[0];
        if (!r) return !1;
        for (var a = 1; a < t.length; a++) {
            var o = t[a];
            i += Cn(r[0], r[1], o[0], o[1], e, n), r = o;
        }
        var s = t[0];
        return go(r[0], s[0]) && go(r[1], s[1]) || (i += Cn(r[0], r[1], s[0], s[1], e, n)), 
        0 !== i;
    }
    function vo(t, e, n) {
        if (this.name = t, this.geometries = e, n) n = [ n[0], n[1] ]; else {
            var i = this.getBoundingRect();
            n = [ i.x + i.width / 2, i.y + i.height / 2 ];
        }
        this.center = n;
    }
    function yo(t, e, n) {
        for (var i = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
            var s = t.charCodeAt(o) - 64, l = t.charCodeAt(o + 1) - 64;
            s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), r = s += r, a = l += a, i.push([ s / n, l / n ]);
        }
        return i;
    }
    function _o(t) {
        return "category" === t.type ? (a = (r = t).getLabelModel(), o = wo(r, a), !a.get("show") || r.scale.isBlank() ? {
            labels: [],
            labelCategoryInterval: o.labelCategoryInterval
        } : o) : (e = (n = t).scale.getTicks(), i = co(n), {
            labels: T(e, function(t, e) {
                return {
                    formattedLabel: i(t, e),
                    rawLabel: n.scale.getLabel(t),
                    tickValue: t
                };
            })
        });
        var n, e, i, r, a, o;
    }
    function xo(t, e) {
        return "category" === t.type ? function(t, e) {
            var n, i, r = bo(t, "ticks"), a = Co(e), o = So(r, a);
            if (o) return o;
            if ((!e.get("show") || t.scale.isBlank()) && (n = []), _(a)) n = Do(t, a, !0); else if ("auto" === a) {
                var s = wo(t, t.getLabelModel());
                i = s.labelCategoryInterval, n = T(s.labels, function(t) {
                    return t.tickValue;
                });
            } else n = Io(t, i = a, !0);
            return Mo(r, a, {
                ticks: n,
                tickCategoryInterval: i
            });
        }(t, e) : {
            ticks: t.scale.getTicks()
        };
    }
    function wo(t, e) {
        var n, i, r, a, o = bo(t, "labels"), s = Co(e), l = So(o, s);
        return l || (_(s) ? n = Do(t, s) : n = Io(t, i = "auto" === s ? null != (a = jp(r = t).autoInterval) ? a : jp(r).autoInterval = r.calculateCategoryInterval() : s), 
        Mo(o, s, {
            labels: n,
            labelCategoryInterval: i
        }));
    }
    function bo(t, e) {
        return jp(t)[e] || (jp(t)[e] = []);
    }
    function So(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value;
    }
    function Mo(t, e, n) {
        return t.push({
            key: e,
            value: n
        }), n;
    }
    function Io(t, e, n) {
        function i(t) {
            l.push(n ? t : {
                formattedLabel: r(t),
                rawLabel: a.getLabel(t),
                tickValue: t
            });
        }
        var r = co(t), a = t.scale, o = a.getExtent(), s = t.getLabelModel(), l = [], u = Math.max((e || 0) + 1, 1), h = o[0], c = a.count();
        0 !== h && 1 < u && 2 < c / u && (h = Math.round(Math.ceil(h / u) * u));
        var d = s.get("showMinLabel"), f = s.get("showMaxLabel");
        d && h !== o[0] && i(o[0]);
        for (var p = h; p <= o[1]; p += u) i(p);
        return f && p !== o[1] && i(o[1]), l;
    }
    function Do(t, n, i) {
        var r = t.scale, a = co(t), o = [];
        return R(r.getTicks(), function(t) {
            var e = r.getLabel(t);
            n(t, e) && o.push(i ? t : {
                formattedLabel: a(t),
                rawLabel: e,
                tickValue: t
            });
        }), o;
    }
    function Co(t) {
        var e = t.get("interval");
        return null == e ? "auto" : e;
    }
    function To(t, e) {
        var n = (t[1] - t[0]) / e / 2;
        t[0] += n, t[1] -= n;
    }
    function ko(t) {
        return this._axes[t];
    }
    function Ao(t) {
        $p.call(this, t);
    }
    function Lo(t, e) {
        return e.type || (e.data ? "category" : "value");
    }
    function Po(t, e) {
        return t.getCoordSysModel() === e;
    }
    function Oo(t, e, n) {
        this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], 
        this._initCartesian(t, e, n), this.model = t;
    }
    function No(t, e, n) {
        n.getAxesOnZeroOf = function() {
            return i ? [ i ] : [];
        };
        var i, r = t[e], a = n.model, o = a.get("axisLine.onZero"), s = a.get("axisLine.onZeroAxisIndex");
        if (o) {
            if (null != s) return void (Eo(r[s]) && (i = r[s]));
            for (var l in r) if (r.hasOwnProperty(l) && Eo(r[l])) {
                i = r[l];
                break;
            }
        }
    }
    function Eo(t) {
        return t && "category" !== t.type && "time" !== t.type && (e = t.scale.getExtent(), 
        n = e[0], i = e[1], !(0 < n && 0 < i || n < 0 && i < 0));
        var e, n, i;
    }
    function zo(e) {
        return T(ag, function(t) {
            return e.getReferringComponents(t)[0];
        });
    }
    function Ro(t) {
        return "cartesian2d" === t.get("coordinateSystem");
    }
    function Bo(t, e) {
        var n = t.mapDimension("defaultedLabel", !0), i = n.length;
        if (1 === i) return br(t, e, n[0]);
        if (i) {
            for (var r = [], a = 0; a < n.length; a++) {
                var o = br(t, e, n[a]);
                r.push(o);
            }
            return r.join(" ");
        }
    }
    function Fo(t, e) {
        "outside" === t.textPosition && (t.textPosition = e);
    }
    function Vo(t, e, n) {
        n.style.text = null, pi(n, {
            shape: {
                width: 0
            }
        }, e, t, function() {
            n.parent && n.parent.remove(n);
        });
    }
    function Go(t, e, n) {
        n.style.text = null, pi(n, {
            shape: {
                r: n.shape.r0
            }
        }, e, t, function() {
            n.parent && n.parent.remove(n);
        });
    }
    function Wo(t, e, n, i, r, a, o, s) {
        var l = e.getItemVisual(n, "color"), u = e.getItemVisual(n, "opacity"), h = i.getModel("itemStyle"), c = i.getModel("emphasis.itemStyle").getBarItemStyle();
        s || t.setShape("r", h.get("barBorderRadius") || 0), t.useStyle(C({
            fill: l,
            opacity: u
        }, h.getBarItemStyle()));
        var d = i.getShallow("cursor");
        d && t.attr("cursor", d);
        var f, p, g, m, v, y;
        o ? r.height : r.width;
        s || (f = t.style, m = l, v = a, y = n, oi(f, p = c, (g = i).getModel("label"), g.getModel("emphasis.label"), {
            labelFetcher: v,
            labelDataIndex: y,
            defaultText: Bo(v.getData(), y),
            isRectText: !0,
            autoColor: m
        }), Fo(f), Fo(p)), ai(t, c);
    }
    function Ho(t, e, n) {
        var i = t.getData(), r = [], a = i.getLayout("valueAxisHorizontal") ? 1 : 0;
        r[1 - a] = i.getLayout("valueAxisStart");
        var o, s, l, u, h, c = new hg({
            shape: {
                points: i.getLayout("largePoints")
            },
            incremental: !!n,
            __startPoint: r,
            __valueIdx: a
        });
        e.add(c), o = c, s = t, u = (l = i).getVisual("borderColor") || l.getVisual("color"), 
        h = s.getModel("itemStyle").getItemStyle([ "color", "borderColor" ]), o.useStyle(h), 
        o.style.fill = null, o.style.stroke = u, o.style.lineWidth = l.getLayout("barWidth");
    }
    function qo(t) {
        var e = {
            componentType: t.mainType
        };
        return e[t.mainType + "Index"] = t.componentIndex, e;
    }
    function jo(t) {
        var e = t.get("tooltip");
        return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
    }
    function Uo(t) {
        t && (t.ignore = !0);
    }
    function Xo(t, e) {
        var n = t && t.getBoundingRect().clone(), i = e && e.getBoundingRect().clone();
        if (n && i) {
            var r = rt([]);
            return lt(r, r, -t.rotation), n.applyTransform(ot([], r, t.getLocalTransform())), 
            i.applyTransform(ot([], r, e.getLocalTransform())), n.intersect(i);
        }
    }
    function Yo(t) {
        return "middle" === t || "center" === t;
    }
    function Zo(t) {
        var e, n = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return n && n.axesInfo[(e = t, e.type + "||" + e.id)];
    }
    function $o(t, e, n, i, r, a) {
        var o, s = gg.getAxisPointerClass(t.axisPointerClass);
        if (s) {
            var l = (o = Zo(e)) && o.axisPointerModel;
            l ? (t._axisPointer || (t._axisPointer = new s())).render(e, l, i, a) : Ko(t, i);
        }
    }
    function Ko(t, e, n) {
        var i = t._axisPointer;
        i && i.dispose(e, n), t._axisPointer = null;
    }
    function Qo(t, e, n) {
        hu.call(this), this.updateData(t, e, n);
    }
    function Jo(t) {
        return [ t[0] / 2, t[1] / 2 ];
    }
    function ts(t, e) {
        this.parent.drift(t, e);
    }
    function es(t) {
        this.group = new hu(), this._symbolCtor = t || Qo;
    }
    function ns(t, e, n, i) {
        return !(!e || isNaN(e[0]) || isNaN(e[1]) || i.isIgnore && i.isIgnore(n) || i.clipShape && !i.clipShape.contain(e[0], e[1]) || "none" === t.getItemVisual(n, "symbol"));
    }
    function is(t) {
        return null == t || M(t) || (t = {
            isIgnore: t
        }), t || {};
    }
    function rs(t) {
        var e = t.hostModel;
        return {
            itemStyle: e.getModel("itemStyle").getItemStyle([ "color" ]),
            hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
            symbolRotate: e.get("symbolRotate"),
            symbolOffset: e.get("symbolOffset"),
            hoverAnimation: e.get("hoverAnimation"),
            labelModel: e.getModel("label"),
            hoverLabelModel: e.getModel("emphasis.label"),
            cursorStyle: e.get("cursor")
        };
    }
    function as(t, e, n) {
        var i, r, a, o, s = t.getBaseAxis(), l = t.getOtherAxis(s), u = (r = n, a = 0, o = l.scale.getExtent(), 
        "start" === r ? a = o[0] : "end" === r ? a = o[1] : 0 < o[0] ? a = o[0] : o[1] < 0 && (a = o[1]), 
        a), h = s.dim, c = l.dim, d = e.mapDimension(c), f = e.mapDimension(h), p = "x" === c || "radius" === c ? 1 : 0, g = T(t.dimensions, function(t) {
            return e.mapDimension(t);
        }), m = e.getCalculationInfo("stackResultDimension");
        return (i |= Ha(e, g[0])) && (g[0] = m), (i |= Ha(e, g[1])) && (g[1] = m), {
            dataDimsForPoint: g,
            valueStart: u,
            valueAxisDim: c,
            baseAxisDim: h,
            stacked: !!i,
            valueDim: d,
            baseDim: f,
            baseDataOffset: p,
            stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
        };
    }
    function os(t, e, n, i) {
        var r = NaN;
        t.stacked && (r = n.get(n.getCalculationInfo("stackedOverDimension"), i)), isNaN(r) && (r = t.valueStart);
        var a = t.baseDataOffset, o = [];
        return o[a] = n.get(t.baseDim, i), o[1 - a] = r, e.dataToPoint(o);
    }
    function ss(t) {
        return isNaN(t[0]) || isNaN(t[1]);
    }
    function ls(t, e, n, i, r, a, o, s, l, u) {
        return "none" !== u && u ? function(t, e, n, i, r, a, o, s, l, u, h) {
            for (var c = 0, d = n, f = 0; f < i; f++) {
                var p = e[d];
                if (r <= d || d < 0) break;
                if (ss(p)) {
                    if (h) {
                        d += a;
                        continue;
                    }
                    break;
                }
                if (d === n) t[0 < a ? "moveTo" : "lineTo"](p[0], p[1]); else if (0 < l) {
                    var g = e[c], m = "y" === u ? 1 : 0, v = (p[m] - g[m]) * l;
                    Ag(Pg, g), Pg[m] = g[m] + v, Ag(Og, p), Og[m] = p[m] - v, t.bezierCurveTo(Pg[0], Pg[1], Og[0], Og[1], p[0], p[1]);
                } else t.lineTo(p[0], p[1]);
                c = d, d += a;
            }
            return f;
        }.apply(this, arguments) : function(t, e, n, i, r, a, o, s, l, u, h) {
            for (var c = 0, d = n, f = 0; f < i; f++) {
                var p = e[d];
                if (r <= d || d < 0) break;
                if (ss(p)) {
                    if (h) {
                        d += a;
                        continue;
                    }
                    break;
                }
                if (d === n) t[0 < a ? "moveTo" : "lineTo"](p[0], p[1]), Ag(Pg, p); else if (0 < l) {
                    var g = d + a, m = e[g];
                    if (h) for (;m && ss(e[g]); ) m = e[g += a];
                    var v = .5, y = e[c], m = e[g];
                    if (!m || ss(m)) Ag(Og, p); else {
                        var _, x;
                        if (ss(m) && !h && (m = p), H(Lg, m, y), "x" === u || "y" === u) {
                            var w = "x" === u ? 0 : 1;
                            _ = Math.abs(p[w] - y[w]), x = Math.abs(p[w] - m[w]);
                        } else _ = Sl(p, y), x = Sl(p, m);
                        kg(Og, p, Lg, -l * (1 - (v = x / (x + _))));
                    }
                    Cg(Pg, Pg, s), Tg(Pg, Pg, o), Cg(Og, Og, s), Tg(Og, Og, o), t.bezierCurveTo(Pg[0], Pg[1], Og[0], Og[1], p[0], p[1]), 
                    kg(Pg, p, Lg, l * v);
                } else t.lineTo(p[0], p[1]);
                c = d, d += a;
            }
            return f;
        }.apply(this, arguments);
    }
    function us(t, e) {
        var n = [ 1 / 0, 1 / 0 ], i = [ -1 / 0, -1 / 0 ];
        if (e) for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), 
            a[1] > i[1] && (i[1] = a[1]);
        }
        return {
            min: e ? n : i,
            max: e ? i : n
        };
    }
    function hs(t, e) {
        if (t.length === e.length) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n], r = e[n];
                if (i[0] !== r[0] || i[1] !== r[1]) return;
            }
            return !0;
        }
    }
    function cs(t) {
        return "number" == typeof t ? t : t ? .5 : 0;
    }
    function ds(t) {
        var e = t.getGlobalExtent();
        if (t.onBand) {
            var n = t.getBandWidth() / 2 - 1, i = e[1] > e[0] ? 1 : -1;
            e[0] += i * n, e[1] -= i * n;
        }
        return e;
    }
    function fs(t, e, n, i) {
        return "polar" === t.type ? function(t, e, n, i) {
            var r = t.getAngleAxis(), a = t.getRadiusAxis().getExtent().slice();
            a[0] > a[1] && a.reverse();
            var o = r.getExtent(), s = Math.PI / 180;
            n && (a[0] -= .5, a[1] += .5);
            var l = new xc({
                shape: {
                    cx: Ii(t.cx, 1),
                    cy: Ii(t.cy, 1),
                    r0: Ii(a[0], 1),
                    r: Ii(a[1], 1),
                    startAngle: -o[0] * s,
                    endAngle: -o[1] * s,
                    clockwise: r.inverse
                }
            });
            return e && (l.shape.endAngle = -o[0] * s, gi(l, {
                shape: {
                    endAngle: -o[1] * s
                }
            }, i)), l;
        }(t, e, n, i) : function(t, e, n, i) {
            var r = ds(t.getAxis("x")), a = ds(t.getAxis("y")), o = t.getBaseAxis().isHorizontal(), s = Math.min(r[0], r[1]), l = Math.min(a[0], a[1]), u = Math.max(r[0], r[1]) - s, h = Math.max(a[0], a[1]) - l;
            if (n) s -= .5, u += .5, l -= .5, h += .5; else {
                var c = i.get("lineStyle.width") || 2, d = i.get("clipOverflow") ? c / 2 : Math.max(u, h);
                o ? (l -= d, h += 2 * d) : (s -= d, u += 2 * d);
            }
            var f = new Mc({
                shape: {
                    x: s,
                    y: l,
                    width: u,
                    height: h
                }
            });
            return e && (f.shape[o ? "width" : "height"] = 0, gi(f, {
                shape: {
                    width: u,
                    height: h
                }
            }, i)), f;
        }(t, e, n, i);
    }
    function ps(t, e, n) {
        for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
            var s = t[o + 1], l = t[o];
            a.push(l);
            var u = [];
            switch (n) {
              case "end":
                u[r] = s[r], u[1 - r] = l[1 - r], a.push(u);
                break;

              case "middle":
                var h = (l[r] + s[r]) / 2, c = [];
                u[r] = c[r] = h, u[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(u), a.push(c);
                break;

              default:
                u[r] = l[r], u[1 - r] = s[1 - r], a.push(u);
            }
        }
        return t[o] && a.push(t[o]), a;
    }
    function gs(t, e, n) {
        var i = t.get("showAllSymbol"), r = "auto" === i;
        if (!i || r) {
            var a = n.getAxesByScale("ordinal")[0];
            if (a && (!r || !function(t, e) {
                var n = t.getExtent(), i = Math.abs(n[1] - n[0]) / t.scale.count();
                isNaN(i) && (i = 0);
                for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; o < r; o += a) if (1.5 * Qo.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > i) return !1;
                return !0;
            }(a, e))) {
                var o = e.mapDimension(a.dim), s = {};
                return R(a.getViewLabels(), function(t) {
                    s[t.tickValue] = 1;
                }), function(t) {
                    return !s.hasOwnProperty(e.get(o, t));
                };
            }
        }
    }
    function ms(t, e, n, i) {
        var r = e.getData(), a = this.dataIndex, o = r.getName(a), s = e.get("selectedOffset");
        i.dispatchAction({
            type: "pieToggleSelect",
            from: t,
            name: o,
            seriesId: e.id
        }), r.each(function(t) {
            vs(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, n);
        });
    }
    function vs(t, e, n, i, r) {
        var a = (e.startAngle + e.endAngle) / 2, o = n ? i : 0, s = [ Math.cos(a) * o, Math.sin(a) * o ];
        r ? t.animate().when(200, {
            position: s
        }).start("bounceOut") : t.attr("position", s);
    }
    function ys(t, e) {
        function n() {
            a.ignore = a.hoverIgnore, o.ignore = o.hoverIgnore;
        }
        function i() {
            a.ignore = a.normalIgnore, o.ignore = o.normalIgnore;
        }
        hu.call(this);
        var r = new xc({
            z2: 2
        }), a = new Sc(), o = new mc();
        this.add(r), this.add(a), this.add(o), this.updateData(t, e, !0), this.on("emphasis", n).on("normal", i).on("mouseover", n).on("mouseout", i);
    }
    function _s(r, t, e, n, i, a, o) {
        function s(t, e, n) {
            for (var i = t; i < e; i++) if (r[i].y += n, t < i && i + 1 < e && r[i + 1].y > r[i].y + r[i].height) return void l(i, n / 2);
            l(e - 1, n / 2);
        }
        function l(t, e) {
            for (var n = t; 0 <= n && (r[n].y -= e, !(0 < n && r[n].y > r[n - 1].y + r[n - 1].height)); n--) ;
        }
        function u(t, e, n, i, r, a) {
            for (var o = e ? Number.MAX_VALUE : 0, s = 0, l = t.length; s < l; s++) if ("center" !== t[s].position) {
                var u = Math.abs(t[s].y - i), h = t[s].len, c = t[s].len2, d = u < r + h ? Math.sqrt((r + h + c) * (r + h + c) - u * u) : Math.abs(t[s].x - n);
                e && o <= d && (d = o - 10), !e && d <= o && (d = o + 10), t[s].x = n + d * a, o = d;
            }
        }
        r.sort(function(t, e) {
            return t.y - e.y;
        });
        for (var h, c = 0, d = r.length, f = [], p = [], g = 0; g < d; g++) (h = r[g].y - c) < 0 && s(g, d, -h), 
        c = r[g].y + r[g].height;
        o - c < 0 && l(d - 1, c - o);
        for (g = 0; g < d; g++) r[g].y >= e ? p.push(r[g]) : f.push(r[g]);
        u(f, !1, t, e, n, i), u(p, !0, t, e, n, i);
    }
    function xs(t, e) {
        function n() {
            a.ignore = a.hoverIgnore, o.ignore = o.hoverIgnore;
        }
        function i() {
            a.ignore = a.normalIgnore, o.ignore = o.normalIgnore;
        }
        hu.call(this);
        var r = new bc(), a = new Sc(), o = new mc();
        this.add(r), this.add(a), this.add(o), this.updateData(t, e, !0), this.on("emphasis", n).on("normal", i).on("mouseover", n).on("mouseout", i);
    }
    function ws(t, e, n) {
        var r, a = {}, o = "toggleSelected" === t;
        return n.eachComponent("legend", function(i) {
            o && null != r ? i[r ? "select" : "unSelect"](e.name) : (i[t](e.name), r = i.isSelected(e.name)), 
            R(i.getData(), function(t) {
                var e = t.get("name");
                if ("\n" !== e && "" !== e) {
                    var n = i.isSelected(e);
                    a[e] = a.hasOwnProperty(e) ? a[e] && n : n;
                }
            });
        }), {
            name: e.name,
            selected: a
        };
    }
    function bs(t, e) {
        e.dispatchAction({
            type: "legendToggleSelect",
            name: t
        });
    }
    function Ss(t, e, n, i) {
        var r = n.getZr().storage.getDisplayList()[0];
        r && r.useHoverLayer || n.dispatchAction({
            type: "highlight",
            seriesName: t.name,
            name: e,
            excludeSeriesId: i
        });
    }
    function Ms(t, e, n, i) {
        var r = n.getZr().storage.getDisplayList()[0];
        r && r.useHoverLayer || n.dispatchAction({
            type: "downplay",
            seriesName: t.name,
            name: e,
            excludeSeriesId: i
        });
    }
    function Is(t, e, n) {
        var i = [ 1, 1 ];
        i[t.getOrient().index] = 0, qi(e, n, {
            type: "box",
            ignoreSize: i
        });
    }
    function Ds(t) {
        je(t, "label", [ "show" ]);
    }
    function Cs(t, e, n, i, r, a) {
        var o = [], s = Ha(e, i) ? e.getCalculationInfo("stackResultDimension") : i, l = Ps(e, s, t), u = e.indicesOfNearest(s, l)[0];
        o[r] = e.get(n, u), o[a] = e.get(i, u);
        var h = Di(e.get(i, u));
        return 0 <= (h = Math.min(h, 20)) && (o[a] = +o[a].toFixed(h)), o;
    }
    function Ts(t, e) {
        var n, i = t.getData(), r = t.coordinateSystem;
        if (e && (n = e, isNaN(parseFloat(n.x)) || isNaN(parseFloat(n.y))) && !A(e.coord) && r) {
            var a = r.dimensions, o = ks(e, i, r, t);
            if ((e = b(e)).type && mm[e.type] && o.baseAxis && o.valueAxis) {
                var s = pm(a, o.baseAxis.dim), l = pm(a, o.valueAxis.dim);
                e.coord = mm[e.type](i, o.baseDataDim, o.valueDataDim, s, l), e.value = e.coord[l];
            } else {
                for (var u = [ null != e.xAxis ? e.xAxis : e.radiusAxis, null != e.yAxis ? e.yAxis : e.angleAxis ], h = 0; h < 2; h++) mm[u[h]] && (u[h] = Ps(i, i.mapDimension(a[h]), u[h]));
                e.coord = u;
            }
        }
        return e;
    }
    function ks(t, e, n, i) {
        var r = {};
        return null != t.valueIndex || null != t.valueDim ? (r.valueDataDim = null != t.valueIndex ? e.getDimension(t.valueIndex) : t.valueDim, 
        r.valueAxis = n.getAxis(function(t, e) {
            var n = t.getData(), i = n.dimensions;
            e = n.getDimension(e);
            for (var r = 0; r < i.length; r++) {
                var a = n.getDimensionInfo(i[r]);
                if (a.name === e) return a.coordDim;
            }
        }(i, r.valueDataDim)), r.baseAxis = n.getOtherAxis(r.valueAxis), r.baseDataDim = e.mapDimension(r.baseAxis.dim)) : (r.baseAxis = i.getBaseAxis(), 
        r.valueAxis = n.getOtherAxis(r.baseAxis), r.baseDataDim = e.mapDimension(r.baseAxis.dim), 
        r.valueDataDim = e.mapDimension(r.valueAxis.dim)), r;
    }
    function As(t, e) {
        return !(t && t.containData && e.coord && (n = e, isNaN(parseFloat(n.x)) && isNaN(parseFloat(n.y)))) || t.containData(e.coord);
        var n;
    }
    function Ls(t, e, n, i) {
        return i < 2 ? t.coord && t.coord[i] : t.value;
    }
    function Ps(t, e, n) {
        if ("average" === n) {
            var i = 0, r = 0;
            return t.each(e, function(t) {
                isNaN(t) || (i += t, r++);
            }), i / r;
        }
        return "median" === n ? t.getMedian(e) : t.getDataExtent(e, !0)["max" === n ? 1 : 0];
    }
    function Os(s, l, u) {
        var h = l.coordinateSystem;
        s.each(function(t) {
            var e, n = s.getItemModel(t), i = Mi(n.get("x"), u.getWidth()), r = Mi(n.get("y"), u.getHeight());
            if (isNaN(i) || isNaN(r)) {
                if (l.getMarkerPosition) e = l.getMarkerPosition(s.getValues(s.dimensions, t)); else if (h) {
                    var a = s.get(h.dimensions[0], t), o = s.get(h.dimensions[1], t);
                    e = h.dataToPoint([ a, o ]);
                }
            } else e = [ i, r ];
            isNaN(i) || (e[0] = i), isNaN(r) || (e[1] = r), s.setItemLayout(t, e);
        });
    }
    function Ns(t) {
        return isNaN(+t.cpx1) || isNaN(+t.cpy1);
    }
    function Es(t) {
        return "_" + t + "Type";
    }
    function zs(t, e, n) {
        var i = e.getItemVisual(n, "color"), r = e.getItemVisual(n, t), a = e.getItemVisual(n, t + "Size");
        if (r && "none" !== r) {
            A(a) || (a = [ a, a ]);
            var o = po(r, -a[0] / 2, -a[1] / 2, a[0], a[1], i);
            return o.name = t, o;
        }
    }
    function Rs(t, e) {
        var n = e[0], i = e[1], r = e[2];
        t.x1 = n[0], t.y1 = n[1], t.x2 = i[0], t.y2 = i[1], t.percent = 1, r ? (t.cpx1 = r[0], 
        t.cpy1 = r[1]) : (t.cpx1 = NaN, t.cpy1 = NaN);
    }
    function Bs(t, e, n) {
        hu.call(this), this._createLine(t, e, n);
    }
    function Fs(t) {
        this._ctor = t || Bs, this.group = new hu();
    }
    function Vs(t) {
        var e = t.hostModel;
        return {
            lineStyle: e.getModel("lineStyle").getLineStyle(),
            hoverLineStyle: e.getModel("emphasis.lineStyle").getLineStyle(),
            labelModel: e.getModel("label"),
            hoverLabelModel: e.getModel("emphasis.label")
        };
    }
    function Gs(t) {
        return isNaN(t[0]) || isNaN(t[1]);
    }
    function Ws(t) {
        return !Gs(t[0]) && !Gs(t[1]);
    }
    function Hs(t) {
        return !isNaN(t) && !isFinite(t);
    }
    function qs(t, e, n, i) {
        var r = 1 - t, a = i.dimensions[t];
        return Hs(e[r]) && Hs(n[r]) && e[t] === n[t] && i.getAxis(a).containData(e[t]);
    }
    function js(t, e) {
        if ("cartesian2d" === t.type) {
            var n = e[0].coord, i = e[1].coord;
            if (n && i && (qs(1, n, i, t) || qs(0, n, i, t))) return !0;
        }
        return As(t, e[0]) && As(t, e[1]);
    }
    function Us(t, e, n, i, r) {
        var a, o = i.coordinateSystem, s = t.getItemModel(e), l = Mi(s.get("x"), r.getWidth()), u = Mi(s.get("y"), r.getHeight());
        if (isNaN(l) || isNaN(u)) {
            if (i.getMarkerPosition) a = i.getMarkerPosition(t.getValues(t.dimensions, e)); else {
                var h = o.dimensions, c = t.get(h[0], e), d = t.get(h[1], e);
                a = o.dataToPoint([ c, d ]);
            }
            if ("cartesian2d" === o.type) {
                var f = o.getAxis("x"), p = o.getAxis("y");
                h = o.dimensions;
                Hs(t.get(h[0], e)) ? a[0] = f.toGlobalCoord(f.getExtent()[n ? 0 : 1]) : Hs(t.get(h[1], e)) && (a[1] = p.toGlobalCoord(p.getExtent()[n ? 0 : 1]));
            }
            isNaN(l) || (a[0] = l), isNaN(u) || (a[1] = u);
        } else a = [ l, u ];
        t.setItemLayout(e, a);
    }
    function Xs(t) {
        return !isNaN(t) && !isFinite(t);
    }
    function Ys(t, e, n) {
        var i = 1 - t;
        return Xs(e[i]) && Xs(n[i]);
    }
    function Zs(t, e) {
        var n = e.coord[0], i = e.coord[1];
        return !("cartesian2d" !== t.type || !n || !i || !Ys(1, n, i) && !Ys(0, n, i)) || (As(t, {
            coord: n,
            x: e.x0,
            y: e.y0
        }) || As(t, {
            coord: i,
            x: e.x1,
            y: e.y1
        }));
    }
    function $s(t, e, n, i, r) {
        var a, o = i.coordinateSystem, s = t.getItemModel(e), l = Mi(s.get(n[0]), r.getWidth()), u = Mi(s.get(n[1]), r.getHeight());
        if (isNaN(l) || isNaN(u)) {
            if (i.getMarkerPosition) a = i.getMarkerPosition(t.getValues(n, e)); else {
                var h = [ f = t.get(n[0], e), p = t.get(n[1], e) ];
                o.clampData && o.clampData(h, h), a = o.dataToPoint(h, !0);
            }
            if ("cartesian2d" === o.type) {
                var c = o.getAxis("x"), d = o.getAxis("y"), f = t.get(n[0], e), p = t.get(n[1], e);
                Xs(f) ? a[0] = c.toGlobalCoord(c.getExtent()["x0" === n[0] ? 0 : 1]) : Xs(p) && (a[1] = d.toGlobalCoord(d.getExtent()["y0" === n[1] ? 0 : 1]));
            }
            isNaN(l) || (a[0] = l), isNaN(u) || (a[1] = u);
        } else a = [ l, u ];
        return a;
    }
    var Ks, Qs, Js, tl, el, nl, il = 2311, rl = function() {
        return il++;
    }, al = "object" == ("undefined" == typeof wx ? "undefined" : _typeof(wx)) && "function" == typeof wx.getSystemInfoSync ? {
        browser: {},
        os: {},
        node: !1,
        wxa: !0,
        canvasSupported: !0,
        svgSupported: !1,
        touchEventsSupported: !0
    } : "undefined" == typeof document && "undefined" != typeof self ? {
        browser: {},
        os: {},
        node: !1,
        worker: !0,
        canvasSupported: !0
    } : "undefined" == typeof navigator ? {
        browser: {},
        os: {},
        node: !0,
        worker: !1,
        canvasSupported: !0,
        svgSupported: !0
    } : (Ks = navigator.userAgent, Qs = {}, Js = Ks.match(/Firefox\/([\d.]+)/), tl = Ks.match(/MSIE\s([\d.]+)/) || Ks.match(/Trident\/.+?rv:(([\d.]+))/), 
    el = Ks.match(/Edge\/([\d.]+)/), nl = /micromessenger/i.test(Ks), Js && (Qs.firefox = !0, 
    Qs.version = Js[1]), tl && (Qs.ie = !0, Qs.version = tl[1]), el && (Qs.edge = !0, 
    Qs.version = el[1]), nl && (Qs.weChat = !0), {
        browser: Qs,
        os: {},
        node: !1,
        canvasSupported: !!document.createElement("canvas").getContext,
        svgSupported: "undefined" != typeof SVGRect,
        touchEventsSupported: "ontouchstart" in window && !Qs.ie && !Qs.edge,
        pointerEventsSupported: "onpointerdown" in window && (Qs.edge || Qs.ie && 11 <= Qs.version)
    }), ol = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1,
        "[object CanvasPattern]": 1,
        "[object Image]": 1,
        "[object Canvas]": 1
    }, sl = {
        "[object Int8Array]": 1,
        "[object Uint8Array]": 1,
        "[object Uint8ClampedArray]": 1,
        "[object Int16Array]": 1,
        "[object Uint16Array]": 1,
        "[object Int32Array]": 1,
        "[object Uint32Array]": 1,
        "[object Float32Array]": 1,
        "[object Float64Array]": 1
    }, ll = Object.prototype.toString, ul = Array.prototype, hl = ul.forEach, cl = ul.filter, dl = ul.slice, fl = ul.map, pl = ul.reduce, gl = {}, ml = function() {
        return gl.createCanvas();
    };
    gl.createCanvas = function() {
        return document.createElement("canvas");
    };
    var vl, yl = "__ec_primitive__";
    E.prototype = {
        constructor: E,
        get: function(t) {
            return this.hasOwnProperty(t) ? this[t] : null;
        },
        set: function(t, e) {
            return this[t] = e;
        },
        each: function(t, e) {
            for (var n in void 0 !== e && (t = v(t, e)), this) this.hasOwnProperty(n) && t(this[n], n);
        },
        removeKey: function(t) {
            delete this[t];
        }
    };
    var _l = (Object.freeze || Object)({
        $override: e,
        clone: b,
        merge: p,
        mergeAll: h,
        extend: k,
        defaults: C,
        createCanvas: ml,
        getContext: i,
        indexOf: d,
        inherits: a,
        mixin: r,
        isArrayLike: N,
        each: R,
        map: T,
        reduce: g,
        filter: m,
        find: function(t, e, n) {
            if (t && e) for (var i = 0, r = t.length; i < r; i++) if (e.call(n, t[i], i, t)) return t[i];
        },
        bind: v,
        curry: y,
        isArray: A,
        isFunction: _,
        isString: S,
        isObject: M,
        isBuiltInObject: o,
        isTypedArray: x,
        isDom: s,
        eqNaN: w,
        retrieve: L,
        retrieve2: P,
        retrieve3: O,
        slice: l,
        normalizeCssArray: u,
        assert: c,
        trim: f,
        setAsPrimitive: I,
        isPrimitive: D,
        createHashMap: z,
        concatArray: function(t, e) {
            for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
            var r = t.length;
            for (i = 0; i < e.length; i++) n[i + r] = e[i];
            return n;
        },
        noop: B
    }), xl = "undefined" == typeof Float32Array ? Array : Float32Array, wl = q, bl = j, Sl = Y, Ml = Z, Il = (Object.freeze || Object)({
        create: n,
        copy: F,
        clone: V,
        set: function(t, e, n) {
            return t[0] = e, t[1] = n, t;
        },
        add: G,
        scaleAndAdd: W,
        sub: H,
        len: q,
        length: wl,
        lenSquare: j,
        lengthSquare: bl,
        mul: function(t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t;
        },
        div: function(t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t;
        },
        dot: function(t, e) {
            return t[0] * e[0] + t[1] * e[1];
        },
        scale: U,
        normalize: X,
        distance: Y,
        dist: Sl,
        distanceSquare: Z,
        distSquare: Ml,
        negate: function(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t;
        },
        lerp: function(t, e, n, i) {
            return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t;
        },
        applyTransform: $,
        min: K,
        max: Q
    });
    J.prototype = {
        constructor: J,
        _dragStart: function(t) {
            var e = t.target;
            e && e.draggable && ((this._draggingTarget = e).dragging = !0, this._x = t.offsetX, 
            this._y = t.offsetY, this.dispatchToElement(tt(e, t), "dragstart", t.event));
        },
        _drag: function(t) {
            var e = this._draggingTarget;
            if (e) {
                var n = t.offsetX, i = t.offsetY, r = n - this._x, a = i - this._y;
                this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement(tt(e, t), "drag", t.event);
                var o = this.findHover(n, i, e).target, s = this._dropTarget;
                e !== (this._dropTarget = o) && (s && o !== s && this.dispatchToElement(tt(s, t), "dragleave", t.event), 
                o && o !== s && this.dispatchToElement(tt(o, t), "dragenter", t.event));
            }
        },
        _dragEnd: function(t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.dispatchToElement(tt(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(tt(this._dropTarget, t), "drop", t.event), 
            this._draggingTarget = null, this._dropTarget = null;
        }
    };
    var Dl = Array.prototype.slice, Cl = function() {
        this._$handlers = {};
    };
    Cl.prototype = {
        constructor: Cl,
        one: function(t, e, n) {
            var i = this._$handlers;
            if (!e || !t) return this;
            i[t] || (i[t] = []);
            for (var r = 0; r < i[t].length; r++) if (i[t][r].h === e) return this;
            return i[t].push({
                h: e,
                one: !0,
                ctx: n || this
            }), this;
        },
        on: function(t, e, n) {
            var i = this._$handlers;
            if (!e || !t) return this;
            i[t] || (i[t] = []);
            for (var r = 0; r < i[t].length; r++) if (i[t][r].h === e) return this;
            return i[t].push({
                h: e,
                one: !1,
                ctx: n || this
            }), this;
        },
        isSilent: function(t) {
            var e = this._$handlers;
            return e[t] && e[t].length;
        },
        off: function(t, e) {
            var n = this._$handlers;
            if (!t) return this._$handlers = {}, this;
            if (e) {
                if (n[t]) {
                    for (var i = [], r = 0, a = n[t].length; r < a; r++) n[t][r].h != e && i.push(n[t][r]);
                    n[t] = i;
                }
                n[t] && 0 === n[t].length && delete n[t];
            } else delete n[t];
            return this;
        },
        trigger: function(t) {
            if (this._$handlers[t]) {
                var e = arguments, n = e.length;
                3 < n && (e = Dl.call(e, 1));
                for (var i = this._$handlers[t], r = i.length, a = 0; a < r; ) {
                    switch (n) {
                      case 1:
                        i[a].h.call(i[a].ctx);
                        break;

                      case 2:
                        i[a].h.call(i[a].ctx, e[1]);
                        break;

                      case 3:
                        i[a].h.call(i[a].ctx, e[1], e[2]);
                        break;

                      default:
                        i[a].h.apply(i[a].ctx, e);
                    }
                    i[a].one ? (i.splice(a, 1), r--) : a++;
                }
            }
            return this;
        },
        triggerWithContext: function(t) {
            if (this._$handlers[t]) {
                var e = arguments, n = e.length;
                4 < n && (e = Dl.call(e, 1, e.length - 1));
                for (var i = e[e.length - 1], r = this._$handlers[t], a = r.length, o = 0; o < a; ) {
                    switch (n) {
                      case 1:
                        r[o].h.call(i);
                        break;

                      case 2:
                        r[o].h.call(i, e[1]);
                        break;

                      case 3:
                        r[o].h.call(i, e[1], e[2]);
                        break;

                      default:
                        r[o].h.apply(i, e);
                    }
                    r[o].one ? (r.splice(o, 1), a--) : o++;
                }
            }
            return this;
        }
    };
    var Tl = "silent";
    et.prototype.dispose = function() {};
    var kl = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], Al = function(t, e, n, i) {
        Cl.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new et(), 
        this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, 
        J.call(this), this.setHandlerProxy(n);
    };
    Al.prototype = {
        constructor: Al,
        setHandlerProxy: function(e) {
            this.proxy && this.proxy.dispose(), e && (R(kl, function(t) {
                e.on && e.on(t, this[t], this);
            }, this), e.handler = this), this.proxy = e;
        },
        mousemove: function(t) {
            var e = t.zrX, n = t.zrY, i = this._hovered, r = i.target;
            r && !r.__zr && (r = (i = this.findHover(i.x, i.y)).target);
            var a = this._hovered = this.findHover(e, n), o = a.target, s = this.proxy;
            s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(i, "mouseout", t), 
            this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t);
        },
        mouseout: function(t) {
            this.dispatchToElement(this._hovered, "mouseout", t);
            for (var e, n = t.toElement || t.relatedTarget; (n = n && n.parentNode) && 9 != n.nodeType && !(e = n === this.painterRoot); ) ;
            !e && this.trigger("globalout", {
                event: t
            });
        },
        resize: function() {
            this._hovered = {};
        },
        dispatch: function(t, e) {
            var n = this[t];
            n && n.call(this, e);
        },
        dispose: function() {
            this.proxy.dispose(), this.storage = this.proxy = this.painter = null;
        },
        setCursorStyle: function(t) {
            var e = this.proxy;
            e.setCursor && e.setCursor(t);
        },
        dispatchToElement: function(t, e, n) {
            var i, r, a = (t = t || {}).target;
            if (!a || !a.silent) {
                for (var o = "on" + e, s = {
                    type: e,
                    event: r = n,
                    target: (i = t).target,
                    topTarget: i.topTarget,
                    cancelBubble: !1,
                    offsetX: r.zrX,
                    offsetY: r.zrY,
                    gestureEvent: r.gestureEvent,
                    pinchX: r.pinchX,
                    pinchY: r.pinchY,
                    pinchScale: r.pinchScale,
                    wheelDelta: r.zrDelta,
                    zrByTouch: r.zrByTouch,
                    which: r.which
                }; a && (a[o] && (s.cancelBubble = a[o].call(a, s)), a.trigger(e, s), a = a.parent, 
                !s.cancelBubble); ) ;
                s.cancelBubble || (this.trigger(e, s), this.painter && this.painter.eachOtherLayer(function(t) {
                    "function" == typeof t[o] && t[o].call(t, s), t.trigger && t.trigger(e, s);
                }));
            }
        },
        findHover: function(t, e, n) {
            for (var i = this.storage.getDisplayList(), r = {
                x: t,
                y: e
            }, a = i.length - 1; 0 <= a; a--) {
                var o;
                if (i[a] !== n && !i[a].ignore && (o = nt(i[a], t, e)) && (!r.topTarget && (r.topTarget = i[a]), 
                o !== Tl)) {
                    r.target = i[a];
                    break;
                }
            }
            return r;
        }
    }, R([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(i) {
        Al.prototype[i] = function(t) {
            var e = this.findHover(t.zrX, t.zrY), n = e.target;
            if ("mousedown" === i) this._downEl = n, this._downPoint = [ t.zrX, t.zrY ], this._upEl = n; else if ("mouseup" === i) this._upEl = n; else if ("click" === i) {
                if (this._downEl !== this._upEl || !this._downPoint || 4 < Sl(this._downPoint, [ t.zrX, t.zrY ])) return;
                this._downPoint = null;
            }
            this.dispatchToElement(e, i, t);
        };
    }), r(Al, Cl), r(Al, J);
    var Ll = "undefined" == typeof Float32Array ? Array : Float32Array, Pl = (Object.freeze || Object)({
        create: it,
        identity: rt,
        copy: at,
        mul: ot,
        translate: st,
        rotate: lt,
        scale: ut,
        invert: ht,
        clone: function(t) {
            var e = it();
            return at(e, t), e;
        }
    }), Ol = rt, Nl = function(t) {
        (t = t || {}).position || (this.position = [ 0, 0 ]), null == t.rotation && (this.rotation = 0), 
        t.scale || (this.scale = [ 1, 1 ]), this.origin = this.origin || null;
    }, El = Nl.prototype;
    El.transform = null, El.needLocalTransform = function() {
        return ct(this.rotation) || ct(this.position[0]) || ct(this.position[1]) || ct(this.scale[0] - 1) || ct(this.scale[1] - 1);
    }, El.updateTransform = function() {
        var t = this.parent, e = t && t.transform, n = this.needLocalTransform(), i = this.transform;
        return n || e ? (i = i || it(), n ? this.getLocalTransform(i) : Ol(i), e && (n ? ot(i, t.transform, i) : at(i, t.transform)), 
        this.transform = i, this.invTransform = this.invTransform || it(), void ht(this.invTransform, i)) : void (i && Ol(i));
    }, El.getLocalTransform = function(t) {
        return Nl.getLocalTransform(this, t);
    }, El.setTransform = function(t) {
        var e = this.transform, n = t.dpr || 1;
        e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0);
    }, El.restoreTransform = function(t) {
        var e = t.dpr || 1;
        t.setTransform(e, 0, 0, e, 0, 0);
    };
    var zl = [];
    El.decomposeTransform = function() {
        if (this.transform) {
            var t = this.parent, e = this.transform;
            t && t.transform && (ot(zl, t.invTransform, e), e = zl);
            var n = e[0] * e[0] + e[1] * e[1], i = e[2] * e[2] + e[3] * e[3], r = this.position, a = this.scale;
            ct(n - 1) && (n = Math.sqrt(n)), ct(i - 1) && (i = Math.sqrt(i)), e[0] < 0 && (n = -n), 
            e[3] < 0 && (i = -i), r[0] = e[4], r[1] = e[5], a[0] = n, a[1] = i, this.rotation = Math.atan2(-e[1] / i, e[0] / n);
        }
    }, El.getGlobalScale = function() {
        var t = this.transform;
        if (!t) return [ 1, 1 ];
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]), n = Math.sqrt(t[2] * t[2] + t[3] * t[3]);
        return t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), [ e, n ];
    }, El.transformCoordToLocal = function(t, e) {
        var n = [ t, e ], i = this.invTransform;
        return i && $(n, n, i), n;
    }, El.transformCoordToGlobal = function(t, e) {
        var n = [ t, e ], i = this.transform;
        return i && $(n, n, i), n;
    }, Nl.getLocalTransform = function(t, e) {
        Ol(e = e || []);
        var n = t.origin, i = t.scale || [ 1, 1 ], r = t.rotation || 0, a = t.position || [ 0, 0 ];
        return n && (e[4] -= n[0], e[5] -= n[1]), ut(e, e, i), r && lt(e, e, r), n && (e[4] += n[0], 
        e[5] += n[1]), e[4] += a[0], e[5] += a[1], e;
    };
    var Rl = {
        linear: function(t) {
            return t;
        },
        quadraticIn: function(t) {
            return t * t;
        },
        quadraticOut: function(t) {
            return t * (2 - t);
        },
        quadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
        },
        cubicIn: function(t) {
            return t * t * t;
        },
        cubicOut: function(t) {
            return --t * t * t + 1;
        },
        cubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
        },
        quarticIn: function(t) {
            return t * t * t * t;
        },
        quarticOut: function(t) {
            return 1 - --t * t * t * t;
        },
        quarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
        },
        quinticIn: function(t) {
            return t * t * t * t * t;
        },
        quinticOut: function(t) {
            return --t * t * t * t * t + 1;
        },
        quinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
        },
        sinusoidalIn: function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
        },
        sinusoidalOut: function(t) {
            return Math.sin(t * Math.PI / 2);
        },
        sinusoidalInOut: function(t) {
            return .5 * (1 - Math.cos(Math.PI * t));
        },
        exponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        exponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        exponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        },
        circularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t);
        },
        circularOut: function(t) {
            return Math.sqrt(1 - --t * t);
        },
        circularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        elasticIn: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            -n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4));
        },
        elasticOut: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / .4) + 1);
        },
        elasticInOut: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4) * .5 + 1);
        },
        backIn: function(t) {
            return t * t * (2.70158 * t - 1.70158);
        },
        backOut: function(t) {
            return --t * t * (2.70158 * t + 1.70158) + 1;
        },
        backInOut: function(t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
        bounceIn: function(t) {
            return 1 - Rl.bounceOut(1 - t);
        },
        bounceOut: function(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        bounceInOut: function(t) {
            return t < .5 ? .5 * Rl.bounceIn(2 * t) : .5 * Rl.bounceOut(2 * t - 1) + .5;
        }
    };
    dt.prototype = {
        constructor: dt,
        step: function(t, e) {
            if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), 
            this._paused) this._pausedTime += e; else {
                var n = (t - this._startTime - this._pausedTime) / this._life;
                if (!(n < 0)) {
                    n = Math.min(n, 1);
                    var i = this.easing, r = "string" == typeof i ? Rl[i] : i, a = "function" == typeof r ? r(n) : n;
                    return this.fire("frame", a), 1 == n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, 
                    "destroy") : null;
                }
            }
        },
        restart: function(t) {
            var e = (t - this._startTime - this._pausedTime) % this._life;
            this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1;
        },
        fire: function(t, e) {
            this[t = "on" + t] && this[t](this._target, e);
        },
        pause: function() {
            this._paused = !0;
        },
        resume: function() {
            this._paused = !1;
        }
    };
    var Bl = function() {
        this.head = null, this.tail = null, this._len = 0;
    }, Fl = Bl.prototype;
    Fl.insert = function(t) {
        var e = new Vl(t);
        return this.insertEntry(e), e;
    }, Fl.insertEntry = function(t) {
        this.head ? ((this.tail.next = t).prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, 
        this._len++;
    }, Fl.remove = function(t) {
        var e = t.prev, n = t.next;
        e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, 
        this._len--;
    }, Fl.len = function() {
        return this._len;
    }, Fl.clear = function() {
        this.head = this.tail = null, this._len = 0;
    };
    var Vl = function(t) {
        this.value = t, this.next, this.prev;
    }, Gl = function(t) {
        this._list = new Bl(), this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null;
    }, Wl = Gl.prototype;
    Wl.put = function(t, e) {
        var n = this._list, i = this._map, r = null;
        if (null == i[t]) {
            var a = n.len(), o = this._lastRemovedEntry;
            if (a >= this._maxSize && 0 < a) {
                var s = n.head;
                n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s;
            }
            o ? o.value = e : o = new Vl(e), o.key = t, n.insertEntry(o), i[t] = o;
        }
        return r;
    }, Wl.get = function(t) {
        var e = this._map[t], n = this._list;
        return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;
    }, Wl.clear = function() {
        this._list.clear(), this._map = {};
    };
    var Hl = {
        transparent: [ 0, 0, 0, 0 ],
        aliceblue: [ 240, 248, 255, 1 ],
        antiquewhite: [ 250, 235, 215, 1 ],
        aqua: [ 0, 255, 255, 1 ],
        aquamarine: [ 127, 255, 212, 1 ],
        azure: [ 240, 255, 255, 1 ],
        beige: [ 245, 245, 220, 1 ],
        bisque: [ 255, 228, 196, 1 ],
        black: [ 0, 0, 0, 1 ],
        blanchedalmond: [ 255, 235, 205, 1 ],
        blue: [ 0, 0, 255, 1 ],
        blueviolet: [ 138, 43, 226, 1 ],
        brown: [ 165, 42, 42, 1 ],
        burlywood: [ 222, 184, 135, 1 ],
        cadetblue: [ 95, 158, 160, 1 ],
        chartreuse: [ 127, 255, 0, 1 ],
        chocolate: [ 210, 105, 30, 1 ],
        coral: [ 255, 127, 80, 1 ],
        cornflowerblue: [ 100, 149, 237, 1 ],
        cornsilk: [ 255, 248, 220, 1 ],
        crimson: [ 220, 20, 60, 1 ],
        cyan: [ 0, 255, 255, 1 ],
        darkblue: [ 0, 0, 139, 1 ],
        darkcyan: [ 0, 139, 139, 1 ],
        darkgoldenrod: [ 184, 134, 11, 1 ],
        darkgray: [ 169, 169, 169, 1 ],
        darkgreen: [ 0, 100, 0, 1 ],
        darkgrey: [ 169, 169, 169, 1 ],
        darkkhaki: [ 189, 183, 107, 1 ],
        darkmagenta: [ 139, 0, 139, 1 ],
        darkolivegreen: [ 85, 107, 47, 1 ],
        darkorange: [ 255, 140, 0, 1 ],
        darkorchid: [ 153, 50, 204, 1 ],
        darkred: [ 139, 0, 0, 1 ],
        darksalmon: [ 233, 150, 122, 1 ],
        darkseagreen: [ 143, 188, 143, 1 ],
        darkslateblue: [ 72, 61, 139, 1 ],
        darkslategray: [ 47, 79, 79, 1 ],
        darkslategrey: [ 47, 79, 79, 1 ],
        darkturquoise: [ 0, 206, 209, 1 ],
        darkviolet: [ 148, 0, 211, 1 ],
        deeppink: [ 255, 20, 147, 1 ],
        deepskyblue: [ 0, 191, 255, 1 ],
        dimgray: [ 105, 105, 105, 1 ],
        dimgrey: [ 105, 105, 105, 1 ],
        dodgerblue: [ 30, 144, 255, 1 ],
        firebrick: [ 178, 34, 34, 1 ],
        floralwhite: [ 255, 250, 240, 1 ],
        forestgreen: [ 34, 139, 34, 1 ],
        fuchsia: [ 255, 0, 255, 1 ],
        gainsboro: [ 220, 220, 220, 1 ],
        ghostwhite: [ 248, 248, 255, 1 ],
        gold: [ 255, 215, 0, 1 ],
        goldenrod: [ 218, 165, 32, 1 ],
        gray: [ 128, 128, 128, 1 ],
        green: [ 0, 128, 0, 1 ],
        greenyellow: [ 173, 255, 47, 1 ],
        grey: [ 128, 128, 128, 1 ],
        honeydew: [ 240, 255, 240, 1 ],
        hotpink: [ 255, 105, 180, 1 ],
        indianred: [ 205, 92, 92, 1 ],
        indigo: [ 75, 0, 130, 1 ],
        ivory: [ 255, 255, 240, 1 ],
        khaki: [ 240, 230, 140, 1 ],
        lavender: [ 230, 230, 250, 1 ],
        lavenderblush: [ 255, 240, 245, 1 ],
        lawngreen: [ 124, 252, 0, 1 ],
        lemonchiffon: [ 255, 250, 205, 1 ],
        lightblue: [ 173, 216, 230, 1 ],
        lightcoral: [ 240, 128, 128, 1 ],
        lightcyan: [ 224, 255, 255, 1 ],
        lightgoldenrodyellow: [ 250, 250, 210, 1 ],
        lightgray: [ 211, 211, 211, 1 ],
        lightgreen: [ 144, 238, 144, 1 ],
        lightgrey: [ 211, 211, 211, 1 ],
        lightpink: [ 255, 182, 193, 1 ],
        lightsalmon: [ 255, 160, 122, 1 ],
        lightseagreen: [ 32, 178, 170, 1 ],
        lightskyblue: [ 135, 206, 250, 1 ],
        lightslategray: [ 119, 136, 153, 1 ],
        lightslategrey: [ 119, 136, 153, 1 ],
        lightsteelblue: [ 176, 196, 222, 1 ],
        lightyellow: [ 255, 255, 224, 1 ],
        lime: [ 0, 255, 0, 1 ],
        limegreen: [ 50, 205, 50, 1 ],
        linen: [ 250, 240, 230, 1 ],
        magenta: [ 255, 0, 255, 1 ],
        maroon: [ 128, 0, 0, 1 ],
        mediumaquamarine: [ 102, 205, 170, 1 ],
        mediumblue: [ 0, 0, 205, 1 ],
        mediumorchid: [ 186, 85, 211, 1 ],
        mediumpurple: [ 147, 112, 219, 1 ],
        mediumseagreen: [ 60, 179, 113, 1 ],
        mediumslateblue: [ 123, 104, 238, 1 ],
        mediumspringgreen: [ 0, 250, 154, 1 ],
        mediumturquoise: [ 72, 209, 204, 1 ],
        mediumvioletred: [ 199, 21, 133, 1 ],
        midnightblue: [ 25, 25, 112, 1 ],
        mintcream: [ 245, 255, 250, 1 ],
        mistyrose: [ 255, 228, 225, 1 ],
        moccasin: [ 255, 228, 181, 1 ],
        navajowhite: [ 255, 222, 173, 1 ],
        navy: [ 0, 0, 128, 1 ],
        oldlace: [ 253, 245, 230, 1 ],
        olive: [ 128, 128, 0, 1 ],
        olivedrab: [ 107, 142, 35, 1 ],
        orange: [ 255, 165, 0, 1 ],
        orangered: [ 255, 69, 0, 1 ],
        orchid: [ 218, 112, 214, 1 ],
        palegoldenrod: [ 238, 232, 170, 1 ],
        palegreen: [ 152, 251, 152, 1 ],
        paleturquoise: [ 175, 238, 238, 1 ],
        palevioletred: [ 219, 112, 147, 1 ],
        papayawhip: [ 255, 239, 213, 1 ],
        peachpuff: [ 255, 218, 185, 1 ],
        peru: [ 205, 133, 63, 1 ],
        pink: [ 255, 192, 203, 1 ],
        plum: [ 221, 160, 221, 1 ],
        powderblue: [ 176, 224, 230, 1 ],
        purple: [ 128, 0, 128, 1 ],
        red: [ 255, 0, 0, 1 ],
        rosybrown: [ 188, 143, 143, 1 ],
        royalblue: [ 65, 105, 225, 1 ],
        saddlebrown: [ 139, 69, 19, 1 ],
        salmon: [ 250, 128, 114, 1 ],
        sandybrown: [ 244, 164, 96, 1 ],
        seagreen: [ 46, 139, 87, 1 ],
        seashell: [ 255, 245, 238, 1 ],
        sienna: [ 160, 82, 45, 1 ],
        silver: [ 192, 192, 192, 1 ],
        skyblue: [ 135, 206, 235, 1 ],
        slateblue: [ 106, 90, 205, 1 ],
        slategray: [ 112, 128, 144, 1 ],
        slategrey: [ 112, 128, 144, 1 ],
        snow: [ 255, 250, 250, 1 ],
        springgreen: [ 0, 255, 127, 1 ],
        steelblue: [ 70, 130, 180, 1 ],
        tan: [ 210, 180, 140, 1 ],
        teal: [ 0, 128, 128, 1 ],
        thistle: [ 216, 191, 216, 1 ],
        tomato: [ 255, 99, 71, 1 ],
        turquoise: [ 64, 224, 208, 1 ],
        violet: [ 238, 130, 238, 1 ],
        wheat: [ 245, 222, 179, 1 ],
        white: [ 255, 255, 255, 1 ],
        whitesmoke: [ 245, 245, 245, 1 ],
        yellow: [ 255, 255, 0, 1 ],
        yellowgreen: [ 154, 205, 50, 1 ]
    }, ql = new Gl(20), jl = null, Ul = It, Xl = Dt, Yl = (Object.freeze || Object)({
        parse: bt,
        lift: Mt,
        toHex: function(t) {
            var e = bt(t);
            return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
        },
        fastLerp: It,
        fastMapToColor: Ul,
        lerp: Dt,
        mapToColor: Xl,
        modifyHSL: function(t, e, n, i) {
            return (t = bt(t)) ? (t = function(t) {
                if (t) {
                    var e, n, i = t[0] / 255, r = t[1] / 255, a = t[2] / 255, o = Math.min(i, r, a), s = Math.max(i, r, a), l = s - o, u = (s + o) / 2;
                    if (0 === l) n = e = 0; else {
                        n = u < .5 ? l / (s + o) : l / (2 - s - o);
                        var h = ((s - i) / 6 + l / 2) / l, c = ((s - r) / 6 + l / 2) / l, d = ((s - a) / 6 + l / 2) / l;
                        i === s ? e = d - c : r === s ? e = 1 / 3 + h - d : a === s && (e = 2 / 3 + c - h), 
                        e < 0 && (e += 1), 1 < e && (e -= 1);
                    }
                    var f = [ 360 * e, n, u ];
                    return null != t[3] && f.push(t[3]), f;
                }
            }(t), null != e && (t[0] = (r = e, (r = Math.round(r)) < 0 ? 0 : 360 < r ? 360 : r)), 
            null != n && (t[1] = mt(n)), null != i && (t[2] = mt(i)), Tt(St(t), "rgba")) : void 0;
            var r;
        },
        modifyAlpha: Ct,
        stringify: Tt
    }), Zl = Array.prototype.slice, $l = function(t, e, n, i) {
        this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || kt, 
        this._setter = i || At, this._clipCount = 0, this._delay = 0, this._doneList = [], 
        this._onframeList = [], this._clipList = [];
    };
    $l.prototype = {
        when: function(t, e) {
            var n = this._tracks;
            for (var i in e) if (e.hasOwnProperty(i)) {
                if (!n[i]) {
                    n[i] = [];
                    var r = this._getter(this._target, i);
                    if (null == r) continue;
                    0 !== t && n[i].push({
                        time: 0,
                        value: Bt(r)
                    });
                }
                n[i].push({
                    time: t,
                    value: e[i]
                });
            }
            return this;
        },
        during: function(t) {
            return this._onframeList.push(t), this;
        },
        pause: function() {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
            this._paused = !0;
        },
        resume: function() {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
            this._paused = !1;
        },
        isPaused: function() {
            return !!this._paused;
        },
        _doneCallback: function() {
            this._tracks = {}, this._clipList.length = 0;
            for (var t = this._doneList, e = t.length, n = 0; n < e; n++) t[n].call(this);
        },
        start: function(t, e) {
            var n, i = this, r = 0, a = function() {
                --r || i._doneCallback();
            };
            for (var o in this._tracks) if (this._tracks.hasOwnProperty(o)) {
                var s = Vt(this, t, a, this._tracks[o], o, e);
                s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), 
                n = s);
            }
            if (n) {
                var l = n.onframe;
                n.onframe = function(t, e) {
                    l(t, e);
                    for (var n = 0; n < i._onframeList.length; n++) i._onframeList[n](t, e);
                };
            }
            return r || this._doneCallback(), this;
        },
        stop: function(t) {
            for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
                var r = e[i];
                t && r.onframe(this._target, 1), n && n.removeClip(r);
            }
            e.length = 0;
        },
        delay: function(t) {
            return this._delay = t, this;
        },
        done: function(t) {
            return t && this._doneList.push(t), this;
        },
        getClips: function() {
            return this._clipList;
        }
    };
    var Kl = 1;
    "undefined" != typeof window && (Kl = Math.max(window.devicePixelRatio || 1, 1));
    var Ql = Kl, Jl = function() {}, tu = Jl, eu = function() {
        this.animators = [];
    };
    eu.prototype = {
        constructor: eu,
        animate: function(t, e) {
            var n, i = !1, r = this, a = this.__zr;
            if (t) {
                var o = t.split("."), s = r;
                i = "shape" === o[0];
                for (var l = 0, u = o.length; l < u; l++) s && (s = s[o[l]]);
                s && (n = s);
            } else n = r;
            if (n) {
                var h = r.animators, c = new $l(n, e);
                return c.during(function() {
                    r.dirty(i);
                }).done(function() {
                    h.splice(d(h, c), 1);
                }), h.push(c), a && a.animation.addAnimator(c), c;
            }
            tu('Property "' + t + '" is not existed in element ' + r.id);
        },
        stopAnimation: function(t) {
            for (var e = this.animators, n = e.length, i = 0; i < n; i++) e[i].stop(t);
            return e.length = 0, this;
        },
        animateTo: function(t, e, n, i, r, a) {
            function o() {
                --l || r && r();
            }
            S(n) ? (r = i, i = n, n = 0) : _(i) ? (r = i, i = "linear", n = 0) : _(n) ? (r = n, 
            n = 0) : _(e) ? (r = e, e = 500) : e || (e = 500), this.stopAnimation(), this._animateToShallow("", this, t, e, n);
            var s = this.animators.slice(), l = s.length;
            l || r && r();
            for (var u = 0; u < s.length; u++) s[u].done(o).start(i, a);
        },
        _animateToShallow: function(t, e, n, i, r) {
            var a = {}, o = 0;
            for (var s in n) if (n.hasOwnProperty(s)) if (null != e[s]) M(n[s]) && !N(n[s]) ? this._animateToShallow(t ? t + "." + s : s, e[s], n[s], i, r) : (a[s] = n[s], 
            o++); else if (null != n[s]) if (t) {
                var l = {};
                l[t] = {}, l[t][s] = n[s], this.attr(l);
            } else this.attr(s, n[s]);
            return 0 < o && this.animate(t, !1).when(null == i ? 500 : i, a).delay(r || 0), 
            this;
        }
    };
    var nu = function(t) {
        Nl.call(this, t), Cl.call(this, t), eu.call(this, t), this.id = t.id || rl();
    };
    nu.prototype = {
        type: "element",
        name: "",
        __zr: null,
        ignore: !1,
        clipPath: null,
        isGroup: !1,
        drift: function(t, e) {
            switch (this.draggable) {
              case "horizontal":
                e = 0;
                break;

              case "vertical":
                t = 0;
            }
            var n = this.transform;
            n || (n = this.transform = [ 1, 0, 0, 1, 0, 0 ]), n[4] += t, n[5] += e, this.decomposeTransform(), 
            this.dirty(!1);
        },
        beforeUpdate: function() {},
        afterUpdate: function() {},
        update: function() {
            this.updateTransform();
        },
        traverse: function() {},
        attrKV: function(t, e) {
            if ("position" === t || "scale" === t || "origin" === t) {
                if (e) {
                    var n = this[t];
                    n || (n = this[t] = []), n[0] = e[0], n[1] = e[1];
                }
            } else this[t] = e;
        },
        hide: function() {
            this.ignore = !0, this.__zr && this.__zr.refresh();
        },
        show: function() {
            this.ignore = !1, this.__zr && this.__zr.refresh();
        },
        attr: function(t, e) {
            if ("string" == typeof t) this.attrKV(t, e); else if (M(t)) for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);
            return this.dirty(!1), this;
        },
        setClipPath: function(t) {
            var e = this.__zr;
            e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), 
            (this.clipPath = t).__zr = e, (t.__clipTarget = this).dirty(!1);
        },
        removeClipPath: function() {
            var t = this.clipPath;
            t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, 
            this.clipPath = null, this.dirty(!1));
        },
        addSelfToZr: function(t) {
            this.__zr = t;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
            this.clipPath && this.clipPath.addSelfToZr(t);
        },
        removeSelfFromZr: function(t) {
            this.__zr = null;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
            this.clipPath && this.clipPath.removeSelfFromZr(t);
        }
    }, r(nu, eu), r(nu, Nl), r(nu, Cl);
    var iu, ru, au, ou, su = $, lu = Math.min, uu = Math.max;
    Gt.prototype = {
        constructor: Gt,
        union: function(t) {
            var e = lu(t.x, this.x), n = lu(t.y, this.y);
            this.width = uu(t.x + t.width, this.x + this.width) - e, this.height = uu(t.y + t.height, this.y + this.height) - n, 
            this.x = e, this.y = n;
        },
        applyTransform: (iu = [], ru = [], au = [], ou = [], function(t) {
            if (t) {
                iu[0] = au[0] = this.x, iu[1] = ou[1] = this.y, ru[0] = ou[0] = this.x + this.width, 
                ru[1] = au[1] = this.y + this.height, su(iu, iu, t), su(ru, ru, t), su(au, au, t), 
                su(ou, ou, t), this.x = lu(iu[0], ru[0], au[0], ou[0]), this.y = lu(iu[1], ru[1], au[1], ou[1]);
                var e = uu(iu[0], ru[0], au[0], ou[0]), n = uu(iu[1], ru[1], au[1], ou[1]);
                this.width = e - this.x, this.height = n - this.y;
            }
        }),
        calculateTransform: function(t) {
            var e = t.width / this.width, n = t.height / this.height, i = it();
            return st(i, i, [ -this.x, -this.y ]), ut(i, i, [ e, n ]), st(i, i, [ t.x, t.y ]), 
            i;
        },
        intersect: function(t) {
            if (!t) return !1;
            t instanceof Gt || (t = Gt.create(t));
            var e = this.x, n = this.x + this.width, i = this.y, r = this.y + this.height, a = t.x, o = t.x + t.width, s = t.y, l = t.y + t.height;
            return !(n < a || o < e || r < s || l < i);
        },
        contain: function(t, e) {
            return t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height;
        },
        clone: function() {
            return new Gt(this.x, this.y, this.width, this.height);
        },
        copy: function(t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height;
        },
        plain: function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        }
    }, Gt.create = function(t) {
        return new Gt(t.x, t.y, t.width, t.height);
    };
    var hu = function(t) {
        for (var e in t = t || {}, nu.call(this, t), t) t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0;
    };
    hu.prototype = {
        constructor: hu,
        isGroup: !0,
        type: "group",
        silent: !1,
        children: function() {
            return this._children.slice();
        },
        childAt: function(t) {
            return this._children[t];
        },
        childOfName: function(t) {
            for (var e = this._children, n = 0; n < e.length; n++) if (e[n].name === t) return e[n];
        },
        childCount: function() {
            return this._children.length;
        },
        add: function(t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), 
            this;
        },
        addBefore: function(t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var n = this._children, i = n.indexOf(e);
                0 <= i && (n.splice(i, 0, t), this._doAdd(t));
            }
            return this;
        },
        _doAdd: function(t) {
            t.parent && t.parent.remove(t);
            var e = (t.parent = this).__storage, n = this.__zr;
            e && e !== t.__storage && (e.addToStorage(t), t instanceof hu && t.addChildrenToStorage(e)), 
            n && n.refresh();
        },
        remove: function(t) {
            var e = this.__zr, n = this.__storage, i = this._children, r = d(i, t);
            return r < 0 || (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), t instanceof hu && t.delChildrenFromStorage(n)), 
            e && e.refresh()), this;
        },
        removeAll: function() {
            var t, e, n = this._children, i = this.__storage;
            for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof hu && t.delChildrenFromStorage(i)), 
            t.parent = null;
            return n.length = 0, this;
        },
        eachChild: function(t, e) {
            for (var n = this._children, i = 0; i < n.length; i++) {
                var r = n[i];
                t.call(e, r, i);
            }
            return this;
        },
        traverse: function(t, e) {
            for (var n = 0; n < this._children.length; n++) {
                var i = this._children[n];
                t.call(e, i), "group" === i.type && i.traverse(t, e);
            }
            return this;
        },
        addChildrenToStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.addToStorage(n), n instanceof hu && n.addChildrenToStorage(t);
            }
        },
        delChildrenFromStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.delFromStorage(n), n instanceof hu && n.delChildrenFromStorage(t);
            }
        },
        dirty: function() {
            return this.__dirty = !0, this.__zr && this.__zr.refresh(), this;
        },
        getBoundingRect: function(t) {
            for (var e = null, n = new Gt(0, 0, 0, 0), i = t || this._children, r = [], a = 0; a < i.length; a++) {
                var o = i[a];
                if (!o.ignore && !o.invisible) {
                    var s = o.getBoundingRect(), l = o.getLocalTransform(r);
                    l ? (n.copy(s), n.applyTransform(l), (e = e || n.clone()).union(n)) : (e = e || s.clone()).union(s);
                }
            }
            return e || n;
        }
    }, a(hu, nu);
    var cu = 32, du = 7, fu = function() {
        this._roots = [], this._displayList = [], this._displayListLen = 0;
    };
    fu.prototype = {
        constructor: fu,
        traverse: function(t, e) {
            for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e);
        },
        getDisplayList: function(t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList;
        },
        updateDisplayList: function(t) {
            this._displayListLen = 0;
            for (var e = this._roots, n = this._displayList, i = 0, r = e.length; i < r; i++) this._updateAndAddDisplayable(e[i], null, t);
            n.length = this._displayListLen, al.canvasSupported && Xt(n, Yt);
        },
        _updateAndAddDisplayable: function(t, e, n) {
            if (!t.ignore || n) {
                t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                var i = t.clipPath;
                if (i) {
                    e = e ? e.slice() : [];
                    for (var r = i, a = t; r; ) r.parent = a, r.updateTransform(), e.push(r), r = (a = r).clipPath;
                }
                if (t.isGroup) {
                    for (var o = t._children, s = 0; s < o.length; s++) {
                        var l = o[s];
                        t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n);
                    }
                    t.__dirty = !1;
                } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t;
            }
        },
        addRoot: function(t) {
            t.__storage !== this && (t instanceof hu && t.addChildrenToStorage(this), this.addToStorage(t), 
            this._roots.push(t));
        },
        delRoot: function(t) {
            if (null == t) {
                for (var e = 0; e < this._roots.length; e++) {
                    var n = this._roots[e];
                    n instanceof hu && n.delChildrenFromStorage(this);
                }
                return this._roots = [], this._displayList = [], void (this._displayListLen = 0);
            }
            if (t instanceof Array) {
                e = 0;
                for (var i = t.length; e < i; e++) this.delRoot(t[e]);
            } else {
                var r = d(this._roots, t);
                0 <= r && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof hu && t.delChildrenFromStorage(this));
            }
        },
        addToStorage: function(t) {
            return t && (t.__storage = this, t.dirty(!1)), this;
        },
        delFromStorage: function(t) {
            return t && (t.__storage = null), this;
        },
        dispose: function() {
            this._renderList = this._roots = null;
        },
        displayableSortFunc: Yt
    };
    var pu = {
        shadowBlur: 1,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        textShadowBlur: 1,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
        textBoxShadowBlur: 1,
        textBoxShadowOffsetX: 1,
        textBoxShadowOffsetY: 1
    }, gu = function(t, e, n) {
        return pu.hasOwnProperty(e) ? n *= t.dpr : n;
    }, mu = [ [ "shadowBlur", 0 ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ], [ "shadowColor", "#000" ], [ "lineCap", "butt" ], [ "lineJoin", "miter" ], [ "miterLimit", 10 ] ], vu = function(t, e) {
        this.extendFrom(t, !1), this.host = e;
    };
    vu.prototype = {
        constructor: vu,
        host: null,
        fill: "#000",
        stroke: null,
        opacity: 1,
        lineDash: null,
        lineDashOffset: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineWidth: 1,
        strokeNoScale: !1,
        text: null,
        font: null,
        textFont: null,
        fontStyle: null,
        fontWeight: null,
        fontSize: null,
        fontFamily: null,
        textTag: null,
        textFill: "#000",
        textStroke: null,
        textWidth: null,
        textHeight: null,
        textStrokeWidth: 0,
        textLineHeight: null,
        textPosition: "inside",
        textRect: null,
        textOffset: null,
        textAlign: null,
        textVerticalAlign: null,
        textDistance: 5,
        textShadowColor: "transparent",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        textBoxShadowColor: "transparent",
        textBoxShadowBlur: 0,
        textBoxShadowOffsetX: 0,
        textBoxShadowOffsetY: 0,
        transformText: !1,
        textRotation: 0,
        textOrigin: null,
        textBackgroundColor: null,
        textBorderColor: null,
        textBorderWidth: 0,
        textBorderRadius: 0,
        textPadding: null,
        rich: null,
        truncate: null,
        blend: null,
        bind: function(t, e, n) {
            for (var i = this, r = n && n.style, a = !r, o = 0; o < mu.length; o++) {
                var s = mu[o], l = s[0];
                (a || i[l] !== r[l]) && (t[l] = gu(t, l, i[l] || s[1]));
            }
            if ((a || i.fill !== r.fill) && (t.fillStyle = i.fill), (a || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), 
            (a || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), 
            (a || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), 
            this.hasStroke()) {
                var u = i.lineWidth;
                t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1);
            }
        },
        hasFill: function() {
            var t = this.fill;
            return null != t && "none" !== t;
        },
        hasStroke: function() {
            var t = this.stroke;
            return null != t && "none" !== t && 0 < this.lineWidth;
        },
        extendFrom: function(t, e) {
            if (t) for (var n in t) !t.hasOwnProperty(n) || !0 !== e && (!1 === e ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n]);
        },
        set: function(t, e) {
            "string" == typeof t ? this[t] = e : this.extendFrom(t, !0);
        },
        clone: function() {
            var t = new this.constructor();
            return t.extendFrom(this, !0), t;
        },
        getGradient: function(t, e, n) {
            for (var i = ("radial" === e.type ? $t : Zt)(t, e, n), r = e.colorStops, a = 0; a < r.length; a++) i.addColorStop(r[a].offset, r[a].color);
            return i;
        }
    };
    for (var yu = vu.prototype, _u = 0; _u < mu.length; _u++) {
        var xu = mu[_u];
        xu[0] in yu || (yu[xu[0]] = xu[1]);
    }
    vu.getGradient = yu.getGradient;
    var wu = function(t, e) {
        this.image = t, this.repeat = e, this.type = "pattern";
    }, bu = function(t, e, n) {
        var i;
        n = n || Ql, "string" == typeof t ? i = Qt(t, e, n) : M(t) && (t = (i = t).id), 
        this.id = t;
        var r = (this.dom = i).style;
        r && (i.onselectstart = Kt, r["-webkit-user-select"] = "none", r["user-select"] = "none", 
        r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", 
        r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, 
        this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, 
        this.lastFrameAlpha = .7, this.dpr = n;
    };
    bu.prototype = {
        constructor: bu,
        __dirty: !0,
        __used: !(wu.prototype.getCanvasPattern = function(t) {
            return t.createPattern(this.image, this.repeat || "repeat");
        }),
        __drawIndex: 0,
        __startIndex: 0,
        __endIndex: 0,
        incremental: !1,
        getElementCount: function() {
            return this.__endIndex - this.__startIndex;
        },
        initContext: function() {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
        },
        createBackBuffer: function() {
            var t = this.dpr;
            this.domBack = Qt("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 
            1 != t && this.ctxBack.scale(t, t);
        },
        resize: function(t, e) {
            var n = this.dpr, i = this.dom, r = i.style, a = this.domBack;
            r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, 
            a && (a.width = t * n, a.height = e * n, 1 != n && this.ctxBack.scale(n, n));
        },
        clear: function(t, e) {
            var n, i = this.dom, r = this.ctx, a = i.width, o = i.height, s = (e = e || this.clearColor, 
            this.motionBlur && !t), l = this.lastFrameAlpha, u = this.dpr;
            (s && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", 
            this.ctxBack.drawImage(i, 0, 0, a / u, o / u)), r.clearRect(0, 0, a, o), e && "transparent" !== e) && (e.colorStops ? (n = e.__canvasGradient || vu.getGradient(r, e, {
                x: 0,
                y: 0,
                width: a,
                height: o
            }), e.__canvasGradient = n) : e.image && (n = wu.prototype.getCanvasPattern.call(e, r)), 
            r.save(), r.fillStyle = n || e, r.fillRect(0, 0, a, o), r.restore());
            if (s) {
                var h = this.domBack;
                r.save(), r.globalAlpha = l, r.drawImage(h, 0, 0, a, o), r.restore();
            }
        }
    };
    var Su = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
        setTimeout(t, 16);
    }, Mu = new Gl(50), Iu = {}, Du = 0, Cu = 5e3, Tu = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g, ku = "12px sans-serif", Au = {
        measureText: function(t, e) {
            var n = i();
            return n.font = e || ku, n.measureText(t);
        }
    }, Lu = {
        left: 1,
        right: 1,
        center: 1
    }, Pu = {
        top: 1,
        bottom: 1,
        middle: 1
    }, Ou = new Gt(), Nu = function() {};
    Le.prototype = {
        constructor: Le,
        type: "displayable",
        __dirty: !0,
        invisible: !(Nu.prototype = {
            constructor: Nu,
            drawRectText: function(t, e) {
                var n = this.style;
                e = n.textRect || e, this.__dirty && me(n);
                var i = n.text;
                if (null != i && (i += ""), Ae(i, n)) {
                    t.save();
                    var r = this.transform;
                    n.transformText ? this.setTransform(t) : r && (Ou.copy(e), Ou.applyTransform(r), 
                    e = Ou), ye(this, t, i, n, e), t.restore();
                }
            }
        }),
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: "pointer",
        rectHover: !1,
        progressive: !1,
        incremental: !1,
        inplace: !1,
        beforeBrush: function() {},
        afterBrush: function() {},
        brush: function() {},
        getBoundingRect: function() {},
        contain: function(t, e) {
            return this.rectContain(t, e);
        },
        traverse: function(t, e) {
            t.call(e, this);
        },
        rectContain: function(t, e) {
            var n = this.transformCoordToLocal(t, e);
            return this.getBoundingRect().contain(n[0], n[1]);
        },
        dirty: function() {
            this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh();
        },
        animateStyle: function(t) {
            return this.animate("style", t);
        },
        attrKV: function(t, e) {
            "style" !== t ? nu.prototype.attrKV.call(this, t, e) : this.style.set(e);
        },
        setStyle: function(t, e) {
            return this.style.set(t, e), this.dirty(!1), this;
        },
        useStyle: function(t) {
            return this.style = new vu(t, this), this.dirty(!1), this;
        }
    }, a(Le, nu), r(Le, Nu), Pe.prototype = {
        constructor: Pe,
        type: "image",
        brush: function(t, e) {
            var n = this.style, i = n.image;
            n.bind(t, this, e);
            var r = this._image = te(i, this._image, this, this.onload);
            if (r && ne(r)) {
                var a = n.x || 0, o = n.y || 0, s = n.width, l = n.height, u = r.width / r.height;
                if (null == s && null != l ? s = l * u : null == l && null != s ? l = s / u : null == s && null == l && (s = r.width, 
                l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
                    var h = n.sx || 0, c = n.sy || 0;
                    t.drawImage(r, h, c, n.sWidth, n.sHeight, a, o, s, l);
                } else if (n.sx && n.sy) {
                    var d = s - (h = n.sx), f = l - (c = n.sy);
                    t.drawImage(r, h, c, d, f, a, o, s, l);
                } else t.drawImage(r, a, o, s, l);
                null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()));
            }
        },
        getBoundingRect: function() {
            var t = this.style;
            return this._rect || (this._rect = new Gt(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), 
            this._rect;
        }
    }, a(Pe, Le);
    var Eu = 314159, zu = new Gt(0, 0, 0, 0), Ru = new Gt(0, 0, 0, 0), Bu = function(t, e, n) {
        this.type = "canvas";
        var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
        this._opts = n = k({}, n || {}), this.dpr = n.devicePixelRatio || Ql, this._singleCanvas = i;
        var r = (this.root = t).style;
        r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", 
        t.innerHTML = ""), this.storage = e;
        var a, o, s, l = this._zlevelList = [], u = this._layers = {};
        if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
            var h = t.width, c = t.height;
            null != n.width && (h = n.width), null != n.height && (c = n.height), this.dpr = n.devicePixelRatio || 1, 
            t.width = h * this.dpr, t.height = c * this.dpr, this._width = h, this._height = c;
            var d = new bu(t, this, this.dpr);
            d.__builtin__ = !0, d.initContext(), (u[Eu] = d).zlevel = Eu, l.push(Eu), this._domRoot = t;
        } else {
            this._width = this._getSize(0), this._height = this._getSize(1);
            var f = this._domRoot = (a = this._width, o = this._height, (s = document.createElement("div")).style.cssText = [ "position:relative", "overflow:hidden", "width:" + a + "px", "height:" + o + "px", "padding:0", "margin:0", "border-width:0" ].join(";") + ";", 
            s);
            t.appendChild(f);
        }
        this._hoverlayer = null, this._hoverElements = [];
    };
    Bu.prototype = {
        constructor: Bu,
        getType: function() {
            return "canvas";
        },
        isSingleCanvas: function() {
            return this._singleCanvas;
        },
        getViewportRoot: function() {
            return this._domRoot;
        },
        getViewportRootOffset: function() {
            var t = this.getViewportRoot();
            return t ? {
                offsetLeft: t.offsetLeft || 0,
                offsetTop: t.offsetTop || 0
            } : void 0;
        },
        refresh: function(t) {
            var e = this.storage.getDisplayList(!0), n = this._zlevelList;
            this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
            for (var i = 0; i < n.length; i++) {
                var r = n[i], a = this._layers[r];
                if (!a.__builtin__ && a.refresh) {
                    var o = 0 === i ? this._backgroundColor : null;
                    a.refresh(o);
                }
            }
            return this.refreshHover(), this;
        },
        addHover: function(t, e) {
            if (!t.__hoverMir) {
                var n = new t.constructor({
                    style: t.style,
                    shape: t.shape
                });
                ((n.__from = t).__hoverMir = n).setStyle(e), this._hoverElements.push(n);
            }
        },
        removeHover: function(t) {
            var e = t.__hoverMir, n = this._hoverElements, i = d(n, e);
            0 <= i && n.splice(i, 1), t.__hoverMir = null;
        },
        clearHover: function() {
            for (var t = this._hoverElements, e = 0; e < t.length; e++) {
                var n = t[e].__from;
                n && (n.__hoverMir = null);
            }
            t.length = 0;
        },
        refreshHover: function() {
            var t = this._hoverElements, e = t.length, n = this._hoverlayer;
            if (n && n.clear(), e) {
                Xt(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(1e5));
                var i = {};
                n.ctx.save();
                for (var r = 0; r < e; ) {
                    var a = t[r], o = a.__from;
                    o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, 
                    a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), 
                    o.__hoverMir = null, e--);
                }
                n.ctx.restore();
            }
        },
        getHoverLayer: function() {
            return this.getLayer(1e5);
        },
        _paintList: function(t, e, n) {
            if (this._redrawId === n) {
                e = e || !1, this._updateLayerStatus(t);
                var i = this._doPaintList(t, e);
                if (this._needsManuallyCompositing && this._compositeManually(), !i) {
                    var r = this;
                    Su(function() {
                        r._paintList(t, e, n);
                    });
                }
            }
        },
        _compositeManually: function() {
            var e = this.getLayer(Eu).ctx, n = this._domRoot.width, i = this._domRoot.height;
            e.clearRect(0, 0, n, i), this.eachBuiltinLayer(function(t) {
                t.virtual && e.drawImage(t.dom, 0, 0, n, i);
            });
        },
        _doPaintList: function(t, e) {
            for (var n = [], i = 0; i < this._zlevelList.length; i++) {
                var r = this._zlevelList[i];
                (s = this._layers[r]).__builtin__ && s !== this._hoverlayer && (s.__dirty || e) && n.push(s);
            }
            for (var a = !0, o = 0; o < n.length; o++) {
                var s, l = (s = n[o]).ctx, u = {};
                l.save();
                var h = e ? s.__startIndex : s.__drawIndex, c = !e && s.incremental && Date.now, d = c && Date.now(), f = s.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
                if (s.__startIndex === s.__endIndex) s.clear(!1, f); else if (h === s.__startIndex) {
                    var p = t[h];
                    p.incremental && p.notClear && !e || s.clear(!1, f);
                }
                -1 === h && (console.error("For some unknown reason. drawIndex is -1"), h = s.__startIndex);
                for (var g = h; g < s.__endIndex; g++) {
                    var m = t[g];
                    if (this._doPaintEl(m, s, e, u), m.__dirty = !1, c) if (15 < Date.now() - d) break;
                }
                s.__drawIndex = g, s.__drawIndex < s.__endIndex && (a = !1), u.prevElClipPaths && l.restore(), 
                l.restore();
            }
            return al.wxa && R(this._layers, function(t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw();
            }), a;
        },
        _doPaintEl: function(t, e, n, i) {
            var r, a, o, s = e.ctx, l = t.transform;
            if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || l && !l[0] && !l[3] || t.culling && (r = t, 
            a = this._width, o = this._height, zu.copy(r.getBoundingRect()), r.transform && zu.applyTransform(r.transform), 
            Ru.width = a, Ru.height = o, !zu.intersect(Ru)))) {
                var u = t.__clipPaths;
                (!i.prevElClipPaths || function(t, e) {
                    if (t == e) return !1;
                    if (!t || !e || t.length !== e.length) return !0;
                    for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0;
                }(u, i.prevElClipPaths)) && (i.prevElClipPaths && (e.ctx.restore(), i.prevElClipPaths = null, 
                i.prevEl = null), u && (s.save(), function(t, e) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e);
                    }
                }(u, s), i.prevElClipPaths = u)), t.beforeBrush && t.beforeBrush(s), t.brush(s, i.prevEl || null), 
                (i.prevEl = t).afterBrush && t.afterBrush(s);
            }
        },
        getLayer: function(t, e) {
            this._singleCanvas && !this._needsManuallyCompositing && (t = Eu);
            var n = this._layers[t];
            return n || ((n = new bu("zr_" + t, this, this.dpr)).zlevel = t, n.__builtin__ = !0, 
            this._layerConfig[t] && p(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), 
            n.initContext()), n;
        },
        insertLayer: function(t, e) {
            var n = this._layers, i = this._zlevelList, r = i.length, a = null, o = -1, s = this._domRoot;
            if (n[t]) tu("ZLevel " + t + " has been used already"); else if ((l = e) && (l.__builtin__ || "function" == typeof l.resize && "function" == typeof l.refresh)) {
                var l;
                if (0 < r && t > i[0]) {
                    for (o = 0; o < r - 1 && !(i[o] < t && i[o + 1] > t); o++) ;
                    a = n[i[o]];
                }
                if (i.splice(o + 1, 0, t), !(n[t] = e).virtual) if (a) {
                    var u = a.dom;
                    u.nextSibling ? s.insertBefore(e.dom, u.nextSibling) : s.appendChild(e.dom);
                } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);
            } else tu("Layer of zlevel " + t + " is not valid");
        },
        eachLayer: function(t, e) {
            var n, i, r = this._zlevelList;
            for (i = 0; i < r.length; i++) n = r[i], t.call(e, this._layers[n], n);
        },
        eachBuiltinLayer: function(t, e) {
            var n, i, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) i = a[r], (n = this._layers[i]).__builtin__ && t.call(e, n, i);
        },
        eachOtherLayer: function(t, e) {
            var n, i, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) i = a[r], (n = this._layers[i]).__builtin__ || t.call(e, n, i);
        },
        getLayers: function() {
            return this._layers;
        },
        _updateLayerStatus: function(t) {
            function e(t) {
                i && (i.__endIndex !== t && (i.__dirty = !0), i.__endIndex = t);
            }
            if (this.eachBuiltinLayer(function(t) {
                t.__dirty = t.__used = !1;
            }), this._singleCanvas) for (var n = 1; n < t.length; n++) {
                if ((o = t[n]).zlevel !== t[n - 1].zlevel || o.incremental) {
                    this._needsManuallyCompositing = !0;
                    break;
                }
            }
            var i = null, r = 0;
            for (n = 0; n < t.length; n++) {
                var a, o, s = (o = t[n]).zlevel;
                o.incremental ? ((a = this.getLayer(s + .001, this._needsManuallyCompositing)).incremental = !0, 
                r = 1) : a = this.getLayer(s + (0 < r ? .01 : 0), this._needsManuallyCompositing), 
                a.__builtin__ || tu("ZLevel " + s + " has been used by unkown layer " + a.id), a !== i && (a.__used = !0, 
                a.__startIndex !== n && (a.__dirty = !0), a.__startIndex = n, a.__drawIndex = a.incremental ? -1 : n, 
                e(n), i = a), o.__dirty && (a.__dirty = !0, a.incremental && a.__drawIndex < 0 && (a.__drawIndex = n));
            }
            e(n), this.eachBuiltinLayer(function(t) {
                !t.__used && 0 < t.getElementCount() && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), 
                t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);
            });
        },
        clear: function() {
            return this.eachBuiltinLayer(this._clearLayer), this;
        },
        _clearLayer: function(t) {
            t.clear();
        },
        setBackgroundColor: function(t) {
            this._backgroundColor = t;
        },
        configLayer: function(t, e) {
            if (e) {
                var n = this._layerConfig;
                n[t] ? p(n[t], e, !0) : n[t] = e;
                for (var i = 0; i < this._zlevelList.length; i++) {
                    var r = this._zlevelList[i];
                    if (r === t || r === t + .01) p(this._layers[r], n[t], !0);
                }
            }
        },
        delLayer: function(t) {
            var e = this._layers, n = this._zlevelList, i = e[t];
            i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(d(n, t), 1));
        },
        resize: function(e, n) {
            if (this._domRoot.style) {
                var t = this._domRoot;
                t.style.display = "none";
                var i = this._opts;
                if (null != e && (i.width = e), null != n && (i.height = n), e = this._getSize(0), 
                n = this._getSize(1), t.style.display = "", this._width != e || n != this._height) {
                    for (var r in t.style.width = e + "px", t.style.height = n + "px", this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(e, n);
                    R(this._progressiveLayers, function(t) {
                        t.resize(e, n);
                    }), this.refresh(!0);
                }
                this._width = e, this._height = n;
            } else {
                if (null == e || null == n) return;
                this._width = e, this._height = n, this.getLayer(Eu).resize(e, n);
            }
            return this;
        },
        clearLayer: function(t) {
            var e = this._layers[t];
            e && e.clear();
        },
        dispose: function() {
            this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
        },
        getRenderedCanvas: function(t) {
            if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[Eu].dom;
            var e = new bu("image", this, t.pixelRatio || this.dpr);
            if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
                this.refresh();
                var n = e.dom.width, i = e.dom.height, r = e.ctx;
                this.eachLayer(function(t) {
                    t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), 
                    t.renderToCanvas(e.ctx), e.ctx.restore());
                });
            } else for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
                var l = o[s];
                this._doPaintEl(l, e, !0, a);
            }
            return e.dom;
        },
        getWidth: function() {
            return this._width;
        },
        getHeight: function() {
            return this._height;
        },
        _getSize: function(t) {
            var e = this._opts, n = [ "width", "height" ][t], i = [ "clientWidth", "clientHeight" ][t], r = [ "paddingLeft", "paddingTop" ][t], a = [ "paddingRight", "paddingBottom" ][t];
            if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
            var o = this.root, s = document.defaultView.getComputedStyle(o);
            return (o[i] || Oe(s[n]) || Oe(o.style[n])) - (Oe(s[r]) || 0) - (Oe(s[a]) || 0) | 0;
        },
        pathToImage: function(t, e) {
            e = e || this.dpr;
            var n = document.createElement("canvas"), i = n.getContext("2d"), r = t.getBoundingRect(), a = t.style, o = a.shadowBlur * e, s = a.shadowOffsetX * e, l = a.shadowOffsetY * e, u = a.hasStroke() ? a.lineWidth : 0, h = Math.max(u / 2, -s + o), c = Math.max(u / 2, s + o), d = Math.max(u / 2, -l + o), f = Math.max(u / 2, l + o), p = r.width + h + c, g = r.height + d + f;
            n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
            var m = {
                position: t.position,
                rotation: t.rotation,
                scale: t.scale
            };
            t.position = [ h - r.x, d - r.y ], t.rotation = 0, t.scale = [ 1, 1 ], t.updateTransform(), 
            t && t.brush(i);
            var v = new Pe({
                style: {
                    x: 0,
                    y: 0,
                    image: n
                }
            });
            return null != m.position && (v.position = t.position = m.position), null != m.rotation && (v.rotation = t.rotation = m.rotation), 
            null != m.scale && (v.scale = t.scale = m.scale), v;
        }
    };
    var Fu = "undefined" != typeof window && !!window.addEventListener, Vu = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Gu = function(t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, 
        this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, 
        this._paused = !1, Cl.call(this);
    };
    Gu.prototype = {
        constructor: Gu,
        addClip: function(t) {
            this._clips.push(t);
        },
        addAnimator: function(t) {
            t.animation = this;
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n]);
        },
        removeClip: function(t) {
            var e = d(this._clips, t);
            0 <= e && this._clips.splice(e, 1);
        },
        removeAnimator: function(t) {
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.removeClip(e[n]);
            t.animation = null;
        },
        _update: function() {
            for (var t = new Date().getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; o < i; o++) {
                var s = n[o], l = s.step(t, e);
                l && (r.push(l), a.push(s));
            }
            for (o = 0; o < i; ) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;
            i = r.length;
            for (o = 0; o < i; o++) a[o].fire(r[o]);
            this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update();
        },
        _startLoop: function() {
            var e = this;
            this._running = !0, Su(function t() {
                e._running && (Su(t), !e._paused && e._update());
            });
        },
        start: function() {
            this._time = new Date().getTime(), this._pausedTime = 0, this._startLoop();
        },
        stop: function() {
            this._running = !1;
        },
        pause: function() {
            this._paused || (this._pauseStart = new Date().getTime(), this._paused = !0);
        },
        resume: function() {
            this._paused && (this._pausedTime += new Date().getTime() - this._pauseStart, this._paused = !1);
        },
        clear: function() {
            this._clips = [];
        },
        isFinished: function() {
            return !this._clips.length;
        },
        animate: function(t, e) {
            var n = new $l(t, (e = e || {}).loop, e.getter, e.setter);
            return this.addAnimator(n), n;
        }
    }, r(Gu, Cl);
    var Wu = function() {
        this._track = [];
    };
    Wu.prototype = {
        constructor: Wu,
        recognize: function(t, e, n) {
            return this._doTrack(t, e, n), this._recognize(t);
        },
        clear: function() {
            return this._track.length = 0, this;
        },
        _doTrack: function(t, e, n) {
            var i = t.touches;
            if (i) {
                for (var r = {
                    points: [],
                    touches: [],
                    target: e,
                    event: t
                }, a = 0, o = i.length; a < o; a++) {
                    var s = i[a], l = Ne(n, s, {});
                    r.points.push([ l.zrX, l.zrY ]), r.touches.push(s);
                }
                this._track.push(r);
            }
        },
        _recognize: function(t) {
            for (var e in Hu) if (Hu.hasOwnProperty(e)) {
                var n = Hu[e](this._track, t);
                if (n) return n;
            }
        }
    };
    var Hu = {
        pinch: function(t, e) {
            var n, i = t.length;
            if (i) {
                var r = (t[i - 1] || {}).points, a = (t[i - 2] || {}).points || r;
                if (a && 1 < a.length && r && 1 < r.length) {
                    var o = Re(r) / Re(a);
                    !isFinite(o) && (o = 1), e.pinchScale = o;
                    var s = [ ((n = r)[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2 ];
                    return e.pinchX = s[0], e.pinchY = s[1], {
                        type: "pinch",
                        target: t[0].target,
                        event: e
                    };
                }
            }
        }
    }, qu = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], ju = [ "touchstart", "touchend", "touchmove" ], Uu = {
        pointerdown: 1,
        pointerup: 1,
        pointermove: 1,
        pointerout: 1
    }, Xu = T(qu, function(t) {
        var e = t.replace("mouse", "pointer");
        return Uu[e] ? e : t;
    }), Yu = {
        mousemove: function(t) {
            t = ze(this.dom, t), this.trigger("mousemove", t);
        },
        mouseout: function(t) {
            var e = (t = ze(this.dom, t)).toElement || t.relatedTarget;
            if (e != this.dom) for (;e && 9 != e.nodeType; ) {
                if (e === this.dom) return;
                e = e.parentNode;
            }
            this.trigger("mouseout", t);
        },
        touchstart: function(t) {
            (t = ze(this.dom, t)).zrByTouch = !0, this._lastTouchMoment = new Date(), Fe(this, t, "start"), 
            Yu.mousemove.call(this, t), Yu.mousedown.call(this, t), Ve(this);
        },
        touchmove: function(t) {
            (t = ze(this.dom, t)).zrByTouch = !0, Fe(this, t, "change"), Yu.mousemove.call(this, t), 
            Ve(this);
        },
        touchend: function(t) {
            (t = ze(this.dom, t)).zrByTouch = !0, Fe(this, t, "end"), Yu.mouseup.call(this, t), 
            +new Date() - this._lastTouchMoment < 300 && Yu.click.call(this, t), Ve(this);
        },
        pointerdown: function(t) {
            Yu.mousedown.call(this, t);
        },
        pointermove: function(t) {
            Ge(t) || Yu.mousemove.call(this, t);
        },
        pointerup: function(t) {
            Yu.mouseup.call(this, t);
        },
        pointerout: function(t) {
            Ge(t) || Yu.mouseout.call(this, t);
        }
    };
    R([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(e) {
        Yu[e] = function(t) {
            t = ze(this.dom, t), this.trigger(e, t);
        };
    });
    var Zu = We.prototype;
    Zu.dispose = function() {
        for (var t = qu.concat(ju), e = 0; e < t.length; e++) {
            var n = t[e];
            i = this.dom, r = Be(n), a = this._handlers[n], Fu ? i.removeEventListener(r, a) : i.detachEvent("on" + r, a);
        }
        var i, r, a;
    }, Zu.setCursor = function(t) {
        this.dom.style && (this.dom.style.cursor = t || "default");
    }, r(We, Cl);
    var $u = !al.canvasSupported, Ku = {
        canvas: Bu
    }, Qu = {}, Ju = function(t, e, n) {
        n = n || {}, this.dom = e, this.id = t;
        var i = this, r = new fu(), a = n.renderer;
        if ($u) {
            if (!Ku.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
            a = "vml";
        } else a && Ku[a] || (a = "canvas");
        var o = new Ku[a](e, r, n, t);
        this.storage = r, this.painter = o;
        var s = al.node || al.worker ? null : new We(o.getViewportRoot());
        this.handler = new Al(r, o, s, o.root), this.animation = new Gu({
            stage: {
                update: v(this.flush, this)
            }
        }), this.animation.start(), this._needsRefresh;
        var l = r.delFromStorage, u = r.addToStorage;
        r.delFromStorage = function(t) {
            l.call(r, t), t && t.removeSelfFromZr(i);
        }, r.addToStorage = function(t) {
            u.call(r, t), t.addSelfToZr(i);
        };
    };
    Ju.prototype = {
        constructor: Ju,
        getId: function() {
            return this.id;
        },
        add: function(t) {
            this.storage.addRoot(t), this._needsRefresh = !0;
        },
        remove: function(t) {
            this.storage.delRoot(t), this._needsRefresh = !0;
        },
        configLayer: function(t, e) {
            this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0;
        },
        setBackgroundColor: function(t) {
            this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0;
        },
        refreshImmediately: function() {
            this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1;
        },
        refresh: function() {
            this._needsRefresh = !0;
        },
        flush: function() {
            var t;
            this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, 
            this.refreshHoverImmediately()), t && this.trigger("rendered");
        },
        addHover: function(t, e) {
            this.painter.addHover && (this.painter.addHover(t, e), this.refreshHover());
        },
        removeHover: function(t) {
            this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover());
        },
        clearHover: function() {
            this.painter.clearHover && (this.painter.clearHover(), this.refreshHover());
        },
        refreshHover: function() {
            this._needsRefreshHover = !0;
        },
        refreshHoverImmediately: function() {
            this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover();
        },
        resize: function(t) {
            t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize();
        },
        clearAnimation: function() {
            this.animation.clear();
        },
        getWidth: function() {
            return this.painter.getWidth();
        },
        getHeight: function() {
            return this.painter.getHeight();
        },
        pathToImage: function(t, e) {
            return this.painter.pathToImage(t, e);
        },
        setCursorStyle: function(t) {
            this.handler.setCursorStyle(t);
        },
        findHover: function(t, e) {
            return this.handler.findHover(t, e);
        },
        on: function(t, e, n) {
            this.handler.on(t, e, n);
        },
        off: function(t, e) {
            this.handler.off(t, e);
        },
        trigger: function(t, e) {
            this.handler.trigger(t, e);
        },
        clear: function() {
            this.storage.delRoot(), this.painter.clear();
        },
        dispose: function() {
            var t;
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), 
            this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, 
            t = this.id, delete Qu[t];
        }
    };
    var th = (Object.freeze || Object)({
        version: "4.0.4",
        init: He,
        dispose: function(t) {
            if (t) t.dispose(); else {
                for (var e in Qu) Qu.hasOwnProperty(e) && Qu[e].dispose();
                Qu = {};
            }
            return this;
        },
        getInstance: function(t) {
            return Qu[t];
        },
        registerPainter: function(t, e) {
            Ku[t] = e;
        }
    }), eh = R, nh = M, ih = A, rh = "series\0", ah = [ "fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding" ], oh = 0, sh = ".", lh = "___EC__COMPONENT__CONTAINER___", uh = 0, hh = function(s) {
        for (var t = 0; t < s.length; t++) s[t][1] || (s[t][1] = s[t][0]);
        return function(t, e, n) {
            for (var i = {}, r = 0; r < s.length; r++) {
                var a = s[r][1];
                if (!(e && 0 <= d(e, a) || n && d(n, a) < 0)) {
                    var o = t.getShallow(a);
                    null != o && (i[s[r][0]] = o);
                }
            }
            return i;
        };
    }, ch = hh([ [ "lineWidth", "width" ], [ "stroke", "color" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ] ]), dh = {
        getLineStyle: function(t) {
            var e = ch(this, t), n = this.getLineDash(e.lineWidth);
            return n && (e.lineDash = n), e;
        },
        getLineDash: function(t) {
            null == t && (t = 1);
            var e = this.get("type"), n = Math.max(t, 2), i = 4 * t;
            return "solid" === e || null == e ? null : "dashed" === e ? [ i, i ] : [ n, n ];
        }
    }, fh = hh([ [ "fill", "color" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "opacity" ], [ "shadowColor" ] ]), ph = {
        getAreaStyle: function(t, e) {
            return fh(this, t, e);
        }
    }, gh = Math.pow, mh = Math.sqrt, vh = 1e-8, yh = 1e-4, _h = mh(3), xh = 1 / 3, wh = n(), bh = n(), Sh = n(), Mh = Math.min, Ih = Math.max, Dh = Math.sin, Ch = Math.cos, Th = 2 * Math.PI, kh = n(), Ah = n(), Lh = n(), Ph = [], Oh = [], Nh = {
        M: 1,
        L: 2,
        C: 3,
        Q: 4,
        A: 5,
        Z: 6,
        R: 7
    }, Eh = [], zh = [], Rh = [], Bh = [], Fh = Math.min, Vh = Math.max, Gh = Math.cos, Wh = Math.sin, Hh = Math.sqrt, qh = Math.abs, jh = "undefined" != typeof Float32Array, Uh = function(t) {
        this._saveData = !t, this._saveData && (this.data = []), this._ctx = null;
    };
    Uh.prototype = {
        constructor: Uh,
        _xi: 0,
        _yi: 0,
        _x0: 0,
        _y0: 0,
        _ux: 0,
        _uy: 0,
        _len: 0,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function(t, e) {
            this._ux = qh(1 / Ql / t) || 0, this._uy = qh(1 / Ql / e) || 0;
        },
        getContext: function() {
            return this._ctx;
        },
        beginPath: function(t) {
            return (this._ctx = t) && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), 
            this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
        },
        moveTo: function(t, e) {
            return this.addData(Nh.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, 
            this._y0 = e, this._xi = t, this._yi = e, this;
        },
        lineTo: function(t, e) {
            var n = qh(t - this._xi) > this._ux || qh(e - this._yi) > this._uy || this._len < 5;
            return this.addData(Nh.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), 
            n && (this._xi = t, this._yi = e), this;
        },
        bezierCurveTo: function(t, e, n, i, r, a) {
            return this.addData(Nh.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), 
            this._xi = r, this._yi = a, this;
        },
        quadraticCurveTo: function(t, e, n, i) {
            return this.addData(Nh.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), 
            this._xi = n, this._yi = i, this;
        },
        arc: function(t, e, n, i, r, a) {
            return this.addData(Nh.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), 
            this._xi = Gh(r) * n + t, this._yi = Wh(r) * n + t, this;
        },
        arcTo: function(t, e, n, i, r) {
            return this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
        },
        rect: function(t, e, n, i) {
            return this._ctx && this._ctx.rect(t, e, n, i), this.addData(Nh.R, t, e, n, i), 
            this;
        },
        closePath: function() {
            this.addData(Nh.Z);
            var t = this._ctx, e = this._x0, n = this._y0;
            return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, 
            this._yi = n, this;
        },
        fill: function(t) {
            t && t.fill(), this.toStatic();
        },
        stroke: function(t) {
            t && t.stroke(), this.toStatic();
        },
        setLineDash: function(t) {
            if (t instanceof Array) {
                this._lineDash = t;
                for (var e = this._dashIdx = 0, n = 0; n < t.length; n++) e += t[n];
                this._dashSum = e;
            }
            return this;
        },
        setLineDashOffset: function(t) {
            return this._dashOffset = t, this;
        },
        len: function() {
            return this._len;
        },
        setData: function(t) {
            var e = t.length;
            this.data && this.data.length == e || !jh || (this.data = new Float32Array(e));
            for (var n = 0; n < e; n++) this.data[n] = t[n];
            this._len = e;
        },
        appendPath: function(t) {
            t instanceof Array || (t = [ t ]);
            for (var e = t.length, n = 0, i = this._len, r = 0; r < e; r++) n += t[r].len();
            jh && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
            for (r = 0; r < e; r++) for (var a = t[r].data, o = 0; o < a.length; o++) this.data[i++] = a[o];
            this._len = i;
        },
        addData: function(t) {
            if (this._saveData) {
                var e = this.data;
                this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                for (var n = 0; n < arguments.length; n++) e[this._len++] = arguments[n];
                this._prevCmd = t;
            }
        },
        _expandData: function() {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                this.data = t;
            }
        },
        _needsDash: function() {
            return this._lineDash;
        },
        _dashedLineTo: function(t, e) {
            var n, i, r = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, l = this._xi, u = this._yi, h = t - l, c = e - u, d = Hh(h * h + c * c), f = l, p = u, g = o.length;
            for (a < 0 && (a = r + a), f -= (a %= r) * (h /= d), p -= a * (c /= d); 0 < h && f <= t || h < 0 && t <= f || 0 == h && (0 < c && p <= e || c < 0 && e <= p); ) f += h * (n = o[i = this._dashIdx]), 
            p += c * n, this._dashIdx = (i + 1) % g, 0 < h && f < l || h < 0 && l < f || 0 < c && p < u || c < 0 && u < p || s[i % 2 ? "moveTo" : "lineTo"](0 <= h ? Fh(f, t) : Vh(f, t), 0 <= c ? Fh(p, e) : Vh(p, e));
            h = f - t, c = p - e, this._dashOffset = -Hh(h * h + c * c);
        },
        _dashedBezierTo: function(t, e, n, i, r, a) {
            var o, s, l, u, h, c = this._dashSum, d = this._dashOffset, f = this._lineDash, p = this._ctx, g = this._xi, m = this._yi, v = hn, y = 0, _ = this._dashIdx, x = f.length, w = 0;
            for (d < 0 && (d = c + d), d %= c, o = 0; o < 1; o += .1) s = v(g, t, n, r, o + .1) - v(g, t, n, r, o), 
            l = v(m, e, i, a, o + .1) - v(m, e, i, a, o), y += Hh(s * s + l * l);
            for (;_ < x && !(d < (w += f[_])); _++) ;
            for (o = (w - d) / y; o <= 1; ) u = v(g, t, n, r, o), h = v(m, e, i, a, o), _ % 2 ? p.moveTo(u, h) : p.lineTo(u, h), 
            o += f[_] / y, _ = (_ + 1) % x;
            _ % 2 != 0 && p.lineTo(r, a), s = r - u, l = a - h, this._dashOffset = -Hh(s * s + l * l);
        },
        _dashedQuadraticTo: function(t, e, n, i) {
            var r = n, a = i;
            n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, 
            this._dashedBezierTo(t, e, n, i, r, a);
        },
        toStatic: function() {
            var t = this.data;
            t instanceof Array && (t.length = this._len, jh && (this.data = new Float32Array(t)));
        },
        getBoundingRect: function() {
            Eh[0] = Eh[1] = Rh[0] = Rh[1] = Number.MAX_VALUE, zh[0] = zh[1] = Bh[0] = Bh[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, n = 0, i = 0, r = 0, a = 0; a < t.length; ) {
                var o = t[a++];
                switch (1 == a && (i = e = t[a], r = n = t[a + 1]), o) {
                  case Nh.M:
                    e = i = t[a++], n = r = t[a++], Rh[0] = i, Rh[1] = r, Bh[0] = i, Bh[1] = r;
                    break;

                  case Nh.L:
                    _n(e, n, t[a], t[a + 1], Rh, Bh), e = t[a++], n = t[a++];
                    break;

                  case Nh.C:
                    xn(e, n, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], Rh, Bh), e = t[a++], n = t[a++];
                    break;

                  case Nh.Q:
                    p = e, g = n, m = t[a++], v = t[a++], y = t[a], _ = t[a + 1], x = Rh, w = Bh, S = b = void 0, 
                    S = pn, M = Ih(Mh((b = mn)(p, m, y), 1), 0), I = Ih(Mh(b(g, v, _), 1), 0), D = S(p, m, y, M), 
                    C = S(g, v, _, I), x[0] = Mh(p, y, D), x[1] = Mh(g, _, C), w[0] = Ih(p, y, D), w[1] = Ih(g, _, C), 
                    e = t[a++], n = t[a++];
                    break;

                  case Nh.A:
                    var s = t[a++], l = t[a++], u = t[a++], h = t[a++], c = t[a++], d = t[a++] + c, f = (t[a++], 
                    1 - t[a++]);
                    1 == a && (i = Gh(c) * u + s, r = Wh(c) * h + l), wn(s, l, u, h, c, d, f, Rh, Bh), 
                    e = Gh(d) * u + s, n = Wh(d) * h + l;
                    break;

                  case Nh.R:
                    _n(i = e = t[a++], r = n = t[a++], i + t[a++], r + t[a++], Rh, Bh);
                    break;

                  case Nh.Z:
                    e = i, n = r;
                }
                K(Eh, Eh, Rh), Q(zh, zh, Bh);
            }
            var p, g, m, v, y, _, x, w, b, S, M, I, D, C;
            return 0 === a && (Eh[0] = Eh[1] = zh[0] = zh[1] = 0), new Gt(Eh[0], Eh[1], zh[0] - Eh[0], zh[1] - Eh[1]);
        },
        rebuildPath: function(t) {
            for (var e, n, i, r, a, o, s = this.data, l = this._ux, u = this._uy, h = this._len, c = 0; c < h; ) {
                var d = s[c++];
                switch (1 == c && (e = i = s[c], n = r = s[c + 1]), d) {
                  case Nh.M:
                    e = i = s[c++], n = r = s[c++], t.moveTo(i, r);
                    break;

                  case Nh.L:
                    a = s[c++], o = s[c++], (qh(a - i) > l || qh(o - r) > u || c === h - 1) && (t.lineTo(a, o), 
                    i = a, r = o);
                    break;

                  case Nh.C:
                    t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                    break;

                  case Nh.Q:
                    t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                    break;

                  case Nh.A:
                    var f = s[c++], p = s[c++], g = s[c++], m = s[c++], v = s[c++], y = s[c++], _ = s[c++], x = s[c++], w = m < g ? g : m, b = m < g ? 1 : g / m, S = m < g ? m / g : 1, M = v + y;
                    .001 < Math.abs(g - m) ? (t.translate(f, p), t.rotate(_), t.scale(b, S), t.arc(0, 0, w, v, M, 1 - x), 
                    t.scale(1 / b, 1 / S), t.rotate(-_), t.translate(-f, -p)) : t.arc(f, p, w, v, M, 1 - x), 
                    1 == c && (e = Gh(v) * g + f, n = Wh(v) * m + p), i = Gh(M) * g + f, r = Wh(M) * m + p;
                    break;

                  case Nh.R:
                    e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
                    break;

                  case Nh.Z:
                    t.closePath(), i = e, r = n;
                }
            }
        }
    }, Uh.CMD = Nh;
    var Xh = 2 * Math.PI, Yh = 2 * Math.PI, Zh = Uh.CMD, $h = 2 * Math.PI, Kh = 1e-4, Qh = [ -1, -1, -1 ], Jh = [ -1, -1 ], tc = wu.prototype.getCanvasPattern, ec = Math.abs, nc = new Uh(!0);
    Pn.prototype = {
        constructor: Pn,
        type: "path",
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        brush: function(t, e) {
            var n, i = this.style, r = this.path || nc, a = i.hasStroke(), o = i.hasFill(), s = i.fill, l = i.stroke, u = o && !!s.colorStops, h = a && !!l.colorStops, c = o && !!s.image, d = a && !!l.image;
            (i.bind(t, this, e), this.setTransform(t), this.__dirty) && (u && (n = n || this.getBoundingRect(), 
            this._fillGradient = i.getGradient(t, s, n)), h && (n = n || this.getBoundingRect(), 
            this._strokeGradient = i.getGradient(t, l, n)));
            u ? t.fillStyle = this._fillGradient : c && (t.fillStyle = tc.call(s, t)), h ? t.strokeStyle = this._strokeGradient : d && (t.strokeStyle = tc.call(l, t));
            var f = i.lineDash, p = i.lineDashOffset, g = !!t.setLineDash, m = this.getGlobalScale();
            r.setScale(m[0], m[1]), this.__dirtyPath || f && !g && a ? (r.beginPath(t), f && !g && (r.setLineDash(f), 
            r.setLineDashOffset(p)), this.buildPath(r, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), 
            this.path.rebuildPath(t)), o && r.fill(t), f && g && (t.setLineDash(f), t.lineDashOffset = p), 
            a && r.stroke(t), f && g && t.setLineDash([]), null != i.text && (this.restoreTransform(t), 
            this.drawRectText(t, this.getBoundingRect()));
        },
        buildPath: function() {},
        createPathProxy: function() {
            this.path = new Uh();
        },
        getBoundingRect: function() {
            var t = this._rect, e = this.style, n = !t;
            if (n) {
                var i = this.path;
                i || (i = this.path = new Uh()), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), 
                t = i.getBoundingRect();
            }
            if (this._rect = t, e.hasStroke()) {
                var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
                if (this.__dirty || n) {
                    r.copy(t);
                    var a = e.lineWidth, o = e.strokeNoScale ? this.getLineScale() : 1;
                    e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), 1e-10 < o && (r.width += a / o, 
                    r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2);
                }
                return r;
            }
            return t;
        },
        contain: function(t, e) {
            var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect(), r = this.style;
            if (t = n[0], e = n[1], i.contain(t, e)) {
                var a = this.path.data;
                if (r.hasStroke()) {
                    var o = r.lineWidth, s = r.strokeNoScale ? this.getLineScale() : 1;
                    if (1e-10 < s && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), 
                    Ln(a, o / s, !0, t, e))) return !0;
                }
                if (r.hasFill()) return Ln(a, 0, !1, t, e);
            }
            return !1;
        },
        dirty: function(t) {
            null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = !0, 
            this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty();
        },
        animateShape: function(t) {
            return this.animate("shape", t);
        },
        attrKV: function(t, e) {
            "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : Le.prototype.attrKV.call(this, t, e);
        },
        setShape: function(t, e) {
            var n = this.shape;
            if (n) {
                if (M(t)) for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]); else n[t] = e;
                this.dirty(!0);
            }
            return this;
        },
        getLineScale: function() {
            var t = this.transform;
            return t && 1e-10 < ec(t[0] - 1) && 1e-10 < ec(t[3] - 1) ? Math.sqrt(ec(t[0] * t[3] - t[2] * t[1])) : 1;
        }
    }, Pn.extend = function(r) {
        var t = function(t) {
            Pn.call(this, t), r.style && this.style.extendFrom(r.style, !1);
            var e = r.shape;
            if (e) {
                this.shape = this.shape || {};
                var n = this.shape;
                for (var i in e) !n.hasOwnProperty(i) && e.hasOwnProperty(i) && (n[i] = e[i]);
            }
            r.init && r.init.call(this, t);
        };
        for (var e in a(t, Pn), r) "style" !== e && "shape" !== e && (t.prototype[e] = r[e]);
        return t;
    }, a(Pn, Le);
    var ic = Uh.CMD, rc = [ [], [], [] ], ac = Math.sqrt, oc = Math.atan2, sc = function(t, e) {
        var n, i, r, a, o, s = t.data, l = ic.M, u = ic.C, h = ic.L, c = ic.R, d = ic.A, f = ic.Q;
        for (a = r = 0; r < s.length; ) {
            switch (n = s[r++], a = r, i = 0, n) {
              case l:
              case h:
                i = 1;
                break;

              case u:
                i = 3;
                break;

              case f:
                i = 2;
                break;

              case d:
                var p = e[4], g = e[5], m = ac(e[0] * e[0] + e[1] * e[1]), v = ac(e[2] * e[2] + e[3] * e[3]), y = oc(-e[1] / v, e[0] / m);
                s[r] *= m, s[r++] += p, s[r] *= v, s[r++] += g, s[r++] *= m, s[r++] *= v, s[r++] += y, 
                s[r++] += y, a = r += 2;
                break;

              case c:
                _[0] = s[r++], _[1] = s[r++], $(_, _, e), s[a++] = _[0], s[a++] = _[1], _[0] += s[r++], 
                _[1] += s[r++], $(_, _, e), s[a++] = _[0], s[a++] = _[1];
            }
            for (o = 0; o < i; o++) {
                var _;
                (_ = rc[o])[0] = s[r++], _[1] = s[r++], $(_, _, e), s[a++] = _[0], s[a++] = _[1];
            }
        }
    }, lc = [ "m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A" ], uc = Math.sqrt, hc = Math.sin, cc = Math.cos, dc = Math.PI, fc = function(t) {
        return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }, pc = function(t, e) {
        return (t[0] * e[0] + t[1] * e[1]) / (fc(t) * fc(e));
    }, gc = function(t, e) {
        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(pc(t, e));
    }, mc = function(t) {
        Le.call(this, t);
    };
    mc.prototype = {
        constructor: mc,
        type: "text",
        brush: function(t, e) {
            var n = this.style;
            this.__dirty && me(n), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
            var i = n.text;
            null != i && (i += ""), n.bind(t, this, e), Ae(i, n) && (this.setTransform(t), ye(this, t, i, n), 
            this.restoreTransform(t));
        },
        getBoundingRect: function() {
            var t = this.style;
            if (this.__dirty && me(t), !this._rect) {
                var e = t.text;
                null != e ? e += "" : e = "";
                var n = re(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.rich);
                if (n.x += t.x || 0, n.y += t.y || 0, De(t.textStroke, t.textStrokeWidth)) {
                    var i = t.textStrokeWidth;
                    n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i;
                }
                this._rect = n;
            }
            return this._rect;
        }
    }, a(mc, Le);
    var vc = Pn.extend({
        type: "circle",
        shape: {
            cx: 0,
            cy: 0,
            r: 0
        },
        buildPath: function(t, e, n) {
            n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
        }
    }), yc = [ [ "shadowBlur", 0 ], [ "shadowColor", "#000" ], [ "shadowOffsetX", 0 ], [ "shadowOffsetY", 0 ] ], _c = function(l) {
        return al.browser.ie && 11 <= al.browser.version ? function() {
            var t, e = this.__clipPaths, n = this.style;
            if (e) for (var i = 0; i < e.length; i++) {
                var r = e[i], a = r && r.shape, o = r && r.type;
                if (a && ("sector" === o && a.startAngle === a.endAngle || "rect" === o && (!a.width || !a.height))) {
                    for (var s = 0; s < yc.length; s++) yc[s][2] = n[yc[s][0]], n[yc[s][0]] = yc[s][1];
                    t = !0;
                    break;
                }
            }
            if (l.apply(this, arguments), t) for (s = 0; s < yc.length; s++) n[yc[s][0]] = yc[s][2];
        } : l;
    }, xc = Pn.extend({
        type: "sector",
        shape: {
            cx: 0,
            cy: 0,
            r0: 0,
            r: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: !0
        },
        brush: _c(Pn.prototype.brush),
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle, l = e.clockwise, u = Math.cos(o), h = Math.sin(o);
            t.moveTo(u * r + n, h * r + i), t.lineTo(u * a + n, h * a + i), t.arc(n, i, a, o, s, !l), 
            t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), 
            t.closePath();
        }
    }), wc = Pn.extend({
        type: "ring",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            r0: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = 2 * Math.PI;
            t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0);
        }
    }), bc = Pn.extend({
        type: "polygon",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        buildPath: function(t, e) {
            zn(t, e, !0);
        }
    }), Sc = Pn.extend({
        type: "polyline",
        shape: {
            points: null,
            smooth: !1,
            smoothConstraint: null
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            zn(t, e, !1);
        }
    }), Mc = Pn.extend({
        type: "rect",
        shape: {
            r: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.x, i = e.y, r = e.width, a = e.height;
            e.r ? ge(t, e) : t.rect(n, i, r, a), t.closePath();
        }
    }), Ic = Pn.extend({
        type: "line",
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            percent: 1
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            var n = e.x1, i = e.y1, r = e.x2, a = e.y2, o = e.percent;
            0 !== o && (t.moveTo(n, i), o < 1 && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), 
            t.lineTo(r, a));
        },
        pointAt: function(t) {
            var e = this.shape;
            return [ e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t ];
        }
    }), Dc = [], Cc = Pn.extend({
        type: "bezier-curve",
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            cpx1: 0,
            cpy1: 0,
            percent: 1
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            var n = e.x1, i = e.y1, r = e.x2, a = e.y2, o = e.cpx1, s = e.cpy1, l = e.cpx2, u = e.cpy2, h = e.percent;
            0 !== h && (t.moveTo(n, i), null == l || null == u ? (h < 1 && (vn(n, o, r, h, Dc), 
            o = Dc[1], r = Dc[2], vn(i, s, a, h, Dc), s = Dc[1], a = Dc[2]), t.quadraticCurveTo(o, s, r, a)) : (h < 1 && (fn(n, o, l, r, h, Dc), 
            o = Dc[1], l = Dc[2], r = Dc[3], fn(i, s, u, a, h, Dc), s = Dc[1], u = Dc[2], a = Dc[3]), 
            t.bezierCurveTo(o, s, l, u, r, a)));
        },
        pointAt: function(t) {
            return Rn(this.shape, t, !1);
        },
        tangentAt: function(t) {
            var e = Rn(this.shape, t, !0);
            return X(e, e);
        }
    }), Tc = Pn.extend({
        type: "arc",
        shape: {
            cx: 0,
            cy: 0,
            r: 0,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            clockwise: !0
        },
        style: {
            stroke: "#000",
            fill: null
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise, l = Math.cos(a), u = Math.sin(a);
            t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, a, o, !s);
        }
    }), kc = Pn.extend({
        type: "compound",
        shape: {
            paths: null
        },
        _updatePathDirty: function() {
            for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) t = t || e[n].__dirtyPath;
            this.__dirtyPath = t, this.__dirty = this.__dirty || t;
        },
        beforeBrush: function() {
            this._updatePathDirty();
            for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), 
            t[n].path.setScale(e[0], e[1]);
        },
        buildPath: function(t, e) {
            for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0);
        },
        afterBrush: function() {
            for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1;
        },
        getBoundingRect: function() {
            return this._updatePathDirty(), Pn.prototype.getBoundingRect.call(this);
        }
    }), Ac = function(t) {
        this.colorStops = t || [];
    };
    Ac.prototype = {
        constructor: Ac,
        addColorStop: function(t, e) {
            this.colorStops.push({
                offset: t,
                color: e
            });
        }
    };
    var Lc = function(t, e, n, i, r, a) {
        this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, 
        this.y2 = null == i ? 0 : i, this.type = "linear", this.global = a || !1, Ac.call(this, r);
    };
    Lc.prototype = {
        constructor: Lc
    }, a(Lc, Ac);
    var Pc = function(t, e, n, i, r) {
        this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, 
        this.type = "radial", this.global = r || !1, Ac.call(this, i);
    };
    Pc.prototype = {
        constructor: Pc
    }, a(Pc, Ac), Bn.prototype.incremental = !0, Bn.prototype.clearDisplaybles = function() {
        this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), 
        this.notClear = !1;
    }, Bn.prototype.addDisplayable = function(t, e) {
        e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty();
    }, Bn.prototype.addDisplayables = function(t, e) {
        e = e || !1;
        for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e);
    }, Bn.prototype.eachPendingDisplayable = function(t) {
        for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
        for (e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e]);
    }, Bn.prototype.update = function() {
        this.updateTransform();
        for (var t = this._cursor; t < this._displayables.length; t++) {
            (e = this._displayables[t]).parent = this, e.update(), e.parent = null;
        }
        for (t = 0; t < this._temporaryDisplayables.length; t++) {
            var e;
            (e = this._temporaryDisplayables[t]).parent = this, e.update(), e.parent = null;
        }
    }, Bn.prototype.brush = function(t) {
        for (var e = this._cursor; e < this._displayables.length; e++) {
            (n = this._displayables[e]).beforeBrush && n.beforeBrush(t), n.brush(t, e === this._cursor ? null : this._displayables[e - 1]), 
            n.afterBrush && n.afterBrush(t);
        }
        this._cursor = e;
        for (e = 0; e < this._temporaryDisplayables.length; e++) {
            var n;
            (n = this._temporaryDisplayables[e]).beforeBrush && n.beforeBrush(t), n.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), 
            n.afterBrush && n.afterBrush(t);
        }
        this._temporaryDisplayables = [], this.notClear = !0;
    };
    var Oc = [];
    Bn.prototype.getBoundingRect = function() {
        if (!this._rect) {
            for (var t = new Gt(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                var n = this._displayables[e], i = n.getBoundingRect().clone();
                n.needLocalTransform() && i.applyTransform(n.getLocalTransform(Oc)), t.union(i);
            }
            this._rect = t;
        }
        return this._rect;
    }, Bn.prototype.contain = function(t, e) {
        var n = this.transformCoordToLocal(t, e);
        if (this.getBoundingRect().contain(n[0], n[1])) for (var i = 0; i < this._displayables.length; i++) {
            if (this._displayables[i].contain(t, e)) return !0;
        }
        return !1;
    }, a(Bn, Le);
    var Nc = Math.round, Ec = Math.max, zc = Math.min, Rc = {}, Bc = function(t, e) {
        for (var n = [], i = t.length, r = 0; r < i; r++) {
            var a = t[r];
            a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), 
            n.push(a.path);
        }
        var o = new Pn(e);
        return o.createPathProxy(), o.buildPath = function(t) {
            t.appendPath(n);
            var e = t.getContext();
            e && t.rebuildPath(e);
        }, o;
    }, Fc = (Object.freeze || Object)({
        extendShape: Fn,
        extendPath: function(t, e) {
            return Pn.extend(Nn(t, e));
        },
        makePath: Vn,
        makeImage: Gn,
        mergePath: Bc,
        resizePath: Hn,
        subPixelOptimizeLine: qn,
        subPixelOptimizeRect: jn,
        subPixelOptimize: Un,
        setHoverStyle: ai,
        setLabelStyle: oi,
        setTextStyle: si,
        setText: function(t, e, n) {
            var i, r = {
                isRectText: !0
            };
            !1 === n ? i = !0 : r.autoColor = n, li(t, e, r, i), t.host && t.host.dirty && t.host.dirty(!1);
        },
        getFont: di,
        updateProps: pi,
        initProps: gi,
        getTransform: function(t, e) {
            for (var n = rt([]); t && t !== e; ) ot(n, t.getLocalTransform(), n), t = t.parent;
            return n;
        },
        applyTransform: mi,
        transformDirection: function(t, e, n) {
            var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]), r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]), a = [ "left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0 ];
            return a = mi(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? 0 < a[0] ? "right" : "left" : 0 < a[1] ? "bottom" : "top";
        },
        groupTransition: vi,
        clipPointsByRect: function(t, i) {
            return T(t, function(t) {
                var e = t[0];
                e = Ec(e, i.x), e = zc(e, i.x + i.width);
                var n = t[1];
                return n = Ec(n, i.y), [ e, n = zc(n, i.y + i.height) ];
            });
        },
        clipRectByRect: function(t, e) {
            var n = Ec(t.x, e.x), i = zc(t.x + t.width, e.x + e.width), r = Ec(t.y, e.y), a = zc(t.y + t.height, e.y + e.height);
            return n <= i && r <= a ? {
                x: n,
                y: r,
                width: i - n,
                height: a - r
            } : void 0;
        },
        createIcon: yi,
        Group: hu,
        Image: Pe,
        Text: mc,
        Circle: vc,
        Sector: xc,
        Ring: wc,
        Polygon: bc,
        Polyline: Sc,
        Rect: Mc,
        Line: Ic,
        BezierCurve: Cc,
        Arc: Tc,
        IncrementalDisplayable: Bn,
        CompoundPath: kc,
        LinearGradient: Lc,
        RadialGradient: Pc,
        BoundingRect: Gt
    }), Vc = [ "textStyle", "color" ], Gc = {
        getTextColor: function(t) {
            var e = this.ecModel;
            return this.getShallow("color") || (!t && e ? e.get(Vc) : null);
        },
        getFont: function() {
            return di({
                fontStyle: this.getShallow("fontStyle"),
                fontWeight: this.getShallow("fontWeight"),
                fontSize: this.getShallow("fontSize"),
                fontFamily: this.getShallow("fontFamily")
            }, this.ecModel);
        },
        getTextRect: function(t) {
            return re(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("rich"), this.getShallow("truncateText"));
        }
    }, Wc = hh([ [ "fill", "color" ], [ "stroke", "borderColor" ], [ "lineWidth", "borderWidth" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ], [ "textPosition" ], [ "textAlign" ] ]), Hc = {
        getItemStyle: function(t, e) {
            var n = Wc(this, t, e), i = this.getBorderLineDash();
            return i && (n.lineDash = i), n;
        },
        getBorderLineDash: function() {
            var t = this.get("borderType");
            return "solid" === t || null == t ? null : "dashed" === t ? [ 5, 5 ] : [ 1, 1 ];
        }
    }, qc = r, jc = Ke();
    _i.prototype = {
        constructor: _i,
        init: null,
        mergeOption: function(t) {
            p(this.option, t, !0);
        },
        get: function(t, e) {
            return null == t ? this.option : xi(this.option, this.parsePath(t), !e && wi(this, t));
        },
        getShallow: function(t, e) {
            var n = this.option, i = null == n ? n : n[t], r = !e && wi(this, t);
            return null == i && r && (i = r.getShallow(t)), i;
        },
        getModel: function(t, e) {
            var n;
            return new _i(null == t ? this.option : xi(this.option, t = this.parsePath(t)), e = e || (n = wi(this, t)) && n.getModel(t), this.ecModel);
        },
        isEmpty: function() {
            return null == this.option;
        },
        restoreData: function() {},
        clone: function() {
            return new this.constructor(b(this.option));
        },
        setReadOnly: function() {},
        parsePath: function(t) {
            return "string" == typeof t && (t = t.split(".")), t;
        },
        customizeGetParent: function(t) {
            jc(this).getParent = t;
        },
        isAnimationEnabled: function() {
            if (!al.node) {
                if (null != this.option.animation) return !!this.option.animation;
                if (this.parentModel) return this.parentModel.isAnimationEnabled();
            }
        }
    }, nn(_i), rn(_i), qc(_i, dh), qc(_i, ph), qc(_i, Gc), qc(_i, Hc);
    var Uc, Xc, Yc = 0, Zc = 1e-4, $c = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/, Kc = (Object.freeze || Object)({
        linearMap: Si,
        parsePercent: Mi,
        round: Ii,
        asc: function(t) {
            return t.sort(function(t, e) {
                return t - e;
            }), t;
        },
        getPrecision: Di,
        getPrecisionSafe: Ci,
        getPixelPrecision: Ti,
        getPercentWithPrecision: ki,
        MAX_SAFE_INTEGER: 9007199254740991,
        remRadian: Ai,
        isRadianAroundZero: Li,
        parseDate: Pi,
        quantity: Oi,
        nice: Ei,
        quantile: function(t, e) {
            var n = (t.length - 1) * e + 1, i = Math.floor(n), r = +t[i - 1], a = n - i;
            return a ? r + a * (t[i] - r) : r;
        },
        reformIntervals: function(t) {
            t.sort(function(t, e) {
                return function t(e, n, i) {
                    return e.interval[i] < n.interval[i] || e.interval[i] === n.interval[i] && (e.close[i] - n.close[i] == (i ? -1 : 1) || !i && t(e, n, 1));
                }(t, e, 0) ? -1 : 1;
            });
            for (var e = -1 / 0, n = 1, i = 0; i < t.length; ) {
                for (var r = t[i].interval, a = t[i].close, o = 0; o < 2; o++) r[o] <= e && (r[o] = e, 
                a[o] = o ? 1 : 1 - n), e = r[o], n = a[o];
                r[0] === r[1] && a[0] * a[1] != 1 ? t.splice(i, 1) : i++;
            }
            return t;
        },
        isNumeric: function(t) {
            return 0 <= t - parseFloat(t);
        }
    }), Qc = u, Jc = /([&<>"'])/g, td = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, ed = [ "a", "b", "c", "d", "e", "f", "g" ], nd = function(t, e) {
        return "{" + t + (null == e ? "" : e) + "}";
    }, id = se, rd = re, ad = (Object.freeze || Object)({
        addCommas: zi,
        toCamelCase: function(t, e) {
            return t = (t || "").toLowerCase().replace(/-(.)/g, function(t, e) {
                return e.toUpperCase();
            }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;
        },
        normalizeCssArray: Qc,
        encodeHTML: Ri,
        formatTpl: Bi,
        formatTplSimple: function(n, t, i) {
            return R(t, function(t, e) {
                n = n.replace("{" + e + "}", i ? Ri(t) : t);
            }), n;
        },
        getTooltipMarker: Fi,
        formatTime: Gi,
        capitalFirst: function(t) {
            return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;
        },
        truncateText: id,
        getTextRect: rd
    }), od = R, sd = [ "left", "right", "top", "bottom", "width", "height" ], ld = [ [ "width", "left", "right" ], [ "height", "top", "bottom" ] ], ud = Wi, hd = (y(Wi, "vertical"), 
    y(Wi, "horizontal"), {
        getBoxLayoutParams: function() {
            return {
                left: this.get("left"),
                top: this.get("top"),
                right: this.get("right"),
                bottom: this.get("bottom"),
                width: this.get("width"),
                height: this.get("height")
            };
        }
    }), cd = Ke(), dd = _i.extend({
        type: "component",
        id: "",
        name: "",
        mainType: "",
        subType: "",
        componentIndex: 0,
        defaultOption: null,
        ecModel: null,
        dependentModels: [],
        uid: null,
        layoutMode: null,
        $constructor: function(t, e, n, i) {
            _i.call(this, t, e, n, i), this.uid = bi("ec_cpt_model");
        },
        init: function(t, e, n) {
            this.mergeDefaultAndTheme(t, n);
        },
        mergeDefaultAndTheme: function(t, e) {
            var n = this.layoutMode, i = n ? ji(t) : {};
            p(t, e.getTheme().get(this.mainType)), p(t, this.getDefaultOption()), n && qi(t, i, n);
        },
        mergeOption: function(t) {
            p(this.option, t, !0);
            var e = this.layoutMode;
            e && qi(this.option, t, e);
        },
        optionUpdated: function() {},
        getDefaultOption: function() {
            var t = cd(this);
            if (!t.defaultOption) {
                for (var e = [], n = this.constructor; n; ) {
                    var i = n.prototype.defaultOption;
                    i && e.push(i), n = n.superClass;
                }
                for (var r = {}, a = e.length - 1; 0 <= a; a--) r = p(r, e[a], !0);
                t.defaultOption = r;
            }
            return t.defaultOption;
        },
        getReferringComponents: function(t) {
            return this.ecModel.queryComponents({
                mainType: t,
                index: this.get(t + "Index", !0),
                id: this.get(t + "Id", !0)
            });
        }
    });
    sn(dd, {
        registerWhenExtend: !0
    }), Xc = {}, (Uc = dd).registerSubTypeDefaulter = function(t, e) {
        t = en(t), Xc[t.main] = e;
    }, Uc.determineSubType = function(t, e) {
        var n = e.type;
        if (!n) {
            var i = en(t).main;
            Uc.hasSubTypes(t) && Xc[i] && (n = Xc[i](e));
        }
        return n;
    }, function(t, u) {
        function f(o) {
            var s = {}, l = [];
            return R(o, function(n) {
                var e, i, r = h(s, n), t = r.originalDeps = u(n), a = (e = o, i = [], R(t, function(t) {
                    0 <= d(e, t) && i.push(t);
                }), i);
                r.entryCount = a.length, 0 === r.entryCount && l.push(n), R(a, function(t) {
                    d(r.predecessor, t) < 0 && r.predecessor.push(t);
                    var e = h(s, t);
                    d(e.successor, t) < 0 && e.successor.push(n);
                });
            }), {
                graph: s,
                noEntryList: l
            };
        }
        function h(t, e) {
            return t[e] || (t[e] = {
                predecessor: [],
                successor: []
            }), t[e];
        }
        t.topologicalTravel = function(t, e, n, i) {
            function r(t) {
                s[t].entryCount--, 0 === s[t].entryCount && l.push(t);
            }
            function a(t) {
                u[t] = !0, r(t);
            }
            if (t.length) {
                var o = f(e), s = o.graph, l = o.noEntryList, u = {};
                for (R(t, function(t) {
                    u[t] = !0;
                }); l.length; ) {
                    var h = l.pop(), c = s[h], d = !!u[h];
                    d && (n.call(i, h, c.originalDeps.slice()), delete u[h]), R(c.successor, d ? a : r);
                }
                R(u, function() {
                    throw new Error("Circle dependency may exists");
                });
            }
        };
    }(dd, function(t) {
        var e = [];
        return R(dd.getClassesByMainType(t), function(t) {
            e = e.concat(t.prototype.dependencies || []);
        }), e = T(e, function(t) {
            return en(t).main;
        }), "dataset" !== t && d(e, "dataset") <= 0 && e.unshift("dataset"), e;
    }), r(dd, hd);
    var fd = "";
    "undefined" != typeof navigator && (fd = navigator.platform || "");
    var pd = {
        color: [ "#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3" ],
        gradientColor: [ "#f6efa6", "#d88273", "#bf444c" ],
        textStyle: {
            fontFamily: fd.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal"
        },
        blendMode: null,
        animation: "auto",
        animationDuration: 1e3,
        animationDurationUpdate: 300,
        animationEasing: "exponentialOut",
        animationEasingUpdate: "cubicOut",
        animationThreshold: 2e3,
        progressiveThreshold: 3e3,
        progressive: 400,
        hoverLayerThreshold: 3e3,
        useUTC: !1
    }, gd = Ke(), md = {
        clearColorPalette: function() {
            gd(this).colorIdx = 0, gd(this).colorNameMap = {};
        },
        getColorFromPalette: function(t, e, n) {
            var i = gd(e = e || this), r = i.colorIdx || 0, a = i.colorNameMap = i.colorNameMap || {};
            if (a.hasOwnProperty(t)) return a[t];
            var o = qe(this.get("color", !0)), s = this.get("colorLayer", !0), l = null != n && s ? function(t, e) {
                for (var n = t.length, i = 0; i < n; i++) if (t[i].length > e) return t[i];
                return t[n - 1];
            }(s, n) : o;
            if ((l = l || o) && l.length) {
                var u = l[r];
                return t && (a[t] = u), i.colorIdx = (r + 1) % l.length, u;
            }
        }
    }, vd = {
        cartesian2d: function(t, e, n, i) {
            var r = t.getReferringComponents("xAxis")[0], a = t.getReferringComponents("yAxis")[0];
            e.coordSysDims = [ "x", "y" ], n.set("x", r), n.set("y", a), Xi(r) && (i.set("x", r), 
            e.firstCategoryDimIndex = 0), Xi(a) && (i.set("y", a), e.firstCategoryDimIndex = 1);
        },
        singleAxis: function(t, e, n, i) {
            var r = t.getReferringComponents("singleAxis")[0];
            e.coordSysDims = [ "single" ], n.set("single", r), Xi(r) && (i.set("single", r), 
            e.firstCategoryDimIndex = 0);
        },
        polar: function(t, e, n, i) {
            var r = t.getReferringComponents("polar")[0], a = r.findAxisModel("radiusAxis"), o = r.findAxisModel("angleAxis");
            e.coordSysDims = [ "radius", "angle" ], n.set("radius", a), n.set("angle", o), Xi(a) && (i.set("radius", a), 
            e.firstCategoryDimIndex = 0), Xi(o) && (i.set("angle", o), e.firstCategoryDimIndex = 1);
        },
        geo: function(t, e) {
            e.coordSysDims = [ "lng", "lat" ];
        },
        parallel: function(t, r, a, o) {
            var s = t.ecModel, e = s.getComponent("parallel", t.get("parallelIndex")), l = r.coordSysDims = e.dimensions.slice();
            R(e.parallelAxisIndex, function(t, e) {
                var n = s.getComponent("parallelAxis", t), i = l[e];
                a.set(i, n), Xi(n) && null == r.firstCategoryDimIndex && (o.set(i, n), r.firstCategoryDimIndex = e);
            });
        }
    }, yd = "original", _d = "arrayRows", xd = "objectRows", wd = "keyedColumns", bd = "unknown", Sd = "typedArray", Md = "column", Id = "row";
    Yi.seriesDataToSource = function(t) {
        return new Yi({
            data: t,
            sourceFormat: x(t) ? Sd : yd,
            fromDataset: !1
        });
    }, rn(Yi);
    var Dd = Ke(), Cd = "\0_ec_inner", Td = _i.extend({
        init: function(t, e, n, i) {
            n = n || {}, this.option = null, this._theme = new _i(n), this._optionManager = i;
        },
        setOption: function(t, e) {
            c(!(Cd in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), 
            this.resetOption(null);
        },
        resetOption: function(t) {
            var e = !1, n = this._optionManager;
            if (!t || "recreate" === t) {
                var i = n.mountOption("recreate" === t);
                this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : Ji.call(this, i), 
                e = !0;
            }
            if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                var r = n.getTimelineOption(this);
                r && (this.mergeOption(r), e = !0);
            }
            if (!t || "recreate" === t || "media" === t) {
                var a = n.getMediaOption(this, this._api);
                a.length && R(a, function(t) {
                    this.mergeOption(t, e = !0);
                }, this);
            }
            return e;
        },
        mergeOption: function(r) {
            var u = this.option, h = this._componentsMap, n = [];
            Dd(this).datasetMap = z(), R(r, function(t, e) {
                null != t && (dd.hasClass(e) ? e && n.push(e) : u[e] = null == u[e] ? b(t) : p(u[e], t, !0));
            }), dd.topologicalTravel(n, dd.getAllClassMainTypes(), function(o, t) {
                var e, s, n = qe(r[o]), i = Xe(h.get(o), n);
                e = i, s = z(), eh(e, function(t) {
                    var e = t.exist;
                    e && s.set(e.id, t);
                }), eh(e, function(t) {
                    var e = t.option;
                    c(!e || null == e.id || !s.get(e.id) || s.get(e.id) === t, "id duplicates: " + (e && e.id)), 
                    e && null != e.id && s.set(e.id, t), !t.keyInfo && (t.keyInfo = {});
                }), eh(e, function(t, e) {
                    var n = t.exist, i = t.option, r = t.keyInfo;
                    if (nh(i)) {
                        if (r.name = null != i.name ? i.name + "" : n ? n.name : rh + e, n) r.id = n.id; else if (null != i.id) r.id = i.id + ""; else for (var a = 0; r.id = "\0" + r.name + "\0" + a++, 
                        s.get(r.id); ) ;
                        s.set(r.id, t);
                    }
                }), R(i, function(t) {
                    var e, n, i, r = t.option;
                    M(r) && (t.keyInfo.mainType = o, t.keyInfo.subType = (e = o, n = r, i = t.exist, 
                    n.type ? n.type : i ? i.subType : dd.determineSubType(e, n)));
                });
                var l = function(e, t) {
                    A(t) || (t = t ? [ t ] : []);
                    var n = {};
                    return R(t, function(t) {
                        n[t] = (e.get(t) || []).slice();
                    }), n;
                }(h, t);
                u[o] = [], h.set(o, []), R(i, function(t, e) {
                    var n = t.exist, i = t.option;
                    if (c(M(i) || n, "Empty component definition"), i) {
                        var r = dd.getClass(o, t.keyInfo.subType, !0);
                        if (n && n instanceof r) n.name = t.keyInfo.name, n.mergeOption(i, this), n.optionUpdated(i, !1); else {
                            var a = k({
                                dependentModels: l,
                                componentIndex: e
                            }, t.keyInfo);
                            k(n = new r(i, this, this, a), a), n.init(i, this, this, a), n.optionUpdated(null, !0);
                        }
                    } else n.mergeOption({}, this), n.optionUpdated({}, !1);
                    h.get(o)[e] = n, u[o][e] = n.option;
                }, this), "series" === o && tr(this, h.get("series"));
            }, this), this._seriesIndicesMap = z(this._seriesIndices = this._seriesIndices || []);
        },
        getOption: function() {
            var i = b(this.option);
            return R(i, function(t, e) {
                if (dd.hasClass(e)) {
                    for (var n = (t = qe(t)).length - 1; 0 <= n; n--) Ze(t[n]) && t.splice(n, 1);
                    i[e] = t;
                }
            }), delete i[Cd], i;
        },
        getTheme: function() {
            return this._theme;
        },
        getComponent: function(t, e) {
            var n = this._componentsMap.get(t);
            return n ? n[e || 0] : void 0;
        },
        queryComponents: function(t) {
            var e = t.mainType;
            if (!e) return [];
            var n, i = t.index, r = t.id, a = t.name, o = this._componentsMap.get(e);
            if (!o || !o.length) return [];
            if (null != i) A(i) || (i = [ i ]), n = m(T(i, function(t) {
                return o[t];
            }), function(t) {
                return !!t;
            }); else if (null != r) {
                var s = A(r);
                n = m(o, function(t) {
                    return s && 0 <= d(r, t.id) || !s && t.id === r;
                });
            } else if (null != a) {
                var l = A(a);
                n = m(o, function(t) {
                    return l && 0 <= d(a, t.name) || !l && t.name === a;
                });
            } else n = o.slice();
            return er(n, t);
        },
        findComponents: function(t) {
            var e, n, i, r, a, o = t.query, s = t.mainType, l = (n = s + "Index", i = s + "Id", 
            r = s + "Name", !(e = o) || null == e[n] && null == e[i] && null == e[r] ? null : {
                mainType: s,
                index: e[n],
                id: e[i],
                name: e[r]
            }), u = l ? this.queryComponents(l) : this._componentsMap.get(s);
            return a = er(u, t), t.filter ? m(a, t.filter) : a;
        },
        eachComponent: function(t, i, r) {
            var e = this._componentsMap;
            if ("function" == typeof t) r = i, i = t, e.each(function(t, n) {
                R(t, function(t, e) {
                    i.call(r, n, t, e);
                });
            }); else if (S(t)) R(e.get(t), i, r); else if (M(t)) {
                R(this.findComponents(t), i, r);
            }
        },
        getSeriesByName: function(e) {
            return m(this._componentsMap.get("series"), function(t) {
                return t.name === e;
            });
        },
        getSeriesByIndex: function(t) {
            return this._componentsMap.get("series")[t];
        },
        getSeriesByType: function(e) {
            return m(this._componentsMap.get("series"), function(t) {
                return t.subType === e;
            });
        },
        getSeries: function() {
            return this._componentsMap.get("series").slice();
        },
        getSeriesCount: function() {
            return this._componentsMap.get("series").length;
        },
        eachSeries: function(n, i) {
            R(this._seriesIndices, function(t) {
                var e = this._componentsMap.get("series")[t];
                n.call(i, e, t);
            }, this);
        },
        eachRawSeries: function(t, e) {
            R(this._componentsMap.get("series"), t, e);
        },
        eachSeriesByType: function(n, i, r) {
            R(this._seriesIndices, function(t) {
                var e = this._componentsMap.get("series")[t];
                e.subType === n && i.call(r, e, t);
            }, this);
        },
        eachRawSeriesByType: function(t, e, n) {
            return R(this.getSeriesByType(t), e, n);
        },
        isSeriesFiltered: function(t) {
            return null == this._seriesIndicesMap.get(t.componentIndex);
        },
        getCurrentSeriesIndices: function() {
            return (this._seriesIndices || []).slice();
        },
        filterSeries: function(t, e) {
            tr(this, m(this._componentsMap.get("series"), t, e));
        },
        restoreData: function(n) {
            var t = this._componentsMap;
            tr(this, t.get("series"));
            var i = [];
            t.each(function(t, e) {
                i.push(e);
            }), dd.topologicalTravel(i, dd.getAllClassMainTypes(), function(e) {
                R(t.get(e), function(t) {
                    ("series" !== e || !function(t, e) {
                        if (e) {
                            var n = e.seiresIndex, i = e.seriesId, r = e.seriesName;
                            return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r;
                        }
                    }(t, n)) && t.restoreData();
                });
            });
        }
    });
    r(Td, md);
    var kd = [ "getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel" ], Ad = {};
    ir.prototype = {
        constructor: ir,
        create: function(n, i) {
            var r = [];
            R(Ad, function(t) {
                var e = t.create(n, i);
                r = r.concat(e || []);
            }), this._coordinateSystems = r;
        },
        update: function(e, n) {
            R(this._coordinateSystems, function(t) {
                t.update && t.update(e, n);
            });
        },
        getCoordinateSystems: function() {
            return this._coordinateSystems.slice();
        }
    }, ir.register = function(t, e) {
        Ad[t] = e;
    }, ir.get = function(t) {
        return Ad[t];
    };
    var Ld = R, Pd = b, Od = T, Nd = p, Ed = /^(min|max)?(.+)$/;
    rr.prototype = {
        constructor: rr,
        setOption: function(t, e) {
            t && R(qe(t.series), function(t) {
                t && t.data && x(t.data) && I(t.data);
            }), t = Pd(t, !0);
            var r, n, i = this._optionBackup, a = function(t, n, i) {
                var e, r, a = [], o = [], s = t.timeline;
                if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), 
                t.media) {
                    r = r || {};
                    var l = t.media;
                    Ld(l, function(t) {
                        t && t.option && (t.query ? o.push(t) : e || (e = t));
                    });
                }
                return r || (r = t), r.timeline || (r.timeline = s), Ld([ r ].concat(a).concat(T(o, function(t) {
                    return t.option;
                })), function(e) {
                    Ld(n, function(t) {
                        t(e, i);
                    });
                }), {
                    baseOption: r,
                    timelineOptions: a,
                    mediaDefault: e,
                    mediaList: o
                };
            }.call(this, t, e, !i);
            this._newBaseOption = a.baseOption, i ? (r = i.baseOption, n = a.baseOption, Ld(n = n || {}, function(t, e) {
                if (null != t) {
                    var n = r[e];
                    if (dd.hasClass(e)) {
                        t = qe(t);
                        var i = Xe(n = qe(n), t);
                        r[e] = Od(i, function(t) {
                            return t.option && t.exist ? Nd(t.exist, t.option, !0) : t.exist || t.option;
                        });
                    } else r[e] = Nd(n, t, !0);
                }
            }), a.timelineOptions.length && (i.timelineOptions = a.timelineOptions), a.mediaList.length && (i.mediaList = a.mediaList), 
            a.mediaDefault && (i.mediaDefault = a.mediaDefault)) : this._optionBackup = a;
        },
        mountOption: function(t) {
            var e = this._optionBackup;
            return this._timelineOptions = Od(e.timelineOptions, Pd), this._mediaList = Od(e.mediaList, Pd), 
            this._mediaDefault = Pd(e.mediaDefault), this._currentMediaIndices = [], Pd(t ? e.baseOption : this._newBaseOption);
        },
        getTimelineOption: function(t) {
            var e, n = this._timelineOptions;
            if (n.length) {
                var i = t.getComponent("timeline");
                i && (e = Pd(n[i.getCurrentIndex()], !0));
            }
            return e;
        },
        getMediaOption: function() {
            var t, e, n = this._api.getWidth(), i = this._api.getHeight(), r = this._mediaList, a = this._mediaDefault, o = [], s = [];
            if (!r.length && !a) return s;
            for (var l = 0, u = r.length; l < u; l++) ar(r[l].query, n, i) && o.push(l);
            return !o.length && a && (o = [ -1 ]), o.length && (t = o, e = this._currentMediaIndices, 
            !(t.join(",") === e.join(","))) && (s = Od(o, function(t) {
                return Pd(-1 === t ? a.option : r[t].option);
            })), this._currentMediaIndices = o, s;
        }
    };
    var zd = R, Rd = M, Bd = [ "areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine" ], Fd = function(e, t) {
        zd(cr(e.series), function(t) {
            Rd(t) && function(t) {
                if (Rd(t)) {
                    or(t), lr(t), ur(t, "label"), ur(t, "upperLabel"), ur(t, "edgeLabel"), t.emphasis && (ur(t.emphasis, "label"), 
                    ur(t.emphasis, "upperLabel"), ur(t.emphasis, "edgeLabel")), (n = t.markPoint) && (or(n), 
                    hr(n)), (i = t.markLine) && (or(i), hr(i));
                    var e = t.markArea;
                    e && hr(e);
                    var n, i, r = t.data;
                    if ("graph" === t.type) {
                        r = r || t.nodes;
                        var a = t.links || t.edges;
                        if (a && !x(a)) for (var o = 0; o < a.length; o++) hr(a[o]);
                        R(t.categories, function(t) {
                            lr(t);
                        });
                    }
                    if (r && !x(r)) for (o = 0; o < r.length; o++) hr(r[o]);
                    if ((n = t.markPoint) && n.data) {
                        var s = n.data;
                        for (o = 0; o < s.length; o++) hr(s[o]);
                    }
                    if ((i = t.markLine) && i.data) {
                        var l = i.data;
                        for (o = 0; o < l.length; o++) A(l[o]) ? (hr(l[o][0]), hr(l[o][1])) : hr(l[o]);
                    }
                    "gauge" === t.type ? (ur(t, "axisLabel"), ur(t, "title"), ur(t, "detail")) : "treemap" === t.type ? (sr(t.breadcrumb, "itemStyle"), 
                    R(t.levels, function(t) {
                        lr(t);
                    })) : "tree" === t.type && lr(t.leaves);
                }
            }(t);
        });
        var n = [ "xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar" ];
        t && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), zd(n, function(t) {
            zd(cr(e[t]), function(t) {
                t && (ur(t, "axisLabel"), ur(t.axisPointer, "label"));
            });
        }), zd(cr(e.parallel), function(t) {
            var e = t && t.parallelAxisDefault;
            ur(e, "axisLabel"), ur(e && e.axisPointer, "label");
        }), zd(cr(e.calendar), function(t) {
            sr(t, "itemStyle"), ur(t, "dayLabel"), ur(t, "monthLabel"), ur(t, "yearLabel");
        }), zd(cr(e.radar), function(t) {
            ur(t, "name");
        }), zd(cr(e.geo), function(t) {
            Rd(t) && (hr(t), zd(cr(t.regions), function(t) {
                hr(t);
            }));
        }), zd(cr(e.timeline), function(t) {
            hr(t), sr(t, "label"), sr(t, "itemStyle"), sr(t, "controlStyle", !0);
            var e = t.data;
            A(e) && R(e, function(t) {
                M(t) && (sr(t, "label"), sr(t, "itemStyle"));
            });
        }), zd(cr(e.toolbox), function(t) {
            sr(t, "iconStyle"), zd(t.feature, function(t) {
                sr(t, "iconStyle");
            });
        }), ur(dr(e.axisPointer), "label"), ur(dr(e.tooltip).axisPointer, "label");
    }, Vd = [ [ "x", "left" ], [ "y", "top" ], [ "x2", "right" ], [ "y2", "bottom" ] ], Gd = [ "grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline" ], Wd = function(n, t) {
        Fd(n, t), n.series = qe(n.series), R(n.series, function(t) {
            if (M(t)) {
                var e = t.type;
                if (("pie" === e || "gauge" === e) && null != t.clockWise && (t.clockwise = t.clockWise), 
                "gauge" === e) {
                    var n = function(t, e) {
                        e = e.split(",");
                        for (var n = t, i = 0; i < e.length && null != (n = n && n[e[i]]); i++) ;
                        return n;
                    }(t, "pointer.color");
                    null != n && function(t, e, n, i) {
                        e = e.split(",");
                        for (var r, a = t, o = 0; o < e.length - 1; o++) null == a[r = e[o]] && (a[r] = {}), 
                        a = a[r];
                        (i || null == a[e[o]]) && (a[e[o]] = n);
                    }(t, "itemStyle.normal.color", n);
                }
                fr(t);
            }
        }), n.dataRange && (n.visualMap = n.dataRange), R(Gd, function(t) {
            var e = n[t];
            e && (A(e) || (e = [ e ]), R(e, function(t) {
                fr(t);
            }));
        });
    }, Hd = gr.prototype;
    Hd.pure = !1;
    var qd = {
        arrayRows_column: {
            pure: Hd.persistent = !0,
            count: function() {
                return Math.max(0, this._data.length - this._source.startIndex);
            },
            getItem: function(t) {
                return this._data[t + this._source.startIndex];
            },
            appendData: yr
        },
        arrayRows_row: {
            pure: !0,
            count: function() {
                var t = this._data[0];
                return t ? Math.max(0, t.length - this._source.startIndex) : 0;
            },
            getItem: function(t) {
                t += this._source.startIndex;
                for (var e = [], n = this._data, i = 0; i < n.length; i++) {
                    var r = n[i];
                    e.push(r ? r[t] : null);
                }
                return e;
            },
            appendData: function() {
                throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
            }
        },
        objectRows: {
            pure: !0,
            count: mr,
            getItem: vr,
            appendData: yr
        },
        keyedColumns: {
            pure: !0,
            count: function() {
                var t = this._source.dimensionsDefine[0].name, e = this._data[t];
                return e ? e.length : 0;
            },
            getItem: function(t) {
                for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {
                    var r = this._data[n[i].name];
                    e.push(r ? r[t] : null);
                }
                return e;
            },
            appendData: function(t) {
                var r = this._data;
                R(t, function(t, e) {
                    for (var n = r[e] || (r[e] = []), i = 0; i < (t || []).length; i++) n.push(t[i]);
                });
            }
        },
        original: {
            count: mr,
            getItem: vr,
            appendData: yr
        },
        typedArray: {
            persistent: !(Hd.getSource = function() {
                return this._source;
            }),
            pure: !0,
            count: function() {
                return this._data ? this._data.length / this._dimSize : 0;
            },
            getItem: function(t, e) {
                t -= this._offset, e = e || [];
                for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) e[i] = this._data[n + i];
                return e;
            },
            appendData: function(t) {
                this._data = t;
            },
            clean: function() {
                this._offset += this.count(), this._data = null;
            }
        }
    }, jd = {
        arrayRows: _r,
        objectRows: function(t, e, n, i) {
            return null != n ? t[i] : t;
        },
        keyedColumns: _r,
        original: function(t, e, n) {
            var i = Ue(t);
            return null != n && i instanceof Array ? i[n] : i;
        },
        typedArray: _r
    }, Ud = {
        arrayRows: xr,
        objectRows: function(t, e) {
            return wr(t[e], this._dimensionInfos[e]);
        },
        keyedColumns: xr,
        original: function(t, e, n, i) {
            var r, a = t && (null == t.value ? t : t.value);
            return !this._rawData.pure && (nh(r = t) && !(r instanceof Array)) && (this.hasItemOption = !0), 
            wr(a instanceof Array ? a[i] : a, this._dimensionInfos[e]);
        },
        typedArray: function(t, e, n, i) {
            return t[i];
        }
    }, Xd = /\{@(.+?)\}/g, Yd = {
        getDataParams: function(t, e) {
            var n = this.getData(e), i = this.getRawValue(t, e), r = n.getRawIndex(t), a = n.getName(t), o = n.getRawDataItem(t), s = n.getItemVisual(t, "color");
            return {
                componentType: this.mainType,
                componentSubType: this.subType,
                seriesType: "series" === this.mainType ? this.subType : null,
                seriesIndex: this.seriesIndex,
                seriesId: this.id,
                seriesName: this.name,
                name: a,
                dataIndex: r,
                data: o,
                dataType: e,
                value: i,
                color: s,
                marker: Fi(s),
                $vars: [ "seriesName", "name", "value" ]
            };
        },
        getFormattedLabel: function(i, t, e, n, r) {
            t = t || "normal";
            var a = this.getData(e), o = a.getItemModel(i), s = this.getDataParams(i, e);
            null != n && s.value instanceof Array && (s.value = s.value[n]);
            var l = o.get("normal" === t ? [ r || "label", "formatter" ] : [ t, r || "label", "formatter" ]);
            return "function" == typeof l ? (s.status = t, l(s)) : "string" == typeof l ? Bi(l, s).replace(Xd, function(t, e) {
                var n = e.length;
                return "[" === e.charAt(0) && "]" === e.charAt(n - 1) && (e = +e.slice(1, n - 1)), 
                br(a, i, e);
            }) : void 0;
        },
        getRawValue: function(t, e) {
            return br(this.getData(e), t);
        },
        formatTooltip: function() {}
    }, Zd = Ir.prototype;
    Zd.perform = function(t) {
        function e(t) {
            return !(1 <= t) && (t = 1), t;
        }
        var n, i = this._upstream, r = t && t.skip;
        if (this._dirty && i) {
            var a = this.context;
            a.data = a.outputData = i.context.outputData;
        }
        this.__pipeline && (this.__pipeline.currentTask = this), this._plan && !r && (n = this._plan(this.context));
        var o, s = e(this._modBy), l = this._modDataCount || 0, u = e(t && t.modBy), h = t && t.modDataCount || 0;
        (s !== u || l !== h) && (n = "reset"), (this._dirty || "reset" === n) && (this._dirty = !1, 
        o = function(t, e) {
            var n, i;
            t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null, !e && t._reset && ((n = t._reset(t.context)) && n.progress && (i = n.forceFirstProgress, 
            n = n.progress), A(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
            var r = t._downstream;
            return r && r.dirty(), i;
        }(this, r)), this._modBy = u, this._modDataCount = h;
        var c = t && t.step;
        if (this._dueEnd = i ? i._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, 
        this._progress) {
            var d = this._dueIndex, f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
            if (!r && (o || d < f)) {
                var p = this._progress;
                if (A(p)) for (var g = 0; g < p.length; g++) Dr(this, p[g], d, f, u, h); else Dr(this, p, d, f, u, h);
            }
            this._dueIndex = f;
            var m = null != this._settedOutputEnd ? this._settedOutputEnd : f;
            this._outputDueEnd = m;
        } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
        return this.unfinished();
    };
    var $d = function() {
        function r() {
            return s < o ? s++ : null;
        }
        function a() {
            var t = s % h * l + Math.ceil(s / h), e = o <= s ? null : t < u ? t : s;
            return s++, e;
        }
        var o, s, l, u, h, c = {
            reset: function(t, e, n, i) {
                s = t, o = e, l = n, u = i, h = Math.ceil(u / l), c.next = 1 < l && 0 < u ? a : r;
            }
        };
        return c;
    }();
    Zd.dirty = function() {
        this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, Zd.unfinished = function() {
        return this._progress && this._dueIndex < this._dueEnd;
    }, Zd.pipe = function(t) {
        (this._downstream !== t || this._dirty) && ((this._downstream = t)._upstream = this, 
        t.dirty());
    }, Zd.dispose = function() {
        this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), 
        this._dirty = !1, this._disposed = !0);
    }, Zd.getUpstream = function() {
        return this._upstream;
    }, Zd.getDownstream = function() {
        return this._downstream;
    }, Zd.setOutputEnd = function(t) {
        this._outputDueEnd = this._settedOutputEnd = t;
    };
    var Kd = Ke(), Qd = dd.extend({
        type: "series.__base__",
        seriesIndex: 0,
        coordinateSystem: null,
        defaultOption: null,
        legendDataProvider: null,
        visualColorAccessPath: "itemStyle.color",
        layoutMode: null,
        init: function(t, e, n) {
            this.seriesIndex = this.componentIndex, this.dataTask = Mr({
                count: Tr,
                reset: kr
            }), this.dataTask.context = {
                model: this
            }, this.mergeDefaultAndTheme(t, n), Zi(this);
            var i = this.getInitialData(t, n);
            Lr(i, this), this.dataTask.context.data = i, Kd(this).dataBeforeProcessed = i, Cr(this);
        },
        mergeDefaultAndTheme: function(t, e) {
            var n = this.layoutMode, i = n ? ji(t) : {}, r = this.subType;
            dd.hasClass(r) && (r += "Series"), p(t, e.getTheme().get(this.subType)), p(t, this.getDefaultOption()), 
            je(t, "label", [ "show" ]), this.fillDataTextStyle(t.data), n && qi(t, i, n);
        },
        mergeOption: function(t, e) {
            t = p(this.option, t, !0), this.fillDataTextStyle(t.data);
            var n = this.layoutMode;
            n && qi(this.option, t, n), Zi(this);
            var i = this.getInitialData(t, e);
            Lr(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, Kd(this).dataBeforeProcessed = i, 
            Cr(this);
        },
        fillDataTextStyle: function(t) {
            if (t && !x(t)) for (var e = [ "show" ], n = 0; n < t.length; n++) t[n] && t[n].label && je(t[n], "label", e);
        },
        getInitialData: function() {},
        appendData: function(t) {
            this.getRawData().appendData(t.data);
        },
        getData: function(t) {
            var e = Or(this);
            if (e) {
                var n = e.context.data;
                return null == t ? n : n.getLinkedData(t);
            }
            return Kd(this).data;
        },
        setData: function(t) {
            var e = Or(this);
            if (e) {
                var n = e.context;
                n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, 
                e !== this.dataTask && (n.data = t);
            }
            Kd(this).data = t;
        },
        getSource: function() {
            return Dd(this).source;
        },
        getRawData: function() {
            return Kd(this).dataBeforeProcessed;
        },
        getBaseAxis: function() {
            var t = this.coordinateSystem;
            return t && t.getBaseAxis && t.getBaseAxis();
        },
        formatTooltip: function(n, l) {
            var u = this.getData(), i = u.mapDimension("defaultedTooltip", !0), t = i.length, e = this.getRawValue(n), r = A(e), h = u.getItemVisual(n, "color");
            M(h) && h.colorStops && (h = (h.colorStops[0] || {}).color), h = h || "transparent";
            var a = 1 < t || r && !t ? function(t) {
                function e(t, e) {
                    var n = u.getDimensionInfo(e);
                    if (n && !1 !== n.otherDims.tooltip) {
                        var i = n.type, r = Fi({
                            color: h,
                            type: "subItem"
                        }), a = (o ? r + Ri(n.displayName || "-") + ": " : "") + Ri("ordinal" === i ? t + "" : "time" === i ? l ? "" : Gi("yyyy/MM/dd hh:mm:ss", t) : zi(t));
                        a && s.push(a);
                    }
                }
                var o = g(t, function(t, e, n) {
                    var i = u.getDimensionInfo(n);
                    return t | (i && !1 !== i.tooltip && null != i.displayName);
                }, 0), s = [];
                return i.length ? R(i, function(t) {
                    e(br(u, n, t), t);
                }) : R(t, e), (o ? "<br/>" : "") + s.join(o ? "<br/>" : ", ");
            }(e) : Ri(zi(t ? br(u, n, i[0]) : r ? e[0] : e)), o = Fi(h), s = u.getName(n), c = this.name;
            return Ye(this) || (c = ""), c = c ? Ri(c) + (l ? ": " : "<br/>") : "", l ? o + c + a : c + o + (s ? Ri(s) + ": " + a : a);
        },
        isAnimationEnabled: function() {
            if (al.node) return !1;
            var t = this.getShallow("animation");
            return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), 
            t;
        },
        restoreData: function() {
            this.dataTask.dirty();
        },
        getColorFromPalette: function(t, e, n) {
            var i = this.ecModel, r = md.getColorFromPalette.call(this, t, e, n);
            return r || (r = i.getColorFromPalette(t, e, n)), r;
        },
        coordDimToDataDim: function(t) {
            return this.getRawData().mapDimension(t, !0);
        },
        getProgressive: function() {
            return this.get("progressive");
        },
        getProgressiveThreshold: function() {
            return this.get("progressiveThreshold");
        },
        getAxisTooltipData: null,
        getTooltipPosition: null,
        pipeTask: null,
        preventIncremental: null,
        pipelineContext: null
    });
    r(Qd, Yd), r(Qd, md);
    var Jd = function() {
        this.group = new hu(), this.uid = bi("viewComponent");
    };
    Jd.prototype = {
        constructor: Jd,
        init: function() {},
        render: function() {},
        dispose: function() {}
    };
    var tf = Jd.prototype;
    tf.updateView = tf.updateLayout = tf.updateVisual = function() {}, nn(Jd), sn(Jd, {
        registerWhenExtend: !0
    });
    var ef = function() {
        var s = Ke();
        return function(t) {
            var e = s(t), n = t.pipelineContext, i = e.large, r = e.progressiveRender, a = e.large = n.large, o = e.progressiveRender = n.progressiveRender;
            return !!(i ^ a || r ^ o) && "reset";
        };
    }, nf = Ke(), rf = ef(), af = Nr.prototype = {
        type: "chart",
        init: function() {},
        render: function() {},
        highlight: function(t, e, n, i) {
            zr(t.getData(), i, "emphasis");
        },
        downplay: function(t, e, n, i) {
            zr(t.getData(), i, "normal");
        },
        remove: function() {
            this.group.removeAll();
        },
        dispose: function() {},
        incrementalPrepareRender: null,
        incrementalRender: null,
        updateTransform: null
    };
    af.updateView = af.updateLayout = af.updateVisual = function(t, e, n, i) {
        this.render(t, e, n, i);
    }, nn(Nr), sn(Nr, {
        registerWhenExtend: !0
    }), Nr.markUpdateMethod = function(t, e) {
        nf(t).updateMethod = e;
    };
    var of = {
        incrementalPrepareRender: {
            progress: function(t, e) {
                e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);
            }
        },
        render: {
            forceFirstProgress: !0,
            progress: function(t, e) {
                e.view.render(e.model, e.ecModel, e.api, e.payload);
            }
        }
    }, sf = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(e, t) {
            var n = e.getData(), i = (e.visualColorAccessPath || "itemStyle.color").split("."), r = e.get(i) || e.getColorFromPalette(e.name, null, t.getSeriesCount());
            if (n.setVisual("color", r), !t.isSeriesFiltered(e)) {
                "function" != typeof r || r instanceof Ac || n.each(function(t) {
                    n.setItemVisual(t, "color", r(e.getDataParams(t)));
                });
                return {
                    dataEach: n.hasItemOption ? function(t, e) {
                        var n = t.getItemModel(e).get(i, !0);
                        null != n && t.setItemVisual(e, "color", n);
                    } : null
                };
            }
        }
    }, lf = {
        toolbox: {
            brush: {
                title: {
                    rect: "矩形选择",
                    polygon: "圈选",
                    lineX: "横向选择",
                    lineY: "纵向选择",
                    keep: "保持选择",
                    clear: "清除选择"
                }
            },
            dataView: {
                title: "数据视图",
                lang: [ "数据视图", "关闭", "刷新" ]
            },
            dataZoom: {
                title: {
                    zoom: "区域缩放",
                    back: "区域缩放还原"
                }
            },
            magicType: {
                title: {
                    line: "切换为折线图",
                    bar: "切换为柱状图",
                    stack: "切换为堆叠",
                    tiled: "切换为平铺"
                }
            },
            restore: {
                title: "还原"
            },
            saveAsImage: {
                title: "保存为图片",
                lang: [ "右键另存为图片" ]
            }
        },
        series: {
            typeNames: {
                pie: "饼图",
                bar: "柱状图",
                line: "折线图",
                scatter: "散点图",
                effectScatter: "涟漪散点图",
                radar: "雷达图",
                tree: "树图",
                treemap: "矩形树图",
                boxplot: "箱型图",
                candlestick: "K线图",
                k: "K线图",
                heatmap: "热力图",
                map: "地图",
                parallel: "平行坐标图",
                lines: "线图",
                graph: "关系图",
                sankey: "桑基图",
                funnel: "漏斗图",
                gauge: "仪表盘图",
                pictorialBar: "象形柱图",
                themeRiver: "主题河流图",
                sunburst: "旭日图"
            }
        },
        aria: {
            general: {
                withTitle: "这是一个关于“{title}”的图表。",
                withoutTitle: "这是一个图表，"
            },
            series: {
                single: {
                    prefix: "",
                    withName: "图表类型是{seriesType}，表示{seriesName}。",
                    withoutName: "图表类型是{seriesType}。"
                },
                multiple: {
                    prefix: "它由{seriesCount}个图表系列组成。",
                    withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
                    withoutName: "第{seriesId}个系列是一个{seriesType}，",
                    separator: {
                        middle: "；",
                        end: "。"
                    }
                }
            },
            data: {
                allData: "其数据是——",
                partialData: "其中，前{displayCnt}项是——",
                withName: "{name}的数据是{value}",
                withoutName: "{value}",
                separator: {
                    middle: "，",
                    end: ""
                }
            }
        }
    }, uf = function(t, e) {
        function c(t, e) {
            if ("string" != typeof t) return t;
            var n = t;
            return R(e, function(t, e) {
                n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t);
            }), n;
        }
        function d(t) {
            var e = a.get(t);
            if (null == e) {
                for (var n = t.split("."), i = lf.aria, r = 0; r < n.length; ++r) i = i[n[r]];
                return i;
            }
            return e;
        }
        var n, a = e.getModel("aria");
        if (a.get("show")) {
            if (a.get("description")) return void t.setAttribute("aria-label", a.get("description"));
            var f = 0;
            e.eachSeries(function() {
                ++f;
            }, this);
            var i, p = a.get("data.maxCount") || 10, r = a.get("series.maxCount") || 10, g = Math.min(f, r);
            if (!(f < 1)) {
                var o = ((n = e.getModel("title").option) && n.length && (n = n[0]), n && n.text);
                i = o ? c(d("general.withTitle"), {
                    title: o
                }) : d("general.withoutTitle");
                var m = [];
                i += c(d(1 < f ? "series.multiple.prefix" : "series.single.prefix"), {
                    seriesCount: f
                }), e.eachSeries(function(t, e) {
                    if (e < g) {
                        var n, i = t.get("name"), r = "series." + (1 < f ? "multiple" : "single") + ".";
                        n = c(n = d(i ? r + "withName" : r + "withoutName"), {
                            seriesId: t.seriesIndex,
                            seriesName: t.get("name"),
                            seriesType: (h = t.subType, lf.series.typeNames[h] || "自定义图")
                        });
                        var a = t.getData();
                        n += (window.data = a).count() > p ? c(d("data.partialData"), {
                            displayCnt: p
                        }) : d("data.allData");
                        for (var o = [], s = 0; s < a.count(); s++) if (s < p) {
                            var l = a.getName(s), u = br(a, s);
                            o.push(c(d(l ? "data.withName" : "data.withoutName"), {
                                name: l,
                                value: u
                            }));
                        }
                        n += o.join(d("data.separator.middle")) + d("data.separator.end"), m.push(n);
                    }
                    var h;
                }), i += m.join(d("series.multiple.separator.middle")) + d("series.multiple.separator.end"), 
                t.setAttribute("aria-label", i);
            }
        }
    }, hf = Math.PI, cf = Vr.prototype;
    cf.restoreData = function(t, e) {
        t.restoreData(e), this._stageTaskMap.each(function(t) {
            var e = t.overallTask;
            e && e.dirty();
        });
    }, cf.getPerformArgs = function(t, e) {
        if (t.__pipeline) {
            var n = this._pipelineMap.get(t.__pipeline.id), i = n.context, r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex ? n.step : null, a = i && i.modDataCount;
            return {
                step: r,
                modBy: null != a ? Math.ceil(a / r) : null,
                modDataCount: a
            };
        }
    }, cf.getPipeline = function(t) {
        return this._pipelineMap.get(t);
    }, cf.updateStreamModes = function(t, e) {
        var n = this._pipelineMap.get(t.uid), i = t.getData().count(), r = n.progressiveEnabled && e.incrementalPrepareRender && i >= n.threshold, a = t.get("large") && i >= t.get("largeThreshold"), o = "mod" === t.get("progressiveChunkMode") ? i : null;
        t.pipelineContext = n.context = {
            progressiveRender: r,
            modDataCount: o,
            large: a
        };
    }, cf.restorePipelines = function(t) {
        var i = this, r = i._pipelineMap = z();
        t.eachSeries(function(t) {
            var e = t.getProgressive(), n = t.uid;
            r.set(n, {
                id: n,
                head: null,
                tail: null,
                threshold: t.getProgressiveThreshold(),
                progressiveEnabled: e && !(t.preventIncremental && t.preventIncremental()),
                blockIndex: -1,
                step: Math.round(e || 700),
                count: 0
            }), $r(i, t, t.dataTask);
        });
    }, cf.prepareStageTasks = function() {
        var n = this._stageTaskMap, i = this.ecInstance.getModel(), r = this.api;
        R(this._allHandlers, function(t) {
            var e = n.get(t.uid) || n.set(t.uid, []);
            t.reset && function(i, r, t, a, o) {
                function e(t) {
                    var e = t.uid, n = s.get(e) || s.set(e, Mr({
                        plan: Ur,
                        reset: Xr,
                        count: Zr
                    }));
                    n.context = {
                        model: t,
                        ecModel: a,
                        api: o,
                        useClearVisual: r.isVisual && !r.isLayout,
                        plan: r.plan,
                        reset: r.reset,
                        scheduler: i
                    }, $r(i, t, n);
                }
                var s = t.seriesTaskMap || (t.seriesTaskMap = z()), n = r.seriesType, l = r.getTargetSeries;
                r.createOnAllSeries ? a.eachRawSeries(e) : n ? a.eachRawSeriesByType(n, e) : l && l(a, o).each(e);
                var u = i._pipelineMap;
                s.each(function(t, e) {
                    u.get(e) || (t.dispose(), s.removeKey(e));
                });
            }(this, t, e, i, r), t.overallReset && function(i, t, e, n, r) {
                function a(t) {
                    var e = t.uid, n = s.get(e);
                    n || (n = s.set(e, Mr({
                        reset: Hr,
                        onDirty: jr
                    })), o.dirty()), n.context = {
                        model: t,
                        overallProgress: h,
                        modifyOutputEnd: c
                    }, n.agent = o, n.__block = h, $r(i, t, n);
                }
                var o = e.overallTask = e.overallTask || Mr({
                    reset: Wr
                });
                o.context = {
                    ecModel: n,
                    api: r,
                    overallReset: t.overallReset,
                    scheduler: i
                };
                var s = o.agentStubMap = o.agentStubMap || z(), l = t.seriesType, u = t.getTargetSeries, h = !0, c = t.modifyOutputEnd;
                l ? n.eachRawSeriesByType(l, a) : u ? u(n, r).each(a) : (h = !1, R(n.getSeries(), a));
                var d = i._pipelineMap;
                s.each(function(t, e) {
                    d.get(e) || (t.dispose(), o.dirty(), s.removeKey(e));
                });
            }(this, t, e, i, r);
        }, this);
    }, cf.prepareView = function(t, e, n, i) {
        var r = t.renderTask, a = r.context;
        a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, 
        $r(this, e, r);
    }, cf.performDataProcessorTasks = function(t, e) {
        Gr(this, this._dataProcessorHandlers, t, e, {
            block: !0
        });
    }, cf.performVisualTasks = function(t, e, n) {
        Gr(this, this._visualHandlers, t, e, n);
    }, cf.performSeriesTasks = function(t) {
        var e;
        t.eachSeries(function(t) {
            e |= t.dataTask.perform();
        }), this.unfinished |= e;
    }, cf.plan = function() {
        this._pipelineMap.each(function(t) {
            var e = t.tail;
            do {
                if (e.__block) {
                    t.blockIndex = e.__idxInPipeline;
                    break;
                }
                e = e.getUpstream();
            } while (e);
        });
    };
    var df = cf.updatePayload = function(t, e) {
        "remain" !== e && (t.context.payload = e);
    }, ff = Yr(0);
    Vr.wrapStageHandler = function(t, e) {
        return _(t) && (t = {
            overallReset: t,
            seriesType: function(t) {
                pf = null;
                try {
                    t(gf, mf);
                } catch (t) {}
                return pf;
            }(t)
        }), t.uid = bi("stageHandler"), e && (t.visualType = e), t;
    };
    var pf, gf = {}, mf = {};
    Kr(gf, Td), Kr(mf, nr), gf.eachSeriesByType = gf.eachRawSeriesByType = function(t) {
        pf = t;
    }, gf.eachComponent = function(t) {
        "series" === t.mainType && t.subType && (pf = t.subType);
    };
    var vf = [ "#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF" ], yf = {
        color: vf,
        colorLayer: [ [ "#37A2DA", "#ffd85c", "#fd7b5f" ], [ "#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5" ], [ "#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF" ], vf ]
    }, _f = "#eee", xf = function() {
        return {
            axisLine: {
                lineStyle: {
                    color: _f
                }
            },
            axisTick: {
                lineStyle: {
                    color: _f
                }
            },
            axisLabel: {
                textStyle: {
                    color: _f
                }
            },
            splitLine: {
                lineStyle: {
                    type: "dashed",
                    color: "#aaa"
                }
            },
            splitArea: {
                areaStyle: {
                    color: _f
                }
            }
        };
    }, wf = [ "#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42" ], bf = {
        color: wf,
        backgroundColor: "#333",
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: _f
                },
                crossStyle: {
                    color: _f
                }
            }
        },
        legend: {
            textStyle: {
                color: _f
            }
        },
        textStyle: {
            color: _f
        },
        title: {
            textStyle: {
                color: _f
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: _f
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: _f
            }
        },
        visualMap: {
            textStyle: {
                color: _f
            }
        },
        timeline: {
            lineStyle: {
                color: _f
            },
            itemStyle: {
                normal: {
                    color: wf[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: _f
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: _f,
                    borderColor: _f
                }
            }
        },
        timeAxis: xf(),
        logAxis: xf(),
        valueAxis: xf(),
        categoryAxis: xf(),
        line: {
            symbol: "circle"
        },
        graph: {
            color: wf
        },
        gauge: {
            title: {
                textStyle: {
                    color: _f
                }
            }
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: "#FD1050",
                    color0: "#0CF49B",
                    borderColor: "#FD1050",
                    borderColor0: "#0CF49B"
                }
            }
        }
    };
    bf.categoryAxis.splitLine.show = !1, dd.extend({
        type: "dataset",
        defaultOption: {
            seriesLayoutBy: Md,
            sourceHeader: null,
            dimensions: null,
            source: null
        },
        optionUpdated: function() {
            !function(t) {
                var e = t.option.source, n = bd;
                if (x(e)) n = Sd; else if (A(e)) for (var i = 0, r = e.length; i < r; i++) {
                    var a = e[i];
                    if (null != a) {
                        if (A(a)) {
                            n = _d;
                            break;
                        }
                        if (M(a)) {
                            n = xd;
                            break;
                        }
                    }
                } else if (M(e)) {
                    for (var o in e) if (e.hasOwnProperty(o) && N(e[o])) {
                        n = wd;
                        break;
                    }
                } else if (null != e) throw new Error("Invalid data");
                Dd(t).sourceFormat = n;
            }(this);
        }
    }), Jd.extend({
        type: "dataset"
    });
    var Sf = c, Mf = R, If = _, Df = M, Cf = dd.parseClassType, Tf = {
        PROCESSOR: {
            FILTER: 1e3,
            STATISTIC: 5e3
        },
        VISUAL: {
            LAYOUT: 1e3,
            GLOBAL: 2e3,
            CHART: 3e3,
            COMPONENT: 4e3,
            BRUSH: 5e3
        }
    }, kf = "__flagInMainProcess", Af = "__optionUpdated", Lf = /^[a-zA-Z0-9_]+$/;
    Jr.prototype.on = Qr("on"), Jr.prototype.off = Qr("off"), Jr.prototype.one = Qr("one"), 
    r(Jr, Cl);
    var Pf = ta.prototype;
    Pf._onframe = function() {
        if (!this._disposed) {
            var t = this._scheduler;
            if (this[Af]) {
                var e = this[Af].silent;
                this[kf] = !0, na(this), Of.update.call(this), this[kf] = !1, this[Af] = !1, oa.call(this, e), 
                sa.call(this, e);
            } else if (t.unfinished) {
                var n = 1, i = this._model;
                this._api;
                t.unfinished = !1;
                do {
                    var r = +new Date();
                    t.performSeriesTasks(i), t.performDataProcessorTasks(i), ra(this, i), t.performVisualTasks(i), 
                    ca(this, this._model, 0, "remain"), n -= +new Date() - r;
                } while (0 < n && t.unfinished);
                t.unfinished || this._zr.flush();
            }
        }
    }, Pf.getDom = function() {
        return this._dom;
    }, Pf.getZr = function() {
        return this._zr;
    }, Pf.setOption = function(t, e, n) {
        var i;
        if (Df(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[kf] = !0, !this._model || e) {
            var r = new rr(this._api), a = this._theme, o = this._model = new Td(null, null, a, r);
            o.scheduler = this._scheduler, o.init(null, null, a, r);
        }
        this._model.setOption(t, Bf), n ? (this[Af] = {
            silent: i
        }, this[kf] = !1) : (na(this), Of.update.call(this), this._zr.flush(), this[Af] = !1, 
        this[kf] = !1, oa.call(this, i), sa.call(this, i));
    }, Pf.setTheme = function() {
        console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    }, Pf.getModel = function() {
        return this._model;
    }, Pf.getOption = function() {
        return this._model && this._model.getOption();
    }, Pf.getWidth = function() {
        return this._zr.getWidth();
    }, Pf.getHeight = function() {
        return this._zr.getHeight();
    }, Pf.getDevicePixelRatio = function() {
        return this._zr.painter.dpr || window.devicePixelRatio || 1;
    }, Pf.getRenderedCanvas = function(t) {
        if (al.canvasSupported) return (t = t || {}).pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor"), 
        this._zr.painter.getRenderedCanvas(t);
    }, Pf.getSvgDataUrl = function() {
        if (al.svgSupported) {
            var t = this._zr;
            return R(t.storage.getDisplayList(), function(t) {
                t.stopAnimation(!0);
            }), t.painter.pathToDataUrl();
        }
    }, Pf.getDataURL = function(t) {
        var e = (t = t || {}).excludeComponents, n = this._model, i = [], r = this;
        Mf(e, function(t) {
            n.eachComponent({
                mainType: t
            }, function(t) {
                var e = r._componentsMap[t.__viewId];
                e.group.ignore || (i.push(e), e.group.ignore = !0);
            });
        });
        var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
        return Mf(i, function(t) {
            t.group.ignore = !1;
        }), a;
    }, Pf.getConnectedDataURL = function(i) {
        if (al.canvasSupported) {
            var r = this.group, a = Math.min, o = Math.max;
            if (qf[r]) {
                var s = 1 / 0, l = 1 / 0, u = -1 / 0, h = -1 / 0, c = [], n = i && i.pixelRatio || 1;
                R(Hf, function(t) {
                    if (t.group === r) {
                        var e = t.getRenderedCanvas(b(i)), n = t.getDom().getBoundingClientRect();
                        s = a(n.left, s), l = a(n.top, l), u = o(n.right, u), h = o(n.bottom, h), c.push({
                            dom: e,
                            left: n.left,
                            top: n.top
                        });
                    }
                });
                var t = (u *= n) - (s *= n), e = (h *= n) - (l *= n), d = ml();
                d.width = t, d.height = e;
                var f = He(d);
                return Mf(c, function(t) {
                    var e = new Pe({
                        style: {
                            x: t.left * n - s,
                            y: t.top * n - l,
                            image: t.dom
                        }
                    });
                    f.add(e);
                }), f.refreshImmediately(), d.toDataURL("image/" + (i && i.type || "png"));
            }
            return this.getDataURL(i);
        }
    }, Pf.convertToPixel = y(ea, "convertToPixel"), Pf.convertFromPixel = y(ea, "convertFromPixel"), 
    Pf.containPixel = function(t, r) {
        var a;
        return R(t = Qe(this._model, t), function(t, i) {
            0 <= i.indexOf("Models") && R(t, function(t) {
                var e = t.coordinateSystem;
                if (e && e.containPoint) a |= !!e.containPoint(r); else if ("seriesModels" === i) {
                    var n = this._chartsMap[t.__viewId];
                    n && n.containPoint && (a |= n.containPoint(r, t));
                }
            }, this);
        }, this), !!a;
    }, Pf.getVisual = function(t, e) {
        var n = (t = Qe(this._model, t, {
            defaultMainType: "series"
        })).seriesModel.getData(), i = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? n.indexOfRawIndex(t.dataIndex) : null;
        return null != i ? n.getItemVisual(i, e) : n.getVisual(e);
    }, Pf.getViewOfComponentModel = function(t) {
        return this._componentsMap[t.__viewId];
    }, Pf.getViewOfSeriesModel = function(t) {
        return this._chartsMap[t.__viewId];
    };
    var Of = {
        prepareAndUpdate: function(t) {
            na(this), Of.update.call(this, t);
        },
        update: function(t) {
            var e = this._model, n = this._api, i = this._zr, r = this._coordSysMgr, a = this._scheduler;
            if (e) {
                a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), 
                ra(this, e), r.update(e, n), ua(e), a.performVisualTasks(e, t), ha(this, e, n, t);
                var o = e.get("backgroundColor") || "transparent";
                if (al.canvasSupported) i.setBackgroundColor(o); else {
                    var s = bt(o);
                    o = Tt(s, "rgb"), 0 === s[3] && (o = "transparent");
                }
                da(e, n);
            }
        },
        updateTransform: function(r) {
            var a = this._model, o = this, s = this._api;
            if (a) {
                var l = [];
                a.eachComponent(function(t, e) {
                    var n = o.getViewOfComponentModel(e);
                    if (n && n.__alive) if (n.updateTransform) {
                        var i = n.updateTransform(e, a, s, r);
                        i && i.update && l.push(n);
                    } else l.push(n);
                });
                var i = z();
                a.eachSeries(function(t) {
                    var e = o._chartsMap[t.__viewId];
                    if (e.updateTransform) {
                        var n = e.updateTransform(t, a, s, r);
                        n && n.update && i.set(t.uid, 1);
                    } else i.set(t.uid, 1);
                }), ua(a), this._scheduler.performVisualTasks(a, r, {
                    setDirty: !0,
                    dirtyMap: i
                }), ca(o, a, 0, r, i), da(a, this._api);
            }
        },
        updateView: function(t) {
            var e = this._model;
            e && (Nr.markUpdateMethod(t, "updateView"), ua(e), this._scheduler.performVisualTasks(e, t, {
                setDirty: !0
            }), ha(this, this._model, this._api, t), da(e, this._api));
        },
        updateVisual: function(t) {
            Of.update.call(this, t);
        },
        updateLayout: function(t) {
            Of.update.call(this, t);
        }
    };
    Pf.resize = function(t) {
        this._zr.resize(t);
        var e = this._model;
        if (this._loadingFX && this._loadingFX.resize(), e) {
            var n = e.resetOption("media"), i = t && t.silent;
            this[kf] = !0, n && na(this), Of.update.call(this), this[kf] = !1, oa.call(this, i), 
            sa.call(this, i);
        }
    }, Pf.showLoading = function(t, e) {
        if (Df(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Wf[t]) {
            var n = Wf[t](this._api, e), i = this._zr;
            this._loadingFX = n, i.add(n);
        }
    }, Pf.hideLoading = function() {
        this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
    }, Pf.makeActionFromEvent = function(t) {
        var e = k({}, t);
        return e.type = zf[t.type], e;
    }, Pf.dispatchAction = function(t, e) {
        if (Df(e) || (e = {
            silent: !!e
        }), Ef[t.type] && this._model) {
            if (this[kf]) return void this._pendingActions.push(t);
            aa.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : !1 !== e.flush && al.browser.weChat && this._throttledZrFlush(), 
            oa.call(this, e.silent), sa.call(this, e.silent);
        }
    }, Pf.appendData = function(t) {
        var e = t.seriesIndex;
        this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0;
    }, Pf.on = Qr("on"), Pf.off = Qr("off"), Pf.one = Qr("one");
    var Nf = [ "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu" ];
    Pf._initEvents = function() {
        Mf(Nf, function(a) {
            this._zr.on(a, function(t) {
                var e, n = this.getModel(), i = t.target;
                if ("globalout" === a) e = {}; else if (i && null != i.dataIndex) {
                    var r = i.dataModel || n.getSeriesByIndex(i.seriesIndex);
                    e = r && r.getDataParams(i.dataIndex, i.dataType) || {};
                } else i && i.eventData && (e = k({}, i.eventData));
                e && (e.event = t, e.type = a, this.trigger(a, e));
            }, this);
        }, this), Mf(zf, function(t, e) {
            this._messageCenter.on(e, function(t) {
                this.trigger(e, t);
            }, this);
        }, this);
    }, Pf.isDisposed = function() {
        return this._disposed;
    }, Pf.clear = function() {
        this.setOption({
            series: []
        }, !0);
    }, Pf.dispose = function() {
        if (!this._disposed) {
            this._disposed = !0, tn(this.getDom(), Xf, "");
            var e = this._api, n = this._model;
            Mf(this._componentsViews, function(t) {
                t.dispose(n, e);
            }), Mf(this._chartsViews, function(t) {
                t.dispose(n, e);
            }), this._zr.dispose(), delete Hf[this.id];
        }
    }, r(ta, Cl);
    var Ef = {}, zf = {}, Rf = [], Bf = [], Ff = [], Vf = [], Gf = {}, Wf = {}, Hf = {}, qf = {}, jf = new Date() - 0, Uf = new Date() - 0, Xf = "_echarts_instance_", Yf = {}, Zf = pa;
    wa(2e3, sf), va(Wd), ya(5e3, function(t) {
        var a = z();
        t.eachSeries(function(t) {
            var e = t.get("stack");
            if (e) {
                var n = a.get(e) || a.set(e, []), i = t.getData(), r = {
                    stackResultDimension: i.getCalculationInfo("stackResultDimension"),
                    stackedOverDimension: i.getCalculationInfo("stackedOverDimension"),
                    stackedDimension: i.getCalculationInfo("stackedDimension"),
                    stackedByDimension: i.getCalculationInfo("stackedByDimension"),
                    isStackedByIndex: i.getCalculationInfo("isStackedByIndex"),
                    data: i,
                    seriesModel: t
                };
                if (!r.stackedDimension || !r.isStackedByIndex && !r.stackedByDimension) return;
                n.length && i.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), 
                n.push(r);
            }
        }), a.each(pr);
    }), Sa("default", function(i, t) {
        C(t = t || {}, {
            text: "loading",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0
        });
        var r = new Mc({
            style: {
                fill: t.maskColor
            },
            zlevel: t.zlevel,
            z: 1e4
        }), a = new Tc({
            shape: {
                startAngle: -hf / 2,
                endAngle: -hf / 2 + .1,
                r: 10
            },
            style: {
                stroke: t.color,
                lineCap: "round",
                lineWidth: 5
            },
            zlevel: t.zlevel,
            z: 10001
        }), o = new Mc({
            style: {
                fill: "none",
                text: t.text,
                textPosition: "right",
                textDistance: 10,
                textFill: t.textColor
            },
            zlevel: t.zlevel,
            z: 10001
        });
        a.animateShape(!0).when(1e3, {
            endAngle: 3 * hf / 2
        }).start("circularInOut"), a.animateShape(!0).when(1e3, {
            startAngle: 3 * hf / 2
        }).delay(300).start("circularInOut");
        var e = new hu();
        return e.add(a), e.add(o), e.add(r), e.resize = function() {
            var t = i.getWidth() / 2, e = i.getHeight() / 2;
            a.setShape({
                cx: t,
                cy: e
            });
            var n = a.shape.r;
            o.setShape({
                x: t - n,
                y: e - n,
                width: 2 * n,
                height: 2 * n
            }), r.setShape({
                x: 0,
                y: 0,
                width: i.getWidth(),
                height: i.getHeight()
            });
        }, e.resize(), e;
    }), _a({
        type: "highlight",
        event: "highlight",
        update: "highlight"
    }, B), _a({
        type: "downplay",
        event: "downplay",
        update: "downplay"
    }, B), ma("light", yf), ma("dark", bf);
    ka.prototype = {
        constructor: ka,
        add: function(t) {
            return this._add = t, this;
        },
        update: function(t) {
            return this._update = t, this;
        },
        remove: function(t) {
            return this._remove = t, this;
        },
        execute: function() {
            var t = this._old, e = this._new, n = {}, i = [], r = [];
            for (Aa(t, {}, i, "_oldKeyGetter", this), Aa(e, n, r, "_newKeyGetter", this), a = 0; a < t.length; a++) {
                if (null != (s = n[o = i[a]])) (u = s.length) ? (1 === u && (n[o] = null), s = s.unshift()) : n[o] = null, 
                this._update && this._update(s, a); else this._remove && this._remove(a);
            }
            for (var a = 0; a < r.length; a++) {
                var o = r[a];
                if (n.hasOwnProperty(o)) {
                    var s;
                    if (null == (s = n[o])) continue;
                    if (s.length) for (var l = 0, u = s.length; l < u; l++) this._add && this._add(s[l]); else this._add && this._add(s);
                }
            }
        }
    };
    var $f = z([ "tooltip", "label", "itemName", "itemId", "seriesName" ]), Kf = M, Qf = "undefined", Jf = {
        float: ("undefined" == typeof Float64Array ? "undefined" : _typeof(Float64Array)) === Qf ? Array : Float64Array,
        int: ("undefined" == typeof Int32Array ? "undefined" : _typeof(Int32Array)) === Qf ? Array : Int32Array,
        ordinal: Array,
        number: Array,
        time: Array
    }, tp = ("undefined" == typeof Uint32Array ? "undefined" : _typeof(Uint32Array)) === Qf ? Array : Uint32Array, ep = ("undefined" == typeof Uint16Array ? "undefined" : _typeof(Uint16Array)) === Qf ? Array : Uint16Array, np = [ "hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx" ], ip = [ "_extent", "_approximateExtent", "_rawExtent" ], rp = function(t, e) {
        t = t || [ "x", "y" ];
        for (var n = {}, i = [], r = {}, a = 0; a < t.length; a++) {
            var o = t[a];
            S(o) && (o = {
                name: o
            });
            var s = o.name;
            o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), 
            o.otherDims = o.otherDims || {}, i.push(s), (n[s] = o).index = a, o.createInvertedIndices && (r[s] = []);
        }
        this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, 
        this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], 
        this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, 
        this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], 
        this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, 
        this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = function(a) {
            var t = {}, o = t.encode = {}, s = z(), l = [], u = [];
            R(a.dimensions, function(t) {
                var e, r = a.getDimensionInfo(t), n = r.coordDim;
                if (n) {
                    var i = o[n];
                    o.hasOwnProperty(n) || (i = o[n] = []), i[r.coordDimIndex] = t, r.isExtraCoord || (s.set(n, 1), 
                    !("ordinal" === (e = r.type) || "time" === e) && (l[0] = t)), r.defaultTooltip && u.push(t);
                }
                $f.each(function(t, e) {
                    var n = o[e];
                    o.hasOwnProperty(e) || (n = o[e] = []);
                    var i = r.otherDims[e];
                    null != i && !1 !== i && (n[i] = r.name);
                });
            });
            var i = [], r = {};
            s.each(function(t, e) {
                var n = o[e];
                r[e] = n[0], i = i.concat(n);
            }), t.dataDimsOnCoord = i, t.encodeFirstDimNotExtra = r;
            var e = o.label;
            e && e.length && (l = e.slice());
            var n = o.tooltip;
            return n && n.length ? u = n.slice() : u.length || (u = l.slice()), o.defaultedLabel = l, 
            o.defaultedTooltip = u, t;
        }(this), this._invertedIndicesMap = r, this._calculationInfo = {};
    }, ap = rp.prototype;
    ap.type = "list", ap.hasItemOption = !0, ap.getDimension = function(t) {
        return isNaN(t) || (t = this.dimensions[t] || t), t;
    }, ap.getDimensionInfo = function(t) {
        return this._dimensionInfos[this.getDimension(t)];
    }, ap.getDimensionsOnCoord = function() {
        return this._dimensionsSummary.dataDimsOnCoord.slice();
    }, ap.mapDimension = function(t, e) {
        var n = this._dimensionsSummary;
        if (null == e) return n.encodeFirstDimNotExtra[t];
        var i = n.encode[t];
        return !0 === e ? (i || []).slice() : i && i[e];
    }, ap.initData = function(t, e, n) {
        (Yi.isInstance(t) || N(t)) && (t = new gr(t, this.dimensions.length)), this._rawData = t, 
        this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], 
        this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = Ud[this._rawData.getSource().sourceFormat], 
        this._dimValueGetter = n = n || this.defaultDimValueGetter, this._rawExtent = {}, 
        this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1);
    }, ap.getProvider = function() {
        return this._rawData;
    }, ap.appendData = function(t) {
        var e = this._rawData, n = this.count();
        e.appendData(t);
        var i = e.count();
        e.persistent || (i += n), this._initDataFromProvider(n, i);
    }, ap._initDataFromProvider = function(t, e) {
        if (!(e <= t)) {
            for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, u = this._nameList, h = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = f - 1, g = 0; g < s; g++) {
                c[D = o[g]] || (c[D] = [ 1 / 0, -1 / 0 ]);
                var m = l[D];
                0 === m.otherDims.itemName && (n = this._nameDimIdx = g), 0 === m.otherDims.itemId && (this._idDimIdx = g);
                var v = Jf[m.type];
                a[D] || (a[D] = []);
                var y = a[D][p];
                if (y && y.length < i) {
                    for (var _ = new v(Math.min(e - p * i, i)), x = 0; x < y.length; x++) _[x] = y[x];
                    a[D][p] = _;
                }
                for (var w = f * i; w < e; w += i) a[D].push(new v(Math.min(e - w, i)));
                this._chunkCount = a[D].length;
            }
            for (var b = new Array(s), S = t; S < e; S++) {
                b = r.getItem(S, b);
                var M = Math.floor(S / i), I = S % i;
                for (w = 0; w < s; w++) {
                    var D, C = a[D = o[w]][M], T = this._dimValueGetter(b, D, S, w);
                    C[I] = T;
                    var k = c[D];
                    T < k[0] && (k[0] = T), T > k[1] && (k[1] = T);
                }
                if (!r.pure) {
                    var A = u[S];
                    if (b && null == A) if (null != b.name) u[S] = A = b.name; else if (null != n) {
                        var L = o[n], P = a[L][M];
                        if (P) {
                            A = P[I];
                            var O = l[L].ordinalMeta;
                            O && O.categories.length && (A = O.categories[A]);
                        }
                    }
                    var N = null == b ? null : b.id;
                    null == N && null != A && (d[A] = d[A] || 0, 0 < d[N = A] && (N += "__ec__" + d[A]), 
                    d[A]++), null != N && (h[S] = N);
                }
            }
            !r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, 
            R(z = (E = this)._invertedIndicesMap, function(t, e) {
                var n = E._dimensionInfos[e].ordinalMeta;
                if (n) {
                    t = z[e] = new tp(n.categories.length);
                    for (var i = 0; i < t.length; i++) t[i] = NaN;
                    for (i = 0; i < E._count; i++) t[E.get(e, i)] = i;
                }
            });
        }
        var E, z;
    }, ap.count = function() {
        return this._count;
    }, ap.getIndices = function() {
        var t = this._indices;
        if (t) {
            var e = t.constructor, n = this._count;
            if (e === Array) {
                r = new e(n);
                for (var i = 0; i < n; i++) r[i] = t[i];
            } else r = new e(t.buffer, 0, n);
        } else {
            var r = new (e = La(this))(this.count());
            for (i = 0; i < r.length; i++) r[i] = i;
        }
        return r;
    }, ap.get = function(t, e) {
        if (!(0 <= e && e < this._count)) return NaN;
        var n = this._storage;
        if (!n[t]) return NaN;
        e = this.getRawIndex(e);
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize;
        return n[t][i][r];
    }, ap.getByRawIndex = function(t, e) {
        if (!(0 <= e && e < this._rawCount)) return NaN;
        var n = this._storage[t];
        if (!n) return NaN;
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize;
        return n[i][r];
    }, ap._getFast = function(t, e) {
        var n = Math.floor(e / this._chunkSize), i = e % this._chunkSize;
        return this._storage[t][n][i];
    }, ap.getValues = function(t, e) {
        var n = [];
        A(t) || (e = t, t = this.dimensions);
        for (var i = 0, r = t.length; i < r; i++) n.push(this.get(t[i], e));
        return n;
    }, ap.hasValue = function(t) {
        for (var e = this._dimensionsSummary.dataDimsOnCoord, n = this._dimensionInfos, i = 0, r = e.length; i < r; i++) if ("ordinal" !== n[e[i]].type && isNaN(this.get(e[i], t))) return !1;
        return !0;
    }, ap.getDataExtent = function(t) {
        t = this.getDimension(t);
        var e = [ 1 / 0, -1 / 0 ];
        if (!this._storage[t]) return e;
        var n, i = this.count();
        if (!this._indices) return this._rawExtent[t].slice();
        if (n = this._extent[t]) return n.slice();
        for (var r = (n = e)[0], a = n[1], o = 0; o < i; o++) {
            var s = this._getFast(t, this.getRawIndex(o));
            s < r && (r = s), a < s && (a = s);
        }
        return n = [ r, a ], this._extent[t] = n;
    }, ap.getApproximateExtent = function(t) {
        return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t);
    }, ap.setApproximateExtent = function(t, e) {
        e = this.getDimension(e), this._approximateExtent[e] = t.slice();
    }, ap.getCalculationInfo = function(t) {
        return this._calculationInfo[t];
    }, ap.setCalculationInfo = function(t, e) {
        Kf(t) ? k(this._calculationInfo, t) : this._calculationInfo[t] = e;
    }, ap.getSum = function(t) {
        var e = 0;
        if (this._storage[t]) for (var n = 0, i = this.count(); n < i; n++) {
            var r = this.get(t, n);
            isNaN(r) || (e += r);
        }
        return e;
    }, ap.getMedian = function(t) {
        var e = [];
        this.each(t, function(t) {
            isNaN(t) || e.push(t);
        });
        var n = [].concat(e).sort(function(t, e) {
            return t - e;
        }), i = this.count();
        return 0 === i ? 0 : i % 2 == 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
    }, ap.rawIndexOf = function(t, e) {
        var n = (t && this._invertedIndicesMap[t])[e];
        return null == n || isNaN(n) ? -1 : n;
    }, ap.indexOfName = function(t) {
        for (var e = 0, n = this.count(); e < n; e++) if (this.getName(e) === t) return e;
        return -1;
    }, ap.indexOfRawIndex = function(t) {
        if (!this._indices) return t;
        if (t >= this._rawCount || t < 0) return -1;
        var e = this._indices, n = e[t];
        if (null != n && n < this._count && n === t) return t;
        for (var i = 0, r = this._count - 1; i <= r; ) {
            var a = (i + r) / 2 | 0;
            if (e[a] < t) i = a + 1; else {
                if (!(e[a] > t)) return a;
                r = a - 1;
            }
        }
        return -1;
    }, ap.indicesOfNearest = function(t, e, n) {
        var i = [];
        if (!this._storage[t]) return i;
        null == n && (n = 1 / 0);
        for (var r = Number.MAX_VALUE, a = -1, o = 0, s = this.count(); o < s; o++) {
            var l = e - this.get(t, o), u = Math.abs(l);
            l <= n && u <= r && ((u < r || 0 <= l && a < 0) && (r = u, a = l, i.length = 0), 
            i.push(o));
        }
        return i;
    }, ap.getRawIndex = Na, ap.getRawDataItem = function(t) {
        if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
        for (var e = [], n = 0; n < this.dimensions.length; n++) {
            var i = this.dimensions[n];
            e.push(this.get(i, t));
        }
        return e;
    }, ap.getName = function(t) {
        var e = this.getRawIndex(t);
        return this._nameList[e] || Oa(this, this._nameDimIdx, e) || "";
    }, ap.getId = function(t) {
        return za(this, this.getRawIndex(t));
    }, ap.each = function(t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
            for (var r = (t = T(Ra(t), this.getDimension, this)).length, a = 0; a < this.count(); a++) switch (r) {
              case 0:
                e.call(n, a);
                break;

              case 1:
                e.call(n, this.get(t[0], a), a);
                break;

              case 2:
                e.call(n, this.get(t[0], a), this.get(t[1], a), a);
                break;

              default:
                for (var o = 0, s = []; o < r; o++) s[o] = this.get(t[o], a);
                s[o] = a, e.apply(n, s);
            }
        }
    }, ap.filterSelf = function(t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = T(Ra(t), this.getDimension, this);
            for (var r = this.count(), a = new (La(this))(r), o = [], s = t.length, l = 0, u = t[0], h = 0; h < r; h++) {
                var c, d = this.getRawIndex(h);
                if (0 === s) c = e.call(n, h); else if (1 === s) {
                    var f = this._getFast(u, d);
                    c = e.call(n, f, h);
                } else {
                    for (var p = 0; p < s; p++) o[p] = this._getFast(u, d);
                    o[p] = h, c = e.apply(n, o);
                }
                c && (a[l++] = d);
            }
            return l < r && (this._indices = a), this._count = l, this._extent = {}, this.getRawIndex = this._indices ? Ea : Na, 
            this;
        }
    }, ap.selectRange = function(t) {
        if (this._count) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            var i = e.length;
            if (i) {
                var r = this.count(), a = new (La(this))(r), o = 0, s = e[0], l = t[s][0], u = t[s][1], h = !1;
                if (!this._indices) {
                    var c = 0;
                    if (1 === i) {
                        for (var d = this._storage[e[0]], f = 0; f < this._chunkCount; f++) for (var p = d[f], g = Math.min(this._count - f * this._chunkSize, this._chunkSize), m = 0; m < g; m++) {
                            (l <= (w = p[m]) && w <= u || isNaN(w)) && (a[o++] = c), c++;
                        }
                        h = !0;
                    } else if (2 === i) {
                        d = this._storage[s];
                        var v = this._storage[e[1]], y = t[e[1]][0], _ = t[e[1]][1];
                        for (f = 0; f < this._chunkCount; f++) {
                            p = d[f];
                            var x = v[f];
                            for (g = Math.min(this._count - f * this._chunkSize, this._chunkSize), m = 0; m < g; m++) {
                                var w = p[m], b = x[m];
                                (l <= w && w <= u || isNaN(w)) && (y <= b && b <= _ || isNaN(b)) && (a[o++] = c), 
                                c++;
                            }
                        }
                        h = !0;
                    }
                }
                if (!h) if (1 === i) for (m = 0; m < r; m++) {
                    var S = this.getRawIndex(m);
                    (l <= (w = this._getFast(s, S)) && w <= u || isNaN(w)) && (a[o++] = S);
                } else for (m = 0; m < r; m++) {
                    var M = !0;
                    for (S = this.getRawIndex(m), f = 0; f < i; f++) {
                        var I = e[f];
                        ((w = this._getFast(n, S)) < t[I][0] || w > t[I][1]) && (M = !1);
                    }
                    M && (a[o++] = this.getRawIndex(m));
                }
                return o < r && (this._indices = a), this._count = o, this._extent = {}, this.getRawIndex = this._indices ? Ea : Na, 
                this;
            }
        }
    }, ap.mapArray = function(t, e, n, i) {
        "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
        var r = [];
        return this.each(t, function() {
            r.push(e && e.apply(this, arguments));
        }, n), r;
    }, ap.map = function(t, e, n, i) {
        n = n || i || this;
        var r = Ba(this, t = T(Ra(t), this.getDimension, this));
        r._indices = this._indices, r.getRawIndex = r._indices ? Ea : Na;
        for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, u = this.count(), h = [], c = r._rawExtent, d = 0; d < u; d++) {
            for (var f = 0; f < l; f++) h[f] = this.get(t[f], d);
            h[l] = d;
            var p = e && e.apply(n, h);
            if (null != p) {
                "object" != (void 0 === p ? "undefined" : _typeof(p)) && (o[0] = p, p = o);
                for (var g = this.getRawIndex(d), m = Math.floor(g / s), v = g % s, y = 0; y < p.length; y++) {
                    var _ = t[y], x = p[y], w = c[_], b = a[_];
                    b && (b[m][v] = x), x < w[0] && (w[0] = x), x > w[1] && (w[1] = x);
                }
            }
        }
        return r;
    }, ap.downSample = function(t, e, n, i) {
        for (var r = Ba(this, [ t ]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], u = this.count(), h = this._chunkSize, c = r._rawExtent[t], d = new (La(this))(u), f = 0, p = 0; p < u; p += s) {
            u - p < s && (s = u - p, o.length = s);
            for (var g = 0; g < s; g++) {
                var m = this.getRawIndex(p + g), v = Math.floor(m / h), y = m % h;
                o[g] = l[v][y];
            }
            var _ = n(o), x = this.getRawIndex(Math.min(p + i(o, _) || 0, u - 1)), w = x % h;
            (l[Math.floor(x / h)][w] = _) < c[0] && (c[0] = _), _ > c[1] && (c[1] = _), d[f++] = x;
        }
        return r._count = f, r._indices = d, r.getRawIndex = Ea, r;
    }, ap.getItemModel = function(t) {
        var e = this.hostModel;
        return new _i(this.getRawDataItem(t), e, e && e.ecModel);
    }, ap.diff = function(e) {
        var n = this;
        return new ka(e ? e.getIndices() : [], this.getIndices(), function(t) {
            return za(e, t);
        }, function(t) {
            return za(n, t);
        });
    }, ap.getVisual = function(t) {
        var e = this._visual;
        return e && e[t];
    }, ap.setVisual = function(t, e) {
        if (Kf(t)) for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]); else this._visual = this._visual || {}, 
        this._visual[t] = e;
    }, ap.setLayout = function(t, e) {
        if (Kf(t)) for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]); else this._layout[t] = e;
    }, ap.getLayout = function(t) {
        return this._layout[t];
    }, ap.getItemLayout = function(t) {
        return this._itemLayouts[t];
    }, ap.setItemLayout = function(t, e, n) {
        this._itemLayouts[t] = n ? k(this._itemLayouts[t] || {}, e) : e;
    }, ap.clearItemLayouts = function() {
        this._itemLayouts.length = 0;
    }, ap.getItemVisual = function(t, e, n) {
        var i = this._itemVisuals[t], r = i && i[e];
        return null != r || n ? r : this.getVisual(e);
    }, ap.setItemVisual = function(t, e, n) {
        var i = this._itemVisuals[t] || {}, r = this.hasItemVisual;
        if (this._itemVisuals[t] = i, Kf(e)) for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], 
        r[a] = !0); else i[e] = n, r[e] = !0;
    }, ap.clearAllVisual = function() {
        this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {};
    };
    var op = function(t) {
        t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType;
    };
    ap.setItemGraphicEl = function(t, e) {
        var n = this.hostModel;
        e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, 
        "group" === e.type && e.traverse(op, e)), this._graphicEls[t] = e;
    }, ap.getItemGraphicEl = function(t) {
        return this._graphicEls[t];
    }, ap.eachItemGraphicEl = function(n, i) {
        R(this._graphicEls, function(t, e) {
            t && n && n.call(i, t, e);
        });
    }, ap.cloneShallow = function(t) {
        if (!t) {
            var e = T(this.dimensions, this.getDimensionInfo, this);
            t = new rp(e, this.hostModel);
        }
        if (t._storage = this._storage, Pa(t, this), this._indices) {
            var n = this._indices.constructor;
            t._indices = new n(this._indices);
        } else t._indices = null;
        return t.getRawIndex = t._indices ? Ea : Na, t;
    }, ap.wrapMethod = function(t, e) {
        var n = this[t];
        "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], 
        this.__wrappedMethods.push(t), this[t] = function() {
            var t = n.apply(this, arguments);
            return e.apply(this, [ t ].concat(l(arguments)));
        });
    }, ap.TRANSFERABLE_METHODS = [ "cloneShallow", "downSample", "map" ], ap.CHANGABLE_METHODS = [ "filterSelf", "selectRange" ];
    var sp = function(t, e) {
        return Va((e = e || {}).coordDimensions || [], t, {
            dimsDef: e.dimensionsDefine || t.dimensionsDefine,
            encodeDef: e.encodeDefine || t.encodeDefine,
            dimCount: e.dimensionsCount,
            generateCoord: e.generateCoord,
            generateCoordCount: e.generateCoordCount
        });
    };
    Ua.prototype.parse = function(t) {
        return t;
    }, Ua.prototype.getSetting = function(t) {
        return this._setting[t];
    }, Ua.prototype.contain = function(t) {
        var e = this._extent;
        return t >= e[0] && t <= e[1];
    }, Ua.prototype.normalize = function(t) {
        var e = this._extent;
        return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);
    }, Ua.prototype.scale = function(t) {
        var e = this._extent;
        return t * (e[1] - e[0]) + e[0];
    }, Ua.prototype.unionExtent = function(t) {
        var e = this._extent;
        t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
    }, Ua.prototype.unionExtentFromData = function(t, e) {
        this.unionExtent(t.getApproximateExtent(e));
    }, Ua.prototype.getExtent = function() {
        return this._extent.slice();
    }, Ua.prototype.setExtent = function(t, e) {
        var n = this._extent;
        isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);
    }, Ua.prototype.isBlank = function() {
        return this._isBlank;
    }, Ua.prototype.setBlank = function(t) {
        this._isBlank = t;
    }, Ua.prototype.getLabel = null, nn(Ua), sn(Ua, {
        registerWhenExtend: !0
    }), Xa.createByAxisModel = function(t) {
        var e = t.option, n = e.data, i = n && T(n, Za);
        return new Xa({
            categories: i,
            needCollect: !i,
            deduplication: !1 !== e.dedplication
        });
    };
    var lp = Xa.prototype;
    lp.getOrdinal = function(t) {
        return Ya(this).get(t);
    }, lp.parseAndCollect = function(t) {
        var e, n = this._needCollect;
        if ("string" != typeof t && !n) return t;
        if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, 
        e;
        var i = Ya(this);
        return null == (e = i.get(t)) && (n ? (e = this.categories.length, this.categories[e] = t, 
        i.set(t, e)) : e = NaN), e;
    };
    var up = Ua.prototype, hp = Ua.extend({
        type: "ordinal",
        init: function(t, e) {
            (!t || A(t)) && (t = new Xa({
                categories: t
            })), this._ordinalMeta = t, this._extent = e || [ 0, t.categories.length - 1 ];
        },
        parse: function(t) {
            return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t);
        },
        contain: function(t) {
            return t = this.parse(t), up.contain.call(this, t) && null != this._ordinalMeta.categories[t];
        },
        normalize: function(t) {
            return up.normalize.call(this, this.parse(t));
        },
        scale: function(t) {
            return Math.round(up.scale.call(this, t));
        },
        getTicks: function() {
            for (var t = [], e = this._extent, n = e[0]; n <= e[1]; ) t.push(n), n++;
            return t;
        },
        getLabel: function(t) {
            return this.isBlank() ? void 0 : this._ordinalMeta.categories[t];
        },
        count: function() {
            return this._extent[1] - this._extent[0] + 1;
        },
        unionExtentFromData: function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        },
        getOrdinalMeta: function() {
            return this._ordinalMeta;
        },
        niceTicks: B,
        niceExtent: B
    });
    hp.create = function() {
        return new hp();
    };
    var cp = Ii, dp = Ii, fp = Ua.extend({
        type: "interval",
        _interval: 0,
        _intervalPrecision: 2,
        setExtent: function(t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
        },
        unionExtent: function(t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), fp.prototype.setExtent.call(this, e[0], e[1]);
        },
        getInterval: function() {
            return this._interval;
        },
        setInterval: function(t) {
            this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = $a(t);
        },
        getTicks: function() {
            return function(t, e, n, i) {
                var r = [];
                if (!t) return r;
                e[0] < n[0] && r.push(e[0]);
                for (var a = n[0]; a <= n[1] && (r.push(a), (a = cp(a + t, i)) !== r[r.length - 1]); ) if (1e4 < r.length) return [];
                return e[1] > (r.length ? r[r.length - 1] : n[1]) && r.push(e[1]), r;
            }(this._interval, this._extent, this._niceExtent, this._intervalPrecision);
        },
        getLabel: function(t, e) {
            if (null == t) return "";
            var n = e && e.precision;
            return null == n ? n = Ci(t) || 0 : "auto" === n && (n = this._intervalPrecision), 
            zi(t = dp(t, n, !0));
        },
        niceTicks: function(t, e, n) {
            t = t || 5;
            var i = this._extent, r = i[1] - i[0];
            if (isFinite(r)) {
                r < 0 && (r = -r, i.reverse());
                var a = function(t, e, n, i) {
                    var r = {}, a = t[1] - t[0], o = r.interval = Ei(a / e, !0);
                    null != n && o < n && (o = r.interval = n), null != i && i < o && (o = r.interval = i);
                    var s = r.intervalPrecision = $a(o);
                    return Qa(r.niceTickExtent = [ cp(Math.ceil(t[0] / o) * o, s), cp(Math.floor(t[1] / o) * o, s) ], t), 
                    r;
                }(i, t, e, n);
                this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent;
            }
        },
        niceExtent: function(t) {
            var e = this._extent;
            if (e[0] === e[1]) if (0 !== e[0]) {
                var n = e[0];
                t.fixMax || (e[1] += n / 2), e[0] -= n / 2;
            } else e[1] = 1;
            var i = e[1] - e[0];
            isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var r = this._interval;
            t.fixMin || (e[0] = dp(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = dp(Math.ceil(e[1] / r) * r));
        }
    });
    fp.create = function() {
        return new fp();
    };
    var pp = "__ec_stack_", gp = "undefined" != typeof Float32Array ? Float32Array : Array, mp = {
        seriesType: "bar",
        plan: ef(),
        reset: function(t) {
            if (ro(t) && ao(t)) {
                var e = t.getData(), s = t.coordinateSystem, l = s.getBaseAxis(), u = s.getOtherAxis(l), h = e.mapDimension(u.dim), c = e.mapDimension(l.dim), d = u.isHorizontal(), f = d ? 0 : 1, p = io(no([ t ]), l, t).width;
                return .5 < p || (p = .5), {
                    progress: function(t, e) {
                        for (var n, i = new gp(2 * t.count), r = [], a = [], o = 0; null != (n = t.next()); ) a[f] = e.get(h, n), 
                        a[1 - f] = e.get(c, n), r = s.dataToPoint(a, null, r), i[o++] = r[0], i[o++] = r[1];
                        e.setLayout({
                            largePoints: i,
                            barWidth: p,
                            valueAxisStart: oo(l, u, !1),
                            valueAxisHorizontal: d
                        });
                    }
                };
            }
        }
    }, vp = fp.prototype, yp = Math.ceil, _p = Math.floor, xp = 36e5, wp = 864e5, bp = fp.extend({
        type: "time",
        getLabel: function(t) {
            var e = this._stepLvl, n = new Date(t);
            return Gi(e[0], n, this.getSetting("useUTC"));
        },
        niceExtent: function(t) {
            var e = this._extent;
            if (e[0] === e[1] && (e[0] -= wp, e[1] += wp), e[1] === -1 / 0 && 1 / 0 === e[0]) {
                var n = new Date();
                e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - wp;
            }
            this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var i = this._interval;
            t.fixMin || (e[0] = Ii(_p(e[0] / i) * i)), t.fixMax || (e[1] = Ii(yp(e[1] / i) * i));
        },
        niceTicks: function(t, e, n) {
            t = t || 10;
            var i = this._extent, r = i[1] - i[0], a = r / t;
            null != e && a < e && (a = e), null != n && n < a && (a = n);
            var o = Sp.length, s = function(t, e, n, i) {
                for (;n < i; ) {
                    var r = n + i >>> 1;
                    t[r][1] < e ? n = r + 1 : i = r;
                }
                return n;
            }(Sp, a, 0, o), l = Sp[Math.min(s, o - 1)], u = l[1];
            "year" === l[0] && (u *= Ei(r / u / t, !0));
            var h = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3, c = [ Math.round(yp((i[0] - h) / u) * u + h), Math.round(_p((i[1] - h) / u) * u + h) ];
            Qa(c, i), this._stepLvl = l, this._interval = u, this._niceExtent = c;
        },
        parse: function(t) {
            return +Pi(t);
        }
    });
    R([ "contain", "normalize" ], function(e) {
        bp.prototype[e] = function(t) {
            return vp[e].call(this, this.parse(t));
        };
    });
    var Sp = [ [ "hh:mm:ss", 1e3 ], [ "hh:mm:ss", 5e3 ], [ "hh:mm:ss", 1e4 ], [ "hh:mm:ss", 15e3 ], [ "hh:mm:ss", 3e4 ], [ "hh:mm\nMM-dd", 6e4 ], [ "hh:mm\nMM-dd", 3e5 ], [ "hh:mm\nMM-dd", 6e5 ], [ "hh:mm\nMM-dd", 9e5 ], [ "hh:mm\nMM-dd", 18e5 ], [ "hh:mm\nMM-dd", xp ], [ "hh:mm\nMM-dd", 72e5 ], [ "hh:mm\nMM-dd", 6 * xp ], [ "hh:mm\nMM-dd", 432e5 ], [ "MM-dd\nyyyy", wp ], [ "MM-dd\nyyyy", 2 * wp ], [ "MM-dd\nyyyy", 3 * wp ], [ "MM-dd\nyyyy", 4 * wp ], [ "MM-dd\nyyyy", 5 * wp ], [ "MM-dd\nyyyy", 6 * wp ], [ "week", 7 * wp ], [ "MM-dd\nyyyy", 864e6 ], [ "week", 14 * wp ], [ "week", 21 * wp ], [ "month", 31 * wp ], [ "week", 42 * wp ], [ "month", 62 * wp ], [ "week", 42 * wp ], [ "quarter", 8208e6 ], [ "month", 31 * wp * 4 ], [ "month", 13392e6 ], [ "half-year", 16416e6 ], [ "month", 31 * wp * 8 ], [ "month", 26784e6 ], [ "year", 380 * wp ] ];
    bp.create = function(t) {
        return new bp({
            useUTC: t.ecModel.get("useUTC")
        });
    };
    var Mp = Ua.prototype, Ip = fp.prototype, Dp = Ci, Cp = Ii, Tp = Math.floor, kp = Math.ceil, Ap = Math.pow, Lp = Math.log, Pp = Ua.extend({
        type: "log",
        base: 10,
        $constructor: function() {
            Ua.apply(this, arguments), this._originalScale = new fp();
        },
        getTicks: function() {
            var n = this._originalScale, i = this._extent, r = n.getExtent();
            return T(Ip.getTicks.call(this), function(t) {
                var e = Ii(Ap(this.base, t));
                return e = t === i[0] && n.__fixMin ? so(e, r[0]) : e, t === i[1] && n.__fixMax ? so(e, r[1]) : e;
            }, this);
        },
        getLabel: Ip.getLabel,
        scale: function(t) {
            return t = Mp.scale.call(this, t), Ap(this.base, t);
        },
        setExtent: function(t, e) {
            var n = this.base;
            t = Lp(t) / Lp(n), e = Lp(e) / Lp(n), Ip.setExtent.call(this, t, e);
        },
        getExtent: function() {
            var t = this.base, e = Mp.getExtent.call(this);
            e[0] = Ap(t, e[0]), e[1] = Ap(t, e[1]);
            var n = this._originalScale, i = n.getExtent();
            return n.__fixMin && (e[0] = so(e[0], i[0])), n.__fixMax && (e[1] = so(e[1], i[1])), 
            e;
        },
        unionExtent: function(t) {
            this._originalScale.unionExtent(t);
            var e = this.base;
            t[0] = Lp(t[0]) / Lp(e), t[1] = Lp(t[1]) / Lp(e), Mp.unionExtent.call(this, t);
        },
        unionExtentFromData: function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        },
        niceTicks: function(t) {
            t = t || 10;
            var e = this._extent, n = e[1] - e[0];
            if (!(1 / 0 === n || n <= 0)) {
                var i = Oi(n);
                for (t / n * i <= .5 && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && 0 < Math.abs(i); ) i *= 10;
                var r = [ Ii(kp(e[0] / i) * i), Ii(Tp(e[1] / i) * i) ];
                this._interval = i, this._niceExtent = r;
            }
        },
        niceExtent: function(t) {
            Ip.niceExtent.call(this, t);
            var e = this._originalScale;
            e.__fixMin = t.fixMin, e.__fixMax = t.fixMax;
        }
    });
    R([ "contain", "normalize" ], function(e) {
        Pp.prototype[e] = function(t) {
            return t = Lp(t) / Lp(this.base), Mp[e].call(this, t);
        };
    }), Pp.create = function() {
        return new Pp();
    };
    var Op = {
        getMin: function(t) {
            var e = this.option, n = t || null == e.rangeStart ? e.min : e.rangeStart;
            return this.axis && null != n && "dataMin" !== n && "function" != typeof n && !w(n) && (n = this.axis.scale.parse(n)), 
            n;
        },
        getMax: function(t) {
            var e = this.option, n = t || null == e.rangeEnd ? e.max : e.rangeEnd;
            return this.axis && null != n && "dataMax" !== n && "function" != typeof n && !w(n) && (n = this.axis.scale.parse(n)), 
            n;
        },
        getNeedCrossZero: function() {
            var t = this.option;
            return null == t.rangeStart && null == t.rangeEnd && !t.scale;
        },
        getCoordSysModel: B,
        setRange: function(t, e) {
            this.option.rangeStart = t, this.option.rangeEnd = e;
        },
        resetRange: function() {
            this.option.rangeStart = this.option.rangeEnd = null;
        }
    }, Np = Fn({
        type: "triangle",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
            t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath();
        }
    }), Ep = Fn({
        type: "diamond",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
            t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), 
            t.closePath();
        }
    }), zp = Fn({
        type: "pin",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.x, i = e.y, r = e.width / 5 * 3, a = Math.max(r, e.height), o = r / 2, s = o * o / (a - o), l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), d = Math.cos(u), f = .6 * o, p = .7 * o;
            t.moveTo(n - h, l + s), t.arc(n, l, o, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + h - c * f, l + s + d * f, n, i - p, n, i), 
            t.bezierCurveTo(n, i - p, n - h + c * f, l + s + d * f, n - h, l + s), t.closePath();
        }
    }), Rp = Fn({
        type: "arrow",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.height, i = e.width, r = e.x, a = e.y, o = i / 3 * 2;
            t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), 
            t.lineTo(r, a), t.closePath();
        }
    }), Bp = {
        line: function(t, e, n, i, r) {
            r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2;
        },
        rect: function(t, e, n, i, r) {
            r.x = t, r.y = e, r.width = n, r.height = i;
        },
        roundRect: function(t, e, n, i, r) {
            r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4;
        },
        square: function(t, e, n, i, r) {
            var a = Math.min(n, i);
            r.x = t, r.y = e, r.width = a, r.height = a;
        },
        circle: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2;
        },
        diamond: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
        },
        pin: function(t, e, n, i, r) {
            r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
        },
        arrow: function(t, e, n, i, r) {
            r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
        },
        triangle: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
        }
    }, Fp = {};
    R({
        line: Ic,
        rect: Mc,
        roundRect: Mc,
        square: Mc,
        circle: vc,
        diamond: Ep,
        pin: zp,
        arrow: Rp,
        triangle: Np
    }, function(t, e) {
        Fp[e] = new t();
    });
    var Vp = Fn({
        type: "symbol",
        shape: {
            symbolType: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        beforeBrush: function() {
            var t = this.style;
            "pin" === this.shape.symbolType && "inside" === t.textPosition && (t.textPosition = [ "50%", "40%" ], 
            t.textAlign = "center", t.textVerticalAlign = "middle");
        },
        buildPath: function(t, e, n) {
            var i = e.symbolType, r = Fp[i];
            "none" !== e.symbolType && (r || (r = Fp[i = "rect"]), Bp[i](e.x, e.y, e.width, e.height, r.shape), 
            r.buildPath(t, r.shape, n));
        }
    }), Gp = {
        isDimensionStacked: Ha,
        enableDataStack: Wa,
        getStackedDimension: qa
    }, Wp = (Object.freeze || Object)({
        createList: function(t) {
            return ja(t.getSource(), t);
        },
        getLayoutRect: Hi,
        dataStack: Gp,
        createScale: function(t, e) {
            var n = e;
            _i.isInstance(e) || r(n = new _i(e), Op);
            var i = ho(n);
            return i.setExtent(t[0], t[1]), uo(i, n), i;
        },
        mixinAxisModelCommonMethods: function(t) {
            r(t, Op);
        },
        completeDimensions: Va,
        createDimensions: sp,
        createSymbol: po
    }), Hp = 1e-8;
    vo.prototype = {
        constructor: vo,
        properties: null,
        getBoundingRect: function() {
            var t = this._rect;
            if (t) return t;
            for (var e = Number.MAX_VALUE, n = [ e, e ], i = [ -e, -e ], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++) {
                if ("polygon" === o[s].type) yn(o[s].exterior, r, a), K(n, n, r), Q(i, i, a);
            }
            return 0 === s && (n[0] = n[1] = i[0] = i[1] = 0), this._rect = new Gt(n[0], n[1], i[0] - n[0], i[1] - n[1]);
        },
        contain: function(t) {
            var e = this.getBoundingRect(), n = this.geometries;
            if (!e.contain(t[0], t[1])) return !1;
            t: for (var i = 0, r = n.length; i < r; i++) if ("polygon" === n[i].type) {
                var a = n[i].exterior, o = n[i].interiors;
                if (mo(a, t[0], t[1])) {
                    for (var s = 0; s < (o ? o.length : 0); s++) if (mo(o[s])) continue t;
                    return !0;
                }
            }
            return !1;
        },
        transformTo: function(t, e, n, i) {
            var r = this.getBoundingRect(), a = r.width / r.height;
            n ? i || (i = n / a) : n = a * i;
            for (var o = new Gt(t, e, n, i), s = r.calculateTransform(o), l = this.geometries, u = 0; u < l.length; u++) if ("polygon" === l[u].type) {
                for (var h = l[u].exterior, c = l[u].interiors, d = 0; d < h.length; d++) $(h[d], h[d], s);
                for (var f = 0; f < (c ? c.length : 0); f++) for (d = 0; d < c[f].length; d++) $(c[f][d], c[f][d], s);
            }
            (r = this._rect).copy(o), this.center = [ r.x + r.width / 2, r.y + r.height / 2 ];
        }
    };
    var qp = function(t) {
        return function(t) {
            if (!t.UTF8Encoding) return;
            var e = t.UTF8Scale;
            null == e && (e = 1024);
            for (var n = t.features, i = 0; i < n.length; i++) for (var r = n[i].geometry, a = r.coordinates, o = r.encodeOffsets, s = 0; s < a.length; s++) {
                var l = a[s];
                if ("Polygon" === r.type) a[s] = yo(l, o[s], e); else if ("MultiPolygon" === r.type) for (var u = 0; u < l.length; u++) {
                    var h = l[u];
                    l[u] = yo(h, o[s][u], e);
                }
            }
            t.UTF8Encoding = !1;
        }(t), T(m(t.features, function(t) {
            return t.geometry && t.properties && 0 < t.geometry.coordinates.length;
        }), function(t) {
            var e = t.properties, n = t.geometry, i = n.coordinates, r = [];
            "Polygon" === n.type && r.push({
                type: "polygon",
                exterior: i[0],
                interiors: i.slice(1)
            }), "MultiPolygon" === n.type && R(i, function(t) {
                t[0] && r.push({
                    type: "polygon",
                    exterior: t[0],
                    interiors: t.slice(1)
                });
            });
            var a = new vo(e.name, r, e.cp);
            return a.properties = e, a;
        });
    }, jp = Ke(), Up = [ 0, 1 ], Xp = function(t, e, n) {
        this.dim = t, this.scale = e, this._extent = n || [ 0, 0 ], this.inverse = !1, this.onBand = !1;
    };
    Xp.prototype = {
        constructor: Xp,
        contain: function(t) {
            var e = this._extent, n = Math.min(e[0], e[1]), i = Math.max(e[0], e[1]);
            return n <= t && t <= i;
        },
        containData: function(t) {
            return this.contain(this.dataToCoord(t));
        },
        getExtent: function() {
            return this._extent.slice();
        },
        getPixelPrecision: function(t) {
            return Ti(t || this.scale.getExtent(), this._extent);
        },
        setExtent: function(t, e) {
            var n = this._extent;
            n[0] = t, n[1] = e;
        },
        dataToCoord: function(t, e) {
            var n = this._extent, i = this.scale;
            return t = i.normalize(t), this.onBand && "ordinal" === i.type && To(n = n.slice(), i.count()), 
            Si(t, Up, n, e);
        },
        coordToData: function(t, e) {
            var n = this._extent, i = this.scale;
            this.onBand && "ordinal" === i.type && To(n = n.slice(), i.count());
            var r = Si(t, n, Up, e);
            return this.scale.scale(r);
        },
        pointToData: function() {},
        getTicksCoords: function(t) {
            var e = (t = t || {}).tickModel || this.getTickModel(), n = xo(this, e), i = T(n.ticks, function(t) {
                return {
                    coord: this.dataToCoord(t),
                    tickValue: t
                };
            }, this), r = e.get("alignWithLabel");
            return function(t, e, n, i, r) {
                function a(t, e) {
                    return h ? e < t : t < e;
                }
                var o = e.length;
                if (t.onBand && !i && o) {
                    var s, l = t.getExtent();
                    if (1 === o) e[0].coord = l[0], s = e[1] = {
                        coord: l[0]
                    }; else {
                        var u = e[1].coord - e[0].coord;
                        R(e, function(t) {
                            t.coord -= u / 2;
                            var e = e || 0;
                            0 < e % 2 && (t.coord -= u / (2 * (e + 1)));
                        }), s = {
                            coord: e[o - 1].coord + u
                        }, e.push(s);
                    }
                    var h = l[0] > l[1];
                    a(e[0].coord, l[0]) && (r ? e[0].coord = l[0] : e.shift()), r && a(l[0], e[0].coord) && e.unshift({
                        coord: l[0]
                    }), a(l[1], s.coord) && (r ? s.coord = l[1] : e.pop()), r && a(s.coord, l[1]) && e.push({
                        coord: l[1]
                    });
                }
            }(this, i, n.tickCategoryInterval, r, t.clamp), i;
        },
        getViewLabels: function() {
            return _o(this).labels;
        },
        getLabelModel: function() {
            return this.model.getModel("axisLabel");
        },
        getTickModel: function() {
            return this.model.getModel("axisTick");
        },
        getBandWidth: function() {
            var t = this._extent, e = this.scale.getExtent(), n = e[1] - e[0] + (this.onBand ? 1 : 0);
            0 === n && (n = 1);
            var i = Math.abs(t[1] - t[0]);
            return Math.abs(i) / n;
        },
        isHorizontal: null,
        getRotate: null,
        calculateCategoryInterval: function() {
            return function(t) {
                var e, n, i = (n = (e = t).getLabelModel(), {
                    axisRotate: e.getRotate ? e.getRotate() : e.isHorizontal && !e.isHorizontal() ? 90 : 0,
                    labelRotate: n.get("rotate") || 0,
                    font: n.getFont()
                }), r = co(t), a = (i.axisRotate - i.labelRotate) / 180 * Math.PI, o = t.scale, s = o.getExtent(), l = o.count();
                if (s[1] - s[0] < 1) return 0;
                var u = 1;
                40 < l && (u = Math.max(1, Math.floor(l / 40)));
                for (var h = s[0], c = t.dataToCoord(h + 1) - t.dataToCoord(h), d = Math.abs(c * Math.cos(a)), f = Math.abs(c * Math.sin(a)), p = 0, g = 0; h <= s[1]; h += u) {
                    var m, v, y = re(r(h), i.font, "center", "top");
                    m = 1.3 * y.width, v = 1.3 * y.height, p = Math.max(p, m, 7), g = Math.max(g, v, 7);
                }
                var _ = p / d, x = g / f;
                isNaN(_) && (_ = 1 / 0), isNaN(x) && (x = 1 / 0);
                var w = Math.max(0, Math.floor(Math.min(_, x))), b = jp(t.model), S = b.lastAutoInterval, M = b.lastTickCount;
                return null != S && null != M && Math.abs(S - w) <= 1 && Math.abs(M - l) <= 1 && w < S ? w = S : (b.lastTickCount = l, 
                b.lastAutoInterval = w), w;
            }(this);
        }
    };
    var Yp = qp, Zp = {};
    R([ "map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge" ], function(t) {
        Zp[t] = _l[t];
    });
    var $p = function(t) {
        this._axes = {}, this._dimList = [], this.name = t || "";
    };
    $p.prototype = {
        constructor: $p,
        type: "cartesian",
        getAxis: function(t) {
            return this._axes[t];
        },
        getAxes: function() {
            return T(this._dimList, ko, this);
        },
        getAxesByScale: function(e) {
            return e = e.toLowerCase(), m(this.getAxes(), function(t) {
                return t.scale.type === e;
            });
        },
        addAxis: function(t) {
            var e = t.dim;
            this._axes[e] = t, this._dimList.push(e);
        },
        dataToCoord: function(t) {
            return this._dataCoordConvert(t, "dataToCoord");
        },
        coordToData: function(t) {
            return this._dataCoordConvert(t, "coordToData");
        },
        _dataCoordConvert: function(t, e) {
            for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {
                var a = n[r], o = this._axes[a];
                i[a] = o[e](t[a]);
            }
            return i;
        }
    }, Ao.prototype = {
        constructor: Ao,
        type: "cartesian2d",
        dimensions: [ "x", "y" ],
        getBaseAxis: function() {
            return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
        },
        containPoint: function(t) {
            var e = this.getAxis("x"), n = this.getAxis("y");
            return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]));
        },
        containData: function(t) {
            return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1]);
        },
        dataToPoint: function(t, e, n) {
            var i = this.getAxis("x"), r = this.getAxis("y");
            return (n = n || [])[0] = i.toGlobalCoord(i.dataToCoord(t[0])), n[1] = r.toGlobalCoord(r.dataToCoord(t[1])), 
            n;
        },
        clampData: function(t, e) {
            var n = this.getAxis("x").scale, i = this.getAxis("y").scale, r = n.getExtent(), a = i.getExtent(), o = n.parse(t[0]), s = i.parse(t[1]);
            return (e = e || [])[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), 
            e[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e;
        },
        pointToData: function(t, e) {
            var n = this.getAxis("x"), i = this.getAxis("y");
            return (e = e || [])[0] = n.coordToData(n.toLocalCoord(t[0])), e[1] = i.coordToData(i.toLocalCoord(t[1])), 
            e;
        },
        getOtherAxis: function(t) {
            return this.getAxis("x" === t.dim ? "y" : "x");
        }
    }, a(Ao, $p);
    var Kp = function(t, e, n, i, r) {
        Xp.call(this, t, e, n), this.type = i || "value", this.position = r || "bottom";
    };
    Kp.prototype = {
        constructor: Kp,
        index: 0,
        getAxesOnZeroOf: null,
        model: null,
        isHorizontal: function() {
            var t = this.position;
            return "top" === t || "bottom" === t;
        },
        getGlobalExtent: function(t) {
            var e = this.getExtent();
            return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), 
            e;
        },
        getOtherAxis: function() {
            this.grid.getOtherAxis();
        },
        pointToData: function(t, e) {
            return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e);
        },
        toLocalCoord: null,
        toGlobalCoord: null
    }, a(Kp, Xp);
    var Qp = {
        show: !0,
        zlevel: 0,
        z: 0,
        inverse: !1,
        name: "",
        nameLocation: "end",
        nameRotate: null,
        nameTruncate: {
            maxWidth: null,
            ellipsis: "...",
            placeholder: "."
        },
        nameTextStyle: {},
        nameGap: 15,
        silent: !1,
        triggerEvent: !1,
        tooltip: {
            show: !1
        },
        axisPointer: {},
        axisLine: {
            show: !0,
            onZero: !0,
            onZeroAxisIndex: null,
            lineStyle: {
                color: "#333",
                width: 1,
                type: "solid"
            },
            symbol: [ "none", "none" ],
            symbolSize: [ 10, 15 ]
        },
        axisTick: {
            show: !0,
            inside: !1,
            length: 5,
            lineStyle: {
                width: 1
            }
        },
        axisLabel: {
            show: !0,
            inside: !1,
            rotate: 0,
            showMinLabel: null,
            showMaxLabel: null,
            margin: 8,
            fontSize: 12
        },
        splitLine: {
            show: !0,
            lineStyle: {
                color: [ "#ccc" ],
                width: 1,
                type: "solid"
            }
        },
        splitArea: {
            show: !1,
            areaStyle: {
                color: [ "rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)" ]
            }
        }
    }, Jp = {};
    Jp.categoryAxis = p({
        boundaryGap: !0,
        deduplication: null,
        splitLine: {
            show: !1
        },
        axisTick: {
            alignWithLabel: !1,
            interval: "auto"
        },
        axisLabel: {
            interval: "auto"
        }
    }, Qp), Jp.valueAxis = p({
        boundaryGap: [ 0, 0 ],
        splitNumber: 5
    }, Qp), Jp.timeAxis = C({
        scale: !0,
        min: "dataMin",
        max: "dataMax"
    }, Jp.valueAxis), Jp.logAxis = C({
        scale: !0,
        logBase: 10
    }, Jp.valueAxis);
    var tg = [ "value", "category", "time", "log" ], eg = function(a, t, o, e) {
        R(tg, function(r) {
            t.extend({
                type: a + "Axis." + r,
                mergeDefaultAndTheme: function(t, e) {
                    var n = this.layoutMode, i = n ? ji(t) : {};
                    p(t, e.getTheme().get(r + "Axis")), p(t, this.getDefaultOption()), t.type = o(a, t), 
                    n && qi(t, i, n);
                },
                optionUpdated: function() {
                    "category" === this.option.type && (this.__ordinalMeta = Xa.createByAxisModel(this));
                },
                getCategories: function(t) {
                    var e = this.option;
                    return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0;
                },
                getOrdinalMeta: function() {
                    return this.__ordinalMeta;
                },
                defaultOption: h([ {}, Jp[r + "Axis"], e ], !0)
            });
        }), dd.registerSubTypeDefaulter(a + "Axis", y(o, a));
    }, ng = dd.extend({
        type: "cartesian2dAxis",
        axis: null,
        init: function() {
            ng.superApply(this, "init", arguments), this.resetRange();
        },
        mergeOption: function() {
            ng.superApply(this, "mergeOption", arguments), this.resetRange();
        },
        restoreData: function() {
            ng.superApply(this, "restoreData", arguments), this.resetRange();
        },
        getCoordSysModel: function() {
            return this.ecModel.queryComponents({
                mainType: "grid",
                index: this.option.gridIndex,
                id: this.option.gridId
            })[0];
        }
    });
    p(ng.prototype, Op);
    var ig = {
        offset: 0
    };
    eg("x", ng, Lo, ig), eg("y", ng, Lo, ig), dd.extend({
        type: "grid",
        dependencies: [ "xAxis", "yAxis" ],
        layoutMode: "box",
        coordinateSystem: null,
        defaultOption: {
            show: !1,
            zlevel: 0,
            z: 0,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 60,
            containLabel: !1,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 1,
            borderColor: "#ccc"
        }
    });
    var rg = Oo.prototype;
    rg.type = "grid", rg.axisPointerEnabled = !0, rg.getRect = function() {
        return this._rect;
    }, rg.update = function(t, e) {
        var n = this._axesMap;
        this._updateScale(t, this.model), R(n.x, function(t) {
            uo(t.scale, t.model);
        }), R(n.y, function(t) {
            uo(t.scale, t.model);
        }), R(n.x, function(t) {
            No(n, "y", t);
        }), R(n.y, function(t) {
            No(n, "x", t);
        }), this.resize(this.model, e);
    }, rg.resize = function(t, e, n) {
        function i() {
            R(r, function(t) {
                var e, n, i, r, a = t.isHorizontal(), o = a ? [ 0, l.width ] : [ 0, l.height ], s = t.inverse ? 1 : 0;
                t.setExtent(o[s], o[1 - s]), e = t, n = a ? l.x : l.y, i = e.getExtent(), r = i[0] + i[1], 
                e.toGlobalCoord = "x" === e.dim ? function(t) {
                    return t + n;
                } : function(t) {
                    return r - t + n;
                }, e.toLocalCoord = "x" === e.dim ? function(t) {
                    return t - n;
                } : function(t) {
                    return r - t + n;
                };
            });
        }
        var l = Hi(t.getBoxLayoutParams(), {
            width: e.getWidth(),
            height: e.getHeight()
        });
        this._rect = l;
        var r = this._axesList;
        i(), !n && t.get("containLabel") && (R(r, function(t) {
            if (!t.model.get("axisLabel.inside")) {
                var e = function(t) {
                    var e, n, i, r, a, o, s, l, u = t.model, h = t.scale;
                    if (u.get("axisLabel.show") && !h.isBlank()) {
                        var c, d, f = "category" === t.type, p = h.getExtent();
                        d = f ? h.count() : (c = h.getTicks()).length;
                        var g, m = t.getLabelModel(), v = co(t), y = 1;
                        40 < d && (y = Math.ceil(d / 40));
                        for (var _ = 0; _ < d; _ += y) {
                            var x = v(c ? c[_] : p[0] + _), w = m.getTextRect(x), b = (e = w, n = m.get("rotate") || 0, 
                            i = n * Math.PI / 180, r = e.plain(), a = r.width, o = r.height, s = a * Math.cos(i) + o * Math.sin(i), 
                            l = a * Math.sin(i) + o * Math.cos(i), new Gt(r.x, r.y, s, l));
                            g ? g.union(b) : g = b;
                        }
                        return g;
                    }
                }(t);
                if (e) {
                    var n = t.isHorizontal() ? "height" : "width", i = t.model.get("axisLabel.margin");
                    l[n] -= e[n] + i, "top" === t.position ? l.y += e.height + i : "left" === t.position && (l.x += e.width + i);
                }
            }
        }), i());
    }, rg.getAxis = function(t, e) {
        var n = this._axesMap[t];
        if (null != n) {
            if (null == e) for (var i in n) if (n.hasOwnProperty(i)) return n[i];
            return n[e];
        }
    }, rg.getAxes = function() {
        return this._axesList.slice();
    }, rg.getCartesian = function(t, e) {
        if (null != t && null != e) {
            var n = "x" + t + "y" + e;
            return this._coordsMap[n];
        }
        M(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
        for (var i = 0, r = this._coordsList; i < r.length; i++) if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i];
    }, rg.getCartesians = function() {
        return this._coordsList.slice();
    }, rg.convertToPixel = function(t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;
    }, rg.convertFromPixel = function(t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
    }, rg._findConvertTarget = function(t, e) {
        var n, i, r = e.seriesModel, a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0], o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0], s = e.gridModel, l = this._coordsList;
        if (r) d(l, n = r.coordinateSystem) < 0 && (n = null); else if (a && o) n = this.getCartesian(a.componentIndex, o.componentIndex); else if (a) i = this.getAxis("x", a.componentIndex); else if (o) i = this.getAxis("y", o.componentIndex); else if (s) {
            s.coordinateSystem === this && (n = this._coordsList[0]);
        }
        return {
            cartesian: n,
            axis: i
        };
    }, rg.containPoint = function(t) {
        var e = this._coordsList[0];
        return e ? e.containPoint(t) : void 0;
    }, rg._initCartesian = function(o, t) {
        function e(a) {
            return function(t, e) {
                if (Po(t, o)) {
                    var n = t.get("position");
                    "x" === a ? "top" !== n && "bottom" !== n && (s[n = "bottom"] && (n = "top" === n ? "bottom" : "top")) : "left" !== n && "right" !== n && (s[n = "left"] && (n = "left" === n ? "right" : "left")), 
                    s[n] = !0;
                    var i = new Kp(a, ho(t), [ 0, 0 ], t.get("type"), n), r = "category" === i.type;
                    i.onBand = r && t.get("boundaryGap"), i.inverse = t.get("inverse"), (t.axis = i).model = t, 
                    i.grid = this, i.index = e, this._axesList.push(i), l[a][e] = i, u[a]++;
                }
            };
        }
        var s = {
            left: !1,
            right: !1,
            top: !1,
            bottom: !1
        }, l = {
            x: {},
            y: {}
        }, u = {
            x: 0,
            y: 0
        };
        return t.eachComponent("xAxis", e("x"), this), t.eachComponent("yAxis", e("y"), this), 
        u.x && u.y ? void R((this._axesMap = l).x, function(r, a) {
            R(l.y, function(t, e) {
                var n = "x" + a + "y" + e, i = new Ao(n);
                i.grid = this, i.model = o, this._coordsMap[n] = i, this._coordsList.push(i), i.addAxis(r), 
                i.addAxis(t);
            }, this);
        }, this) : (this._axesMap = {}, void (this._axesList = []));
    }, rg._updateScale = function(t, l) {
        function u(e, n) {
            R(e.mapDimension(n.dim, !0), function(t) {
                n.scale.unionExtentFromData(e, qa(e, t));
            });
        }
        R(this._axesList, function(t) {
            t.scale.setExtent(1 / 0, -1 / 0);
        }), t.eachSeries(function(t) {
            if (Ro(t)) {
                var e = zo(t), n = e[0], i = e[1];
                if (!Po(n, l) || !Po(i, l)) return;
                var r = this.getCartesian(n.componentIndex, i.componentIndex), a = t.getData(), o = r.getAxis("x"), s = r.getAxis("y");
                "list" === a.type && (u(a, o), u(a, s));
            }
        }, this);
    }, rg.getTooltipAxes = function(i) {
        var r = [], a = [];
        return R(this.getCartesians(), function(t) {
            var e = null != i && "auto" !== i ? t.getAxis(i) : t.getBaseAxis(), n = t.getOtherAxis(e);
            d(r, e) < 0 && r.push(e), d(a, n) < 0 && a.push(n);
        }), {
            baseAxes: r,
            otherAxes: a
        };
    };
    var ag = [ "xAxis", "yAxis" ];
    Oo.create = function(i, r) {
        var a = [];
        return i.eachComponent("grid", function(t, e) {
            var n = new Oo(t, i, r);
            n.name = "grid_" + e, n.resize(t, r, !0), t.coordinateSystem = n, a.push(n);
        }), i.eachSeries(function(t) {
            if (Ro(t)) {
                var e = zo(t), n = e[0], i = e[1], r = n.getCoordSysModel().coordinateSystem;
                t.coordinateSystem = r.getCartesian(n.componentIndex, i.componentIndex);
            }
        }), a;
    }, Oo.dimensions = Oo.prototype.dimensions = Ao.prototype.dimensions, ir.register("cartesian2d", Oo), 
    Qd.extend({
        type: "series.__base_bar__",
        getInitialData: function() {
            return ja(this.getSource(), this);
        },
        getMarkerPosition: function(t) {
            var e = this.coordinateSystem;
            if (e) {
                var n = e.dataToPoint(e.clampData(t)), i = this.getData(), r = i.getLayout("offset"), a = i.getLayout("size");
                return n[e.getBaseAxis().isHorizontal() ? 0 : 1] += r + a / 2, n;
            }
            return [ NaN, NaN ];
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            barMinHeight: 0,
            barMinAngle: 0,
            large: !1,
            largeThreshold: 400,
            progressive: 3e3,
            progressiveChunkMode: "mod",
            itemStyle: {},
            emphasis: {}
        }
    }).extend({
        type: "series.bar",
        dependencies: [ "grid", "polar" ],
        brushSelector: "rect",
        getProgressive: function() {
            return !!this.get("large") && this.get("progressive");
        },
        getProgressiveThreshold: function() {
            var t = this.get("progressiveThreshold"), e = this.get("largeThreshold");
            return t < e && (t = e), t;
        }
    });
    var og = hh([ [ "fill", "color" ], [ "stroke", "borderColor" ], [ "lineWidth", "borderWidth" ], [ "stroke", "barBorderColor" ], [ "lineWidth", "barBorderWidth" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ] ]), sg = [ "itemStyle", "barBorderWidth" ];
    k(_i.prototype, {
        getBarItemStyle: function(t) {
            var e = og(this, t);
            if (this.getBorderLineDash) {
                var n = this.getBorderLineDash();
                n && (e.lineDash = n);
            }
            return e;
        }
    }), Ca({
        type: "bar",
        render: function(t, e, n) {
            this._updateDrawMode(t);
            var i = t.get("coordinateSystem");
            return ("cartesian2d" === i || "polar" === i) && (this._isLargeDraw ? this._renderLarge(t, e, n) : this._renderNormal(t, e, n)), 
            this.group;
        },
        incrementalPrepareRender: function(t) {
            this._clear(), this._updateDrawMode(t);
        },
        incrementalRender: function(t, e) {
            this._incrementalRenderLarge(t, e);
        },
        _updateDrawMode: function(t) {
            var e = t.pipelineContext.large;
            (null == this._isLargeDraw || e ^ this._isLargeDraw) && (this._isLargeDraw = e, 
            this._clear());
        },
        _renderNormal: function(a) {
            var o, s = this.group, l = a.getData(), u = this._data, h = a.coordinateSystem, t = h.getBaseAxis();
            "cartesian2d" === h.type ? o = t.isHorizontal() : "polar" === h.type && (o = "angle" === t.dim);
            var c = a.isAnimationEnabled() ? a : null;
            l.diff(u).add(function(t) {
                if (l.hasValue(t)) {
                    var e = l.getItemModel(t), n = ug[h.type](l, t, e), i = lg[h.type](l, t, e, n, o, c);
                    l.setItemGraphicEl(t, i), s.add(i), Wo(i, l, t, e, n, a, o, "polar" === h.type);
                }
            }).update(function(t, e) {
                var n = u.getItemGraphicEl(e);
                if (l.hasValue(t)) {
                    var i = l.getItemModel(t), r = ug[h.type](l, t, i);
                    n ? pi(n, {
                        shape: r
                    }, c, t) : n = lg[h.type](l, t, i, r, o, c, !0), l.setItemGraphicEl(t, n), s.add(n), 
                    Wo(n, l, t, i, r, a, o, "polar" === h.type);
                } else s.remove(n);
            }).remove(function(t) {
                var e = u.getItemGraphicEl(t);
                "cartesian2d" === h.type ? e && Vo(t, c, e) : e && Go(t, c, e);
            }).execute(), this._data = l;
        },
        _renderLarge: function(t) {
            this._clear(), Ho(t, this.group);
        },
        _incrementalRenderLarge: function(t, e) {
            Ho(e, this.group, !0);
        },
        dispose: B,
        remove: function(t) {
            this._clear(t);
        },
        _clear: function(e) {
            var t = this.group, n = this._data;
            e && e.get("animation") && n && !this._isLargeDraw ? n.eachItemGraphicEl(function(t) {
                "sector" === t.type ? Go(t.dataIndex, e, t) : Vo(t.dataIndex, e, t);
            }) : t.removeAll(), this._data = null;
        }
    });
    var lg = {
        cartesian2d: function(t, e, n, i, r, a, o) {
            var s = new Mc({
                shape: k({}, i)
            });
            if (a) {
                var l = r ? "height" : "width", u = {};
                s.shape[l] = 0, u[l] = i[l], Fc[o ? "updateProps" : "initProps"](s, {
                    shape: u
                }, a, e);
            }
            return s;
        },
        polar: function(t, e, n, i, r, a, o) {
            var s = i.startAngle < i.endAngle, l = new xc({
                shape: C({
                    clockwise: s
                }, i)
            });
            if (a) {
                var u = r ? "r" : "endAngle", h = {};
                l.shape[u] = r ? 0 : i.startAngle, h[u] = i[u], Fc[o ? "updateProps" : "initProps"](l, {
                    shape: h
                }, a, e);
            }
            return l;
        }
    }, ug = {
        cartesian2d: function(t, e, n) {
            var i, r, a = t.getItemLayout(e), o = (i = a, r = n.get(sg) || 0, Math.min(r, Math.abs(i.width), Math.abs(i.height))), s = 0 < a.width ? 1 : -1, l = 0 < a.height ? 1 : -1;
            return {
                x: a.x + s * o / 2,
                y: a.y + l * o / 2,
                width: a.width - s * o,
                height: a.height - l * o
            };
        },
        polar: function(t, e) {
            var n = t.getItemLayout(e);
            return {
                cx: n.cx,
                cy: n.cy,
                r0: n.r0,
                r: n.r,
                startAngle: n.startAngle,
                endAngle: n.endAngle
            };
        }
    }, hg = Pn.extend({
        type: "largeBar",
        shape: {
            points: []
        },
        buildPath: function(t, e) {
            for (var n = e.points, i = this.__startPoint, r = this.__valueIdx, a = 0; a < n.length; a += 2) i[this.__valueIdx] = n[a + r], 
            t.moveTo(i[0], i[1]), t.lineTo(n[a], n[a + 1]);
        }
    }), cg = Math.PI, dg = function(t, e) {
        this.opt = e, this.axisModel = t, C(e, {
            labelOffset: 0,
            nameDirection: 1,
            tickDirection: 1,
            labelDirection: 1,
            silent: !0
        }), this.group = new hu();
        var n = new hu({
            position: e.position.slice(),
            rotation: e.rotation
        });
        n.updateTransform(), this._transform = n.transform, this._dumbGroup = n;
    };
    dg.prototype = {
        constructor: dg,
        hasBuilder: function(t) {
            return !!fg[t];
        },
        add: function(t) {
            fg[t].call(this);
        },
        getGroup: function() {
            return this.group;
        }
    };
    var fg = {
        axisLine: function() {
            var a = this.opt, t = this.axisModel;
            if (t.get("axisLine.show")) {
                var e = this.axisModel.axis.getExtent(), n = this._transform, o = [ e[0], 0 ], i = [ e[1], 0 ];
                n && ($(o, o, n), $(i, i, n));
                var s = k({
                    lineCap: "round"
                }, t.getModel("axisLine.lineStyle").getLineStyle());
                this.group.add(new Ic(qn({
                    anid: "line",
                    shape: {
                        x1: o[0],
                        y1: o[1],
                        x2: i[0],
                        y2: i[1]
                    },
                    style: s,
                    strokeContainThreshold: a.strokeContainThreshold || 5,
                    silent: !0,
                    z2: 1
                })));
                var l = t.get("axisLine.symbol"), r = t.get("axisLine.symbolSize"), u = t.get("axisLine.symbolOffset") || 0;
                if ("number" == typeof u && (u = [ u, u ]), null != l) {
                    "string" == typeof l && (l = [ l, l ]), ("string" == typeof r || "number" == typeof r) && (r = [ r, r ]);
                    var h = r[0], c = r[1];
                    R([ {
                        rotate: a.rotation + Math.PI / 2,
                        offset: u[0],
                        r: 0
                    }, {
                        rotate: a.rotation - Math.PI / 2,
                        offset: u[1],
                        r: Math.sqrt((o[0] - i[0]) * (o[0] - i[0]) + (o[1] - i[1]) * (o[1] - i[1]))
                    } ], function(t, e) {
                        if ("none" !== l[e] && null != l[e]) {
                            var n = po(l[e], -h / 2, -c / 2, h, c, s.stroke, !0), i = t.r + t.offset, r = [ o[0] + i * Math.cos(a.rotation), o[1] - i * Math.sin(a.rotation) ];
                            n.attr({
                                rotation: t.rotate,
                                position: r,
                                silent: !0
                            }), this.group.add(n);
                        }
                    }, this);
                }
            }
        },
        axisTickLabel: function() {
            var t = this.axisModel, e = this.opt, n = function(t, e, n) {
                var i = e.axis;
                if (e.get("axisTick.show") && !i.scale.isBlank()) {
                    for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), s = i.getTicksCoords(), l = [], u = [], h = t._transform, c = [], d = 0; d < s.length; d++) {
                        var f = s[d].coord;
                        l[0] = f, u[l[1] = 0] = f, u[1] = n.tickDirection * o, h && ($(l, l, h), $(u, u, h));
                        var p = new Ic(qn({
                            anid: "tick_" + s[d].tickValue,
                            shape: {
                                x1: l[0],
                                y1: l[1],
                                x2: u[0],
                                y2: u[1]
                            },
                            style: C(a.getLineStyle(), {
                                stroke: e.get("axisLine.lineStyle.color")
                            }),
                            z2: 2,
                            silent: !0
                        }));
                        t.group.add(p), c.push(p);
                    }
                    return c;
                }
            }(this, t, e);
            !function(t, e, n) {
                var i = t.get("axisLabel.showMinLabel"), r = t.get("axisLabel.showMaxLabel");
                n = n || [];
                var a = (e = e || [])[0], o = e[1], s = e[e.length - 1], l = e[e.length - 2], u = n[0], h = n[1], c = n[n.length - 1], d = n[n.length - 2];
                !1 === i ? (Uo(a), Uo(u)) : Xo(a, o) && (i ? (Uo(o), Uo(h)) : (Uo(a), Uo(u))), !1 === r ? (Uo(s), 
                Uo(c)) : Xo(l, s) && (r ? (Uo(l), Uo(d)) : (Uo(s), Uo(c)));
            }(t, function(u, h, c) {
                var d = h.axis;
                if (L(c.axisLabelShow, h.get("axisLabel.show")) && !d.scale.isBlank()) {
                    var f = h.getModel("axisLabel"), p = f.get("margin"), t = d.getViewLabels(), e = (L(c.labelRotate, f.get("rotate")) || 0) * cg / 180, g = pg(c.rotation, e, c.labelDirection), m = h.getCategories(!0), v = [], y = jo(h), _ = h.get("triggerEvent");
                    return R(t, function(t, e) {
                        var n = t.tickValue, i = t.formattedLabel, r = t.rawLabel, a = f;
                        m && m[n] && m[n].textStyle && (a = new _i(m[n].textStyle, f, h.ecModel));
                        var o = a.getTextColor() || h.get("axisLine.lineStyle.color"), s = [ d.dataToCoord(n), c.labelOffset + c.labelDirection * p ], l = new mc({
                            anid: "label_" + n,
                            position: s,
                            rotation: g.rotation,
                            silent: y,
                            z2: 10
                        });
                        si(l.style, a, {
                            text: i,
                            textAlign: a.getShallow("align", !0) || g.textAlign,
                            textVerticalAlign: a.getShallow("verticalAlign", !0) || a.getShallow("baseline", !0) || g.textVerticalAlign,
                            textFill: "function" == typeof o ? o("category" === d.type ? r : "value" === d.type ? n + "" : n, e) : o
                        }), _ && (l.eventData = qo(h), l.eventData.targetType = "axisLabel", l.eventData.value = r), 
                        u._dumbGroup.add(l), l.updateTransform(), v.push(l), u.group.add(l), l.decomposeTransform();
                    }), v;
                }
            }(this, t, e), n);
        },
        axisName: function() {
            var t, e, n, i, r, a, o, s = this.opt, l = this.axisModel, u = L(s.axisName, l.get("name"));
            if (u) {
                var h, c, d = l.get("nameLocation"), f = s.nameDirection, p = l.getModel("nameTextStyle"), g = l.get("nameGap") || 0, m = this.axisModel.axis.getExtent(), v = m[0] > m[1] ? -1 : 1, y = [ "start" === d ? m[0] - v * g : "end" === d ? m[1] + v * g : (m[0] + m[1]) / 2, Yo(d) ? s.labelOffset + f * g : 0 ], _ = l.get("nameRotate");
                null != _ && (_ = _ * cg / 180), Yo(d) ? h = pg(s.rotation, null != _ ? _ : s.rotation, f) : (t = d, 
                e = m, r = Ai((_ || 0) - s.rotation), a = e[0] > e[1], o = "start" === t && !a || "start" !== t && a, 
                Li(r - cg / 2) ? (i = o ? "bottom" : "top", n = "center") : Li(r - 1.5 * cg) ? (i = o ? "top" : "bottom", 
                n = "center") : (i = "middle", n = r < 1.5 * cg && cg / 2 < r ? o ? "left" : "right" : o ? "right" : "left"), 
                h = {
                    rotation: r,
                    textAlign: n,
                    textVerticalAlign: i
                }, null != (c = s.axisNameAvailableWidth) && (c = Math.abs(c / Math.sin(h.rotation)), 
                !isFinite(c) && (c = null)));
                var x = p.getFont(), w = l.get("nameTruncate", !0) || {}, b = w.ellipsis, S = L(s.nameTruncateMaxWidth, w.maxWidth, c), M = null != b && null != S ? id(u, S, x, b, {
                    minChar: 2,
                    placeholder: w.placeholder
                }) : u, I = l.get("tooltip", !0), D = l.mainType, C = {
                    componentType: D,
                    name: u,
                    $vars: [ "name" ]
                };
                C[D + "Index"] = l.componentIndex;
                var T = new mc({
                    anid: "name",
                    __fullText: u,
                    __truncatedText: M,
                    position: y,
                    rotation: h.rotation,
                    silent: jo(l),
                    z2: 1,
                    tooltip: I && I.show ? k({
                        content: u,
                        formatter: function() {
                            return u;
                        },
                        formatterParams: C
                    }, I) : null
                });
                si(T.style, p, {
                    text: M,
                    textFont: x,
                    textFill: p.getTextColor() || l.get("axisLine.lineStyle.color"),
                    textAlign: h.textAlign,
                    textVerticalAlign: h.textVerticalAlign
                }), l.get("triggerEvent") && (T.eventData = qo(l), T.eventData.targetType = "axisName", 
                T.eventData.name = u), this._dumbGroup.add(T), T.updateTransform(), this.group.add(T), 
                T.decomposeTransform();
            }
        }
    }, pg = dg.innerTextLayout = function(t, e, n) {
        var i, r, a = Ai(e - t);
        return Li(a) ? (r = 0 < n ? "top" : "bottom", i = "center") : Li(a - cg) ? (r = 0 < n ? "bottom" : "top", 
        i = "center") : (r = "middle", i = 0 < a && a < cg ? 0 < n ? "right" : "left" : 0 < n ? "left" : "right"), 
        {
            rotation: a,
            textAlign: i,
            textVerticalAlign: r
        };
    }, gg = Ia({
        type: "axis",
        _axisPointer: null,
        axisPointerClass: null,
        render: function(t, e, n, i) {
            this.axisPointerClass && function(t) {
                var e = Zo(t);
                if (e) {
                    var n = e.axisPointerModel, i = e.axis.scale, r = n.option, a = n.get("status"), o = n.get("value");
                    null != o && (o = i.parse(o));
                    var s = !!n.get("handle.show");
                    null == a && (r.status = s ? "show" : "hide");
                    var l = i.getExtent().slice();
                    l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), 
                    r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show");
                }
            }(t), gg.superApply(this, "render", arguments), $o(this, t, 0, n, 0, !0);
        },
        updateAxisPointer: function(t, e, n, i) {
            $o(this, t, 0, n, 0, !1);
        },
        remove: function(t, e) {
            var n = this._axisPointer;
            n && n.remove(e), gg.superApply(this, "remove", arguments);
        },
        dispose: function(t, e) {
            Ko(this, e), gg.superApply(this, "dispose", arguments);
        }
    }), mg = [];
    gg.registerAxisPointerClass = function(t, e) {
        mg[t] = e;
    }, gg.getAxisPointerClass = function(t) {
        return t && mg[t];
    };
    var vg = [ "axisLine", "axisTickLabel", "axisName" ], yg = [ "splitArea", "splitLine" ], _g = gg.extend({
        type: "cartesianAxis",
        axisPointerClass: "CartesianAxisPointer",
        render: function(e, t, n, i) {
            this.group.removeAll();
            var r = this._axisGroup;
            if (this._axisGroup = new hu(), this.group.add(this._axisGroup), e.get("show")) {
                var a = e.getCoordSysModel(), o = function(t, e, n) {
                    n = n || {};
                    var i = t.coordinateSystem, r = e.axis, a = {}, o = r.getAxesOnZeroOf()[0], s = r.position, l = o ? "onZero" : s, u = r.dim, h = i.getRect(), c = [ h.x, h.x + h.width, h.y, h.y + h.height ], d = {
                        left: 0,
                        right: 1,
                        top: 0,
                        bottom: 1,
                        onZero: 2
                    }, f = e.get("offset") || 0, p = "x" === u ? [ c[2] - f, c[3] + f ] : [ c[0] - f, c[1] + f ];
                    if (o) {
                        var g = o.toGlobalCoord(o.dataToCoord(0));
                        p[d.onZero] = Math.max(Math.min(g, p[1]), p[0]);
                    }
                    a.position = [ "y" === u ? p[d[l]] : c[0], "x" === u ? p[d[l]] : c[3] ], a.rotation = Math.PI / 2 * ("x" === u ? 0 : 1), 
                    a.labelDirection = a.tickDirection = a.nameDirection = {
                        top: -1,
                        bottom: 1,
                        left: -1,
                        right: 1
                    }[s], a.labelOffset = o ? p[d[s]] - p[d.onZero] : 0, e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), 
                    L(n.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
                    var m = e.get("axisLabel.rotate");
                    return a.labelRotate = "top" === l ? -m : m, a.z2 = 1, a;
                }(a, e), s = new dg(e, o);
                R(vg, s.add, s), this._axisGroup.add(s.getGroup()), R(yg, function(t) {
                    e.get(t + ".show") && this["_" + t](e, a);
                }, this), vi(r, this._axisGroup, e), _g.superCall(this, "render", e, t, n, i);
            }
        },
        remove: function() {
            this._splitAreaColors = null;
        },
        _splitLine: function(t, e) {
            var n = t.axis;
            if (!n.scale.isBlank()) {
                var i = t.getModel("splitLine"), r = i.getModel("lineStyle"), a = r.get("color");
                a = A(a) ? a : [ a ];
                for (var o = e.coordinateSystem.getRect(), s = n.isHorizontal(), l = 0, u = n.getTicksCoords({
                    tickModel: i
                }), h = [], c = [], d = r.getLineStyle(), f = 0; f < u.length; f++) {
                    var p = n.toGlobalCoord(u[f].coord);
                    s ? (h[0] = p, h[1] = o.y, c[0] = p, c[1] = o.y + o.height) : (h[0] = o.x, h[1] = p, 
                    c[0] = o.x + o.width, c[1] = p);
                    var g = l++ % a.length, m = u[f].tickValue;
                    this._axisGroup.add(new Ic(qn({
                        anid: null != m ? "line_" + u[f].tickValue : null,
                        shape: {
                            x1: h[0],
                            y1: h[1],
                            x2: c[0],
                            y2: c[1]
                        },
                        style: C({
                            stroke: a[g]
                        }, d),
                        silent: !0
                    })));
                }
            }
        },
        _splitArea: function(t, e) {
            var n = t.axis;
            if (!n.scale.isBlank()) {
                var i = t.getModel("splitArea"), r = i.getModel("areaStyle"), a = r.get("color"), o = e.coordinateSystem.getRect(), s = n.getTicksCoords({
                    tickModel: i,
                    clamp: !0
                });
                if (s.length) {
                    var l = a.length, u = this._splitAreaColors, h = z(), c = 0;
                    if (u) for (var d = 0; d < s.length; d++) {
                        var f = u.get(s[d].tickValue);
                        if (null != f) {
                            c = (f + (l - 1) * d) % l;
                            break;
                        }
                    }
                    var p = n.toGlobalCoord(s[0].coord), g = r.getAreaStyle();
                    a = A(a) ? a : [ a ];
                    for (d = 1; d < s.length; d++) {
                        var m, v, y, _, x = n.toGlobalCoord(s[d].coord);
                        n.isHorizontal() ? (m = p, v = o.y, y = x - m, _ = o.height, p = m + y) : (m = o.x, 
                        v = p, y = o.width, p = v + (_ = x - v));
                        var w = s[d - 1].tickValue;
                        null != w && h.set(w, c), this._axisGroup.add(new Mc({
                            anid: null != w ? "area_" + w : null,
                            shape: {
                                x: m,
                                y: v,
                                width: y,
                                height: _
                            },
                            style: C({
                                fill: a[c]
                            }, g),
                            silent: !0
                        })), c = (c + 1) % l;
                    }
                    this._splitAreaColors = h;
                }
            }
        }
    });
    _g.extend({
        type: "xAxis"
    }), _g.extend({
        type: "yAxis"
    }), Ia({
        type: "grid",
        render: function(t) {
            this.group.removeAll(), t.get("show") && this.group.add(new Mc({
                shape: t.coordinateSystem.getRect(),
                style: C({
                    fill: t.get("backgroundColor")
                }, t.getItemStyle()),
                silent: !0,
                z2: -1
            }));
        }
    }), va(function(t) {
        t.xAxis && t.yAxis && !t.grid && (t.grid = {});
    }), xa(y(function(t, e) {
        var n = eo(t, e), D = no(n), C = {};
        R(n, function(t) {
            var e = t.getData(), n = t.coordinateSystem, i = n.getBaseAxis(), r = Ja(t), a = D[to(i)][r], o = a.offset, s = a.width, l = n.getOtherAxis(i), u = t.get("barMinHeight") || 0;
            C[r] = C[r] || [], e.setLayout({
                offset: o,
                size: s
            });
            for (var h = e.mapDimension(l.dim), c = e.mapDimension(i.dim), d = Ha(e, h), f = l.isHorizontal(), p = oo(i, l, d), g = 0, m = e.count(); g < m; g++) {
                var v = e.get(h, g), y = e.get(c, g);
                if (!isNaN(v)) {
                    var _, x, w, b, S, M = 0 <= v ? "p" : "n", I = p;
                    d && (C[r][y] || (C[r][y] = {
                        p: p,
                        n: p
                    }), I = C[r][y][M]), f ? (_ = I, x = (S = n.dataToPoint([ v, y ]))[1] + o, w = S[0] - p, 
                    b = s, Math.abs(w) < u && (w = (w < 0 ? -1 : 1) * u), d && (C[r][y][M] += w)) : (_ = (S = n.dataToPoint([ y, v ]))[0] + o, 
                    x = I, w = s, b = S[1] - p, Math.abs(b) < u && (b = (b <= 0 ? -1 : 1) * u), d && (C[r][y][M] += b)), 
                    e.setItemLayout(g, {
                        x: _,
                        y: x,
                        width: w,
                        height: b
                    });
                }
            }
        }, this);
    }, "bar")), xa(mp), wa({
        seriesType: "bar",
        reset: function(t) {
            t.getData().setVisual("legendSymbol", "roundRect");
        }
    }), Qd.extend({
        type: "series.line",
        dependencies: [ "grid", "polar" ],
        getInitialData: function() {
            return ja(this.getSource(), this);
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            hoverAnimation: !0,
            clipOverflow: !0,
            label: {
                position: "top"
            },
            lineStyle: {
                width: 2,
                type: "solid"
            },
            step: !1,
            smooth: !1,
            smoothMonotone: null,
            symbol: "emptyCircle",
            symbolSize: 4,
            symbolRotate: null,
            showSymbol: !0,
            showAllSymbol: "auto",
            connectNulls: !1,
            sampling: "none",
            animationEasing: "linear",
            progressive: 0,
            hoverLayerThreshold: 1 / 0
        }
    });
    var xg = Qo.prototype, wg = Qo.getSymbolSize = function(t, e) {
        var n = t.getItemVisual(e, "symbolSize");
        return n instanceof Array ? n.slice() : [ +n, +n ];
    };
    xg._createSymbol = function(t, e, n, i, r) {
        this.removeAll();
        var a = po(t, -1, -1, 2, 2, e.getItemVisual(n, "color"), r);
        a.attr({
            z2: 100,
            culling: !0,
            scale: Jo(i)
        }), a.drift = ts, this._symbolType = t, this.add(a);
    }, xg.stopSymbolAnimation = function(t) {
        this.childAt(0).stopAnimation(t);
    }, xg.getSymbolPath = function() {
        return this.childAt(0);
    }, xg.getScale = function() {
        return this.childAt(0).scale;
    }, xg.highlight = function() {
        this.childAt(0).trigger("emphasis");
    }, xg.downplay = function() {
        this.childAt(0).trigger("normal");
    }, xg.setZ = function(t, e) {
        var n = this.childAt(0);
        n.zlevel = t, n.z = e;
    }, xg.setDraggable = function(t) {
        var e = this.childAt(0);
        e.draggable = t, e.cursor = t ? "move" : "pointer";
    }, xg.updateData = function(t, e, n) {
        this.silent = !1;
        var i = t.getItemVisual(e, "symbol") || "circle", r = t.hostModel, a = wg(t, e), o = i !== this._symbolType;
        if (o) {
            var s = t.getItemVisual(e, "symbolKeepAspect");
            this._createSymbol(i, t, e, a, s);
        } else {
            (l = this.childAt(0)).silent = !1, pi(l, {
                scale: Jo(a)
            }, r, e);
        }
        if (this._updateCommon(t, e, a, n), o) {
            var l = this.childAt(0), u = n && n.fadeIn, h = {
                scale: l.scale.slice()
            };
            u && (h.style = {
                opacity: l.style.opacity
            }), l.scale = [ 0, 0 ], u && (l.style.opacity = 0), gi(l, h, r, e);
        }
        this._seriesModel = r;
    };
    var bg = [ "itemStyle" ], Sg = [ "emphasis", "itemStyle" ], Mg = [ "label" ], Ig = [ "emphasis", "label" ];
    xg._updateCommon = function(e, t, n, i) {
        var r = this.childAt(0), a = e.hostModel, o = e.getItemVisual(t, "color");
        "image" !== r.type && r.useStyle({
            strokeNoScale: !0
        });
        var s = i && i.itemStyle, l = i && i.hoverItemStyle, u = i && i.symbolRotate, h = i && i.symbolOffset, c = i && i.labelModel, d = i && i.hoverLabelModel, f = i && i.hoverAnimation, p = i && i.cursorStyle;
        if (!i || e.hasItemOption) {
            var g = i && i.itemModel ? i.itemModel : e.getItemModel(t);
            s = g.getModel(bg).getItemStyle([ "color" ]), l = g.getModel(Sg).getItemStyle(), 
            u = g.getShallow("symbolRotate"), h = g.getShallow("symbolOffset"), c = g.getModel(Mg), 
            d = g.getModel(Ig), f = g.getShallow("hoverAnimation"), p = g.getShallow("cursor");
        } else l = k({}, l);
        var m = r.style;
        r.attr("rotation", (u || 0) * Math.PI / 180 || 0), h && r.attr("position", [ Mi(h[0], n[0]), Mi(h[1], n[1]) ]), 
        p && r.attr("cursor", p), r.setColor(o, i && i.symbolInnerColor), r.setStyle(s);
        var v = e.getItemVisual(t, "opacity");
        null != v && (m.opacity = v);
        var y = e.getItemVisual(t, "liftZ"), _ = r.__z2Origin;
        null != y ? null == _ && (r.__z2Origin = r.z2, r.z2 += y) : null != _ && (r.z2 = _, 
        r.__z2Origin = null);
        var x = i && i.useNameLabel;
        oi(m, l, c, d, {
            labelFetcher: a,
            labelDataIndex: t,
            defaultText: function(t) {
                return x ? e.getName(t) : Bo(e, t);
            },
            isRectText: !0,
            autoColor: o
        }), r.off("mouseover").off("mouseout").off("emphasis").off("normal"), r.hoverStyle = l, 
        ai(r);
        var w = Jo(n);
        if (f && a.isAnimationEnabled()) {
            var b = function() {
                if (!this.incremental) {
                    var t = w[1] / w[0];
                    this.animateTo({
                        scale: [ Math.max(1.1 * w[0], w[0] + 3), Math.max(1.1 * w[1], w[1] + 3 * t) ]
                    }, 400, "elasticOut");
                }
            }, S = function() {
                this.incremental || this.animateTo({
                    scale: w
                }, 400, "elasticOut");
            };
            r.on("mouseover", b).on("mouseout", S).on("emphasis", b).on("normal", S);
        }
    }, xg.fadeOut = function(t, e) {
        var n = this.childAt(0);
        this.silent = n.silent = !0, !(e && e.keepLabel) && (n.style.text = null), pi(n, {
            style: {
                opacity: 0
            },
            scale: [ 0, 0 ]
        }, this._seriesModel, this.dataIndex, t);
    }, a(Qo, hu);
    var Dg = es.prototype;
    Dg.updateData = function(r, a) {
        a = is(a);
        var o = this.group, s = r.hostModel, l = this._data, u = this._symbolCtor, h = rs(r);
        l || o.removeAll(), r.diff(l).add(function(t) {
            var e = r.getItemLayout(t);
            if (ns(r, e, t, a)) {
                var n = new u(r, t, h);
                n.attr("position", e), r.setItemGraphicEl(t, n), o.add(n);
            }
        }).update(function(t, e) {
            var n = l.getItemGraphicEl(e), i = r.getItemLayout(t);
            return ns(r, i, t, a) ? (n ? (n.updateData(r, t, h), pi(n, {
                position: i
            }, s)) : (n = new u(r, t)).attr("position", i), o.add(n), void r.setItemGraphicEl(t, n)) : void o.remove(n);
        }).remove(function(t) {
            var e = l.getItemGraphicEl(t);
            e && e.fadeOut(function() {
                o.remove(e);
            });
        }).execute(), this._data = r;
    }, Dg.isPersistent = function() {
        return !0;
    }, Dg.updateLayout = function() {
        var i = this._data;
        i && i.eachItemGraphicEl(function(t, e) {
            var n = i.getItemLayout(e);
            t.attr("position", n);
        });
    }, Dg.incrementalPrepareUpdate = function(t) {
        this._seriesScope = rs(t), this._data = null, this.group.removeAll();
    }, Dg.incrementalUpdate = function(t, e, n) {
        function i(t) {
            t.isGroup || (t.incremental = t.useHoverLayer = !0);
        }
        n = is(n);
        for (var r = t.start; r < t.end; r++) {
            var a = e.getItemLayout(r);
            if (ns(e, a, r, n)) {
                var o = new this._symbolCtor(e, r, this._seriesScope);
                o.traverse(i), o.attr("position", a), this.group.add(o), e.setItemGraphicEl(r, o);
            }
        }
    }, Dg.remove = function(t) {
        var e = this.group, n = this._data;
        n && t ? n.eachItemGraphicEl(function(t) {
            t.fadeOut(function() {
                e.remove(t);
            });
        }) : e.removeAll();
    };
    var Cg = K, Tg = Q, kg = W, Ag = F, Lg = [], Pg = [], Og = [], Ng = Pn.extend({
        type: "ec-polyline",
        shape: {
            points: [],
            smooth: 0,
            smoothConstraint: !0,
            smoothMonotone: null,
            connectNulls: !1
        },
        style: {
            fill: null,
            stroke: "#000"
        },
        brush: _c(Pn.prototype.brush),
        buildPath: function(t, e) {
            var n = e.points, i = 0, r = n.length, a = us(n, e.smoothConstraint);
            if (e.connectNulls) {
                for (;0 < r && ss(n[r - 1]); r--) ;
                for (;i < r && ss(n[i]); i++) ;
            }
            for (;i < r; ) i += ls(t, n, i, r, r, 1, a.min, a.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1;
        }
    }), Eg = Pn.extend({
        type: "ec-polygon",
        shape: {
            points: [],
            stackedOnPoints: [],
            smooth: 0,
            stackedOnSmooth: 0,
            smoothConstraint: !0,
            smoothMonotone: null,
            connectNulls: !1
        },
        brush: _c(Pn.prototype.brush),
        buildPath: function(t, e) {
            var n = e.points, i = e.stackedOnPoints, r = 0, a = n.length, o = e.smoothMonotone, s = us(n, e.smoothConstraint), l = us(i, e.smoothConstraint);
            if (e.connectNulls) {
                for (;0 < a && ss(n[a - 1]); a--) ;
                for (;r < a && ss(n[r]); r++) ;
            }
            for (;r < a; ) {
                var u = ls(t, n, r, a, a, 1, s.min, s.max, e.smooth, o, e.connectNulls);
                ls(t, i, r + u - 1, u, a, -1, l.min, l.max, e.stackedOnSmooth, o, e.connectNulls), 
                r += u + 1, t.closePath();
            }
        }
    });
    Nr.extend({
        type: "line",
        init: function() {
            var t = new hu(), e = new es();
            this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t;
        },
        render: function(t, e, n) {
            var i = t.coordinateSystem, r = this.group, a = t.getData(), o = t.getModel("lineStyle"), s = t.getModel("areaStyle"), l = a.mapArray(a.getItemLayout), u = "polar" === i.type, h = this._coordSys, c = this._symbolDraw, d = this._polyline, f = this._polygon, p = this._lineGroup, g = t.get("animation"), m = !s.isEmpty(), v = s.get("origin"), y = function(t, e, n) {
                if (!n.valueDim) return [];
                for (var i = [], r = 0, a = e.count(); r < a; r++) i.push(os(n, t, e, r));
                return i;
            }(i, a, as(i, a, v)), _ = t.get("showSymbol"), x = _ && !u && gs(t, a, i), w = this._data;
            w && w.eachItemGraphicEl(function(t, e) {
                t.__temp && (r.remove(t), w.setItemGraphicEl(e, null));
            }), _ || c.remove(), r.add(p);
            var b = !u && t.get("step");
            d && h.type === i.type && b === this._step ? (m && !f ? f = this._newPolygon(l, y, i, g) : f && !m && (p.remove(f), 
            f = this._polygon = null), p.setClipPath(fs(i, !1, !1, t)), _ && c.updateData(a, {
                isIgnore: x,
                clipShape: fs(i, !1, !0, t)
            }), a.eachItemGraphicEl(function(t) {
                t.stopAnimation(!0);
            }), hs(this._stackedOnPoints, y) && hs(this._points, l) || (g ? this._updateAnimation(a, y, i, n, b, v) : (b && (l = ps(l, i, b), 
            y = ps(y, i, b)), d.setShape({
                points: l
            }), f && f.setShape({
                points: l,
                stackedOnPoints: y
            })))) : (_ && c.updateData(a, {
                isIgnore: x,
                clipShape: fs(i, !1, !0, t)
            }), b && (l = ps(l, i, b), y = ps(y, i, b)), d = this._newPolyline(l, i, g), m && (f = this._newPolygon(l, y, i, g)), 
            p.setClipPath(fs(i, !0, !1, t)));
            var S = function(t, e) {
                var n = t.getVisual("visualMeta");
                if (n && n.length && t.count() && "cartesian2d" === e.type) {
                    for (var i, r, a = n.length - 1; 0 <= a; a--) {
                        var o = n[a].dimension, s = t.dimensions[o], l = t.getDimensionInfo(s);
                        if ("x" === (i = l && l.coordDim) || "y" === i) {
                            r = n[a];
                            break;
                        }
                    }
                    if (r) {
                        var u = e.getAxis(i), h = T(r.stops, function(t) {
                            return {
                                coord: u.toGlobalCoord(u.dataToCoord(t.value)),
                                color: t.color
                            };
                        }), c = h.length, d = r.outerColors.slice();
                        c && h[0].coord > h[c - 1].coord && (h.reverse(), d.reverse());
                        var f = h[0].coord - 10, p = h[c - 1].coord + 10, g = p - f;
                        if (g < .001) return "transparent";
                        R(h, function(t) {
                            t.offset = (t.coord - f) / g;
                        }), h.push({
                            offset: c ? h[c - 1].offset : .5,
                            color: d[1] || "transparent"
                        }), h.unshift({
                            offset: c ? h[0].offset : .5,
                            color: d[0] || "transparent"
                        });
                        var m = new Lc(0, 0, 0, 0, h, !0);
                        return m[i] = f, m[i + "2"] = p, m;
                    }
                }
            }(a, i) || a.getVisual("color");
            d.useStyle(C(o.getLineStyle(), {
                fill: "none",
                stroke: S,
                lineJoin: "bevel"
            }));
            var M = t.get("smooth");
            if (M = cs(t.get("smooth")), d.setShape({
                smooth: M,
                smoothMonotone: t.get("smoothMonotone"),
                connectNulls: t.get("connectNulls")
            }), f) {
                var I = a.getCalculationInfo("stackedOnSeries"), D = 0;
                f.useStyle(C(s.getAreaStyle(), {
                    fill: S,
                    opacity: .7,
                    lineJoin: "bevel"
                })), I && (D = cs(I.get("smooth"))), f.setShape({
                    smooth: M,
                    stackedOnSmooth: D,
                    smoothMonotone: t.get("smoothMonotone"),
                    connectNulls: t.get("connectNulls")
                });
            }
            this._data = a, this._coordSys = i, this._stackedOnPoints = y, this._points = l, 
            this._step = b, this._valueOrigin = v;
        },
        dispose: function() {},
        highlight: function(t, e, n, i) {
            var r = t.getData(), a = $e(r, i);
            if (!(a instanceof Array) && null != a && 0 <= a) {
                var o = r.getItemGraphicEl(a);
                if (!o) {
                    var s = r.getItemLayout(a);
                    if (!s) return;
                    (o = new Qo(r, a)).position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), 
                    o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o);
                }
                o.highlight();
            } else Nr.prototype.highlight.call(this, t, e, n, i);
        },
        downplay: function(t, e, n, i) {
            var r = t.getData(), a = $e(r, i);
            if (null != a && 0 <= a) {
                var o = r.getItemGraphicEl(a);
                o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay());
            } else Nr.prototype.downplay.call(this, t, e, n, i);
        },
        _newPolyline: function(t) {
            var e = this._polyline;
            return e && this._lineGroup.remove(e), e = new Ng({
                shape: {
                    points: t
                },
                silent: !0,
                z2: 10
            }), this._lineGroup.add(e), this._polyline = e;
        },
        _newPolygon: function(t, e) {
            var n = this._polygon;
            return n && this._lineGroup.remove(n), n = new Eg({
                shape: {
                    points: t,
                    stackedOnPoints: e
                },
                silent: !0
            }), this._lineGroup.add(n), this._polygon = n;
        },
        _updateAnimation: function(t, e, n, i, r, a) {
            var o = this._polyline, s = this._polygon, l = t.hostModel, u = function(t, e, n, i, r, a, o, s) {
                for (var l = function(t, e) {
                    var n = [];
                    return e.diff(t).add(function(t) {
                        n.push({
                            cmd: "+",
                            idx: t
                        });
                    }).update(function(t, e) {
                        n.push({
                            cmd: "=",
                            idx: e,
                            idx1: t
                        });
                    }).remove(function(t) {
                        n.push({
                            cmd: "-",
                            idx: t
                        });
                    }).execute(), n;
                }(t, e), u = [], h = [], c = [], d = [], f = [], p = [], g = [], m = as(r, e, o), v = as(a, t, s), y = 0; y < l.length; y++) {
                    var _ = l[y], x = !0;
                    switch (_.cmd) {
                      case "=":
                        var w = t.getItemLayout(_.idx), b = e.getItemLayout(_.idx1);
                        (isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), u.push(w), h.push(b), c.push(n[_.idx]), 
                        d.push(i[_.idx1]), g.push(e.getRawIndex(_.idx1));
                        break;

                      case "+":
                        var S = _.idx;
                        u.push(r.dataToPoint([ e.get(m.dataDimsForPoint[0], S), e.get(m.dataDimsForPoint[1], S) ])), 
                        h.push(e.getItemLayout(S).slice()), c.push(os(m, r, e, S)), d.push(i[S]), g.push(e.getRawIndex(S));
                        break;

                      case "-":
                        S = _.idx;
                        var M = t.getRawIndex(S);
                        M !== S ? (u.push(t.getItemLayout(S)), h.push(a.dataToPoint([ t.get(v.dataDimsForPoint[0], S), t.get(v.dataDimsForPoint[1], S) ])), 
                        c.push(n[S]), d.push(os(v, a, t, S)), g.push(M)) : x = !1;
                    }
                    x && (f.push(_), p.push(p.length));
                }
                p.sort(function(t, e) {
                    return g[t] - g[e];
                });
                var I = [], D = [], C = [], T = [], k = [];
                for (y = 0; y < p.length; y++) S = p[y], I[y] = u[S], D[y] = h[S], C[y] = c[S], 
                T[y] = d[S], k[y] = f[S];
                return {
                    current: I,
                    next: D,
                    stackedOnCurrent: C,
                    stackedOnNext: T,
                    status: k
                };
            }(this._data, t, this._stackedOnPoints, e, this._coordSys, n, this._valueOrigin, a), h = u.current, c = u.stackedOnCurrent, d = u.next, f = u.stackedOnNext;
            r && (h = ps(u.current, n, r), c = ps(u.stackedOnCurrent, n, r), d = ps(u.next, n, r), 
            f = ps(u.stackedOnNext, n, r)), o.shape.__points = u.current, o.shape.points = h, 
            pi(o, {
                shape: {
                    points: d
                }
            }, l), s && (s.setShape({
                points: h,
                stackedOnPoints: c
            }), pi(s, {
                shape: {
                    points: d,
                    stackedOnPoints: f
                }
            }, l));
            for (var p = [], g = u.status, m = 0; m < g.length; m++) {
                if ("=" === g[m].cmd) {
                    var v = t.getItemGraphicEl(g[m].idx1);
                    v && p.push({
                        el: v,
                        ptIdx: m
                    });
                }
            }
            o.animators && o.animators.length && o.animators[0].during(function() {
                for (var t = 0; t < p.length; t++) {
                    p[t].el.attr("position", o.shape.__points[p[t].ptIdx]);
                }
            });
        },
        remove: function() {
            var n = this.group, i = this._data;
            this._lineGroup.removeAll(), this._symbolDraw.remove(!0), i && i.eachItemGraphicEl(function(t, e) {
                t.__temp && (n.remove(t), i.setItemGraphicEl(e, null));
            }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
        }
    });
    var zg, Rg, Bg, Fg = {
        average: function(t) {
            for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || (e += t[i], n++);
            return 0 === n ? NaN : e / n;
        },
        sum: function(t) {
            for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
            return e;
        },
        max: function(t) {
            for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
            return isFinite(e) ? e : NaN;
        },
        min: function(t) {
            for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
            return isFinite(e) ? e : NaN;
        },
        nearest: function(t) {
            return t[0];
        }
    }, Vg = function(t) {
        return Math.round(t.length / 2);
    };
    wa((Rg = "circle", Bg = zg = "line", {
        seriesType: zg,
        performRawSeries: !0,
        reset: function(l, t) {
            var e = l.getData(), n = l.get("symbol") || Rg, u = l.get("symbolSize"), i = l.get("symbolKeepAspect");
            if (e.setVisual({
                legendSymbol: Bg || n,
                symbol: n,
                symbolSize: u,
                symbolKeepAspect: i
            }), !t.isSeriesFiltered(l)) {
                var r = "function" == typeof u;
                return {
                    dataEach: e.hasItemOption || r ? function(t, e) {
                        if ("function" == typeof u) {
                            var n = l.getRawValue(e), i = l.getDataParams(e);
                            t.setItemVisual(e, "symbolSize", u(n, i));
                        }
                        if (t.hasItemOption) {
                            var r = t.getItemModel(e), a = r.getShallow("symbol", !0), o = r.getShallow("symbolSize", !0), s = r.getShallow("symbolKeepAspect", !0);
                            null != a && t.setItemVisual(e, "symbol", a), null != o && t.setItemVisual(e, "symbolSize", o), 
                            null != s && t.setItemVisual(e, "symbolKeepAspect", s);
                        }
                    } : null
                };
            }
        }
    })), xa({
        seriesType: "line",
        plan: ef(),
        reset: function(t) {
            var e = t.getData(), c = t.coordinateSystem, d = t.pipelineContext.large;
            if (c) {
                var f = T(c.dimensions, function(t) {
                    return e.mapDimension(t);
                }).slice(0, 2), p = f.length, n = e.getCalculationInfo("stackResultDimension");
                return Ha(e, f[0]) && (f[0] = n), Ha(e, f[1]) && (f[1] = n), p && {
                    progress: function(t, e) {
                        for (var n = t.end - t.start, i = d && new Float32Array(n * p), r = t.start, a = 0, o = [], s = []; r < t.end; r++) {
                            var l;
                            if (1 === p) {
                                var u = e.get(f[0], r);
                                l = !isNaN(u) && c.dataToPoint(u, null, s);
                            } else {
                                u = o[0] = e.get(f[0], r);
                                var h = o[1] = e.get(f[1], r);
                                l = !isNaN(u) && !isNaN(h) && c.dataToPoint(o, null, s);
                            }
                            d ? (i[a++] = l ? l[0] : NaN, i[a++] = l ? l[1] : NaN) : e.setItemLayout(r, l && l.slice() || [ NaN, NaN ]);
                        }
                        d && e.setLayout("symbolPoints", i);
                    }
                };
            }
        }
    }), ya(Tf.PROCESSOR.STATISTIC, {
        seriesType: "line",
        modifyOutputEnd: !0,
        reset: function(t) {
            var e = t.getData(), n = t.get("sampling"), i = t.coordinateSystem;
            if ("cartesian2d" === i.type && n) {
                var r, a = i.getBaseAxis(), o = i.getOtherAxis(a), s = a.getExtent(), l = s[1] - s[0], u = Math.round(e.count() / l);
                1 < u && ("string" == typeof n ? r = Fg[n] : "function" == typeof n && (r = n), 
                r && t.setData(e.downSample(e.mapDimension(o.dim), 1 / u, r, Vg)));
            }
        }
    });
    var Gg = function(t, e, n) {
        e = A(e) && {
            coordDimensions: e
        } || k({}, e);
        var i = t.getSource(), r = sp(i, e), a = new rp(r, t);
        return a.initData(i, n), a;
    }, Wg = {
        updateSelectedMap: function(t) {
            this._targetList = A(t) ? t.slice() : [], this._selectTargetMap = g(t || [], function(t, e) {
                return t.set(e.name, e), t;
            }, z());
        },
        select: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            "single" === this.get("selectedMode") && this._selectTargetMap.each(function(t) {
                t.selected = !1;
            }), n && (n.selected = !0);
        },
        unSelect: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            n && (n.selected = !1);
        },
        toggleSelected: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            return null != n ? (this[n.selected ? "unSelect" : "select"](t, e), n.selected) : void 0;
        },
        isSelected: function(t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            return n && n.selected;
        }
    }, Hg = Da({
        type: "series.pie",
        init: function(t) {
            Hg.superApply(this, "init", arguments), this.legendDataProvider = function() {
                return this.getRawData();
            }, this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t);
        },
        mergeOption: function(t) {
            Hg.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList());
        },
        getInitialData: function() {
            return Gg(this, [ "value" ]);
        },
        _createSelectableList: function() {
            for (var t = this.getRawData(), e = t.mapDimension("value"), n = [], i = 0, r = t.count(); i < r; i++) n.push({
                name: t.getName(i),
                value: t.get(e, i),
                selected: Sr(t, i, "selected")
            });
            return n;
        },
        getDataParams: function(t) {
            var e = this.getData(), n = Hg.superCall(this, "getDataParams", t), i = [];
            return e.each(e.mapDimension("value"), function(t) {
                i.push(t);
            }), n.percent = ki(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), 
            n;
        },
        _defaultLabelLine: function(t) {
            je(t, "labelLine", [ "show" ]);
            var e = t.labelLine, n = t.emphasis.labelLine;
            e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show;
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            legendHoverLink: !0,
            hoverAnimation: !0,
            center: [ "50%", "50%" ],
            radius: [ 0, "75%" ],
            clockwise: !0,
            startAngle: 90,
            minAngle: 0,
            selectedOffset: 10,
            hoverOffset: 10,
            avoidLabelOverlap: !0,
            percentPrecision: 2,
            stillShowZeroSum: !0,
            label: {
                rotate: !1,
                show: !0,
                position: "outer"
            },
            labelLine: {
                show: !0,
                length: 15,
                length2: 15,
                smooth: !1,
                lineStyle: {
                    width: 1,
                    type: "solid"
                }
            },
            itemStyle: {
                borderWidth: 1
            },
            animationType: "expansion",
            animationEasing: "cubicOut"
        }
    });
    r(Hg, Wg);
    var qg = ys.prototype;
    qg.updateData = function(t, e, n) {
        function i() {
            a.stopAnimation(!0), a.animateTo({
                shape: {
                    r: l.r + o.get("hoverOffset")
                }
            }, 300, "elasticOut");
        }
        function r() {
            a.stopAnimation(!0), a.animateTo({
                shape: {
                    r: l.r
                }
            }, 300, "elasticOut");
        }
        var a = this.childAt(0), o = t.hostModel, s = t.getItemModel(e), l = t.getItemLayout(e), u = k({}, l);
        (u.label = null, n) ? (a.setShape(u), "scale" === o.getShallow("animationType") ? (a.shape.r = l.r0, 
        gi(a, {
            shape: {
                r: l.r
            }
        }, o, e)) : (a.shape.endAngle = l.startAngle, pi(a, {
            shape: {
                endAngle: l.endAngle
            }
        }, o, e))) : pi(a, {
            shape: u
        }, o, e);
        var h = t.getItemVisual(e, "color");
        a.useStyle(C({
            lineJoin: "bevel",
            fill: h
        }, s.getModel("itemStyle").getItemStyle())), a.hoverStyle = s.getModel("emphasis.itemStyle").getItemStyle();
        var c = s.getShallow("cursor");
        c && a.attr("cursor", c), vs(this, t.getItemLayout(e), o.isSelected(null, e), o.get("selectedOffset"), o.get("animation")), 
        a.off("mouseover").off("mouseout").off("emphasis").off("normal"), s.get("hoverAnimation") && o.isAnimationEnabled() && a.on("mouseover", i).on("mouseout", r).on("emphasis", i).on("normal", r), 
        this._updateLabel(t, e), ai(this);
    }, qg._updateLabel = function(t, e) {
        var n = this.childAt(1), i = this.childAt(2), r = t.hostModel, a = t.getItemModel(e), o = t.getItemLayout(e).label, s = t.getItemVisual(e, "color");
        pi(n, {
            shape: {
                points: o.linePoints || [ [ o.x, o.y ], [ o.x, o.y ], [ o.x, o.y ] ]
            }
        }, r, e), pi(i, {
            style: {
                x: o.x,
                y: o.y
            }
        }, r, e), i.attr({
            rotation: o.rotation,
            origin: [ o.x, o.y ],
            z2: 10
        });
        var l = a.getModel("label"), u = a.getModel("emphasis.label"), h = a.getModel("labelLine"), c = a.getModel("emphasis.labelLine");
        s = t.getItemVisual(e, "color");
        oi(i.style, i.hoverStyle = {}, l, u, {
            labelFetcher: t.hostModel,
            labelDataIndex: e,
            defaultText: t.getName(e),
            autoColor: s,
            useInsideStyle: !!o.inside
        }, {
            textAlign: o.textAlign,
            textVerticalAlign: o.verticalAlign,
            opacity: t.getItemVisual(e, "opacity")
        }), i.ignore = i.normalIgnore = !l.get("show"), i.hoverIgnore = !u.get("show"), 
        n.ignore = n.normalIgnore = !h.get("show"), n.hoverIgnore = !c.get("show"), n.setStyle({
            stroke: s,
            opacity: t.getItemVisual(e, "opacity")
        }), n.setStyle(h.getModel("lineStyle").getLineStyle()), n.hoverStyle = c.getModel("lineStyle").getLineStyle();
        var d = h.get("smooth");
        d && !0 === d && (d = .4), n.setShape({
            smooth: d
        });
    }, a(ys, hu);
    var jg = (Nr.extend({
        type: "pie",
        init: function() {
            var t = new hu();
            this._sectorGroup = t;
        },
        render: function(t, e, n, i) {
            if (!i || i.from !== this.uid) {
                var r = t.getData(), a = this._data, o = this.group, s = e.get("animation"), l = !a, u = t.get("animationType"), h = y(ms, this.uid, t, s, n), c = t.get("selectedMode");
                if (r.diff(a).add(function(t) {
                    var e = new ys(r, t);
                    l && "scale" !== u && e.eachChild(function(t) {
                        t.stopAnimation(!0);
                    }), c && e.on("click", h), r.setItemGraphicEl(t, e), o.add(e);
                }).update(function(t, e) {
                    var n = a.getItemGraphicEl(e);
                    n.updateData(r, t), n.off("click"), c && n.on("click", h), o.add(n), r.setItemGraphicEl(t, n);
                }).remove(function(t) {
                    var e = a.getItemGraphicEl(t);
                    o.remove(e);
                }).execute(), s && l && 0 < r.count() && "scale" !== u) {
                    var d = r.getItemLayout(0), f = Math.max(n.getWidth(), n.getHeight()) / 2, p = v(o.removeClipPath, o);
                    o.setClipPath(this._createClipPath(d.cx, d.cy, f, d.startAngle, d.clockwise, p, t));
                }
                this._data = r;
            }
        },
        dispose: function() {},
        _createClipPath: function(t, e, n, i, r, a, o) {
            var s = new xc({
                shape: {
                    cx: t,
                    cy: e,
                    r0: 0,
                    r: n,
                    startAngle: i,
                    endAngle: i,
                    clockwise: r
                }
            });
            return gi(s, {
                shape: {
                    endAngle: i + (r ? 1 : -1) * Math.PI * 2
                }
            }, o, a), s;
        },
        containPoint: function(t, e) {
            var n = e.getData().getItemLayout(0);
            if (n) {
                var i = t[0] - n.cx, r = t[1] - n.cy, a = Math.sqrt(i * i + r * r);
                return a <= n.r && a >= n.r0;
            }
        }
    }), function(n, t) {
        R(t, function(a) {
            a.update = "updateView", _a(a, function(t, e) {
                var r = {};
                return e.eachComponent({
                    mainType: "series",
                    subType: n,
                    query: t
                }, function(n) {
                    n[a.method] && n[a.method](t.name, t.dataIndex);
                    var i = n.getData();
                    i.each(function(t) {
                        var e = i.getName(t);
                        r[e] = n.isSelected(e) || !1;
                    });
                }), {
                    name: t.name,
                    selected: r
                };
            });
        });
    }), Ug = function(i) {
        return {
            getTargetSeries: function(t) {
                var e = {}, n = z();
                return t.eachSeriesByType(i, function(t) {
                    t.__paletteScope = e, n.set(t.uid, t);
                }), n;
            },
            reset: function(r) {
                var a = r.getRawData(), o = {}, s = r.getData();
                s.each(function(t) {
                    var e = s.getRawIndex(t);
                    o[e] = t;
                }), a.each(function(t) {
                    var e = o[t], n = null != e && s.getItemVisual(e, "color", !0);
                    if (n) a.setItemVisual(t, "color", n); else {
                        var i = a.getItemModel(t).get("itemStyle.color") || r.getColorFromPalette(a.getName(t) || t + "", r.__paletteScope, a.count());
                        a.setItemVisual(t, "color", i), null != e && s.setItemVisual(e, "color", i);
                    }
                });
            }
        };
    }, Xg = function(M, I, t, e) {
        var D, C, T = M.getData(), k = [], A = !1;
        T.each(function(t) {
            var e, n, i, r, a = T.getItemLayout(t), o = T.getItemModel(t), s = o.getModel("label"), l = s.get("position") || o.get("emphasis.label.position"), u = o.getModel("labelLine"), h = u.get("length"), c = u.get("length2"), d = (a.startAngle + a.endAngle) / 2, f = Math.cos(d), p = Math.sin(d);
            D = a.cx, C = a.cy;
            var g = "inside" === l || "inner" === l;
            if ("center" === l) e = a.cx, n = a.cy, r = "center"; else {
                var m = (g ? (a.r + a.r0) / 2 * f : a.r * f) + D, v = (g ? (a.r + a.r0) / 2 * p : a.r * p) + C;
                if (e = m + 3 * f, n = v + 3 * p, !g) {
                    var y = m + f * (h + I - a.r), _ = v + p * (h + I - a.r), x = y + (f < 0 ? -1 : 1) * c;
                    e = x + (f < 0 ? -5 : 5), i = [ [ m, v ], [ y, _ ], [ x, n = _ ] ];
                }
                r = g ? "center" : 0 < f ? "left" : "right";
            }
            var w = s.getFont(), b = s.get("rotate") ? f < 0 ? -d + Math.PI : -d : 0, S = re(M.getFormattedLabel(t, "normal") || T.getName(t), w, r, "top");
            A = !!b, a.label = {
                x: e,
                y: n,
                position: l,
                height: S.height,
                len: h,
                len2: c,
                linePoints: i,
                textAlign: r,
                verticalAlign: "middle",
                rotation: b,
                inside: g
            }, g || k.push(a.label);
        }), !A && M.get("avoidLabelOverlap") && function(t, e, n, i, r, a) {
            for (var o = [], s = [], l = 0; l < t.length; l++) t[l].x < e ? o.push(t[l]) : s.push(t[l]);
            for (_s(s, e, n, i, 1, 0, a), _s(o, e, n, i, -1, 0, a), l = 0; l < t.length; l++) {
                var u = t[l].linePoints;
                if (u) {
                    var h = u[1][0] - u[2][0];
                    u[2][0] = t[l].x < e ? t[l].x + 3 : t[l].x - 3, u[1][1] = u[2][1] = t[l].y, u[1][0] = u[2][0] + h;
                }
            }
        }(k, D, C, I, 0, e);
    }, Yg = 2 * Math.PI, Zg = Math.PI / 180, $g = function(t) {
        return {
            seriesType: t,
            reset: function(t, e) {
                var i = e.findComponents({
                    mainType: "legend"
                });
                if (i && i.length) {
                    var r = t.getData();
                    r.filterSelf(function(t) {
                        for (var e = r.getName(t), n = 0; n < i.length; n++) if (!i[n].isSelected(e)) return !1;
                        return !0;
                    });
                }
            }
        };
    };
    jg("pie", [ {
        type: "pieToggleSelect",
        event: "pieselectchanged",
        method: "toggleSelected"
    }, {
        type: "pieSelect",
        event: "pieselected",
        method: "select"
    }, {
        type: "pieUnSelect",
        event: "pieunselected",
        method: "unSelect"
    } ]), wa(Ug("pie")), xa(y(function(t, e, D) {
        e.eachSeriesByType(t, function(t) {
            var r = t.getData(), e = r.mapDimension("value"), n = t.get("center"), i = t.get("radius");
            A(i) || (i = [ 0, i ]), A(n) || (n = [ n, n ]);
            var a = D.getWidth(), o = D.getHeight(), s = Math.min(a, o), l = Mi(n[0], a), u = Mi(n[1], o), h = Mi(i[0], s / 2), c = Mi(i[1], s / 2), d = -t.get("startAngle") * Zg, f = t.get("minAngle") * Zg, p = 0;
            r.each(e, function(t) {
                !isNaN(t) && p++;
            });
            var g = r.getSum(e), m = Math.PI / (g || p) * 2, v = t.get("clockwise"), y = t.get("roseType"), _ = t.get("stillShowZeroSum"), x = r.getDataExtent(e);
            x[0] = 0;
            var w = Yg, b = 0, S = d, M = v ? 1 : -1;
            if (r.each(e, function(t, e) {
                var n;
                if (isNaN(t)) r.setItemLayout(e, {
                    angle: NaN,
                    startAngle: NaN,
                    endAngle: NaN,
                    clockwise: v,
                    cx: l,
                    cy: u,
                    r0: h,
                    r: y ? NaN : c
                }); else {
                    (n = "area" !== y ? 0 === g && _ ? m : t * m : Yg / p) < f ? w -= n = f : b += t;
                    var i = S + M * n;
                    r.setItemLayout(e, {
                        angle: n,
                        startAngle: S,
                        endAngle: i,
                        clockwise: v,
                        cx: l,
                        cy: u,
                        r0: h,
                        r: y ? Si(t, x, [ h, c ]) : c
                    }), S = i;
                }
            }), w < Yg && p) if (w <= .001) {
                var I = Yg / p;
                r.each(e, function(t, e) {
                    if (!isNaN(t)) {
                        var n = r.getItemLayout(e);
                        n.angle = I, n.startAngle = d + M * e * I, n.endAngle = d + M * (e + 1) * I;
                    }
                });
            } else m = w / b, S = d, r.each(e, function(t, e) {
                if (!isNaN(t)) {
                    var n = r.getItemLayout(e), i = n.angle === f ? f : t * m;
                    n.startAngle = S, n.endAngle = S + M * i, S += M * i;
                }
            });
            Xg(t, c, 0, o);
        });
    }, "pie")), ya($g("pie"));
    var Kg = Da({
        type: "series.funnel",
        init: function(t) {
            Kg.superApply(this, "init", arguments), this.legendDataProvider = function() {
                return this.getRawData();
            }, this._defaultLabelLine(t);
        },
        getInitialData: function() {
            return Gg(this, [ "value" ]);
        },
        _defaultLabelLine: function(t) {
            je(t, "labelLine", [ "show" ]);
            var e = t.labelLine, n = t.emphasis.labelLine;
            e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show;
        },
        getDataParams: function(t) {
            var e = this.getData(), n = Kg.superCall(this, "getDataParams", t), i = e.mapDimension("value"), r = e.getSum(i);
            return n.percent = r ? +(e.get(i, t) / r * 100).toFixed(2) : 0, n.$vars.push("percent"), 
            n;
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            legendHoverLink: !0,
            left: 80,
            top: 60,
            right: 80,
            bottom: 60,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 0,
            funnelAlign: "center",
            label: {
                show: !0,
                position: "outer"
            },
            labelLine: {
                show: !0,
                length: 20,
                lineStyle: {
                    width: 1,
                    type: "solid"
                }
            },
            itemStyle: {
                borderColor: "#fff",
                borderWidth: 1
            },
            emphasis: {
                label: {
                    show: !0
                }
            }
        }
    }), Qg = xs.prototype, Jg = [ "itemStyle", "opacity" ];
    Qg.updateData = function(t, e, n) {
        var i = this.childAt(0), r = t.hostModel, a = t.getItemModel(e), o = t.getItemLayout(e), s = t.getItemModel(e).get(Jg);
        s = null == s ? 1 : s, i.useStyle({}), n ? (i.setShape({
            points: o.points
        }), i.setStyle({
            opacity: 0
        }), gi(i, {
            style: {
                opacity: s
            }
        }, r, e)) : pi(i, {
            style: {
                opacity: s
            },
            shape: {
                points: o.points
            }
        }, r, e);
        var l = a.getModel("itemStyle"), u = t.getItemVisual(e, "color");
        i.setStyle(C({
            lineJoin: "round",
            fill: u
        }, l.getItemStyle([ "opacity" ]))), i.hoverStyle = l.getModel("emphasis").getItemStyle(), 
        this._updateLabel(t, e), ai(this);
    }, Qg._updateLabel = function(t, e) {
        var n = this.childAt(1), i = this.childAt(2), r = t.hostModel, a = t.getItemModel(e), o = t.getItemLayout(e).label, s = t.getItemVisual(e, "color");
        pi(n, {
            shape: {
                points: o.linePoints || o.linePoints
            }
        }, r, e), pi(i, {
            style: {
                x: o.x,
                y: o.y
            }
        }, r, e), i.attr({
            rotation: o.rotation,
            origin: [ o.x, o.y ],
            z2: 10
        });
        var l = a.getModel("label"), u = a.getModel("emphasis.label"), h = a.getModel("labelLine"), c = a.getModel("emphasis.labelLine");
        s = t.getItemVisual(e, "color");
        oi(i.style, i.hoverStyle = {}, l, u, {
            labelFetcher: t.hostModel,
            labelDataIndex: e,
            defaultText: t.getName(e),
            autoColor: s,
            useInsideStyle: !!o.inside
        }, {
            textAlign: o.textAlign,
            textVerticalAlign: o.verticalAlign
        }), i.ignore = i.normalIgnore = !l.get("show"), i.hoverIgnore = !u.get("show"), 
        n.ignore = n.normalIgnore = !h.get("show"), n.hoverIgnore = !c.get("show"), n.setStyle({
            stroke: s
        }), n.setStyle(h.getModel("lineStyle").getLineStyle()), n.hoverStyle = c.getModel("lineStyle").getLineStyle();
    }, a(xs, hu);
    var tm = (Nr.extend({
        type: "funnel",
        render: function(t) {
            var i = t.getData(), r = this._data, a = this.group;
            i.diff(r).add(function(t) {
                var e = new xs(i, t);
                i.setItemGraphicEl(t, e), a.add(e);
            }).update(function(t, e) {
                var n = r.getItemGraphicEl(e);
                n.updateData(i, t), a.add(n), i.setItemGraphicEl(t, n);
            }).remove(function(t) {
                var e = r.getItemGraphicEl(t);
                a.remove(e);
            }).execute(), this._data = i;
        },
        remove: function() {
            this.group.removeAll(), this._data = null;
        },
        dispose: function() {}
    }), function(t, S) {
        t.eachSeriesByType("funnel", function(t) {
            var e, r = t.getData(), a = r.mapDimension("value"), n = t.get("sort"), o = (e = S, 
            Hi(t.getBoxLayoutParams(), {
                width: e.getWidth(),
                height: e.getHeight()
            })), i = function(t, e) {
                for (var n = t.mapDimension("value"), i = t.mapArray(n, function(t) {
                    return t;
                }), r = [], a = "ascending" === e, o = 0, s = t.count(); o < s; o++) r[o] = o;
                return "function" == typeof e ? r.sort(e) : "none" !== e && r.sort(function(t, e) {
                    return a ? i[t] - i[e] : i[e] - i[t];
                }), r;
            }(r, n), s = [ Mi(t.get("minSize"), o.width), Mi(t.get("maxSize"), o.width) ], l = r.getDataExtent(a), u = t.get("min"), h = t.get("max");
            null == u && (u = Math.min(l[0], 0)), null == h && (h = l[1]);
            var g, c = t.get("funnelAlign"), d = t.get("gap"), f = (o.height - d * (r.count() - 1)) / r.count(), p = o.y, m = function(t, e) {
                var n, i = Si(r.get(a, t) || 0, [ u, h ], s, !0);
                switch (c) {
                  case "left":
                    n = o.x;
                    break;

                  case "center":
                    n = o.x + (o.width - i) / 2;
                    break;

                  case "right":
                    n = o.x + o.width - i;
                }
                return [ [ n, e ], [ n + i, e ] ];
            };
            "ascending" === n && (f = -f, d = -d, p += o.height, i = i.reverse());
            for (var v = 0; v < i.length; v++) {
                var y = i[v], _ = i[v + 1], x = r.getItemModel(y).get("itemStyle.height");
                null == x ? x = f : (x = Mi(x, o.height), "ascending" === n && (x = -x));
                var w = m(y, p), b = m(_, p + x);
                p += x + d, r.setItemLayout(y, {
                    points: w.concat(b.slice().reverse())
                });
            }
            (g = r).each(function(t) {
                var e, n, i, r, a = g.getItemModel(t), o = a.getModel("label").get("position"), s = a.getModel("labelLine"), l = g.getItemLayout(t), u = l.points, h = "inner" === o || "inside" === o || "center" === o;
                if (h) e = "center", r = [ [ n = (u[0][0] + u[1][0] + u[2][0] + u[3][0]) / 4, i = (u[0][1] + u[1][1] + u[2][1] + u[3][1]) / 4 ], [ n, i ] ]; else {
                    var c, d, f, p = s.get("length");
                    "left" === o ? (c = (u[3][0] + u[0][0]) / 2, d = (u[3][1] + u[0][1]) / 2, n = (f = c - p) - 5, 
                    e = "right") : (c = (u[1][0] + u[2][0]) / 2, d = (u[1][1] + u[2][1]) / 2, n = (f = c + p) + 5, 
                    e = "left"), r = [ [ c, d ], [ f, d ] ], i = d;
                }
                l.label = {
                    linePoints: r,
                    x: n,
                    y: i,
                    verticalAlign: "middle",
                    textAlign: e,
                    inside: h
                };
            });
        });
    });
    wa(Ug("funnel")), xa(tm), ya($g("funnel")), Ma({
        type: "title",
        layoutMode: {
            type: "box",
            ignoreSize: !0
        },
        defaultOption: {
            zlevel: 0,
            z: 6,
            show: !0,
            text: "",
            target: "blank",
            subtext: "",
            subtarget: "blank",
            left: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: "bolder",
                color: "#333"
            },
            subtextStyle: {
                color: "#aaa"
            }
        }
    }), Ia({
        type: "title",
        render: function(t, e, n) {
            if (this.group.removeAll(), t.get("show")) {
                var i = this.group, r = t.getModel("textStyle"), a = t.getModel("subtextStyle"), o = t.get("textAlign"), s = t.get("textBaseline"), l = new mc({
                    style: si({}, r, {
                        text: t.get("text"),
                        textFill: r.getTextColor()
                    }, {
                        disableBox: !0
                    }),
                    z2: 10
                }), u = l.getBoundingRect(), h = t.get("subtext"), c = new mc({
                    style: si({}, a, {
                        text: h,
                        textFill: a.getTextColor(),
                        y: u.height + t.get("itemGap"),
                        textVerticalAlign: "top"
                    }, {
                        disableBox: !0
                    }),
                    z2: 10
                }), d = t.get("link"), f = t.get("sublink");
                l.silent = !d, c.silent = !f, d && l.on("click", function() {
                    window.open(d, "_" + t.get("target"));
                }), f && c.on("click", function() {
                    window.open(f, "_" + t.get("subtarget"));
                }), i.add(l), h && i.add(c);
                var p = i.getBoundingRect(), g = t.getBoxLayoutParams();
                g.width = p.width, g.height = p.height;
                var m = Hi(g, {
                    width: n.getWidth(),
                    height: n.getHeight()
                }, t.get("padding"));
                o || ("middle" === (o = t.get("left") || t.get("right")) && (o = "center"), "right" === o ? m.x += m.width : "center" === o && (m.x += m.width / 2)), 
                s || ("center" === (s = t.get("top") || t.get("bottom")) && (s = "middle"), "bottom" === s ? m.y += m.height : "middle" === s && (m.y += m.height / 2), 
                s = s || "top"), i.attr("position", [ m.x, m.y ]);
                var v = {
                    textAlign: o,
                    textVerticalAlign: s
                };
                l.setStyle(v), c.setStyle(v), p = i.getBoundingRect();
                var y = m.margin, _ = t.getItemStyle([ "color", "opacity" ]);
                _.fill = t.get("backgroundColor");
                var x = new Mc({
                    shape: {
                        x: p.x - y[3],
                        y: p.y - y[0],
                        width: p.width + y[1] + y[3],
                        height: p.height + y[0] + y[2],
                        r: t.get("borderRadius")
                    },
                    style: _,
                    silent: !0
                });
                jn(x), i.add(x);
            }
        }
    });
    var em = Ma({
        type: "legend.plain",
        dependencies: [ "series" ],
        layoutMode: {
            type: "box",
            ignoreSize: !0
        },
        init: function(t, e, n) {
            this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {};
        },
        mergeOption: function(t) {
            em.superCall(this, "mergeOption", t);
        },
        optionUpdated: function() {
            this._updateData(this.ecModel);
            var t = this._data;
            if (t[0] && "single" === this.get("selectedMode")) {
                for (var e = !1, n = 0; n < t.length; n++) {
                    var i = t[n].get("name");
                    if (this.isSelected(i)) {
                        this.select(i), e = !0;
                        break;
                    }
                }
                !e && this.select(t[0].get("name"));
            }
        },
        _updateData: function(a) {
            var o = [], s = [];
            a.eachRawSeries(function(t) {
                var e, n = t.name;
                if (s.push(n), t.legendDataProvider) {
                    var i = t.legendDataProvider(), r = i.mapArray(i.getName);
                    a.isSeriesFiltered(t) || (s = s.concat(r)), r.length ? o = o.concat(r) : e = !0;
                } else e = !0;
                e && Ye(t) && o.push(t.name);
            }), this._availableNames = s;
            var t = T(this.get("data") || o, function(t) {
                return ("string" == typeof t || "number" == typeof t) && (t = {
                    name: t
                }), new _i(t, this, this.ecModel);
            }, this);
            this._data = t;
        },
        getData: function() {
            return this._data;
        },
        select: function(t) {
            var e = this.option.selected;
            "single" === this.get("selectedMode") && R(this._data, function(t) {
                e[t.get("name")] = !1;
            });
            e[t] = !0;
        },
        unSelect: function(t) {
            "single" !== this.get("selectedMode") && (this.option.selected[t] = !1);
        },
        toggleSelected: function(t) {
            var e = this.option.selected;
            e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t);
        },
        isSelected: function(t) {
            var e = this.option.selected;
            return !(e.hasOwnProperty(t) && !e[t]) && 0 <= d(this._availableNames, t);
        },
        defaultOption: {
            zlevel: 0,
            z: 4,
            show: !0,
            orient: "horizontal",
            left: "center",
            top: 0,
            align: "auto",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            inactiveColor: "#ccc",
            textStyle: {
                color: "#333"
            },
            selectedMode: !0,
            tooltip: {
                show: !1
            }
        }
    });
    _a("legendToggleSelect", "legendselectchanged", y(ws, "toggleSelected")), _a("legendSelect", "legendselected", y(ws, "select")), 
    _a("legendUnSelect", "legendunselected", y(ws, "unSelect"));
    var nm = y, im = R, rm = hu, am = Ia({
        type: "legend.plain",
        newlineDisabled: !1,
        init: function() {
            this.group.add(this._contentGroup = new rm()), this._backgroundEl;
        },
        getContentGroup: function() {
            return this._contentGroup;
        },
        render: function(t, e, n) {
            if (this.resetInner(), t.get("show", !0)) {
                var i = t.get("align");
                i && "auto" !== i || (i = "right" === t.get("left") && "vertical" === t.get("orient") ? "right" : "left"), 
                this.renderInner(i, t, e, n);
                var r = t.getBoxLayoutParams(), a = {
                    width: n.getWidth(),
                    height: n.getHeight()
                }, o = t.get("padding"), s = Hi(r, a, o), l = this.layoutInner(t, i, s), u = Hi(C({
                    width: l.width,
                    height: l.height
                }, r), a, o);
                this.group.attr("position", [ u.x - l.x, u.y - l.y ]), this.group.add(this._backgroundEl = (h = l, 
                d = Qc((c = t).get("padding")), (f = c.getItemStyle([ "color", "opacity" ])).fill = c.get("backgroundColor"), 
                h = new Mc({
                    shape: {
                        x: h.x - d[3],
                        y: h.y - d[0],
                        width: h.width + d[1] + d[3],
                        height: h.height + d[0] + d[2],
                        r: c.get("borderRadius")
                    },
                    style: f,
                    silent: !0,
                    z2: -1
                })));
            }
            var h, c, d, f;
        },
        resetInner: function() {
            this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl);
        },
        renderInner: function(l, u, h, c) {
            var d = this.getContentGroup(), f = z(), p = u.get("selectedMode"), g = [];
            h.eachRawSeries(function(t) {
                !t.get("legendHoverLink") && g.push(t.id);
            }), im(u.getData(), function(r, a) {
                var o = r.get("name");
                if (this.newlineDisabled || "" !== o && "\n" !== o) {
                    var t = h.getSeriesByName(o)[0];
                    if (!f.get(o)) if (t) {
                        var e = t.getData(), n = e.getVisual("color");
                        "function" == typeof n && (n = n(t.getDataParams(0)));
                        var i = e.getVisual("legendSymbol") || "roundRect", s = e.getVisual("symbol");
                        this._createItem(o, a, r, u, i, s, l, n, p).on("click", nm(bs, o, c)).on("mouseover", nm(Ss, t, null, c, g)).on("mouseout", nm(Ms, t, null, c, g)), 
                        f.set(o, !0);
                    } else h.eachRawSeries(function(t) {
                        if (!f.get(o) && t.legendDataProvider) {
                            var e = t.legendDataProvider(), n = e.indexOfName(o);
                            if (n < 0) return;
                            var i = e.getItemVisual(n, "color");
                            this._createItem(o, a, r, u, "roundRect", null, l, i, p).on("click", nm(bs, o, c)).on("mouseover", nm(Ss, t, o, c, g)).on("mouseout", nm(Ms, t, o, c, g)), 
                            f.set(o, !0);
                        }
                    }, this);
                } else d.add(new rm({
                    newline: !0
                }));
            }, this);
        },
        _createItem: function(t, e, n, i, r, a, o, s, l) {
            var u = i.get("itemWidth"), h = i.get("itemHeight"), c = i.get("inactiveColor"), d = i.get("symbolKeepAspect"), f = i.isSelected(t), p = new rm(), g = n.getModel("textStyle"), m = n.get("icon"), v = n.getModel("tooltip"), y = v.parentModel;
            if (r = m || r, p.add(po(r, 0, 0, u, h, f ? s : c, null == d || d)), !m && a && (a !== r || "none" == a)) {
                var _ = .8 * h;
                "none" === a && (a = "circle"), p.add(po(a, (u - _) / 2, (h - _) / 2, _, _, f ? s : c, null == d || d));
            }
            var x = "left" === o ? u + 5 : -5, w = o, b = i.get("formatter"), S = t;
            "string" == typeof b && b ? S = b.replace("{name}", null != t ? t : "") : "function" == typeof b && (S = b(t)), 
            p.add(new mc({
                style: si({}, g, {
                    text: S,
                    x: x,
                    y: h / 2,
                    textFill: f ? g.getTextColor() : c,
                    textAlign: w,
                    textVerticalAlign: "middle"
                })
            }));
            var M = new Mc({
                shape: p.getBoundingRect(),
                invisible: !0,
                tooltip: v.get("show") ? k({
                    content: t,
                    formatter: y.get("formatter", !0) || function() {
                        return t;
                    },
                    formatterParams: {
                        componentType: "legend",
                        legendIndex: i.componentIndex,
                        name: t,
                        $vars: [ "name" ]
                    }
                }, v.option) : null
            });
            return p.add(M), p.eachChild(function(t) {
                t.silent = !0;
            }), M.silent = !l, this.getContentGroup().add(p), ai(p), p.__legendDataIndex = e, 
            p;
        },
        layoutInner: function(t, e, n) {
            var i = this.getContentGroup();
            ud(t.get("orient"), i, t.get("itemGap"), n.width, n.height);
            var r = i.getBoundingRect();
            return i.attr("position", [ -r.x, -r.y ]), this.group.getBoundingRect();
        }
    });
    ya(function(t) {
        var n = t.findComponents({
            mainType: "legend"
        });
        n && n.length && t.filterSeries(function(t) {
            for (var e = 0; e < n.length; e++) if (!n[e].isSelected(t.name)) return !1;
            return !0;
        });
    }), dd.registerSubTypeDefaulter("legend", function() {
        return "plain";
    });
    var om = em.extend({
        type: "legend.scroll",
        setScrollDataIndex: function(t) {
            this.option.scrollDataIndex = t;
        },
        defaultOption: {
            scrollDataIndex: 0,
            pageButtonItemGap: 5,
            pageButtonGap: null,
            pageButtonPosition: "end",
            pageFormatter: "{current}/{total}",
            pageIcons: {
                horizontal: [ "M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z" ],
                vertical: [ "M0,0L20,0L10,-20z", "M0,0L20,0L10,20z" ]
            },
            pageIconColor: "#2f4554",
            pageIconInactiveColor: "#aaa",
            pageIconSize: 15,
            pageTextStyle: {
                color: "#333"
            },
            animationDurationUpdate: 800
        },
        init: function(t, e, n, i) {
            var r = ji(t);
            om.superCall(this, "init", t, e, n, i), Is(this, t, r);
        },
        mergeOption: function(t, e) {
            om.superCall(this, "mergeOption", t, e), Is(this, this.option, t);
        },
        getOrient: function() {
            return "vertical" === this.get("orient") ? {
                index: 1,
                name: "vertical"
            } : {
                index: 0,
                name: "horizontal"
            };
        }
    }), sm = hu, lm = [ "width", "height" ], um = [ "x", "y" ], hm = am.extend({
        type: "legend.scroll",
        newlineDisabled: !0,
        init: function() {
            hm.superCall(this, "init"), this._currentIndex = 0, this.group.add(this._containerGroup = new sm()), 
            this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new sm()), 
            this._showController;
        },
        resetInner: function() {
            hm.superCall(this, "resetInner"), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), 
            this._containerGroup.__rectSize = null;
        },
        renderInner: function(t, r, e, a) {
            function n(t, e) {
                var n = t + "DataIndex", i = yi(r.get("pageIcons", !0)[r.getOrient().name][e], {
                    onclick: v(o._pageGo, o, n, r, a)
                }, {
                    x: -l[0] / 2,
                    y: -l[1] / 2,
                    width: l[0],
                    height: l[1]
                });
                i.name = t, s.add(i);
            }
            var o = this;
            hm.superCall(this, "renderInner", t, r, e, a);
            var s = this._controllerGroup, l = r.get("pageIconSize", !0);
            A(l) || (l = [ l, l ]), n("pagePrev", 0);
            var i = r.getModel("pageTextStyle");
            s.add(new mc({
                name: "pageText",
                style: {
                    textFill: i.getTextColor(),
                    font: i.getFont(),
                    textVerticalAlign: "middle",
                    textAlign: "center"
                },
                silent: !0
            })), n("pageNext", 1);
        },
        layoutInner: function(t, e, n) {
            var i = this.getContentGroup(), r = this._containerGroup, a = this._controllerGroup, o = t.getOrient().index, s = lm[o], l = lm[1 - o], u = um[1 - o];
            ud(t.get("orient"), i, t.get("itemGap"), o ? n.width : null, o ? null : n.height), 
            ud("horizontal", a, t.get("pageButtonItemGap", !0));
            var h = i.getBoundingRect(), c = a.getBoundingRect(), d = this._showController = h[s] > n[s], f = [ -h.x, -h.y ];
            f[o] = i.position[o];
            var p = [ 0, 0 ], g = [ -c.x, -c.y ], m = P(t.get("pageButtonGap", !0), t.get("itemGap", !0));
            d && ("end" === t.get("pageButtonPosition", !0) ? g[o] += n[s] - c[s] : p[o] += c[s] + m);
            g[1 - o] += h[l] / 2 - c[l] / 2, i.attr("position", f), r.attr("position", p), a.attr("position", g);
            var v = this.group.getBoundingRect();
            if ((v = {
                x: 0,
                y: 0
            })[s] = d ? n[s] : h[s], v[l] = Math.max(h[l], c[l]), v[u] = Math.min(0, c[u] + g[1 - o]), 
            r.__rectSize = n[s], d) {
                var y = {
                    x: 0,
                    y: 0
                };
                y[s] = Math.max(n[s] - c[s] - m, 0), y[l] = v[l], r.setClipPath(new Mc({
                    shape: y
                })), r.__rectSize = y[s];
            } else a.eachChild(function(t) {
                t.attr({
                    invisible: !0,
                    silent: !0
                });
            });
            var _ = this._getPageInfo(t);
            return null != _.pageIndex && pi(i, {
                position: _.contentPosition
            }, !!d && t), this._updatePageInfoView(t, _), v;
        },
        _pageGo: function(t, e, n) {
            var i = this._getPageInfo(e)[t];
            null != i && n.dispatchAction({
                type: "legendScroll",
                scrollDataIndex: i,
                legendId: e.id
            });
        },
        _updatePageInfoView: function(i, r) {
            var a = this._controllerGroup;
            R([ "pagePrev", "pageNext" ], function(t) {
                var e = null != r[t + "DataIndex"], n = a.childOfName(t);
                n && (n.setStyle("fill", e ? i.get("pageIconColor", !0) : i.get("pageIconInactiveColor", !0)), 
                n.cursor = e ? "pointer" : "default");
            });
            var t = a.childOfName("pageText"), e = i.get("pageFormatter"), n = r.pageIndex, o = null != n ? n + 1 : 0, s = r.pageCount;
            t && e && t.setStyle("text", S(e) ? e.replace("{current}", o).replace("{total}", s) : e({
                current: o,
                total: s
            }));
        },
        _getPageInfo: function(t) {
            function i(t) {
                var e = t.getBoundingRect().clone();
                return e[f] += t.position[h], e;
            }
            var e, n, r, a, o = t.get("scrollDataIndex", !0), s = this.getContentGroup(), l = s.getBoundingRect(), u = this._containerGroup.__rectSize, h = t.getOrient().index, c = lm[h], d = lm[1 - h], f = um[h], p = s.position.slice();
            this._showController ? s.eachChild(function(t) {
                t.__legendDataIndex === o && (a = t);
            }) : a = s.childAt(0);
            var g = u ? Math.ceil(l[c] / u) : 0;
            if (a) {
                var m = a.getBoundingRect(), v = a.position[h] + m[f];
                p[h] = -v - l[f], e = Math.floor(g * (v + m[f] + u / 2) / l[c]), e = l[c] && g ? Math.max(0, Math.min(g - 1, e)) : -1;
                var y = {
                    x: 0,
                    y: 0
                };
                y[c] = u, y[d] = l[d], y[f] = -p[h] - l[f];
                var _, x = s.children();
                if (s.eachChild(function(t, e) {
                    var n = i(t);
                    n.intersect(y) && (null == _ && (_ = e), r = t.__legendDataIndex), e === x.length - 1 && n[f] + n[c] <= y[f] + y[c] && (r = null);
                }), null != _) {
                    var w = i(x[_]);
                    if (y[f] = w[f] + w[c] - y[c], _ <= 0 && w[f] >= y[f]) n = null; else {
                        for (;0 < _ && i(x[_ - 1]).intersect(y); ) _--;
                        n = x[_].__legendDataIndex;
                    }
                }
            }
            return {
                contentPosition: p,
                pageIndex: e,
                pageCount: g,
                pagePrevDataIndex: n,
                pageNextDataIndex: r
            };
        }
    });
    _a("legendScroll", "legendscroll", function(t, e) {
        var n = t.scrollDataIndex;
        null != n && e.eachComponent({
            mainType: "legend",
            subType: "scroll",
            query: t
        }, function(t) {
            t.setScrollDataIndex(n);
        });
    });
    var cm = zi, dm = Ri, fm = Ma({
        type: "marker",
        dependencies: [ "series", "grid", "polar", "geo" ],
        init: function(t, e, n, i) {
            this.mergeDefaultAndTheme(t, n), this.mergeOption(t, n, i.createdBySelf, !0);
        },
        isAnimationEnabled: function() {
            if (al.node) return !1;
            var t = this.__hostSeries;
            return this.getShallow("animation") && t && t.isAnimationEnabled();
        },
        mergeOption: function(t, i, e, r) {
            var a = this.constructor, o = this.mainType + "Model";
            e || i.eachSeries(function(t) {
                var e = t.get(this.mainType, !0), n = t[o];
                return e && e.data ? (n ? n.mergeOption(e, i, !0) : (r && Ds(e), R(e.data, function(t) {
                    t instanceof Array ? (Ds(t[0]), Ds(t[1])) : Ds(t);
                }), k(n = new a(e, this, i), {
                    mainType: this.mainType,
                    seriesIndex: t.seriesIndex,
                    name: t.name,
                    createdBySelf: !0
                }), n.__hostSeries = t), void (t[o] = n)) : void (t[o] = null);
            }, this);
        },
        formatTooltip: function(t) {
            var e = this.getData(), n = this.getRawValue(t), i = A(n) ? T(n, cm).join(", ") : cm(n), r = e.getName(t), a = dm(this.name);
            return (null != n || r) && (a += "<br />"), r && (a += dm(r), null != n && (a += " : ")), 
            null != n && (a += dm(i)), a;
        },
        getData: function() {
            return this._data;
        },
        setData: function(t) {
            this._data = t;
        }
    });
    r(fm, Yd), fm.extend({
        type: "markPoint",
        defaultOption: {
            zlevel: 0,
            z: 5,
            symbol: "pin",
            symbolSize: 50,
            tooltip: {
                trigger: "item"
            },
            label: {
                show: !0,
                position: "inside"
            },
            itemStyle: {
                borderWidth: 2
            },
            emphasis: {
                label: {
                    show: !0
                }
            }
        }
    });
    var pm = d, gm = y, mm = {
        min: gm(Cs, "min"),
        max: gm(Cs, "max"),
        average: gm(Cs, "average")
    }, vm = Ia({
        type: "marker",
        init: function() {
            this.markerGroupMap = z();
        },
        render: function(t, n, i) {
            var e = this.markerGroupMap;
            e.each(function(t) {
                t.__keep = !1;
            });
            var r = this.type + "Model";
            n.eachSeries(function(t) {
                var e = t[r];
                e && this.renderSeries(t, e, n, i);
            }, this), e.each(function(t) {
                !t.__keep && this.group.remove(t.group);
            }, this);
        },
        renderSeries: function() {}
    });
    vm.extend({
        type: "markPoint",
        updateTransform: function(t, e, n) {
            e.eachSeries(function(t) {
                var e = t.markPointModel;
                e && (Os(e.getData(), t, n), this.markerGroupMap.get(t.id).updateLayout(e));
            }, this);
        },
        renderSeries: function(t, i, e, n) {
            var r = t.coordinateSystem, a = t.id, o = t.getData(), s = this.markerGroupMap, l = s.get(a) || s.set(a, new es()), u = function(t, e, n) {
                var i;
                i = t ? T(t && t.dimensions, function(t) {
                    return C({
                        name: t
                    }, e.getData().getDimensionInfo(e.getData().mapDimension(t)) || {});
                }) : [ {
                    name: "value",
                    type: "float"
                } ];
                var r = new rp(i, n), a = T(n.get("data"), y(Ts, e));
                return t && (a = m(a, y(As, t))), r.initData(a, null, t ? Ls : function(t) {
                    return t.value;
                }), r;
            }(r, t, i);
            i.setData(u), Os(i.getData(), t, n), u.each(function(t) {
                var e = u.getItemModel(t), n = e.getShallow("symbolSize");
                "function" == typeof n && (n = n(i.getRawValue(t), i.getDataParams(t))), u.setItemVisual(t, {
                    symbolSize: n,
                    color: e.get("itemStyle.color") || o.getVisual("color"),
                    symbol: e.getShallow("symbol")
                });
            }), l.updateData(u), this.group.add(l.group), u.eachItemGraphicEl(function(t) {
                t.traverse(function(t) {
                    t.dataModel = i;
                });
            }), l.__keep = !0, l.group.silent = i.get("silent") || t.get("silent");
        }
    }), va(function(t) {
        t.markPoint = t.markPoint || {};
    }), fm.extend({
        type: "markLine",
        defaultOption: {
            zlevel: 0,
            z: 5,
            symbol: [ "circle", "arrow" ],
            symbolSize: [ 8, 16 ],
            precision: 2,
            tooltip: {
                trigger: "item"
            },
            label: {
                show: !0,
                position: "end"
            },
            lineStyle: {
                type: "dashed"
            },
            emphasis: {
                label: {
                    show: !0
                },
                lineStyle: {
                    width: 3
                }
            },
            animationEasing: "linear"
        }
    });
    var ym = Ic.prototype, _m = Cc.prototype, xm = Fn({
        type: "ec-line",
        style: {
            stroke: "#000",
            fill: null
        },
        shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            percent: 1,
            cpx1: null,
            cpy1: null
        },
        buildPath: function(t, e) {
            (Ns(e) ? ym : _m).buildPath(t, e);
        },
        pointAt: function(t) {
            return Ns(this.shape) ? ym.pointAt.call(this, t) : _m.pointAt.call(this, t);
        },
        tangentAt: function(t) {
            var e = this.shape, n = Ns(e) ? [ e.x2 - e.x1, e.y2 - e.y1 ] : _m.tangentAt.call(this, t);
            return X(n, n);
        }
    }), wm = [ "fromSymbol", "toSymbol" ], bm = Bs.prototype;
    bm.beforeUpdate = function() {
        var t = this.childOfName("fromSymbol"), e = this.childOfName("toSymbol"), n = this.childOfName("label");
        if (t || e || !n.ignore) {
            for (var i = 1, r = this.parent; r; ) r.scale && (i /= r.scale[0]), r = r.parent;
            var a = this.childOfName("line");
            if (this.__dirty || a.__dirty) {
                var o = a.shape.percent, s = a.pointAt(0), l = a.pointAt(o), u = H([], l, s);
                if (X(u, u), t) {
                    t.attr("position", s);
                    var h = a.tangentAt(0);
                    t.attr("rotation", Math.PI / 2 - Math.atan2(h[1], h[0])), t.attr("scale", [ i * o, i * o ]);
                }
                if (e && (e.attr("position", l), h = a.tangentAt(1), e.attr("rotation", -Math.PI / 2 - Math.atan2(h[1], h[0])), 
                e.attr("scale", [ i * o, i * o ])), !n.ignore) {
                    n.attr("position", l);
                    var c, d, f, p = 5 * i;
                    if ("end" === n.__position) c = [ u[0] * p + l[0], u[1] * p + l[1] ], d = .8 < u[0] ? "left" : u[0] < -.8 ? "right" : "center", 
                    f = .8 < u[1] ? "top" : u[1] < -.8 ? "bottom" : "middle"; else if ("middle" === n.__position) {
                        var g = o / 2, m = [ (h = a.tangentAt(g))[1], -h[0] ], v = a.pointAt(g);
                        0 < m[1] && (m[0] = -m[0], m[1] = -m[1]), c = [ v[0] + m[0] * p, v[1] + m[1] * p ], 
                        d = "center", f = "bottom";
                        var y = -Math.atan2(h[1], h[0]);
                        l[0] < s[0] && (y = Math.PI + y), n.attr("rotation", y);
                    } else c = [ -u[0] * p + s[0], -u[1] * p + s[1] ], d = .8 < u[0] ? "right" : u[0] < -.8 ? "left" : "center", 
                    f = .8 < u[1] ? "bottom" : u[1] < -.8 ? "top" : "middle";
                    n.attr({
                        style: {
                            textVerticalAlign: n.__verticalAlign || f,
                            textAlign: n.__textAlign || d
                        },
                        position: c,
                        scale: [ i, i ]
                    });
                }
            }
        }
    }, bm._createLine = function(n, i, t) {
        var e, r, a = n.hostModel, o = n.getItemLayout(i), s = (e = o, Rs((r = new xm({
            name: "line"
        })).shape, e), r);
        s.shape.percent = 0, gi(s, {
            shape: {
                percent: 1
            }
        }, a, i), this.add(s);
        var l = new mc({
            name: "label"
        });
        this.add(l), R(wm, function(t) {
            var e = zs(t, n, i);
            this.add(e), this[Es(t)] = n.getItemVisual(i, t);
        }, this), this._updateCommonStl(n, i, t);
    }, bm.updateData = function(r, a, t) {
        var e = r.hostModel, n = this.childOfName("line"), i = r.getItemLayout(a), o = {
            shape: {}
        };
        Rs(o.shape, i), pi(n, o, e, a), R(wm, function(t) {
            var e = r.getItemVisual(a, t), n = Es(t);
            if (this[n] !== e) {
                this.remove(this.childOfName(t));
                var i = zs(t, r, a);
                this.add(i);
            }
            this[n] = e;
        }, this), this._updateCommonStl(r, a, t);
    }, bm._updateCommonStl = function(t, e, n) {
        var i = t.hostModel, r = this.childOfName("line"), a = n && n.lineStyle, o = n && n.hoverLineStyle, s = n && n.labelModel, l = n && n.hoverLabelModel;
        if (!n || t.hasItemOption) {
            var u = t.getItemModel(e);
            a = u.getModel("lineStyle").getLineStyle(), o = u.getModel("emphasis.lineStyle").getLineStyle(), 
            s = u.getModel("label"), l = u.getModel("emphasis.label");
        }
        var h = t.getItemVisual(e, "color"), c = O(t.getItemVisual(e, "opacity"), a.opacity, 1);
        r.useStyle(C({
            strokeNoScale: !0,
            fill: "none",
            stroke: h,
            opacity: c
        }, a)), r.hoverStyle = o, R(wm, function(t) {
            var e = this.childOfName(t);
            e && (e.setColor(h), e.setStyle({
                opacity: c
            }));
        }, this);
        var d, f, p = s.getShallow("show"), g = l.getShallow("show"), m = this.childOfName("label");
        if ((p || g) && (d = h || "#000", null == (f = i.getFormattedLabel(e, "normal", t.dataType)))) {
            var v = i.getRawValue(e);
            f = null == v ? t.getName(e) : isFinite(v) ? Ii(v) : v;
        }
        var y = p ? f : null, _ = g ? P(i.getFormattedLabel(e, "emphasis", t.dataType), f) : null, x = m.style;
        (null != y || null != _) && (si(m.style, s, {
            text: y
        }, {
            autoColor: d
        }), m.__textAlign = x.textAlign, m.__verticalAlign = x.textVerticalAlign, m.__position = s.get("position") || "middle"), 
        m.hoverStyle = null != _ ? {
            text: _,
            textFill: l.getTextColor(!0),
            fontStyle: l.getShallow("fontStyle"),
            fontWeight: l.getShallow("fontWeight"),
            fontSize: l.getShallow("fontSize"),
            fontFamily: l.getShallow("fontFamily")
        } : {
            text: null
        }, m.ignore = !p && !g, ai(this);
    }, bm.highlight = function() {
        this.trigger("emphasis");
    }, bm.downplay = function() {
        this.trigger("normal");
    }, bm.updateLayout = function(t, e) {
        this.setLinePoints(t.getItemLayout(e));
    }, bm.setLinePoints = function(t) {
        var e = this.childOfName("line");
        Rs(e.shape, t), e.dirty();
    }, a(Bs, hu);
    var Sm = Fs.prototype;
    Sm.isPersistent = function() {
        return !0;
    }, Sm.updateData = function(l) {
        var u = this, e = u.group, h = u._lineData;
        u._lineData = l, h || e.removeAll();
        var c = Vs(l);
        l.diff(h).add(function(t) {
            !function(t, e, n, i) {
                if (Ws(e.getItemLayout(n))) {
                    var r = new t._ctor(e, n, i);
                    e.setItemGraphicEl(n, r), t.group.add(r);
                }
            }(u, l, t, c);
        }).update(function(t, e) {
            var n, i, r, a, o, s;
            n = u, i = l, r = e, a = t, o = c, s = h.getItemGraphicEl(r), Ws(i.getItemLayout(a)) ? (s ? s.updateData(i, a, o) : s = new n._ctor(i, a, o), 
            i.setItemGraphicEl(a, s), n.group.add(s)) : n.group.remove(s);
        }).remove(function(t) {
            e.remove(h.getItemGraphicEl(t));
        }).execute();
    }, Sm.updateLayout = function() {
        var n = this._lineData;
        n && n.eachItemGraphicEl(function(t, e) {
            t.updateLayout(n, e);
        }, this);
    }, Sm.incrementalPrepareUpdate = function(t) {
        this._seriesScope = Vs(t), this._lineData = null, this.group.removeAll();
    }, Sm.incrementalUpdate = function(t, e) {
        function n(t) {
            t.isGroup || (t.incremental = t.useHoverLayer = !0);
        }
        for (var i = t.start; i < t.end; i++) {
            if (Ws(e.getItemLayout(i))) {
                var r = new this._ctor(e, i, this._seriesScope);
                r.traverse(n), this.group.add(r), e.setItemGraphicEl(i, r);
            }
        }
    }, Sm.remove = function() {
        this._clearIncremental(), this._incremental = null, this.group.removeAll();
    }, Sm._clearIncremental = function() {
        var t = this._incremental;
        t && t.clearDisplaybles();
    };
    var Mm = function(t, e, n, i) {
        var r = t.getData(), a = i.type;
        if (!A(i) && ("min" === a || "max" === a || "average" === a || "median" === a || null != i.xAxis || null != i.yAxis)) {
            var o, s;
            if (null != i.yAxis || null != i.xAxis) o = null != i.yAxis ? "y" : "x", e.getAxis(o), 
            s = L(i.yAxis, i.xAxis); else {
                var l = ks(i, r, e, t);
                o = l.valueDataDim, l.valueAxis, s = Ps(r, o, a);
            }
            var u = "x" === o ? 0 : 1, h = 1 - u, c = b(i), d = {};
            c.type = null, c.coord = [], d.coord = [], c.coord[h] = -1 / 0, d.coord[h] = 1 / 0;
            var f = n.get("precision");
            0 <= f && "number" == typeof s && (s = +s.toFixed(Math.min(f, 20))), c.coord[u] = d.coord[u] = s, 
            i = [ c, d, {
                type: a,
                valueIndex: i.valueIndex,
                value: s
            } ];
        }
        return (i = [ Ts(t, i[0]), Ts(t, i[1]), k({}, i[2]) ])[2].type = i[2].type || "", 
        p(i[2], i[0]), p(i[2], i[1]), i;
    };
    vm.extend({
        type: "markLine",
        updateTransform: function(t, e, a) {
            e.eachSeries(function(e) {
                var t = e.markLineModel;
                if (t) {
                    var n = t.getData(), i = t.__from, r = t.__to;
                    i.each(function(t) {
                        Us(i, t, !0, e, a), Us(r, t, !1, e, a);
                    }), n.each(function(t) {
                        n.setItemLayout(t, [ i.getItemLayout(t), r.getItemLayout(t) ]);
                    }), this.markerGroupMap.get(e.id).updateLayout();
                }
            }, this);
        },
        renderSeries: function(r, e, t, a) {
            function n(t, e, n) {
                var i = t.getItemModel(e);
                Us(t, e, n, r, a), t.setItemVisual(e, {
                    symbolSize: i.get("symbolSize") || g[n ? 0 : 1],
                    symbol: i.get("symbol", !0) || p[n ? 0 : 1],
                    color: i.get("itemStyle.color") || s.getVisual("color")
                });
            }
            var i = r.coordinateSystem, o = r.id, s = r.getData(), l = this.markerGroupMap, u = l.get(o) || l.set(o, new Fs());
            this.group.add(u.group);
            var h = function(t, e, n) {
                var i;
                i = t ? T(t && t.dimensions, function(t) {
                    return C({
                        name: t
                    }, e.getData().getDimensionInfo(e.getData().mapDimension(t)) || {});
                }) : [ {
                    name: "value",
                    type: "float"
                } ];
                var r = new rp(i, n), a = new rp(i, n), o = new rp([], n), s = T(n.get("data"), y(Mm, e, t, n));
                t && (s = m(s, y(js, t)));
                var l = t ? Ls : function(t) {
                    return t.value;
                };
                return r.initData(T(s, function(t) {
                    return t[0];
                }), null, l), a.initData(T(s, function(t) {
                    return t[1];
                }), null, l), o.initData(T(s, function(t) {
                    return t[2];
                })), o.hasItemOption = !0, {
                    from: r,
                    to: a,
                    line: o
                };
            }(i, r, e), c = h.from, d = h.to, f = h.line;
            e.__from = c, e.__to = d, e.setData(f);
            var p = e.get("symbol"), g = e.get("symbolSize");
            A(p) || (p = [ p, p ]), "number" == typeof g && (g = [ g, g ]), h.from.each(function(t) {
                n(c, t, !0), n(d, t, !1);
            }), f.each(function(t) {
                var e = f.getItemModel(t).get("lineStyle.color");
                f.setItemVisual(t, {
                    color: e || c.getItemVisual(t, "color")
                }), f.setItemLayout(t, [ c.getItemLayout(t), d.getItemLayout(t) ]), f.setItemVisual(t, {
                    fromSymbolSize: c.getItemVisual(t, "symbolSize"),
                    fromSymbol: c.getItemVisual(t, "symbol"),
                    toSymbolSize: d.getItemVisual(t, "symbolSize"),
                    toSymbol: d.getItemVisual(t, "symbol")
                });
            }), u.updateData(f), h.line.eachItemGraphicEl(function(t) {
                t.traverse(function(t) {
                    t.dataModel = e;
                });
            }), u.__keep = !0, u.group.silent = e.get("silent") || r.get("silent");
        }
    }), va(function(t) {
        t.markLine = t.markLine || {};
    }), fm.extend({
        type: "markArea",
        defaultOption: {
            zlevel: 0,
            z: 1,
            tooltip: {
                trigger: "item"
            },
            animation: !1,
            label: {
                show: !0,
                position: "top"
            },
            itemStyle: {
                borderWidth: 0
            },
            emphasis: {
                label: {
                    show: !0,
                    position: "top"
                }
            }
        }
    });
    var Im = function(t, e, n, i) {
        var r = Ts(t, i[0]), a = Ts(t, i[1]), o = L, s = r.coord, l = a.coord;
        s[0] = o(s[0], -1 / 0), s[1] = o(s[1], -1 / 0), l[0] = o(l[0], 1 / 0), l[1] = o(l[1], 1 / 0);
        var u = h([ {}, r, a ]);
        return u.coord = [ r.coord, a.coord ], u.x0 = r.x, u.y0 = r.y, u.x1 = a.x, u.y1 = a.y, 
        u;
    }, Dm = [ [ "x0", "y0" ], [ "x1", "y0" ], [ "x1", "y1" ], [ "x0", "y1" ] ];
    vm.extend({
        type: "markArea",
        updateTransform: function(t, e, r) {
            e.eachSeries(function(n) {
                var t = n.markAreaModel;
                if (t) {
                    var i = t.getData();
                    i.each(function(e) {
                        var t = T(Dm, function(t) {
                            return $s(i, e, t, n, r);
                        });
                        i.setItemLayout(e, t), i.getItemGraphicEl(e).setShape("points", t);
                    });
                }
            }, this);
        },
        renderSeries: function(n, o, t, i) {
            var e = n.coordinateSystem, r = n.id, a = n.getData(), s = this.markerGroupMap, l = s.get(r) || s.set(r, {
                group: new hu()
            });
            this.group.add(l.group), l.__keep = !0;
            var u = function(t, n, e) {
                var i, r;
                t ? (i = T(t && t.dimensions, function(t) {
                    var e = n.getData();
                    return C({
                        name: t
                    }, e.getDimensionInfo(e.mapDimension(t)) || {});
                }), r = new rp(T([ "x0", "y0", "x1", "y1" ], function(t, e) {
                    return {
                        name: t,
                        type: i[e % 2].type
                    };
                }), e)) : r = new rp(i = [ {
                    name: "value",
                    type: "float"
                } ], e);
                var a = T(e.get("data"), y(Im, n, t, e));
                t && (a = m(a, y(Zs, t)));
                var o = t ? function(t, e, n, i) {
                    return t.coord[Math.floor(i / 2)][i % 2];
                } : function(t) {
                    return t.value;
                };
                return r.initData(a, null, o), r.hasItemOption = !0, r;
            }(e, n, o);
            o.setData(u), u.each(function(e) {
                u.setItemLayout(e, T(Dm, function(t) {
                    return $s(u, e, t, n, i);
                })), u.setItemVisual(e, {
                    color: a.getVisual("color")
                });
            }), u.diff(l.__data).add(function(t) {
                var e = new bc({
                    shape: {
                        points: u.getItemLayout(t)
                    }
                });
                u.setItemGraphicEl(t, e), l.group.add(e);
            }).update(function(t, e) {
                var n = l.__data.getItemGraphicEl(e);
                pi(n, {
                    shape: {
                        points: u.getItemLayout(t)
                    }
                }, o, t), l.group.add(n), u.setItemGraphicEl(t, n);
            }).remove(function(t) {
                var e = l.__data.getItemGraphicEl(t);
                l.group.remove(e);
            }).execute(), u.eachItemGraphicEl(function(t, e) {
                var n = u.getItemModel(e), i = n.getModel("label"), r = n.getModel("emphasis.label"), a = u.getItemVisual(e, "color");
                t.useStyle(C(n.getModel("itemStyle").getItemStyle(), {
                    fill: Ct(a, .4),
                    stroke: a
                })), t.hoverStyle = n.getModel("emphasis.itemStyle").getItemStyle(), oi(t.style, t.hoverStyle, i, r, {
                    labelFetcher: o,
                    labelDataIndex: e,
                    defaultText: u.getName(e) || "",
                    isRectText: !0,
                    autoColor: a
                }), ai(t, {}), t.dataModel = o;
            }), l.__data = u, l.group.silent = o.get("silent") || n.get("silent");
        }
    }), va(function(t) {
        t.markArea = t.markArea || {};
    }), t.version = "4.1.0", t.dependencies = {
        zrender: "4.0.4"
    }, t.PRIORITY = Tf, t.init = function(t, e, n) {
        var i = ga(t);
        if (i) return i;
        var r = new ta(t, e, n);
        return r.id = "ec_" + jf++, Hf[r.id] = r, tn(t, Xf, r.id), function(i) {
            function r(t, e) {
                for (var n = 0; n < t.length; n++) t[n][a] = e;
            }
            var a = "__connectUpdateStatus";
            Mf(zf, function(t, e) {
                i._messageCenter.on(e, function(t) {
                    if (qf[i.group] && 0 !== i[a]) {
                        if (t && t.escapeConnect) return;
                        var e = i.makeActionFromEvent(t), n = [];
                        Mf(Hf, function(t) {
                            t !== i && t.group === i.group && n.push(t);
                        }), r(n, 0), Mf(n, function(t) {
                            1 !== t[a] && t.dispatchAction(e);
                        }), r(n, 2);
                    }
                });
            });
        }(r), r;
    }, t.connect = function(e) {
        if (A(e)) {
            var t = e;
            e = null, Mf(t, function(t) {
                null != t.group && (e = t.group);
            }), e = e || "g_" + Uf++, Mf(t, function(t) {
                t.group = e;
            });
        }
        return qf[e] = !0, e;
    }, t.disConnect = pa, t.disconnect = Zf, t.dispose = function(t) {
        "string" == typeof t ? t = Hf[t] : t instanceof ta || (t = ga(t)), t instanceof ta && !t.isDisposed() && t.dispose();
    }, t.getInstanceByDom = ga, t.getInstanceById = function(t) {
        return Hf[t];
    }, t.registerTheme = ma, t.registerPreprocessor = va, t.registerProcessor = ya, 
    t.registerPostUpdate = function(t) {
        Ff.push(t);
    }, t.registerAction = _a, t.registerCoordinateSystem = function(t, e) {
        ir.register(t, e);
    }, t.getCoordinateSystemDimensions = function(t) {
        var e = ir.get(t);
        return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;
    }, t.registerLayout = xa, t.registerVisual = wa, t.registerLoading = Sa, t.extendComponentModel = Ma, 
    t.extendComponentView = Ia, t.extendSeriesModel = Da, t.extendChartView = Ca, t.setCanvasCreator = function(t) {
        e("createCanvas", t);
    }, t.registerMap = function(t, e, n) {
        e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), "string" == typeof e && (e = "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")()), 
        Yf[t] = {
            geoJson: e,
            specialAreas: n
        };
    }, t.getMap = function(t) {
        return Yf[t];
    }, t.dataTool = {}, t.zrender = th, t.graphic = Fc, t.number = Kc, t.format = ad, 
    t.throttle = Fr, t.helper = Wp, t.matrix = Pl, t.vector = Il, t.color = Yl, t.parseGeoJSON = qp, 
    t.parseGeoJson = Yp, t.util = Zp, t.List = rp, t.Model = _i, t.Axis = Xp, t.env = al;
});