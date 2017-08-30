
var config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    moibleIsCancel:false,
    authcodeIsCancel: false,
    mobileTxt:'',
    authcodeTxt:'',
    code_sended: false,
    second: 60
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
  inputMobileChanged:function(e){
    // var that = this;
    if(e.detail.cursor < 1)
    {
      this.setData({
        moibleIsCancel: false
      })
    }
    else{
      this.setData({
        moibleIsCancel: true,
        mobileTxt: e.detail.value
      })
    }
  }
  ,
  inputAuthCodeChanged: function (e) {
    // var that = this;
    if (e.detail.cursor < 1) {
      this.setData({
        authcodeIsCancel: false
      })
    }
    else {
      this.setData({
        authcodeIsCancel: true,
        authcodeTxt: e.detail.value
      })
    }
  },
  mobileCancle:function(e){
       
    this.setData({
      mobileTxt:'',
      moibleIsCancel: false
    })
  },
  authcodeCancle: function (e) {

    this.setData({
      authcodeTxt: '',
      authcodeIsCancel: false
    })
  },
  //点击发送验证码事件处理函数
  sendMessage: function () {

    if (this.data.mobileTxt.length < 11) {
      wx.showModal({
        title: '温馨提示',
        content: '手机号不能小于11位！',
        showCancel: false,
        success: function (res) {

        }
      });
    } else {
      var that = this;
      countdown(that);
      wx.request({
        url: config.sendMessageUrl,
        // header: header,
        method: 'POST',
        dataType: 'json',
        data: {
          mobileTxt: this.data.mobileTxt
        },

        success: function (result) {
          var data = result.data;

          countdown(that);


        },

        // 响应错误
        fail: function (loginResponseError) {
          wx.showModal({
            title: '错误提示',
            content: '发送验证码失败！',
            showCancel: false,
            success: function (res) {

            }
          });
        },
      });
    }


  },
  //点击登录事件处理函数
  toIndex: function () {
    // wx.navigateTo({
    //   url: '../index/index'
    // })
    // 请求服务器登录地址，获得会话信息

    if (this.data.mobileTxt.length == 0 || this.data.authcodeTxt.length == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '手机号和验证码不能为空！',
        showCancel: false,
        success: function (res) {

        }
      });
    } else {

      wx.request({

        url: config.loginUrl,
        // header: header,
        method: 'POST',
        dataType: 'json',
        data: {
          auth_code: this.data.authcodeTxt,
          mobile: this.data.mobileTxt
        },

        success: function (result) {
          var data = result.data;

          if (data.status == 'success') {
            // wx.setStorageSync('token', data.token);

            wx.login({
              success: function (res) {
                // debugger;
                if (res.code) {
                  //发起网络请求
                  // debugger;
                  wx.request({
                    url: config.weixinBandUrl + res.code,
                    header: {
                      'authorization': data.token
                    },
                    method: 'GET',
                    dataType: 'json',


                    success: function (result) {
                      wx.setStorageSync('token', result.data.token);
                      wx.navigateBack({
                        delta: 1
                      });
                      // if (result.data.index('success')>=0)
                      // {
                      //   wx.setStorageSync('token', result.data.token);
                      //   wx.navigateBack({
                      //     delta: 1
                      //   });
                      // }
                      // else
                      // {
                      //   wx.showModal({
                      //     title: '错误提示',
                      //     content: '微信绑定失败，请重新登录！',
                      //     showCancel: false,
                      //     success: function (res) {

                      //     }
                      //   });
                      // }
                    },

                    fail: function (loginResponseError) {
                      // debugger;
                      // wx.navigateBack({
                      //   delta: 1
                      // });
                      wx.showModal({
                        title: '错误提示',
                        content: '微信绑定失败，请重新登录！',
                        showCancel: false,
                        success: function (res) {

                        }
                      });
                    },
                  });
                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
              }
            });

          }
          else {
            wx.showModal({
              title: '错误提示',
              content: '登录失败，请重新登录！',
              showCancel: false,
              success: function (res) {

              }
            });
          }


        },

        // 响应错误
        fail: function (loginResponseError) {
          wx.showModal({
            title: '错误提示',
            content: '登录失败，请重新登录！',
            showCancel: false,
            success: function (res) {

            }
          });
        },
      });
    }



  },
  formSubmit:function(e){
    
  },
  toUserrgstagrenment:function(){
    wx.navigateTo({
      url: '../userrgstagreenment/userrgstagreenment'
    })
  }
  
  
})

// 从从60到到0倒计时  
function countdown(that) {

  var second = that.data.second
  if (second == 0) {
    that.setData({
      code_sended: false,
      second: 60
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1,
      code_sended: true
    });
    countdown(that);
  }
    , 1000)
}


