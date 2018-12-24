var _data, _echarts = require("../../../templates/ec-canvas/echarts"), echarts = _interopRequireWildcard(_echarts), _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _interopRequireWildcard(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: (_data = {
        globalData: [],
        tabList: [ {
            status: "browse",
            name: "浏览记录"
        }, {
            status: "follow",
            name: "跟进记录"
        }, {
            status: "analysis",
            name: "AI分析"
        } ],
        currentIndex: 0,
        currentTab: "browse",
        Customer: [],
        currEditInd: -1,
        toFolledit: "toSave",
        content: "",
        date: "",
        startDate: "",
        page: 1,
        dateindex: 0,
        dateindex2: 0
    }, _defineProperty(_data, "content", ""), _defineProperty(_data, "BrowseList", []), 
    _defineProperty(_data, "show", !1), _defineProperty(_data, "pageBrowse", 1), _defineProperty(_data, "moreBrowse", !0), 
    _defineProperty(_data, "isEmptyBrowse", !1), _defineProperty(_data, "followList", []), 
    _defineProperty(_data, "toFollowType", []), _defineProperty(_data, "page", 1), _defineProperty(_data, "more", !0), 
    _defineProperty(_data, "isEmpty", !1), _defineProperty(_data, "index1", "2"), _defineProperty(_data, "index2", "2"), 
    _defineProperty(_data, "Labellist", []), _defineProperty(_data, "errno", 0), _defineProperty(_data, "types", ""), 
    _defineProperty(_data, "ai_Interest", []), _defineProperty(_data, "ai_Interest_x", []), 
    _defineProperty(_data, "ai_Interest_y", []), _defineProperty(_data, "ai_active_x", []), 
    _defineProperty(_data, "ai_active_y", []), _defineProperty(_data, "ai_Interaction", []), 
    _defineProperty(_data, "setInterest", [ {
        name: "今日"
    }, {
        name: "近7天"
    }, {
        name: "近30天"
    }, {
        name: "本月"
    } ]), _defineProperty(_data, "interest", 2), _defineProperty(_data, "setActivity", [ {
        name: "近7天"
    }, {
        name: "近30天"
    } ]), _defineProperty(_data, "activity", 1), _defineProperty(_data, "setClient", [ {
        name: "今日"
    }, {
        name: "近7天"
    }, {
        name: "近30天"
    }, {
        name: "本月"
    }, {
        name: "全部"
    } ]), _defineProperty(_data, "client", 2), _defineProperty(_data, "firstTime", ""), 
    _defineProperty(_data, "RecordShow", !1), _defineProperty(_data, "vagueShow", !1), 
    _defineProperty(_data, "textValue", ""), _defineProperty(_data, "ec", {
        lazyLoad: !0
    }), _defineProperty(_data, "isShowFooter", !0), _data),
    onLoad: function(t) {
        app.util.showLoading(1), wx.hideShareMenu(), t.type && this.setData({
            types: t.type
        }), t.id && this.setData({
            id: t.id
        }), this.getDealDate(), this.getRate(), this.firsttime(), this.ifOK();
        var a = this;
        "browse" == a.data.currentTab ? (console.log("浏览记录"), a.setData({
            onPullDownRefreshBrowse: !0
        }), a.getBrowse()) : "follow" == a.data.currentTab ? (console.log("跟进记录"), a.setData({
            onPullDownRefresh: !0
        }), a.getFollow()) : "analysis" == a.data.currentTab && (console.log("AI分析"), a.setData({
            isShowFooter: !1
        }), a.getAnalysis());
        var e = new app.util.date(), o = (e.dateToLong(new Date()) / 1e3).toFixed(0);
        o = e.dateToStr("yyyy-MM-DD", e.longToDate(1e3 * o)), a.setData({
            startDate: o,
            globalData: app.globalData
        }), app.util.request({
            url: "entry/wxapp/Staff",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: a.data.id
            },
            success: function(t) {
                var e = t.data.data.avatarUrl;
                a.setData({
                    img2: e
                });
            }
        }), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function(t) {
        this.shuaxin(), this.biaoqian();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        app.util.showLoading(1);
        var t = this;
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(t, _index.baseModel, _xx_util2.default), 
        "browse" == t.data.currentTab && (t.setData({
            onPullDownRefreshBrowse: !0
        }), t.getBrowse()), "follow" == t.data.currentTab && (t.setData({
            onPullDownRefresh: !0
        }), t.getFollow()), wx.stopPullDownRefresh(), wx.hideLoading();
    },
    onReachBottom: function() {
        var t = this;
        console.log("触底"), app.util.showLoading(1), "browse" == t.data.currentTab ? (console.log(t.data.currentTab), 
        0 == t.data.isEmptyBrowse && (console.log(t.data.isEmptyBrowse), t.setData({
            pageBrowse: t.data.pageBrowse + 1
        }), t.getBrowse())) : "follow" == t.data.currentTab && 0 == t.data.isEmpty && (console.log(t.data.isEmpty), 
        t.setData({
            page: t.data.page + 1
        }), t.getFollow()), wx.hideLoading();
    },
    onPageScroll: function(t) {},
    onShareAppMessage: function(t) {},
    pickerSelected: function(t) {
        var e = this, a = t.currentTarget.dataset.status;
        "interest" == a ? (e.setData({
            interest: t.detail.value
        }), e.getInterest()) : "activity" == a ? (e.setData({
            activity: t.detail.value
        }), e.getActivity()) : "client" == a && (e.setData({
            client: t.detail.value
        }), e.getClientInteraction());
    },
    listenerDatePickerSelected: function(t) {
        var e = this, a = t.detail.value, o = a.split("-");
        e.setData({
            date: a,
            year: o[0],
            month: o[1],
            day: o[2],
            content: "将预计成交日期更改为" + a
        }), e.getDealDate(), e.adds();
    },
    getDealDate: function() {
        var o = this, t = {
            client_id: o.data.id
        };
        o.data.date && (t.date = o.data.date), app.util.request({
            url: "entry/wxapp/DealDate",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                if (console.log("entry/wxapp/DealDate ==> ", t), !t.data.errno && t.data.data.date) {
                    var e = t.data.data.date, a = e.split("-");
                    o.setData({
                        date: e,
                        year: a[0],
                        month: a[1],
                        day: a[2]
                    });
                }
            }
        });
    },
    getRate: function() {
        var e = this, t = {
            client_id: e.data.id
        };
        app.util.request({
            url: "entry/wxapp/Rate",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                console.log("entry/wxapp/Rate ==> ", t), t.data.errno || e.setData({
                    rate: t.data.data.rate
                });
            }
        });
    },
    Edit: function(t) {
        wx.navigateTo({
            url: "/longbing_card/staff/custom/editInfo/editInfo?id=" + this.data.id
        });
    },
    addslables: function(t) {
        wx.navigateTo({
            url: "/longbing_card/staff/custom/tag/tag?id=" + this.data.id
        });
    },
    addsRecord: function(t) {
        this.setData({
            RecordShow: !0,
            vagueShow: !0,
            content: ""
        });
    },
    textValue: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    cancel: function(t) {
        this.setData({
            RecordShow: !1,
            vagueShow: !1,
            textValue: "",
            content: ""
        });
    },
    adds: function(t) {
        var e = this;
        if (e.setData({
            RecordShow: !1,
            vagueShow: !1
        }), "toSave" == e.data.toFolledit) {
            var a = {
                client_id: this.data.id,
                content: this.data.content
            };
            -1 < e.data.content.indexOf("将预计成交日期更改为") && (a.type = 2), app.util.request({
                url: "entry/wxapp/followInsert",
                cachetime: "30",
                method: "POST",
                data: a,
                success: function(t) {
                    t.data.errno || (e.setData({
                        page: 1,
                        currentIndex: 1,
                        currentTab: "follow",
                        onPullDownRefresh: !0
                    }), e.getFollow(), e.setData({
                        content: ""
                    }));
                }
            });
        } else e.getFollowEdit();
    },
    index99: function(t) {
        this.setData({
            RecordShow: !1,
            vagueShow: !1,
            textValue: ""
        });
    },
    BottomOK: function(t) {
        var e = this;
        1 == e.data.errno ? app.util.request({
            url: "entry/wxapp/Deal",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: e.data.id
            },
            success: function(t) {
                t.data.errno || e.setData({
                    errno: 0
                });
            }
        }) : 0 == e.data.errno && app.util.request({
            url: "entry/wxapp/CancelDeal",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: e.data.id
            },
            success: function(t) {
                console.log("entry/wxapp/DealDate ==> ", t), t.data.errno || e.setData({
                    errno: 1
                });
            }
        }), e.setData({
            onPullDownRefresh: !0
        }), e.getFollow();
    },
    ifOK: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/CheckDeal",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: this.data.id
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = "未成交" == t.data.message ? "1" : "0";
                    a.setData({
                        errno: e
                    });
                }
            }
        });
    },
    init_bar: function(t) {
        var n = this;
        "1" == t && this.barComponent.init(function(t, e, a) {
            var o = echarts.init(t, null, {
                width: e,
                height: a
            });
            return o.setOption(n.getBarOption()), o;
        }), "2" == t && this.barComponent2.init(function(t, e, a) {
            var o = echarts.init(t, null, {
                width: e,
                height: a
            });
            return o.setOption(n.getBarOption2()), o;
        });
    },
    getBarOption: function() {
        return {
            legend: {
                orient: "vertical",
                top: "10%",
                right: "10%",
                data: this.data.ai_Interest_x
            },
            series: [ {
                type: "pie",
                center: [ "30%", "40%" ],
                radius: [ "40%", "60%" ],
                avoidLabelOverlap: !1,
                label: {
                    normal: {
                        show: !1,
                        position: "center"
                    }
                },
                data: this.data.ai_Interest_y
            } ]
        };
    },
    getBarOption2: function() {
        var t;
        return {
            grid: {
                left: "15%",
                right: "15%",
                top: "10%",
                bottom: "15%"
            },
            xAxis: (t = {
                type: "category",
                minInterval: "100",
                boundaryGap: !1
            }, _defineProperty(t, "minInterval", "1"), _defineProperty(t, "data", this.data.ai_active_x), 
            _defineProperty(t, "axisLabel", {
                showMinLabel: !0
            }), t),
            yAxis: {
                type: "value"
            },
            series: [ {
                symbol: "none",
                data: this.data.ai_active_y,
                type: "line",
                areaStyle: {
                    color: "#e89e9e"
                }
            } ]
        };
    },
    getBrowse: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/clientView",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: i.data.id,
                page: i.data.pageBrowse
            },
            success: function(t) {
                var e = t.data.data.list;
                if (0 == e.length) return i.setData({
                    moreBrowse: !1,
                    loading: !1,
                    isEmptyBrowse: !0,
                    show: !0
                }), !1;
                i.setData({
                    loading: !0
                });
                var a = i.data.BrowseList;
                1 == i.data.onPullDownRefreshBrowse && (a = []);
                var o = new app.util.date();
                for (var n in e) e[n].create_time && e[n].create_time.length < 12 && (e[n].create_time = o.dateToStr("MM-DD HH:mm", o.longToDate(1e3 * e[n].create_time))), 
                "praise" == e[n].sign && 2 == e[n].type && (1 == e[n].count && (e[n].countText = "，TA正在了解你"), 
                2 != e[n].count && 3 != e[n].count && 4 != e[n].count || (e[n].countText = "，你成功的吸引了TA"), 
                4 < e[n].count && (e[n].countText = "，高意向客户立刻主动沟通")), "view" == e[n].sign && (1 == e[n].type && (1 == e[n].count && (e[n].countText = "，尽快把握商机"), 
                2 == e[n].count && (e[n].countText = "，潜在购买客户"), 3 == e[n].count && (e[n].countText = "，高意向客户成交在望"), 
                3 < e[n].count && (e[n].countText = "，购买欲望强烈")), 3 != e[n].type && 6 != e[n].type || (2 == e[n].count && (e[n].countText = "，赶快主动沟通"), 
                2 < e[n].count && (e[n].countText = "，高意向客户成交在望")), 6 == e[n].type && 1 == e[n].count && (e[n].countText = "，看来TA对公司感兴趣")), 
                a.push(e[n]);
                i.setData({
                    BrowseList: a,
                    onPullDownRefreshBrowse: !1
                });
            }
        });
    },
    getFollow: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/followList",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: s.data.id,
                page: s.data.page
            },
            success: function(t) {
                if (console.log("entry/wxapp/followList ==> ", t), !t.data.errno) {
                    var e = t.data.data.list;
                    if (0 == e.length) return s.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    s.setData({
                        loading: !0
                    });
                    var a = s.data.followList;
                    1 == s.data.onPullDownRefresh && (a = []);
                    var o = new app.util.date();
                    for (var n in e) e[n].create_time && e[n].create_time.length < 12 && (e[n].create_time = o.dateToStr("MM-DD HH:mm", o.longToDate(1e3 * e[n].create_time))), 
                    a.push(e[n]);
                    var i = s.data.toFollowType;
                    for (var r in a) i.push(0);
                    s.setData({
                        followList: a,
                        toFollowType: i,
                        onPullDownRefresh: !1
                    });
                }
            }
        });
    },
    getInterest: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Interest",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: this.data.id,
                type: 1 * n.data.interest + 1
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data;
                    console.log(e);
                    var a = [], o = [];
                    e.qr && (a.push("名片" + e.qr.count + "(" + e.qr.rate + "%)"), o.push({
                        value: e.qr.count,
                        name: "名片" + e.qr.count + "(" + e.qr.rate + "%)"
                    })), e.timeline && (a.push("动态" + e.timeline.count + "(" + e.timeline.rate + "%)"), 
                    o.push({
                        value: e.timeline.count,
                        name: "动态" + e.timeline.count + "(" + e.timeline.rate + "%)"
                    })), e.goods && (a.push("产品" + e.goods.count + "(" + e.goods.rate + "%)"), o.push({
                        value: e.goods.count,
                        name: "产品" + e.goods.count + "(" + e.goods.rate + "%)"
                    })), e.custom_qr && (a.push("自定义码" + e.custom_qr.count + "(" + e.custom_qr.rate + "%)"), 
                    o.push({
                        value: e.custom_qr.count,
                        name: "自定义码" + e.custom_qr.count + "(" + e.custom_qr.rate + "%)"
                    })), n.setData({
                        ai_Interest_x: a,
                        ai_Interest_y: o
                    }), n.barComponent = n.selectComponent("#mychart"), n.init_bar("1");
                }
            }
        });
    },
    getActivity: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Activity",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: this.data.id,
                type: 1 * n.data.activity + 1
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data.reverse(), a = [], o = [];
                    e.forEach(function(t) {
                        var e = t.date;
                        a.push(e.slice(5)), o.push(t.count);
                    }), n.setData({
                        ai_active_x: a,
                        ai_active_y: o
                    }), n.barComponent2 = n.selectComponent("#mychart2"), n.init_bar("2");
                }
            }
        });
    },
    getClientInteraction: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/clientInteraction",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: this.data.id,
                type: 1 * n.data.client + 1
            },
            success: function(t) {
                if (!t.data.errno) {
                    var e = t.data.data;
                    for (var a in e) {
                        var o = parseInt(e[a].rate / 100 * 200);
                        e[a].width = o;
                    }
                    n.setData({
                        ai_Interaction: e
                    });
                }
            }
        });
    },
    getAnalysis: function() {
        this.getInterest(), this.getActivity(), this.getClientInteraction();
    },
    shuaxin: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/clientInfo",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: a.data.id
            },
            success: function(t) {
                if (console.log("entry/wxapp/clientInfo ==>", t), !t.data.errno) {
                    var e = t.data.data;
                    "1" == e.is_new ? e.value1 = "新客户" : "2" == e.is_new ? e.value1 = "跟进中" : "3" == e.is_new && (e.value1 = "已成交"), 
                    a.setData({
                        Customer: e
                    });
                }
            }
        });
    },
    firsttime: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/firstTime",
            cachetime: "30",
            method: "POST",
            data: {
                client_id: this.data.id
            },
            success: function(t) {
                t.data.errno || e.setData({
                    firstTime: t.data.data.time
                });
            }
        });
    },
    biaoqian: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Labels",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: e.data.id
            },
            success: function(t) {
                t.data.errno || e.setData({
                    Labellist: t.data.data
                });
            }
        });
    },
    qq: function() {
        var a = this.data.id, o = this.data.Customer.nickName, n = this.data.Customer.avatarUrl;
        this.data.Customer.phone;
        app.util.request({
            url: "entry/wxapp/Staff",
            cachetime: "30",
            method: "POST",
            data: {
                target_id: this.data.id
            },
            success: function(t) {
                var e = t.data.data.avatarUrl;
                wx.navigateTo({
                    url: "/longbing_card/chat/staffChat/staffChat?chat_to_uid=" + a + "&contactUserName=" + o + "&chatAvatarUrl=" + n + "&toChatAvatarUrl=" + e
                });
            }
        });
    },
    getFollowEdit: function() {
        var n = this, t = {
            id: n.data.toFolledit,
            content: n.data.content
        };
        app.util.request({
            url: "entry/wxapp/FollowUpdate",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                if (console.log("entry/wxapp/FollowUpdate ==> ", t), !t.data.errno) {
                    wx.showToast({
                        icon: "none",
                        title: "已成功修改跟进记录！",
                        duration: 1e3
                    });
                    var e = n.data.followList, a = n.data.toFolledit;
                    for (var o in e) a == e[o].id && (e[o].content = n.data.content);
                    n.setData({
                        followList: e,
                        toFolledit: "toSave",
                        currEditInd: "-1",
                        content: ""
                    });
                }
            }
        });
    },
    getFollowDelete: function(a) {
        var o = this, t = {
            id: o.data.followList[a].id
        };
        app.util.request({
            url: "entry/wxapp/FollowDelete",
            cachetime: "30",
            method: "POST",
            data: t,
            success: function(t) {
                if (console.log("entry/wxapp/FollowDelete ==> ", t), !t.data.errno) {
                    wx.showToast({
                        icon: "none",
                        title: "已成功删除跟进记录！",
                        duration: 1e3
                    });
                    var e = o.data.followList;
                    e.splice(a, 1), o.setData({
                        followList: e
                    });
                }
            }
        });
    },
    toJump: function(t) {
        var e = this, a = t.currentTarget.dataset.status, o = t.currentTarget.dataset.index, n = t.currentTarget.dataset.type, i = t.currentTarget.dataset.content;
        if ("toCopyright" == a && app.util.goUrl(t), "toCall" == a) {
            if (console.log("联系客户"), !i) return !1;
            wx.makePhoneCall({
                phoneNumber: i,
                success: function(t) {
                    app.globalData.to_uid != wx.getStorageSync("userid") && e.toCopyRecord(n);
                }
            });
        } else if ("toFollowEdit" == a) {
            var r;
            console.log("编辑");
            var s = e.data.toFollowType;
            1 == n && (r = "-1", s[o] = 0), 0 == n && (s[r = o] = 1), e.setData({
                currEditInd: r,
                toFollowType: s
            });
        } else "toFolledit" == a ? (console.log("修改"), e.addsRecord(), e.setData({
            toFolledit: e.data.followList[o].id,
            content: e.data.followList[o].content
        })) : "toFolldelete" == a && (console.log("删除"), e.getFollowDelete(o));
    },
    formSubmit: function(t) {
        var e = this, a = t.detail.formId, o = t.detail.target.dataset.index, n = t.detail.target.dataset.status;
        e.toSaveFormIds(a);
        var i = !0;
        "analysis" == n && (i = !1), e.setData({
            currentIndex: o,
            currentTab: n,
            isShowFooter: i
        }), app.util.showLoading(1), "browse" == n ? (console.log("浏览记录"), e.setData({
            onPullDownRefreshBrowse: !0
        }), e.getBrowse()) : "follow" == n ? (console.log("跟进记录"), e.setData({
            onPullDownRefresh: !0
        }), e.getFollow()) : "analysis" == n && (console.log("AI分析"), e.getAnalysis()), 
        wx.hideLoading();
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