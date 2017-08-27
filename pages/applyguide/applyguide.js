// applyguide.js
var util = require('../../utils/util.js')
var playTimeInterval
var recordTimeInterval

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
    ],
    idimgList:[
    ],
    imgPositive:[],
    imgReverse: [],
    mask: false,
    mask_example_id: false,
    mask_example_guideid: false,
    mask_example_avatar: false,
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00',
    formatedPlayTime: '00:00',
    hasRecordConfirm: false

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
  toPay:function(event)
  {
    // debugger;
  },
  formSubmit:function(e)
  {
  },
  addImg:function(e){

    var that = this;
    wx.chooseImage({
      count: 3 - this.data.imgList.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        // var imgPath = [{
        //    tempFilePaths
        // }];
        
        that.setData({
          'imgList': that.data.imgList.concat(tempFilePaths)
        });
        // that.setData({
        //   'imgList': res.tempFilePaths
        // });
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imgList
    })
    
  },
  img_del_multi:function(e){
    var current = e.target.dataset.src;
    // var index = this.data.imgList.lastIndexOf(current);
    this.data.imgList.splice(this.data.imgList.lastIndexOf(current), 1);

    this.setData({
      'imgList': this.data.imgList
    });

  },
  addImg_id: function (e) {

    var that = this;
    wx.chooseImage({
      count: 3 - this.data.idimgList.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        // var imgPath = [{
        //    tempFilePaths
        // }];

        that.setData({
          'idimgList': that.data.idimgList.concat(tempFilePaths)
        });
        // that.setData({
        //   'imgList': res.tempFilePaths
        // });
      }
    })
  },
  previewImage_id: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.idimgList
    })

  },
  img_del_multi_id: function (e) {
    var current = e.target.dataset.src;
    // var index = this.data.imgList.lastIndexOf(current);
    this.data.idimgList.splice(this.data.idimgList.lastIndexOf(current), 1);

    this.setData({
      'idimgList': this.data.idimgList
    });

  },
  addImg_positive: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'imgPositive': res.tempFilePaths
        });
      }
    })
  },
  img_del_positive:function(e){
    this.setData({
      'imgPositive': ''
    });
  },
  previewImage_positive: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imgPositive
    })
  },
  addImg_reverse: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'imgReverse': res.tempFilePaths
        });
      }
    })
  },
  img_del_reverse: function (e) {
    this.setData({
      'imgReverse': ''
    });
  },
  previewImage_reverse: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imgReverse
    })
  },
  startRecord:function(){
    this.setData({ recording: true })

    var that = this
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000)
    wx.startRecord({
      success: function (res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        })
      },
      complete: function () {
        that.setData({ recording: false })
        clearInterval(recordTimeInterval)
      }
    })
  },
  stopRecord: function () {
    wx.stopRecord()
  },
  openRecord:function(){
    this.setData({
      mask: true
    })
  },
  openMask_example_id: function () {
    this.setData({
      mask_example_id: true
    })
  },
  openMask_example_guideid: function () {
    this.setData({
      mask_example_guideid: true
    })
  },
  openMask_example_avatar: function () {
    this.setData({
      mask_example_avatar: true
    })
  },
  hiddenMask: function () {
    this.setData({
      mask: false
    });
    this.setData({
      mask_example_id: false
    });
    this.setData({
      mask_example_guideid: false
    });
    this.setData({
      mask_example_avatar: false
    });
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  confirmRecord:function(){
    this.setData({
      mask: false,
      hasRecordConfirm: true
    })
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  stopRecordUnexpectedly: function () {
    var that = this
    wx.stopRecord({
      success: function () {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },
  playVoice: function () {
    var that = this
    playTimeInterval = setInterval(function () {
      var playTime = that.data.playTime + 1
      console.log('update playTime', playTime)
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime: playTime
      })
    }, 1000)
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function () {
        clearInterval(playTimeInterval)
        var playTime = 0
        console.log('play voice finished')
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime: playTime
        })
      }
    })
  },
  pauseVoice: function () {
    clearInterval(playTimeInterval)
    wx.pauseVoice()
    this.setData({
      playing: false
    })
  },
  stopVoice: function () {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
    wx.stopVoice()
  },
  clear: function () {
    clearInterval(playTimeInterval)
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      hasRecordConfirm: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }
})