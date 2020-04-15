
Page({
  data: {
    //标题
    title: [
      { id: 0, text: "体验问题", isactive: true },
      { id: 1, text: "商品、商家投诉", isactive: false }
    ],
    //被选中的图片
    selectImg:[],
    //文本域的内容
    textValue:''
  },
  onLoad: function (options) {

  },

  onShow: function () {

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
//上传图片
  handleUpImg(){
    wx.chooseImage({
      success:(res)=> {
        console.log(res)
        this.setData({
          selectImg:[...this.data.selectImg,...res.tempFilePaths]
        })
      },
    })
  },
  //删除图片
  handleDel(event){
    let {index}=event.currentTarget.dataset
    console.log(index);
    let {selectImg}=this.data
    selectImg.splice(index,1)
    this.setData({selectImg})
  },
  //获取文本框的内容
  handleTxtValue(e){
    this.setData({
      textValue:e.detail.value
    })
  },

  //提交
  handleSub(){
    const {textValue,selectImg}=this.data
    if(!textValue.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      })
      return
    }
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    setTimeout(()=>{
      this.setData({
        textValue:'',
        selectImg:[]
      })
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        success:res=>{
          wx.navigateBack({
            delta:1
          })
        }
      })
    },2000)
  }

})