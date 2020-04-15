import {
  getToken
} from '../../request/uath.js'

Page({


  data: {

  },
  Code: '',
  onLoad: function (options) {

  },

  onShow: function () {

  },

//获取用户信息
  handlegetUserinfo(event){
    // console.log(event)
    const { encryptedData, rawData, iv, signature}=event.detail
    wx.login({//登录
      timeout:10000,
      success:res=>{
        const code=res.code
        console.log(this.Code)
        let params = { encryptedData, rawData, iv, signature, code }
        console.log(params)
        //发送网络请求 获取token值
        getToken(params).then(res => {
          const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          console.log(res)
           wx.setStorageSync('token',token)
          wx.navigateBack({
            delta:1
          })
        })
      }
    })
  

  }

})