var app = getApp(), recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        cardTypeImgList: [ "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/Yg7rq8Y1CBi2S1R7s2c22TEcqrshCT.png", "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/nR22ZLhs8lQoX77DQX1fJ97fc7Ryzl.png" ],
        cardTypeList: [ "cardType1", "cardType2" ],
        cardTypeIndex: 0,
        job: -1,
        company: -1,
        firstCreate: 0,
        playPushStatus: 1,
        startPushStatus: 1,
        recordAuthMethod: 2,
        globalData: {},
        uploadUrl: "",
        imgCountNum: 9,
        tempRecordFilePath: "",
        tempRecordFileTime: "",
        recordStatusText: "开始录音 按住说话",
        staffInfo: {
            images: []
        },
        currentIndex: 0,
        staffInfoAvatar: "",
        staffInfoImages: [],
        recordStatus: !0,
        icon_voice_png: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/IgvvwVNUIVn6UMh4Dmh4m6nM4Widug.png",
        icon_voice_gif: "http://pb14gmv45.bkt.clouddn.com/images/12/2018/11/CRFPPPTKf6f45J6H3N44BNCrjbFZxH.gif"
    },
    onLoad: function(a) {
        var t = this;
        app.util.showLoading(1), wx.hideShareMenu(), t.getStaffCard(a);
        var o = "";
        t.data.staffInfo.voice ? o = "重新录音 按住说话" : t.data.staffInfo.voice || (o = "开始录音 按住说话");
        var e = app.util.url("entry/wxapp/upload"), n = getCurrentPages();
        n.length && (n = n[getCurrentPages().length - 1]) && n.__route__ && (e = e + "&m=" + n.__route__.split("/")[0]);
        var s = 0;
        if (app.globalData.configInfo.my_company) for (var r in app.globalData.configInfo.company_list) app.globalData.configInfo.my_company.id == app.globalData.configInfo.company_list[r].id && (s = r);
        a.status && t.setData({
            paramStatus: a.status
        }), t.setData({
            recordStatusText: o,
            uploadUrl: e,
            company: s,
            globalData: app.globalData
        }), console.log(t.data.company, "////////////**company"), wx.hideLoading();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        if (1 == t.data.recordAuthMethod) {
            wx.getSetting({
                success: function(a) {
                    a.authSetting["scope.record"] ? (console.log("onshow已经授权"), t.setData({
                        recordAuthMethod: 2
                    })) : t.setData({
                        recordAuthMethod: 1
                    });
                },
                fail: function(a) {
                    console.log("onshow未授权"), t.setData({
                        recordAuthMethod: 1
                    });
                }
            });
            var a = "";
            t.data.staffInfo.voice ? 1 == t.data.recordAuthMethod ? a = "重新录音 按住说话" : 2 == t.data.recordAuthMethod && (a = "重新录音 按住说话") : t.data.staffInfo.voice || (1 == t.data.recordAuthMethod ? a = "开始录音 按住说话" : 2 == t.data.recordAuthMethod && (a = "开始录音 按住说话")), 
            t.setData({
                recordStatusText: a
            });
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();
    },
    onReachBottom: function() {},
    onPageScroll: function(a) {},
    onShareAppMessage: function(a) {},
    bindInputName: function(a) {
        this.setData({
            "tmpCardData.name": a.detail.value
        });
    },
    bindInputPhone: function(a) {
        this.setData({
            "tmpCardData.phone": a.detail.value
        });
    },
    bindInputEmail: function(a) {
        this.setData({
            "tmpCardData.email": a.detail.value
        });
    },
    pickerSelected: function(a) {
        var t = this, o = a.currentTarget.dataset.status;
        if ("job" == o) {
            var e = t.data.staffInfo.jobList;
            t.setData({
                job: a.detail.value,
                "tmpCardData.job_name": e[a.detail.value].name
            });
        }
        if ("address" == o) {
            var n = t.data.globalData.configInfo.company_list;
            t.setData({
                company: a.detail.value,
                "tmpCardData.logo": n[a.detail.value].logo,
                "tmpCardData.company_addr": n[a.detail.value].addr,
                "tmpCardData.company_name": n[a.detail.value].name,
                "tmpCardData.company_short_name": n[a.detail.value].short_name
            });
        }
    },
    getStaffCard: function(c) {
        var d = this;
        wx.showLoading({
            title: "加载中"
        }), app.util.request({
            url: "entry/wxapp/StaffCard",
            cachetime: "30",
            method: "POST",
            data: {},
            success: function(a) {
                if (!a.data.errno) {
                    var t = a.data.data.count, o = d.data.staffInfoImages;
                    for (var e in t.images) t.images[e] || t.images.splice(e, 1), 0 < t.images.length && o.push(t.images[e]);
                    var n = 0;
                    t.id || (n = 1), console.log(n, "**********///0000");
                    var s = "";
                    c.avatar && (t.avatar = c.avatar, s = c.avatarImg, t.card_type = c.cardtype);
                    var r = d.data.globalData.configInfo.my_company;
                    r || (r = d.data.globalData.configInfo.company_list[0]), t.card_type || (t.card_type = "cardType1");
                    var i = {
                        logo: r.logo,
                        company_name: r.name,
                        company_short_name: r.short_name,
                        company_addr: r.addr,
                        avatar: t.avatar,
                        default: app.globalData.defaultUserImg,
                        name: t.name,
                        phone: t.phone,
                        email: t.email,
                        job_name: a.data.data.job_list[a.data.data.job_index].name
                    };
                    d.setData({
                        firstCreate: n,
                        tmpCardData: i,
                        job: a.data.data.job_index,
                        staffInfoImages: o,
                        staffInfo: t,
                        cardTypeIndex: parseInt(t.card_type.split("cardType")[1]) - 1,
                        "staffInfo.jobList": a.data.data.job_list,
                        staffInfoAvatar: s,
                        imgCountNum: 9 - o.length
                    });
                }
            },
            fail: function(a) {
                console.log("fail ==> ", a), -1 == a.data.errno && (d.setData({
                    firstCreate: 1
                }), console.log(d.data.firstCreate, "**********///111"));
            }
        });
    },
    toEditStaff: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/EditStaffV2",
            cachetime: "30",
            method: "POST",
            data: a,
            success: function(a) {
                a.data.errno || (app.globalData.configInfo = !1, getApp().getConfigInfo().then(function() {
                    t.setData({
                        globalData: app.globalData
                    }, function() {
                        console.log(t.data.paramStatus, a, "11111111111111");
                        var a = "名片修改成功！";
                        "createCard" == t.data.paramStatus && 1 == t.data.firstCreate && (console.log(t.data.paramStatus, t.data.firstCreate, "00000000000"), 
                        a = "名片创建成功，请等待管理人员审核！"), console.log(a, t.data.paramStatus, t.data.firstCreate, "11111111111111"), 
                        wx.showToast({
                            icon: "none",
                            title: a,
                            duration: 2e3,
                            success: function() {
                                setTimeout(function() {
                                    wx.hideToast(), "createCard" == t.data.paramStatus ? wx.reLaunch({
                                        url: "/longbing_card/pages/index/index?currentTabBar=cardList&paramStatus=createCard"
                                    }) : wx.navigateBack();
                                }, 3e3);
                            }
                        });
                    });
                }));
            },
            fail: function(a) {
                console.log("entry/wxapp/EditStaff ==>fail ==> ", a);
            }
        });
    },
    chooseImage: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "优雅自拍", "相册收藏" ],
            itemColor: "#3675f1",
            success: function(a) {
                a.cancel || (0 == a.tapIndex ? t.chooseWxImageShop("camera") : 1 == a.tapIndex && t.chooseWxImageShop("album"));
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        });
    },
    chooseWxImageShop: function(a) {
        var o = this, e = o.data.staffInfo.images, n = o.data.staffInfoImages, t = o.data.imgCountNum;
        wx.chooseImage({
            count: t,
            sizeType: [ "original", "compressed" ],
            sourceType: [ a ],
            success: function(a) {
                for (var t in a.tempFilePaths) console.log(a.tempFilePaths[t], "****************//res.tempFilePaths[i]"), 
                app.util.showLoading(3), wx.uploadFile({
                    url: o.data.uploadUrl,
                    filePath: a.tempFilePaths[t],
                    name: "upfile",
                    formData: {},
                    success: function(a) {
                        console.log(a, "******/////////////////////res");
                        var t = JSON.parse(a.data);
                        e.push(t.data.path), n.push(t.data.img), wx.hideLoading(), o.setData({
                            "staffInfo.images": e,
                            staffInfoImages: n,
                            imgCountNum: 8 - e.length
                        });
                    }
                });
            },
            fail: function(a) {
                console.log("fail ==> ", a), wx.hideLoading();
            }
        });
    },
    getCheckAuthRecord: function() {
        var t = this;
        wx.authorize({
            scope: "scope.record",
            success: function(a) {
                console.log("getCheckAuthRecord 授权成功"), t.setData({
                    recordAuthMethod: 2
                });
            },
            fail: function() {
                t.setData({
                    recordAuthMethod: 1
                });
            }
        });
        var a = "";
        t.data.staffInfo.voice ? 1 == t.data.recordAuthMethod ? a = "重新录音 按住说话" : 2 == t.data.recordAuthMethod && (a = "重新录音 按住说话") : t.data.staffInfo.voice || (1 == t.data.recordAuthMethod ? a = "开始录音 按住说话" : 2 == t.data.recordAuthMethod && (a = "开始录音 按住说话")), 
        t.setData({
            recordAuthMethod: a
        });
    },
    startRecord: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.record"] ? (console.log("startRecord 已经授权"), t.toStartRecord()) : (t.getCheckAuthRecord(), 
                console.log("getCheckAuthRecord"));
            },
            fail: function(a) {
                t.getCheckAuthRecord(), console.log("getCheckAuthRecord");
            }
        });
    },
    stopRecord_get: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.record"] && t.stopRecord();
            }
        });
    },
    toStartRecord: function() {
        console.log(recorderManager, "recorderManager"), this.setData({
            showTostImg: !0
        }), recorderManager.start({
            duration: 6e4,
            sampleRate: 16e3,
            numberOfChannels: 1,
            encodeBitRate: 96e3,
            format: "mp3",
            frameSize: 50
        }), recorderManager.onStart(function() {
            console.log("recorder start");
        });
        var a = "";
        this.data.staffInfo.voice ? a = "重新录音 松开结束" : this.data.staffInfo.voice || (a = "开始录音 松开结束"), 
        this.setData({
            tmpRecordStatusText: a
        }), recorderManager.onError(function(a) {
            console.log(a);
        });
    },
    stopRecord: function() {
        var t = this;
        recorderManager.stop(), recorderManager.onStop(function(a) {
            console.log(a, "recorder onStop"), t.setData({
                "staffInfo.voice": a.tempFilePath,
                "staffInfo.voice_time": (a.duration / 1e3).toFixed(0),
                showTostImg: !1
            }), console.log("staffInfo.voice", t.data.staffInfo.voice);
        }), t.setData({
            startPushStatus: 1
        });
    },
    toUploadRecord: function(o) {
        var e = this;
        -1 != e.data.staffInfo.voice.indexOf("wxfile://") ? wx.uploadFile({
            url: e.data.uploadUrl,
            filePath: e.data.staffInfo.voice,
            name: "upfile",
            formData: {},
            success: function(a) {
                console.log(a, "******/////////////////////res", e.data.tempRecordFileTime);
                var t = JSON.parse(a.data);
                e.setData({
                    "staffInfo.voice": t.data.path,
                    staffInfoVoice: t.data.img
                }), o && o();
            },
            fail: function(a) {
                console.log("fail ==> ", a);
            }
        }) : o && o();
    },
    formSubmit: function(a) {
        var d = this, t = a.detail.formId, o = a.detail.target.dataset.status;
        if (d.toSaveFormIds(t), "toEditStaff" == o) {
            console.log("修改名片信息");
            var f = a.detail.value;
            d.toUploadRecord(function() {
                if (console.log("wx.showLoading  wx.hideLoading  wx.showToast", f), !f.name) return console.log("姓名:", f.name), 
                wx.showToast({
                    icon: "none",
                    title: "请填写姓名！",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.hideToast();
                        }, 3e3);
                    }
                }), !1;
                if (!f.phone) return console.log("手机号:", f.phone), wx.showToast({
                    icon: "none",
                    title: "请填写手机号！",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.hideToast();
                        }, 3e3);
                    }
                }), !1;
                var a = d.data.staffInfoImages, t = d.data.staffInfo.images, o = "", e = "", n = "";
                if (0 < a.length) for (var s in a) o += a[s] + ","; else for (var r in t) o += t[r] + ",";
                e = d.data.staffInfoAvatar ? d.data.staffInfoAvatar : d.data.staffInfo.avatar, n = d.data.staffInfoVoice ? d.data.staffInfoVoice : d.data.staffInfo.voice;
                var i = "";
                if (d.data.job < 0) return i = "", wx.showToast({
                    icon: "none",
                    title: "请选择职称！",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.hideToast();
                        }, 3e3);
                    }
                }), !1;
                i = d.data.staffInfo.jobList[d.data.job].id;
                var c = d.data.globalData.configInfo.company_list[d.data.company].id;
                o = o.slice(0, -1), f.avatar = e, f.voice = n, f.voice_time = d.data.staffInfo.voice_time, 
                f.images = o, f.job_id = i, f.company_id = c, f.card_type = d.data.staffInfo.card_type, 
                console.log(f, "///////////**********"), d.toEditStaff(f);
            });
        }
    },
    toSaveFormIds: function(a) {
        app.util.request({
            url: "entry/wxapp/formid",
            cachetime: "30",
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
    },
    upload: function() {
        var n = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0], o = n.data.staffInfo.card_type, e = n.data.paramStatus;
                wx.redirectTo({
                    url: "/longbing_card/staff/mine/upload/upload?src=" + t + "&cardtype=" + o + "&paramstatus=" + e
                });
            }
        });
    },
    toJump: function(a) {
        var t = this, o = a.currentTarget.dataset.status, e = a.currentTarget.dataset.index, n = a.currentTarget.dataset.type;
        if ("toCopyright" == o && app.util.goUrl(a), "toCardType" == o) {
            var s = t.data.cardTypeList;
            t.setData({
                cardTypeIndex: e,
                "staffInfo.card_type": s[e]
            });
        } else if ("toUpload" == o) console.log("修改头像 || 图片展示"), "toAvatar" == n ? t.upload() : "toImages" == n && t.chooseImage(); else if ("toVoice" == o) {
            if (1 == n) {
                console.log("语音播放 playBackgroundAudio", t.data.staffInfo.voice), innerAudioContext.autoplay = !0;
                var r = t.data.staffInfo.voice;
                r ? innerAudioContext.src = r : (wx.showToast({
                    icon: "none",
                    title: "暂未上传语音！",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            return wx.hideToast(), !1;
                        }, 3e3);
                    }
                }), setTimeout(function() {
                    return !1;
                }, 3e3)), innerAudioContext.play(function() {
                    console.log("开始播放");
                }), t.setData({
                    playPushStatus: 2
                });
            }
            2 == n && (innerAudioContext.pause(function() {
                console.log("暂停播放");
            }), t.setData({
                playPushStatus: 1
            }));
        } else if ("toDeleteImg" == o) {
            console.log("删除图片");
            var i = t.data.staffInfo.images, c = t.data.staffInfoImages;
            c.splice(e, 1), i.splice(e, 1), t.setData({
                "staffInfo.images": i,
                staffInfoImages: c,
                imgCountNum: 8 - i.length
            });
        }
        innerAudioContext.onEnded(function() {
            console.log("音频自然播放结束事件"), t.setData({
                playPushStatus: 1
            });
        });
    }
});