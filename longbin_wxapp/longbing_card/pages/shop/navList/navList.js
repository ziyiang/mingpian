var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        globalData: {},
        activeIndex: 0,
        showMoreStatus: 0,
        shopTypes: {}
    },
    onLoad: function(t) {
        var e = this;
        wx.hideShareMenu(), _xx_util2.default.showLoading(), e.setData({
            to_uid: t.to_uid,
            globalData: app.globalData
        }, function() {
            e.getShopTypes();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getShopTypes();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getShopTypes: function() {
        var o = this;
        _xx_util2.default.showLoading();
        var t = {
            type: o.data.currentIndex,
            to_uid: o.data.to_uid
        };
        _index.userModel.getShopTypes(t).then(function(t) {
            _xx_util2.default.hideAll(), console.log(t.data);
            var e = t.data.shop_type;
            o.setData({
                shop_type: e
            });
        });
    },
    scroll: function(t) {
        this.setData({
            toRightView: "scrollRight1"
        });
    },
    toTabClickJump: function(t) {
        console.log("toTabClickJump ==>"), this.setData({
            toRightView: "scrollRight" + t
        });
    },
    toJump: function(t) {
        var e = this, o = t.currentTarget.dataset.status, a = t.currentTarget.dataset.type, i = (t.currentTarget.dataset.id, 
        t.currentTarget.dataset.index), n = t.currentTarget.dataset.categoryid, r = e.data.shop_type;
        if ("toCopyright" == o && app.util.goUrl(t), "toShowMore" == o) {
            var s = e.data.showMoreStatus;
            0 == a ? (console.log("显示更多"), s = 1) : 1 == a && (console.log("隐藏显示更多"), s = 0), 
            e.setData({
                showMoreStatus: s
            });
        } else if ("toSearch" == o || "toMore" == o || "toNavProduct" == o) {
            if (console.log("搜索 || 查看更多 || 产品分类"), "toMore" == o || "toNavProduct" == o) {
                console.log("查看更多 || 产品分类");
                var u = r[i];
                wx.setStorageSync("navTypes", u);
            }
            app.util.goUrl(t);
        } else "toTabClick" == o && (console.log("类别选择"), e.setData({
            activeIndex: i,
            toLeftView: "scrollLeft" + n
        }), e.toTabClickJump(n));
    }
});