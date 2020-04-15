// pages/category/category.js
import {
  getCategory
} from '../../request/category.js'
Page({
  data: {
    //左边菜单栏数据
    leftMenulist:[],
    //右边商品栏
    rightContent:[],
    //左侧菜单栏当前被点击的选项
    currentIndex:0,
    //右侧滚动条到顶部的距离
    scrollTop:0,
  },
  //存放当前正在展示的的商品数据
  nowlist:[],

//分类数据请求模块
_getCategory(){
  getCategory().then(res=>{
    console.log(res)
    this.nowlist=res.data.message
    //设置数据缓存
    wx.setStorageSync('cates',{time: Date.now(),nowlist:this.nowlist})
    //构造左侧菜单栏数据
    let leftMenulist = this.nowlist.map(v=>v.cat_name)
    //构造右侧商品数据
    let rightContent = this.nowlist[0].children
    this.setData({
      leftMenulist,
      rightContent
    })
  })
},
//页面加载
  onLoad: function (options) {
    //获取缓存数据
    const Cates = wx.getStorageSync('cates')
    if (Cates && Date.now() - Cates.time < 1000 * 10) {//存在
      /*可以使用旧数据*/
      //构造左侧菜单栏数据
      let leftMenulist = Cates.nowlist.map(v => v.cat_name)
      //构造右侧商品数据
      let rightContent = Cates.nowlist[0].children
      this.setData({
        leftMenulist,
        rightContent
      })
      console.log('使用的旧数据')
    }else{
      //不存在或过期 重新发送请求
      this._getCategory()
    } 
  },

  //点击左侧菜单栏
  handleitem(event) {
    let  index  = event.currentTarget.dataset.index
    //根据不同的索引来展示商品列表
    let rightContent = this.nowlist[index].children
    this.setData({
      currentIndex: index,
      rightContent
    })
    //重新设置右侧商品栏到顶部的距离
    this.setData({
      scrollTop:0
    })

    // console.log(index)
    // console.log(rightContent)
  },

  //跳转到商品列表页面
  gotoPage(event){
    //被选中的商品id
     let id=event.currentTarget.dataset.goodsid
    console.log(id)
    wx.navigateTo({
      url: '/pages/goods_list/goods_list?id='+id,
    })
  },

})