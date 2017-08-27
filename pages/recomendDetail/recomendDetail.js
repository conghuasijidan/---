// recomendDetail.js
var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var config = require('../../config.js')
var WebIM = WebIM.default
var interval
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guideInfo:'',
    scroolHeight:0,
    starCount:3,
    specialLabelList: [{key:'准时(50)'}, {key:'服务好(20)'},{key:'很亲切(50)'}],
    cellList: [{ key: '' }, { key: '' }, { key: '' }],
     j:3,
     isPlay:false,
     time:10,
     audioCtx:''
  },
   voiceAnimation:function(){
    var that = this;
     //话筒帧动画  
    //  debugger;
     if (this.data.isPlay == false){
       var i = 1;
       this.timer = setInterval(function () {
         i++;
         i = i % 3;
         that.setData({
           j: i + 1,
         })
         return
       }, 300);
       that.setData({
         isPlay:true,
         timer:this.timer
       });
       interval = this.timer

     }else{
      // 关闭定时器
      clearInterval(this.timer);
     
      that.setData({
        isPlay: false,
        j:3,
      })
     }
    //  debugger;
    //  wx.pauseBackgroundAudio()

   },
  countDown:function(){
    var that = this;
    if(this.data.isPlay ==false)
    {
      var _time = this.data.time;
      this.interval = setInterval(function () {
        _time--;
        if(_time <= 0)
        {
          clearInterval(interval);
          that.setData({
            time: 10,
            j:3
          })
          //  debugger;
          that.audioCtx.pause()
        }else{
          that.setData({
            time: _time
          })
        }
        
      }, 1000)
      this.audioCtx.play()
      // debugger;
      // wx.playBackgroundAudio({
      //   dataUrl: 'http://qqma.tingge123.com:823/mp3/2015-06-13/1434188181.mp3',
      //   title: '',
      //   coverImgUrl: ''
      // })
      // debugger;
    }else{
      // debugger;
      // wx.pauseBackgroundAudio()
      this.audioCtx.pause()
      clearInterval(this.interval);
    }
  },
  makeOrder:function(){
    wx.navigateTo({
      url: '../order/order',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载----添加好友
   */
  onLoad: function (options) {
    var guideCommentsUrl = config.guideCommentsUrl 
    var guideInfo = JSON.parse(options.guideInfo)
    // console.log("导游详情"+) 
    var guideId = guideInfo.id
    // var url = "https://piaogood.com/1.0/guide/" + guideId +"/comment"
   wx.request({
     url: guideCommentsUrl,
     success: function (res) {

       if (res.data.guide_comments) {
         that.setData({
           scrollImgUrls: res.data.promotions
         })
       }
     }
   })





    this.setData({
      guideInfo: guideInfo
    })

    // debugger
    WebIM.conn.subscribe({
      to: 'd1',
      message: "[resp:true]"                
    })

    var that = this;
    wx.getSystemInfo({
     success: function(res) {
       that.setData({
       scroolHeight:res.windowHeight-98
       })
     },
   })
  //  debugger;
   that.setData({
     isPlay: false
   })

  },
  consultTap:function(){
    var that = this
    //console.log(event)

    var nameList = {
      myName: 'd2',
      your: 'd1'
    }
    wx.navigateTo({
      url: '../chatroom/chatroom?username=' + JSON.stringify(nameList)
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://qqma.tingge123.com:823/mp3/2015-06-13/1434188181.mp3')
    console.log(this.audioCtx)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    // //console.log(WebIM.conn)
    var rosters = {
      success: function (roster) {
        // debugger;
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
    // debugger
    //WebIM.conn.setPresence()
    WebIM.conn.getRoster(rosters)
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})