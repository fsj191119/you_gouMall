import{
  getGoodsList
}from "../../request/goods_list.js"
Page({

  //页面的初始数据
  data: {
    //标题
    title:[
      { id: 0, text: "综合", isactive: true },
      { id: 1, text: "销量", isactive: false },
      { id: 2, text: "价格", isactive: false }
    ],
    goodsList:[]
  },
  //接口需要的参数
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPage:1,

   //监听页面加载
  onLoad(options) {
    console.log(options)
    this.QueryParams.cid=options.id||""
    this.QueryParams.query = options.query || ""
    this._getGoodsList()
    
  },
  //网络请求模块
  _getGoodsList(params){
    getGoodsList(this.QueryParams).then(res => {
      console.log(res.data.message)
      //获取总页数
      let total=res.data.message.total
      this.totalPage=Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList,...res.data.message.goods]
      })   
      console.log(this.data.goodsList)
      //关闭下拉刷新窗口
      wx.stopPullDownRefresh();
    })
  },

  //tabs组件传来的索引值
  handle_change(event){
    console.log(event.detail.index)
    //获取被点击的标题索引
    let index=event.detail.index
    //修改源数组
    let title=this.data.title
    title.forEach((v,i)=>{i==index?v.isactive=true:v.isactive=false})
    //新数组赋值给data
    this.setData({
      title
    })
  },

  //页面跳转到商品详情页面
  gotoPage(event){
    //获取页面传过来的id
    let goodsid = event.currentTarget.dataset.goods_id
    console.log(goodsid)
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id='+goodsid,
    })
  },


  //滚动条触底事件
  onReachBottom(){
    //判断当前页数是否大于总页数
    if(this.QueryParams.pagenum>=this.totalPage){
      console.log("没有数据了")
      wx.showToast({
        title: '没有数据了~',
      })
    }else{
      console.log("还有数据")
      this.QueryParams.pagenum++ //页数自增
      this._getGoodsList()
    }
  },
  //下拉刷新触发事件
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1
    //重新请求数据
    this._getGoodsList()
  }

})