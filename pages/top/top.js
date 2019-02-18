let douban = require('../../common/script/fetch');
let config = require('../../common/script/config');

Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },
  onLoad: function(options) {
    let that = this;
    douban.fetchFilms.call(that, config.apiList.top, that.data.start);
  },
  onPullDownRefresh: function() {
    let that = this;
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    });
    douban.fetchFilms.call(that, config.apiList.top, that.data.start);
  },
  onReachBottom: function() {
    let that = this;
    if (!that.data.showLoading) {
      douban.fetchFilms.call(that, config.apiList.top, that.data.start);
    }
  },
  viewFilmDetail: function(e) {
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../filmDetail/filmDetail?id=' + data.id
    });
  },
  viewFilmByTag: function(e) {
    var data = e.currentTarget.dataset;
    var keyword = data.tag;
    wx.navigateTo({
      url:
        '../searchResult/searchResult?url=' +
        encodeURIComponent(config.apiList.search.byTag) +
        '&keyword=' +
        keyword
    });
  }
});
