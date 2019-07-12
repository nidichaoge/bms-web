import request from '@/utils/request'

/**
 * 
 * @param {Object} list
 * @param {number} list.brandId
 * @param {number} list.businessId
 * @param {number} list.categoryId
 * @param {number} list.color
 * @param {number} list.costPrice
 * @param {string} list.description
 * @param {string} list.infoDescription
 * @param {number} list.inventory
 * @param {number} list.marketPrice
 * @param {number} list.postage
 * @param {string} list.priceDescription
 * @param {number} list.profits
 * @param {number} list.sale
 * @param {number} list.secondCategoryId
 * @param {number} list.sellPrice
 * @param {Array} list.service
 * @param {number} list.status
 * @param {string} list.title
 * @param {number} list.weight
 */
export function addProduct(list) {
  return request({
    url: 'http://47.102.200.25:8888/product/add',
    method: 'post',
    data: list
  })
}

/**
 * 
 * @param {Object} list
 * @param {number} list.status
 */
export function getProductCount(list) {
  return request({
    url: 'http://47.102.200.25:8888/product/count',
    method: 'get',
    params: { ...list }
  })
}

/**
 * 
 * @param {Object} list
 * @param {number} list.brandId
 * @param {number} list.businessId
 * @param {number} list.categoryId
 * @param {number} list.color
 * @param {number} list.costPrice
 * @param {string} list.description
 * @param {string} list.infoDescription
 * @param {number} list.inventory
 * @param {number} list.marketPrice
 * @param {number} list.postage
 * @param {string} list.priceDescription
 * @param {number} list.profits
 * @param {number} list.sale
 * @param {number} list.secondCategoryId
 * @param {number} list.sellPrice
 * @param {Array} list.service
 * @param {number} list.status
 * @param {string} list.title
 * @param {number} list.weight
 */
export function editProduct(list) {
  return request({
    url: 'http://47.102.200.25:8888/product/edit',
    method: 'put',
    data: list
  })
}

/**
 * 
 * @param {JSON} query
 */
export function getProductList(query) {
  return request({
    url: 'http://47.102.200.25:8888/product/list',
    method: 'get',
    params: { query }
  })
}

/**
 * @param {Object} list
 * @param {number} list.productId
 * @param {number} list.status
 */
export function updateStatus(list) {
  return request({
    url: 'http://47.102.200.25:8888/product/update',
    method: 'put',
    params: { ...list }
  })
}
/**
 * 
 * @param {Object} list
 * @param {array} list.productId
 * @param {number} list.status
 */
export function updateBatchStatus(list) {
  return request({
    url: 'http://47.102.200.25:8888/product/updatebatch',
    method: 'put',
    data: { ...list }
  })
}

export function getProductInfo(list) {
  return request({
    url: 'http://47.102.200.25:8888/product/get',
    method: 'get',
    params: { ...list }
  })
}