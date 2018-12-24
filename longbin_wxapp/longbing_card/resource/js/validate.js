function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var strategies = {
    isNoEmpty: function(t, e) {
        if ("" === t || void 0 === t || !1 === t || "[]" === JSON.stringify(t) || "{}" === JSON.stringify(t)) return e;
    },
    minLength: function(t, e, i) {
        if (t.length < e) return i;
    },
    maxLength: function(t, e, i) {
        if (t.length > e) return i;
    },
    isMobile: function(t, e) {
        if (!/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|([0-9]{3,4}-)?[0-9]{7,8})$/.test(t)) return e;
    },
    money: function(t, e) {
        if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(t) || parseFloat(t) < .01) return e;
    }
}, Validate = function t() {
    _classCallCheck(this, t), this.cache = [];
};

Validate.prototype.add = function(n, r, a) {
    this.cache.push(function() {
        var t = void 0, e = void 0;
        if ("string" == typeof r) {
            var i = (e = r.split(":")).shift();
            t = strategies[i];
        } else e = [], t = r;
        return e.unshift(n), e.push(a), t.apply(null, e);
    });
}, Validate.prototype.start = function() {
    for (var t, e = 0; t = this.cache[e++]; ) {
        var i = t();
        if (i) return i;
    }
}, exports.default = Validate;