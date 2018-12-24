var app = getApp();

Page({
    data: {
        dataList: [],
        globalData: {},
        status: "",
        currentIndex: 0,
        imgCountNum: 9,
        tempFilePaths: [],
        tempFileImgs: []
    },
    onLoad: function(t) {
        app.util.showLoading(1), wx.hideShareMenu(), console.log(t, "//////////***************"), 
        t.status && (this.setData({
            status: t.status
        }), "news" == t.status ? wx.setNavigationBarTitle({
            title: "动态发布"
        }) : "code" == t.status ? wx.setNavigationBarTitle({
            title: "自定义码"
        }) : "group" == t.status && wx.setNavigationBarTitle({
            title: "群成员数(人)"
        }));
        var e = {};
        t.opengid && (e.opengid = t.opengid), t.number && (e.groupNumber = t.number), this.setData({
            paramData: e,
            globalData: app.globalData
        }), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();
    },
    onReachBottom: function() {},
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {},
    chooseImage: function(t) {
        var e = this;
        wx.showActionSheet({
            itemList: [ "优雅自拍", "相册收藏" ],
            itemColor: "#3675f1",
            success: function(t) {
                t.cancel || (0 == t.tapIndex ? e.chooseWxImageShop("camera") : 1 == t.tapIndex && e.chooseWxImageShop("album"));
            }
        });
    },
    chooseWxImageShop: function(t) {
        var n = this, i = n.data.tempFilePaths, s = n.data.tempFileImgs;
        wx.chooseImage({
            count: n.data.imgCountNum,
            sizeType: [ "original", "compressed" ],
            sourceType: [ t ],
            success: function(t) {
                for (var e in console.log(t, "===========================  res****"), t.tempFilePaths) {
                    app.util.showLoading(3);
                    var a = app.util.url("entry/wxapp/upload"), o = getCurrentPages();
                    o.length && (o = o[getCurrentPages().length - 1]) && o.__route__ && (a = a + "&m=" + o.__route__.split("/")[0]), 
                    console.log(t.tempFilePaths[e], "res.tempFilePaths[i]"), wx.uploadFile({
                        url: a,
                        filePath: t.tempFilePaths[e],
                        name: "upfile",
                        formData: {},
                        success: function(t) {
                            console.log(t, "*********uploadFile res");
                            var e = JSON.parse(t.data);
                            i.push(e.data.path), s.push(e.data.img), wx.hideLoading(), n.setData({
                                tempFilePaths: i,
                                tempFileImgs: s,
                                imgCountNum: 9 - i.length
                            });
                        }
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toAddNews: function(t, e) {
        app.util.showLoading(1);
        var a = this.data.tempFileImgs, o = "";
        for (var n in a) o += a[n] + ",";
        o = o.slice(0, -1), app.util.request({
            url: "entry/wxapp/releaseTimeline",
            cachetime: "30",
            method: "POST",
            data: {
                title: t,
                content: e,
                cover: o
            },
            success: function(t) {
                t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "动态发布成功！",
                    duration: 1500
                }), setTimeout(function() {
                    wx.hideLoading(), wx.navigateBack();
                }, 1500));
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    toReleaseQr: function(t, e) {
        app.util.showLoading(1), app.util.request({
            url: "entry/wxapp/releaseQr",
            cachetime: "30",
            method: "POST",
            data: {
                title: t,
                content: e
            },
            success: function(t) {
                t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "自定义码发布成功！",
                    duration: 1500
                }), setTimeout(function() {
                    wx.hideLoading(), wx.navigateBack();
                }, 1500));
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getSetGroupNumber: function(t) {
        var e = this;
        app.util.showLoading(1), app.util.request({
            url: "entry/wxapp/SetGroupNumber",
            cachetime: "30",
            method: "POST",
            data: {
                number: t,
                openGId: e.data.paramData.opengid
            },
            success: function(t) {
                console.log("entry/wxapp/SetGroupNumber ==>", t), t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "已成功设置群成员数！",
                    duration: 1500
                }), setTimeout(function() {
                    wx.hideLoading(), wx.navigateBack();
                }, 1500));
            },
            fail: function(t) {
                console.log("fail ==> ", t), e.setData({
                    showAddUseSec: !1
                });
            }
        });
    },
    toJump: function(t) {
        var e = t.currentTarget.dataset.status, a = t.currentTarget.dataset.index;
        if ("toCopyright" == e && app.util.goUrl(t), "toDeleteImg" == e) {
            console.log("删除图片");
            var o = this.data.tempFilePaths, n = this.data.tempFileImgs;
            n.splice(a, 1), o.splice(a, 1), this.setData({
                tempFilePaths: o,
                tempFileImgs: n,
                imgCountNum: 9 - o.length
            });
        }
    },
    formSubmit: function(t) {
        var e = this;
        console.log(t, "eeeeeeee///////////");
        var a = t.detail.formId, o = t.detail.target.dataset.status, n = t.detail.value.title, i = t.detail.value.number, s = t.detail.value.content;
        if (e.toSaveFormIds(a), "toAddNews" == o) if (console.log("确定发布"), "news" == e.data.status) {
            if (console.log("新建动态"), !n) return wx.showToast({
                icon: "none",
                title: "请填写名称！",
                duration: 1500
            }), !1;
            if (!s) {
                var l = "";
                return "news" == e.data.status ? l = "请填写动态信息！" : "code" == e.data.status && (l = "请填写自定义码信息！"), 
                wx.showToast({
                    icon: "none",
                    title: l,
                    duration: 1500
                }), !1;
            }
            e.toAddNews(n, s);
        } else if ("code" == e.data.status) {
            if (console.log("自定义码"), !n) return wx.showModal({
                title: "",
                content: "请填写自定义码标题！",
                showCancel: !1,
                success: function(t) {
                    t.confirm;
                }
            }), !1;
            e.toReleaseQr(n, s);
        } else if ("group" == e.data.status) {
            if (console.log("群成员数"), !i) return wx.showToast({
                icon: "none",
                title: "请填写群成员数！",
                duration: 1500
            }), !1;
            e.getSetGroupNumber(i);
        }
    },
    toSaveFormIds: function(t) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {
                formId: t
            },
            success: function(t) {
                t.data.errno;
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    }
});