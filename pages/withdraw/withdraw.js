
Page({

  /**
   * 页面的初始数据
   */
  data: {

    withdrawMoney:'（可用余额100元）',
    balance:100,
    withdrawPercent:0.3

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  input_changed:function(e){
    var that = this;
    if (e.detail.value > that.data.balance)
    {
      this.setData({
        withdrawMoney: '（收取' + (that.data.balance * that.data.withdrawPercent).toFixed(2) + '服务费）'
      })
      return {
          value:that.data.balance
          
        }
    }
    else
    {
      var serviceMoney = e.detail.value * that.data.withdrawPercent;
      
      if(e.detail.cursor < 1)
      {
        this.setData({
          withdrawMoney: '（可提现余额' + that.data.balance + '元）'
        })
      }
      else
      {
        this.setData({
          withdrawMoney: '（收取' + serviceMoney.toFixed(2) + '服务费）'
        })
      }
    }

  }
})