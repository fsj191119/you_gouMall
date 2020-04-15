import request from './network.js'

//获取搜索信息
export function getSearch(params){
  return request({
    url:'/goods/qsearch',
    data:params
  })
}