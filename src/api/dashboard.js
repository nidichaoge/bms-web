import request from '@/utils/request'

function cornerOrder() {
  return request({
    url: 'http://47.102.200.25:8880/trade/corner/order',
    method: 'get'
  })
}
function pendingOrder() {
  return request({
    url: 'http://47.102.200.25:8880/trade/pending/order',
    method: 'get'
  })
}
function todayOrder() {
  return request({
    url: 'http://47.102.200.25:8880/trade/today/order',
    method: 'get'
  })
}
function todaySale() {
  return request({
    url: 'http://47.102.200.25:8880/trade/today/sale',
    method: 'get'
  })
}
function weekOrder() {
  return request({
    url: 'http://47.102.200.25:8880/trade/week/order',
    method: 'get'
  })
}
function weekSale() {
  return request({
    url: 'http://47.102.200.25:8880/trade/week/sale',
    method: 'get'
  })
}
export {
  cornerOrder,
  pendingOrder,
  todayOrder,
  todaySale,
  weekOrder,
  weekSale
}