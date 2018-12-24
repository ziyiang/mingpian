function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var app = getApp();

Page({
    imagePath: "",
    data: {
        template: {},
        shareData: {},
        qrImg: ""
    },
    onLoad: function(t) {
        var o, r = this;
        wx.hideShareMenu(), setTimeout(function() {
            app.util.showLoading(4);
        }, 300), getApp().getConfigInfo().then(function() {
            r.setData({
                globalData: app.globalData
            }, function() {
                20 < (o = r.data.globalData.configInfo.my_company.name).length && r.data.globalData.configInfo.my_company.short_name && (o = r.data.globalData.configInfo.my_company.short_name);
            });
        });
        var e = getCurrentPages(), n = e[e.length - 2].__viewData__;
        console.log("prevPage", n);
        var a = n.shareParamObj;
        18 < a.name.length && (a.name = a.name.substr(0, 18) + "...");
        var i = app.globalData.isIphoneX;
        wx.hideShareMenu(), setTimeout(function() {
            var t, e = {
                width: "612rpx",
                height: "987rpx",
                background: "#e1e1e1",
                views: [ {
                    type: "image",
                    url: "/longbing_card/resource/images/icon-productBg.png",
                    css: {
                        top: "0rpx",
                        left: "0rpx",
                        width: "612rpx",
                        height: "82rpx",
                        rotate: 0,
                        borderRadius: 0
                    }
                }, {
                    type: "text",
                    text: o,
                    css: {
                        fontSize: "28rpx",
                        top: "10rpx",
                        left: "306rpx",
                        color: "#ffffff",
                        bold: "bold",
                        textDecoration: "none",
                        align: "center",
                        width: "572rpx"
                    }
                }, {
                    type: "rect",
                    css: {
                        top: "82rpx",
                        left: "0rpx",
                        color: "#ffffff",
                        borderRadius: "0rpx",
                        width: "612rpx",
                        height: "97rpx"
                    }
                }, {
                    type: "text",
                    text: a.name,
                    css: {
                        fontSize: "30rpx",
                        top: "78rpx",
                        left: "20rpx",
                        color: "#313131",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: "572rpx"
                    }
                }, {
                    type: "text",
                    text: "￥",
                    css: {
                        fontSize: "24rpx",
                        top: "130rpx",
                        left: "20rpx",
                        color: "#e93636",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: "20rpx"
                    }
                }, {
                    type: "text",
                    text: a.price,
                    css: {
                        fontSize: "36rpx",
                        top: "120rpx",
                        left: "50rpx",
                        color: "#e93636",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: "266rpx"
                    }
                }, {
                    type: "text",
                    text: "已拼" + a.sale_count + "件",
                    css: {
                        fontSize: "24rpx",
                        top: "130rpx",
                        right: "20rpx",
                        color: "#313131",
                        bold: "bold",
                        textDecoration: "none",
                        align: "right",
                        width: "680rpx"
                    }
                }, {
                    type: "image",
                    url: a.cover2,
                    css: {
                        top: "187rpx",
                        left: "9rpx",
                        width: "594rpx",
                        height: "594rpx",
                        rotate: 0,
                        borderRadius: 0
                    }
                }, {
                    type: "rect",
                    css: {
                        top: "786rpx",
                        left: "0rpx",
                        color: "#ffffff",
                        borderRadius: "0rpx",
                        width: "612rpx",
                        height: "200rpx"
                    }
                }, {
                    type: "image",
                    url: a.qr,
                    css: (t = {
                        top: "808rpx"
                    }, _defineProperty(t, "top", "808rpx"), _defineProperty(t, "left", "78rpx"), _defineProperty(t, "width", "158rpx"), 
                    _defineProperty(t, "height", "158rpx"), _defineProperty(t, "rotate", 0), _defineProperty(t, "borderRadius", 0), 
                    t)
                }, {
                    type: "text",
                    text: "长按识别小程序码",
                    css: {
                        fontSize: "30rpx",
                        top: "850rpx",
                        left: "300rpx",
                        color: "#313131",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: "300rpx"
                    }
                }, {
                    type: "text",
                    text: "超值好货一起购",
                    css: {
                        fontSize: "24rpx",
                        top: "900rpx",
                        left: "300rpx",
                        color: "#313131",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: "300rpx"
                    }
                } ]
            };
            r.setData({
                template: e,
                isIphoneX: i
            });
        }, 3e3);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {},
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
                console.log("保存商品海报成功 ==>", t);
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    }
});