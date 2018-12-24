var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        globalData: {},
        dataList: [],
        page: 1,
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1
    },
    onLoad: function(t) {
        app.util.showLoading(1);
        wx.showShareMenu({
            withShareTicket: !0,
            success: function(t) {
                console.log("shareMenu share success"), console.log("分_享" + t);
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.getListData(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        app.util.showLoading(1);
        var t = this;
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(t, _index.baseModel, _xx_util2.default), 
        t.setData({
            onPullDownRefresh: !0,
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), t.getListData(), wx.stopPullDownRefresh(), wx.hideLoading();
    },
    onReachBottom: function() {
        app.util.showLoading(1);
        var t = this;
        t.setData({
            show: !0
        }), 0 == t.data.isEmpty && (t.setData({
            page: t.data.page + 1
        }), t.getListData()), wx.hideLoading();
    },
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {
        if ("button" === t.from) {
            var a = t.target.dataset.index, e = this.data.dataList;
            return {
                title: e[a].name,
                path: "/longbing_card/pages/shop/detail/detail?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&id=" + e[a].id + "&type=2&nickName=" + app.globalData.nickName,
                imageUrl: e[a].cover
            };
        }
    },
    getListData: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/extensions",
            cachetime: "30",
            method: "POST",
            data: {
                page: i.data.page
            },
            success: function(t) {
                if (console.log("entry/wxapp/extensions ==>", t), !t.data.errno) {
                    var a = t.data.data.list;
                    if (0 == a.length) return i.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    var e = i.data.dataList;
                    for (var o in 1 == i.data.onPullDownRefresh && (e = []), a) e.push(a[o]);
                    i.setData({
                        dataList: e,
                        onPullDownRefresh: !1,
                        loading: !0
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toSetExtension: function(a) {
        var e = this, o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/extension",
            cachetime: "30",
            method: "POST",
            data: {
                goods_id: o[a].id
            },
            success: function(t) {
                t.data.errno || (0 == o[a].is_extension ? o[a].is_extension = 1 : 1 == o[a].is_extension && (o[a].is_extension = 0), 
                e.setData({
                    dataList: o
                }));
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    formSubmit: function(t) {
        var a = t.detail.formId, e = t.detail.target.dataset.status, o = t.detail.target.dataset.index;
        this.toSaveFormIds(a), "toPush" == e ? (console.log("设为主推"), this.toSetExtension(o)) : "toShare" == e && console.log("转发");
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
        var a = t.currentTarget.dataset.status, e = t.currentTarget.dataset.id;
        "toCopyright" == a && app.util.goUrl(t), "toShopDetail" == a && (console.log("跳转至详情"), 
        wx.navigateTo({
            url: "/longbing_card/pages/shop/detail/detail?id=" + e
        }));
    }
});