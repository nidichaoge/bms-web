import request from '@/utils/request'
function orderList(query) {
  return request({
    url: 'http://47.102.200.25:8880/order/list',
    method: 'get',
    params: { query }
  })
}
function orderDetail(list) {
  return request({
    url: 'http://47.102.200.25:8880/order/get/detail',
    method: 'get',
    params: { ...list }
  })
}
function orderPlus(list) {
  return request({
    url: 'http://47.102.200.25:8880/order/plus',
    method: 'put',
    params: { ...list }
  })
}
function orderPlusBatch(list) {
  return request({
    url: 'http://47.102.200.25:8880/order/plusbatch',
    method: 'put',
    params: { ...list }
  })
}
export {
  orderList,
  orderDetail,
  orderPlus,
  orderPlusBatch
}