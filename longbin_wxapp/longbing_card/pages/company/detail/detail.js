var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        globalData: {},
        refresh: !1
    },
    onLoad: function(a) {
        console.log(a, "dddddddddddddd  options ***/");
        var t = this, e = {};
        a.id && (e.id = a.id), a.type && (e.type = a.type), a.name && (e.name = a.name, 
        wx.setNavigationBarTitle({
            title: a.name
        })), a.status && (e.status = a.status), a.src && (e.src = a.src), a.table_name && (e.table_name = a.table_name), 
        a.to_uid && (e.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), a.from_id && (e.from_id = a.from_id, 
        app.globalData.from_id = a.from_id), t.setData({
            paramData: e,
            globalData: app.globalData
        }), "toPlayVideo" != t.data.paramData.status && (_xx_util2.default.showLoading(), 
        t.getModularInfo()), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        getAppGlobalData.getAppGlobalData(a, _index.baseModel, _xx_util2.default), a.setData({
            refresh: !0
        }, function() {
            wx.showNavigationBarLoading(), a.getModularInfo();
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        "button" === a.from ? console.log("来自页面内转发按钮") : console.log("来自右上角转发菜单");
        var e = "/longbing_card/pages/company/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&id=" + t.data.paramData.id + "&type=" + t.data.paramData.type + "&name=" + t.data.paramData.name + "&table_name=" + t.data.paramData.table_name;
        return console.log(e, "tmp_path"), "toPlayVideo" == t.data.paramData.status && (e = "/longbing_card/pages/company/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=toPlayVideo&name=" + t.data.paramData.name + "&src=" + t.data.paramData.src), 
        {
            title: "",
            path: e,
            imageUrl: ""
        };
    },
    getModularInfo: function() {
        var o = this, a = o.data, t = o.data.paramData, e = t.id, i = t.table_name;
        a || _xx_util2.default.showLoading();
        var d = {
            id: e,
            table_name: i
        };
        _index.userModel.getModularInfo(d).then(function(a) {
            _xx_util2.default.hideAll();
            var t = a.data, e = new app.util.date();
            t.create_time = e.dateToStr("MM月DD日", e.longToDate(1e3 * t.create_time)), o.setData({
                detailData: t
            });
        });
    },
    toJump: function(a) {
        var t = a.currentTarget.dataset.status, e = a.currentTarget.dataset.content;
        if ("toCopyright" == t && app.util.goUrl(a), "toCall" == t) {
            if (console.log("联系HR"), !e) return !1;
            wx.makePhoneCall({
                phoneNumber: e
            });
        }
    },
    formSubmit: function(a) {
        var t = a.detail.formId, e = (a.detail.target.dataset.index, a.detail.target.dataset.status);
        this.toSaveFormIds(t), "toHome" == e && (console.log("回到首页"), wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + app.globalData.from_id + "&currentTabBar=toCard"
        }));
    },
    toSaveFormIds: function(a) {
        var t = {
            formId: a
        };
        _index.baseModel.getFormId(t).then(function(a) {
            _xx_util2.default.hideAll();
        });
    }
});