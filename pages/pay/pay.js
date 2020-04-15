import {
  getPay
} from '../../request/pay.js'

Page({

  data: {
    address: {},
    //缓存中的购物车数据
    cart: [],
    //总价格
    allprice: '',
    //总数量
    allnum: ''
  },
  code :"" ,
  //页面显示出来
  onShow() {
    const address = wx.getStorageSync('address')
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || []
    //过滤后的数据
    cart = cart.filter(v => v.check)
    this.setData({
      address
    })
    //  const allcheck=cart.length?cart.every(v=>v.check):false

    //总价格 总数量
    let allprice = 0
    let allnum = 0
    cart.forEach(v => {
      allprice += v.num * v.goods_price
      allnum += v.num
    })
    this.setData({
      cart,
      allprice,
      allnum,
      address
    })
  },

  //支付
  handlePay() {
    //判断缓存中有没有token
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return
    }
    console.log('已经存在token了')
    //创建订单
    //请求头参数
    const header = {
      Authorization: token
    }
    //请求体参数
    const order_price = this.data.allprice
    const consignee_addr = this.data.address.all
    const goods = []
    let cart = this.data.cart
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_num: v.num,
      goods_price: v.goods_price
    }))

    const params = {
      order_price,
      consignee_addr,
      goods
    }
    //发送请求
    getPay(header, params).then(res => {
      //支付成功
      wx.showToast({
        title: '支付成功',
        success:res=>{
          //删除缓存中已经支付的数据
          let newCart = wx.getStorageSync('cart')
          newCart = newCart.filter(v => !v.check)
          wx.setStorageSync('cart', newCart)
          wx.navigateBack({
            delta:1
          })
        }
      })
      
    })
  },

  //      根据当前时间和随机数生成流水号
  randomNumber() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    // month = this.setTimeDateFmt(month)
    // hour = this.setTimeDateFmt(hour)
    // minutes = this.setTimeDateFmt(minutes)
    // seconds = this.setTimeDateFmt(seconds)
    return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 23 + 100)).toString()
  }
})