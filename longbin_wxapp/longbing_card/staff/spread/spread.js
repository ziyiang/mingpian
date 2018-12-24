var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), getAppGlobalData = require("../../templates/copyright/copyright.js");

Page({
    data: {
        setCount: [ {
            name: "今日"
        }, {
            name: "近7天"
        }, {
            name: "近30天"
        }, {
            name: "本月"
        } ],
        count: 2,
        countList: {},
        globalData: {},
        staffInfo: {},
        staffCard: {},
        qrImg: ""
    },
    onLoad: function(t) {
        app.util.showLoading(1);
        var a = this;
        wx.hideShareMenu(), a.getStaffInfo(), a.getCardIndexData(), wx.hideLoading(), a.setData({
            globalData: app.globalData
        });
    },
    onReady: function() {},
    onShow: function() {
        this.toGetCount();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(t, _index.baseModel, _xx_util2.default), 
        t.getStaffInfo(), t.getCardIndexData();
    },
    onReachBottom: function() {},
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {
        var a = this, e = a.data.staffInfo;
        if ("button" === t.from) {
            var n = a.data.cardIndexData.info.myCompany.name;
            return a.data.cardIndexData.info.myCompany.short_name && (n = a.data.cardIndexData.info.myCompany.short_name), 
            {
                title: "您好，我是" + (n = n + "的" + e.info.job + e.info.name) + "，请惠存。",
                path: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard",
                imageUrl: a.data.StaffCard.avatar
            };
        }
    },
    pickerSelected: function(t) {
        var a = this;
        "count" == t.currentTarget.dataset.status && (a.setData({
            count: t.detail.value
        }), a.setData({
            countList: {}
        }), a.toGetCount());
    },
    getStaffInfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Staff",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                t.data.errno || a.setData({
                    staffInfo: t.data.data
                }, function() {
                    a.getStaffCard();
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getStaffCard: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/StaffCard",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                t.data.errno || a.setData({
                    StaffCard: t.data.data.count
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getCardIndexData: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/cardV3",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: wx.getStorageSync("userid"),
                from_id: wx.getStorageSync("userid")
            },
            success: function(t) {
                if (console.log("entry/wxapp/cardV3 ==>", t), !t.data.errno) {
                    var a = t.data.data, e = a.info.myCompany.addr, n = "";
                    23 < e.length && (n = "..."), a.info.myCompany.addrMore = e.slice(0, 23) + n;
                    var o = {
                        avatar: a.info.avatar,
                        name: a.info.name,
                        job_name: a.info.job_name,
                        phone: a.info.phone,
                        wechat: a.info.wechat,
                        companyName: a.info.myCompany.name,
                        logo: a.info.myCompany.logo,
                        addrMore: a.info.myCompany.addrMore,
                        qrImg: a.qr
                    };
                    i.setData({
                        cardIndexData: a,
                        tmpShareData: o
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toGetCount: function() {
        var l = this;
        app.util.request({
            url: "entry/wxapp/extensionStatistics",
            cachetime: "30",
            method: "POST",
            data: {
                type: 1 * l.data.count + 1
            },
            success: function(t) {
                if (console.log("entry/wxapp/extensionStatistics ==>", t), !t.data.errno) {
                    var a = t.data.data, e = (new app.util.date().dateToLong(new Date()) / 1e3).toFixed(0);
                    if (console.log(e, "currentTime"), a.extension.count || (a.extension.count = 0), 
                    a.timeline.count || (a.timeline.count = 0), a.card.count || (a.card.count = 0), 
                    a.extension.last_time = parseInt(a.extension.last_time), a.extension.last_time) {
                        a.extension.last_time = e - a.extension.last_time;
                        var n = parseInt(a.extension.last_time / 86400), o = parseInt(a.extension.last_time / 3600);
                        a.extension.last_time = 0 < n ? n + "天前互动" : 0 < o ? o + "小时前互动" : "";
                    } else a.extension.last_time = "";
                    if (a.timeline.last_time = parseInt(a.timeline.last_time), a.timeline.last_time) {
                        a.timeline.last_time = e - a.timeline.last_time;
                        var i = parseInt(a.timeline.last_time / 86400), r = parseInt(a.timeline.last_time / 3600);
                        a.timeline.last_time = 0 < i ? i + "天前互动" : 0 < r ? r + "小时前互动" : "";
                    } else a.timeline.last_time = "";
                    if (a.card.last_time = parseInt(a.card.last_time), a.card.last_time) {
                        a.card.last_time = e - a.card.last_time;
                        var s = parseInt(a.card.last_time / 86400), d = parseInt(a.card.last_time / 3600);
                        a.card.last_time = 0 < s ? s + "天前互动" : 0 < d ? d + "小时前互动" : "";
                    } else a.card.last_time = "";
                    l.setData({
                        countList: a
                    }), console.log(t.data.data, a, "ddddddd", l.data.countList);
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    formSubmit: function(t) {
        var a = t.detail.formId, e = t.detail.target.dataset.status, n = (t.detail.target.dataset.index, 
        t.detail.target.dataset.type);
        this.toSaveFormIds(a), "toSpread" == e ? (console.log("我要推广"), "toProduct" == n ? (console.log("产品"), 
        wx.navigateTo({
            url: "/longbing_card/staff/spread/product/product"
        })) : "toNews" == n ? (console.log("动态"), wx.navigateTo({
            url: "/longbing_card/staff/spread/news/news?status=news"
        })) : "toCard" == n ? console.log("名片") : "toEwm" == n ? (console.log("名片码"), wx.navigateTo({
            url: "/longbing_card/pages/card/share/share"
        })) : "toCode" == n && (console.log("自定义码"), wx.navigateTo({
            url: "/longbing_card/staff/spread/news/news?status=code"
        }))) : "toHome" == e && (console.log("返回首页"), wx.reLaunch({
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
    },
    toJump: function(t) {
        var a = t.currentTarget.dataset.status, e = t.currentTarget.dataset.type;
        "toCopyright" == a && app.util.goUrl(t), (a = "toSprdadDetail") && (console.log("跳转至详情"), 
        3 != e && wx.navigateTo({
            url: "/longbing_card/staff/spread/spread/spread?type=" + e
        }));
    }
});