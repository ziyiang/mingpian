var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        status: "",
        name: "",
        avatar: "",
        globalData: {},
        dataList: [],
        page: 1,
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1
    },
    onLoad: function(t) {
        app.util.showLoading(1), t.status && (this.setData({
            status: t.status
        }), "news" == t.status ? (wx.setNavigationBarTitle({
            title: "动态推广"
        }), wx.showShareMenu({
            withShareTicket: !0,
            success: function(t) {
                console.log("shareMenu share success"), console.log("分_享" + t);
            },
            fail: function(t) {
                console.log(t);
            }
        })) : "code" == t.status && (wx.setNavigationBarTitle({
            title: "自定义码推广"
        }), this.getCardIndexData())), wx.hideShareMenu(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {
        app.util.showLoading(1);
        var t = this;
        t.setData({
            page: 1,
            dataList: []
        }), "news" == t.data.status ? t.getNewsListData() : "code" == t.data.status && t.getCodeListData(), 
        wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        app.util.showLoading(1);
        var t = this;
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(t, _index.baseModel, _xx_util2.default), 
        t.setData({
            dataList: [],
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), "news" == t.data.status ? t.getNewsListData() : "code" == t.data.status && t.getCodeListData(), 
        wx.stopPullDownRefresh(), wx.hideLoading();
    },
    onReachBottom: function() {
        app.util.showLoading(1);
        var t = this;
        t.setData({
            show: !0
        }), 0 == t.data.isEmpty && (t.setData({
            page: t.data.page + 1
        }), "news" == t.data.status ? t.getNewsListData() : "code" == t.data.status && t.getCodeListData()), 
        wx.hideLoading();
    },
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {
        if ("button" === t.from && "news" == this.data.status) {
            var a = t.target.dataset.index, e = t.target.dataset.id, o = this.data.dataList;
            return console.log(o[a].title, o[a].cover[0]), {
                title: o[a].title,
                path: "/longbing_card/pages/news/detail/detail?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&id=" + e + "&type=3",
                imageUrl: o[a].cover[0]
            };
        }
    },
    getNewsListData: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/myTimeline",
            cachetime: "30",
            method: "POST",
            data: {
                page: n.data.page
            },
            success: function(t) {
                if (console.log("entry/wxapp/myTimeline ==>", t), !t.data.errno) {
                    var a = t.data.data.list;
                    if (0 == a.length) return n.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    var e = n.data.dataList, o = new app.util.date();
                    for (var i in a) {
                        for (var s in a[i].create_time.length < 12 && (a[i].create_time = o.dateToStr("yyyy/MM/DD", o.longToDate(1e3 * a[i].create_time))), 
                        a[i].cover) a[i].cover[s] || (console.log("null      ****", s), a[i].cover.splice(s, 1));
                        e.push(a[i]);
                    }
                    n.setData({
                        dataList: e,
                        loading: !0
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getCodeListData: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/releaseQrList",
            cachetime: "30",
            method: "POST",
            data: {
                page: s.data.page
            },
            success: function(t) {
                if (console.log("entry/wxapp/releaseQrList ==>", t), !t.data.errno) {
                    var a = t.data.data.list;
                    if (0 == a.length) return s.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    var e = s.data.dataList, o = new app.util.date();
                    for (var i in a) a[i].create_time.length < 12 && (a[i].create_time = o.dateToStr("yyyy/MM/DD", o.longToDate(1e3 * a[i].create_time))), 
                    e.push(a[i]);
                    s.setData({
                        dataList: e,
                        loading: !0
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getCardIndexData: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/cardV3",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: wx.getStorageSync("userid"),
                from_id: wx.getStorageSync("userid")
            },
            success: function(t) {
                console.log("entry/wxapp/cardV3 ==>", t), t.data.errno || a.setData({
                    name: t.data.data.info.name,
                    avatar: t.data.data.info.avatar
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toDeleteQr: function(a) {
        var e = this, o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/DeleteQr",
            cachetime: "30",
            method: "POST",
            data: {
                id: o[a].id
            },
            success: function(t) {
                t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "自定义码删除成功！",
                    duration: 1e3
                }), o.splice(a, 1), e.setData({
                    dataList: o
                }));
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toDeleteTimeline: function(a) {
        var e = this, o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/DeleteTimeline",
            cachetime: "30",
            method: "POST",
            data: {
                id: o[a].id
            },
            success: function(t) {
                t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "动态删除成功！",
                    duration: 1e3
                }), o.splice(a, 1), e.setData({
                    dataList: o
                }));
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    formSubmit: function(t) {
        var a = this, e = t.detail.formId, o = t.detail.target.dataset.index, i = t.detail.target.dataset.status;
        a.toSaveFormIds(e), "toShare" == i ? console.log("转发") : "toDelete" == i ? (console.log("删除"), 
        wx.showModal({
            title: "",
            content: "是否确认删除此数据？",
            success: function(t) {
                t.confirm && ("news" == a.data.status ? a.toDeleteTimeline(o) : "code" == a.data.status && a.toDeleteQr(o));
            }
        })) : "toCodeDetial" == i ? (console.log("跳转至详情"), wx.navigateTo({
            url: "/longbing_card/staff/spread/code/code?id=" + a.data.dataList[o].id + "&name=" + a.data.name + "&avatar=" + a.data.avatar
        })) : "toAddNews" == i && (console.log("新建动态 || 新建自定义码"), wx.navigateTo({
            url: "/longbing_card/staff/spread/news/addNews/addNews?status=" + a.data.status
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
        var a = t.currentTarget.dataset.status, e = t.currentTarget.dataset.id;
        "toCopyright" == a && app.util.goUrl(t), "toNewsDetail" == a && (console.log("跳转至详情"), 
        "news" == this.data.status ? wx.navigateTo({
            url: "/longbing_card/pages/news/detail/detail?id=" + e + "&to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid")
        }) : "code" == this.data.status && wx.navigateTo({
            url: "/longbing_card/staff/spread/code/code?id=" + e
        }));
    }
});