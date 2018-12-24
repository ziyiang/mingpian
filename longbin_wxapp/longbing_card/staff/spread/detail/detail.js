var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), echarts = require("../../../templates/ec-canvas/echarts"), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        setCount: [ {
            name: "今日"
        }, {
            name: "近7天"
        }, {
            name: "近30天"
        }, {
            name: "本月"
        } ],
        count: 2,
        classify: 2,
        interaction: 2,
        opengid: "",
        orderType: "time",
        showAddUseSec: !1,
        groupPeople: {},
        groupRandData: [],
        setFunnelOption: {
            legend: [],
            data: []
        },
        setPieOption: {
            legend: [],
            data: []
        }
    },
    onLoad: function(t) {
        app.util.showLoading(1);
        var e = this;
        wx.hideShareMenu(), t.opengid && e.setData({
            opengid: t.opengid
        }), wx.hideShareMenu(), e.getGroupPeople(), e.getTurnoverRate(), e.getInteraction(), 
        e.getGroupRank(), e.barComponent = e.selectComponent("#mychart"), e.barComponent2 = e.selectComponent("#mychart2"), 
        wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {
        this.getTurnoverRate();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(t, _index.baseModel, _xx_util2.default), 
        t.getGroupPeople(), t.getTurnoverRate(), t.getInteraction(), t.getGroupRank();
    },
    onReachBottom: function() {},
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {},
    pickerSelected: function(t) {
        var e = this, a = t.currentTarget.dataset.status;
        "count" == a ? (e.setData({
            count: t.detail.value
        }), e.getTurnoverRate()) : "classify" == a ? (e.setData({
            classify: t.detail.value
        }), e.getInteraction()) : "interaction" == a && (e.setData({
            interaction: t.detail.value
        }), e.getGroupRank());
    },
    toJump: function(t) {
        var e = t.currentTarget.dataset.status;
        "toCopyright" == e ? app.util.goUrl(t) : "toEditNum" == e && (console.log("输入群成员数"), 
        app.util.goUrl(t));
    },
    checkOrderType: function(t) {
        var e = t.currentTarget.dataset.status;
        this.setData({
            orderType: e
        }), this.getGroupRank();
    },
    getGroupPeople: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/groupPeople",
            cachetime: "30",
            method: "POST",
            data: {
                openGId: i.data.opengid
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data, a = (new app.util.date().dateToLong(new Date()) / 1e3).toFixed(0);
                    if (e.last_time = parseInt(e.last_time), console.log(e.last_time, " tmpData.last_time"), 
                    e.last_time) {
                        console.log("11111111111", e.last_time, a, a - e.last_time), e.last_time = a - e.last_time, 
                        console.log("22222222222", e.last_time, a, a - e.last_time);
                        var n = parseInt(e.last_time / 86400), o = parseInt(e.last_time / 3600);
                        0 < n ? (e.last_time = n, e.last_time_text = "天前互动") : 0 < o ? (e.last_time = o, 
                        e.last_time_text = "小时前互动") : (e.last_time = "", e.last_time_text = "暂无互动");
                    } else e.last_time = "", e.last_time_text = "暂无互动";
                    i.setData({
                        groupPeople: e
                    });
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getTurnoverRate: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/turnoverRate",
            cachetime: "30",
            method: "POST",
            data: {
                openGId: a.data.opengid,
                type: 1 * a.data.count + 1
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data;
                    a.setData({
                        setFunnelOption: e
                    }), a.init_funnel();
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getInteraction: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/interaction",
            cachetime: "30",
            method: "POST",
            data: {
                openGId: n.data.opengid,
                type: 1 * n.data.classify + 1
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data, a = {
                        legend: [],
                        data: []
                    };
                    wx.getStorageSync("setPieOption") && (a = wx.getStorageSync("setPieOption"), a = {
                        legend: [],
                        data: []
                    }), 0 != e.goods.count && (a.legend.push("产品" + e.goods.count + "(" + e.goods.rate + "%)"), 
                    a.data.push({
                        value: e.goods.rate,
                        name: "产品" + e.goods.count + "(" + e.goods.rate + "%)"
                    })), 0 != e.timeline.count && (a.legend.push("动态" + e.timeline.count + "(" + e.timeline.rate + "%)"), 
                    a.data.push({
                        value: e.timeline.rate,
                        name: "动态" + e.timeline.count + "(" + e.timeline.rate + "%)"
                    })), 0 != e.card.count && (a.legend.push("名片" + e.card.count + "(" + e.card.rate + "%)"), 
                    a.data.push({
                        value: e.card.rate,
                        name: "名片" + e.card.count + "(" + e.card.rate + "%)"
                    })), 0 != e.qr.count && (a.legend.push("名片码" + e.qr.count + "(" + e.qr.rate + "%)"), 
                    a.data.push({
                        value: e.qr.rate,
                        name: "名片码" + e.qr.count + "(" + e.qr.rate + "%)"
                    })), 0 != e.custom_qr.count && (a.legend.push("自定义码" + e.custom_qr.count + "(" + e.custom_qr.rate + "%)"), 
                    a.data.push({
                        value: e.custom_qr.rate,
                        name: "自定义码" + e.goods.count + "(" + e.custom_qr.rate + "%)"
                    })), 0 == a.legend.length && (a.legend.push("暂无互动数据"), a.data.push({
                        value: 100,
                        name: "暂无互动数据"
                    })), n.setData({
                        setPieOption: a
                    }), n.init_pie();
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    getGroupRank: function() {
        var r = this;
        app.util.request({
            url: "entry/wxapp/GroupRank",
            cachetime: "30",
            method: "POST",
            data: {
                type: 1 * r.data.interaction + 1,
                order: r.data.orderType,
                openGId: r.data.opengid
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data, a = (new app.util.date().dateToLong(new Date()) / 1e3).toFixed(0);
                    for (var n in e) if (e[n].update_time) {
                        e[n].update_time = a - e[n].update_time;
                        var o = parseInt(e[n].update_time / 86400), i = parseInt(e[n].update_time / 3600);
                        e[n].update_time = 0 < o ? o + "天前互动" : 0 < i ? i + "小时前互动" : "";
                    } else e[n].update_time = "";
                    r.setData({
                        groupRandData: e
                    }), r.init_funnel();
                }
            },
            fail: function(t) {
                console.log("fail ==> ", t);
            }
        });
    },
    init_funnel: function() {
        var o = this;
        o.barComponent.init(function(t, e, a) {
            var n = echarts.init(t, null, {
                width: e,
                height: a
            });
            return n.setOption(o.getFunnelOption()), n;
        });
    },
    init_pie: function() {
        var o = this;
        o.barComponent2.init(function(t, e, a) {
            var n = echarts.init(t, null, {
                width: e,
                height: a
            });
            return n.setOption(o.getPieOption()), n;
        });
    },
    getFunnelOption: function() {
        var t = this;
        return {
            backgroundColor: "#ffffff",
            color: [ "#37a2da", "#32c4e9", "#66e0e3", "#91f2de", "#fedb5b" ],
            calculable: !0,
            series: [ {
                name: "推广统计",
                type: "funnel",
                left: "10%",
                top: 20,
                bottom: 40,
                width: "60%",
                height: "80%",
                min: 20,
                max: 100,
                minSize: "20%",
                maxSize: "100%",
                sort: "descending",
                gap: 2,
                data: [ {
                    value: 100,
                    name: "群成员数" + t.data.setFunnelOption.number
                }, {
                    value: 80,
                    name: "引流人数" + t.data.setFunnelOption.users
                }, {
                    value: 60,
                    name: "咨询人数" + t.data.setFunnelOption.chats
                }, {
                    value: 40,
                    name: "跟进人数" + t.data.setFunnelOption.follows
                }, {
                    value: 20,
                    name: "成交人数" + t.data.setFunnelOption.deals
                } ]
            } ]
        };
    },
    getPieOption: function() {
        return {
            legend: {
                orient: "vertical",
                top: "10%",
                right: "10%",
                data: this.data.setPieOption.legend
            },
            series: [ {
                name: "互动分类",
                type: "pie",
                center: [ "30%", "47%" ],
                radius: [ "55%", "75%" ],
                avoidLabelOverlap: !1,
                label: {
                    normal: {
                        show: !1,
                        position: "center"
                    }
                },
                data: this.data.setPieOption.data
            } ]
        };
    }
});