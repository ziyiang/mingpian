var _xx_util = require("../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp();

Page({
    data: {
        toWxPayStatus: 0
    },
    onLoad: function(a) {
        console.log(this);
        app.util.showLoading(1), wx.hideShareMenu();
        var t, e = {};
        if (a.status) {
            var o;
            e.status = a.status;
            var r = wx.getStorageSync("storageToOrder");
            "toOrder" != a.status && "toCarOrder" != a.status || (o = "去结算", e.tmpFailUrl = "/longbing_card/pages/uCenter/order/orderList/orderList?currentTab=1", 
            e.tmpSuccessUrl = "/longbing_card/pages/uCenter/order/orderList/orderList?currentTab=2"), 
            "toCollage" == a.status && (o = "发布拼团", e.tmpFailUrl = "/longbing_card/pages/uCenter/order/collageList/collageList?currentTab=0", 
            e.tmpSuccessUrl = "/longbing_card/pages/shop/releaseCollage/releaseCollage?id=" + r.dataList[0].goods_id + "&status=toShare&to_uid=" + app.globalData.to_uid + "&collage_id="), 
            "toJoinCollage" == a.status && (o = "参加拼团", e.tmpFailUrl = "/longbing_card/pages/uCenter/order/collageList/collageList?currentTab=0", 
            e.tmpSuccessUrl = "/longbing_card/pages/shop/releaseCollage/releaseCollage?id=" + r.tmp_trolley_ids + "&status=toShare&to_uid=" + app.globalData.to_uid + "&collage_id="), 
            wx.setNavigationBarTitle({
                title: o
            });
        }
        a.sharestatus && (e.sharestatus = a.sharestatus), wx.getStorageSync("storageToOrder") && (e.orderData = wx.getStorageSync("storageToOrder"));
        var s = 0, i = e.orderData.dataList;
        for (var d in i) t || (t = i[0].goods_id), t == i[d].goods_id && (i[d].toCountFreightPrice = 1), 
        0 < d && (i[d].goods_id != i[d - 1].goods_id ? (t = i[d].goods_id, i[d].toCountFreightPrice = 1) : i[d].toCountFreightPrice = 0), 
        1 == i[d].toCountFreightPrice && (s += 1 * i[d].freight);
        e.orderData.freight_price = s, e.orderData.countPayMoney = 1 * e.orderData.count_price + 1 * s, 
        this.setData({
            paramData: e,
            globalData: app.globalData
        }), this.getAddressList(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {
        var a = app.globalData, t = {};
        a.checkAddress_cur && (t = a.checkAddress_cur), this.setData({
            globalData: a,
            checkAddress_cur: t
        });
    },
    onHide: function() {
        wx.removeStorageSync("storageToOrder");
    },
    onUnload: function() {
        wx.removeStorageSync("storageToOrder");
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), taht.getAddressList();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getAddressList: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/shopmyaddress",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                if (console.log("entry/wxapp/shopmyaddress ==>", a), !a.data.errno) {
                    var t = a.data.data;
                    for (var e in t) 1 == t[e].is_default && (app.globalData.checkAddress = t[e]);
                    app.globalData.checkAddress && o.setData({
                        checkAddress_cur: app.globalData.checkAddress
                    });
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopmyaddress ==> fail ==> ", a);
            }
        });
    },
    getProductOrder: function(a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/shopplaceorder",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                if (console.log("entry/wxapp/shopplaceorder ==>", a), !a.data.errno) {
                    var t = o.data.paramData.orderData.dataList;
                    for (var e in t) o.toShopDelTrolley(t[e].id);
                    o.getWxPay(a.data.data.order_id);
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopplaceorder ==> fail ==> ", a);
            }
        });
    },
    getOnlyOrder: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopplaceorder2",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                console.log("entry/wxapp/shopplaceorder2 ==>", a), a.data.errno || t.getWxPay(a.data.data.order_id);
            },
            fail: function(a) {
                console.log("entry/wxapp/shopplaceorder2 ==> fail ==> ", a);
            }
        });
    },
    getCollageOrder: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopstartcollage",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                console.log("entry/wxapp/shopstartcollage ==>", a), a.data.errno || t.getWxPay(a.data.data.order_id);
            },
            fail: function(a) {
                console.log("entry/wxapp/shopstartcollage ==> fail ==> ", a);
            }
        });
    },
    getJoinCollageOrder: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopjoincollage",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                console.log("entry/wxapp/shopjoincollage ==>", a), a.data.errno || t.getWxPay(a.data.data.order_id);
            },
            fail: function(a) {
                console.log("entry/wxapp/shopjoincollage ==> fail ==> ", a), wx.showModal({
                    title: "",
                    content: a.data.message,
                    showCancel: !1,
                    confirmText: "知道啦",
                    success: function(a) {
                        a.confirm && wx.navigateBack();
                    }
                });
            }
        });
    },
    toShopDelTrolley: function(a) {
        app.util.request({
            url: "entry/wxapp/ShopDelTrolley",
            cachetime: "30",
            method: "POST",
            data: {
                id: a
            },
            success: function(a) {
                console.log("entry/wxapp/ShopDelTrolley ==>", a), a.data.errno;
            },
            fail: function(a) {
                console.log("entry/wxapp/ShopDelTrolley ==> fail ==> ", a);
            }
        });
    },
    getWxPay: function(a) {
        var t = this;
        app.util.showLoading(1), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "30",
            method: "POST",
            data: {
                order_id: a
            },
            success: function(a) {
                console.log("entry/wxapp/Pay ==>", a), a.data && a.data.data && !a.data.errno && (a.data.data.collage_id && t.setData({
                    pay_collage_id: a.data.data.collage_id
                }), wx.hideLoading(), wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        wx.showToast({
                            icon: "none",
                            image: "/longbing_card/resource/images/alert.png",
                            title: "支付成功",
                            duration: 2e3
                        }), setTimeout(function() {
                            var a = t.data.paramData.tmpSuccessUrl;
                            "toCollage" != t.data.paramData.status && "toJoinCollage" != t.data.paramData.status || (a += t.data.pay_collage_id), 
                            console.log(a, "tmpURL"), "fromshare" == t.data.paramData.sharestatus ? (a += "&sharestatus=fromshare", 
                            wx.reLaunch({
                                url: a
                            })) : wx.redirectTo({
                                url: a
                            });
                        }, 1e3);
                    },
                    fail: function(a) {
                        wx.showToast({
                            icon: "none",
                            image: "/longbing_card/resource/images/error.png",
                            title: "支付失败",
                            duration: 2e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: t.data.paramData.tmpFailUrl
                            });
                        }, 1e3);
                    },
                    complete: function(a) {
                        t.data.toWxPayStatus = 0;
                    }
                }));
            },
            fail: function(a) {
                console.log("entry/wxapp/Pay ==> fail ==>", a), wx.hideLoading(), wx.showModal({
                    title: "系统提示",
                    content: a.data.data.message ? "支付失败，" + a.data.data.message : "支付失败，请重试",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && setTimeout(function() {
                            wx.redirectTo({
                                url: t.data.paramData.tmpFailUrl
                            });
                        }, 1e3);
                    }
                });
            }
        });
    },
    toJump: function(a) {
        var o = this, t = a.currentTarget.dataset.status;
        if ("toCheckAddress" == t || "toProductDetail" == t) console.log("选择地址 || 跳转至产品详情"), 
        app.util.goUrl(a); else if ("toWxPay" == t) {
            var r = o.data.checkAddress_cur.id;
            if (!r) return wx.showToast({
                icon: "none",
                title: "请选择收货地址！",
                duration: 2e3
            }), !1;
            0 == o.data.toWxPayStatus && o.setData({
                toWxPayStatus: 1
            }, function() {
                var a = {
                    address_id: r,
                    to_uid: app.globalData.to_uid
                };
                if ("toOrder" == o.data.paramData.status) {
                    var t = o.data.paramData.orderData.dataList;
                    a.number = t[0].number, a.goods_id = t[0].goods_id, a.spe_price_id = t[0].spe_price_id, 
                    o.getOnlyOrder(a);
                }
                if ("toCarOrder" == o.data.paramData.status && (a.trolley_ids = o.data.paramData.orderData.tmp_trolley_ids, 
                o.getProductOrder(a)), "toCollage" == o.data.paramData.status || "toJoinCollage" == o.data.paramData.status) {
                    var e = o.data.paramData.orderData.dataList;
                    a.collage_id = e[0].collage_id, a.number = e[0].number, "toCollage" == o.data.paramData.status && (a.goods_id = e[0].goods_id, 
                    o.getCollageOrder(a)), "toJoinCollage" == o.data.paramData.status && (a.goods_id = o.data.paramData.orderData.tmp_trolley_ids, 
                    o.getJoinCollageOrder(a));
                }
            });
        }
    }
});