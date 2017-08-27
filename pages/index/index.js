//index.js
//  var gloabData = {
//    isSucess:false
//  }
// module.exports = gloabData

//高德
var amapFile = require('../../libs/amap-wx.js')
//IM
var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
//获取应用实例
var app = getApp()
  // 使用function初始化array，相比var initSubMenuDisplay = [] 既避免的引用复制的，同时方式更灵活，将来可以是多种方式实现，个数也不定的
function initSubMenuDisplay() {
  return ['hidden', 'hidden'];
}
//定义初始化数据，用于运行时保存
var initSubMenuHighLight = [
  ['', '', ''],
  ['', '',''],
];
var config = require('../../config.js')

Page({
  getRoomPage: function () {
    return this.getPage("pages/chatroom/chatroom")
  },
  getPage: function (pageName) {
    var pages = getCurrentPages()
    return pages.find(function (page) {
      return page.__route__ == pageName
    })},
  messageNotiIcon: '../../images/index_cell_pic.png',
  data: {
  name: 'd2',
  psd: '123',
  member: [],
  grant_type: "password",
  // ------
  subMenuDisplay: initSubMenuDisplay(),
  subMenuHighLight: initSubMenuHighLight,
  animationData: ['', '', ''],
  //上面的是登录时变量
  citySelected:'定位中...',
  temperature:'0',
  isSexHidden:false,
  isMoneyHidden:false,
  selectedIndex:'0',
  disabelScroll:false,
  showModalStatus: false,
  sexSift:'性别',
  moneySift:'金额',
  selected1Menu:"menuSelectLabel",
  selected1Hidden:false,
  selected2Menu: "menuNormalLabel",
  selected2Hidden: true,
  selected3Menu: "menuNormalLabel",
  selected3Hidden: true,
  selectedTag:'1',
  indicatorDots:true,
  autoplay:true,
  interval:3000,
  duration:1000,
  circular:true,
  indicatorColor:"#ffffff",
  currentIndicatorColor:"#52A3FA",
  scrollImgUrls: [{ url: '../../images/scroll_image.png' }, 
  { url: '../../images/scroll_image.png' },
  { url: '../../images/scroll_image.png' }
  ],
  // 列表数据
  recommendlist: [{ url: '' ,name:'lisan',age:''}, { url: '' }, { url: '' }, { url: '' },{ url: '' }, { url: '' }],

  //  导游服务
  guideList: [{ imageUrl: '', name: '' }, { imageUrl: '', name: '' }, { imageUrl: '', name: ''}]

  },
  munuSelectedTap:function(event){
    var that = this;
   if(event.currentTarget.dataset.tag==1)
   {
     that.setData({
       selected1Menu:"menuSelectLabel",
       selected2Menu: "menuNormalLabel",
       selected3Menu: "menuNormalLabel",
       selected1Hidden: false,
       selected2Hidden: true,
       selected3Hidden: true,
       selectedTag:"1"
     })
   } else if (event.currentTarget.dataset.tag == 2)
   {
     that.setData({
       selected1Menu: "menuNormalLabel",
       selected2Menu: "menuSelectLabel",
       selected3Menu: "menuNormalLabel",
       selected1Hidden: true,
       selected2Hidden: false,
       selected3Hidden: true,
       selectedTag:"2"
     })
   }else{
     that.setData({
       selected1Menu: "menuNormalLabel",
       selected2Menu: "menuNormalLabel",
       selected3Menu: "menuSelectLabel",
       selected1Hidden: true,
       selected2Hidden: true,
       selected3Hidden: false,
       selectedTag:"3"
     })
   }
   // 隐藏二级菜单
  //  this.setData({
  //    isHidden: true
  //  })

  },
  //地点选择函数
  locSelectedTap: function() {
    var city = this.data.citySelected;
    wx.navigateTo({
      url: '../switchcity/switchcity?city='+city
    })
  },
  swiperTap:function(){

  },
  cellTap:function(event){
    
    var index = event.currentTarget.dataset.index
    var guideInfo = this.data.recommendlist[index]
    // debugger;
    console.log("导游页的导游详情"+guideInfo)
    wx.navigateTo({
      url: '../recomendDetail/recomendDetail?guideInfo=' + JSON.stringify(guideInfo),
    })
  },
  // --------------------------------------导游服务---筛选-------------
  
  sexOrderTap: function () {
    this.maskTap();
    this.setData({
      selectedIndex:'0'
    })
    this.tapMainMenu();
   
  },
  moneyOrderTap: function () {
    this.maskTap();
    this.setData({
      selectedIndex: '1'
    })
    this.tapMainMenu();
  },
  makeOrderTap:function(){
    wx.navigateTo({
      url: '../order/order',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
  onLoad: function () { 
    var that = this;
    // that.openConnection()
    // console.log("siofsosofosfjs");
  //  请求数据
    this.loadData()

    // 城市定位
    var myAmapFun = new amapFile.AMapWX({ key: 'b4ff5a29e4e62ce28226d0dda832bbc2' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        var currentCity = data[0].regeocodeData.addressComponent.city
        that.setData({
          citySelected:currentCity
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
        that.setData({
          citySelected: '定位失败'
        })
      }
    })
  // 天气获取
    myAmapFun.getWeather({
      success: function (data) {
        //成功回调
       var currentTemperature = data.temperature.data
       that.setData({
         temperature: currentTemperature
       })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
   
    // 聊天登录接口
    var options = {
      apiUrl: WebIM.config.apiURL,
      user: that.data.name,
      pwd: that.data.psd,
      grant_type: that.data.grant_type,
      appKey: WebIM.config.appkey
    }
    wx.setStorage({
      key: "myUsername",
      data: that.data.name
    })
    //console.log('open')
    WebIM.conn.open(options)

  },
  // 开启长连接
  onPullDownRefresh: function () {
     wx.stopPullDownRefresh()
     this.data.loadData()
     wx.showLoading({
       title: '刷新中',
     })
  },
  loadData:function(){
   var that = this
   var scrollImageUrl = config.scrollImageUrl
   var guideUrl = config.guideUrl
    wx.request({
      url: scrollImageUrl,
      success:function(res){
        if (res.data.promotions){
          that.setData({
            scrollImgUrls: res.data.promotions
          })
        }
      }
    })
   
    wx.request({
      url: guideUrl,
      success: function (res) {
        if (res.data.guides) {
          // 停止刷新
          wx.stopPullDownRefresh()
          wx.hideLoading()
          that.setData({
            // recommendlist: res.data.guides
          })
        }
      }
    })
  },
  onShow: function () {
    
  },
//  处理好友请求
  handleFriendMsg: function (message) {
    var that = this
    //console.log(message)
    // debugger
    WebIM.conn.subscribed({
      to: message.from,
      message: "[resp:true]"
    })
    WebIM.conn.subscribe({
      to: message.from,
      message: "[resp:true]"
    })

  },

// 分享设置
  onShareAppMessage:function(res){
    return{
      title: '我在友途等你',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        // console.log('分享成功');
      },
      fail: function (res) {
        // 转发失败
        // console.log('分享失败');
      }
    }

  },

   maskTap: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(-600).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      isDisabled: true
    })
    setTimeout(function () {
      animation.translateY(-460).step()
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
    animation.translateY(-460).step()
    this.setData({
      animationData: animation.export(),
      isDisabled: false
    })
    setTimeout(function () {
      animation.translateY(-600).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)

    // 隐藏一级菜单
    this.setData({
      subMenuDisplay: initSubMenuDisplay()
    });

  },

  tapMainMenu: function (event) {
    // debugger;
    if(event == undefined)
    {
      var index = this.data.selectedIndex;
    }else
    {
      //        获取当前显示的一级菜单标识
      var index = parseInt(event.currentTarget.dataset.index);
    }

    // 生成数组，全为hidden的，只对当前的进行显示
    var newSubMenuDisplay = initSubMenuDisplay();
    //        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
      if(index == 0){
        this.setData({
          isSexHidden: true,
          isMoneyHidden:false
        })
      }else
      {
        this.setData({
          isSexHidden: false,
          isMoneyHidden: true
        })
      }
      
    } else {
      newSubMenuDisplay[index] = 'hidden';
      if (index == 0) {

        this.setData({
          isSexHidden: false,
          isMoneyHidden: false
        })
        
      } else {
        this.setData({
          isSexHidden: false,
          isMoneyHidden: false
        })
      }
      // 设置动画
      this.hideModal();
    }
    // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
    // 设置动画
    // this.animation(index);
    console.log(this.data.subMenuDisplay);
  },
  tapSubMenu: function (event) {
    // 隐藏所有一级菜单
    this.setData({
      subMenuDisplay: initSubMenuDisplay()
    });
    // 处理二级菜单，首先获取当前显示的二级菜单标识
    var indexArray = event.currentTarget.dataset.index.split('-');
    // debugger
    if(indexArray[0]=='0')
    {  
       if(indexArray[1]=='0')
       {
         this.setData({
           sexSift:'性别'
         })
       }else if (indexArray[1]=='1')
       {
         this.setData({
           sexSift: '男'
         }) 
       }else{
         this.setData({
           sexSift: '女'
         }) 
       }

    }else{
      if (indexArray[1] == '0') {
        this.setData({
          moneySift: '金额'
        })
      } else if (indexArray[1] == '1') {
        this.setData({
          moneySift: '从大到小'
        })
      } else {
        this.setData({
          moneySift: '从小到大'
        })
      }

    }

    // 初始化状态
    // var newSubMenuHighLight = initSubMenuHighLight;
    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      // 如果点中的是一级菜单，则先清空状态，即非高亮模式，然后再高亮点中的二级菜单；如果不是当前菜单，而不理会。经过这样处理就能保留其他菜单的高亮状态
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          // 实现清空
          initSubMenuHighLight[i][j] = '';
        }
        // 将当前菜单的二级菜单设置回去
      }
    }

    // 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    // 设置为新的数组
    this.setData({
      subMenuHighLight: initSubMenuHighLight
    });
    // 设置动画
    this.hideModal();
    this.animation(indexArray[0]);
    
  },
  animation: function (index) {
    // 定义一个动画
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    // 是显示还是隐藏
    var flag = this.data.subMenuDisplay[index] == 'show' ? 1 : -1;
    // flag = 1;
    // console.log(flag)
    // 使之Y轴平移
    animation.translateY(flag * (initSubMenuHighLight[index].length * 34) + 8).step();
    // 导出到数据，绑定给view属性
    var animationStr = animation.export();
    // 原来的数据
    var animationData = this.data.animationData;
    animationData[index] = animationStr;
    this.setData({
      animationData: animationData
    });
   
  },

  tab_message: function () {
    wx.redirectTo({
      url: '../chat/chat',
    })
  },
  tab_my: function () {
    wx.redirectTo({
      url: '../my/my',
    })

  }

})

