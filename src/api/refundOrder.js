import request from '@/utils/request'
function refundList(query) {
  return request({
    url: 'http://47.102.200.25:8880/refund/list',
    method: 'get',
    params: { query }
  })
}
function refundDetail(list) {
  return request({
    url: 'http://47.102.200.25:8880/refund/get/detail',
    method: 'get',
    params: { ...list }
  })
}
function refundPlus(list) {
  return request({
    url: 'http://47.102.200.25:8880/refund/plus',
    method: 'put',
    params: { ...list }
  })
}
export {
  refundList,
  refundDetail,
  refundPlus
}