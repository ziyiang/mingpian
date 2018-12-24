var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var sendGoodsId, ping_user_id, ping_chat_to_uid, app = getApp(), chatInput = require("../../chat/chat-input/chat-input.js"), timer = 0, closeReconnect = !1, lockReconnect = !1, beginTime = 0, endTime = 0, heartCheck = {
    timeout: 3e3,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        return console.log("heartCheck.reset.timer", timer), clearTimeout(timer), clearTimeout(this.timeoutObj), 
        clearTimeout(this.serverTimeoutObj), this;
    },
    start: function() {
        this.timeoutObj = setTimeout(function() {
            if (console.log("发送ping"), sendGoodsId) {
                var e = {
                    goods_id: sendGoodsId,
                    user_id: ping_user_id,
                    target_id: ping_chat_to_uid,
                    uniacid: app.siteInfo.uniacid
                };
                e = JSON.stringify(e), wx.sendSocketMessage({
                    data: e,
                    success: function() {
                        console.log("发送goods_id成功", e), sendGoodsId = "";
                    }
                });
            }
            var t = {
                ping: !0,
                user_id: ping_user_id,
                target_id: ping_chat_to_uid
            };
            t = JSON.stringify(t), wx.sendSocketMessage({
                data: t,
                success: function() {
                    console.log("发送ping成功", t);
                }
            });
        }, this.timeout);
    }
};

Page({
    data: {
        user_id: "",
        chat_to_uid: "",
        chatid: "",
        contactUserName: "",
        chatAvatarUrl: "",
        toChatAvatarUrl: "",
        messageDate: "",
        chatInfo: {},
        messageList: [],
        limit: 0,
        staffDefaultData: {
            title: "",
            phone: "",
            wechat: "",
            info: [ {
                img: "/longbing_card/resource/images/img/1.png",
                name: "进入我的名片"
            }, {
                img: "/longbing_card/resource/images/img/2.png",
                name: "查看公司官网"
            }, {
                img: "/longbing_card/resource/images/img/3.png",
                name: "查看公司商品"
            }, {
                img: "/longbing_card/resource/images/img/4.png",
                name: "查看我的动态"
            } ]
        }
    },
    onLoad: function(r) {
        var l = this;
        console.log(r, "/////////////**99999999999999999999*********");
        var e = app.util.url("entry/wxapp/StaffCard");
        if ((a = getCurrentPages()).length && (a = a[getCurrentPages().length - 1]) && a.__route__ && (e = e + "&m=" + a.__route__.split("/")[0]), 
        l.setData({
            staffUrl: e,
            user_id: wx.getStorageSync("userid")
        }), r.goods_id && (sendGoodsId = r.goods_id, console.log(sendGoodsId, "sendGoodsId*************//")), 
        console.log(r, "//////////////////////////****"), 1 == r.is_tpl) {
            var t = {
                user_id: wx.getStorageSync("userid"),
                target_id: r.to_uid
            };
            _index.baseModel.getChatInfo(t).then(function(e) {
                console.log(e.data);
                var t = e.data, a = t.user_info, o = t.target_info, n = t.chat_id, i = o.nickName, s = o.avatarUrl, c = a.avatarUrl;
                l.setData({
                    is_tpl: 1,
                    user_id: wx.getStorageSync("userid"),
                    chat_to_uid: r.to_uid,
                    "chatInfo.chat_id": n,
                    chatAvatarUrl: c,
                    toChatAvatarUrl: s,
                    contactUserName: i,
                    globalData: app.globalData
                }, function() {
                    ping_user_id = wx.getStorageSync("userid"), ping_chat_to_uid = l.data.chat_to_uid, 
                    l.initData(), l.getCardIndexData(), l.getChat();
                });
            });
        } else r.chat_to_uid && l.setData({
            user_id: wx.getStorageSync("userid"),
            chat_to_uid: r.chat_to_uid,
            "chatInfo.chat_id": r.chatid,
            chatAvatarUrl: r.chatAvatarUrl,
            toChatAvatarUrl: r.toChatAvatarUrl,
            contactUserName: r.contactUserName,
            globalData: app.globalData
        }, function() {
            ping_user_id = wx.getStorageSync("userid"), ping_chat_to_uid = l.data.chat_to_uid, 
            l.initData(), l.getCardIndexData(), l.getChat();
        });
        wx.setNavigationBarTitle({
            title: l.data.contactUserName
        });
        var a, o = app.util.url("entry/wxapp/upload");
        (a = getCurrentPages()).length && (a = a[getCurrentPages().length - 1]) && a.__route__ && (o = o + "&m=" + a.__route__.split("/")[0]), 
        l.setData({
            uploadUrl: o
        });
    },
    setLinkTitle: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
        "" != e ? (e += "...", wx.showNavigationBarLoading()) : (e = this.data.contactUserName, 
        wx.hideNavigationBarLoading()), wx.setNavigationBarTitle({
            title: e
        });
    },
    linkSocket: function() {
        var e = this;
        closeReconnect = !1, e.limit = 0, e.setLinkTitle("连接中"), wx.connectSocket({
            url: app.globalData.wssUrl,
            success: function() {
                beginTime = new Date(), console.log("连接成功"), e.initEventHandle();
            }
        });
    },
    initEventHandle: function() {
        var l = this;
        wx.onSocketMessage(function(e) {
            if (l.setLinkTitle(), "pong" == e.data) console.log("WebSocket连接正常...."), heartCheck.reset().start(); else {
                console.log("收到服务器内容：", e);
                var t = JSON.parse(e.data);
                if (console.log("收到服务器内容resData：", t), console.log(l.data.chat_to_uid, l.data.user_id, "chat_to_uid ==> user_id"), 
                "" != t.data) {
                    console.log("res.data不为空", t.data);
                    var a = {};
                    if (t.data2) {
                        if (t.data2.user_id == l.data.chat_to_uid && t.data2.target_id == l.data.user_id) {
                            var o = t.data2.message_type;
                            o || (o = "text"), a = {
                                user_id: l.data.chat_to_uid,
                                target_id: l.data.user_id,
                                content: t.data2.content,
                                type: o,
                                uniacid: app.siteInfo.uniacid
                            };
                        }
                    } else {
                        var n = t.type;
                        n || (n = "text"), a = {
                            user_id: l.data.chat_to_uid,
                            target_id: l.data.user_id,
                            content: t.data,
                            type: n,
                            uniacid: app.siteInfo.uniacid
                        };
                    }
                    if (a.content) {
                        var i = l.data.messageList, s = i.length;
                        if (console.log(l.data.messageList, "that.data.messageList"), 0 < s) i[s - 1].list.push(a); else {
                            var c = new app.util.date(), r = (c.dateToLong(new Date()) / 1e3).toFixed(0);
                            r = c.dateToStr("yyyy-MM-DD HH:mm:ss", c.longToDate(1e3 * r)), console.log(r, "////***555"), 
                            i.push({
                                create_time: r,
                                list: [ a ]
                            });
                        }
                        console.log("res.data不为空 messageList", l.data.messageList), l.setData({
                            messageList: i
                        }, function() {
                            l.pageScrollToBottom();
                        });
                    } else console.log("不是当前聊天对象的数据,不添加到页面");
                }
            }
        }), wx.onSocketOpen(function() {
            console.log("WebSocket连接打开"), l.setLinkTitle(), heartCheck.reset().start();
        }), wx.onSocketError(function(e) {
            console.log("WebSocket连接打开失败 closeReconnect"), l.reconnect();
        }), wx.onSocketClose(function(e) {
            console.log("WebSocket 已关闭！ closeReconnect"), l.reconnect();
        });
    },
    unloadWebSocket: function() {
        console.log("开始卸载 WebSocket"), lockReconnect = closeReconnect = !0, heartCheck.reset(), 
        wx.closeSocket({
            success: function(e) {
                console.log("卸载创建 的  WebSocket 成功", e);
            },
            fail: function(e) {
                console.log("卸载创建 的  WebSocket 失败", e);
            }
        }), heartCheck.reset();
    },
    reconnect: function() {
        var e = this;
        if (console.log("reconnect closeReconnect_1 lockReconnect", lockReconnect, closeReconnect, timer), 
        closeReconnect) return clearTimeout(timer), !(lockReconnect = !(closeReconnect = !0));
        console.log("reconnect closeReconnect_2 lockReconnect", lockReconnect, closeReconnect, timer), 
        lockReconnect && closeReconnect || (this.setLinkTitle("重连中"), lockReconnect = !0, 
        this.getWebSocketErrorTime(), clearTimeout(timer), this.data.limit < 12 ? (timer = setTimeout(function() {
            console.log("reconnect", "this.linkSocket()"), e.linkSocket(), lockReconnect = !1;
        }, 5e3), this.setData({
            limit: this.data.limit + 1
        })) : wx.navigateBack());
    },
    onReady: function() {
        console.log("页面渲染完成");
    },
    onShow: function() {
        console.log("页面显示");
    },
    onHide: function() {
        console.log("页面隐藏");
    },
    onUnload: function() {
        console.log("页面卸载"), this.unloadWebSocket();
    },
    onPullDownRefresh: function() {
        console.log("监听用户下拉动作");
        var e = this;
        e.data.messageDate || 1 == e.data.messageList.length && (messageDate = e.data.messageList[0].list[0].id, 
        e.setData({
            messageDate: messageDate
        }), console.log(messageDate)), e.setData({
            show: !0
        }), e.getMessageList(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {
        console.log("监听页面上拉触底");
    },
    onPageScroll: function(e) {},
    onShareAppMessage: function(e) {
        console.log("用户点击右上角分_享");
    },
    getStaffCard: function() {
        var e, t = this;
        console.log("that.data.chat_to_uid", t.data.chat_to_uid), wx.request((_defineProperty(e = {
            url: t.data.staffUrl,
            data: {
                user_id: t.data.chat_to_uid
            },
            header: {},
            method: "POST"
        }, "header", {
            "content-type": "application/x-www-form-urlencoded"
        }), _defineProperty(e, "success", function(e) {
            wx.hideNavigationBarLoading(), wx.hideLoading(), e.data.errno || (console.log(e, "getStaffCard getStaffCard */////////**"), 
            t.setData({
                contactUserName: e.data.data.count.name,
                "staffDefaultData.phone": e.data.data.count.phone,
                "staffDefaultData.wechat": e.data.data.count.wechat,
                "staffDefaultData.title": "你好，我是" + e.data.data.count.name + "，有什么可以帮到你？记得联系我！"
            }));
        }), _defineProperty(e, "fail", function(e) {
            console.log("fail ==> ", e);
        }), e));
    },
    initData: function() {
        var e = wx.getSystemInfoSync();
        chatInput.init(this, {
            systemInfo: e,
            minVoiceTime: 1,
            maxVoiceTime: 60,
            startTimeDown: 56,
            format: "mp3",
            sendButtonBgColor: "mediumseagreen",
            sendButtonTextColor: "white",
            extraArr: [ {
                picName: "choose_picture",
                description: "照片"
            } ]
        }), this.setData({
            pageHeight: e.windowHeight
        }), this.textButton(), this.extraButton();
    },
    textButton: function() {
        var r = this;
        chatInput.setTextMessageListener(function(e) {
            var s = e.success, t = e.e, a = e.fail, o = t.detail.value;
            console.log("userid**********************", r.data.user_id, r.data.chat_to_uid);
            var c = {
                user_id: r.data.user_id,
                target_id: r.data.chat_to_uid,
                content: o,
                type: "text",
                uniacid: app.siteInfo.uniacid
            };
            c = JSON.stringify(c), console.log(c, "*************************************"), 
            wx.sendSocketMessage({
                data: c,
                success: function(e) {
                    console.log(e, "success");
                    var t = r.data.messageList, a = t.length;
                    if (c = JSON.parse(c), 0 < a) t[a - 1].list.push(c), r.setData({
                        messageList: t
                    }, function() {
                        r.pageScrollToBottom();
                    }); else {
                        var o = ((n = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                        o = n.dateToStr("yyyy-MM-DD HH:mm:ss", n.longToDate(1e3 * o)), console.log(o, "////***555"), 
                        t.push({
                            create_time: o,
                            list: [ c ]
                        }), r.setData({
                            messageList: t
                        }, function() {
                            r.pageScrollToBottom();
                        });
                    }
                    var n, i = ((n = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                    r.SendTemplate(i), s(!0);
                },
                fail: function(e) {
                    console.log(e, "fail"), a(!1);
                }
            });
        });
    },
    extraButton: function() {
        var o = this;
        chatInput.clickExtraListener(function(e) {
            var t = parseInt(e.currentTarget.dataset.index);
            1 !== t ? (wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: 0 === t ? [ "album" ] : [ "camera" ],
                success: function(e) {
                    var t = e.tempFiles;
                    wx.showLoading({
                        title: "发送中..."
                    }), console.log(t), wx.uploadFile({
                        url: o.data.uploadUrl,
                        filePath: t[0].path,
                        name: "upfile",
                        formData: {},
                        success: function(e) {
                            console.log(e, "******/////////////////////res"), wx.hideLoading();
                            var t = JSON.parse(e.data).data.path, a = {
                                user_id: o.data.user_id,
                                target_id: o.data.chat_to_uid,
                                content: t,
                                type: "image",
                                uniacid: app.siteInfo.uniacid
                            };
                            a = JSON.stringify(a), o.toSendMessage(a, 3);
                        }
                    });
                }
            }), chatInput.closeExtraView()) : wx.chooseVideo({
                maxDuration: 10,
                success: function(e) {
                    console.log(e);
                    var t = e.tempFilePath, a = e.thumbTempFilePath;
                    wx.showLoading({
                        title: "发送中..."
                    }), console.log(t, a);
                },
                fail: function(e) {},
                complete: function(e) {}
            });
        }), chatInput.setExtraButtonClickListener(function(e) {
            console.log("Extra弹窗是否消息", e);
        });
    },
    pageScrollToBottom: function() {
        wx.createSelectorQuery().select(".speak_box").boundingClientRect(function(e) {
            console.log(e), wx.pageScrollTo({
                scrollTop: e.height
            });
        }).exec();
    },
    toSendMessage: function(s, t) {
        var c = this;
        wx.sendSocketMessage({
            data: s,
            success: function(e) {
                console.log(e, "success");
                var t = c.data.messageList, a = t.length;
                if (s = JSON.parse(s), console.log(s, "*************************************"), 
                0 < a) t[a - 1].list.push(s); else {
                    var o = ((n = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                    o = n.dateToStr("yyyy-MM-DD HH:mm:ss", n.longToDate(1e3 * o)), console.log(o, "////***555"), 
                    t.push({
                        create_time: o,
                        list: [ s ]
                    });
                }
                c.setData({
                    messageList: t
                }, function() {
                    c.pageScrollToBottom();
                });
                var n, i = ((n = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                console.log("SendTemplate 客户发送给员工 模板消息"), c.SendTemplate(i);
            },
            fail: function(e) {
                c.toSendMessage(s, t);
            }
        });
    },
    SendTemplate: function(e) {
        app.util.request({
            url: "entry/wxapp/SendTemplate",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                to_uid: this.data.chat_to_uid,
                date: e
            },
            success: function(e) {
                console.log("entry/wxapp/SendTemplate ==>", e), e.data.errno;
            },
            fail: function(e) {
                console.log("entry/wxapp/SendTemplate ==> fail ==> ", e);
            }
        });
    },
    getChat: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/chatId",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                to_uid: t.data.chat_to_uid
            },
            success: function(e) {
                console.log("entry/wxapp/chatId ==>", e), e.data.errno || (t.setData({
                    chatInfo: e.data.data,
                    chatAvatarUrl: e.data.data.user_info.avatarUrl,
                    toChatAvatarUrl: e.data.data.target_info.avatarUrl
                }), t.getMessageList());
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    getMessageList: function() {
        var s = this, e = {
            chat_id: s.data.chatInfo.chat_id
        };
        s.data.messageDate && (e.create_time = s.data.messageDate), app.util.request({
            url: "entry/wxapp/messages",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: e,
            success: function(e) {
                if (console.log("entry/wxapp/messages ==>", e), s.linkSocket(), !e.data.errno) {
                    var t = e.data.data.list;
                    if (0 == t.length) return s.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    s.setData({
                        loading: !0,
                        messageDate: e.data.data.create_time
                    });
                    var a = s.data.messageList;
                    1 == s.data.onPullDownRefresh && (a = []), a = a.reverse();
                    var o, n = new app.util.date();
                    for (var i in t) t[i].create_time.length < 12 && (t[i].create_time = n.dateToStr("yyyy-MM-DD HH:mm:ss", n.longToDate(1e3 * t[i].create_time))), 
                    o = t[0].create_time;
                    t = t.reverse(), a.push({
                        create_time: o,
                        list: t
                    }), a = a.reverse(), s.setData({
                        messageList: a,
                        onPullDownRefresh: !1
                    });
                }
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    getCardIndexData: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/cardV3",
            cachetime: "30",
            method: "POST",
            data: {
                to_uid: i.data.chat_to_uid,
                from_id: i.data.chat_to_uid
            },
            success: function(e) {
                if (console.log("entry/wxapp/cardV3 ==>", e), !e.data.errno) {
                    var t = e.data.data, a = t.info.myCompany.addr, o = "";
                    23 < a.length && (o = "..."), t.info.myCompany.addrMore = a.slice(0, 23) + o;
                    var n = {
                        avatar: t.info.avatar,
                        name: t.info.name,
                        job_name: t.info.job_name,
                        phone: t.info.phone,
                        wechat: t.info.wechat,
                        companyName: t.info.myCompany.name,
                        logo: t.info.myCompany.logo,
                        addrMore: t.info.myCompany.addrMore,
                        qrImg: t.qr
                    };
                    i.setData({
                        cardIndexData: t,
                        tmpShareData: n
                    }, function() {
                        i.getStaffCard();
                    });
                }
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    toJump: function(e) {
        var t = this, a = e.currentTarget.dataset.status, o = e.currentTarget.dataset.index, n = e.currentTarget.dataset.type, i = e.currentTarget.dataset.content;
        if ("toHome" == a) app.util.goUrl(e); else if ("toSeeStaff" == a) {
            var s = "/longbing_card/pages/index/index?to_uid=" + t.data.chat_to_uid + "&from_id=" + app.globalData.form_id + "&currentTabBar=";
            0 == o ? (console.log("0 ==>进入我的名片"), s += "toCard") : 1 == o ? (console.log("1 ==>查看公司官网"), 
            s += "toCompany") : 2 == o ? (console.log("2 ==>查看公司商品"), s += "toShop") : 3 == o && (console.log("3 ==>查看我的动态"), 
            s += "toNews"), wx.navigateTo({
                url: s
            });
        } else if ("toCallCopy" == a) {
            if (!i) return !1;
            console.log(i, "//**//"), 2 == n ? wx.makePhoneCall({
                phoneNumber: i,
                success: function(e) {
                    t.toCopyRecord(n);
                }
            }) : 4 == n && wx.setClipboardData({
                data: i,
                success: function(e) {
                    wx.getClipboardData({
                        success: function(e) {
                            t.toCopyRecord(n);
                        }
                    });
                }
            });
        } else "toCopy" == a ? (console.log("复制聊天内容 || 复制微信 || 打电话"), app.util.goUrl(e)) : "toCopyWechat" == a ? (console.log("复制微信"), 
        wx.setClipboardData({
            data: i,
            success: function(e) {
                console.log(e), wx.getClipboardData({
                    success: function(e) {
                        console.log("复制文本成功 ==>>", e.data);
                    }
                });
            }
        }), t.toCopyRecord(n)) : "toCallPhone" == a ? (console.log("打电话"), app.util.goUrl(e), 
        t.toCopyRecord(n)) : "toSaveCard" == a ? (console.log("保存名片码"), wx.navigateTo({
            url: "/longbing_card/pages/card/share/share"
        })) : "previewImage" == a && (console.log(e), wx.previewImage({
            current: i,
            urls: [ i ]
        }));
    },
    toCopyRecord: function(e) {
        app.util.request({
            url: "entry/wxapp/copyRecord",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                type: e,
                to_uid: this.data.chat_to_uid
            },
            success: function(e) {
                e.data.errno;
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    formSubmit: function(e) {
        var t = e.detail.formId;
        this.toSaveFormIds(t);
    },
    toSaveFormIds: function(e) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                formId: e
            },
            success: function(e) {
                console.log("entry/wxapp/formid ==>", e), e.data.errno;
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    getWebSocketErrorTime: function() {
        endTime = new Date();
        var e = beginTime;
        console.log("beginTime", beginTime, "endTime", endTime);
        var t = endTime.getTime() - e.getTime(), a = Math.floor(t / 864e5), o = t % 864e5, n = Math.floor(o / 36e5), i = o % 36e5, s = Math.floor(i / 6e4), c = i % 6e4, r = Math.round(c / 1e3);
        console.log(" 相差 " + a + "天 " + n + "小时 " + s + " 分钟" + r + " 秒");
    }
});