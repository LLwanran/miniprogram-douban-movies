let douban = require('../../common/script/fetch');
let util = require('../../utils/util');
let config = require('../../common/script/config');

Page({
  data: {
    personDetail: {},
    showLoading: true,
    showContent: false
  },
  onLoad: function(options) {
    let that = this;
    let id = options.id;
    douban.fetchPersonDetail.call(
      that,
      config.apiList.personDetail,
      id,
      function(data) {
        // 判断是否收藏
        wx.getStorage({
          key: 'person_favorite',
          success: function(res) {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].id == data.id) {
                that.setData({
                  isPersonFavorite: true
                });
              }
            }
          }
        });
        // 存储浏览历史
        let date = util.getDate();
        let time = util.getTime();
        let person_history = [];
        wx.getStorage({
          key: 'person_history',
          success: function(res) {
            person_history = res.data;
            // 当前的数据
            let now_data = {
              time: time,
              data: data
            };
            // 今天的数据，没有时插入
            let sub_data = {
              date: date,
              persons: []
            };
            sub_data.persons.push(now_data);
            if (person_history.length == 0) {
              // 判断是否为空
              person_history.push(sub_data);
            } else if ((person_history[0].date = date)) {
              //判断第一个是否为今天
              for (let i = 0; i < person_history[0].persons.length; i++) {
                // 如果存在则删除，添加最新的
                if (person_history[0].persons[i].data.id == data.id) {
                  person_history[0].persons.splice(i, 1);
                }
              }
              person_history[0].persons.push(now_data);
            } else {
              // 不为今天(昨天)插入今天的数据
              person_history.push(sub_data);
            }
            wx.setStorage({
              key: 'person_history',
              data: person_history,
              success: function(res) {}
            });
          },
          fail: function(res) {
            console.log(res);
          }
        });
      }
    );
  },
  onPullDownRefresh: function() {
    let data = {
      id: this.data.filmDetail.id
    };
    this.onLoad(data);
  },
  viewFilmDetail: function(e) {
    let data = e.currentTarget.dataset;
    wx.redirectTo({
      url: '../filmDetail/filmDetail?id=' + data.id
    });
  },
  favoritePerson: function() {
    let that = this;
    // 判断原来是否收藏，是则删除，否则添加
    wx.getStorage({
      key: 'person_favorite',
      success: function(res) {
        let person_favorite = res.data;
        if (that.data.isPersonFavorite) {
          // 删除
          for (let i = 0; i < person_favorite.length; i++) {
            if (person_favorite[i].id == that.data.personDetail.id) {
              person_favorite.splice(i, 1);
              that.setData({
                isPersonFavorite: false
              });
            }
          }
          wx.setStorage({
            key: 'person_favorite',
            data: person_favorite,
            success: function(res) {}
          });
        } else {
          // 添加
          person_favorite.push(that.data.personDetail);
          wx.setStorage({
            key: 'person_favorite',
            data: person_favorite,
            success: function(res) {
              that.setData({
                isPersonFavorite: true
              });
            }
          });
        }
      }
    });
  }
});
