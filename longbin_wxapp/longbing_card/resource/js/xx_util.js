Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var n = [], o = !0, r = !1, a = void 0;
        try {
            for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (n.push(i.value), 
            !e || n.length !== e); o = !0) ;
        } catch (t) {
            r = !0, a = t;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (r) throw a;
            }
        }
        return n;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _validate = require("./validate.js"), _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n;
    }
    return Array.from(t);
}

exports.default = {
    Validate: _validate2.default,
    formatTime: function(t, e) {
        var n = e || "YY-M-D h:m:s", o = this.formatNumber, r = t || new Date();
        "Date" !== Object.prototype.toString.call(r).slice(8, -1) && (r = new Date(t));
        var a = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "日", "一", "二", "三", "四", "五", "六" ];
        return n.replace(/YY|Y|M|D|h|m|s|week|星期/g, function(t) {
            switch (t) {
              case "YY":
                return r.getFullYear();

              case "Y":
                return (r.getFullYear() + "").slice(2);

              case "M":
                return o(r.getMonth() + 1);

              case "D":
                return o(r.getDate());

              case "h":
                return o(r.getHours());

              case "m":
                return o(r.getMinutes());

              case "s":
                return o(r.getSeconds());

              case "星期":
                return "星期" + a[r.getDay() + 7];

              case "week":
                return a[r.getDay()];
            }
        });
    },
    formatNumber: function(t) {
        return (t = t.toString())[1] ? t : "0" + t;
    },
    ctDate: function(t) {
        var e = 864e5;
        if (!t) return "";
        var n, o = (n = Date.now() - (t = "number" == typeof t ? t : +new Date(t))) / 2592e6, r = n / (7 * e), a = n / e, i = n / 36e5, s = n / 6e4;
        return 1 <= o ? parseInt(o) + "个月前" : 1 <= r ? parseInt(r) + "个星期前" : 1 <= a ? parseInt(a) + "天前" : 1 <= i ? parseInt(i) + "个小时前" : 1 <= s ? parseInt(s) + "分钟前" : "刚刚发表";
    },
    typeOf: function(t) {
        return Object.prototype.toString.call(t).slice(8, -1);
    },
    isEmpty: function(t) {
        var e = "" === t || null == t || "NaN" === t, n = void 0, o = void 0;
        return e || (n = "Object" === this.typeOf(t) && Object.keys(t).length < 1, o = "Array" === this.typeOf(t) && t.length < 1), 
        e || n || o;
    },
    checkAuth: function(n) {
        var o = this;
        return new Promise(function(e, t) {
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope." + n] ? e(!0) : e(!1);
                },
                fail: function() {
                    o.networkError();
                }
            });
        });
    },
    getLocation: function() {
        var n = this;
        return new Promise(function(e, t) {
            wx.getLocation({
                success: function(t) {
                    e(t);
                },
                fail: function(t) {
                    console.log(t), -1 < t.errMsg.indexOf("fail auth deny") && n.authFail("地理位置");
                }
            });
        });
    },
    authFail: function(t) {
        wx.showModal({
            title: "未授权",
            content: "获得" + t + "权限才可以使用该功能，去设置中开启?",
            showCancel: !0,
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/pages/common/auth/auth?openType=openSetting"
                });
            }
        });
    },
    networkError: function() {
        var t = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).msg, e = void 0 === t ? "网络错误" : t;
        console.log(), this.hideAll(), this.getPage().onPullDownRefresh ? wx.showModal({
            title: "网络提示",
            content: e + ",请检查网络后刷新",
            confirmText: "立即刷新",
            cancelText: "等会刷新",
            success: function(t) {
                t.confirm && wx.startPullDownRefresh();
            }
        }) : this.showFail(e);
    },
    showModal: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = t.title, n = void 0 === e ? "提示" : e, o = t.content, r = void 0 === o ? "服务器错误" : o;
        wx.showModal({
            title: n,
            content: r,
            showCancel: !1
        });
    },
    showLoading: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e = t.title, n = void 0 === e ? "加载中" : e, o = t.mask, r = void 0 === o || o;
        wx.showLoading({
            title: n,
            mask: r
        });
    },
    showSuccess: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "操作成功";
        wx.showToast({
            title: t
        });
    },
    showFail: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "操作失败";
        wx.showToast({
            title: t,
            icon: "none"
        });
    },
    hideLoading: function() {
        wx.hideLoading();
    },
    hideAll: function() {
        wx.hideLoading(), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
    },
    getData: function(t) {
        return t.currentTarget.dataset;
    },
    getFromData: function(t) {
        return t.detail.target.dataset;
    },
    goUrl: function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? this.getFromData(t) : this.getData(t), n = e.url, o = e.method;
        if (o = o || "navigateTo", n) if (-1 < n.indexOf("copy:")) {
            n = n.split(":")[1];
            /^\d{7,23}$/.test(n) ? (console.log("纯数字"), wx.showActionSheet({
                itemList: [ "呼叫", "复制", "添加到手机通讯录" ],
                success: function(t) {
                    0 == t.tapIndex ? (console.log("呼叫"), wx.makePhoneCall({
                        phoneNumber: n
                    })) : 1 == t.tapIndex ? (console.log("复制"), wx.setClipboardData({
                        data: n,
                        success: function(t) {
                            console.log(t), wx.getClipboardData({
                                success: function(t) {
                                    console.log("复制文本成功 ==>>", t.data);
                                }
                            });
                        }
                    })) : 2 == t.tapIndex && (console.log("添加到手机通讯录"), wx.addPhoneContact({
                        firstName: " ",
                        mobilePhoneNumber: n,
                        success: function(t) {
                            console.log("添加到手机通讯录 ==> ", t);
                        },
                        fail: function(t) {
                            console.log("添加到手机通讯录fail ==> ", t);
                        }
                    }));
                }
            })) : (console.log("纯文本"), wx.setClipboardData({
                data: n,
                success: function(t) {
                    wx.getClipboardData({
                        success: function(t) {
                            console.log("复制文本成功 ==>>", t.data);
                        }
                    });
                }
            }));
        } else {
            if (-1 < n.indexOf("toCopy:")) return n = n.split(":")[1], void wx.setClipboardData({
                data: n,
                success: function(t) {
                    wx.getClipboardData({
                        success: function(t) {
                            console.log("复制文本成功 ==>>", t.data);
                        }
                    });
                }
            });
            if (-1 < n.indexOf("tel:")) wx.makePhoneCall({
                phoneNumber: n.split(":")[1]
            }); else {
                if (-1 < n.indexOf("http")) return n = encodeURIComponent(n), void wx.navigateTo({
                    url: "/longbing_card/common/webview/webview?url=" + n
                });
                if (0 == n.indexOf("wx")) {
                    var r, a = "", i = "release", s = n.split(":");
                    return 1 == s.length ? r = s[0] : 2 == s.length ? (r = s[0], a = s[1]) : 3 == s.length && (r = s[0], 
                    a = s[1], i = s[2]), void wx.navigateToMiniProgram({
                        appId: r,
                        path: a,
                        extraData: {
                            lb: "longbing"
                        },
                        envVersion: i,
                        success: function(t) {},
                        complete: function(t) {
                            console.log("跳转小程序", t);
                        }
                    });
                }
                wx[o]({
                    url: n
                });
            }
        }
    },
    getValue: function(t) {
        return t.detail.value;
    },
    setOptions: function(t) {
        return encodeURIComponent(JSON.stringify(t));
    },
    getOptions: function(t) {
        return JSON.parse(decodeURIComponent(t));
    },
    getPage: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0, e = getCurrentPages();
        return e[e.length - 1 + t];
    },
    setNavbar: function(t) {
        if (!this.isEmpty(t)) {
            var e = t.frontColor, n = t.backgroundColor, o = t.title;
            this.isEmpty(o) || wx.setNavigationBarTitle({
                title: o
            }), this.isEmpty(n) || this.isEmpty(e) || wx.setNavigationBarColor({
                frontColor: e,
                backgroundColor: n
            });
        }
    },
    setTabbar: function(t) {
        if (!this.isEmpty(t)) {
            var e = t.color, n = t.selectedColor, o = t.backgroundColor, r = t.borderStyle, a = t.list;
            for (var i in wx.setTabBarStyle({
                color: e,
                selectedColor: n,
                backgroundColor: o,
                borderStyle: r
            }), a) {
                var s = a[i], c = s.id, u = s.text, l = s.iconPath, f = s.selectedIconPath;
                wx.setTabBarItem({
                    index: c - 1,
                    text: u,
                    iconPath: l,
                    selectedIconPath: f
                });
            }
        }
    },
    pay: function(n) {
        return new Promise(function(e, t) {
            wx.requestPayment({
                timeStamp: n.timeStamp,
                nonceStr: n.nonceStr,
                package: n.package,
                signType: n.signType,
                paySign: n.paySign,
                success: function(t) {
                    e(!0);
                },
                fail: function(t) {
                    e(!1);
                },
                complete: function(t) {
                    console.log(t);
                }
            });
        });
    },
    getPageConfig: function(t) {
        return !this.isEmpty(t) && (t[this.getPage().route] || !1);
    },
    deepCopy: function(t) {
        if (t instanceof Array) {
            for (var e = [], n = 0; n < t.length; ++n) e[n] = this.deepCopy(t[n]);
            return e;
        }
        if (t instanceof Function) return e = new Function("return " + t.toString())();
        if (t instanceof Object) {
            e = {};
            for (var n in t) e[n] = this.deepCopy(t[n]);
            return e;
        }
        return t;
    },
    getIds: function(t) {
        var e = [];
        return (t = t || []).forEach(function(t) {
            e.push(t.id);
        }), e.join(",");
    },
    searchSubStr: function(t, e) {
        for (var n = [], o = t.indexOf(e); -1 < o; ) n.push(o), o = t.indexOf(e, o + 1);
        return n;
    },
    partition: function(t, a) {
        t.reduce(function(t, e) {
            var n = _slicedToArray(t, 2), o = n[0], r = n[1];
            return a(e) ? [ [].concat(_toConsumableArray(o), [ e ]), r ] : [ o, [].concat(_toConsumableArray(r), [ e ]) ];
        }, [ [], [] ]);
    },
    getUrlParam: function(t, e) {
        var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), o = t.split("?")[1].match(n);
        return null != o ? unescape(o[2]) : null;
    }
};