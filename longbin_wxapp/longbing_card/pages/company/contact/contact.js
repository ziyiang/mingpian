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
        companyData: {
            list: {}
        }
    },
    onLoad: function(a) {
        console.log(this), app.util.showLoading(1);
        var t = {};
        a.type && (t.type = a.type), a.name && (t.name = a.name, wx.setNavigationBarTitle({
            title: a.name
        })), a.identification && (t.identification = a.identification), a.to_uid && (t.to_uid = a.to_uid, 
        app.globalData.to_uid = a.to_uid), a.from_id && (t.from_id = a.from_id, app.globalData.from_id = a.from_id), 
        this.setData({
            paramData: t,
            globalData: app.globalData
        }), this.getContactData(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(this, _index.baseModel, _xx_util2.default);
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        return "button" === a.from ? console.log("来自页面内转发按钮") : console.log("来自右上角转发菜单", t.data.paramData.name), 
        {
            title: "",
            path: "/longbing_card/pages/company/contact/contact?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&type=" + t.data.paramData.type + "&name=" + t.data.paramData.name + "&identification=" + t.data.paramData.identification,
            imageUrl: ""
        };
    },
    getContactData: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/modular",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: app.globalData.to_uid
            },
            success: function(a) {
                if (console.log("entry/wxapp/modular ==>", a), !a.data.errno) {
                    var t = a.data.data;
                    for (var o in t) if (t[o].id == i.data.paramData.identification && t[o].type == i.data.paramData.type) {
                        var e = [];
                        e.push(t[o]), t[o].info.markers = [ {
                            iconPath: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/A33zQycihMM33y337LH23myTqTl3tl.png",
                            id: 1,
                            callout: {
                                content: t[o].info.address,
                                fontSize: 14,
                                bgColor: "#ffffff",
                                padding: 4,
                                display: "ALWAYS",
                                textAlign: "center",
                                borderRadius: 2
                            },
                            latitude: t[o].info.latitude,
                            longitude: t[o].info.longitude,
                            width: 28,
                            height: 28
                        } ], i.setData({
                            companyData: e
                        });
                    }
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toJump: function(a) {
        var t = this, o = a.currentTarget.dataset.status, e = a.currentTarget.dataset.content;
        if ("toCopyright" == o) app.util.goUrl(a); else if ("toCall" == o) {
            if (!e || "暂未填写" == e) return !1;
            wx.makePhoneCall({
                phoneNumber: e,
                success: function(a) {
                    app.globalData.to_uid != wx.getStorageSync("userid") && t.toCopyRecord(type);
                }
            });
        } else if ("toCompanyMap" == o) {
            console.log("toCompanyMap");
            var i = a.currentTarget.dataset.latitude, n = a.currentTarget.dataset.longitude;
            wx.openLocation({
                latitude: parseFloat(i),
                longitude: parseFloat(n),
                name: e,
                scale: 28,
                success: function(a) {}
            });
        }
    },
    formSubmit: function(a) {
        var t = a.detail.formId, o = (a.detail.target.dataset.index, a.detail.target.dataset.status);
        this.toSaveFormIds(t), "toHome" == o && (console.log("回到首页"), wx.reLaunch({
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