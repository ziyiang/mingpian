var timerLeftTime, app = getApp();

Page({
    data: {
        globalData: {},
        bgStatus: !1,
        shareStatus: !1
    },
    onLoad: function(a) {
        var t = this;
        app.util.showLoading(1), wx.hideShareMenu();
        var e = {};
        a.id && (e.detailID = a.id), a.collage_id && (e.collage_id = a.collage_id), a.to_uid && (e.to_uid = a.to_uid, 
        app.globalData.to_uid = a.to_uid), a.from_id && (e.from_id = a.from_id, app.globalData.from_id = a.from_id), 
        a.status && (e.status = a.status), a.sharestatus && (e.sharestatus = a.sharestatus), 
        t.setData({
            paramData: e,
            globalData: app.globalData
        }), console.log(a, t, "releaseCollage   /////////////////  options"), t.getProductDetail(), 
        wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        clearInterval(timerLeftTime);
    },
    onUnload: function() {
        clearInterval(timerLeftTime);
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getProductDetail();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = this, e = t.data.paramData;
        return a.from, {
            title: t.data.detailData.name,
            path: "/longbing_card/pages/shop/releaseCollage/releaseCollage?id=" + e.detailID + "&collage_id=" + e.collage_id + "&to_uid=" + e.to_uid + "&from_id=" + wx.getStorageSync("userid") + "&status=toPay&sharestatus=fromshare",
            imageUrl: t.data.detailData.cover_true
        };
    },
    getProductDetail: function() {
        var o = this;
        console.log(o.data.paramData.to_uid, "app.globalData.to_uid"), app.util.request({
            url: "entry/wxapp/ShopGoodsDetail",
            cachetime: "30",
            method: "POST",
            data: {
                goods_id: o.data.paramData.detailID,
                to_uid: o.data.paramData.to_uid
            },
            success: function(a) {
                if (console.log("entry/wxapp/goodsDetail ==>", a), !a.data.errno) {
                    var t = a.data.data, e = {
                        name: t.name,
                        collage_count: t.collage_count,
                        cover2: t.cover2,
                        qr: t.qr
                    };
                    o.setData({
                        shareParamObj: e,
                        detailData: t
                    }, function() {
                        o.getCollageList();
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    getCollageList: function() {
        var u = this;
        app.util.request({
            url: "entry/wxapp/shopcollagelist",
            cachetime: "30",
            method: "POST",
            data: {
                goods_id: u.data.paramData.detailID
            },
            success: function(a) {
                if (console.log("entry/wxapp/shopcollagelist ==>", a), !a.data.errno) {
                    var t, e = a.data.data, o = new app.util.date(), r = {};
                    for (var i in e) u.data.paramData.collage_id == e[i].id && (r = e[i]);
                    e = r, console.log(e, "////////////////////////****tmpData");
                    var s = e.left_time;
                    timerLeftTime = setInterval(function() {
                        s -= 1;
                        var a = parseInt(s / 24 / 60 / 60);
                        t = (a = 0 < a ? a + "天 " : "") + o.dateToStr("HH:mm:ss", o.longToDate(1e3 * s)), 
                        u.setData({
                            tmpTimes: t
                        });
                    }, 1e3);
                    var l = [];
                    if (e.users) for (var d in e.users) l.push(e.users[d].id);
                    for (var n in e.own && l.push(e.own.id), console.log(l, "************///"), l) wx.getStorageSync("userid") == l[n] && u.setData({
                        "paramData.status": "toShare"
                    });
                    console.log(e, "//////////////////******collageList");
                    var c = e, g = {
                        price: c.price,
                        people: c.people
                    };
                    u.setData({
                        shareParamObj2: g,
                        collageList: e
                    });
                }
            },
            fail: function(a) {
                console.log("entry/wxapp/shopcollagelist ==> fail ==> ", a);
            }
        });
    },
    toJump: function(a) {
        var t = this, e = a.currentTarget.dataset.status;
        if ("toCopyright" == e || "toJumpIndex" == e) app.util.goUrl(a); else if ("toShare" == e) console.log("邀请好友拼单"), 
        t.setData({
            bgStatus: !0,
            shareStatus: !0
        }); else if ("toCheckShare" == e) {
            var o = a.currentTarget.dataset.num;
            1 == o ? console.log("发送给朋友") : 2 == o ? (console.log("生成海报"), wx.navigateTo({
                url: "/longbing_card/pages/shop/collageShare/collageShare"
            })) : 3 == o && console.log("取消"), t.setData({
                bgStatus: !1,
                shareStatus: !1
            });
        } else if ("toJoinCollage" == e) {
            console.log("一键拼单");
            var r = t.data.collageList, i = t.data.detailData;
            for (var s in i.spe_price) r.spe_price_id == i.spe_price[s].id && (i.stock = i.spe_price[s].stock);
            t.setData({
                detailData: i
            });
            var l = {
                count_price: r.number * r.price,
                tmp_trolley_ids: i.id,
                dataList: [ {
                    name: i.name,
                    number: r.number,
                    goods_id: i.id,
                    cover_true: i.cover_true,
                    freight: i.freight,
                    spe: t.data.spe_text,
                    price2: r.price,
                    stock: i.stock,
                    collage_id: r.id
                } ]
            };
            wx.setStorageSync("storageToOrder", l);
            var d = "/longbing_card/pages/shop/car/toOrder/toOrder?status=" + e;
            "fromshare" == t.data.paramData.sharestatus && (d += "&sharestatus=fromshare"), 
            console.log("dddddddddddddd", d), wx.navigateTo({
                url: d
            });
        }
    }
});