var app = getApp();

Page({
    data: {
        Unchanged: [],
        lists: [],
        addsInput: "",
        clickIndex: "0"
    },
    oftenLabel: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/oftenLabel",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                t.data.errno || a.setData({
                    Unchanged: t.data.data
                });
            }
        });
    },
    Labels: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Labels",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: a.data.id
            },
            success: function(t) {
                t.data.errno || a.setData({
                    lists: t.data.data
                });
            }
        });
    },
    onLoad: function(t) {
        app.util.showLoading(1), wx.hideShareMenu(), t.id && this.setData({
            id: t.id,
            globalData: app.globalData
        }), this.oftenLabel(), this.Labels(), wx.hideLoading();
    },
    return1: function(t) {
        this.data.addsInput ? this.getInsertLabel() : wx.navigateBack({
            delta: 1
        });
    },
    bindinput: function(t) {
        console.log("bindinput", t), this.setData({
            addsInput: t.detail.value
        });
    },
    bindbulr: function(t) {
        console.log("失去焦点，", t);
        this.getInsertLabel();
    },
    blur_addsInput: function(t) {
        this.getInsertLabel();
    },
    getInsertLabel: function() {
        var a = this;
        a.data.lists;
        if (!a.data.addsInput) return wx.showToast({
            icon: "none",
            title: "请填写标签!",
            duration: 2e3
        }), !1;
        app.util.request({
            url: "entry/wxapp/insertLabel",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: a.data.id,
                label: a.data.addsInput
            },
            success: function(t) {
                t.data.errno || (a.setData({
                    addsInput: ""
                }), a.Labels());
            }
        });
    },
    lableclick: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            clickIndex: a
        });
    },
    lableclick2: function(t) {
        var a = t.currentTarget.dataset.name, e = this;
        app.util.request({
            url: "entry/wxapp/insertLabel",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: e.data.id,
                label: a
            },
            success: function(t) {
                t.data.errno || app.util.request({
                    url: "entry/wxapp/Labels",
                    cachetime: "30",
                    method: "POST",
                    data: {
                        target_id: e.data.id
                    },
                    success: function(t) {
                        t.data.errno || e.setData({
                            lists: t.data.data
                        });
                    }
                });
            }
        });
    },
    reduce: function(t) {
        var a = t.currentTarget.dataset.id, e = this;
        app.util.request({
            url: "entry/wxapp/DeleteLabel",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: e.data.id,
                id: a
            },
            success: function(t) {
                t.data.errno || app.util.request({
                    url: "entry/wxapp/Labels",
                    cachetime: "30",
                    method: "POST",
                    data: {
                        target_id: e.data.id
                    },
                    success: function(t) {
                        t.data.errno || e.setData({
                            lists: t.data.data
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), wx.stopPullDownRefresh(), this.oftenLabel(), this.Labels();
    },
    onReachBottom: function() {},
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {}
});