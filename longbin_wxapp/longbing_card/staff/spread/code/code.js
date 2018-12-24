var app = getApp();

Page({
    imagePath: "",
    data: {
        id: "",
        template: {},
        name: "",
        avatar: "",
        qrImg: ""
    },
    onLoad: function(t) {
        console.log("onLoad ==>", this);
        wx.hideShareMenu(), app.util.showLoading(4);
        var e = t.id, a = t.name, o = t.avatar, n = app.globalData.isIphoneX, i = {
            tmpID: e,
            tmpName: a,
            tmpAvatar: o,
            isIphoneX: n
        };
        this.toGetQR(e, a, o, n), this.setData({
            tmp_shareParamObj: i
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();
        var t = this.data.tmp_shareParamObj, e = t.tmpID, a = t.tmpName, o = t.tmpAvatar, n = t.isIphoneX;
        this.toGetQR(e, a, o, n);
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {},
    toGetQR: function(t, n, i, r) {
        var p = this;
        app.util.request({
            url: "entry/wxapp/releaseQrDetailV2",
            cachetime: "30",
            hideLoading: !1,
            method: "POST",
            data: {
                id: t
            },
            success: function(t) {
                if (console.log("获取二维码 entry/wxapp/releaseQrDetail ==>", t), !t.data.errno) {
                    var e = t.data.data, a = "";
                    88 < e.content.length && (a = "..."), e.content = e.content.slice(0, 88) + a;
                    var o = {
                        width: "670rpx",
                        height: "840rpx",
                        background: "#ffffff",
                        borderRadius: "0rpx",
                        views: [ {
                            type: "rect",
                            css: {
                                top: "0rpx",
                                left: "0rpx",
                                color: "#faf8f5",
                                borderRadius: 0,
                                borderWidth: 0,
                                width: "670rpx",
                                height: "293rpx"
                            }
                        }, {
                            type: "image",
                            url: i,
                            css: {
                                top: "44rpx",
                                left: "22rpx",
                                width: "92rpx",
                                height: "92rpx",
                                rotate: 0,
                                borderRadius: "92rpx"
                            }
                        }, {
                            type: "text",
                            text: n,
                            css: {
                                fontSize: "30rpx",
                                top: "65rpx",
                                left: "130rpx",
                                color: "#2b2b2b",
                                textDecoration: "none",
                                align: "left",
                                width: "540rpx"
                            }
                        }, {
                            type: "text",
                            text: e.content,
                            css: {
                                fontSize: "28rpx",
                                top: "155rpx",
                                left: "26rpx",
                                color: "#333333",
                                textDecoration: "none",
                                align: "left",
                                width: "610rpx"
                            }
                        }, {
                            type: "image",
                            url: e.path,
                            css: {
                                top: "363rpx",
                                left: "142rpx",
                                width: "396rpx",
                                height: "396rpx",
                                rotate: 0,
                                borderRadius: 0
                            }
                        } ]
                    };
                    p.setData({
                        template: o,
                        isIphoneX: r
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    onImgOK: function(t) {
        this.setData({
            imagePath: t.detail.path
        }), wx.hideLoading(), console.log(t);
    },
    previewImage: function() {
        var t = this.data.imagePath, e = [];
        e.push(t), wx.previewImage({
            current: t,
            urls: e
        });
    },
    saveImage: function() {
        console.log("点击保存海报"), wx.saveImageToPhotosAlbum({
            filePath: this.data.imagePath,
            success: function(t) {
                console.log("保存自定义码成功 ==>", t), wx.showToast({
                    icon: "none",
                    title: "自定义码保存成功，快去看看吧！",
                    duration: 2e3
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    }
});