import{
  getGoodsDetail
} from '../../request/goods_detail.js'

Page({
  data: {
    //存放请求过来的数据
    goodsinfo:{},
    //标题是否加载全部
    isshow:true,
    //商品收藏是否选中
    iscollect: false
  },
  //请求数据需要的参数
  QueryParams:{
    goods_id: "",
  },
  //存放商品信息
  Goodsinfo:{},
//标题过长会隐藏，点击显示全部标题
  showtitle(){
    this.setData({
      isshow:!this.data.isshow
    })
  },

  //立即购买
  nowbuy() {
    //获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || []
    //判断商品对象 是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.Goodsinfo.goods_id)
    if (index === -1) {
      //不存在 第一次添加
      this.Goodsinfo.num = 1
      this.Goodsinfo.check = true
      cart.push(this.Goodsinfo)
    } else {
      //已经存在购物车数据
      // cart[index].num++
    }
    //购物车重新添加到缓存中
    wx.setStorageSync('cart', cart);

    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },


  //页面加载
  onLoad: function (options) {
    this.QueryParams.goods_id=options.goods_id
    this._getGoodsDetail(this.QueryParams)

  },
  //网络请求模块
  _getGoodsDetail(goodsid){
    getGoodsDetail(goodsid).then(res=>{
      // 获取到的数据
      const hasdata = res.data.message
      this.Goodsinfo =hasdata
      //获取缓存中的商品数组
      let collect = wx.getStorageSync('collect') || []
      //判断商品是否被收藏
      let iscollect = collect.some(v=>v.goods_id === this.Goodsinfo.goods_id)
      console.log(res)
      //把需要的数据存起来
      this.setData({
        goodsinfo:{
          goods_name: hasdata.goods_name,
          goods_price: hasdata.goods_price,
          //iphone 部分手机 不识别webp图片格式（临时修改）
          goods_introduce: hasdata.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics: hasdata.pics
        },
        iscollect
      })
      console.log(this.data.goodsinfo)
    })
  },
  //点击轮播图 放大预览图片
  handlebig_img(event){
    //构造要预览图片的数组
    const urls=this.Goodsinfo.pics.map(v=>v.pics_mid)
    //接收传递过来的url
    const current=event.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },

  //页面跳转购物车
  gotoCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
  ,
  //加入购物车
  handleCartAdd(){
    //获取缓存中的购物车 数组
    let cart=wx.getStorageSync("cart")||[]
    //判断商品对象 是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.Goodsinfo.goods_id)
    if(index===-1){
      //不存在 第一次添加
      this.Goodsinfo.num=1
      this.Goodsinfo.check=true
      cart.push(this.Goodsinfo)
    }else{
      //已经存在购物车数据
      cart[index].num++
    }
    //购物车重新添加到缓存中
    wx.setStorageSync('cart', cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  },

  //点击收藏
  handleCollect(){
    //获取缓存中的收藏数组
    let collect=wx.getStorageSync('collect')||[]
    let iscollect=this.data.iscollect
    //判断商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.Goodsinfo.goods_id)
    if(index!==-1){//能找到
      collect.splice(index, 1)
      iscollect =false
      wx.showToast({
        title: '取消收藏',
        mask:true
      })
    }else{
      collect.push(this.Goodsinfo)
      iscollect=true
      wx.showToast({
        title: '收藏成功',
        mask: true
      })
    }
    //把数组存入缓存中
    wx.setStorageSync('collect', collect)
    //修改data中的属性 iscollect
    this.setData({
      iscollect
    })
  }

})