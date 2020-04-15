// components/w-floor/w-floor.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    floordata:{
      type:Array,
      value:''
    }
  },

// ready(){
//   console.log(this.properties.floordata)
// },
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
    gotopage(e){
      const {url}=e.currentTarget.dataset
      
      let {goUrl}=this.data
      goUrl= url.replace(/\?/g, '/goods_list?')
      console.log(goUrl)
      this.setData({
        goUrl
      })
      wx.navigateTo({
        url: this.data.goUrl,
      })
  
    }
  }
})
