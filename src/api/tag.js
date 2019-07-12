import request from '@/utils/request'
/**
 * 
 * @param {Object} list
 * @param {boolean} list.isAuto
 */
export function getTagCount(list) {
  return request({
    url: 'http://47.102.200.25/tag/count',
    method: 'get',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {boolean} list.isAuto
 * @param {string} list.name
 * @param {string} list.description
 */
export function createTag(list) {
  return request({
    url: 'http://47.102.200.25/tag/create',
    method: 'post',
    data: list
  })
}
/**
 * 
 * @param {Object} list
 * @param {number} list.tagId
 */
export function deleteById(list) {
  return request({
    url: 'http://47.102.200.25/tag/delete',
    method: 'delete',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {Array} list.tagIds
 */
export function deleteBatch(list) {
  return request({
    url: 'http://47.102.200.25/tag/deleteBatch',
    method: 'delete',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {string} list.name
 */
export function deleteByName(list) {
  return request({
    url: 'http://47.102.200.25/tag/deleteByName',
    method: 'delete',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {boolean} list.auto
 * @param {string} list.name
 * @param {number} list.tagId
 */
export function editTag(list) {
  return request({
    url: 'http://47.102.200.25/tag/edit',
    method: 'put',
    data: list
  })
}
/**
 * 
 * @param {Object} list
 * @param {number} list.page
 * @param {number} list.pageSize
 * @param {boolean} list.isAuto
 * @param {string} list.order
 * @param {string} list.orderBy
 */
export function getTagList(list) {
  return request({
    url: 'http://47.102.200.25/tag/list',
    method: 'get',
    params: { query: list }
  })
}