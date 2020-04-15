
Page({
  data: {
    //标题
    title: [
      { id: 0, text: "商品收藏", isactive: true },
      { id: 1, text: "品牌收藏", isactive: false },
      { id: 2, text: "店铺收藏", isactive: false },
      { id: 3, text: "游览足迹", isactive: false }
    ],
    collect:[]
  },
  //tabs组件传来的索引值
  handle_change(event) {
    console.log(event.detail.index)
    //获取被点击的标题索引
    let index = event.detail.index
    //修改源数组
    let title = this.data.title
    title.forEach((v, i) => { i == index ? v.isactive = true : v.isactive = false })
    //新数组赋值给data
    this.setData({
      title
    })
  },

  onLoad: function (options) {
    const collect=wx.getStorageSync('collect')||[]
    this.setData({collect})
  },

  //页面跳转到商品详情页面
  gotoPage(event) {
    //获取页面传过来的id
    let goodsid = event.currentTarget.dataset.goods_id
    console.log(goodsid)
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id=' + goodsid,
    })
  },

  onShow: function () {

  },

})