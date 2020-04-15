//权限信息
export function getSetting(){
 return new Promise((reslove,reject)=>{
   wx.getSetting({
     success:reslove,
     fail:reject
   })
 })
}
//获取地址
export function chooseAddress(){
  return new Promise((reslove,reject)=>{
    wx.chooseAddress({
      success:reslove,
      fail:reject
    })
  })
}

//获取权限
export function openSetting(){
  return new Promise((reslove,reject)=>{
    wx.openSetting({
      success:reslove,
      fail:reject
    })
  })
}