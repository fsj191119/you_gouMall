import{
  getSwiper,
  getNavigator,
  getFloor
} from '../../request/home.js'

Page({
  data: {
    swiperlist:[],
    navigatorlist:[],
    floorlist:[]
  },

//封装轮播图数据请求模块
_getSwiper(){
  getSwiper().then(res => {
    if (res.data.meta.status == 200) {
      // console.log(res.data.message)
      this.setData({
        swiperlist:res.data.message
      })
      // console.log(this.data.swiperlist)
    } else { console.log(res.data.meta.msg) }
  })
},
//分类导航数据请求模块
  _getNavigator(){
    getNavigator().then(res=>{
      // console.log(res)
      this.setData({
        navigatorlist:res.data.message
      })
    })
  },

  //楼层数据请求模块
  _getFloor(){
    getFloor().then(res=>{
      console.log(res)
      this.setData({
        floorlist:res.data.message
      })
    })
  },


  onLoad: function (options) {
    this._getSwiper()
    this._getNavigator()
    this._getFloor()
  },

  onReady: function () {
  },

  onShow: function () {

  }
})