var _index = require("longbing_card/resource/apis/index.js"), util = require("longbing_card/resource/js/util.js"), appUniacid = require("siteinfo.js");

App({
    onLaunch: function(a) {
        var t = this;
        console.log("版本：2018年11月13日16:00", appUniacid.uniacid);
        var e = wx.getStorageSync("userid"), o = wx.getStorageSync("user");
        wx.clearStorageSync(), wx.setStorageSync("userid", e), wx.setStorageSync("user", o);
        var n = t.siteInfo.siteroot;
        n = util.getHostname(n), t.globalData.noticeUrl = n, t.globalData.wssUrl = "wss://" + n + "/wss", 
        t.globalData.wssUrl2 = "wss://" + n + "/socket.io/", t.globalData.bossUrl = "https://" + n + "/addons/longbing_card/dist?uniacid=" + appUniacid.uniacid + "&id=";
    },
    onShow: function(a) {
        var u = this;
        wx.getSystemInfo({
            success: function(a) {
                -1 != a.model.search("iPhone X") && (u.globalData.isIphoneX = !0);
            }
        }), a.query.to_uid && (u.globalData.to_uid = a.query.to_uid), a.query.form_id && (u.globalData.loginParam.is_qr = 0), 
        a.scene && (u.globalData.loginParam.scene = a.scene), a.query.is_qr && (u.globalData.loginParam.is_qr = a.query.is_qr), 
        1044 == a.scene && (u.globalData.loginParam.is_group = 1), 1044 != a.scene && (u.globalData.loginParam.is_group = 0), 
        a.query.custom && (u.globalData.loginParam.type = 1, u.globalData.loginParam.target_id = a.query.custom), 
        a.query.type && (u.globalData.loginParam.type = a.query.type), u.globalData.loginParam.type && (a.query.id && (u.globalData.loginParam.target_id = a.query.id), 
        a.query.id || (u.globalData.loginParam.target_id = 0)), 1044 == a.scene && wx.getShareInfo({
            shareTicket: a.shareTicket,
            complete: function(a) {
                console.log(a, "onLaunch ========= getShareInfo res"), u.globalData.encryptedData = a.encryptedData, 
                u.globalData.iv = a.iv, wx.login({
                    success: function(a) {
                        console.log("wx.login ==>>", a);
                        var t = u.globalData.loginParam, e = t.scene, o = t.is_qr, n = t.is_group, i = t.type, r = t.target_id, l = u.globalData.encryptedData, g = u.globalData.iv, s = {
                            code: a.code,
                            scene: e,
                            is_qr: o,
                            is_group: n,
                            type: i,
                            target_id: r,
                            encryptedData: l,
                            iv: g
                        };
                        _index.baseModel.getLogin(s).then(function(a) {
                            var t = a.data.user_id, e = a.data.user;
                            e && (wx.setStorageSync("user", e), e.phone && (u.globalData.hasClientPhone = !0)), 
                            u.globalData.userid = t, wx.setStorageSync("userid", t);
                        });
                    }
                });
            }
        }), setInterval(function() {
            var a = {
                to_uid: u.globalData.to_uid
            };
            _index.baseModel.getClientUnread(a).then(function(a) {
                var t = a.data.count, e = t.staff_count, o = t.user_count;
                e && (u.globalData.badgeNum = e, u._createBadgeTimer()), o && (u.globalData.clientUnread < o && (u.globalData.clientUnreadImg = !0, 
                setTimeout(function() {
                    u.globalData.clientUnreadImg = !1;
                }, 1e4)), u.globalData.clientUnread = o);
            });
        }, 1e4);
    },
    onHide: function() {},
    onError: function(a) {
        console.log(a);
    },
    _clearBadgeTimer: function() {
        var a = this;
        a.globalData._setTabBarBadgeTimer && (clearInterval(a.globalData._setTabBarBadgeTimer), 
        a.globalData._setTabBarBadgeTimer = null);
    },
    _createBadgeTimer: function() {
        var a = this;
        a.globalData._setTabBarBadgeTimer || (a.globalData._setTabBarBadgeTimer = setInterval(function() {
            a.setMsgBadge(a.globalData.badgeNum);
        }, 300));
    },
    setMsgBadge: function(a) {
        var t = this;
        0 != a ? wx.setTabBarBadge({
            index: 1,
            text: String(a),
            success: function() {
                t._clearBadgeTimer();
            },
            fail: function() {
                t._createBadgeTimer();
            }
        }) : wx.removeTabBarBadge({
            index: 1,
            success: function() {
                t._clearBadgeTimer();
            },
            fail: function() {
                t._createBadgeTimer();
            }
        });
    },
    getConfigInfo: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], g = this, o = g.globalData.configInfo;
        return new Promise(function(l, a) {
            if (o && !e) {
                var t = Object.assign({}, o);
                l(t);
            } else _index.baseModel.getConfigV2().then(function(a) {
                var t = a.data, e = t.my_company, o = t.tabBar;
                e && 23 < e.addr.length && (e.addrMore = e.addr.slice(0, 23) + "...");
                var n = g.globalData.tabBarList;
                for (var i in o.menu_name) o.menu_url_out[i] && (0 == o.menu_url_jump_way[i] && (n[i].jump = "toOutUrl"), 
                1 == o.menu_url_jump_way[i] && (n[i].jump = "toMiniApp", n[i].toMiniApp = o.menu_url_out[i].split("；"))), 
                1 == o.menu_is_hide[i] && (n[i].showTab = 1), n[i].text = o.menu_name[i], -1 < o.menu_url[i].indexOf("currentTabBar=") && (n[i].type = o.menu_url[i].split("currentTabBar=")[1]), 
                n[i].url = o.menu_url[i], o.menu_url_out[i] && (n[i].url = o.menu_url_out[i]);
                g.globalData.configInfo = t, g.globalData.tabBarList = n;
                var r = Object.assign({}, t);
                l(r);
            });
        }).then(function(a) {
            return a;
        });
    },
    util: util,
    userInfo: {
        sessionid: null
    },
    siteInfo: require("siteinfo.js"),
    globalData: {
        isIphoneX: !1,
        userid: "",
        to_uid: 0,
        form_id: 0,
        nickName: "",
        avatarUrl: "",
        encryptedData: !1,
        iv: !1,
        isStaff: !1,
        isBoss: !1,
        userIsStaff: !1,
        hasClientPhone: !1,
        configInfo: !1,
        voucherStatus: {
            tag: "big",
            status: "unreceive"
        },
        chooseStaffInfo: {
            avatar: "",
            avatarImg: ""
        },
        loginParam: {
            scene: "",
            is_qr: "",
            is_group: "",
            type: "",
            target_id: ""
        },
        wssUrl: "",
        bossUrl: "",
        noticeUrl: "",
        _setTabBarBadgeTimer: null,
        badgeNum: 0,
        clientUnread: 1,
        chatImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/09/uEunvCzB16TY1gmTEtDDiEZ6YdU7Zu.png",
        defaultUserImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/09/dJJl8rANdVklRvo2RRDl8dMJnmlNlD.png",
        noUserImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/09/jyJlH5ax28TztQAQ2Jh8tIkXLhBQyK.png",
        moreImgs: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/09/jeVh5RF0dfndncFeZzmhzeW511V4Rm.png",
        ingImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/09/hnqwnkQsV4lNx2vIyCA3lxF3LTfGqv.png",
        bossImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/09/KYdftdZuDYh2TF9pQnJ0uT9tgNt2q2.png",
        playVideoImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/10/T8A1maB3boAB3A8Sb8yTYBs1b0BmaA.png",
        companyVideoImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/10/vmKklLlnkMRCRBFuZDMEkEcfu4fEKr.png",
        cardVideoImg: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/10/Ik4kmm8i4a8Qb5383a699m6p3g3g6q.png",
        tabBarList: [ {
          iconPath: "/longbing_card/resource/icon/m1.png",
          selectedIconPath: "/longbing_card/resource/icon/m.png",
            url: "",
            showTab: 0,
            jump: "toPageUrl",
            type: "toCard",
            text: "名片"
        }, {
            iconPath: "/longbing_card/resource/icon/c1.png",
            selectedIconPath: "/longbing_card/resource/icon/c.png",
            url: "",
            showTab: 0,
            type: "toShop",
            jump: "toPageUrl",
            text: "商城"
        }, {
            iconPath: "/longbing_card/resource/icon/d.png",
            selectedIconPath: "/longbing_card/resource/icon/d1.png",
            url: "",
            showTab: 0,
            type: "toNews",
            jump: "toPageUrl",
            text: "动态"
        }, {
            iconPath: "/longbing_card/resource/icon/g.png",
            selectedIconPath: "/longbing_card/resource/icon/g2.png",
            url: "",
            showTab: 0,
            type: "toCompany",
            jump: "toPageUrl",
            text: "官网"
        } ]
    }
});