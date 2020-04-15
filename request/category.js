import request from './network.js'
//获取分类页面的数据
export function getCategory(){
  return request({
    url:"/categories"
  })
}