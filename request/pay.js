import request from'./network.js'

//获取订单
export function getPay(headerdata,params){
  return request({
    header: headerdata,
    url:'/my/orders/create',
    method:'post',
    data: params

  })

}