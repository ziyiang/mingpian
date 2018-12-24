var app = getApp();

Page({
    imagePath: "",
    data: {
        template: {}
    },
    onLoad: function(t) {
        app.util.showLoading(4);
        var e = getCurrentPages(), o = e[e.length - 2].__viewData__;
        console.log("prevPage", o);
        var a = app.globalData.to_uid, r = app.globalData.isIphoneX;
        wx.hideShareMenu();
        var p = {
            width: "670rpx",
            height: "1070rpx",
            background: "#ffffff",
            views: [ {
                type: "image",
                url: o.tmpShareData.avatar,
                css: {
                    top: "0rpx",
                    left: "0rpx",
                    width: "668rpx",
                    height: "668rpx",
                    rotate: 0,
                    borderRadius: 0
                }
            }, {
                type: "image",
                url: "/longbing_card/resource/images/circle.png",
                css: {
                    top: "622rpx",
                    left: "211rpx",
                    width: "257rpx",
                    height: "57rpx",
                    rotate: 0,
                    borderRadius: 0
                }
            }, {
                type: "image",
                url: o.tmpShareData.logo,
                css: {
                    top: "630rpx",
                    left: "290rpx",
                    width: "100rpx",
                    height: "100rpx",
                    rotate: 0,
                    borderRadius: "100rpx"
                }
            }, {
                type: "text",
                text: o.tmpShareData.name,
                css: {
                    fontSize: "34rpx",
                    top: "755rpx",
                    left: "340rpx",
                    color: "#313131",
                    textDecoration: "none",
                    align: "center",
                    width: "670rpx"
                }
            }, {
                type: "text",
                text: o.tmpShareData.job_name,
                css: {
                    fontSize: "24rpx",
                    top: "800rpx",
                    left: "340rpx",
                    color: "#9a9a9a",
                    textDecoration: "none",
                    align: "center",
                    width: "670rpx"
                }
            }, {
                type: "text",
                text: o.tmpShareData.companyName,
                css: {
                    fontSize: "24rpx",
                    top: "840rpx",
                    left: "340rpx",
                    color: "#9a9a9a",
                    textDecoration: "none",
                    align: "center",
                    width: "670rpx"
                }
            }, {
                type: "text",
                text: "手机",
                css: {
                    fontSize: "28rpx",
                    top: "900rpx",
                    left: "30rpx",
                    color: "#838591",
                    textDecoration: "none",
                    align: "left",
                    width: "100rpx"
                }
            }, {
                type: "text",
                text: o.tmpShareData.phone,
                css: {
                    fontSize: "28rpx",
                    top: "900rpx",
                    left: "100rpx",
                    color: "#343541",
                    textDecoration: "none",
                    align: "left",
                    width: "380rpx"
                }
            }, {
                type: "text",
                text: "微信",
                css: {
                    fontSize: "28rpx",
                    top: "940rpx",
                    left: "30rpx",
                    color: "#838591",
                    textDecoration: "none",
                    align: "left",
                    width: "100rpx"
                }
            }, {
                type: "text",
                text: o.tmpShareData.wechat,
                css: {
                    fontSize: "28rpx",
                    top: "940rpx",
                    left: "100rpx",
                    color: "#343541",
                    textDecoration: "none",
                    align: "left",
                    width: "380rpx"
                }
            }, {
                type: "text",
                text: "地址",
                css: {
                    fontSize: "28rpx",
                    top: "980rpx",
                    left: "30rpx",
                    color: "#838591",
                    textDecoration: "none",
                    align: "left",
                    width: "100rpx"
                }
            }, {
                type: "text",
                text: o.tmpShareData.addrMore,
                css: {
                    fontSize: "28rpx",
                    top: "980rpx",
                    left: "100rpx",
                    color: "#343541",
                    textDecoration: "none",
                    align: "left",
                    width: "350rpx"
                }
            }, {
                type: "image",
                url: o.tmpShareData.qrImg,
                css: {
                    top: "880rpx",
                    left: "470rpx",
                    width: "170rpx",
                    height: "170rpx",
                    rotate: 0,
                    borderRadius: 0
                }
            } ]
        };
        this.setData({
            template: p,
            to_uid: a,
            isIphoneX: r
        });
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
    toCopyRecord: function() {
        app.util.request({
            url: "entry/wxapp/copyRecord",
            cachetime: "30",
            method: "POST",
            data: {
                type: 10,
                to_uid: to_uid
            },
            success: function(t) {
                t.data.errno || wx.showToast({
                    icon: "none",
                    title: "名片保存成功，快去看看吧！",
                    duration: 2e3
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    saveImage: function() {
        var e = this;
        console.log("点击保存海报"), wx.saveImageToPhotosAlbum({
            filePath: e.data.imagePath,
            success: function(t) {
                console.log("保存名片成功 ==>", t), app.globalData.to_uid != wx.getStorageSync("userid") ? e.toCopyRecord() : app.globalData.to_uid == wx.getStorageSync("userid") && wx.showToast({
                    icon: "none",
                    title: "名片保存成功，快去看看吧！",
                    duration: 2e3
                });
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    }
});