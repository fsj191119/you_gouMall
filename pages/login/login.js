
Page({

  data: {

  },

  
  onLoad: function (options) {

  },

  onShow: function () {

  },
  //获取用户信息
handlegetUserinfo(event){
  const {userInfo}=event.detail
  console.log(userInfo)
  wx.setStorageSync('userinfo',userInfo)
  wx.navigateBack({
    delta:1
  })
},


})