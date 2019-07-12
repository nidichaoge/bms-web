import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    name: 'User',
    meta: { title: '用户', icon: 'user' },
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/user/userList/index'),
        meta: { title: '用户列表', icon: '' }
      },
      {
        path: 'labelManage',
        name: 'LabelManage',
        component: () => import('@/views/user/labelManage/index'),
        meta: { title: '标签管理', icon: '' }
      },
      {
        path: 'updateUser',
        name: 'UpdateUser',
        component: () => import('@/views/user/updateUser/index'),
        meta: { title: '添加用户', icon: '' }
      },
      {
        path: 'userDetail',
        name: 'UserDetail',
        component: () => import('@/views/user/userDetail/index'),
        meta: { title: '用户详情', icon: '' },
        hidden: true
      },
      {
        path: 'updateTag',
        name: 'UpdateTag',
        component: () => import('@/views/user/updateTag/index'),
        meta: { title: '添加标签', icon: '' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goodsList',
    name: 'Goods',
    meta: { title: '商品', icon: 'goods' },
    children: [
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/goods/goodsList/index'),
        meta: { title: '商品列表', icon: '' }
      },
      {
        path: 'groupManage',
        name: 'GroupManage',
        component: () => import('@/views/goods/groupManage/index'),
        meta: { title: '分组管理', icon: '' }
      },
      {
        path: 'updateGoods',
        name: 'UpdateGoods',
        component: () => import('@/views/goods/updateGoods/index'),
        meta: { title: '创建商品', icon: '' }
      },
      {
        path: 'createGroup',
        name: 'CreateGroup',
        component: () => import('@/views/goods/createGroup/index'),
        meta: { title: '创建分组', icon: '' }
      },
      {
        path: 'updateGroup',
        name: 'UpdateGroup',
        component: () => import('@/views/goods/updateGroup/index'),
        meta: { title: '更新分组', icon: '' },
        hidden: true
      },
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderList',
    name: 'order',
    meta: { title: '订单', icon: 'order' },
    children: [
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/order/orderList/index'),
        meta: { title: '订单列表', icon: 'order' }
      },
      {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/order/orderDetail/index'),
        meta: { title: '订单详情', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/refund',
    component: Layout,
    redirect: '/refund/refundList',
    name: 'refund',
    meta: { title: '逆向订单', icon: 'refund' },
    children: [
      {
        path: 'refundList',
        name: 'RefundList',
        component: () => import('@/views/refund/refundList/index'),
        meta: { title: '逆向订单列表', icon: 'refund' }
      },
      {
        path: 'refundDetail',
        name: 'RefundDetail',
        component: () => import('@/views/refund/refundDetail/index'),
        meta: { title: '逆向订单详情', icon: '' },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
