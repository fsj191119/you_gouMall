// components/w-tabs/w-tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titlelist:{
      type:Array,
      value:''
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
    handleclick(event){
      let index = event.currentTarget.dataset.index
      // console.log(index)
      this.triggerEvent('tabs_change',{index})
    }
  }
})
