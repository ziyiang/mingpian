var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), getAppGlobalData = require("../../templates/copyright/copyright.js");

Page({
    data: {},
    onLoad: function(t) {
        app.util.showLoading(1), wx.hideShareMenu(), this.getUserInfo(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getUserInfo(), getAppGlobalData.getAppGlobalData(this, _index.baseModel, _xx_util2.default);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getUserInfo: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/userinfo",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                console.log("entry/wxapp/userinfo ==>", t), t.data.errno || e.setData({
                    userData: t.data.data
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/shopmyorder ==> fail ==> ", t);
            }
        });
    },
    toJump: function(t) {
        var e = t.currentTarget.dataset.status;
        console.log("toJump ==> ", e), app.util.goUrl(t);
    },
    formSubmit: function(t) {
        var e = t.detail.formId, o = (t.detail.target.dataset.index, t.detail.target.dataset.status);
        this.toSaveFormIds(e), console.log("toJump ==> ", o), app.util.goUrl(t, !0);
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