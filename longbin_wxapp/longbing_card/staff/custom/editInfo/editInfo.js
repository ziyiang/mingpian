var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp();

Page({
    data: {
        setCount: [ {
            name: "男"
        }, {
            name: "女"
        } ],
        count: -1,
        date: "",
        clientData: []
    },
    shuaxin: function(o) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/clientInfo",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: i.data.id
            },
            success: function(t) {
                if (!t.data.errno) {
                    var a = t.data.data.info;
                    for (var e in a) "undefined" != a[e] && null != _typeof(a[e]) || (a[e] = "");
                    var n = a.sex;
                    n || (n = "-1"), i.setData({
                        clientData: a,
                        count: n,
                        date: a.birthday
                    }), o && wx.stopPullDownRefresh();
                }
            }
        });
    },
    onLoad: function(t) {
        app.util.showLoading(1), wx.hideShareMenu(), t.id && this.setData({
            id: t.id,
            globalData: app.globalData
        }), this.shuaxin(), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function(t) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.shuaxin(1);
    },
    onReachBottom: function() {},
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {},
    listenerDatePickerSelected: function(t) {
        var a = t.detail.value;
        this.setData({
            date: a
        });
    },
    pickerSelected: function(t) {
        var a = t.detail.value;
        a && this.setData({
            count: a,
            "froms.sex": a
        });
    },
    blur_name: function(t) {
        var a = t.detail.value;
        a && this.setData({
            "froms.name": a
        });
    },
    switchChange: function(t) {
        t.detail.value && this.setData({
            "froms.is_mask": t.detail.value
        });
    },
    toEditInfo: function(t) {
        app.util.request({
            url: "entry/wxapp/editClient",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                t.data.errno || wx.showToast({
                    icon: "none",
                    title: "客户信息修改成功！",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack();
                        }, 2e3);
                    }
                });
            },
            fail: function(t) {
                console.log("entry/wxapp/editClient ==>fail ==>", t);
            }
        });
    },
    formSubmit: function(t) {
        var a = this, e = t.detail.formId, n = t.detail.target.dataset.status;
        if (a.toSaveFormIds(e), "toEditStaff" == n) {
            var o = t.detail.value;
            o.client_id = a.data.id;
            var i = a.data.count;
            for (var s in "-1" != i && "undefined" != i || (i = ""), o.sex = i, o.birthday = a.data.date, 
            o) "undefined" == o[s] && (o[s] = "");
            0 == o.is_mask ? o.is_mask = 0 : o.is_mask = 1, a.toEditInfo(o);
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