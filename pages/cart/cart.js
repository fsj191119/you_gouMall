import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/promiseWx.js'

Page({

  data: {
    address:{},
    //缓存中的购物车数据
    cart:[],
    //是否全选
    allcheck:false,
    //总价格
    allprice:'',
    //总数量
    allnum:''
  },
  //页面显示出来
 onShow(){
   const address=wx.getStorageSync('address')
   //获取缓存中的购物车数据
   const cart=wx.getStorageSync('cart')||[]
   this.setData({address})
  //  const allcheck=cart.length?cart.every(v=>v.check):false
  this._setCart(cart)
 
   console.log(this.data.address)
},
  onLoad: function(options) {
  },

  //点击获取收货地址
  handleAddress() {
    //获取权限状态
      getSetting().then(res => {
        const scopeAddress = res.authSetting["scope.address"]
        console.log(scopeAddress)
        if (scopeAddress===false) {
          //用户以前拒绝过授予权限 先诱导用户打开授权页面（拒绝过）
          openSetting()
        }
        //获取收货地址
        chooseAddress().then(address => {
          // console.log(address)
          //存入到缓存中
          address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo//详细地址
          wx.setStorageSync('address', address)
        })
      })
  },

//商品的选中状态
  handleItemChange(event){
    //商品id
    const goods_id=event.currentTarget.dataset.goodsid
    console.log(goods_id)
    //获取购物车数组
    const cart=this.data.cart

    //找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id==goods_id)
    //把选中状态取反
    cart[index].check=!cart[index].check
    //更新购物车数据
    this._setCart(cart)
  },

//商品数量增减功能
  handleedit(event){
    //接收页面传来的参数
    const {operation,id}=event.currentTarget.dataset
    //获取data中的数据
    let {cart}=this.data
    //找到选中商品的下标
    let index =cart.findIndex(v=>v.goods_id===id)
    //进行数量修改
    cart[index].num += operation
    //num是否等于0
    if (cart[index].num<=0){
      cart[index].num=1
    }
    //把数据重新放回缓存中
    this._setCart(cart)
  },

//删除功能
  handledel(event){
    //弹框提示
    wx.showModal({
      content: '确认删除?',
      success:res=>{
        if(res.confirm){//确认
          //获取点击的商品id
          const { goods_id } = event.currentTarget.dataset
          let cart = this.data.cart
          //找到商品的下标
          let index = cart.findIndex(v => v.goods_id === goods_id)
          //根据下标移除数据
          cart.splice(index,1)
          //重新展示数据
          this._setCart(cart)
        }else if(res.cancel){//取消
        console.log('用户点击了取消')
        return
        }
      }
    })
  },

//全选功能
  handleAllCheck(){
    //获取数据
    let {cart,allcheck}=this.data
    //修改值
    allcheck=!allcheck
    //循环修改cart数组中的选中状态
    cart.forEach(v=>v.check=allcheck)
    //填充回data或缓存中
    this._setCart(cart)
  },

//结算功能
  handlePay(){
    //判断有没有收货地址
    let {address,allnum}=this.data
    if(!address.userName){
      wx.showToast({
        title: '您还没选择收货地址',
        icon:"none"
      })
      return
    }
    if (allnum===0){
      wx.showToast({
        title: '您还没有选购商品',
        icon: "none"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },



//设置购物车状态 同时重新计算底部tabbar栏里的数据
  _setCart(cart){
    //重新计算全选
    let allcheck = true
    //总价格 总数量
    let allprice = 0
    let allnum = 0
    cart.forEach(v => {
      if (v.check) {
        allprice += v.num * v.goods_price
        allnum += v.num
      } else { allcheck = false }//没有选中
    })
    //判断数组是否为空
    allcheck = cart.length != 0 ? allcheck : false
    this.setData({
      cart,
      allprice,
      allnum,
      allcheck
    })

    wx.setStorageSync('cart', cart)
  }

})