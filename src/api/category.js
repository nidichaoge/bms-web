import request from '@/utils/request'

/**
 * 
 * @param {Object} list
 * @param {Boolean} list.isHeader 
 */
export function getGroupCount(list) { // 分组数量
  return request({
    url: 'http://47.102.200.25:8888/category/count',
    method: 'GET',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {number} list.businessId
 * @param {Object} list.category2CreateRequest
 * @param {number} list.category2CreateRequest.businessId
 * @param {number} list.category2CreateRequest.categoryId
 * @param {string} list.category2CreateRequest.description
 * @param {string} list.category2CreateRequest.name
 * @param {string} list.description
 * @param {Boolean} list.isCreateSecond
 * @param {string} list.name
 */
export function createGroup(list) { // 创建分组
  return request({
    url: 'http://47.102.200.25:8888/category/create',
    method: 'POST',
    data: list
  })
}

/**
 * 
 * @param {Object} list
 * @param {number} list.businessId
 * @param {number} list.categoryId
 * @param {string} list.description
 * @param {string} list.name
 */
export function createSecondGroup(list) { // 创建二级分组
  return request({
    url: 'http://47.102.200.25:8888/category/createSecond',
    method: 'POST',
    data: list
  })
}

/**
 * 
 * @param {Object} list
 * @param {number} list.categoryId
 * @param {Boolean} list.isHeader
 */
export function deleteGroup(list) { // 删除分组
  return request({
    url: 'http://47.102.200.25:8888/category/delete',
    method: 'DELETE',
    params: { ...list }
  })
}

/**
 * 
 * @param {Object} list
 * @param {number} list.businessId
 * @param {number} list.categoryId
 * @param {string} list.description
 * @param {string} list.name
 */
export function editGroup(list) { // 编辑分组
  return request({
    url: 'http://47.102.200.25:8888/category/edit',
    method: 'PUT',
    data: list
  })
}

/**
 * 
 * @param {Objcet} list
 * @param {number} list.businessId
 * @param {number} list.categoryId
 * @param {string} list.description
 * @param {string} list.name
 * @param {number} list.secondCategoryId
 */
export function editSecondGroup(list) { // 编辑二级分组
  return request({
    url: 'http://47.102.200.25:8888/category/editSecond',
    method: 'PUT',
    data: list
  })
}

/**
 * 
 * @param {JSON} query
 */
export function getGroupList(query) { // 分组列表
  return request({
    url: 'http://47.102.200.25:8888/category/list',
    method: 'GET',
    params: { query }
  })
}
/**
 * 
 * @param {JSON} query 
 */
export function getSecondGroupList(query) { // 二级分组列表
  return request({
    url: 'http://47.102.200.25:8888/category/listSecond',
    method: 'GET',
    params: { query }
  })
}
