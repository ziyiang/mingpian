var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    imagePath: "",
    data: {
        template: {}
    },
    onLoad: function(t) {
        var e, o = this;
        wx.hideShareMenu(), setTimeout(function() {
            app.util.showLoading(4);
        }, 300), getApp().getConfigInfo().then(function() {
            o.setData({
                globalData: app.globalData
            }, function() {
                20 < (e = o.data.globalData.configInfo.my_company.name).length && o.data.globalData.configInfo.my_company.short_name && (e = o.data.globalData.configInfo.my_company.short_name);
            });
        });
        var r = getCurrentPages(), n = r[r.length - 2].__viewData__;
        console.log("prevPage", n);
        var a = n.shareParamObj;
        18 < a.name.length && (a.name = a.name.substr(0, 18) + "...");
        var p = n.shareParamObj2, i = 22 * parseInt(p.price.length), l = 22 * parseInt(p.people.length), x = i + "rpx", s = parseInt(i + 45) + "rpx", c = parseInt(l + 70) + "rpx", f = app.globalData.isIphoneX;
        wx.hideShareMenu(), setTimeout(function() {
            var t = {
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
                    text: e,
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
                    text: p.price,
                    css: {
                        fontSize: "36rpx",
                        top: "120rpx",
                        left: "48rpx",
                        color: "#e93636",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: x
                    }
                }, {
                    type: "text",
                    text: p.people + "人拼团",
                    css: {
                        fontSize: "24rpx",
                        top: "130rpx",
                        left: s,
                        color: "#e93636",
                        bold: "bold",
                        textDecoration: "none",
                        align: "left",
                        width: c
                    }
                }, {
                    type: "text",
                    text: "已拼" + a.collage_count + "件",
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
                        left: "2rpx",
                        color: "#ffffff",
                        borderRadius: "5rpx",
                        width: "612rpx",
                        height: "200rpx"
                    }
                }, {
                    type: "image",
                    url: a.qr,
                    css: {
                        top: "808rpx",
                        left: "78rpx",
                        width: "158rpx",
                        height: "158rpx",
                        rotate: 0,
                        borderRadius: 0
                    }
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
                    text: "超值好货一起拼",
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
            o.setData({
                template: t,
                isIphoneX: f
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
                console.log("保存拼团海报成功 ==>", t);
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    }
});