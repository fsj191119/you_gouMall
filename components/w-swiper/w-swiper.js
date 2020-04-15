// components/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperdata:{
      type:Array,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goUrl:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    topage(){
      console.log("我要跳转了")
    },
    gotopage(e){
      const {url}=e.currentTarget.dataset
      // console.log(url.replace(/\main/g, 'goods_detail'))
      this.setData({
        goUrl: url.replace(/\main/g, 'goods_detail')
      })
      wx.navigateTo({
        url: this.data.goUrl,
      })
    }
  }
})
