import request from "./network.js"

//获取商品列表数据
export function getGoodsList(params){
  return request({
    url: "/goods/search",
    data:params
  })

}