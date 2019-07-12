import request from '@/utils/request'
import axios from 'axios'
/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export function login(username, password) {
  return request({
    url: 'http://47.102.200.25:8080/login',
    method: 'post',
    params: {
      username,
      password,
      type: 0
    }
  })
}
/**
 * 登出
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
