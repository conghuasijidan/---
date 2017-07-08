//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   indicatorDots:true,
   autoplay:true,
   interval:3000,
   duration:1000,
   circular:true,
   indicatorColor:"#ffffff",
   currentIndicatorColor:"#52A3FA",
   imgUrls: [{ url: '../../images/scroll_image.png' }, 
   { url: '../../images/scroll_image.png' },
    { url: '../../images/scroll_image.png' }
   ],
// 列表数据
   listImage: [{ url: '' }, { url: '' }, { url: '' }, { url: '' },{ url: '' }, { url: '' }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../recommend/recommend'
    })
  },
  onLoad: function () { 
    //调用应用实例的方法获取全局数据
    wx.setNavigationBarTitle({
      title: '伴伴',
    })
  // 请求列表数据

  }
})
