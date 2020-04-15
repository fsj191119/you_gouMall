import request from './network.js'
//获取商品详情信息
export function getGoodsDetail(goodsid){
  return request({
    url:'/goods/detail',
    data:goodsid
  })
}