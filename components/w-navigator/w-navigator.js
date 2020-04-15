// components/w-navigator/w-navigator.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navigatordata:{
      type:Array,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotopage(){
      wx.switchTab({
        url: '/pages/category/category',
      })
    }
  }
})
