var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var timerLeftTime, app = getApp();

Page({
    data: {
        globalData: {}
    },
    onLoad: function(t) {
        app.util.showLoading(1), wx.hideShareMenu();
        var a = {};
        t.id && (a.detailID = t.id), t.to_uid && (a.to_uid = t.to_uid), wx.getStorageSync("moreCollageData") && (a.data = wx.getStorageSync("moreCollageData")), 
        this.setData({
            paramData: a,
            globalData: app.globalData
        }), this.getCollageList(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        clearInterval(timerLeftTime);
    },
    onUnload: function() {
        clearInterval(timerLeftTime);
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getCollageList();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getCollageList: function() {
        var u = this;
        app.util.request({
            url: "entry/wxapp/shopcollagelist",
            cachetime: "30",
            method: "POST",
            data: {
                goods_id: u.data.paramData.detailID
            },
            success: function(t) {
                if (console.log("entry/wxapp/shopcollagelist ==>", t), !t.data.errno) {
                    var a = t.data.data, e = new app.util.date(), o = [], i = [];
                    for (var l in a) 0 < a[l].left_number && i.push(a[l]);
                    for (var n in i) {
                        var r = i[n].left_time, s = parseInt(r / 24 / 60 / 60);
                        s = 0 < s ? s + "天 " : "", o[n] = s + e.dateToStr("HH:mm", e.longToDate(1e3 * r)), 
                        0 == r && (i.splice(n, 1), o.splice(n, 1)), u.setData({
                            tmpTimes: o
                        });
                    }
                    u.setData({
                        collageList: i
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/shopcollagelist ==> fail ==> ", t);
            }
        });
    },
    toJump: function(t) {
        var a = t.currentTarget.dataset.status;
        "toCopyright" == a ? app.util.goUrl(t) : "toReleaseCollage" == a && (console.log("去拼单"), 
        app.util.goUrl(t));
    }
});