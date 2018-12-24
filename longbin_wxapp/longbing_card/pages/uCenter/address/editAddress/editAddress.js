var app = getApp();

Page({
    data: {
        sexItems: [ {
            name: "先生",
            value: "先生",
            checked: !0
        }, {
            name: "女士",
            value: "女士",
            checked: !1
        } ],
        sexVal: "",
        address: "",
        editAddress: []
    },
    onLoad: function(a) {
        app.util.showLoading(1), wx.hideShareMenu();
        var e = this, t = {}, s = "先生";
        if (a.status) if (t.status = a.status, "toEdit" == a.status) {
            t.editAddress = wx.getStorageSync("storageAddress");
            var d = e.data.sexItems;
            "先生" == t.editAddress.sex && (s = "先生", d[0].checked = !0), "女士" == t.editAddress.sex && (s = "女士", 
            d[1].checked = !0);
            var o = {};
            o.address = t.editAddress.address, o.address_detail = t.editAddress.address_detail, 
            e.setData({
                checkAddress: o
            });
        } else if ("toAdd" == a.status) {
            s = "先生", (d = e.data.sexItems)[0].checked = !0;
        }
        e.setData({
            sexVal: s,
            sexItems: d,
            paramData: t,
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
    onShareAppMessage: function() {},
    radioChange: function(a) {
        this.sexVal = a.detail.value, this.setData({
            sexVal: a.detail.value
        });
    },
    getToAddUpdateAddress: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/shopAddAddress",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                var e;
                (console.log("entry/wxapp/shopAddAddress ==>", a), a.data.errno) || ("toAdd" == t.data.paramData.status && (e = "已成功新增地址！"), 
                "toEdit" == t.data.paramData.status && (e = "已成功编辑地址！"), wx.showToast({
                    icon: "none",
                    title: e,
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.hideToast(), wx.navigateBack();
                        }, 1e3);
                    }
                }));
            },
            fail: function(a) {
                console.log("entry/wxapp/shopAddAddress ==> fail ==> ", a);
            }
        });
    },
    chooseLocation: function(a) {
        var n = this;
        wx.chooseLocation({
            success: function(s) {
                var d = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/, a = [], e = {
                    REGION_PROVINCE: null,
                    REGION_COUNTRY: null,
                    REGION_CITY: null,
                    ADDRESS: null
                };
                function t(a, e) {
                    var t = (d = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g).exec(a);
                    e.REGION_CITY = t[1], e.REGION_COUNTRY = t[2], e.ADDRESS = t[3] + "(" + s.name + ")";
                }
                (a = d.exec(s.address)) ? (e.REGION_PROVINCE = a[1], t(s.address, e)) : (a = (d = /^(.*?(省|自治区))(.*?)$/).exec(s.address), 
                e.REGION_PROVINCE = a[1], t(a[3], e));
                var o = {};
                o.address = e.REGION_PROVINCE + e.REGION_CITY + e.REGION_COUNTRY, o.address_detail = e.ADDRESS, 
                n.setData({
                    addressBean: e,
                    checkAddress: o
                });
            }
        });
    },
    toEditAddress: function(a) {
        var e = this, t = a.detail.value;
        if (console.log("button clicked", a, t), !t.name) return wx.showToast({
            icon: "none",
            title: "请填写联系人！",
            duration: 2e3,
            success: function() {
                setTimeout(function() {
                    wx.hideToast();
                }, 1e3);
            }
        }), !1;
        if (!t.phone) return wx.showToast({
            icon: "none",
            title: "请填写手机号！",
            duration: 2e3,
            success: function() {
                setTimeout(function() {
                    wx.hideToast();
                }, 1e3);
            }
        }), !1;
        if ("toAdd" == e.data.paramData.status) {
            if (console.log("新增"), !e.data.addressBean) return wx.showToast({
                icon: "none",
                title: "请选择地址！",
                duration: 2e3,
                success: function() {
                    setTimeout(function() {
                        wx.hideToast();
                    }, 1e3);
                }
            }), !1;
            t.province = e.data.addressBean.REGION_PROVINCE, t.city = e.data.addressBean.REGION_CITY, 
            t.area = e.data.addressBean.REGION_COUNTRY;
        } else "toEdit" == e.data.paramData.status && (console.log("编辑"), t.id = e.data.paramData.editAddress.id, 
        e.data.addressBean ? (t.province = e.data.addressBean.REGION_PROVINCE, t.city = e.data.addressBean.REGION_CITY, 
        t.area = e.data.addressBean.REGION_COUNTRY) : (t.province = e.data.paramData.editAddress.province, 
        t.city = e.data.paramData.editAddress.city, t.area = e.data.paramData.editAddress.area));
        if (!t.address_detail) return wx.showToast({
            icon: "none",
            title: "请填写详细地址！",
            duration: 2e3,
            success: function() {
                setTimeout(function() {
                    wx.hideToast();
                }, 1e3);
            }
        }), !1;
        e.getToAddUpdateAddress(t);
    }
});