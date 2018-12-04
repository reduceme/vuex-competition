import Vue from 'vue'
import Router from 'vue-router'
// import Axios from 'axios'
import LoginView from '../page/LoginView.vue'
import PagesView from '../page/PagesView.vue'
// import CritrionView from '../page/CritrionView.vue'
// import OrderView from '../page/OrderView.vue'
// import OrganizationView from '../page/organizationView.vue'
import StatisticView from '../page/StatisticView.vue'
import IntegralSearchView from '../page/IntegralSearchView.vue'
import SearchRecordView from '../page/SearchRecordView.vue'
import CriterionType from '../page/CriterionType.vue'
import IndustryField from '../page/IndustryField.vue'
import NormalData from '../page/NormalData.vue'
import OrderList from '../page/OrderList.vue'
import OrderState from '../page/OrderState.vue'
import OrganizationInfo from '../page/OrganizationInfo.vue'
import OrganizationState from '../page/OrganizationState.vue'
import OrganizationAccount from '../page/OrganizationAccount.vue'

import memberIndex from '../page/memberIndex.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    /* *
     * 全局路由重定向
     * */
    {
      path: '/',
      // name: 'Knowledge',
      redirect: '/statistic',
      component: PagesView,
      children: [
        {
          path: '/knowledge',
          name: '会员管理',
          redirect: '/knowledge/statistic',
          component: memberIndex,
          children: [
            {
              path: '/statistic',
              name: '会员统计',
              component: StatisticView,
              children: []
            },
            {
              path: '/integral',
              name: '积分查询',
              component: IntegralSearchView,
              children: []
            },
            {
              path: '/searchRecord',
              name: '搜索记录',
              component: SearchRecordView,
              children: []
            }
          ]
        },
        {
          path: '/critrion',
          name: '标准管理',
          redirect: '/critrion/criterionType',
          component: memberIndex,
          children: [
            {
              path: '/criterionType',
              name: '标准类型',
              component: CriterionType,
              children: []
            },
            {
              path: '/industryField',
              name: '行业领域',
              component: IndustryField,
              children: []
            },
            {
              path: '/normalData',
              name: '标准数据',
              component: NormalData,
              children: []
            }
          ]
        },
        {
          path: '/order',
          name: '订单管理',
          redirect: '/order/orderList',
          component: memberIndex,
          children: [
            {
              path: '/orderList',
              name: '订单列表',
              component: OrderList,
              children: []
            },
            {
              path: '/orderState',
              name: '订单统计',
              component: OrderState,
              children: []
            }
          ]
        },
        {
          path: '/organization',
          name: '机构管理',
          redirect: '/organization/organizationInfo',
          component: memberIndex,
          children: [
            {
              path: '/organizationInfo',
              name: '机构信息',
              component: OrganizationInfo,
              children: []
            },
            {
              path: '/organizationState',
              name: '机构统计',
              component: OrganizationState,
              children: []
            },
            {
              path: '/organizationAccount',
              name: '机构结算',
              component: OrganizationAccount,
              children: []
            }
          ]
        }
      ]
    },
    /* *
     * 登录路由
     * */
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    /* *
    * 错误路由
    * */
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path: '/knowledge',
    //   component: PagesView,
    //   children: [
    //     {
    //       path: '',
    //       redirect: '/knowledge/statistic'
    //     },
    //     {
    //       path: 'statistic',
    //       name: 'StatisticView',
    //       component: StatisticView
    //     },
    //     {
    //       path: 'integral',
    //       name: 'IntegralSearchView',
    //       component: IntegralSearchView
    //     },
    //     {
    //       path: 'searchRecord',
    //       name: 'SearchRecordView',
    //       component: SearchRecordView
    //     }
    //   ]
    // },
    // {
    //   path: '/critrion',
    //   component: CritrionView,
    //   children: [
    //     {
    //       path: 'criterionType',
    //       name: 'CriterionType',
    //       component: CriterionType
    //     }, {
    //       path: 'industryField',
    //       name: 'IndustryField',
    //       component: IndustryField
    //     }, {
    //       path: 'normalData',
    //       name: 'NormalData',
    //       component: NormalData
    //     }
    //   ]
    // },
    // {
    //   path: '/order',
    //   component: OrderView,
    //   children: [{
    //     path: 'orderList',
    //     name: 'OrderList',
    //     component: OrderList
    //   }, {
    //     path: 'orderState',
    //     name: 'OrderState',
    //     component: OrderState
    //   }]
    // },
    // {
    //   path: '/organization',
    //   component: OrganizationView,
    //   children: [{
    //     path: 'organizationInfo',
    //     name: 'organizationInfo',
    //     component: OrganizationInfo
    //   },
    //   {
    //     path: 'organizationState',
    //     name: 'OrganizationState',
    //     component: OrganizationState
    //   },
    //   {
    //     path: 'organizationAccount',
    //     name: 'OrganizationAccount',
    //     component: OrganizationAccount
    //   }]
    // }
  ]
})

/* *
 * 全局路由守卫
 * */
// 全局路由守卫
/* router.beforeEach((to, from, next) => {
  console.log('路由守卫')
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  const nextRoute = ['SearchRecordView', 'IntegralSearchView', 'StatisticView']
  // 是否登录
  let isLogin = true
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      router.push({name: 'LoginView'})
    }
  }
  // 已登录状态；当路由到login时，跳转至knowledge
  if (to.name === 'LoginView') {
    if (isLogin) {
      router.push({name: 'Knowledge'})
    }
  }
  next()
}) */

export default router
