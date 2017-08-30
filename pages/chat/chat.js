var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
Page({
  data: {
    search_btn: true,
    search_chats: false,
    show_mask: false,
    yourname: '',
    arr: [],
    arr1: []
  },
  onLoad: function () {
    var messageUrl = '../../images/message_normal.png'
    wx.setStorage({
      key: 'messagenoti',
      data: messageUrl,
    })

  },
  onShow: function () {
    var that = this
    var yourArr = wx.getStorageSync('fromName')
    // console.log("本地yourName",yourArr)
  //  清空掉相同的元素
    // debugger
    var temp = []
    for(var i=0;i<yourArr.length;i++)
    {
      var flag = true
        for(var j=i;j<yourArr.length-1;j++)
        {
           if(yourArr[i]==yourArr[j+1])
           {
             flag = false
             break
           } 

        }
        if(flag)
        {
          temp.push(yourArr[i])
        }
    }
    wx.setStorage({
      key: 'fromName',
      data: yourArr,
    })
    yourArr = temp.reverse()
    
    var member = wx.getStorageSync('member')
    var myName = wx.getStorageSync('myUsername')
    // debugger;
    var array = []
    
    for (var i = 0; i < yourArr.length; i++) {
      var temp = wx.getStorageSync(yourArr[i] + myName)[wx.getStorageSync(yourArr[i] + myName).length - 1]
      if(temp!="" &&temp != undefined)
      {
        array.push(wx.getStorageSync(yourArr[i] + myName)[wx.getStorageSync(yourArr[i] + myName).length - 1])
        // debugger
        console.log(array)
      }
      
    }
    that.setData({
      arr1: array
    })
    
  },
  openSearch: function () {
    this.setData({
      search_btn: false,
      search_chats: true,
      show_mask: true
    })
  },
  cancel: function () {
    this.setData({
      search_btn: true,
      search_chats: false,
      show_mask: false
    })
  },
  tab_home: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  close_mask: function () {
    this.setData({
      search_btn: true,
      search_chats: false,
      show_mask: false
    })
  },
  tab_my: function () {
    wx.redirectTo({
      url: '../my/my'
    })
  },
  into_chatRoom: function (event) {
    var that = this
    //console.log(event)
    var my = wx.getStorageSync('myUsername')
    var nameList = {
      myName: my,
      // 对方的用户名
      your: event.currentTarget.dataset.username
    }
    wx.navigateTo({
      url: '../chatroom/chatroom?username=' + JSON.stringify(nameList)
    })
  },
  del_chat: function (event) {
    var nameList = {
      your: event.currentTarget.dataset.username
    }
    var myName = wx.getStorageSync('myUsername')
    var currentPage = getCurrentPages()
    wx.showModal({
      title: '删除该聊天记录',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          wx.setStorage({
            key: nameList.your + myName,
            data: '',
            success: function () {
              if (currentPage[0]) {
                currentPage[0].onShow()
              }
            }
          })
        }
      },
      fail: function (error) {
        //console.log(error)
      }
    })
  }

})



