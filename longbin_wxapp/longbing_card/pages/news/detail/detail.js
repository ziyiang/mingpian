var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var timer, app = getApp(), auth = require("../../../templates/auth/auth.js"), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        id: "",
        to_uid: "",
        from_id: "",
        isStaffAdd: !1,
        authStatus: !0,
        globalData: {},
        detailData: [],
        staffCard: []
    },
    onLoad: function(a) {
        console.log(this);
        var t = this;
        app.util.showLoading(1), wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {
                console.log("shareMenu share success"), console.log("分_享" + a);
            },
            fail: function(a) {
                console.log(a);
            }
        });
        var e = {};
        a.id && (e.id = a.id), a.to_uid && (e.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), 
        a.from_id && (e.from_id = a.from_id, app.globalData.from_id = a.from_id), a.nickName && (app.globalData.nickName = a.nickName), 
        a.companyName && (e.companyName = a.companyName), t.setData({
            paramData: e
        }), t.getStaffCard(), t.getDetailData(), a.from_id && 3 == a.type && t.data.paramData.to_uid != wx.getStorageSync("userid") && 1044 == app.globalData.loginParam.scene && (timer = setInterval(function() {
            app.globalData.encryptedData && t.toGetShareInfo();
        }, 1e3)), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {
        this.checkAuthStatus();
    },
    onHide: function() {},
    onUnload: function() {
        clearInterval(timer);
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(this, _index.baseModel, _xx_util2.default), 
        this.checkAuthStatus();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        "button" === a.from ? console.log("来自页面内转发按钮") : console.log("来自右上角转发菜单");
        var e = "/longbing_card/pages/news/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&id=" + t.data.paramData.id + "&type=3";
        return t.data.paramData.companyName && (e = e + "&companyName=" + t.data.paramData.companyName), 
        {
            title: "",
            path: e,
            imageUrl: ""
        };
    },
    getStaffCard: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/cardV3",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: e.data.paramData.to_uid,
                from_id: e.data.paramData.from_id
            },
            success: function(a) {
                if (!a.data.errno) {
                    var t = !1;
                    1 == a.data.data.info.is_staff && (t = !0), e.setData({
                        staffCard: a.data.data,
                        isStaffAdd: t
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    checkAuthStatus: function() {
        auth.checkAuth(this, _index.baseModel, _xx_util2.default);
    },
    getUserInfo: function(a) {
        console.log("获取微信用户信息"), auth.getUserInfo(a);
    },
    getDetailData: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/timelineDetail",
            cachetime: "30",
            method: "POST",
            data: {
                id: o.data.paramData.id,
                to_uid: app.globalData.to_uid
            },
            success: function(a) {
                if (console.log("entry/wxapp/timelineDetail ==>", a), !a.data.errno) {
                    if (a.data.data.cover) for (var t in a.data.data.cover) a.data.data.cover[t] || a.data.data.cover.splice(t, 1);
                    var e = new app.util.date();
                    a.data.data.create_time = e.dateToStr("MM月DD日", e.longToDate(1e3 * a.data.data.create_time)), 
                    o.setData({
                        detailData: a.data.data
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toForwardRecord: function() {
        var a = {
            type: 3,
            to_uid: app.globalData.to_uid,
            target_id: this.data.paramData.id
        };
        console.log("entry/wxapp/Forward ==> paramObj", a), app.util.request({
            url: "entry/wxapp/Forward",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toGetShareInfo: function() {
        var e = this;
        wx.login({
            success: function(a) {
                var t = {
                    encryptedData: app.globalData.encryptedData,
                    iv: app.globalData.iv,
                    type: 4,
                    code: a.code,
                    to_uid: e.data.paramData.to_uid,
                    target_id: e.data.paramData.id
                };
                app.util.request({
                    url: "entry/wxapp/getShare",
                    cachetime: "30",
                    method: "POST",
                    data: t,
                    success: function(a) {
                        console.log("entry/wxapp/getShare ==>", a), a.data.errno || clearInterval(timer);
                    },
                    fail: function(a) {}
                });
            },
            fail: function(a) {}
        });
    },
    toJump: function(a) {
        "toCopyright" == a.currentTarget.dataset.status && app.util.goUrl(a);
    },
    formSubmit: function(a) {
        var t = a.detail.formId, e = (a.detail.target.dataset.index, a.detail.target.dataset.status);
        this.toSaveFormIds(t), "toSeeCard" == e ? (console.log("看名片"), wx.navigateTo({
            url: "/longbing_card/pages/index/index?to_uid=" + this.data.paramData.to_uid + "&from_id=" + this.data.paramData.from_id + "&currentTabBar=toCard"
        })) : "toHome" == e && (console.log("回到首页"), wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + app.globalData.from_id + "&currentTabBar=toCard"
        }));
    },
    toSaveFormIds: function(a) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {
                formId: a
            },
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    }
});