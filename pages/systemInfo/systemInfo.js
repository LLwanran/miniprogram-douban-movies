Page({
  data: {
    cells: [],
    minaVersion: 'v2.0'
  },
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        let cells = [[]];
        let resolution =
          res.windowWidth * res.pixelRatio +
          '*' +
          res.windowHeight * res.pixelRatio;
        cells[0].push({
          title: '设备品牌',
          text: res.brand,
          access: false,
          fn: ''
        });
        cells[0].push({
          title: '设备型号',
          text: res.model,
          access: false,
          fn: ''
        });
        cells[0].push({
          title: '分辨率',
          text: resolution,
          access: false,
          fn: ''
        });
        cells[0].push({
          title: '系统语言',
          text: res.language,
          access: false,
          fn: ''
        });
        cells[0].push({
          title: '微信版本',
          text: res.version,
          access: false,
          fn: ''
        });
        cells[0].push({
          title: '小程序版本',
          text: that.data.minaVersion,
          access: false,
          fn: ''
        });
        that.setData({
          cells: cells
        });
      }
    });
  }
});
