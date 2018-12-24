var _xx_util = require("../../resource/js/xx_util.js"), _xx_util2 = _interopRequireDefault(_xx_util), _index = require("../../resource/apis/index.js");

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var ping_user_id, ping_chat_to_uid, app = getApp(), chatInput = require("../../chat/chat-input/chat-input.js"), timer = 0, closeReconnect = !1, lockReconnect = !1, heartCheck = {
    timeout: 5e3,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
        return clearTimeout(timer), clearTimeout(this.timeoutObj), clearTimeout(this.serverTimeoutObj), 
        this;
    },
    start: function() {
        this.timeoutObj = setTimeout(function() {
            console.log("发送ping");
            var e = {
                ping: !0,
                user_id: ping_user_id,
                target_id: ping_chat_to_uid
            };
            e = JSON.stringify(e), wx.sendSocketMessage({
                data: e,
                success: function() {
                    console.log("发送ping成功", e);
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
        useMessageType: [],
        currUType: 0,
        useMessage: [],
        showEditSec: !1,
        clientSource: [],
        messageList: [],
        lockReconnect: !1,
        limit: 0,
        closeReconnect: !1,
        showAddUseSec: !1,
        showUseMessage: !1
    },
    onLoad: function(l) {
        var d = this;
        if (console.log(l, "/////////////**99999999999999999999*********"), 1 == l.is_tpl) {
            var e = {
                user_id: wx.getStorageSync("userid"),
                target_id: l.to_uid
            };
            _index.baseModel.getChatInfo(e).then(function(e) {
                console.log(e.data, "baseModel.getChatInfo(paramObj)");
                var t = e.data, a = t.user_info, o = t.target_info, s = t.chat_id, n = o.nickName, i = o.avatarUrl, c = a.avatarUrl;
                d.setData({
                    is_tpl: 1,
                    chat_to_uid: l.to_uid,
                    "chatInfo.chat_id": s,
                    chatAvatarUrl: c,
                    toChatAvatarUrl: i,
                    contactUserName: n,
                    user_id: wx.getStorageSync("userid"),
                    globalData: app.globalData
                }, function() {
                    ping_user_id = wx.getStorageSync("userid"), ping_chat_to_uid = d.data.chat_to_uid, 
                    d.initData(), d.data.chatInfo.chat_id ? d.getMessageList() : d.data.chatInfo.chat_id || d.getChat();
                });
            });
        } else d.setData({
            chat_to_uid: l.chat_to_uid,
            "chatInfo.chat_id": l.chatid,
            chatAvatarUrl: l.chatAvatarUrl,
            toChatAvatarUrl: l.toChatAvatarUrl,
            contactUserName: l.contactUserName,
            user_id: wx.getStorageSync("userid"),
            globalData: app.globalData
        }, function() {
            ping_user_id = wx.getStorageSync("userid"), ping_chat_to_uid = d.data.chat_to_uid, 
            d.initData(), d.data.chatInfo.chat_id ? d.getMessageList() : d.data.chatInfo.chat_id || d.getChat();
        });
        wx.setNavigationBarTitle({
            title: d.data.contactUserName
        });
        var t = app.util.url("entry/wxapp/upload"), a = getCurrentPages();
        a.length && (a = a[getCurrentPages().length - 1]) && a.__route__ && (t = t + "&m=" + a.__route__.split("/")[0]), 
        d.setData({
            uploadUrl: t
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
        e.setLinkTitle("连接中"), e.closeReconnect = !1, e.limit = 0, wx.connectSocket({
            url: app.globalData.wssUrl,
            success: function() {
                console.log("连接成功"), e.initEventHandle();
            }
        });
    },
    initEventHandle: function() {
        var t = this, d = this;
        wx.onSocketMessage(function(e) {
            if (d.setLinkTitle(), "pong" == e.data) console.log("WebSocket连接正常...."), heartCheck.reset().start(); else {
                console.log("收到服务器内容：", e);
                var t = JSON.parse(e.data);
                if (console.log("收到服务器内容resData：", t), console.log(d.data.chat_to_uid, d.data.user_id, "chat_to_uid ==> user_id"), 
                "" != t.data) {
                    console.log("res.data不为空", t.data);
                    var a = {};
                    if (t.data2) {
                        if (t.data2.user_id == d.data.chat_to_uid && t.data2.target_id == d.data.user_id) {
                            var o = t.data2.message_type;
                            o || (o = "text"), a = {
                                user_id: d.data.chat_to_uid,
                                target_id: d.data.user_id,
                                content: t.data2.content,
                                type: o,
                                uniacid: app.siteInfo.uniacid
                            }, console.log(t.data2.user_id, d.data.chat_to_uid, a);
                        }
                    } else {
                        var s = t.type;
                        s || (s = "text"), a = {
                            user_id: d.data.chat_to_uid,
                            target_id: d.data.user_id,
                            content: t.data,
                            type: s,
                            uniacid: app.siteInfo.uniacid
                        }, console.log(a);
                    }
                    if (a.content) {
                        var n = d.data.messageList, i = n.length;
                        if (console.log(d.data.messageList, "that.data.messageList"), 0 < i) n[i - 1].list.push(a); else {
                            var c = new app.util.date(), l = (c.dateToLong(new Date()) / 1e3).toFixed(0);
                            l = c.dateToStr("yyyy-MM-DD HH:mm:ss", c.longToDate(1e3 * l)), console.log(l, "that.data.messageList length = 0 ////***555"), 
                            n.push({
                                create_time: l,
                                list: [ a ]
                            });
                        }
                        d.setData({
                            messageList: n
                        }, function() {
                            d.pageScrollToBottom();
                        }), console.log("res.data不为空 messageList", d.data.messageList);
                    } else console.log("不是当前聊天对象的数据,不添加到页面");
                }
            }
        }), wx.onSocketOpen(function() {
            console.log("WebSocket连接打开"), d.setLinkTitle(), heartCheck.reset().start();
        }), wx.onSocketError(function(e) {
            console.log("WebSocket连接打开失败"), t.reconnect();
        }), wx.onSocketClose(function(e) {
            console.log("WebSocket 已关闭！"), t.reconnect();
        });
    },
    unloadWebSocket: function() {
        console.log("开始卸载 WebSocket"), lockReconnect = closeReconnect = !0, heartCheck.reset(), 
        wx.closeSocket(function(e) {
            console.log("卸载创建 的  WebSocket");
        });
    },
    reconnect: function() {
        var e = this;
        if (console.log("closeReconnect", closeReconnect, timer), closeReconnect) return clearTimeout(timer), 
        !(lockReconnect = !(closeReconnect = !0));
        console.log("closeReconnect", closeReconnect, timer), lockReconnect && closeReconnect || (this.setLinkTitle("重连中"), 
        lockReconnect = !0, clearTimeout(timer), this.data.limit < 12 ? (timer = setTimeout(function() {
            e.linkSocket(), lockReconnect = !1;
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
    onReachBottom: function() {},
    onPageScroll: function(e) {},
    onShareAppMessage: function(e) {},
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
        }), this.textButton(), this.extraButton(), this.getSource();
    },
    textButton: function() {
        var l = this;
        chatInput.setTextMessageListener(function(e) {
            var i = e.success, t = e.e, a = e.fail, o = t.detail.value;
            console.log("userid**********************", l.data.user_id, l.data.chat_to_uid);
            var c = {
                user_id: l.data.user_id,
                target_id: l.data.chat_to_uid,
                content: o,
                type: "text",
                uniacid: app.siteInfo.uniacid
            };
            c = JSON.stringify(c), console.log(c, "*************************************"), 
            wx.sendSocketMessage({
                data: c,
                success: function(e) {
                    console.log(e, "success");
                    var t = l.data.messageList, a = t.length;
                    if (c = JSON.parse(c), console.log(c, "*************************************"), 
                    0 < a) t[a - 1].list.push(c); else {
                        var o = ((s = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                        o = s.dateToStr("yyyy-MM-DD HH:mm:ss", s.longToDate(1e3 * o)), t.push({
                            create_time: o,
                            list: [ c ]
                        });
                    }
                    l.setData({
                        messageList: t
                    }, function() {
                        l.pageScrollToBottom();
                    });
                    var s, n = ((s = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                    console.log("SendTemplate 客户发送给员工 模板消息"), l.SendTemplateCilent(n), i(!0);
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
            }), o.hideExtra()) : wx.chooseVideo({
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
    hideExtra: function(e) {
        this.setData({
            "inputObj.extraObj.chatInputShowExtra": !1
        });
    },
    toSendMessage: function(i, c) {
        var l = this;
        wx.sendSocketMessage({
            data: i,
            success: function(e) {
                console.log(e, "success");
                var t = l.data.messageList, a = t.length;
                if (i = JSON.parse(i), console.log(i, "*************************************"), 
                0 < a) t[a - 1].list.push(i); else {
                    var o = ((s = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                    o = s.dateToStr("yyyy-MM-DD HH:mm:ss", s.longToDate(1e3 * o)), console.log(o, "////***555"), 
                    t.push({
                        create_time: o,
                        list: [ i ]
                    });
                }
                l.setData({
                    messageList: t
                }, function() {
                    l.pageScrollToBottom();
                });
                var s, n = ((s = new app.util.date()).dateToLong(new Date()) / 1e3).toFixed(0);
                console.log("SendTemplate 客户发送给员工 模板消息"), l.SendTemplateCilent(n), 2 == c && l.setData({
                    showUseMessage: !1,
                    showAddUseSec: !1
                });
            },
            fail: function(e) {
                2 == c ? l.setData({
                    showUseMessage: !1,
                    showAddUseSec: !1
                }) : 3 == c && l.toSendMessage(i, c);
            }
        });
    },
    SendTemplateCilent: function(e) {
        console.log(this.data.chat_to_uid, "chat_to_uid"), app.util.request({
            url: "entry/wxapp/SendTemplateCilent",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                client_id: this.data.chat_to_uid,
                date: e
            },
            success: function(e) {
                console.log("entry/wxapp/SendTemplateCilent ==>", e), e.data.errno;
            },
            fail: function(e) {
                console.log("entry/wxapp/SendTemplateCilent ==> fail ==> ", e);
            }
        });
    },
    getSource: function() {
        var t = this;
        console.log(t.data.chat_to_uid, "that.data.chat_to_uid"), app.util.request({
            url: "entry/wxapp/Source",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                client_id: t.data.chat_to_uid
            },
            success: function(e) {
                console.log("entry/wxapp/Source ==>", e), e.data.errno || (t.setData({
                    clientSource: e.data.data
                }), console.log(e.data.data, t.data.clientSource));
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        }), t.getReplyList();
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
        var i = this, e = {
            chat_id: i.data.chatInfo.chat_id
        };
        i.data.messageDate && (e.create_time = i.data.messageDate), app.util.request({
            url: "entry/wxapp/messages",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: e,
            success: function(e) {
                if (console.log("entry/wxapp/messages ==>", e), i.linkSocket(), !e.data.errno) {
                    var t = e.data.data.list;
                    if (0 == t.length) return i.setData({
                        more: !1,
                        loading: !1,
                        isEmpty: !0,
                        show: !0
                    }), !1;
                    i.setData({
                        loading: !0,
                        messageDate: e.data.data.create_time
                    });
                    var a = i.data.messageList;
                    1 == i.data.onPullDownRefresh && (a = []), a = a.reverse();
                    var o, s = new app.util.date();
                    for (var n in t) t[n].create_time.length < 12 && (t[n].create_time = s.dateToStr("yyyy-MM-DD HH:mm:ss", s.longToDate(1e3 * t[n].create_time))), 
                    o = t[0].create_time;
                    t = t.reverse(), a.push({
                        create_time: o,
                        list: t
                    }), a = a.reverse(), i.setData({
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
    getReplyList: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/ReplyList",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {},
            success: function(e) {
                if (console.log("entry/wxapp/ReplyList ==>", e), !e.data.errno) {
                    var t = e.data.data, a = s.data.useMessageType;
                    for (var o in t) a.push(t[o].title);
                    s.setData({
                        useMessage: t,
                        useMessageType: a
                    });
                }
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    getAddReply: function(t) {
        var a = this, o = a.data.useMessage, s = o[a.data.currUType].list;
        app.util.request({
            url: "entry/wxapp/AddReply",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                content: t
            },
            success: function(e) {
                console.log("entry/wxapp/AddReply ==>", e), e.data.errno || (s.push({
                    id: e.data.data.id,
                    content: t
                }), a.setData({
                    currUType: 0,
                    useMessage: o,
                    showAddUseSec: !1
                }));
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    },
    getEditReply: function(t) {
        var a = this, o = a.data.useMessage, s = o[a.data.currUType].list;
        app.util.request({
            url: "entry/wxapp/EditReply",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                id: s[a.data.toEditInd].id,
                content: t
            },
            success: function(e) {
                console.log("entry/wxapp/EditReply ==>", e), e.data.errno || (s[a.data.toEditInd].content = t, 
                a.setData({
                    useMessage: o,
                    showAddUseSecContent: "",
                    showAddUseSec: !1,
                    showEditSec: !1
                }));
            },
            fail: function(e) {
                console.log("fail ==> ", e), a.setData({
                    showAddUseSecContent: "",
                    showAddUseSec: !1,
                    showEditSec: !1
                });
            }
        });
    },
    getDelReply: function(t) {
        var a = this, o = a.data.useMessage, s = o[a.data.currUType].list;
        app.util.request({
            url: "entry/wxapp/DelReply",
            cachetime: "30",
            showLoading: !1,
            method: "POST",
            data: {
                id: s[t].id
            },
            success: function(e) {
                console.log("entry/wxapp/DelReply ==>", e), e.data.errno || (wx.showToast({
                    icon: "none",
                    title: "已成功删除数据！",
                    duration: 1e3
                }), s.splice(t, 1), a.setData({
                    useMessage: o,
                    showEditSec: !1
                }));
            },
            fail: function(e) {
                console.log("fail ==> ", e), a.setData({
                    showEditSec: !1
                });
            }
        });
    },
    toJump: function(e) {
        var t = this, a = e.currentTarget.dataset.status, o = e.currentTarget.dataset.index, s = e.currentTarget.dataset.type, n = e.currentTarget.dataset.content;
        if ("toHome" == a) app.util.goUrl(e); else if ("previewImage" == a) console.log(e), 
        wx.previewImage({
            current: n,
            urls: [ n ]
        }); else if ("toCopy" == a) console.log("复制聊天内容"), app.util.goUrl(e); else if ("toUse" == a) console.log("常用话术"), 
        t.setData({
            showUseMessage: !0
        }); else if ("toSetTab" == a) console.log("切换分类"), t.setData({
            currUType: o,
            showEditSec: !1
        }); else if ("toSendMessage" == a) {
            console.log("发送常用话术");
            var i = {
                user_id: t.data.user_id,
                target_id: t.data.chat_to_uid,
                content: n,
                type: "text",
                uniacid: app.siteInfo.uniacid
            };
            i = JSON.stringify(i), console.log(i, "发送常用话术 *************************************"), 
            t.toSendMessage(i, 2);
        } else if ("toClose" == a) console.log("关闭常用话术"), t.setData({
            showUseMessage: !1,
            showAddUseSec: !1,
            showAddUseSecContent: "",
            toEditInd: ""
        }); else if ("toAdd" == a) console.log("新增话术"), t.setData({
            showAddUseSec: !0
        }); else if ("toEditSec" == a) {
            var c;
            console.log("编辑话术"), 1 == s && (c = !1), 0 == s && (c = !0), t.setData({
                showEditSec: c
            });
        } else "toEdit" == a ? (console.log("编辑话术"), t.setData({
            showAddUseSecContent: n,
            showAddUseSec: !0,
            toEditInd: o
        })) : "toDelete" == a && (console.log("删除话术"), wx.showModal({
            title: "",
            content: "是否确认删除此数据？",
            success: function(e) {
                e.confirm ? t.getDelReply(o) : t.setData({
                    showEditSec: !1
                });
            }
        }));
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.target.dataset.status, o = e.detail.formId;
        if (t.toSaveFormIds(o), "toCancel" == a) console.log("取消"), t.setData({
            showAddUseSec: !1,
            showAddUseSecContent: "",
            toEditInd: ""
        }); else if ("toSaveUseMessage" == a) {
            console.log("保存");
            var s = e.detail.value.newuse;
            t.data.showAddUseSecContent ? t.getEditReply(s) : t.getAddReply(s);
        }
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
                e.data.errno;
            },
            fail: function(e) {
                console.log("fail ==> ", e);
            }
        });
    }
});