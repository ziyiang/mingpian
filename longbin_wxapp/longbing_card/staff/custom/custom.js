var _echarts = require("../../templates/ec-canvas/echarts"), echarts = _interopRequireWildcard(_echarts), _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _interopRequireWildcard(t) {
    if (t && t.__esModule) return t;
    var a = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
    return a.default = t, a;
}

var app = getApp(), getAppGlobalData = require("../../templates/copyright/copyright.js");

Page({
    data: {
        globalData: {},
        Unchanged: [],
        avatarUrl: "",
        old: [],
        ec: {
            lazyLoad: !0
        },
        tabList: [ {
            status: "customer",
            name: "新增客户"
        }, {
            status: "follow",
            name: "跟进中"
        }, {
            status: "deal",
            name: "已成交"
        } ],
        currentIndex: 0,
        lists: [],
        pages: 1,
        total_page: "",
        typeindex: 1,
        echartslist: [],
        echartsdata: [ {
            value: "6",
            name: ""
        }, {
            value: "4",
            name: ""
        }, {
            value: "2",
            name: ""
        } ],
        Record: !1,
        Record_label: "0",
        Record_blur: "0",
        Record_input_value: "",
        Record_list: [],
        more: !0,
        loading: !1,
        show: !1
    },
    toJump: function(t) {
        if ("toCopyright" == t.currentTarget.dataset.status) app.util.goUrl(t); else {
            var a = t.currentTarget.dataset.id, e = void 0;
            e = 0 == this.data.currentIndex ? "新客户" : 1 == this.data.currentIndex ? "跟进中" : "已完成", 
            wx.navigateTo({
                url: "/longbing_card/staff/custom/detail/detail?id=" + a + "&&type=" + e
            });
        }
    },
    PostRequest: function(t, a, e) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/" + t,
            cachetime: "30",
            method: "POST",
            data: {
                page: a,
                type: e
            },
            success: function(t) {
                if (!t.data.errno) {
                    var a = t.data.data.list;
                    if (a) {
                        var e = Date.parse(new Date());
                        e = e.toString().substring(0, 10);
                        var s = o.data.lists;
                        for (var i in 1 == o.data.onPullDownRefresh && (s = []), a) if (0 < a[i].last_time) {
                            var r = (e - a[i].last_time) / 86400;
                            1 < r ? a[i].days = parseInt(r) : a[i].hours = parseInt(24 * r), s.push(a[i]);
                        } else s.push(a[i]);
                        o.setData({
                            lists: s,
                            total_page: t.data.data.total_page,
                            onPullDownRefresh: !1
                        });
                    } else o.setData({
                        more: !1,
                        loading: !1,
                        show: !0
                    });
                }
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        app.util.showLoading(1), getAppGlobalData.getAppGlobalData(a, _index.baseModel, _xx_util2.default), 
        wx.hideShareMenu(), a.PostRequest("clientList", this.data.pages, this.data.typeindex);
        for (var e = 0; e < this.total_page + 1; e++) a.data.lists.length < 7 ? a.onReachBottom() : e = this.total_page + 1;
        this.data.page;
        app.util.request({
            url: "entry/wxapp/Staff",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                a.setData({
                    job_id: t.data.data.info.job_id
                });
            }
        }), a.getTurnoverRateTotal(), wx.hideLoading();
    },
    getTurnoverRateTotal: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/turnoverRateTotal",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                if (!t.data.errno) {
                    var a = t.data.data;
                    console.log(t.data.data), 1 == n.data.onPullDownRefresh && n.setData({
                        echartslist: [],
                        echartsdata: []
                    });
                    var e = n.data.echartslist, s = [];
                    s.push(a.deals), s.push(a.follows), s.push(a.users);
                    var i = [];
                    i.push(60), i.push(80), i.push(100);
                    var r = [ "成交数量:", "跟进数量:", "总用户数:" ];
                    for (var o in r) e.push({
                        name: r[o] + s[o],
                        value: i[o]
                    });
                    n.setData({
                        echartsdata: e
                    }), n.barComponent = n.selectComponent("#mychart"), n.init_bar();
                }
            }
        });
    },
    searchclick: function(t) {
        var a = wx.getStorageSync(this.data.job_id);
        a && this.setData({
            old: a
        }), this.setData({
            Record: !0
        });
        var e = this;
        app.util.request({
            url: "entry/wxapp/oftenLabel",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(t) {
                t.data.errno || e.setData({
                    Unchanged: t.data.data
                });
            }
        });
    },
    searchover: function(t) {
        this.setData({
            Record: !1,
            Record_label: "0",
            Record_blur: "0",
            Record_input_value: "",
            moreSearch: !0,
            isEmptySearch: !1,
            showSearch: !1
        });
    },
    Record_focuse: function(t) {
        this.setData({
            Record_label: "1",
            Record_list: []
        });
    },
    Record_blur: function(a) {
        var t = this;
        if (a.detail.value) {
            var e = t.data.old;
            if (e[0]) {
                var s = !1;
                e.forEach(function(t) {
                    t == a.detail.value && (s = !0);
                }), s || (e.length < 3 ? e.push(a.detail.value) : (e.push(a.detail.value), e = e.slice(-3)));
            } else e.push(a.detail.value);
            wx.setStorageSync(t.data.job_id, e), this.setData({
                Record_input_value: a.detail.value,
                Record_blur: "1",
                Record_label: "1",
                old: e
            });
            var i = a.detail.value;
            t.toGetSearchList(i);
        } else this.setData({
            Record_label: "0",
            Record_list: []
        });
    },
    clickUnchanged: function(t) {
        console.log(t), this.setData({
            Record_input_value: t.currentTarget.dataset.name,
            Record_blur: "1",
            Record_label: "1"
        });
        var a = t.currentTarget.dataset.name;
        this.toGetSearchList(a);
    },
    toGetSearchList: function(t) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/search",
            cachetime: "30",
            method: "POST",
            data: {
                type: "1",
                keyword: t
            },
            success: function(t) {
                if (console.log("entry/wxapp/aiTime ==>", t), !t.data.errno) {
                    var a = t.data.data;
                    if (0 == a.length) return s.setData({
                        moreSearch: !1,
                        isEmptySearch: !0,
                        showSearch: !0
                    }), !1;
                    var e = s.data.Record_list;
                    e = a.data, s.setData({
                        Record_list: e
                    });
                }
            }
        });
    },
    init_bar: function() {
        var i = this;
        this.barComponent.init(function(t, a, e) {
            var s = echarts.init(t, null, {
                width: a,
                height: e
            });
            return s.setOption(i.getBarOption()), s;
        });
    },
    getBarOption: function() {
        var t = this.data.echartslist, a = this.data.echartsdata.reverse();
        return {
            legend: {
                data: t,
                top: "10"
            },
            color: [ "#91c7ae", "#d48265", "#c23531" ],
            calculable: !0,
            funnelAlign: "left",
            series: [ {
                name: "漏斗图",
                type: "funnel",
                top: "50",
                bottom: "20",
                left: "20%",
                min: 40,
                max: 100,
                minSize: "40%",
                maxSize: "100%",
                width: "60%",
                sort: "descending",
                legendHoverLink: !0,
                gap: 2,
                label: {
                    normal: {
                        show: !0,
                        position: "inside"
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: a
            } ]
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            pages: 1,
            onPullDownRefresh: !0
        }), this.getTurnoverRateTotal(), this.PostRequest("clientList", this.data.pages, this.data.typeindex), 
        wx.showNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var t = this.data.pages;
        ++t > this.data.total_page ? this.setData({
            more: !1,
            loading: !1,
            show: !0
        }) : (this.setData({
            pages: t
        }), this.PostRequest("clientList", this.data.pages, this.data.typeindex));
    },
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {},
    formSubmit: function(t) {
        this.setData({
            pages: 1,
            lists: []
        });
        t.detail.formId;
        var a = t.detail.target.dataset.index, e = t.detail.target.dataset.status;
        this.setData({
            currentIndex: a
        }), "customer" == e ? (this.setData({
            typeindex: 1
        }), this.PostRequest("clientList", this.data.pages, this.data.typeindex)) : "follow" == e ? (this.setData({
            typeindex: 2
        }), this.PostRequest("clientList", this.data.pages, this.data.typeindex)) : "deal" == e ? (this.setData({
            typeindex: 3
        }), this.PostRequest("clientList", this.data.pages, this.data.typeindex)) : "toHome" == e && (console.log("返回首页"), 
        wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + wx.getStorageSync("userid") + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard"
        }));
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
            }
        });
    }
});