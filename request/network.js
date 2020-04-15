 //请求的次数
let ajax_count = 0
//网络请求公共模块
export default function request(options){
  ajax_count++
//显示加载中效果
wx.showLoading({
  title: '加载中',
  mask:true
})
  const baseUrl ="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((reslove,reject)=>{
    wx.request({
      header:options.header||{},
      url: baseUrl + options.url,
      method: options.method || "get",
      data: options.data || {},
      success:reslove,
      fail:reject,
      complete:()=>{
        ajax_count--
        if(ajax_count===0){
          //关闭正在加载中效果
          wx.hideLoading()
        } 
      }
    })
  })

}