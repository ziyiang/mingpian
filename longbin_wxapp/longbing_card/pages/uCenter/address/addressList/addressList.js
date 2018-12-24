var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        console.log(this), wx.hideShareMenu();
        this.setData({
            globalData: app.globalData
        });
    },
    onReady: function() {},
    onShow: function() {
        app.util.showLoading(1);
        this.getAddressList(), wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getAddressList();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getAddressList: function() {
        var d = this;
        app.util.request({
            url: "entry/wxapp/shopmyaddress",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                if (console.log("entry/wxapp/shopmyaddress ==>", t), !t.data.errno) {
                    var e = t.data.data, a = [], s = [];
                    for (var o in e) e[o].is_default = parseInt(e[o].is_default), 1 == e[o].is_default ? a.push(1) : 0 == e[o].is_default && a.push(0), 
                    s.push(e[o].phone.substr(0, 3) + "****" + e[o].phone.substr(7, 10));
                    d.setData({
                        idList: a,
                        dataList: e,
                        tmpPhone: s
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/shopmyaddress ==> fail ==> ", t);
            }
        });
    },
    setShopAddressDefault: function(a) {
        var t, s = this, o = s.data.dataList, d = s.data.idList;
        0 == o[a].is_default && (t = 1), 1 == o[a].is_default && (t = 2), app.util.request({
            url: "entry/wxapp/ShopAddressDefault",
            cachetime: "30",
            method: "POST",
            data: {
                type: t,
                id: o[a].id
            },
            success: function(t) {
                if (console.log("entry/wxapp/ShopAddressDefault ==>", t), !t.data.errno) {
                    for (var e in o) o[e].is_default = 0, d[e] = 0;
                    o[a].is_default = 1, d[a] = 1, wx.showToast({
                        icon: "none",
                        title: "已成功设为默认地址",
                        duration: 2e3
                    }), app.globalData.checkAddress = o[a], s.setData({
                        idList: d,
                        dataList: o
                    });
                }
            },
            fail: function(t) {
                console.log("entry/wxapp/ShopAddressDefault ==> fail ==> ", t);
            }
        });
    },
    getToAddUpdateAddress: function(t) {
        app.util.request({
            url: "entry/wxapp/shopAddAddress",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                console.log("entry/wxapp/shopAddAddress ==>", t), t.data.errno || wx.showToast({
                    icon: "none",
                    title: "已成功新增地址！",
                    duration: 2e3
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/shopAddAddress ==> fail ==> ", t);
            }
        });
    },
    getDeleteAddr: function(e) {
        var a = this, s = a.data.dataList;
        app.util.request({
            url: "entry/wxapp/shopdeladdress",
            cachetime: "30",
            method: "POST",
            data: {
                id: s[e].id
            },
            success: function(t) {
                console.log("entry/wxapp/shopdeladdress ==>", t), t.data.errno || (wx.showToast({
                    icon: "none",
                    title: "已成功删除地址！",
                    duration: 2e3
                }), s.splice(e, 1), a.setData({
                    dataList: s
                }));
            },
            fail: function(t) {
                console.log("entry/wxapp/shopdeladdress ==> fail ==> ", t);
            }
        });
    },
    toJump: function(t) {
        var a = this, e = t.currentTarget.dataset.status, s = t.currentTarget.dataset.index;
        a.data.dataList;
        if ("toAddAddr" == e || "toEditAddr" == e) {
            if (console.log("手动添加 || 编辑地址"), "toEditAddr" == e) {
                var o = a.data.dataList[s];
                wx.setStorageSync("storageAddress", o);
            }
            app.util.goUrl(t);
        } else if ("toCheckAddr" == e) {
            console.log("默认地址");
            var d = a.data.dataList[s];
            app.globalData.checkAddress_cur = d, setTimeout(function() {
                wx.navigateBack();
            }, 300);
        } else "toCheckDefaultAddr" == e ? (console.log("默认地址"), a.setShopAddressDefault(s)) : "toDeleteAddr" == e ? (console.log("删除地址"), 
        a.getDeleteAddr(s)) : "toWechatAddr" == e && (console.log("微信添加"), wx.chooseAddress({
            success: function(t) {
                var e = {
                    address: t.provinceName + t.cityName + t.countyName,
                    address_detail: t.detailInfo,
                    province: t.provinceName,
                    city: t.cityName,
                    area: t.countyName,
                    name: t.userName,
                    phone: t.telNumber,
                    sex: ""
                };
                a.getToAddUpdateAddress(e), a.setData({
                    dataList: []
                }), a.getAddressList();
            }
        }));
    }
});