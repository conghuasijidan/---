
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_status:[
      {
        tap: 'changeToapply',
        txt: '申请中',
        checked: true
      },
      {
        tap: 'changeTodoing',
        txt: '进行中',
        checked: false
      },
      {
        tap: 'changeTodone',
        txt: '已完成',
        checked: false
      }
    ]

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
  toOrderDetails:function(){
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  },
  changeToapply:function(e){
    this.setData({
      'order_status[0].checked' : true,
      'order_status[1].checked' : false,
      'order_status[2].checked' : false
    })
    
  },
  changeTodoing: function (e) {
    this.setData({
      'order_status[0].checked': false,
      'order_status[1].checked' : true,
      'order_status[2].checked' : false
    })

  },
  changeTodone: function (e) {
    this.setData({
      'order_status[0].checked': false,
      'order_status[1].checked' : false,
      'order_status[2].checked' : true
    })

  },

})