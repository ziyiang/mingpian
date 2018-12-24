var timerOverTime, app = getApp();

Page({
    data: {
        toWxPayStatus: 0
    },
    onLoad: function(t) {
        console.log(this);
        app.util.showLoading(1), wx.hideShareMenu();
        var a = {};
        t.id && (a.id = t.id), t.status && (a.status = t.status), this.setData({
            paramData: a,
            globalData: app.globalData
        }), this.getDetailData(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        clearInterval(timerOverTime);
    },
    onUnload: function() {
        clearInterval(timerOverTime);
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getDetailData();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getDetailData: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/shopmyorderdetail",
            cachetime: "30",
            method: "POST",
            data: {
                id: n.data.paramData.id
            },
            success: function(t) {
                if (console.log("entry/wxapp/shopmyorderdetail ==>", t), !t.data.errno) {
                    var a = t.data.data, e = new app.util.date();
                    if (a.create_time_2 = e.dateToStr("yyyy-MM-DD HH:mm:ss", e.longToDate(1e3 * a.create_time)), 
                    a.left_time) {
                        var o = a.left_time;
                        timerOverTime = setInterval(function() {
                            a.left_time = a.left_time - 1;
                            var t = parseInt(a.left_time / 24 / 60 / 60);
                            o = (t = 0 < t ? t + "天" : "") + e.dateToStr("HH小时mm分ss秒", e.longToDate(1e3 * a.left_time)), 
                            n.setData({
                                tmpOverTimes: o
                            });
                        }, 1e3);
                    }
                    n.setData({
                        detailData: a
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/shopmyorderdetail ==> fail ==> ", t);
            }
        });
    },
    checktoConsult: function(t) {
        var a, e = this.data.detailData.to_uid, o = this.data.detailData, n = [];
        for (var i in o.own && n.push(o.own), o.users && n.push(o.users), n) e == n[i].id && (a = n[i].nickName);
        0 == e ? wx.showModal({
            title: "",
            content: "不能与默认客服进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        }) : e == wx.getStorageSync("userid") ? wx.showModal({
            title: "",
            content: "不能和自己进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        }) : wx.navigateTo({
            url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + e + "&contactUserName=" + a + "&goods_id=" + t
        });
    },
    getShopcancelorder: function() {
        app.util.request({
            url: "entry/wxapp/shopcancelorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: this.data.paramData.id
            },
            success: function(t) {
                console.log("entry/wxapp/shopcancelorder ==>", t), t.data.errno || wx.showToast({
                    icon: "success",
                    title: "已成功取消订单!",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack();
                        }, 1e3);
                    }
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/shopcancelorder ==> fail ==> ", t);
            }
        });
    },
    getShopdelorder: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/shopdelorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: e.data.paramData.id
            },
            success: function(t) {
                if (console.log("entry/wxapp/shopdelorder ==>", t), !t.data.errno) {
                    var a = "已成功删除订单!";
                    1 == e.data.detailData.type && (a = "已成功删除拼团!"), wx.showToast({
                        icon: "success",
                        title: a,
                        duration: 2e3,
                        success: function() {
                            setTimeout(function() {
                                wx.redirectTo({
                                    url: "/longbing_card/pages/uCenter/order/orderList/orderList?currentTab=0"
                                });
                            }, 1e3);
                        }
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/shopdelorder ==> fail ==> ", t);
            }
        });
    },
    getShopendorder: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/shopendorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: a.data.paramData.id
            },
            success: function(t) {
                console.log("entry/wxapp/shopendorder ==>", t), t.data.errno || wx.showToast({
                    icon: "success",
                    title: "已成功确认收货!",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            a.setData({
                                "detailData.order_status": 3
                            });
                        }, 1e3);
                    }
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/shopendorder ==> fail ==> ", t);
            }
        });
    },
    getShopAddTrolley: function(t) {
        app.util.request({
            url: "entry/wxapp/ShopAddTrolley",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                console.log("entry/wxapp/ShopAddTrolley ==>", t), t.data.errno;
            },
            fail: function(t) {
                console.log("entry/wxapp/ShopAddTrolley ==>  fail ==> ", t);
            }
        });
    },
    getWxPay: function() {
        var a = this;
        app.util.showLoading(1);
        var e = a.data.detailData;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "30",
            method: "POST",
            data: {
                order_id: a.data.paramData.id
            },
            success: function(t) {
                console.log("entry/wxapp/Pay ==> fail ==>", t), t.data && t.data.data && !t.data.errno && (wx.hideLoading(), 
                wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: "MD5",
                    paySign: t.data.data.paySign,
                    success: function(t) {
                        wx.showToast({
                            icon: "success",
                            image: "/longbing_card/resource/images/alert.png",
                            title: "支付成功",
                            duration: 2e3,
                            success: function() {
                                e.pay_status = 1, a.setData({
                                    detailData: e
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            icon: "fail",
                            image: "/longbing_card/resource/images/error.png",
                            title: "支付失败",
                            duration: 2e3
                        });
                    },
                    complete: function(t) {
                        a.data.toWxPayStatus = 0;
                    }
                }));
            },
            fail: function(t) {
                console.log("entry/wxapp/Pay ==> fail ==>", t), wx.hideLoading(), wx.showModal({
                    title: "系统提示",
                    content: t.data.data.message ? "支付失败，" + t.data.data.message : "支付失败，请重试",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                });
            }
        });
    },
    toJump: function(t) {
        var a = this, e = t.currentTarget.dataset.status, o = (t.currentTarget.dataset.id, 
        a.data.detailData);
        if ("toProductDetail" == e || "toCopy" == e || "toCall" == e || "toMoreList" == e || "toCollage" == e) console.log("产品详情 || 复制 || 联系物流 || 更多商品 || 拼单详情"), 
        app.util.goUrl(t); else if ("toConsult" == e) console.log("联系客服"), a.checktoConsult(o.goods_info[0].id); else if ("toCancel" == e) console.log("取消订单"), 
        a.getShopcancelorder(); else if ("toWxPay" == e) {
            console.log("去支付"), 0 == a.data.toWxPayStatus && a.setData({
                toWxPayStatus: 1
            }, function() {
                a.getWxPay();
            });
        } else "toConfirm" == e ? (console.log("确认收货"), a.getShopendorder()) : "toDelete" == e ? (console.log("删除订单"), 
        a.getShopdelorder()) : "toAgain" == e && (0 == a.data.detailData.type ? console.log("再次购买 商品") : 1 == a.data.detailData.type && (console.log("再次购买 拼团"), 
        wx.reLaunch({
            url: "/longbing_card/pages/shop/detail/detail?id=" + o.goods_info[0].id + "&to_uid=" + app.globalData.to_uid
        })));
    }
});