var _xx_util = require("../../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../../resource/apis/index.js");

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var timer, timerLeftTime, app = getApp(), auth = require("../../../templates/auth/auth.js"), getAppGlobalData = require("../../../templates/copyright/copyright.js");

Page({
    data: {
        swiperIndexCur: 1,
        swiperStatus: {
            indicatorDots: !1,
            autoplay: !0
        },
        isStaff: "",
        detailData: {},
        globalData: {},
        authStatus: !0,
        bgStatus: !1,
        chooseStatus: !1,
        chooseNumStatus: !1,
        addNumber: 1,
        addPrice: 0,
        countPrice: 0,
        rulesIndex: 0,
        checkSpeList: [],
        collageList: [],
        tmpTimes: []
    },
    onLoad: function(a) {
        console.log(this, a, "show detail.js 1111111111111111111111111111111111111111111111111111111111111111");
        var t = this;
        app.util.showLoading(1), wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {
                console.log("shareMenu share success"), console.log("分_享" + a);
            },
            fail: function(a) {
                console.log(a);
            }
        });
        var e = {};
        (a.id && (e.detailID = a.id), a.to_uid && (e.to_uid = a.to_uid, app.globalData.to_uid = a.to_uid), 
        a.from_id && (e.from_id = a.from_id, app.globalData.from_id = a.from_id), a.nickName && (app.globalData.nickName = a.nickName), 
        t.setData({
            paramData: e,
            globalData: app.globalData
        }), wx.getStorageSync("user")) && (wx.getStorageSync("user").phone && (app.globalData.hasClientPhone = !0, 
        t.setData({
            "globalData.hasClientPhone": !0
        })));
        t.getProductDetail(), a.from_id && 2 == a.type && t.data.paramData.to_uid != wx.getStorageSync("userid") && 1044 == app.globalData.loginParam.scene && (timer = setInterval(function() {
            app.globalData.encryptedData && t.toGetShareInfo();
        }, 1e3)), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function(a) {
        var t = this;
        t.checkAuthStatus(), t.getCollageList(), console.log("show detail.js    onshow that.checkAuthStatus ==> authStatus ", t.data.authStatus);
    },
    onHide: function() {
        clearInterval(timer), clearInterval(timerLeftTime);
    },
    onUnload: function() {
        clearInterval(timer), clearInterval(timerLeftTime);
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), getAppGlobalData.getAppGlobalData(this, _index.baseModel, _xx_util2.default), 
        this.checkAuthStatus();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this;
        return {
            title: t.data.detailData.name,
            path: "/longbing_card/pages/shop/detail/detail?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&id=" + t.data.paramData.detailID + "&type=2&nickName=" + app.globalData.nickName,
            imageUrl: t.data.detailData.cover_true
        };
    },
    getProductDetail: function() {
        var i = this;
        console.log(app.globalData.to_uid, "app.globalData.to_uid"), app.util.request({
            url: "entry/wxapp/ShopGoodsDetail",
            cachetime: "30",
            method: "POST",
            data: {
                goods_id: i.data.paramData.detailID,
                to_uid: app.globalData.to_uid
            },
            success: function(a) {
                if (console.log("entry/wxapp/goodsDetail ==>", a), !a.data.errno) {
                    var t = a.data.data, e = i.data.checkSpeList, o = [];
                    for (var r in t.spe_list) 1 < t.spe_list.length && "默认" == t.spe_list[r].title && 1 == t.spe_list[r].sec.length && "默认" == t.spe_list[r].sec[0].title && t.spe_list.splice(r, 1), 
                    e.push(0), 0 < t.spe_list.length && o.push(t.spe_list[r].sec[0].id);
                    0 < t.collage.length && i.setData({
                        tmpShowCheckCollageID: t.collage[0].id,
                        tmpShowCheckNumber: t.collage[0].number
                    });
                    var l = {
                        name: t.name,
                        price: t.price,
                        sale_count: t.sale_count,
                        cover2: t.cover2,
                        qr: t.qr
                    };
                    i.setData({
                        shareParamObj: l,
                        detailData: t,
                        addPrice: t.price,
                        checkSpeList: e,
                        checkIDs: o
                    }), i.getCurrentCheckIdAndPrice();
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getCollageList: function() {
        var c = this;
        app.util.request({
            url: "entry/wxapp/shopcollagelist",
            cachetime: "30",
            method: "POST",
            data: {
                goods_id: c.data.paramData.detailID
            },
            success: function(a) {
                if (console.log("entry/wxapp/shopcollagelist ==>", a), !a.data.errno) {
                    var t = a.data.data, e = new app.util.date(), o = c.data.tmpTimes;
                    o = [];
                    var r = [];
                    for (var l in t) 0 < t[l].left_number && r.push(t[l]);
                    for (var i in r) {
                        var s = r[i].left_time, d = parseInt(s / 24 / 60 / 60);
                        d = 0 < d ? d + "天 " : "", o[i] = d + e.dateToStr("HH:mm", e.longToDate(1e3 * s)), 
                        0 == s && (r.splice(i, 1), o.splice(i, 1)), c.setData({
                            tmpTimes: o
                        });
                    }
                    c.setData({
                        collageList: r
                    });
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopcollagelist ==> fail ==> ", a);
            }
        });
    },
    getShopAddTrolley: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/ShopAddTrolley",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                goods_id: e.data.paramData.detailID,
                spe_price_id: e.data.spe_price_id,
                number: e.data.addNumber
            },
            success: function(a) {
                console.log("entry/wxapp/ShopAddTrolley ==>", a), a.data.errno || (1 == t && wx.showModal({
                    title: "",
                    content: "已成功加入购物车，快去看看吧",
                    cancelText: "继续选购",
                    confirmText: "查看已选",
                    success: function(a) {
                        a.confirm ? (e.toHideChoose(), wx.navigateTo({
                            url: "/longbing_card/pages/shop/car/carIndex/carIndex"
                        })) : a.cancel;
                    }
                }), 2 == t && (e.setData({
                    trolley_ids: a.data.data.id
                }), e.getToJumpUrl()));
            },
            fail: function(a) {
                console.log("entry/wxapp/ShopAddTrolley ==>  fail ==> ", a);
            }
        });
    },
    swiperChange: function(a) {
        var t = a.detail.current;
        this.setData({
            swiperIndexCur: 1 * t + 1
        });
    },
    toForwardRecord: function() {
        var a = {
            type: 2,
            to_uid: app.globalData.to_uid,
            target_id: this.data.paramData.detailID
        };
        console.log("entry/wxapp/Forward ==> paramObj", a), app.util.request({
            url: "entry/wxapp/Forward",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: a,
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toCopyRecord: function(a) {
        console.log(app.globalData, "app*********************"), app.util.request({
            url: "entry/wxapp/copyRecord",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                type: a,
                to_uid: app.globalData.to_uid
            },
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    toGetShareInfo: function() {
        var e = this;
        wx.login({
            success: function(a) {
                var t = {
                    encryptedData: app.globalData.encryptedData,
                    iv: app.globalData.iv,
                    type: 3,
                    code: a.code,
                    to_uid: e.data.paramData.to_uid,
                    target_id: e.data.paramData.detailID
                };
                app.util.request({
                    url: "entry/wxapp/getShare",
                    cachetime: "30",
                    showLoading: !1,
                    method: "POST",
                    data: t,
                    success: function(a) {
                        console.log("entry/wxapp/getShare ==>", a), a.data.errno || clearInterval(timer);
                    },
                    fail: function(a) {}
                });
            },
            fail: function(a) {}
        });
    },
    getPhoneNumber: function(a) {
        if ("getPhoneNumber:ok" == a.detail.errMsg) {
            console.log("同意授权获取电话号码");
            var t = a.detail.encryptedData, e = a.detail.iv;
            console.log(t, e), this.setPhoneInfo(t, e);
        } else "getPhoneNumber:fail user deny" == a.detail.errMsg && console.log("拒绝授权获取电话号码");
        this.checktoConsult();
    },
    setPhoneInfo: function(e, o) {
        var r = this;
        console.log(app.globalData.to_uid), wx.login({
            success: function(a) {
                console.log("wx.login ==>>", a);
                var t = {
                    encryptedData: e,
                    iv: o,
                    code: a.code,
                    to_uid: app.globalData.to_uid
                };
                app.util.request({
                    url: "entry/wxapp/phone",
                    cachetime: "30",
                    method: "POST",
                    showLoading: !1,
                    data: t,
                    success: function(a) {
                        a.data.errno || (app.globalData.hasClientPhone = !0, r.setData({
                            globalData: app.globalData
                        }));
                    },
                    fail: function(a) {
                        console.log("fail ==> ", a);
                    }
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    checkAuthStatus: function() {
        auth.checkAuth(this, _index.baseModel, _xx_util2.default);
    },
    getUserInfo: function(a) {
        console.log("获取微信用户信息"), auth.getUserInfo(a);
    },
    checktoConsult: function() {
        console.log(app.globalData.to_uid, wx.getStorageSync("userid"), app.globalData.nickName, "checktoConsult *********  showModal"), 
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
            url: "/longbing_card/chat/userChat/userChat?chat_to_uid=" + app.globalData.to_uid + "&contactUserName=" + app.globalData.nickName + "&goods_id=" + this.data.paramData.detailID
        });
    },
    toShowChoose: function() {
        this.setData({
            bgStatus: !0,
            chooseNumStatus: !0
        });
    },
    toHideChoose: function() {
        this.setData({
            bgStatus: !1,
            chooseStatus: !1,
            chooseNumStatus: !1
        });
    },
    RemoveAddNum: function(a) {
        var t, e = this, o = a.currentTarget.dataset.status, r = e.data.addNumber, l = e.data.detailData.stock;
        if ("toCollagePay" == e.data.toOrderStatus && (t = e.data.tmpShowCheckNumber), console.log(l, e.data.tmpShowCheckNumber, "////////////***tmpStock"), 
        "remove" == o) if (console.log("购物车-1", r, 1 * t + 1, e.data.toOrderStatus), "toCollagePay" == e.data.toOrderStatus) {
            if (r < 1 * t + 1) return wx.showModal({
                title: "",
                content: "选择数量不能少于该拼团组合数量",
                confirmText: "知道啦",
                showCancel: !1,
                success: function(a) {
                    a.confirm;
                }
            }), !1;
            r < 1 * l + 1 && (r = 1 * r - 1);
        } else {
            if (1 == r) return wx.showModal({
                title: "",
                content: "不能再少了",
                confirmText: "知道啦",
                showCancel: !1,
                success: function(a) {
                    a.confirm;
                }
            }), !1;
            r < 1 * l + 1 && (r = 1 * r - 1);
        }
        if ("add" == o && (console.log("购物车+1", r, l), 1 * l < (r = 1 * r + 1))) return wx.showModal({
            title: "",
            content: "库存不足，不能再添加了",
            confirmText: "知道啦",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }), !1;
        e.setData({
            addNumber: r
        }), e.toCountAddPrice();
    },
    toCountAddPrice: function() {
        var a = this, t = a.data.addPrice;
        a.data.addNumber > parseInt(a.data.detailData.stock) && a.setData({
            addNumber: parseInt(a.data.detailData.stock)
        }), "toCollagePay" == a.data.toOrderStatus && (t = a.data.collageAddPrice), a.setData({
            countPrice: (1 * a.data.addNumber * (1 * t)).toFixed(2)
        });
    },
    getCurrentCheckIdAndPrice: function() {
        var a = this, t = a.data.checkIDs, e = "";
        for (var o in t) e += t[o] + "-";
        e = e.slice(0, -1);
        var r = a.data.checkSpeList, l = a.data.detailData.spe_list, i = "";
        if (0 < l.length) {
            for (var s in r) i += l[s].sec[r[s]].title + "-";
            i = i.slice(0, -1);
        }
        var d, c, n, u, p = a.data.detailData.spe_price;
        for (var g in p) e == p[g].spe_id_1 && (d = p[g].id, c = p[g].stock);
        if ("toCollagePay" == a.data.toOrderStatus) {
            u = 1, n = a.data.detailData.collage[a.data.rulesIndex].price, a.setData({
                collageAddPrice: n,
                addNumber: a.data.tmpShowCheckNumber
            });
        } else {
            for (var h in u = 0, p) e == p[h].spe_id_1 && (n = p[h].price);
            a.setData({
                addPrice: n
            });
        }
        a.setData({
            tmpCheckIds: e,
            "detailData.stock": c,
            spe_price_id: d,
            tmpShowCheckID: u,
            spe_text: i
        }), a.toCountAddPrice();
    },
    getToJumpUrl: function() {
        var a = this;
        console.log(a.data.trolley_ids, "trolley_ids");
        var t = a.data.toOrderStatus, e = "toOrder", o = a.data.detailData, r = {
            count_price: a.data.countPrice,
            tmp_trolley_ids: a.data.trolley_ids,
            dataList: [ {
                name: o.name,
                number: a.data.addNumber,
                goods_id: o.id,
                cover_true: o.cover_true,
                freight: o.freight,
                spe: a.data.spe_text,
                price2: a.data.addPrice,
                stock: o.stock
            } ]
        };
        "toCollagePay" == t && (console.log("发布拼团"), e = "toCollage", r.dataList[0].collage_id = a.data.tmpShowCheckCollageID, 
        r.dataList[0].price2 = a.data.collageAddPrice), wx.setStorageSync("storageToOrder", r), 
        a.toHideChoose(), wx.navigateTo({
            url: "/longbing_card/pages/shop/car/toOrder/toOrder?status=" + e
        });
    },
    toJump: function(a) {
        var t = this, e = a.currentTarget.dataset.status, o = a.currentTarget.dataset.id, r = a.currentTarget.dataset.index, l = a.currentTarget.dataset.index1, i = a.currentTarget.dataset.paystatus;
        if ("toDetailJumpUrl" == e) app.util.goUrl(a); else if ("toCopyright" == e || "moreCollage" == e || "toReleaseCollage" == e) {
            if ("moreCollage" == e) {
                var s = {
                    name: (n = t.data.detailData).name,
                    cover_true: n.cover_true,
                    collage_count: n.collage_count,
                    people: n.collage[t.data.rulesIndex].people,
                    number: n.collage[t.data.rulesIndex].number,
                    price: n.collage[t.data.rulesIndex].price,
                    oldPrice: n.price
                };
                wx.setStorageSync("moreCollageData", s);
            }
            app.util.goUrl(a);
        } else if ("toShop" == e) console.log("商城首页"), console.log("/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toShop"), 
        wx.reLaunch({
            url: "/longbing_card/pages/index/index?to_uid=" + app.globalData.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&currentTabBar=toShop"
        }); else if ("toConsult" == e) console.log("去咨询"), app.globalData.to_uid != wx.getStorageSync("userid") && t.toCopyRecord(8), 
        1 == t.data.globalData.hasClientPhone && (console.log("用户已授权手机号码"), t.checktoConsult()); else if ("toAddCar" == e || "toProductPay" == e || "toCollagePay" == e || "toOnlyPay" == e) t.setData({
            toOrderStatus: e
        }), t.toShowChoose(), t.getCurrentCheckIdAndPrice(); else if ("toPay" == e) {
            var d = "toOrder";
            if ("toAddCar" == (c = t.data.toOrderStatus) || "toAddCar" == i) console.log("加入购物车"), 
            t.getShopAddTrolley(1); else {
                var c = t.data.toOrderStatus, n = (d = "toOrder", t.data.detailData), u = {
                    count_price: t.data.countPrice,
                    tmp_trolley_ids: t.data.trolley_ids,
                    dataList: [ {
                        name: n.name,
                        number: t.data.addNumber,
                        goods_id: n.id,
                        cover_true: n.cover_true,
                        freight: n.freight,
                        spe: t.data.spe_text,
                        price2: t.data.addPrice,
                        stock: n.stock
                    } ]
                };
                "toProductPay" != c && "toOnlyPay" != i || (console.log("立即购买"), u.dataList[0].spe_price_id = t.data.spe_price_id), 
                "toCollagePay" == c && (console.log("发布拼团"), d = "toCollage", u.dataList[0].collage_id = t.data.tmpShowCheckCollageID, 
                u.dataList[0].price2 = t.data.collageAddPrice), wx.setStorageSync("storageToOrder", u), 
                t.toHideChoose(), wx.navigateTo({
                    url: "/longbing_card/pages/shop/car/toOrder/toOrder?status=" + d
                });
            }
        } else if ("chooseCollage" == e) console.log("选择条件"), t.setData({
            bgStatus: !0,
            chooseStatus: !0
        }); else if ("setrules" == e) {
            console.log("选择规则");
            var p = (n = t.data.detailData.collage)[r].spe_id_1, g = p.split("-"), h = [];
            for (var m in console.log("tmpCheckIds", p), g) h.push(g[m]);
            var f = t.data.detailData.spe_list, _ = [];
            for (var D in f) for (var S in f[D].sec) h[D] == f[D].sec[S].id && _.push(S);
            t.setData({
                rulesIndex: r,
                toOrderStatus: "toCollagePay",
                tmpShowCheckID: 1,
                collageAddPrice: n[r].price,
                addNumber: n[r].number,
                tmpShowCheckCollageID: n[r].id,
                tmpShowCheckNumber: n[r].number,
                checkIDs: h,
                checkSpeList: _,
                tmpCheckIds: p
            }), t.toCountAddPrice();
        } else if ("toCheckCur" == e) {
            console.log("规格属性选择");
            f = t.data.checkSpeList;
            if (t.data.checkIDs[r] = o, f[r] = l, t.getCurrentCheckIdAndPrice(), t.setData({
                checkSpeList: f
            }), "toCollagePay" == t.data.toOrderStatus && (1 == t.data.tmpShowCheckID && t.setData({
                addNumber: t.data.tmpShowCheckNumber
            }), 0 == t.data.tmpShowCheckID)) return wx.showToast({
                icon: "none",
                title: "该组合没有参加拼团，请另选其他组合！",
                duration: 2e3
            }), !1;
        }
    },
    formSubmit: function(a) {
        var t = a.detail.formId, e = a.detail.target.dataset.status, o = a.detail.target.dataset.type;
        this.toSaveFormIds(t), "toCollection" == e ? console.log("收藏") : "toShowShare" == e ? this.setData({
            showShareStatus: 1
        }) : "toCarIndex" == e ? (console.log("购物车"), wx.navigateTo({
            url: "/longbing_card/pages/shop/car/carIndex/carIndex"
        })) : "toMine" == e ? (console.log("我的个人中心"), wx.navigateTo({
            url: "/longbing_card/pages/uCenter/index"
        })) : "toShareCard" == e && (this.setData({
            showShareStatus: 0
        }), 2 == o && wx.navigateTo({
            url: "/longbing_card/pages/shop/share/share"
        }));
    },
    toSaveFormIds: function(a) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                formId: a
            },
            success: function(a) {
                a.data.errno;
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    }
});