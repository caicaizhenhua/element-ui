// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/components/http-interceptor.js'
import moment from 'moment' // 时间插件

// 过滤时间插件
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://3.112.132.86:8888/api/private/v1/'
// axios.defaults.baseURL = ' http://www.xiaomadagege.cn:8888/api/private/v1/'
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
