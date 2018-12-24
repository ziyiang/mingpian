Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _xx_request = require("../js/xx_request.js");

exports.default = {
    getLogin: function(e) {
        return _xx_request.req.post("login", e);
    },
    getFormId: function(e) {
        return _xx_request.req.post("formid", e);
    },
    getConfigV2: function(e) {
        return _xx_request.req.post("configV2", e);
    },
    getUserPhone: function(e) {
        return _xx_request.req.post("UserPhone", e);
    },
    getUpdateUserInfo: function(e) {
        return _xx_request.req.post("update", e);
    },
    getClientUnread: function(e) {
        return _xx_request.fly.post(_xx_request.tmpUrl + "ClientUnread", e);
    },
    getChatInfo: function(e) {
        return _xx_request.req.post("messageinfo", e);
    }
};