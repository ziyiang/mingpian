var _that = void 0, _userModel = void 0, _util = void 0;

function getVoucher(t, e, o, a) {
    if (_that = t, _userModel = e, _util = o, "getPhoneNumber:ok" == a.detail.errMsg) {
        console.log("同意授权获取电话号码");
        var l = a.detail.encryptedData, u = a.detail.iv;
        console.log(l, u), t.setPhoneInfo(l, u);
    } else "getPhoneNumber:fail user deny" == a.detail.errMsg && console.log("拒绝授权获取电话号码");
}

function setPhoneInfo(o, a) {
    wx.login({
        success: function(t) {
            console.log("wx.login ==>>", t);
            var e = {
                encryptedData: o,
                iv: a,
                code: t.code,
                to_uid: _that.data.globalData.to_uid
            };
            userModel.getPhone(e).then(function(t) {
                util.hideAll(), app.globalData.hasClientPhone = !0, app.globalData.voucherStatus.status = "receive", 
                _that.setData({
                    "globalData.hasClientPhone": !0,
                    "globalData.voucherStatus": "receive"
                });
            });
        },
        fail: function(t) {
            console.log("fail ==> ", t);
        }
    });
}

function toBigVoucher(t) {
    _that = t, getApp().globalData.voucherStatus.tag = "big", _that.setData({
        "globalData.voucherStatus": getApp().globalData.voucherStatus
    });
}

function toMiniVoucher(t) {
    _that = t, getApp().globalData.voucherStatus.tag = "mini", _that.setData({
        "globalData.voucherStatus": getApp().globalData.voucherStatus
    });
}

module.exports = {
    getVoucher: getVoucher,
    toBigVoucher: toBigVoucher,
    toMiniVoucher: toMiniVoucher
};