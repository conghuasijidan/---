// order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates:'请选择日期',
    times:'请选择时段',
    isDisabled:false,
    isChecked:false,
    checkImageUrl:"../../images/uncheckedImage.png",
    showModalStatus:false,
    timeAmImageUrl: "../../images/uncheckedImage.png",
    timeAmIsChecked:false,
    timeAmEatImageUrl: "../../images/uncheckedImage.png",
    timeAmEatIsChecked: false,
    timePmImageUrl: "../../images/uncheckedImage.png",
    timePmIsChecked: false,
    timePmEatImageUrl: "../../images/uncheckedImage.png",
    timePmEatIsChecked: false, 
  },
  selectDateTap:function(e){
    var that = this;
    that.setData({
      dates: e.detail.value
    })
  },
  checkImageTap:function(){
    var that = this;
    if(this.data.isChecked == false){
       that.setData({
         isChecked:true,
         checkImageUrl:"../../images/checkedImage.png"
       })
    } else 
    {
      that.setData({
        isChecked: false,
        checkImageUrl: "../../images/uncheckedImage.png"
      })
    }
  },
  selectTimeTap:function(){
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      isDisabled:true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      isDisabled:false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)

  },
  timeSureTap:function(){
     var that = this;
     //上午 不包括午餐
     if (this.data.timeAmIsChecked == true && this.data.timeAmEatIsChecked == false && this.data.timePmIsChecked ==false)
     {
       that.setData({
         times:"08:00-12:00"
       })
     } else if(this.data.timeAmIsChecked == true && this.data.timeAmEatIsChecked == true && this.data.timePmIsChecked == false){
     // 上午 包括午餐
       that.setData({
         times: "08:00-12:00 含午餐"
       })
     } else if (this.data.timeAmIsChecked == false && this.data.timePmIsChecked == true && this.data.timePmEatIsChecked == false){
      //下午 不包括晚餐 
       that.setData({
         times: "14:00-18:00"
       })
     } else if (this.data.timeAmIsChecked == false && this.data.timePmIsChecked == true && this.data.timePmEatIsChecked == true ){
     //下午 包括晚餐
       that.setData({
         times: "14:00-18:00 含晚餐"
       })
     } else if (this.data.timeAmIsChecked == true && this.data.timeAmEatIsChecked == false && this.data.timePmIsChecked == true && this.data.timePmEatIsChecked == false){
    // 整天 不含饭
       that.setData({
         times: "08:00-18:00"
       })
     } else if (this.data.timeAmIsChecked == true && this.data.timeAmEatIsChecked == true && this.data.timePmIsChecked == true && this.data.timePmEatIsChecked == false){
      //整天 含午餐
       that.setData({
         times: "08:00-18:00 含午餐"
       })
     } else if (this.data.timeAmIsChecked == true && this.data.timeAmEatIsChecked == false && this.data.timePmIsChecked == true && this.data.timePmEatIsChecked == true) {
       //整天 含晚餐
       that.setData({
         times: "08:00-18:00 含晚餐"
       })
     } else if (this.data.timeAmIsChecked == true && this.data.timeAmEatIsChecked == true && this.data.timePmIsChecked == true && this.data.timePmEatIsChecked == true ) {
       //整天 含午餐晚餐
       that.setData({
         times: "08:00-18:00 含午晚餐"
       })
     } else if (this.data.timeAmIsChecked == false && this.data.timePmIsChecked == false) {
       //哪个时段都没选
       that.setData({
         times: "请选择时间"
       })
       wx.showModal({
         title: '提示',
         content: '请选择时间',
         showCancel:false,
         success: function (res) {
          //  if (res.confirm) {
          //    console.log('用户点击确定')
          //  }
         }
       })

     }
    this.hideModal();
  },
  amImageTap:function(){
    var that = this;
    if (this.data.timeAmIsChecked == false ){
      that.setData({
        timeAmIsChecked:true,
        timeAmImageUrl:"../../images/checkedImage.png"
      })
    }else
    {
      that.setData({
        timeAmIsChecked: false,
        timeAmImageUrl: "../../images/uncheckedImage.png"
      })
    }

  },
  amEatImageTap:function(){
    var that = this;
    if (this.data.timeAmIsChecked == false){
      return;
    }
    if (this.data.timeAmEatIsChecked == false) {
      that.setData({
        timeAmEatIsChecked: true,
        timeAmEatImageUrl: "../../images/checkedImage.png"
      })
    } else {
      that.setData({
        timeAmEatIsChecked: false,
        timeAmEatImageUrl: "../../images/uncheckedImage.png"
      })
    }
  },
  pmImageTap: function () {
    var that = this;
    if (this.data.timePmIsChecked == false) {
      that.setData({
        timePmIsChecked: true,
        timePmImageUrl: "../../images/checkedImage.png"
      })
    } else {
      that.setData({
        timePmIsChecked: false,
        timePmImageUrl: "../../images/uncheckedImage.png"
      })
    }

  },
  pmEatImageTap: function () {
    var that = this;
    if (this.data.timePmIsChecked == false) {
      return;
    }

    if (this.data.timePmEatIsChecked == false) {
      that.setData({
        timePmEatIsChecked: true,
        timePmEatImageUrl: "../../images/checkedImage.png"
      })
    } else {
      that.setData({
        timePmEatIsChecked: false,
        timePmEatImageUrl: "../../images/uncheckedImage.png"
      })
    }

  },
  selectPlaceTap:function(){
    
     wx.navigateTo({
       url: '../poi/poi',
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
  
  }
})