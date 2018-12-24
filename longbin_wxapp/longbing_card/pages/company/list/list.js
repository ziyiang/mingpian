var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        dataList: [],
        globalData: {},
        page: 1,
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1
    },
    onLoad: function(a) {
        console.log(this);
        app.util.showLoading(1), wx.hideShareMenu();
        var t = {};
        a.type && (t.type = a.type, 1 == a.type && wx.showShareMenu()), a.name && (t.name = a.name, 
        wx.setNavigationBarTitle({
            title: a.name
        })), a.table_name && (t.table_name = a.table_name), a.identification && (t.identification = a.identification), 
        a.to_uid && (t.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), a.from_id && (t.from_id = a.from_id, 
        app.globalData.from_id = a.from_id), this.setData({
            paramData: t,
            globalData: app.globalData
        }), this.getListData(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        getAppGlobalData.getAppGlobalData(a, _index.baseModel, _xx_util2.default), a.setData({
            dataList: [],
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), a.getListData(), setTimeout(function() {
            wx.showNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {
        var a = this;
        a.setData({
            show: !0
        }), 0 == a.data.isEmpty && (a.setData({
            page: a.data.page + 1
        }), a.getListData());
    },
    onShareAppMessage: function(a) {
        var t = this;
        if (1 == t.data.paramData.type) return "button" === a.from ? console.log("来自页面内转发按钮") : console.log("来自右上角转发菜单", t.data.paramData.name), 
        {
            title: "",
            path: "/longbing_card/pages/company/list/list?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&type=" + t.data.paramData.type + "&name=" + t.data.paramData.name + "&table_name=" + t.data.paramData.table_name + "&identification=" + t.data.paramData.identification,
            imageUrl: ""
        };
    },
    getListData: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/modularList",
            cachetime: "30",
            method: "POST",
            data: {
                page: n.data.page,
                identification: n.data.paramData.identification
            },
            success: function(a) {
                if (console.log("entry/wxapp/modularList ==>", a), !a.data.errno) {
                    var t = a.data.data.list;
                    if (0 == t.length) return n.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    var e = n.data.dataList;
                    for (var i in t) {
                        var o = new app.util.date();
                        t[i].create_time.length < 12 && (t[i].create_time = o.dateToStr("yyyy-MM-DD", o.longToDate(1e3 * t[i].create_time))), 
                        e.push(t[i]);
                    }
                    n.setData({
                        dataList: e,
                        loading: !0
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toJump: function(a) {
        var t = this, e = a.currentTarget.dataset.id, i = a.currentTarget.dataset.status, o = a.currentTarget.dataset.content;
        if ("toCopyright" == i && app.util.goUrl(a), 5 == t.data.paramData.type) return !1;
        7 == t.data.paramData.type ? wx.navigateTo({
            url: o
        }) : wx.navigateTo({
            url: "/longbing_card/pages/company/detail/detail?table_name=" + t.data.paramData.table_name + "&type=" + t.data.paramData.type + "&id=" + e + "&name=" + t.data.paramData.name
        });
    }
});