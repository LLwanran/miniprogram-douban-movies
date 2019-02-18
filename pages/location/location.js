let userInfo = require('../../utils/userInfo');
let config = require('../../common/script/config');

Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [
      {
        latitude: 0,
        longitude: 0,
        name: '我的位置',
        desc: ''
      }
    ],
    covers: [
      {
        latitude: 0,
        longitude: 0,
        iconPath: '../../dist/images/location.png'
      },
      {
        latitude: 0,
        longitude: 0,
        iconPath: '../../dist/images/location.png',
        rotate: 180
      }
    ],
    formatted_address: '',
    loading: false
  },
  onLoad: function(options) {
    this.startGetLocation();
  },
  startGetLocation: function() {
    let that = this;
    that.setData({
      loading: true
    });
    userInfo.getLocation((res, address) => {
      if (res) {
        // 设置地图
        that.setData({
          latitude: res.latitude,
          longitude: parseFloat(res.longitude + '1'),
          markers: [
            {
              latitude: res.latitude,
              longitude: parseFloat(res.longitude + '1')
            }
          ],
          covers: [
            {
              latitude: res.latitude,
              longitude: parseFloat(res.longitude + '1')
            },
            {
              latitude: res.latitude,
              longitude: parseFloat(res.longitude + '1')
            }
          ]
        });
        // 设置中文详细地址
        that.setData({
          markers: [
            {
              latitude: 0,
              longitude: 0,
              name: '我的位置',
              desc: address.name
            }
          ],
          formatted_address: address.name
        });
        that.setData({
          loading: false
        });
      }
    });
  },
  refreshLocation: function() {
    this.startGetLocation();
  }
});
