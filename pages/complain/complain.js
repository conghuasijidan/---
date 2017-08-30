// pages/complain/complain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    complainreasons: [
      { value: 'LSJJ', name: '临时加价', checked: false },
      { value: 'CD', name: '迟到', checked: false },
      { value: 'TDEL', name: '态度恶劣', checked: false },
      { value: 'SL', name: '骚扰', checked: false },
      { value: 'LSGHJD', name: '临时更换景点', checked: false },
      { value: 'WJYXTJGWD', name: '未经允许添加购物点', checked: false },
      { value: 'OTHER', name: '其他问题', checked: false }
    ]
  },
  checkboxChange: function (e) {

    var items = this.data.complainreasons, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }

    this.setData({
      complainreasons: items
    })
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
  formSubmit:function(e){
    var items = this.data.complainreasons;
    
  }
})