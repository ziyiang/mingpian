var _xx_util = require("../../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index3 = require("../../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        globalData: {},
        dataList: [],
        manageStatus: 0,
        idList: {},
        isAll: !1,
        icon_car_empty: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/uAsB6O4AbAC6cs3IU4OZZaa64cBu3Z.png"
    },
    onLoad: function(t) {
        console.log(this);
        this.setData({
            globalData: app.globalData
        }), wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        app.util.showLoading(1);
        this.getShopMyTrolley(), wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getShopMyTrolley();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getShopMyTrolley: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/ShopMyTrolley",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                if (console.log("entry/wxapp/ShopMyTrolley ==>", t), !t.data.errno) {
                    var e = t.data.data, a = [];
                    for (var o in e.list) a.push(0);
                    i.setData({
                        dataList: e,
                        idList: a
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/ShopMyTrolley ==> fail ==> ", t);
            }
        });
    },
    toShopUpdateTrolley: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/ShopUpdateTrolley",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                console.log("entry/wxapp/ShopUpdateTrolley ==>", t), t.data.errno || e.toCountPrice();
            },
            fail: function(t) {
                console.log("entry/wxapp/ShopUpdateTrolley ==> fail ==> ", t);
            }
        });
    },
    toShopDelTrolley: function(t, o) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/ShopDelTrolley",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                if (console.log("entry/wxapp/ShopDelTrolley ==>", t), !t.data.errno && "delete" != o) {
                    var e = i.data.dataList, a = i.data.idList;
                    a.splice(o, 1), e.list.splice(o, 1), i.setData({
                        idList: a,
                        dataList: e
                    }), i.toCountPrice();
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/ShopDelTrolley ==> fail ==> ", t);
            }
        });
    },
    RemoveAddNum: function(t) {
        var a = this, e = t.currentTarget.dataset.status, o = t.currentTarget.dataset.index, i = a.data.dataList, l = i.list[o].stock, s = 1;
        "remove" == e && (s = 2);
        var n = {
            id: i.list[o].id,
            type: s,
            number: 1
        };
        if ("remove" == e && (console.log("购物车-1", o), 1 == i.list[o].number ? wx.showModal({
            title: "",
            content: "是否确认删除本条数据",
            success: function(t) {
                if (t.confirm) {
                    var e = {
                        id: i.list[o].id
                    };
                    a.toShopDelTrolley(e, o);
                } else t.cancel;
            }
        }) : (i.list[o].number = 1 * i.list[o].number - 1, i.list[o].price = i.list[o].number * i.list[o].price2, 
        a.toShopUpdateTrolley(n))), "add" == e) {
            if (console.log("购物车+1", o), i.list[o].number > l - 1) return wx.showModal({
                title: "",
                content: "库存不足，不能再添加了",
                confirmText: "知道啦",
                showCancel: !1,
                success: function(t) {
                    t.confirm;
                }
            }), !1;
            i.list[o].number = 1 * i.list[o].number + 1, i.list[o].price = i.list[o].number * i.list[o].price2, 
            a.toShopUpdateTrolley(n);
        }
        a.setData({
            dataList: i
        }), a.toCountPrice();
    },
    toCountPrice: function() {
        var t = this.data.dataList, e = this.data.idList, a = 0, o = "", i = [];
        for (var l in t.list) 1 == e[l] && (a += 1 * t.list[l].price, i.push(t.list[l]), 
        o += t.list[l].id + ",");
        o = o.slice(0, -1);
        var s = {
            count_price: a.toFixed(2),
            tmp_trolley_ids: o,
            dataList: i
        };
        this.setData({
            dataList: t,
            countPrice: a.toFixed(2),
            tmpCarList: s,
            trolley_ids: o
        });
    },
    checkIsAll: function() {
        var t = this.data.isAll, e = this.data.idList, a = !0;
        for (var o in e) 0 == e[o] && (a = !1);
        t = a, this.setData({
            isAll: t
        });
    },
    toJump: function(t) {
        var a = this, e = t.currentTarget.dataset.status, o = t.currentTarget.dataset.index, i = a.data.dataList.list;
        if ("toProductDetail" == e) app.util.goUrl(t); else if ("toManage" == e) {
            var l;
            console.log("管理商品"), 0 == o && (l = 1), 1 == o && (l = 0), a.setData({
                manageStatus: l
            });
        } else if ("toDelete" == e) console.log("删除本条数据"), wx.showModal({
            title: "",
            content: "是否确认删除本条数据",
            success: function(t) {
                if (t.confirm) {
                    app.util.showLoading(2);
                    var e = {
                        id: i[o].id
                    };
                    a.toShopDelTrolley(e, o), wx.hideLoading();
                } else t.cancel;
            }
        }); else if ("toCheck" == e) {
            console.log("选择产品");
            var s = a.data.idList;
            s[o] ? (s[o] = 0, a.isAll = !1, a.setData({
                isAll: !1
            })) : s[o] = 1, a.setData({
                idList: s
            }), a.toCountPrice(), a.checkIsAll();
        } else if ("toChooseAll" == e) {
            console.log("全选");
            var n = (a = this).data.isAll, r = a.data.idList;
            if (n = !n, a.isAll = n, a.setData({
                isAll: n
            }), n) for (var c in r) r[c] = 1; else for (var d in r) r[d] = 0;
            a.setData({
                idList: r
            }), a.toCountPrice();
        } else if ("toOrderPay" == e) {
            var u = a.data.manageStatus, p = (r = a.data.idList, a.data.dataList.list);
            if (1 == u) {
                for (var h in console.log("批量删除"), app.util.showLoading(2), r) if (1 == r[h]) {
                    var f = {
                        id: p[h].id
                    };
                    a.toShopDelTrolley(f, "delete");
                }
                setTimeout(function() {
                    a.getShopMyTrolley(), wx.hideLoading();
                }, 500);
            } else if (0 == u) {
                if (console.log("去结算"), !a.data.trolley_ids) return wx.showToast({
                    icon: "none",
                    title: "暂未选择任何商品哦",
                    duration: 2e3
                }), !1;
                wx.setStorageSync("storageToOrder", a.data.tmpCarList), wx.navigateTo({
                    url: "/longbing_card/pages/shop/car/toOrder/toOrder?status=toCarOrder"
                });
            }
        }
    }
});