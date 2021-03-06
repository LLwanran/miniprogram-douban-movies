let config = require('../../common/script/config.js');
let app = getApp();

Page({
  data: {
    gridList: [
      { enName: 'favorite', zhName: '收藏' },
      { enName: 'history', zhName: '浏览记录' },
      { enName: 'shake', zhName: '摇一摇' },
      { enName: 'gallery', zhName: '相册' },
      { enName: 'setting', zhName: '设置' }
    ],
    skin: ''
  },
  onLoad: function(cb) {
    let that = this;
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      app.getUserInfo();
    }
    typeof cb == 'function' && cb();
  },
  onShow: function() {
    let that = this;
    wx.getStorage({
      key: 'skin',
      success: function(res) {
        if (res.data == '') {
          that.setData({
            skin: config.skinList[0].imgUrl
          });
        } else {
          that.setData({
            skin: res.data
          });
        }
      }
    });
  },
  onPullDownRefresh: function() {
    this.onLoad(() => {
      wx.stopPullDownRefresh();
    });
  },
  viewGridDetail: function(e) {
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../' + data.url + '/' + data.url
    });
  },
  viewSkin: function(e) {
    wx.navigateTo({
      url: '../skin/skin'
    });
  }
});
