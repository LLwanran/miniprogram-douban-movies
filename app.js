const config = require('common/script/config');

App({
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    // 获取用户信息
    this.getUserInfo();
    // 初始化缓存
    this.initStorage();
  },
  getUserInfo: cb => {
    let that = this;
    // 登录
    wx.login({
      success: res => {
        // ------ 获取凭证 ------
        const code = res.code;
        wx.getUserInfo({
          withCredentials: true, // 是否带上登录态信息
          success: res => {
            that.globalData.userInfo = res.userInfo;
            typeof cb == 'function' && cb(that.globalData.userInfo);
          },
          fail: err => {
            wx.showModal({
              title: '获取用户信息失败',
              content: '请在设置页允许获取个人信息',
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  wx.openSetting({
                    success: res => {
                      wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                          that.globalData.userInfo = res;
                          cb(that.globalData.userInfo);
                        }
                      });
                    },
                    complete: err => {
                      that.getUserInfo(cb);
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  },
  initStorage: function() {
    wx.getStorageInfo({
      success: function(res) {
        // 判断电影收藏是否存在，没有则创建
        if (!('film_favorite' in res.keys)) {
          wx.setStorage({
            key: 'film_favorite',
            data: []
          });
        }
        // 判断人物收藏是否存在，没有则创建
        if (!('person_favorite' in res.keys)) {
          wx.setStorage({
            key: 'person_favorite',
            data: []
          });
        }
        // 判断电影浏览记录是否存在，没有则创建
        if (!('film_history' in res.keys)) {
          wx.setStorage({
            key: 'film_history',
            data: []
          });
        }
        // 判断人物浏览记录是否存在，没有则创建
        if (!('person_history' in res.keys)) {
          wx.setStorage({
            key: 'person_history',
            data: []
          });
        }
        // 个人信息默认数据
        let personInfo = {
          name: '',
          nickName: '',
          gender: '',
          age: '',
          birthday: '',
          constellation: '',
          company: '',
          school: '',
          tel: '',
          email: '',
          intro: ''
        };
        // 判断个人信息是否存在，没有则创建
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          });
        }
        // 判断相册数据是否存在，没有则创建
        if (!('gallery' in res.keys)) {
          wx.setStorage({
            key: 'gallery',
            data: []
          });
        }
        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          });
        }
      }
    });
  }
});
