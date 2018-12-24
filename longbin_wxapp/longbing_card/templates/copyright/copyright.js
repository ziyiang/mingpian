var _that = void 0, _baseModel = void 0, _util = void 0;

function getAppGlobalData(a, t, l) {
    _that = a, _baseModel = t, _util = l, getApp().globalData.userid = wx.getStorageSync("userid"), 
    _baseModel.getConfigV2().then(function(a) {
        _util.hideAll(), console.log(a.data, "copyright   getconfigV2");
        var t = a.data, l = t.company_list, o = t.my_company, e = t.config, n = t.tabBar;
        if (o && 23 < o.addr.length) {
            var u = o.slice(0, 23) + "...";
            getApp().globalData.my_company.addrMore = u;
        }
        var p = getApp().globalData.tabBarList;
        for (var g in n.menu_name) n.menu_url_out[g] && (0 == n.menu_url_jump_way[g] && (p[g].jump = "toOutUrl"), 
        1 == n.menu_url_jump_way[g] && (p[g].jump = "toMiniApp", p[g].toMiniApp = n.menu_url_out[g].split("；"))), 
        1 == n.menu_is_hide[g] && (p[g].showTab = 1), p[g].text = n.menu_name[g], -1 < n.menu_url[g].indexOf("currentTabBar=") && (p[g].type = n.menu_url[g].split("currentTabBar=")[1]), 
        p[g].url = n.menu_url[g], n.menu_url_out[g] && (p[g].url = n.menu_url_out[g]);
        getApp().globalData.configInfo.company_list = l, getApp().globalData.configInfo.my_company = o, 
        getApp().globalData.configInfo.config = e, getApp().globalData.configInfo.tabBar = n, 
        getApp().globalData.tabBarList = p, _that.setData({
            globalData: getApp().globalData
        });
    });
}

module.exports = {
    getAppGlobalData: getAppGlobalData
};