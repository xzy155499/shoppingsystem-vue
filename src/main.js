import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Main from './view/Main.vue'

import Axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false

import Router from './router/router.config.js'


Axios.defaults.baseURL = "http://127.0.0.1:8080/shoppingsystem"
// 将API方法绑定到全局
Vue.prototype.$axios = Axios

new Vue({
	el: '#app',
	render: h => h(App),
  router:Router,
  //store:Store  //挂载store
})

