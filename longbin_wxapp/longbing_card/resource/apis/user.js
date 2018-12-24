Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _xx_request = require("../js/xx_request.js");

exports.default = {
    getCollectionList: function(e) {
        return _xx_request.req.post("cards", e);
    },
    getCardIndexData: function(e) {
        return _xx_request.req.post("cardV4", e);
    },
    getEditPraiseStatus: function(e) {
        return _xx_request.req.post("thumbs", e);
    },
    getForwardRecord: function(e) {
        return _xx_request.req.post("Forward", e);
    },
    getCopyRecord: function(e) {
        return _xx_request.req.post("copyRecord", e);
    },
    getShareRecord: function(e) {
        return _xx_request.req.post("record", e);
    },
    getShareInfo: function(e) {
        return _xx_request.req.post("getShare", e);
    },
    getPhone: function(e) {
        return _xx_request.req.post("phone", e);
    },
    getShopTypes: function(e) {
        return _xx_request.req.post("ShopTypesV2", e);
    },
    getShopList: function(e) {
        return _xx_request.req.post("ShopGoods", e);
    },
    getShopSearch: function(e) {
        return _xx_request.req.post("ShopSearch", e);
    },
    getNewsList: function(e) {
        return _xx_request.req.post("timeline", e);
    },
    getThumbs: function(e) {
        return _xx_request.req.post("timelineThumbs", e);
    },
    getComment: function(e) {
        return _xx_request.req.post("timelineComment", e);
    },
    getNewThumbsComment: function(e) {
        return _xx_request.req.post("timelineNew", e);
    },
    getModular: function(e) {
        return _xx_request.req.post("modularV2", e);
    },
    getModularInfo: function(e) {
        return _xx_request.req.post("modularInfo", e);
    },
    getPosterType: function(e) {
        return _xx_request.req.post("postertype", e);
    }
};