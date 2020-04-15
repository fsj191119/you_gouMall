import {
  getSearch
} from '../../request/search.js'

Page({

  data: {
    queryMessage:[],
    //取消的按钮是否显示
    isshow:false,
    //输入框的值
    inpValue:''
  },
Timeid:-1,

  onLoad: function (options) {

  },
  //监听输入款值的变化
  handleInput(event){
    console.log(event)
    //获取输入框的值
    const {value}=event.detail
    if(!value.trim()){
        this.setData({
          queryMessage: [],
          isshow: false
        })
        clearTimeout(this.Timeid)
     
      //值不合法
      return
    }
   //取消按钮显示/隐藏
   this.setData({isshow:true})
   //防抖
    clearTimeout(this.Timeid)
    this.Timeid=setTimeout(()=>{
       //发送请求
      let params = { query: value }
      getSearch(params).then(res => {
        console.log(res.data)
        this.setData({ queryMessage: res.data.message })
      })
    },1000)
  },

//页面跳转
  gotoPage(event){
    console.log(event)
    let {goods_id}=event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id='+goods_id,
    })
  },
//取消按钮
handlecancel(){
this.setData({
  queryMessage:[],
  isshow:false,
  inpValue:''
})
}

})