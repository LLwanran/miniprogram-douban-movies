let filmNullTip = {
  tipText: '亲，找不到电影的浏览记录',
  actionText: '去逛逛',
  routeUrl: '../popular/popular'
};
let personNullTip = {
  tipText: '亲，找不到人物的浏览记录',
  actionText: '去逛逛',
  routeUrl: '../popular/popular'
};
Page({
  data: {
    film_history: [],
    person_history: [],
    show: 'film_history',
    nullTip: filmNullTip
  },
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'film_history',
      success: function(res) {
        that.setData({
          film_history: res.data
        });
      }
    });
    wx.getStorage({
      key: 'person_history',
      success: function(res) {
        that.setData({
          person_history: res.data
        });
      }
    });
    wx.stopPullDownRefresh();
  },
  onPullDownRefresh: function() {
    this.setData({
      film_history: [],
      person_history: []
    });
    this.onLoad();
  },
  viewFilmDetail: function(e) {
    let data = e.currentTarget.dataset;
    wx.redirectTo({
      url: '../filmDetail/filmDetail?id=' + data.id
    });
  },
  viewPersonDetail: function(e) {
    let data = e.currentTarget.dataset;
    wx.redirectTo({
      url: '../personDetail/personDetail?id=' + data.id
    });
  },
  changeViewType: function(e) {
    let data = e.currentTarget.dataset;
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_history' ? filmNullTip : personNullTip
    });
  }
});
