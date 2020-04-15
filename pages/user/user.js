import {
  getToken
} from '../../request/uath.js'
Page({

  data: {
    userInfo:{},
    //被收藏的商品数量
    collectnum:0
  },

  
  onLoad: function (options) {
    this._getsetting()//授权
  },
  //获取用户信息
  getuser() {
    wx.getUserInfo({
      success: (res) => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  //授权操作
  _getsetting() {
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          /*用户允许授权*/
          const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          wx.setStorageSync('token', token)
          //获取商品收藏信息
          const collect = wx.getStorageSync('collect')
          //获取用户信息(用bindgetuserinfo动态绑定用户信息)
          this.getuser()
          //隐藏获取信息按钮
          this.setData({
            is_show: false,
            collectnum:collect.length
          })
        } else {
          //用户拒绝授权
          console.log('拒绝')
        }
      }
    })
  },

  //根据用户选择（动态绑定数据）
  handleUser(event) {
    console.log(event)
    //判断用户是否点击允许
    if (event.detail.rawData) {
      //获取用户信息（动态绑定）
      this._getsetting()
    }
  },

//页面跳转
  gotoPage(){
    let token=wx.getStorageSync('token')
    if (token){
      wx.navigateTo({
        url: '/pages/feedback/feedback',
      })
    }else{
      wx.showModal({
        content: '请先登录',
        showCancel: false
      })
    }
   
  },

  onShow: function () {
  }
,

})