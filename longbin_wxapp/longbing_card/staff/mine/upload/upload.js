var _weCropper = require("../../../templates/we-cropper/we-cropper.js"), _weCropper2 = _interopRequireDefault(_weCropper);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp(), device = wx.getSystemInfoSync(), width = device.windowWidth, height = device.windowHeight - 50;

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: width,
            height: height,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (width - width) / 2,
                y: (height - width) / 2,
                width: width,
                height: width
            }
        }
    },
    touchStart: function(e) {
        this.wecropper.touchStart(e);
    },
    touchMove: function(e) {
        this.wecropper.touchMove(e);
    },
    touchEnd: function(e) {
        this.wecropper.touchEnd(e);
    },
    getCropperImage: function() {
        var o = this;
        this.wecropper.getCropperImage(function(e) {
            e ? (console.log("获取到裁剪后的图片", e, o.data.uploadUrl), app.util.showLoading(3), o.toUploadImgs(e)) : (console.log("获取图片失败，请稍后重试"), 
            wx.showToast({
                icon: "none",
                title: "图片上传失败，请稍后重试！",
                duration: 2e3
            }));
        });
    },
    toUploadImgs: function(e) {
        var c = this;
        wx.uploadFile({
            url: this.data.uploadUrl,
            filePath: e,
            name: "upfile",
            formData: {},
            success: function(e) {
                console.log(e, "******/////////////////////res");
                var o = JSON.parse(e.data), t = o.data.path, a = o.data.img, r = c.data.cardType, n = c.data.paramstatus;
                wx.hideLoading(), wx.redirectTo({
                    url: "/longbing_card/staff/mine/editInfo/editInfo?avatar=" + t + "&avatarImg=" + a + "&cardtype=" + r + "&status=" + n
                });
            },
            fail: function(e) {
                wx.hideLoading(), console.log("获取图片失败，请稍后重试"), wx.showModal({
                    title: "",
                    content: "图片上传失败，请稍后重试",
                    confirmText: "重新上传",
                    cancelText: "重新选择",
                    success: function(e) {
                        if (e.confirm) {
                            var o = c.data.cropperOpt.src;
                            c.toUploadImgs(o);
                        } else e.cancel && (console.log("wx.chooseImage ==>"), c.uploadTap());
                    }
                });
            }
        });
    },
    uploadTap: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var o = e.tempFilePaths[0];
                t.wecropper.pushOrign(o);
            },
            fail: function(e) {
                console.log("wx.chooseImage fail==>", e), wx.showModal({
                    title: "",
                    content: "获取图片失败，请稍后重试",
                    confirmText: "知道啦",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm || e.cancel;
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        app.util.showLoading(1);
        var o = this.data.cropperOpt;
        e.src && (o.src = e.src, new _weCropper2.default(o).on("ready", function(e) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(e) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", e);
        }).on("imageLoad", function(e) {
            console.log("picture loaded"), console.log("current canvas context:", e);
        }).on("beforeDraw", function(e, o) {
            console.log("before canvas draw,i can do something"), console.log("current canvas context:", e);
        }).updateCanvas());
        var t = app.util.url("entry/wxapp/upload"), a = getCurrentPages();
        a.length && (a = a[getCurrentPages().length - 1]) && a.__route__ && (t = t + "&m=" + a.__route__.split("/")[0]), 
        this.setData({
            uploadUrl: t,
            cardType: e.cardtype,
            paramstatus: e.paramstatus,
            globalData: app.globalData
        }), wx.hideLoading();
    }
});