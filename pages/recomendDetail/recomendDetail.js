// recomendDetail.js
var interval
Page({

  /**
   * 页面的初始数据
   */
  data: {
  scroolHeight:0,
   starCount:3,
    specialLabelList: [{key:'准时(50)'}, {key:'服务好(20)'},{key:'很亲切(50)'}],
    cellList: [{ key: '' }, { key: '' }, { key: '' }],
     j:3,
     isPlay:false,
     time:10,
  },
   voiceAnimation:function(){
    var that = this;
     //话筒帧动画  
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
     }else
     {
      // 关闭定时器
      clearInterval(this.timer);
     
      that.setData({
        isPlay: false,
        j:3,
      })
     }


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
          
        }else{
          that.setData({
            time: _time
          })
        }
        
      }, 1000)
    }else{
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   wx.getSystemInfo({
     success: function(res) {
       that.setData({
       scroolHeight:res.windowHeight-98
       })

     },
   })
 

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