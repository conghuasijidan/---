// orderDetail.js
var config = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starCount:3
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.from === "myorder")
    {
      wx.request({
        url: config.getUserOrderDetailsByUserID,
        // data: {
        //   x: '',
        //   y: ''
        // },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          if (res.data.status === "success") {

            // var user = res.data.user;
            // that.setData({
            //   wallet_balance: user.wallet_balance
            // })
          }
          else {

          }
          // if(res.data.)
          // console.log(res.data)
        },
        fail: function () {

        }
      });
    }
    else if (options.from === "guideorder")
    {
      wx.request({
        url: config.getLYOrderDetailsByUserID,
        // data: {
        //   x: '',
        //   y: ''
        // },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

          if (res.data.status === "success") {

            // var user = res.data.user;
            // that.setData({
            //   wallet_balance: user.wallet_balance
            // })
          }
          else {

          }
          // if(res.data.)
          // console.log(res.data)
        },
        fail: function () {

        }
      });
    }
    else{

    }
    
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
  
  }
})