var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), getAppGlobalData = require("../../templates/copyright/copyright.js");

Page({
    data: {
        staffInfo: {},
        StaffCard: {},
        globalData: {},
        cardIndexData: {},
        notRead: "",
        noticeNum: "",
        qrImg: ""
    },
    onLoad: function(a) {
        var t = this;
        app.util.showLoading(1), wx.hideShareMenu(), t.getStaffCard(), t.getCardIndexData(), 
        t.setData({
            uniacid: app.siteInfo.uniacid,
            globalData: app.globalData
        }), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {
        this.getFormIds(), this.getStaffInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(this, _index.baseModel, _xx_util2.default), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onPageScroll: function(a) {},
    onShareAppMessage: function(a) {
        var t = this, o = t.data.staffInfo;
        a.from;
        var e = t.data.cardIndexData.info.myCompany.name;
        return t.data.cardIndexData.info.myCompany.short_name && (e = t.data.cardIndexData.info.myCompany.short_name), 
        {
            title: "您好，我是" + (e = e + "的" + o.info.job + o.info.name) + "，请惠存。",
            path: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard",
            imageUrl: t.data.StaffCard.avatar,
            success: function(a) {
                console.log("转发成功", a), t.toShareRecord();
            },
            fail: function(a) {
                console.log("转发失败");
            }
        };
    },
    getFormIds: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/FormIds",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                a.data.errno || t.setData({
                    noticeNum: a.data.data.count
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getStaffInfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Staff",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                a.data.errno || t.setData({
                    staffInfo: a.data.data
                }, function() {
                    t.getStaffUnread();
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getStaffCard: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/StaffCard",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                a.data.errno || t.setData({
                    StaffCard: a.data.data.count
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getStaffUnread: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Unread",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                a.data.errno || t.setData({
                    notRead: a.data.data.count
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getCardIndexData: function() {
        var r = this;
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
                    var t = a.data.data, o = t.info.myCompany.addr, e = "";
                    23 < o.length && (e = "..."), t.info.myCompany.addrMore = o.slice(0, 23) + e;
                    var n = {
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
                    r.setData({
                        cardIndexData: t,
                        tmpShareData: n
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toJump: function(a) {
        var t = a.currentTarget.dataset.status;
        "toCopyright" != t && "toPoster" != t || app.util.goUrl(a), "toEdit" == t ? (console.log("编辑个人信息"), 
        wx.navigateTo({
            url: "/longbing_card/staff/mine/editInfo/editInfo"
        })) : "toChat" == t ? (console.log("私信我的"), wx.switchTab({
            url: "/longbing_card/staff/message/message"
        })) : "toCourse" == t ? console.log("使用教程") : "toOpinion" == t && console.log("意见反馈");
    },
    formSubmit: function(a) {
        var t = a.detail.formId, o = a.detail.target.dataset.status;
        this.toSaveFormIds(t), "toCardIndex" == o ? (console.log("名片预览"), wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"
        })) : "toPoster" == o || "toAddPage" == o ? (console.log("励志海报 || 发布动态 || 我的商品"), 
        app.util.goUrl(a, !0)) : "toEwm" == o ? (console.log("名片码"), wx.navigateTo({
            url: "/longbing_card/pages/card/share/share"
        })) : "toCode" == o ? (console.log("自定义码"), wx.navigateTo({
            url: "/longbing_card/staff/spread/news/news?status=code"
        })) : "toHome" == o ? (console.log("返回首页"), wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"
        })) : "toAddNotice" == o ? console.log("添加通知数量") : "toNotice" == o && (console.log("跳转到绑定通知", app.globalData.userid), 
        console.log(a.detail.target.dataset.url), app.util.goUrl(a, !0));
    },
    toSaveFormIds: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {
                formId: a
            },
            success: function(a) {
                a.data.errno || t.getFormIds();
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    }
});