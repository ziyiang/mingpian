var app = getApp();

Page({
    data: {
        globalData: {},
        activeIndex: 100000101,
        showMoreStatus: 0,
        keyword: ""
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.setData({
            globalData: app.globalData
        });
    },
    onReady: function() {},
    onShow: function() {
        app.util.showLoading(1), this.getShopSearchRecord(), wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getShopSearchRecord();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getShopSearchRecord: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/ShopSearchRecord",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                console.log("entry/wxapp/ShopSearchRecord ==>", t), t.data.errno || o.setData({
                    Record: t.data.data
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/ShopSearchRecord ==> fail ==> ", t);
            }
        });
    },
    bindinput: function(t) {
        this.setData({
            keyword: t.detail.value
        });
    },
    toSearchBtn: function() {
        if (!this.data.keyword) return wx.showToast({
            icon: "none",
            title: "请输入关键词！",
            duration: 2e3
        }), !1;
        wx.navigateTo({
            url: "/longbing_card/pages/shop/list/list?keyword=" + this.data.keyword
        });
    },
    toJump: function(t) {
        var o = t.currentTarget.dataset.status;
        if ("toSearchKeyWord" == o) {
            if (!this.data.keyword) return wx.showToast({
                icon: "none",
                title: "请输入关键词！",
                duration: 2e3
            }), !1;
            app.util.goUrl(t);
        } else "toSearch" == o && app.util.goUrl(t);
    }
});