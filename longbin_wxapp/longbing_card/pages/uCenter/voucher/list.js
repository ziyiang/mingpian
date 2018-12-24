var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        tabList: [ "待使用", "待使用", "待使用" ],
        currentIndex: 0,
        refresh: !1,
        loading: !0
    },
    onLoad: function(t) {
        var e = this;
        wx.hideShareMenu(), e.setData({
            "paramType.to_uid": app.globalData.to_uid,
            "paramType.user_info": 1,
            globalData: app.globalData
        }, function() {
            e.getPosterType();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            refresh: !0,
            "paramType.user_info": 1
        }, function() {
            wx.showNavigationBarLoading(), t.getPosterType();
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getPosterType: function() {
        var n = this, t = n.data, e = t.refresh, a = t.paramType, s = n.data.paramType.user_info;
        e || _xx_util2.default.showLoading(), _index.userModel.getPosterType(a).then(function(t) {
            _xx_util2.default.hideAll(), console.log(t.data);
            var e = t.data.post_img;
            if (1 == s) {
                var a = t.data, o = a.post_type_list, r = a.post_user, i = a.post_company;
                n.setData({
                    post_type_list: o,
                    post_user: r,
                    post_company: i
                });
            }
            n.setData({
                post_img: e,
                userinfo: 0,
                refresh: !1,
                loading: !1
            });
        });
    },
    toJump: function(t) {
        var e = this, a = t.currentTarget.dataset.status, o = t.currentTarget.dataset.index, r = t.currentTarget.dataset.categoryid;
        if ("toTabClickMore" == a || "toTabClick" == a) {
            var i = o;
            "toTabClickMore" == a && (i = "100000101"), e.setData({
                activeIndex: i,
                categoryid: r,
                scrollNav: "scrollNav" + r,
                post_img: [],
                "paramType.type": r,
                "paramType.user_info": 0,
                refresh: !1
            }), e.getPosterType();
        } else "toShare" == a && e.setData({
            currentPoster: o
        }, function() {
            _xx_util2.default.goUrl(t);
        });
    },
    formSubmit: function(t) {
        var e = t.detail.formId, a = (t.detail.target.dataset.index, t.detail.target.dataset.status);
        this.toSaveFormIds(e), console.log("toJump ==> ", a), app.util.goUrl(t, !0);
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