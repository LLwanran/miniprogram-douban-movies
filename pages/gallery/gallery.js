Page({
  data: {
    pictures: [],
    nullTip: {
      tipText: '亲，没有上传照片哦',
      actionText: '上传',
      fn: 'uploadImg'
    }
  },
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'gallery',
      success: function(res) {
        that.setData({
          pictures: res.data
        });
      }
    });
  },
  uploadImg: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        let tempFilePath = res.tempFilePaths[0];
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function(res) {
            let savedFilePath = res.savedFilePath;
            that.setData({
              pictures: that.data.pictures.concat(savedFilePath)
            });
            wx.setStorage({
              key: 'gallery',
              data: that.data.pictures
            });
          }
        });
      }
    });
  },
  previewImage: function(e) {
    let data = e.currentTarget.dataset;
    let index = data.index;
    let that = this;
    wx.previewImage({
      current: that.data.pictures[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.pictures
    });
  }
});
