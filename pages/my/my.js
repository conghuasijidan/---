// my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    balance: 0,
    observerController:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

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

      var observermy = new observerMy();
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
function observerMy() {
  this.update = function (observable, obj) {
    
    for (var i = 0, len = obj.length; i < len; i++) {
      console.log(obj[i]);
    }
    observable.callback();
  }
}