var timerOverTime, app = getApp();

Page({
    data: {
        tabList: [ {
            name: "全部",
            status: "toOrder"
        }, {
            name: "待付款",
            status: "toOrder"
        }, {
            name: "待发货",
            status: "toOrder"
        }, {
            name: "待收货",
            status: "toOrder"
        }, {
            name: "已完成",
            status: "toOrder"
        } ],
        currentIndex: 0,
        dataList: [],
        globalData: {},
        page: 1,
        more: !0,
        loading: !1,
        isEmpty: !1,
        show: !1,
        toWxPayStatus: 0
    },
    onLoad: function(t) {
        console.log(this);
        wx.hideShareMenu(), t.currentTab && this.setData({
            currentIndex: t.currentTab,
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
    onHide: function() {
        clearInterval(timerOverTime);
    },
    onUnload: function() {
        clearInterval(timerOverTime);
    },
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
    onReachBottom: function() {
        app.util.showLoading(1);
        var t = this;
        t.setData({
            show: !0
        }), 0 == t.data.isEmpty && (t.setData({
            page: t.data.page + 1
        }), t.getListData()), wx.hideLoading();
    },
    onShareAppMessage: function() {},
    getListData: function() {
        var r = this;
        app.util.request({
            url: "entry/wxapp/shopmyorder",
            cachetime: "30",
            method: "POST",
            data: {
                type: r.data.currentIndex,
                page: r.data.page
            },
            success: function(t) {
                if (console.log("entry/wxapp/shopmyorder ==>", t), !t.data.errno) {
                    var a = t.data.data.list;
                    if (0 == a.length || r.data.page > t.data.data.total_page) return r.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    var e = r.data.dataList;
                    for (var o in a) {
                        var n = new app.util.date(), s = parseInt(a[o].left_time / 24 / 60 / 60);
                        if (s = 0 < s ? s + "天" : "", a[o].left_time = s + n.dateToStr("HH", n.longToDate(1e3 * a[o].left_time)) + "小时", 
                        a[o].goods_info) for (var i in a[o].total_count_number = 0, a[o].goods_info) a[o].total_count_number += parseInt(a[o].goods_info[i].number);
                        e.push(a[o]);
                    }
                    r.setData({
                        dataList: e,
                        loading: !0
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/shopmyorder ==> fail ==> ", t);
            }
        });
    },
    getShopcancelorder: function(t, e) {
        var o = this, n = o.data.dataList;
        app.util.request({
            url: "entry/wxapp/shopcancelorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: t
            },
            success: function(t) {
                if (console.log("entry/wxapp/shopcancelorder ==>", t), !t.data.errno) {
                    var a = o.data.currentIndex;
                    0 == a && wx.showToast({
                        icon: "success",
                        title: "已成功取消订单!",
                        duration: 2e3,
                        success: function() {
                            setTimeout(function() {
                                n[e].order_status = 1, o.setData({
                                    dataList: n
                                });
                            }, 1e3);
                        }
                    }), 1 == a && wx.showToast({
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
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/shopcancelorder ==> fail ==> ", t);
            }
        });
    },
    getShopendorder: function(t, a) {
        var e = this, o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/shopendorder",
            cachetime: "30",
            method: "POST",
            data: {
                id: t
            },
            success: function(t) {
                console.log("entry/wxapp/shopendorder ==>", t), t.data.errno || wx.showToast({
                    icon: "success",
                    title: "已成功确认收货!",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            o.splice(a, 1), e.setData({
                                dataList: o
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
    getRefund: function(t, a) {
        var e = this, o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/Refund",
            cachetime: "30",
            method: "POST",
            data: {
                order_id: t
            },
            success: function(t) {
                console.log("entry/wxapp/Refund ==>", t), t.data.errno || wx.showToast({
                    icon: "success",
                    title: "已成功申请退款!",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            o[a].pay_status = 2, e.setData({
                                dataList: o
                            });
                        }, 1e3);
                    }
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/Refund ==> fail ==> ", t);
            }
        });
    },
    getWxPay: function(t, a) {
        var e = this;
        app.util.showLoading(1);
        var o = e.data.dataList;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "30",
            method: "POST",
            data: {
                order_id: t
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
                                setTimeout(function() {
                                    wx.navigateTo({
                                        url: "/longbing_card/pages/uCenter/order/orderDetail/orderDetail?id=" + o[a].order_info.id
                                    });
                                }, 1e3);
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
                        e.data.toWxPayStatus = 0;
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
    checktoConsult: function(t, a) {
        console.log(app.globalData.to_uid, wx.getStorageSync("userid"), app.globalData.nickName, "checktoConsult *********  showModal"), 
        0 == a ? wx.showModal({
            title: "",
            content: "不能与默认客服进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        }) : a == wx.getStorageSync("userid") ? wx.showModal({
            title: "",
            content: "不能和自己进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(t) {
                t.confirm;
            }
        }) : wx.navigateTo({
            url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + a + "&contactUserName=" + app.globalData.nickName + "&goods_id=" + t
        });
    },
    toJump: function(t) {
        var a = this, e = t.currentTarget.dataset.status, o = t.currentTarget.dataset.index, n = a.data.dataList;
        if ("toProductDetail" == e || "toOrderDetail" == e) app.util.goUrl(t); else if ("toConsult" == e) console.log("咨询"), 
        a.checktoConsult(n[o].goods_info[0].id, n[o].to_uid); else if ("toCancel" == e) console.log("取消订单"), 
        a.getShopcancelorder(n[o].id, o); else if ("toRefundt" == e) console.log("申请退款"), 
        a.getRefund(n[o].id, o); else if ("toWxPay" == e) {
            console.log("确认付款"), 0 == a.data.toWxPayStatus && a.setData({
                toWxPayStatus: 1
            }, function() {
                a.getWxPay(n[o].id, o);
            });
        } else "toConfirm" == e && (console.log("确认收货"), a.getShopendorder(n[o].id, o));
    },
    formSubmit: function(t) {
        var a = t.detail.formId, e = t.detail.target.dataset.index, o = t.detail.target.dataset.status;
        this.toSaveFormIds(a), "toOrder" == o && (this.setData({
            currentIndex: e,
            page: 1,
            isEmpty: !1,
            dataList: []
        }), this.getListData());
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