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
        var a = app.globalData.isIphoneX, r = 30 * parseInt(o.post_user.name.length + 2), n = 20 * parseInt(o.post_user.job_name.length + 2) + "rpx";
        wx.hideShareMenu();
        var p = {
            width: "641rpx",
            height: "1066rpx",
            background: "#ffffff",
            views: [ {
                type: "image",
                url: o.currentPoster,
                css: {
                    top: "0rpx",
                    left: "0rpx",
                    width: "641rpx",
                    height: "855rpx",
                    rotate: 0,
                    borderRadius: 0
                }
            }, {
                type: "rect",
                css: {
                    top: "855rpx",
                    left: "0rpx",
                    color: "#ffffff",
                    borderRadius: 0,
                    borderWidth: 0,
                    width: "641rpx",
                    height: "214rpx"
                }
            }, {
                type: "image",
                url: o.post_user.avatar,
                css: {
                    top: "905rpx",
                    left: "45rpx",
                    width: "85rpx",
                    height: "85rpx",
                    rotate: 0,
                    borderRadius: "5rpx"
                }
            }, {
                type: "text",
                text: o.post_user.name,
                css: {
                    fontSize: "29rpx",
                    top: "915rpx",
                    left: "150rpx",
                    color: "#222222",
                    textDecoration: "none",
                    align: "left",
                    width: r + "rpx"
                }
            }, {
                type: "text",
                text: o.post_user.job_name,
                css: {
                    fontSize: "20rpx",
                    top: "925rpx",
                    left: r + 100 + "rpx",
                    color: "#676767",
                    textDecoration: "none",
                    align: "left",
                    width: n
                }
            }, {
                type: "text",
                text: o.post_company.name,
                css: {
                    fontSize: "20rpx",
                    top: "957rpx",
                    left: "150rpx",
                    color: "#676767",
                    textDecoration: "none",
                    align: "left",
                    width: "300rpx"
                }
            }, {
                type: "text",
                text: "Tel " + o.post_user.phone,
                css: {
                    fontSize: "20rpx",
                    top: "1011rpx",
                    left: "45rpx",
                    color: "#676767",
                    textDecoration: "none",
                    align: "left",
                    width: "330rpx"
                }
            }, {
                type: "image",
                url: o.post_user.qr_path,
                css: {
                    top: "891rpx",
                    left: "470rpx",
                    width: "112rpx",
                    height: "112rpx",
                    rotate: 0,
                    borderRadius: "0rpx"
                }
            }, {
                type: "text",
                text: "长按识别 访问名片",
                css: {
                    fontSize: "20rpx",
                    top: "1016rpx",
                    left: "441rpx",
                    color: "#323232",
                    textDecoration: "none",
                    align: "left",
                    width: "200rpx"
                }
            } ]
        };
        this.setData({
            template: p,
            isIphoneX: a
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
    changeImage: function() {
        wx.navigateBack();
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