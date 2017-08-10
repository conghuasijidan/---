//index.js
var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
//获取应用实例
var app = getApp()
Page({
  data: {
  name: 'zhulong',
  psd: '123',
  member: [],
  grant_type: "password",
  //上面的是登录时变量
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
   listImage: [{ url: '' }, { url: '' }, { url: '' }, { url: '' },{ url: '' }, { url: '' }],

  //  城市体验
   cityDataList: [{ imageUrl: '', name: '' }, { imageUrl: '', name: '' }, { imageUrl: '', name: ''}]

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
    //  照片底部渐变
    // debugger;
    //  const ctx = wx.createCanvasContext('gradualView');
    //  const grd = ctx.createLinearGradient(0,100,0,0);
    //  grd.addColorStop(0,'black');
    //  grd.addColorStop(1,'white');

    //  ctx.setFillStyle(grd);
    //  ctx.fillRect(0,0,690,100);
    //  ctx.draw();


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
  // --------------------------------------城市体验
  sexOrderTap: function () {

  },
  moneyOrderTap: function () {

  },
  //-------------------------------------- 导游服务
  onLoad: function () { 
    var that = this
    var options = {
      apiUrl: WebIM.config.apiURL,
      user: that.data.name,
      pwd: that.data.psd,
      grant_type: that.data.grant_type,
      appKey: WebIM.config.appkey
    }
    wx.setStorage({
      key: "myUsername",
      data: that.data.name
    })
    //console.log('open')
    WebIM.conn.open(options)

  },
  onShow:function(){
    var that = this
    // debugger;
    // //console.log(WebIM.conn)
    var rosters = {
      success: function (roster) {
        var member = []
        for (var i = 0; i < roster.length; i++) {
          if (roster[i].subscription == "both") {
            member.push(roster[i])
          }
        }
        that.setData({
          member: member
        })
        wx.setStorage({
          key: 'member',
          data: that.data.member
        })
      }
    }

    //WebIM.conn.setPresence()
    WebIM.conn.getRoster(rosters)

  },
})
