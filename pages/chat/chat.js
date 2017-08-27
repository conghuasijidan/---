var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
Page({
    data: {
        search_btn: true,
        search_chats: false,
        show_mask: false,
        yourname: '',
        arr: []
    },
    onLoad:function(){
      //  重置未读消息
        // var haveMessage = wx.getStorageSync('haveMessage')
        // haveMessage = false
        // wx.setStorage({
        //   key: 'haveMessage',
        //   data: 'haveMessage',
        // })

    },
    onShow: function () {
        var that = this
        var yourArr = wx.getStorageSync('fromName')

        var member = wx.getStorageSync('member')
        var myName = wx.getStorageSync('myUsername')
        // debugger;
        var array = []
        // for (var i = 0; i < member.length; i++) {
        //     console.log(member[i].name)
        //     if (wx.getStorageSync(member[i].name + myName) != '') {
        //         array.push(wx.getStorageSync(member[i].name + myName)[wx.getStorageSync(member[i].name + myName).length - 1])
        //     }
        // }
       
        // debugger
        for (var i = 0; i < yourArr.length; i++) {
          array.push(wx.getStorageSync(yourArr[i] + myName)[wx.getStorageSync(yourArr[i] + myName).length - 1]) 
        }
       
        that.setData({
            arr: array
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



