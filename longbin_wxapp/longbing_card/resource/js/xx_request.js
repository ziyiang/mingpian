Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.uploadFile = exports.req = exports.fly = exports.tmpUrl = void 0;

var _xx_util = require("./xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _siteinfo = require("../../../siteinfo.js"), _siteinfo2 = _interopRequireDefault(_siteinfo);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var Fly = require("./wx.js"), fly = new Fly(), tokenFly = new Fly(), model_name = "longbing_card", tmpUrl = _siteinfo2.default.siteroot + "?i=" + _siteinfo2.default.uniacid + "&t=" + _siteinfo2.default.multiid + "&v=" + _siteinfo2.default.version + "&from=wxapp&c=entry&a=wxapp&m=" + model_name + "&do=";

Promise.prototype.finally = function(t) {
    var n = this.constructor;
    return this.then(function(e) {
        return n.resolve(t()).then(function() {
            return e;
        });
    }, function(e) {
        return n.resolve(t()).then(function() {
            throw e;
        });
    });
}, fly.config.timeout = 15e3, fly.config.headers = tokenFly.config.headers = {
    "content-type": "application/x-www-form-urlencoded"
}, fly.interceptors.request.use(function(r) {
    r.body || (r.body = {});
    var e = wx.getStorageSync("userid");
    if (!e) return fly.lock(), new Promise(function(n, e) {
        wx.login({
            success: function(e) {
                var t = e.code;
                t ? (n(t), console.log("登录成功")) : console.log("登录失败！");
            },
            fail: function() {
                console.log("登录失败！");
            }
        });
    }).then(function(e) {
        var t = tmpUrl + "login", n = {
            code: e
        };
        return tokenFly.post(t, n);
    }).then(function(e) {
        var t = getApp(), n = e.data.user_id, o = e.data.user;
        o && (wx.setStorageSync("user", o), o.phone && (t.globalData.hasClientPhone = !0)), 
        r.body.user_id = n, t.globalData.userid = n, wx.setStorageSync("userid", n);
    }).finally(function() {
        fly.unlock();
    }).then(function() {
        return fly.request(r);
    });
    r.body.user_id = e;
}), tokenFly.interceptors.response.use(function(e) {
    return _xx_util2.default.hideAll(), -2 == e.data.errno && _xx_util2.default.showModal({
        content: e.data.message
    }), e.data;
}, function(e) {
    _xx_util2.default.hideAll();
}), fly.interceptors.response.use(function(e) {
    return _xx_util2.default.hideAll(), -2 == e.data.errno && _xx_util2.default.showModal({
        content: e.data.message
    }), e.data;
}, function(e) {
    _xx_util2.default.hideAll();
});

var uploadFile = function(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = e.name, o = void 0 === n ? "file" : n, r = e.filePath, i = e.formData, l = void 0 === i ? {
        type: "picture"
    } : i;
    return t = tmpUrl + "" + t, new Promise(function(n, e) {
        wx.uploadFile({
            url: t,
            filePath: r,
            name: o,
            header: {},
            formData: l,
            success: function(e) {
                if (200 == e.statusCode) {
                    var t = JSON.parse(e.data);
                    0 == t.errno ? n(t.data) : _xx_util2.default.showModal({
                        content: "上传失败"
                    });
                } else _xx_util2.default.showModal({
                    content: "上传失败"
                });
            },
            fail: function(e) {
                _xx_util2.default.showModal({
                    content: "上传失败"
                }), wx.hideLoading();
            },
            complete: function(e) {}
        });
    });
}, req = {
    post: function(n, o) {
        return n = tmpUrl + "" + n, new Promise(function(t, e) {
            fly.post(n, o).then(function(e) {
                0 == e.errno ? t(e) : -2 == e.errno && _xx_util2.default.showModal({
                    content: e.message
                });
            });
        });
    },
    get: function(n, o) {
        return n = tmpUrl + "" + n, new Promise(function(t, e) {
            fly.get(n, o).then(function(e) {
                0 == e.errno ? t(e) : -2 == e.errno && _xx_util2.default.showModal({
                    content: e.message
                });
            });
        });
    }
};

exports.tmpUrl = tmpUrl, exports.fly = fly, exports.req = req, exports.uploadFile = uploadFile;