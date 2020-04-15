import {
  getOrder
} from '../../request/order.js'

Page({
  data: {
    //标题
    title: [
      { id: 0, text: "全部", isactive: true },
      { id: 1, text: "待付款", isactive: false },
      { id: 2, text: "待发货", isactive: false },
      { id: 3, text: "退货/退款", isactive: false }
    ],
    //请求过来的订单数据
    orders:[]
  },

  Params:{},
  Header:{},

  onLoad: function (options) {
    //获取token
    //判断token是否存在
    const token=wx.getStorageSync('token')
    if(token){
      this.Header = { Authorization:token}
      this.Params={type:options.type}
      getOrder(this.Header,this.Params).then(res => {
        console.log(res)
        this.setData({
          orders: res.data.message.orders.map(v => ({ ...v, create_time_cn: new Date(v.create_time * 1000).toLocaleString()}))
        })
        //根据type值动态修改title
        // type：1
        // index：0
        this.changeItem(options.type-1)
      })
    }else{
      wx.showModal({
        content: '请先登录(没有企业账号，无法完成支付及订单查询功能)',
        showCancel:false,
        success:res=>{
          wx.switchTab({
            url: '/pages/user/user',
          })
        }
      })

     
    }
    console.log(options.type)
   
  },

//根据type值，动态绑定title
changeItem(index){
  let title = this.data.title
  title.forEach((v, i) => { i == index ? v.isactive = true : v.isactive = false })
  //新数组赋值给data
  this.setData({
    title
  })
},


  //tabs组件传来的索引值
  handle_change(event) {
    console.log(event.detail.index)
    //获取被点击的标题索引
    let index = event.detail.index
    //修改源数组
   this.changeItem(index)
   //重新发送请求
   const token=wx.getStorageSync('token')
    this.Header = { Authorization: token }
    this.Params = { type: index+1 }
   getOrder(this.Header,this.Params).then(res=>{
     console.log(res)
   })
  },


  onShow: function () {

  },

})