import request from '@/utils/request'

/**
 * 添加客户
 * @param {Object} list 用户数据
 * @param {object} list.customerDetailInfo
 * @param {Date} list.customerDetailInfo.anniversary
 * @param {string} list.customerDetailInfo.area
 * @param {Date} list.customerDetailInfo.birthday
 * @param {string} list.customerDetailInfo.weChat
 * @param {string} list.description
 * @param {number} list.gender
 * @param {string} list.mobile
 * @param {string} list.nickName
 */
export function addCustomer(list) {
  return request({
    url: 'http://47.102.200.25/customer/add',
    method: 'POST',
    data: list
  })
}

/**
 * 查询用户数量
 * @param {number} businessId 唯一标识
 */
export function getCustomerCount() {
  return request({
    url: 'http://47.102.200.25/customer/count',
    method: 'get'
  })
}

/**
 * 编辑用户
 * @param {Object} list 用户数据
 * @param {object} list.customerDetailInfo
 * @param {Date} list.customerDetailInfo.anniversary
 * @param {string} list.customerDetailInfo.area
 * @param {Date} list.customerDetailInfo.birthday
 * @param {string} list.customerDetailInfo.weChat
 * @param {string} list.description
 * @param {number} list.gender
 * @param {string} list.mobile
 * @param {string} list.nickName
 */
export function editCustomer(list) {
  return request({
    url: 'http://47.102.200.25/customer/edit',
    method: 'put',
    data: list
  })
}

/**
 * 查询客户信息
 * @param {JSON} query
 */
export function getCustomerList(query) {
  return request({
    url: 'http://47.102.200.25/customer/list',
    method: 'GET',
    params: { query }
  })
}
export function searchByMobile(list) {
  return request({
    url: 'http://47.102.200.25/customer/search',
    method: 'GET',
    params: { ...list }
  })
}