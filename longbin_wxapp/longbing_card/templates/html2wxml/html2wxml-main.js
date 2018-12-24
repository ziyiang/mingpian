function _defineProperty(e, a, i) {
    return a in e ? Object.defineProperty(e, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = i, e;
}

var realWindowWidth = 0, realWindowHeight = 0;

function html2wxml(e, a, i) {
    var t = a, d = [];
    null != t.data.images && (d = t.data.images), void ((e = {
        nodes: e,
        images: d,
        view: {}
    }).view.imagePadding = 0) !== i && (e.view.imagePadding = i), t.setData(e), t.wxmlImgLoad = wxmlImgLoad, 
    t.wxmlImgTap = wxmlImgTap, t.wxmlVideoTap = wxmlVideoTap;
}

function wxmlVideoTap(e) {
    var a = e.currentTarget.dataset.src;
    wx.navigateTo({
        url: a
    });
}

function wxmlImgTap(e) {
    e.target.dataset.src;
    var a = this.data.imageUrls, i = [];
    for (var t in a) void 0 !== a[t] && i.push(a[t]);
    i.length;
}

function wxmlImgLoad(e) {
    calMoreImageInfo(e, e.target.dataset.idx, this);
}

function calMoreImageInfo(e, a, i) {
    var t, d = wxAutoImageCal(e.detail.width, e.detail.height, i);
    i.setData((_defineProperty(t = {}, "images[" + a + "]", {
        width: d.imageWidth,
        height: d.imageHeight
    }), _defineProperty(t, "imageUrls[" + a + "]", e.currentTarget.dataset.src), t));
}

function wxAutoImageCal(e, a, i) {
    var t, d = 0, r = 0, n = {}, g = i.data.view.imagePadding;
    return realWindowHeight, (t = realWindowWidth - 2 * g) < e ? (r = (d = t) * a / e, 
    n.imageWidth = d, n.imageHeight = r) : (n.imageWidth = e, n.imageHeight = a), n;
}

wx.getSystemInfo({
    success: function(e) {
        realWindowWidth = e.windowWidth, realWindowHeight = e.windowHeight;
    }
}), module.exports = {
    html2wxml: html2wxml
};