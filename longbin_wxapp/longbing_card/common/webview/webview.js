var app = getApp();

Page({
    data: {
        src: ""
    },
    onLoad: function(n) {
        wx.hideShareMenu();
        var o = decodeURIComponent(n.url);
        this.setData({
            src: o,
            globalData: app.globalData
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});