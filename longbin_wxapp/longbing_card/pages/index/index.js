var _data, _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function _toConsumableArray(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var timer, timerClientUnread, app = getApp(), auth = require("../../templates/auth/auth.js"), voucher = require("../../templates/voucher/voucher.js"), Fly = require("../../resource/js/wx.js"), fly = new Fly(), innerAudioContext = wx.createInnerAudioContext();

Page({
    data: (_data = {
        globalData: {},
        userid: "",
        authStatus: 400,
        showTabBar: !1,
        currentTabBarInd: "",
        currentTabBar: "cardList",
        toLeavingMessage: "",
        qrImg: "",
        avatarUrl: "",
        avatarName: "",
        customID: "",
        collectStatus: "-1",
        collectionList: {
            page: 1,
            total_page: "",
            list: []
        },
        paramCardList: {
            page: 1
        },
        refreshCardList: !1,
        loadingCardList: !0,
        paramCardIndex: {
            form_id: "",
            to_uid: ""
        },
        moreStatus: 2,
        playPushStatus: 1,
        showShareStatus: 0,
        cardZanType: "",
        cardIndexData: {},
        refreshCardIndex: !1,
        activeIndex: 100000101,
        paramShop: {
            page: 1,
            type_id: 0
        },
        refreshShop: !1,
        loadingShop: !0,
        shop_all: {
            page: 1,
            total_page: "",
            list: []
        },
        paramNews: {
            page: 1,
            to_uid: ""
        }
    }, _defineProperty(_data, "refreshShop", !1), _defineProperty(_data, "loadingShop", !0), 
    _defineProperty(_data, "newsList", {
        page: 1,
        total_page: "",
        list: []
    }), _defineProperty(_data, "newsIndex", []), _defineProperty(_data, "evaStatus", !1), 
    _defineProperty(_data, "currentNewsIndex", ""), _defineProperty(_data, "evaContent", ""), 
    _defineProperty(_data, "ThumbsId", ""), _defineProperty(_data, "evaId", ""), _defineProperty(_data, "swiperStatus", {
        indicatorDots: !1,
        autoplay: !0
    }), _defineProperty(_data, "swiperIndexCur", 0), _defineProperty(_data, "refreshCompany", !1), 
    _defineProperty(_data, "icon_voice_png", "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/IgvvwVNUIVn6UMh4Dmh4m6nM4Widug.png"), 
    _defineProperty(_data, "icon_voice_gif", "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/CRFPPPTKf6f45J6H3N44BNCrjbFZxH.gif"), 
    _data),
    onLoad: function(a) {
        var t = this;
        app.util.showLoading(1), console.log("options  index1111111111111************", a);
        var e = !1, o = "cardList";
        (wx.hideShareMenu(), a.currentTabBar && (e = !0, "cardList" == a.currentTabBar && (e = !1), 
        o = a.currentTabBar, "toCard" == a.currentTabBar ? (wx.setNavigationBarTitle({
            title: "名片"
        }), wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {
                console.log("shareMenu share success"), console.log("分_享" + a);
            },
            fail: function(a) {
                console.log(a);
            }
        })) : "toShop" == a.currentTabBar ? (wx.showShareMenu(), wx.setNavigationBarTitle({
            title: "商城"
        })) : "toNews" == a.currentTabBar ? (wx.showShareMenu(), wx.setNavigationBarTitle({
            title: "动态"
        })) : "toCompany" == a.currentTabBar && (wx.showShareMenu(), wx.setNavigationBarTitle({
            title: "官网"
        }))), wx.getStorageSync("user")) && (wx.getStorageSync("user").phone && (app.globalData.hasClientPhone = !0, 
        t.setData({
            "globalData.hasClientPhone": !0
        })));
        var n = {}, r = t.data, i = r.paramNews, s = r.paramCardIndex;
        a.to_uid && (n.to_uid = a.to_uid, i.to_uid = a.to_uid, s.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), 
        a.from_id && (n.from_id = a.from_id, s.from_id = a.from_id, app.globalData.from_id = a.from_id);
        var l = getCurrentPages();
        if (l.length && (l = l[getCurrentPages().length - 1]) && l.__route__ && (n.pageMUrl = "&m=" + l.__route__.split("/")[0]), 
        a.custom) {
            var d = a.custom;
            t.getCustomQrRecordInsert(d);
        }
        getApp().getConfigInfo().then(function() {
            t.setData({
                showTabBar: e,
                currentTabBar: o,
                paramData: n,
                paramNews: i,
                paramCardIndex: s,
                globalData: app.globalData
            }, function() {
                setTimeout(function() {
                    "cardList" != t.data.currentTabBar && t.getCardIndexData(), "cardList" == t.data.currentTabBar ? t.setData({
                        collectionList: {
                            page: 1,
                            total_page: "",
                            list: []
                        }
                    }, function() {
                        t.getCollectionList();
                    }) : "toCard" == t.data.currentTabBar ? 1044 == app.globalData.loginParam.scene && (timer = setInterval(function() {
                        app.globalData.encryptedData && t.toGetShareInfo();
                    }, 1e3)) : "toShop" == t.data.currentTabBar ? t.getShopTypes() : "toNews" == t.data.currentTabBar ? t.getNewsList() : "toCompany" == t.data.currentTabBar && t.getModular();
                }, 300);
            });
        }), timerClientUnread = setInterval(function() {
            t.data.clientUnread < app.globalData.clientUnread && (app.globalData.clientUnreadImg = !0, 
            t.setData({
                "globalData.clientUnreadImg": !0,
                clientUnread: app.globalData.clientUnread
            }), setTimeout(function() {
                app.globalData.clientUnreadImg = !1, t.setData({
                    "globalData.clientUnreadImg": !1
                });
            }, 3e3));
        }, 1e4);
    },
    onReady: function() {},
    onShow: function() {
        var n = this, a = n.data.currentTabBar, t = n.data.globalData.tabBarList;
        for (var e in t) a == t[e].type && n.setData({
            currentTabBarInd: e
        });
        console.log("onshow   carlist ", a), "createCard" == n.data.onshowStatus && (app.globalData.configInfo = !1, 
        getApp().getConfigInfo().then(function() {
            n.setData({
                showTabBar: !1,
                shop_all: {
                    page: 1,
                    total_page: "",
                    list: []
                },
                company_company: {},
                company_modular: [],
                globalData: app.globalData,
                collectionList: {
                    page: 1,
                    total_page: "",
                    list: []
                },
                onshowStatus: ""
            }, function() {
                n.getCollectionList();
            });
        }));
        var o = {
            to_uid: app.globalData.to_uid
        };
        _index.baseModel.getClientUnread(o).then(function(a) {
            var t = a.data.count, e = t.staff_count, o = t.user_count;
            n.setData({
                clientUnread: o,
                "globalData.clientUnread": o
            }, function() {
                app.globalData.badgeNum = e, app.globalData.clientUnread = o, app.globalData.clientUnread < o && (app.globalData.clientUnreadImg = !0, 
                setTimeout(function() {
                    app.globalData.clientUnreadImg = !1;
                }, 2e3));
            });
        }), n.checkAuthStatus();
    },
    onHide: function() {
        clearInterval(timer), clearInterval(timerClientUnread), console.log("onHide ==> timer timerClientUnread");
    },
    onUnload: function() {
        clearInterval(timer), clearInterval(timerClientUnread), console.log("onUnload ==> timer timerClientUnread");
    },
    onPullDownRefresh: function() {
        var a = this;
        wx.getStorageSync("user") || a.checkAuthStatus();
        var t = !1;
        "cardList" != a.data.currentTabBar && (t = !0), app.globalData.configInfo = !1, 
        getApp().getConfigInfo().then(function() {
            a.setData({
                showTabBar: t,
                globalData: app.globalData
            }, function() {
                wx.showNavigationBarLoading(), "cardList" == a.data.currentTabBar ? a.setData({
                    refreshCardList: !0
                }, function() {
                    a.getCollectionList();
                }) : "toCard" == a.data.currentTabBar ? a.setData({
                    refreshCardIndex: !0
                }, function() {
                    a.getCardIndexData();
                }) : "toShop" == a.data.currentTabBar ? a.setData({
                    refreshShop: !0
                }, function() {
                    a.getShopTypes();
                }) : "toNews" == a.data.currentTabBar ? a.setData({
                    refreshNews: !0
                }, function() {
                    a.getNewsList();
                }) : "toCompany" == a.data.currentTabBar && a.setData({
                    refreshCompany: !0
                }, function() {
                    a.getModular();
                });
            });
        });
    },
    onReachBottom: function() {
        var d = this, a = !1;
        "cardList" != d.data.currentTabBar && (a = !0), d.setData({
            showTabBar: a,
            loadingShop: !1,
            loadingNews: !1
        }, function() {
            if ("cardList" == d.data.currentTabBar) {
                var a = d.data.loadingCardList, t = d.data.collectionList, e = t.page;
                e == t.total_page || a || (d.setData({
                    "paramCardList.page": parseInt(e) + 1,
                    loadingCardList: !0
                }), d.getCollectionList());
            } else if ("toShop" == d.data.currentTabBar) {
                var o = d.data.loadingShop, n = d.data.shop_all, r = n.page;
                r == n.total_page || o || (d.setData({
                    "paramShop.page": parseInt(r) + 1,
                    loadingShop: !0
                }), d.getShopList());
            } else if ("toNews" == d.data.currentTabBar) {
                var i = d.data.loadingNews, s = d.data.newsList, l = s.page;
                l == s.total_page || i || (d.setData({
                    "paramNews.page": parseInt(l) + 1,
                    loadingNews: !0
                }), d.getNewsList());
            }
        });
    },
    onPageScroll: function(a) {
        var t, e = this, o = e.data.newsIndex;
        for (var n in o) (o[n] = 1) && (o[n] = 0);
        (e.setData({
            evaStatus: !1,
            newsIndex: o
        }), "cardList" != e.data.currentTabBar && e.setData({
            showTabBar: !0
        }), "toShop" == e.data.currentTabBar) && (2 < e.data.shop_all.list.length && (200 < a.scrollTop && (t = !0), 
        a.scrollTop < 200 && (t = !1), e.setData({
            toShopScrollTop: t
        })));
    },
    onShareAppMessage: function(a) {
        var t = this;
        if ("toCard" == t.data.currentTabBar) {
            var e = t.data.cardIndexData;
            a.from;
            var o = e.info.myCompany.name;
            console.log("=====");
            console.log(o);
            return e.info.myCompany.short_name && (o = e.info.myCompany.short_name), o = o + "的" + e.info.job_name + e.info.name,
            console.log("card分享事件1  that.getShareRecord();"), t.getShareRecord(), t.data.paramData.to_uid != wx.getStorageSync("userid") && t.getForwardRecord(1, 0),
            console.log("card分享事件2 that.getShareRecord();"), {
                title: "您好，我是" + o + "，请惠存。",
                path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCard",
                // imageUrl: e.info.avatar
            };
        }
        if ("toShop" == t.data.currentTabBar) return a.from, {
            title: "",
            path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toShop",
            imageUrl: ""
        };
        if ("toNews" == t.data.currentTabBar) {
            if ("button" === a.from) {
                var n = a.target.dataset.index, r = (a.target.dataset.status, a.target.dataset.id);
                if (1 == (e = t.data.newsList.list)[n].type) i = "/longbing_card/pages/company/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=toPlayVideo&name=" + e[n].title + "&src=" + e[n].content; else {
                    var i = "/longbing_card/pages/news/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&id=" + r;
                    e[n].user_info && (i += "&isStaff=true");
                }
                return {
                    title: e[n].title,
                    path: i,
                    imageUrl: e[n].cover[0]
                };
            }
            return {
                title: "",
                path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toNews",
                imageUrl: ""
            };
        }
        return "toCompany" == t.data.currentTabBar ? (a.from, {
            title: "",
            path: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toCompany",
            imageUrl: ""
        }) : void 0;
    },
    ddd: function() {
        0 == app.globalData.to_uid ? wx.showModal({
            title: "",
            content: "不能与默认客服进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }) : app.globalData.to_uid == wx.getStorageSync("userid") ? wx.showModal({
            title: "",
            content: "不能和自己进行对话哦！",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }) : wx.navigateTo({
            url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + app.globalData.to_uid + "&contactUserName=" + app.globalData.nickName + "&staffPhone=" + this.data.cardIndexData.info.phone + "&staffWechat=" + this.data.cardIndexData.info.wechat
        });
    },
    getShowClientUnread: function() {
        var a = this;
        a.data.globalData.clientUnread && (app.globalData.clientUnreadImg = !0, a.setData({
            "globalData.clientUnreadImg": !0,
            clientUnread: app.globalData.clientUnread
        }), setTimeout(function() {
            app.globalData.clientUnread = 0, app.globalData.clientUnreadImg = !1, a.setData({
                "globalData.clientUnreadImg": !1
            });
        }, 3e3));
    },
    getCustomQrRecordInsert: function(a) {
        app.util.request({
            url: "entry/wxapp/customQrRecordInsert",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: this.data.paramData.to_uid,
                qr_id: a
            },
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getCollectionList: function() {
        var n = this, a = n.data, r = a.refreshCardList, t = a.paramCardList, i = a.collectionList;
        r || _xx_util2.default.showLoading(), _index.userModel.getCollectionList(t).then(function(a) {
            var t = i, e = a.data;
            r || (e.list = [].concat(_toConsumableArray(t.list), _toConsumableArray(e.list)));
            var o = "-1";
            0 == e.list.length && (o = !1), n.setData({
                collectionList: e,
                collectStatus: o,
                loadingCardList: !1,
                refreshCardList: !1
            });
        });
    },
    getCardIndexData: function() {
        var b = this, a = b.data.refreshCardIndex, t = b.data.paramData, e = t.to_uid;
        t.from_id;
        a || _xx_util2.default.showLoading();
        var o = {
            to_uid: e,
            from_id: app.globalData.from_id
        };
        _index.userModel.getCardIndexData(o).then(function(a) {
            _xx_util2.default.hideAll();
            var t = a.data, e = t.to_uid, o = t.from_id, n = t.is_boss, r = t.is_staff, i = t.peoplesInfo;
            for (var s in i) wx.getStorageSync("userid") == i[s].id && i.splice(s, 1);
            var l = t.info.myCompany.logo, d = t.info.avatar, u = t.info.avatar_2, c = t.info.name, g = t.info.job_name, p = t.info.phone, h = {
                logo: l,
                company_name: t.info.myCompany.name,
                company_short_name: t.info.myCompany.short_name,
                company_addr: t.info.myCompany.addr,
                avatar: u,
                default: app.globalData.defaultUserImg,
                name: c,
                phone: p,
                email: t.info.email,
                job_name: g
            }, f = {
                avatar: d,
                name: c,
                job_name: g,
                phone: p,
                wechat: t.info.wechat,
                companyName: t.info.myCompany.name,
                logo: l,
                addrMore: t.info.myCompany.addrMore,
                qrImg: t.qr
            };
            app.globalData.to_uid = e, app.globalData.from_id = o, app.globalData.nickName = t.info.name, 
            app.globalData.avatarUrl = t.info.avatar, app.globalData.job_name = t.info.job_name;
            var m = !1, _ = !1;
            e == wx.getStorageSync("userid") && (1 == n && (_ = !0), 1 == r && (m = !0)), app.globalData.isStaff = m, 
            app.globalData.isBoss = _, b.setData({
                cardIndexData: t,
                tmpShareData: f,
                tmpCardData: h,
                refreshCardIndex: !1,
                showTabBar: !0,
                "paramData.to_uid": e,
                "paramData.from_id": o,
                "globalData.isStaff": m,
                "globalData.isBoss": _
            });
        });
    },
    getEditPraiseStatus: function() {
        var o = this, a = {
            to_uid: app.globalData.to_uid,
            type: o.data.cardZanType
        };
        _index.userModel.getEditPraiseStatus(a).then(function(a) {
            _xx_util2.default.hideAll(), console.log(a.data);
            var t = o.data.cardIndexData, e = "";
            if (3 == o.data.cardZanType) 1 == t.isThumbs ? (t.thumbs_up = 1 * t.thumbs_up - 1, 
            t.isThumbs = 0, e = "取消靠谱！") : 0 == t.isThumbs && (t.thumbs_up = 1 * t.thumbs_up + 1, 
            t.isThumbs = 1, e = "认为靠谱！"); else if (1 == o.data.cardZanType) {
                e = "";
                1 == t.voiceThumbs ? (t.voiceThumbs = 0, e = "取消点赞！") : 0 == t.voiceThumbs && (t.voiceThumbs = 1, 
                e = "点赞成功！");
            }
            wx.showToast({
                icon: "none",
                title: e,
                duration: 2e3
            }), o.setData({
                cardIndexData: t
            });
        });
    },
    toGetShareInfo: function() {
        var e = this;
        wx.login({
            success: function(a) {
                var t = {
                    encryptedData: app.globalData.encryptedData,
                    iv: app.globalData.iv,
                    type: 1,
                    code: a.code,
                    to_uid: e.data.paramData.to_uid
                };
                _index.userModel.getShareInfo(t).then(function(a) {
                    _xx_util2.default.hideAll(), clearInterval(timer);
                });
            }
        });
    },
    getShopTypes: function() {
        var r = this;
        _xx_util2.default.showLoading();
        var a = {
            type: r.data.currentIndex,
            to_uid: r.data.paramData.to_uid
        };
        _index.userModel.getShopTypes(a).then(function(a) {
            _xx_util2.default.hideAll();
            var t = a.data, e = t.shop_all, o = t.shop_type, n = t.shop_company;
            r.setData({
                shop_all: e,
                shop_type: o,
                shop_company: n,
                showTabBar: !0
            });
        });
    },
    getShopList: function() {
        var o = this, a = o.data, n = a.refreshShop, t = a.paramShop, r = a.shop_all;
        n || _xx_util2.default.showLoading(), _index.userModel.getShopList(t).then(function(a) {
            var t = r, e = a.data;
            n || (e.list = [].concat(_toConsumableArray(t.list), _toConsumableArray(e.list))), 
            o.setData({
                shop_all: e,
                loadingShop: !1,
                refreshShop: !1,
                showTabBar: !0
            });
        });
    },
    getNewsList: function() {
        var d = this, a = d.data, u = a.refreshNews, t = a.paramNews, c = a.newsList;
        u || _xx_util2.default.showLoading(), _index.userModel.getNewsList(t).then(function(a) {
            _xx_util2.default.hideAll(), console.log(a.data);
            var t = c, e = a.data, o = e.list, n = d.data.newsIndex;
            for (var r in o) {
                for (var i in n.push(0), 2 == o[r].type && 3 == o[r].url_type && (o[r].content = "tel:" + o[r].content), 
                o[r].thumbs) 0 != o[r].thumbs[i].user && o[r].thumbs[i].user.nickName || o[r].thumbs.splice(i, 1);
                for (var s in o[r].comments) 0 != o[r].comments[s].user && o[r].comments[s].user.nickName || o[r].comments.splice(s, 1);
                for (var l in o[r].cover) 1 == o[r].type || o[r].cover[l] || o[r].cover.splice(l, 1);
            }
            u || (e.list = [].concat(_toConsumableArray(t.list), _toConsumableArray(e.list))), 
            d.setData({
                newsList: e,
                newsIndex: n,
                loadingNews: !1,
                refreshNews: !1
            });
        });
    },
    addEva: function(a) {
        var t = a.detail.value;
        this.setData({
            evaContent: t
        });
    },
    getThumbs: function(e) {
        var o = this, a = {
            id: o.data.ThumbsId,
            to_uid: app.globalData.to_uid
        };
        _index.userModel.getThumbs(a).then(function(a) {
            _xx_util2.default.hideAll();
            var t = o.data.newsList;
            1 == t.list[e].is_thumbs ? t.list[e].is_thumbs = 0 : t.list[e].is_thumbs = 1, o.setData({
                newsList: t,
                evaStatus: !1,
                showTabBar: !0
            }, function() {
                o.getNewThumbsComment(o.data.ThumbsId);
            });
        });
    },
    getComment: function() {
        var t = this, a = {
            id: t.data.evaId,
            to_uid: app.globalData.to_uid,
            content: t.data.evaContent
        };
        _index.userModel.getComment(a).then(function(a) {
            _xx_util2.default.hideAll(), t.setData({
                evaStatus: !1,
                showTabBar: !0
            }, function() {
                t.getNewThumbsComment(t.data.evaId);
            });
        });
    },
    getNewThumbsComment: function(a) {
        var i = this, t = {
            id: a,
            to_uid: app.globalData.to_uid
        };
        _index.userModel.getNewThumbsComment(t).then(function(a) {
            _xx_util2.default.hideAll();
            var t = i.data.newsList, e = i.data.currentNewsIndex;
            for (var o in t.list[e].thumbs = a.data.thumbs, t.list[e].comments = a.data.comments, 
            t.list) {
                for (var n in t.list[o].thumbs) 0 != t.list[o].thumbs[n].user && t.list[o].thumbs[n].user.nickName || t.list[o].thumbs.splice(n, 1);
                for (var r in t.list[o].comments) 0 != t.list[o].comments[r].user && t.list[o].comments[r].user.nickName || t.list[o].comments.splice(r, 1);
            }
            i.setData({
                newsList: t,
                evaStatus: !1,
                showTabBar: !0,
                evaContent: "",
                ThumbsId: "",
                evaId: "",
                index: ""
            });
        });
    },
    getModular: function() {
        var r = this, i = r.data;
        i || _xx_util2.default.showLoading();
        var a = {
            to_uid: r.data.paramData.to_uid
        };
        _index.userModel.getModular(a).then(function(a) {
            _xx_util2.default.hideAll();
            var t = a.data, e = t.company_company, o = t.company_modular;
            for (var n in i = !1, o) 4 == o[n].type && (o[n].info.markers = [ {
                iconPath: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/A33zQycihMM33y337LH23myTqTl3tl.png",
                id: 1,
                callout: {
                    content: o[n].info.address,
                    fontSize: 14,
                    bgColor: "#ffffff",
                    padding: 4,
                    display: "ALWAYS",
                    textAlign: "center",
                    borderRadius: 2
                },
                latitude: o[n].info.latitude,
                longitude: o[n].info.longitude,
                width: 28,
                height: 28
            } ]);
            r.setData({
                company_company: e,
                company_modular: o,
                refreshCompany: i,
                showTabBar: !0
            });
        });
    },
    swiperChange: function(a) {
        var t = a.detail.current;
        this.setData({
            swiperIndexCur: t
        });
    },
    getForwardRecord: function(a, t) {
        var e = {
            type: a,
            to_uid: app.globalData.to_uid
        };
        2 != a && 3 != a || (e.target_id = t), _index.userModel.getForwardRecord(e).then(function(a) {
            _xx_util2.default.hideAll();
        });
    },
    getCopyRecord: function(a) {
        var t = {
            type: a,
            to_uid: app.globalData.to_uid
        };
        _index.userModel.getCopyRecord(t).then(function(a) {
            _xx_util2.default.hideAll();
        });
    },
    getShareRecord: function() {
        var a = {
            to_uid: app.globalData.to_uid
        };
        _index.userModel.getShareRecord(a).then(function(a) {
            _xx_util2.default.hideAll();
        });
    },
    getPhoneNumber: function(a) {
        if ("getPhoneNumber:ok" == a.detail.errMsg) {
            console.log("同意授权获取电话号码");
            var t = a.detail.encryptedData, e = a.detail.iv;
            console.log(t, e), this.setPhoneInfo(t, e);
        } else "getPhoneNumber:fail user deny" == a.detail.errMsg && console.log("拒绝授权获取电话号码");
        this.ddd();
    },
    setPhoneInfo: function(e, o) {
        var n = this;
        console.log(app.globalData.to_uid), wx.login({
            success: function(a) {
                console.log("wx.login ==>>", a);
                var t = {
                    encryptedData: e,
                    iv: o,
                    code: a.code,
                    to_uid: app.globalData.to_uid
                };
                _index.userModel.getPhone(t).then(function(a) {
                    _xx_util2.default.hideAll(), app.globalData.hasClientPhone = !0, n.setData({
                        "globalData.hasClientPhone": !0
                    });
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getVoucher: function() {
        voucher.getVoucher(this, _index.baseModel, _xx_util2.default);
    },
    toBigVoucher: function() {
        voucher.toBigVoucher(this);
    },
    toMiniVoucher: function() {
        voucher.toMiniVoucher(this);
    },
    checkAuthStatus: function() {
        auth.checkAuth(this, _index.baseModel, _xx_util2.default);
    },
    getUserInfo: function(a) {
        auth.getUserInfo(a);
    },
    addEvaBtn: function(a) {
        if (console.log("点击键盘确定键，发表评论", this.data.evaContent), !this.data.evaContent) return wx.showToast({
            icon: "none",
            title: "请输入评论内容！",
            duration: 2e3
        }), !1;
        this.getComment();
    },
    toJump: function(a) {
        var t = this, e = a.currentTarget.dataset.status, o = a.currentTarget.dataset.index, n = a.currentTarget.dataset.id, r = a.currentTarget.dataset.content, i = a.currentTarget.dataset.type;
        if ("toCopyright" == e && t.data.globalData.configInfo.config.logo_phone && app.util.goUrl(a), 
        "toImgJump" != e && "toStaff" != e && "toShowMore" != e && "toMoreDetail" != e && "toCarIndex" != e && "toMine" != e || app.util.goUrl(a), 
        "toAddCard" == e) console.log("创建智能名片"), t.setData({
            onshowStatus: "createCard"
        }, function() {
            wx.navigateTo({
                url: "/longbing_card/staff/mine/editInfo/editInfo?status=createCard"
            });
        }); else if ("toCardIndex" == e) {
            app.util.showLoading(1);
            var s = wx.getStorageSync("userid"), l = wx.getStorageSync("user");
            wx.clearStorageSync(), wx.setStorageSync("userid", s), wx.setStorageSync("user", l);
            var d = t.data.collectionList.list, u = d[o].userInfo.fans_id, c = d[o].userInfo.name;
            app.globalData.to_uid = u, app.globalData.nickName = c, wx.showShareMenu({
                withShareTicket: !0,
                success: function(a) {
                    console.log("shareMenu share success"), console.log("分_享" + a);
                },
                fail: function(a) {
                    console.log(a);
                }
            }), t.setData({
                "paramData.to_uid": u,
                currentTabBarInd: 0,
                currentTabBar: "toCard",
                showTabBar: !0,
                globalData: app.globalData,
                refreshCardIndex: !1,
                cardIndexData: {}
            }), wx.setNavigationBarTitle({
                title: app.globalData.configInfo.config.mini_app_name
            }), t.getCardIndexData(), "cardList" != t.data.currentTabBar && t.data.paramData.to_uid != wx.getStorageSync("userid") && (0 == app.globalData.clientUnread && 0 == t.data.clientUnread && (app.globalData.clientUnread = 1), 
            t.getShowClientUnread()), wx.pageScrollTo({
                duration: 0,
                scrollTop: 0
            }), wx.hideLoading();
        }
        if ("toCardZan" == e ? (t.setData({
            toLeavingMessage: !1,
            cardZanType: i
        }), t.getEditPraiseStatus()) : "toVoice" == e ? (innerAudioContext.autoplay = !0, 
        innerAudioContext.src = t.data.cardIndexData.info.voice, 1 == i && (innerAudioContext.play(function() {
            console.log("开始播放");
        }), t.setData({
            playPushStatus: 2
        }), app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(9)), 
        2 == i && (console.log("语音播放 pauseBackgroundAudio", i), t.setData({
            playPushStatus: 1
        }), innerAudioContext.pause(function() {
            console.log("暂停播放");
        })), innerAudioContext.onEnded(function() {
            console.log("音频自然播放结束事件"), t.setData({
                playPushStatus: 1
            });
        })) : "toCardList" == e ? (app.util.showLoading(1), t.setData({
            showTabBar: !1,
            currentTabBar: "cardList",
            show: !1,
            collectionList: {
                page: 1,
                total_page: "",
                list: []
            }
        }), wx.setNavigationBarTitle({
            title: "名片列表"
        }), wx.hideShareMenu(), t.getCollectionList(), wx.pageScrollTo({
            duration: 0,
            scrollTop: 0
        }), wx.hideLoading()) : "toBoss" == e ? (console.log("BOSS端入口"), app.util.goUrl(a)) : "toConsult" == e ? (console.log("聊天"), 
        t.setData({
            toLeavingMessage: !0
        }), app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(8), 
        1 == t.data.globalData.hasClientPhone && console.log("用户已授权手机号码"), t.ddd()) : "toShareCard" == e && (console.log("关闭弹出层"), 
        t.setData({
            showShareStatus: 0
        })), wx.onBackgroundAudioStop(function() {
            t.setData({
                playPushStatus: 1
            });
        }), "toShopDetail" == e) {
            var g = "";
            "toCard" == t.data.currentTabBar ? g = t.data.cardIndexData.goods : "toShop" == t.data.currentTabBar && (g = t.data.shop_all.list), 
            wx.navigateTo({
                url: "/longbing_card/pages/shop/detail/detail?id=" + g[o].id + "&to_uid=" + app.globalData.to_uid + "&from_id=" + app.globalData.from_id
            });
        } else if ("toTabClickMore" == e || "toTabClick" == e) {
            console.log("全部 || 类别选择");
            var p = a.currentTarget.dataset.categoryid, h = o, f = p;
            "toTabClickMore" == e && (h = "100000101", f = "All"), wx.pageScrollTo({
                duration: 0,
                scrollTop: 0
            }), t.setData({
                toShopScrollTop: !1,
                activeIndex: h,
                categoryid: p,
                scrollNav: "scrollNav" + f,
                "paramShop.list": [],
                "paramShop.page": 1,
                "paramShop.type_id": p,
                refreshShop: !0
            }), t.getShopList();
        }
        if ("toNewsShow" == e) {
            var m = t.data.newsIndex;
            0 == i ? m[o] = 1 : 1 == i && (m[o] = 0), t.setData({
                newsIndex: m,
                currentNewsIndex: o
            });
        } else if ("toNewsZan" == e) {
            console.log(o, "toNewsZan");
            var _ = t.data.newsIndex;
            for (var b in _) (_[b] = 1) && (_[b] = 0);
            t.setData({
                newsIndex: _,
                toLeavingMessage: !1,
                ThumbsId: n
            }), t.getThumbs(o);
        } else if ("toEva" == e) {
            console.log("评论", t.data.evaStatus);
            var x = t.data.newsIndex;
            for (var w in x) (x[w] = 1) && (x[w] = 0);
            t.setData({
                newsIndex: x,
                toLeavingMessage: !1,
                evaId: n,
                evaStatus: !0,
                showTabBar: !1
            }), console.log(t.data.evaStatus);
        } else if ("toAddEvaBtn" == e) {
            if (console.log("点击发表按钮，发表评论", t.data.evaContent), !t.data.evaContent) return wx.showToast({
                icon: "none",
                title: "请输入评论内容！",
                duration: 2e3
            }), !1;
            t.getComment();
        } else if ("toNewsDetail" == e) {
            var D = t.data.newsList.list;
            if (1 == D[o].type) {
                wx.navigateTo({
                    url: "/longbing_card/pages/company/detail/detail?status=toPlayVideo&name=" + D[o].title + "&src=" + D[o].content
                });
            } else if (2 == D[o].type) app.util.goUrl(a); else if (0 == D[o].type) {
                var S = "/longbing_card/pages/news/detail/detail?id=" + n;
                D[o].user_info.id && (console.log("员工发布动态"), S += "&isStaff=true"), D[o].user_info.id || (console.log("公司发布动态"), 
                S = S + "&companyName=" + t.data.newsList.timeline_company.name), wx.navigateTo({
                    url: S
                });
            }
        }
        if ("toDetail" == e) {
            var y = t.data.company_modular;
            if (5 == y[o].type) return !1;
            wx.navigateTo({
                url: "/longbing_card/pages/company/detail/detail?table_name=" + y[o].table_name + "&type=" + y[o].type + "&id=" + n + "&name=" + y[o].name
            });
        } else if ("toCall" == e) {
            if (!r || "暂未填写" == r) return !1;
            wx.makePhoneCall({
                phoneNumber: r,
                success: function(a) {
                    app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(i);
                }
            });
        } else if ("toPlayVideo" == e) console.log("播放视频"), wx.navigateTo({
            url: r
        }); else if ("toCompanyMap" == e) {
            console.log("toCompanyMap");
            var v = a.currentTarget.dataset.latitude, C = a.currentTarget.dataset.longitude;
            wx.openLocation({
                latitude: parseFloat(v),
                longitude: parseFloat(C),
                name: r,
                scale: 28,
                success: function(a) {}
            });
        }
    },
    formSubmit: function(a) {
        var t = this, e = a.detail.formId, o = a.detail.target.dataset.status, n = a.detail.target.dataset.index, r = a.detail.target.dataset.type, i = a.detail.target.dataset.text, s = a.detail.target.dataset.content;
        if (t.setData({
            toCardStatus: ""
        }), "toTabBar" == o) {
            if (t.setData({
                currentTabBarInd: n,
                toCardStatus: "tabBar"
            }, function() {
                wx.getSetting({
                    success: function(a) {
                        a.authSetting["scope.userInfo"] ? (console.log("有res.authSetting['scope.userInfo']"), 
                        t.setData({
                            authStatus: !0
                        })) : (console.log("没有res.authSetting['scope.userInfo']"), t.setData({
                            authStatus: !1
                        }));
                    },
                    fail: function(a) {
                        console.log("wx.getSetting ==>> fail"), t.setData({
                            authStatus: !1
                        });
                    }
                });
            }), "toCard" == r) wx.setNavigationBarTitle({
                title: app.globalData.configInfo.config.mini_app_name
            }), t.setData({
                currentTabBar: r
            }), wx.showShareMenu({
                withShareTicket: !0,
                success: function(a) {
                    console.log("shareMenu share success"), console.log("分_享" + a);
                },
                fail: function(a) {
                    console.log(a);
                }
            }); else "toPageUrl" == t.data.globalData.tabBarList[n].jump ? (wx.setNavigationBarTitle({
                title: i
            }), t.setData({
                currentTabBar: r
            }), wx.showShareMenu()) : app.util.goUrl(a, !0);
            wx.pageScrollTo({
                duration: 0,
                scrollTop: 0
            }), t.data.paramData.to_uid != wx.getStorageSync("userid") && t.getShowClientUnread();
        } else if ("toCardMore" == o) {
            var l = 1;
            1 == s && (l = 2), t.setData({
                moreStatus: l
            });
        } else if ("toCall" == o) {
            if (!s || "暂未填写" == s) return !1;
            wx.makePhoneCall({
                phoneNumber: s,
                success: function(a) {
                    app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(r);
                }
            });
        } else if ("toCopy" == o) {
            if (!s || "暂未填写" == s) return !1;
            wx.setClipboardData({
                data: s,
                success: function(a) {
                    wx.getClipboardData({
                        success: function(a) {
                            app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(r);
                        }
                    });
                }
            });
        } else "toMap" == o ? wx.openLocation({
            latitude: parseFloat(t.data.cardIndexData.info.myCompany.latitude),
            longitude: parseFloat(t.data.cardIndexData.info.myCompany.longitude),
            name: s,
            scale: 28,
            success: function(a) {
                app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(r);
            }
        }) : "toShowShare" == o ? t.setData({
            showShareStatus: 1
        }) : "toAddPhone" == o ? wx.addPhoneContact({
            photoFilePath: t.data.cardIndexData.info.avatar,
            firstName: t.data.cardIndexData.info.name,
            mobilePhoneNumber: t.data.cardIndexData.info.phone,
            hostNumber: t.data.cardIndexData.info.telephone,
            weChatNumber: t.data.cardIndexData.info.wechat,
            email: t.data.cardIndexData.info.email,
            organization: t.data.cardIndexData.info.myCompany.name,
            workAddressCity: t.data.cardIndexData.info.myCompany.addr,
            success: function(a) {
                app.globalData.to_uid != wx.getStorageSync("userid") && t.getCopyRecord(r);
            }
        }) : "toShareCard" == o ? (2 == r && wx.navigateTo({
            url: "/longbing_card/pages/card/share/share"
        }), t.setData({
            showShareStatus: 0
        })) : "toNav" == o && app.util.goUrl(a, !0);
        getApp().getConfigInfo().then(function() {
            t.setData({
                globalData: app.globalData
            }, function() {
                "toCard" == t.data.currentTabBar ? t.setData({
                    refreshCardIndex: !1
                }, function() {
                    "tabBar" == t.data.toCardStatus && (t.data.cardIndexData.to_uid || t.getCardIndexData());
                }) : "toShop" == t.data.currentTabBar ? t.setData({
                    refreshShop: !1
                }, function() {
                    0 == t.data.shop_all.list.length && (_xx_util2.default.showLoading(), t.getShopTypes());
                }) : "toNews" == t.data.currentTabBar ? t.setData({
                    "paramNews.to_uid": t.data.paramData.to_uid,
                    refreshNews: !1
                }, function() {
                    0 == t.data.newsList.list.length && t.getNewsList();
                }) : "toCompany" == t.data.currentTabBar && t.setData({
                    refreshCompany: !1
                }, function() {
                    (!t.data.company_modular || t.data.company_modular.length < 1) && t.getModular();
                }), t.toSaveFormIds(e);
            });
        });
    },
    toSaveFormIds: function(a) {
        var t = {
            formId: a
        };
        _index.baseModel.getFormId(t).then(function(a) {});
    }
});