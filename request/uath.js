import request from './network.js'
//获取token
export function getToken(params){
  return request({
    url:'/users/wxlogin',
    method:'post',
    data:params
  })
}