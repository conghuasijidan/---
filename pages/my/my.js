// my.js
var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
var app = getApp()
var config = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageUrl:'../../images/message_normal.png',
    userInfo:{},
    wallet_balance: 0,
    observerController:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this
    wx.request({
      url: config.getUserByUserID, 
      // data: {
      //   x: '',
      //   y: ''
      // },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        if (res.data.status === "success"){
          var user = res.data.user;
          that.setData({
            wallet_balance: user.wallet_balance
          })
        }
        else{

        }
        // if(res.data.)
        // console.log(res.data)
      },
      fail:function(){

      }
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    app.getobserverController(function (observerController) {
      //更新数据
      
      that.setData({
        observerController: observerController
      });

      var observermy = new observerMy(that);
      that.data.observerController.addObserver(observermy);

    });

  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // debugger
    var messageUrl = wx.getStorageSync("messagenoti")
    this.setData({
      messageUrl: messageUrl
    })
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
  
  },
  formSubmit:function(e)
  {
    
  },
  toTopup:function(){
    wx.navigateTo({
      url: '../topup/topup'
    })
  },
  toWithdraw:function(){
    wx.navigateTo({
      url: '../withdraw/withdraw'
    })
  },
  toApplyGuide: function () {
    wx.navigateTo({
      url: '../applyguide/applyguide'
    })
  },
  toOrderSetting:function(){
    wx.navigateTo({
      url: '../ordersetting/ordersetting'
    })
  },
  toMyorder:function(){
    wx.navigateTo({
      url: '../myorder/myorder'
    })
  },
  toGuideorder: function () {
    wx.navigateTo({
      url: '../guideorder/guideorder'
    })
  },
  toIndex:function(){
    wx.showModal({
      title: '是否退出登录',
      success: function (res) {
        if (res.confirm) {
          WebIM.conn.close()
          //wx.closeSocket()
          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    })
  },
  tab_home: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  tab_message:function(){
    wx.redirectTo({
      url: '../chat/chat',
    })
  }
})


// 观察者对象
function observerMy(that) {

  this.update = function (observable, obj) {
    debugger
    that.setData({
      messageUrl: "../../images/message_noti.png"
    })
    wx.setStorage({
      key: 'messagenoti',
      data: that.data.messageUrl,
    })
    
    for (var i = 0, len = obj.length; i < len; i++) {
      console.log(obj[i]);

    }
    observable.callback();
  }
}