var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var e = 0, t = Array(a.length); e < a.length; e++) t[e] = a[e];
        return t;
    }
    return Array.from(a);
}

function _defineProperty(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var app = getApp();

Page({
    data: {
        globalData: {},
        paramShop: {
            page: 1,
            type_id: 0
        },
        refreshShop: !1,
        loadingShop: !0,
        shop_all: {
            page: 1,
            total_page: "",
            list: []
        },
        showMoreStatus: ""
    },
    onLoad: function(a) {
        var e = this;
        wx.hideShareMenu(), _xx_util2.default.showLoading();
        var t = {}, o = e.data.paramShop, r = wx.getStorageSync("navTypes");
        if (a.keyword && (t.keyword = a.keyword), a.all_categoryid && (t.all_categoryid = a.all_categoryid), 
        "all" == a.status) t.categoryid = a.all_categoryid, o.type_id = a.all_categoryid, 
        t.activeIndex = "100000101"; else if ("nav" == a.status) for (var i in t.categoryid = a.id, 
        o.type_id = a.id, r.sec) a.id == r.sec[i].id && (t.activeIndex = i);
        r && (t.navTypes = r), e.setData({
            tmpData: t,
            paramShop: o,
            globalData: app.globalData,
            scrollNav: "scrollNav" + t.categoryid
        }), e.data.tmpData.keyword ? e.getShopSearch() : e.getShopList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        wx.removeStorageSync("navTypes");
    },
    onUnload: function() {
        wx.removeStorageSync("navTypes");
    },
    onPullDownRefresh: function() {
        var a, e = this;
        e.setData((_defineProperty(a = {
            refreshShop: !0,
            "paramShop.page": 1
        }, "refreshShop", !1), _defineProperty(a, "loadingShop", !0), a), function() {
            wx.showNavigationBarLoading(), e.getShopList();
        });
    },
    onReachBottom: function() {
        var a = this;
        a.setData({
            refreshShop: !1
        });
        var e = a.data.loadingShop, t = a.data.shop_all, o = t.page;
        o == t.total_page || e || (a.setData({
            "paramShop.page": parseInt(o) + 1,
            refreshShop: !0,
            loadingShop: !0
        }), a.getShopList());
    },
    onShareAppMessage: function() {},
    onPageScroll: function(a) {},
    getShopSearch: function() {
        var t = this, a = {
            keyword: t.data.tmpData.keyword
        };
        _index.userModel.getShopSearch(a).then(function(a) {
            _xx_util2.default.hideAll(), console.log(a.data);
            var e = {
                page: 1,
                total_page: 1,
                list: a.data
            };
            t.setData({
                shop_all: e,
                loadingShop: !1,
                refreshShop: !1
            });
        });
    },
    getShopList: function() {
        var o = this, a = o.data, r = a.refreshShop, e = a.paramShop, i = a.shop_all;
        r && _xx_util2.default.showLoading(), _index.userModel.getShopList(e).then(function(a) {
            var e = i, t = a.data;
            r || (t.list = [].concat(_toConsumableArray(e.list), _toConsumableArray(t.list))), 
            o.setData({
                shop_all: t,
                loadingShop: !1,
                refreshShop: !1
            });
        });
    },
    toJump: function(a) {
        var e = this, t = a.currentTarget.dataset.status, o = a.currentTarget.dataset.type, r = (a.currentTarget.dataset.id, 
        a.currentTarget.dataset.index), i = a.currentTarget.dataset.categoryid;
        if ("toCopyright" == t && app.util.goUrl(a), "toShowMore" == t) {
            var n = e.data.showMoreStatus;
            0 == o ? (console.log("显示更多"), n = 1) : 1 == o && (console.log("隐藏显示更多"), n = 0), 
            e.setData({
                showMoreStatus: n
            });
        } else if ("toTabClickMore" == t || "toTabClick" == t) {
            console.log("全部 || 类别选择", r);
            var l = r, s = i = a.currentTarget.dataset.categoryid;
            "toTabClickMore" == t && (l = "100000101", s = "All"), e.setData({
                "tmpData.activeIndex": l,
                "tmpData.categoryid": i,
                scrollNav: "scrollNav" + s,
                shop_all: [],
                "paramShop.page": 1,
                "paramShop.type_id": i,
                refreshShop: !0
            }), e.getShopList();
        } else "toShopDetail" == t && (console.log("商品详情"), app.util.goUrl(a));
    }
});