var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), getAppGlobalData = require("../../templates/copyright/copyright.js");

Page({
    data: {
        globalData: {},
        page: 1,
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1,
        authStatus: !0,
        messageTime: "",
        staffInfo: [],
        messageList: []
    },
    onLoad: function(a) {
        console.log(a, "11111111111");
    },
    onReady: function() {},
    onShow: function() {
        app.util.showLoading(1);
        var a = this, t = {
            to_uid: wx.getStorageSync("userid")
        };
        console.log(t, "paramObj"), _index.baseModel.getClientUnread(t).then(function(a) {
            var t = a.data.count.staff_count;
            app.globalData.badgeNum = t, getApp().setMsgBadge(app.globalData.badgeNum);
        }), wx.hideShareMenu();
        var e = new app.util.date().dateToLong(new Date());
        a.setData({
            messageTime: (e / 1e3).toFixed(0),
            globalData: app.globalData,
            onPullDownRefresh: !0
        }), a.getStaffInfo(), a.getMessageList(), wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        app.util.showLoading(1), getAppGlobalData.getAppGlobalData(a, _index.baseModel, _xx_util2.default), 
        a.getMessageList(), a.setData({
            onPullDownRefresh: !0
        }), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideLoading();
        }, 1e3);
    },
    onReachBottom: function() {},
    onPageScroll: function(a) {},
    onShareAppMessage: function(a) {},
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
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getMessageList: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/chat",
            cachetime: "30",
            method: "POST",
            data: {
                page: i.data.page
            },
            success: function(a) {
                if (console.log("entry/wxapp/chat ==>", a), !a.data.errno) {
                    var t = a.data.data.list;
                    if (0 == t.length) return i.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    var e = i.data.messageList;
                    for (var o in 1 == i.data.onPullDownRefresh && (e = []), t) {
                        var n = new app.util.date();
                        t[o].last_time.length < 12 && (t[o].last_time = n.dateToStr("yyyy/MM/DD HH:mm:ss", n.longToDate(1e3 * t[o].last_time))), 
                        e.push(t[o]);
                    }
                    i.setData({
                        messageList: e,
                        onPullDownRefresh: !1,
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
        var t = a.currentTarget.dataset.status, e = a.currentTarget.dataset.index, o = this.data.messageList;
        "toCopyright" == t && (console.log("to **********//"), app.util.goUrl(a));
        var n = o[e].user_id;
        if (n == wx.getStorageSync("userid") && (n = o[e].target_id), "toUserInfo" == t) console.log("跳转至客户详情"), 
        wx.navigateTo({
            url: "/longbing_card/staff/custom/detail/detail?id=" + n
        }); else if ("toChat" == t) {
            console.log("打开会话", o[e].id), console.log(n, "messge页面传递的chat_to_uid");
            var i = o[e].user.nickName;
            i || (i = "新客户");
            var s = o[e].user.avatarUrl;
            s || (s = app.globalData.defaultUserImg);
            var r = o[e].phone;
            wx.navigateTo({
                url: "/longbing_card/chat/staffChat/staffChat?chat_to_uid=" + n + "&contactUserName=" + i + "&chatid=" + o[e].id + "&chatAvatarUrl=" + this.data.staffInfo.avatarUrl + "&toChatAvatarUrl=" + s + "&clientPhone=" + r
            });
        }
    },
    formSubmit: function(a) {
        var t = a.detail.formId, e = a.detail.target.dataset.status;
        this.toSaveFormIds(t), "toHome" == e && (console.log("返回首页"), wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"
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