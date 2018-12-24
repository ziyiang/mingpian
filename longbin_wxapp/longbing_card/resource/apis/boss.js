Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _xx_request = require("../js/xx_request.js");

exports.default = {
    getFormId: function(e) {
        return _xx_request.req.post("formid", e);
    },
    getRadarNine: function(e) {
        return _xx_request.req.post("BossRadarNine", e);
    },
    getDealRate: function(e) {
        return _xx_request.req.post("BossDealRate", e);
    },
    getOrderMoney: function(e) {
        return _xx_request.req.post("BossOrderMoney", e);
    },
    getNewClient: function(e) {
        return _xx_request.req.post("BossNewClient", e);
    },
    getAskClient: function(e) {
        return _xx_request.req.post("BossAskClient", e);
    },
    getMarkClient: function(e) {
        return _xx_request.req.post("BossMarkClient", e);
    },
    getInterest: function(e) {
        return _xx_request.req.post("BossInterest", e);
    },
    getActivity: function(e) {
        return _xx_request.req.post("BossActivity", e);
    },
    getActivityBarGraph: function(e) {
        return _xx_request.req.post("BossActivityBarGraph", e);
    },
    getRankClients: function(e) {
        return _xx_request.req.post("BossRankClients", e);
    },
    getRankOrder: function(e) {
        return _xx_request.req.post("BossRankOrder", e);
    },
    getRankInteraction: function(e) {
        return _xx_request.req.post("BossRankInteraction", e);
    },
    getRankRate: function(e) {
        return _xx_request.req.post("BossRankRate", e);
    },
    getStaffRadarNine: function(e) {
        return _xx_request.req.post("BossStaffRadarNine", e);
    },
    getStaffAnalysis: function(e) {
        return _xx_request.req.post("BossStaffAnalysis", e);
    },
    getClients: function(e) {
        return _xx_request.req.post("BossClients", e);
    },
    getStaffNumber: function(e) {
        return _xx_request.req.post("BossStaffNumber", e);
    },
    getAi: function(e) {
        return _xx_request.req.post("BossAi", e);
    }
};