var app = getApp();

Page({
    data: {
        tabList: [ {
            dotNum: "0",
            name: "全部拼团",
            status: "toCollage"
        }, {
            dotNum: "0",
            name: "拼团中",
            status: "toCollage"
        }, {
            dotNum: "0",
            name: "拼团成功",
            status: "toCollage"
        }, {
            dotNum: "0",
            name: "拼团失败",
            status: "toCollage"
        } ],
        currentIndex: 0,
        globalData: {},
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1,
        toWxPayStatus: 0
    },
    onLoad: function(a) {
        wx.hideShareMenu(), a.currentTab && this.setData({
            currentIndex: a.currentTab,
            globalData: app.globalData
        });
    },
    onReady: function() {},
    onShow: function() {
        app.util.showLoading(1);
        this.setData({
            dataList: [],
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), this.getListData(), wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        app.util.showLoading(1);
        this.setData({
            dataList: [],
            page: 1,
            more: !0,
            loading: !1,
            isEmpty: !1,
            show: !1
        }), this.getListData(), wx.showNavigationBarLoading(), wx.stopPullDownRefresh(), 
        wx.hideLoading();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getShopcollagenumber: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/shopcollagenumber",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                if (console.log("entry/wxapp/shopcollagenumber ==>", a), !a.data.errno) {
                    var t = e.data.tabList;
                    t[0].dotNum = 0, t[1].dotNum = a.data.data.going, t[2].dotNum = a.data.data.suc, 
                    t[3].dotNum = a.data.data.fail, e.setData({
                        tabList: t
                    });
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopcollagenumber ==> fail ==> ", a);
            }
        });
    },
    getListData: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/shopmycollage",
            cachetime: "30",
            method: "POST",
            data: {
                type: n.data.currentIndex
            },
            success: function(a) {
                if (console.log("entry/wxapp/shopmycollage ==>", a), !a.data.errno) {
                    var t = a.data.data;
                    for (var e in 0 == t.length && n.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), t) {
                        for (var o in t[e].order_info) t[e].user_id == t[e].order_info[o].user_id && (t[e].order_info_2 = t[e].order_info[o]);
                        t[e].collage_info.number_2 = (t[e].order_info_2.total_price - t[e].order_info_2.freight) / t[e].collage_info.price;
                    }
                    n.setData({
                        dataList: t
                    }), n.getShopcollagenumber();
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopmycollage ==> fail ==> ", a);
            }
        });
    },
    getShopcancelorder: function(a, e) {
        var o = this;
        console.log(a, "order_id");
        var n = o.data.dataList;
        app.util.request({
            url: "entry/wxapp/shopcancelorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: a
            },
            success: function(a) {
                if (console.log("entry/wxapp/shopcancelorder ==>", a), !a.data.errno) {
                    var t = o.data.currentIndex;
                    0 == t && wx.showToast({
                        icon: "success",
                        title: "已成功取消订单!",
                        duration: 2e3,
                        success: function() {
                            setTimeout(function() {
                                n.splice(e, 1), o.setData({
                                    dataList: n
                                });
                            }, 1e3);
                        }
                    }), 1 == t && (n.splice(e, 1), o.setData({
                        dataList: n
                    }));
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopcancelorder ==> fail ==> ", a);
            }
        });
    },
    getShopdelorder: function(a, t) {
        var e = this, o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/shopdelorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: a
            },
            success: function(a) {
                console.log("entry/wxapp/shopdelorder ==>", a), a.data.errno || wx.showToast({
                    icon: "success",
                    title: "已成功删除拼团!",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            o.splice(t, 1), e.setData({
                                dataList: o
                            });
                        }, 1e3);
                    }
                });
            },
            fail: function(a) {
                console.log("entry/wxapp/shopdelorder ==> fail ==> ", a);
            }
        });
    },
    getWxPay: function(a, t) {
        var e = this;
        app.util.showLoading(1);
        var o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "30",
            method: "POST",
            data: {
                order_id: a
            },
            success: function(a) {
                console.log("entry/wxapp/Pay ==>", a), a.data && a.data.data && !a.data.errno && (a.data.data.collage_id && e.setData({
                    pay_collage_id: a.data.data.collage_id
                }), wx.hideLoading(), wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        wx.showToast({
                            icon: "success",
                            image: "/longbing_card/resource/images/alert.png",
                            title: "支付成功",
                            duration: 2e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.navigateTo({
                                        url: "/longbing_card/pages/shop/releaseCollage/releaseCollage?id=" + o[t].collage_info.goods_id + "&status=toShare&to_uid=" + o[t].order_info.to_uid + "&collage_id=" + e.data.pay_collage_id
                                    });
                                }, 1e3);
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            icon: "fail",
                            image: "/longbing_card/resource/images/error.png",
                            title: "支付失败",
                            duration: 2e3
                        });
                    },
                    complete: function(a) {
                        e.data.toWxPayStatus = 0;
                    }
                }));
            },
            fail: function(a) {
                console.log("entry/wxapp/Pay ==> fail ==>", a), wx.hideLoading(), wx.showModal({
                    title: "系统提示",
                    content: a.data.data.message ? "支付失败，" + a.data.data.message : "支付失败，请重试",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                });
            }
        });
    },
    toJump: function(a) {
        var t = this, e = a.currentTarget.dataset.status, o = a.currentTarget.dataset.index, n = t.data.dataList;
        if ("toProductDetail" == e || "toOrderDetail" == e || "toAgain" == e) app.util.goUrl(a); else if ("toCancel" == e) {
            console.log("取消订单");
            var i = void 0;
            for (var s in n[o].order_info) wx.getStorageSync("userid") == n[o].order_info[s].user_id && (i = n[o].order_info[s].id);
            t.getShopcancelorder(i, o);
        } else if ("toWxPay" == e) {
            console.log("确认付款"), 0 == t.data.toWxPayStatus && t.setData({
                toWxPayStatus: 1
            }, function() {
                t.getWxPay(n[o].order_info.id, o);
            });
        } else "toDelete" == e && (console.log("删除拼团"), t.getShopdelorder(n[o].order_info.id, o));
    },
    formSubmit: function(a) {
        var t = a.detail.formId, e = a.detail.target.dataset.index, o = a.detail.target.dataset.status;
        this.toSaveFormIds(t), "toCollage" == o && (this.setData({
            currentIndex: e,
            currentTab: o
        }), this.getListData());
    },
    toSaveFormIds: function(a) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            method: "POST",
            data: {
                formId: a
            },
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    }
});