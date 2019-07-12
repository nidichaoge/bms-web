import request from '@/utils/request'

/**
 * 获取用户购买信息
 * @param {Object} list 传入数据
 * @param {number} list.customerId 用户ID
 */
export function getBought(list) {
  return request({
    url: 'http://47.102.200.25/behavior/bought',
    method: 'GET',
    params: { ...list }
  })
}
/**
 * 获取用户浏览信息
 * @param {Object} list 传入数据
 * @param {number} list.customerId 用户ID
 */
export function getBrowse(list) {
  return request({
    url: 'http://47.102.200.25/behavior/browse',
    method: 'GET',
    params: { ...list }
  })
}
/**
 * 获取用户
 * @param {Object} list 传入数据
 * @param {number} list.customerId 用户ID
 */
export function getInfo(list) {
  return request({
    url: 'http://47.102.200.25/behavior/info',
    method: 'GET',
    params: { ...list }
  })
}
/**
 * 获取用户
 * @param {Object} list 传入数据
 * @param {number} list.customerId 用户ID
 */
export function getTag(list) {
  return request({
    url: 'http://47.102.200.25/behavior/tag',
    method: 'GET',
    params: { ...list }
  })
}
/**
 * 获取用户
 * @param {Object} list 传入数据
 * @param {number} list.customerId 用户ID
 */
export function getTrade(list) {
  return request({
    url: 'http://47.102.200.25/behavior/trade',
    method: 'GET',
    params: { ...list }
  })
}
