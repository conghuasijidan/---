//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  selected1Menu:"menuSelectLabel",
  selected1Hidden:false,
  selected2Menu: "menuNormalLabel",
  selected2Hidden: true,
  selected3Menu: "menuNormalLabel",
  selected3Hidden: true,
   selectedTag:'1',
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
  munuSelectedTap:function(event){
    var that = this;
   if(event.currentTarget.dataset.tag==1)
   {
     that.setData({
       selected1Menu:"menuSelectLabel",
       selected2Menu: "menuNormalLabel",
       selected3Menu: "menuNormalLabel",
       selected1Hidden: false,
       selected2Hidden: true,
       selected3Hidden: true,
       selectedTag:"1"
     })
   } else if (event.currentTarget.dataset.tag == 2)
   {
     that.setData({
       selected1Menu: "menuNormalLabel",
       selected2Menu: "menuSelectLabel",
       selected3Menu: "menuNormalLabel",
       selected1Hidden: true,
       selected2Hidden: false,
       selected3Hidden: true,
       selectedTag:"2"
     })
   }else{
     that.setData({
       selected1Menu: "menuNormalLabel",
       selected2Menu: "menuNormalLabel",
       selected3Menu: "menuSelectLabel",
       selected1Hidden: true,
       selected2Hidden: true,
       selected3Hidden: false,
       selectedTag:"3"
     })
   }
   
  },
  //地点选择函数
  locSelectedTap: function() {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  swiperTap:function(){

  },
  cellTap:function(){
    wx.navigateTo({
      url: '../recomendDetail/recomendDetail',
    })
  },
  // 城市体验
  sexOrderTap: function () {

  },
  moneyOrderTap: function () {

  },
  // 导游服务
  onLoad: function () { 
    // //调用应用实例的方法获取全局数据
    // wx.setNavigationBarTitle({
    //   title: '友途',
    // })
  // 请求列表数据

  }
})
