/* ------------------------- 获取地理位置 ------------------------- */
const GetLocation = callback => {
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      GetCity({ lat: res.latitude, lon: res.longitude })
        .then(address => {
          callback(res, address);
        })
        .catch(err => {
          callback(res, null);
        });
    },
    fail(err) {
      wx.showModal({
        title: '获取用户地址失败',
        content: '请在设置页允许获取所在地址',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                wx.getLocation({
                  type: 'wgs84',
                  success() {
                    GetCity({ lat: res.latitude, lon: res.longitude })
                      .then(address => {
                        callback(res, address);
                      })
                      .catch(err => {
                        callback(res, null);
                      });
                  }
                });
              },
              complete(err) {
                GetLocation(callback);
              }
            });
          }
        }
      });
    }
  });
};

/* ------------------------- 获取所在城市 ------------------------- */
const Http = require('./request.js');
const GetCity = obj => {
  return new Promise((resolve, reject) => {
    Http.get('https://apis.map.qq.com/ws/geocoder/v1', {
      location: obj.lat + ',' + obj.lon,
      key: 'VNIBZ-SC4KQ-HON5Z-GRGRT-EWZSV-QNFPU'
    })
      .then(res => {
        if (res.status == 0) {
          resolve(res.result.ad_info);
        } else {
          reject('获取城市失败');
        }
      })
      .catch(err => {
        reject('获取城市失败');
      });
  });
};

module.exports = {
  getLocation: GetLocation
};
