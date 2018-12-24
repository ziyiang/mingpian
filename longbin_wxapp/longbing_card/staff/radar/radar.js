var _data, _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), getAppGlobalData = require("../../templates/copyright/copyright.js");

Page({
    data: (_data = {
        tabList: [ {
            status: "time",
            name: "时间"
        }, {
            status: "behavior",
            name: "行为"
        } ],
        currentIndex: 0,
        currentTab: "time",
        setCount: [ {
            name: "近7天"
        }, {
            name: "近30天"
        } ],
        count: 0,
        currentRadarTime: "",
        windowHeight: "",
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1,
        authStatus: !0,
        radarTime: "",
        timeList: [],
        page: 1
    }, _defineProperty(_data, "more", !0), _defineProperty(_data, "loading", !1), _defineProperty(_data, "isEmpty", !1), 
    _defineProperty(_data, "show", !1), _defineProperty(_data, "tmpDDDDDDataLength", 0), 
    _defineProperty(_data, "behaviorInfo", []), _defineProperty(_data, "behaviorList", []), 
    _defineProperty(_data, "globalData", {}), _data),
    onLoad: function(t) {
        var a = this;
        app.util.showLoading(1), wx.hideShareMenu(), "time" == a.data.currentTab ? (console.log("时间"), 
        a.getRadarByTime()) : "behavior" == a.data.currentTab && (console.log("行为"), a.getRadarByBehaviorInfo(), 
        a.getRadarByBehavior()), a.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight,
            globalData: app.globalData
        }), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        app.util.showLoading(1), getAppGlobalData.getAppGlobalData(t, _index.baseModel, _xx_util2.default), 
        "time" == t.data.currentTab ? (t.setData({
            onPullDownRefresh: !0,
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), t.getRadarByTime()) : "behavior" == t.data.currentTab && (t.setData({
            behaviorInfo: {},
            behaviorList: {}
        }), t.getRadarByBehaviorInfo(), t.getRadarByBehavior()), wx.showNavigationBarLoading(), 
        wx.stopPullDownRefresh(), wx.hideLoading();
    },
    onReachBottom: function() {
        app.util.showLoading(1);
        var t = this;
        "time" == t.data.currentTab && (t.setData({
            show: !0
        }), 0 == t.data.isEmpty && (t.setData({
            page: t.data.page + 1
        }), t.getRadarByTime())), wx.hideLoading();
    },
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {},
    pickerSelected: function(t) {
        var a = this;
        "count" == t.currentTarget.dataset.status && (a.setData({
            count: t.detail.value
        }), a.getRadarByBehaviorInfo(), a.getRadarByBehavior());
    },
    getRadarByTime: function() {
        var u = this;
        app.util.request({
            url: "entry/wxapp/aiTime",
            cachetime: "30",
            method: "POST",
            data: {
                uniacid: app.siteInfo.uniacid,
                page: u.data.page
            },
            success: function(t) {
                if (console.log("entry/wxapp/aiTime ==>", t), !t.data.errno) {
                    var a = t.data.data.list;
                    if (0 == a.length) return u.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    u.setData({
                        loading: !0
                    });
                    var e = u.data.timeList, o = u.data.currentRadarTime;
                    1 == u.data.onPullDownRefresh && (e = []);
                    var r = new app.util.date();
                    for (var i in a) a[i].create_time && (a[i].create_time1 = r.dateToStr("YY/MM/DD", r.longToDate(1e3 * a[i].create_time)), 
                    a[i].create_time2 = r.dateToStr("HH:mm", r.longToDate(1e3 * a[i].create_time))), 
                    "praise" == a[i].sign && 2 == a[i].type && (1 == a[i].count && (a[i].countText = "，TA正在了解你"), 
                    2 != a[i].count && 3 != a[i].count && 4 != a[i].count || (a[i].countText = "，你成功的吸引了TA"), 
                    4 < a[i].count && (a[i].countText = "，高意向客户立刻主动沟通")), "view" == a[i].sign && (1 == a[i].type && (1 == a[i].count && (a[i].countText = "，尽快把握商机"), 
                    2 == a[i].count && (a[i].countText = "，潜在购买客户"), 3 == a[i].count && (a[i].countText = "，高意向客户成交在望"), 
                    3 < a[i].count && (a[i].countText = "，购买欲望强烈")), 3 != a[i].type && 6 != a[i].type || (2 == a[i].count && (a[i].countText = "，赶快主动沟通"), 
                    2 < a[i].count && (a[i].countText = "，高意向客户成交在望")), 6 == a[i].type && 1 == a[i].count && (a[i].countText = "，看来TA对公司感兴趣")), 
                    e.push(a[i]);
                    for (var n in e) o || (o = e[0].create_time1, console.log(o, "currentRadarTime")), 
                    o == e[n].create_time1 && (e[n].showTime = 1), 0 < n && (e[n].create_time1 != e[n - 1].create_time1 ? (o = e[n].create_time1, 
                    e[n].showTime = 1) : e[n].showTime = 0);
                    u.setData({
                        timeList: e,
                        onPullDownRefresh: !1,
                        currentRadarTime: o
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getRadarByBehaviorInfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/aiBehaviorHeader",
            cachetime: "30",
            method: "POST",
            data: {
                uniacid: app.siteInfo.uniacid,
                type: 1 * a.data.count + 1
            },
            success: function(t) {
                t.data.errno || a.setData({
                    behaviorInfo: t.data.data
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getRadarByBehavior: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/aiBehaviorOther",
            cachetime: "30",
            method: "POST",
            data: {
                type: 1 * a.data.count + 1
            },
            success: function(t) {
                t.data.errno || a.setData({
                    behaviorList: t.data.data
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toJump: function(t) {
        var a = t.currentTarget.dataset.status, e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.id, r = this.data.timeList;
        if ("toCopyright" == a && app.util.goUrl(t), "toChat" == a) {
            console.log("去聊天");
            var i = r[e].user_id;
            console.log(i, "messge页面传递的chat_to_uid");
            var n = r[e].user.nickName;
            n || (n = "新客户");
            var u = app.globalData.avatarUrl, d = r[e].user.avatarUrl;
            d || (d = app.globalData.defaultUserImg);
            var c = r[e].phone;
            wx.navigateTo({
                url: "/longbing_card/chat/staffChat/staffChat?chat_to_uid=" + i + "&contactUserName=" + n + "&chatAvatarUrl=" + u + "&toChatAvatarUrl=" + d + "&clientPhone=" + c
            });
        } else "toCustomInfo" == a && (console.log("跳转至客户页面"), wx.navigateTo({
            url: "/longbing_card/staff/custom/detail/detail?id=" + o
        }));
    },
    formSubmit: function(t) {
        var a = this, e = t.detail.formId, o = t.detail.target.dataset.index, r = t.detail.target.dataset.status;
        a.toSaveFormIds(e), "toHome" != r && (a.setData({
            currentIndex: o,
            currentTab: r
        }), wx.pageScrollTo({
            duration: 0,
            scrollTop: 0
        })), "time" == r ? (console.log("时间"), a.setData({
            page: 1,
            onPullDownRefresh: !0
        }), a.getRadarByTime()) : "behavior" == r ? (console.log("行为"), a.getRadarByBehaviorInfo(), 
        a.getRadarByBehavior()) : "toHome" == r && (console.log("返回首页"), wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"
        }));
    },
    toSaveFormIds: function(t) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {
                formId: t
            },
            success: function(t) {
                t.data.errno;
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    }
});