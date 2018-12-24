var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        type: "",
        dataList: [],
        globalData: {},
        tmpMore: [],
        page: 1,
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1
    },
    onLoad: function(a) {
        var t = this;
        app.util.showLoading(1), wx.hideShareMenu(), a.type && (t.setData({
            type: a.type
        }), 1 == a.type ? wx.setNavigationBarTitle({
            title: "产品推广"
        }) : 2 == a.type ? wx.setNavigationBarTitle({
            title: "动态推广"
        }) : 3 == a.type && (wx.setNavigationBarTitle({
            title: "名片推广"
        }), t.getCardIndexData())), t.getListData(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        app.util.showLoading(1);
        var a = this;
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(a, _index.baseModel, _xx_util2.default), 
        a.setData({
            dataList: [],
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), a.getListData(), wx.stopPullDownRefresh(), wx.hideLoading();
    },
    onReachBottom: function() {
        app.util.showLoading(1);
        var a = this;
        a.setData({
            show: !0
        }), 0 == a.data.isEmpty && (a.setData({
            page: a.data.page + 1
        }), a.getListData()), wx.hideLoading();
    },
    onPageScroll: function(a) {},
    onShareAppMessage: function(a) {},
    getCardIndexData: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/cardV3",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: wx.getStorageSync("userid"),
                from_id: wx.getStorageSync("userid")
            },
            success: function(a) {
                if (console.log("entry/wxapp/cardV3 ==>", a), !a.data.errno) {
                    var t = a.data.data, e = t.info.myCompany.addr, o = "";
                    23 < e.length && (o = "..."), t.info.myCompany.addrMore = e.slice(0, 23) + o;
                    var i = {
                        avatar: t.info.avatar,
                        name: t.info.name,
                        job_name: t.info.job_name,
                        phone: t.info.phone,
                        wechat: t.info.wechat,
                        companyName: t.info.myCompany.name,
                        logo: t.info.myCompany.logo,
                        addrMore: t.info.myCompany.addrMore,
                        qrImg: t.qr
                    };
                    n.setData({
                        cardIndexData: t,
                        tmpShareData: i
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getListData: function() {
        var u = this;
        app.util.request({
            url: "entry/wxapp/extensionDetailV2",
            cachetime: "30",
            method: "POST",
            data: {
                page: u.data.page,
                type: u.data.type
            },
            success: function(a) {
                if (console.log("entry/wxapp/extensionDetailV2 ==>", a), !a.data.errno) {
                    var t = a.data.data.list;
                    if (0 == t.length) return u.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    u.setData({
                        loading: !0
                    });
                    var e = u.data.dataList, o = (new app.util.date().dateToLong(new Date()) / 1e3).toFixed(0);
                    for (var i in t) {
                        for (var n in t[i].cover) t[i].cover[n] || t[i].cover.splice(n, 1);
                        for (var r in t[i].groups) if (t[i].groups[r].update_time = parseInt(t[i].groups[r].update_time), 
                        t[i].groups[r].update_time) {
                            t[i].groups[r].update_time = o - t[i].groups[r].update_time;
                            var d = parseInt(t[i].groups[r].update_time / 86400), s = parseInt(t[i].groups[r].update_time / 3600);
                            t[i].groups[r].update_time = 0 < d ? d + "天前互动" : 0 < s ? s + "小时前互动" : "";
                        } else t[i].groups[r].update_time = "";
                        e.push(t[i]);
                    }
                    u.setData({
                        dataList: e
                    });
                    var p = u.data.dataList, l = [];
                    for (var g in p) l.push("0");
                    u.setData({
                        tmpMore: l
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toJump: function(a) {
        var t = a.currentTarget.dataset.status, e = a.currentTarget.dataset.id, o = a.currentTarget.dataset.opengid;
        "toCopyright" == t && app.util.goUrl(a), "toShopDetail" == t ? (console.log("跳转至产品详情"), 
        wx.navigateTo({
            url: "/longbing_card/pages/shop/detail/detail?id=" + e
        })) : "toNewsDetail" == t ? (console.log("跳转至动态详情"), wx.navigateTo({
            url: "/longbing_card/pages/news/detail/detail?id=" + e + "&to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid")
        })) : "toCodeDetail" == t ? (console.log("跳转至自定义码 名片码详情"), 0 == e ? (console.log("名片码"), 
        wx.navigateTo({
            url: "/longbing_card/pages/card/share/share"
        })) : (console.log("自定义码"), wx.navigateTo({
            url: "/longbing_card/staff/spread/code/code?id=" + e + "&name=" + this.data.cardIndexData.info.name + "&avatar=" + this.data.cardIndexData.info.avatar
        }))) : "toSpreadDetail" == t && (console.log("跳转至群详情"), wx.navigateTo({
            url: "/longbing_card/staff/spread/detail/detail?id=" + e + "&opengid=" + o
        }));
    }
});