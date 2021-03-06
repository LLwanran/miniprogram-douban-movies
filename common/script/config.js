let url = 'https://static.sesine.com/wechat-weapp-movie';
module.exports = {
  count: 20, // 分页数量
  apiList: {
    popular: 'http://localhost/v2/movie/in_theaters',
    coming: 'http://localhost/v2/movie/coming_soon',
    top: 'http://localhost/v2/movie/top250',
    search: {
      byKeyword: 'http://localhost/v2/movie/search?q=',
      byTag: 'http://localhost/v2/movie/search?tag='
    },
    filmDetail: 'http://localhost/v2/movie/subject/',
    personDetail: 'http://localhost/v2/movie/celebrity/'
  },
  hotKeyword: ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
  hotTag: ['动作', '喜剧', '爱情', '悬疑'],
  bannerList: [
    { type: 'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg' },
    { type: 'film', id: '25793398', imgUrl: url + '/images/banner_2.jpg' },
    { type: 'film', id: '26630781', imgUrl: url + '/images/banner_3.jpg' },
    { type: 'film', id: '26415200', imgUrl: url + '/images/banner_4.jpg' },
    { type: 'film', id: '3025375', imgUrl: url + '/images/banner_5.jpg' }
  ],
  skinList: [
    { title: '公路', imgUrl: url + '/images/user_bg_1.jpg' },
    { title: '黑夜森林', imgUrl: url + '/images/user_bg_2.jpg' },
    { title: '鱼与水', imgUrl: url + '/images/user_bg_3.jpg' },
    { title: '山之剪影', imgUrl: url + '/images/user_bg_4.jpg' },
    { title: '火山', imgUrl: url + '/images/user_bg_5.jpg' },
    { title: '科技', imgUrl: url + '/images/user_bg_6.jpg' },
    { title: '沙漠', imgUrl: url + '/images/user_bg_7.jpg' },
    { title: '叶子', imgUrl: url + '/images/user_bg_8.jpg' },
    { title: '早餐', imgUrl: url + '/images/user_bg_9.jpg' },
    { title: '英伦骑车', imgUrl: url + '/images/user_bg_10.jpg' },
    { title: '草原', imgUrl: url + '/images/user_bg_11.jpg' },
    { title: '城市', imgUrl: url + '/images/user_bg_12.jpg' }
  ]
};
