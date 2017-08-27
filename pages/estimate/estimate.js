// estimate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star:[
      { id: 1, selected: false },
      { id: 2, selected: false },
      { id: 3, selected: false },
      { id: 4, selected: false },
      { id: 5, selected: false }
    ],
    starcount: 0,
    inputnumber: 0,
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
    // console.log("123");
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
  bindinput:function(e){
    this.setData({
      inputnumber: e.detail.value.length
    })
  },
  star_selected:function(e){

    switch (e.currentTarget.dataset.tag){
      case 1:     
        this.setData({        
          'star[0].selected': true,
          'star[1].selected': false,
          'star[2].selected': false,
          'star[3].selected': false,
          'star[4].selected': false
          });
        break;
        
      case 2:
        this.setData({
          'star[0].selected': true,
          'star[1].selected': true,
          'star[2].selected': false,
          'star[3].selected': false,
          'star[4].selected': false
        });

        break;

      case 3:
        this.setData({
          'star[0].selected': true,
          'star[1].selected': true,
          'star[2].selected': true,
          'star[3].selected': false,
          'star[4].selected': false
        });
        break;

      case 4:
        this.setData({
          'star[0].selected': true,
          'star[1].selected': true,
          'star[2].selected': true,
          'star[3].selected': true,
          'star[4].selected': false
        });
        break;

      case 5:
        this.setData({
          'star[0].selected': true,
          'star[1].selected': true,
          'star[2].selected': true,
          'star[3].selected': true,
          'star[4].selected': true
        });
        break;

    }
    
  }
})