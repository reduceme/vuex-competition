/*
* 单页面主入口js文件
* author：zhaoyong
* date: 2018-10-12
* */
import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
// import api from './api'

// 引用element-ui框架
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置
Vue.config.productionTip = false
Vue.prototype.Axios = Axios
// Axios.defaults.baseURL = api.host + ':' + api.port
Axios.defaults.baseURL = 'http://192.168.3.78:8080'
Axios.defaults.withCredentials = true

// Vue全局使用element-ui
Vue.use(Element)

Axios.interceptors.response.use(function (response) {
  if (response.request.responseURL.includes('/login') && !router.history.current.fullPath.includes('/login')) {
    Element.Message.warning({
      message: '请先登录'
    })
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return response
})

/* 挂载Vue实例 */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
