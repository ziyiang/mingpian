var _that = void 0, _baseModel = void 0, _util = void 0;

function checkAuth(t, e, o) {
    _that = t, _baseModel = e, _util = o, wx.getSetting({
        success: function(t) {
            t.authSetting["scope.userInfo"] ? (console.log("有res.authSetting['scope.userInfo']"), 
            _that.setData({
                authStatus: !0
            }), wx.getUserInfo({
                lang: "zh_CN",
                success: function(t) {
                    console.log("获取微信用户信息 ==>>", t.userInfo), getChangeUserInfo(t.userInfo);
                }
            })) : (console.log("没有res.authSetting['scope.userInfo']"), _that.setData({
                authStatus: !1
            }));
        },
        fail: function(t) {
            console.log("wx.getSetting ==>> fail"), _that.setData({
                authStatus: !1
            });
        }
    });
}

function getUserInfo(t) {
    if (t.detail.userInfo) {
        var e = t.detail.userInfo;
        console.log("获取微信用户信息 ==>>", e), getChangeUserInfo(e), _that.setData({
            authStatus: !0
        });
    } else console.log("拒绝授权"), _that.setData({
        authStatus: !1
    });
}

function getChangeUserInfo(t) {
    var e = t;
    _baseModel.getUpdateUserInfo(e).then(function(t) {
        _util.hideAll();
    });
}

module.exports = {
    checkAuth: checkAuth,
    getUserInfo: getUserInfo
};