import request from '@/utils/request'
/**
 * 
 * @param {Object} list
 * @param {number} list.customerId
 * @param {Array} list.tagIds
 * @param {number} list.tagSource
 */
export function add(list) {
  return request({
    url: 'http://47.102.200.25/tagCustomer/add',
    method: 'post',
    data: list
  })
}
/**
 * 
 * @param {Object} list
 * @param {Array} list.customerIds
 * @param {number} list.tagId
 * @param {number} list.tagSource
 */
export function addBatch(list) {
  return request({
    url: 'http://47.102.200.25/tagCustomer/addBatch',
    method: 'post',
    data: list
  })
}
/**
 * 
 * @param {Object} list
 * @param {number} list.customerId
 * @param {Array} list.tagIds 
 */
export function remove(list) {
  return request({
    url: 'http://47.102.200.25/tagCustomer/remove',
    method: 'delete',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {Array} list.customerIds
 * @param {number} list.tagId
 */
export function removeBatch(list) {
  return request({
    url: 'http://47.102.200.25/tagCustomer/removeBatch',
    method: 'delete',
    data: { ...list }
  })
}