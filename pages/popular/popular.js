let douban = require('../../common/script/fetch');
let config = require('../../common/script/config');
let app = getApp();

Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0,
    bannerList: config.bannerList
  },
  onLoad: function() {
    let that = this;
    wx.showNavigationBarLoading();
    douban.fetchFilms.call(that, config.apiList.popular, that.data.start);
  },
  onPullDownRefresh: function() {
    let that = this;
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    });
    this.onLoad();
  },
  onReachBottom: function() {
    let that = this;
    if (!that.data.showLoading) {
      douban.fetchFilms.call(that, config.apiList.popular, that.data.start);
    }
  },
  viewFilmDetail: function(e) {
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../filmDetail/filmDetail?id=' + data.id
    });
  },
  viewFilmByTag: function(e) {
    let data = e.currentTarget.dataset;
    let keyword = data.tag;
    wx.navigateTo({
      url:
        '../searchResult/searchResult?url=' +
        encodeURIComponent(config.apiList.search.byTag) +
        '&keyword=' +
        keyword
    });
  },
  viewBannerDetail: function(e) {
    let data = e.currentTarget.dataset;
    if (data.type == 'film') {
      wx.navigateTo({
        url: '../filmDetail/filmDetail?id=' + data.id
      });
    } else if (data.type == 'person') {
      wx.navigateTo({
        url: '../personDetail/personDetail?id=' + data.id
      });
    } else if (data.type == 'search') {
      // stype(searchType) 0:关键词, 1:类型标签
      let searchUrl =
        stype == 'keyword' ? config.search.byKeyword : config.search.byTag;
      wx.navigateTo({
        url:
          '../searchResult/searchResult?url=' +
          encodeURIComponent(searchUrl) +
          '&keyword=' +
          keyword
      });
    }
  },
  viewSearch: function() {
    wx.navigateTo({
      url: '../search/search'
    });
  }
});
