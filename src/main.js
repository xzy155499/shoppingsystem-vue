import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Main from './view/Main.vue'

import Axios from 'axios'
import BaiduMap from 'vue-baidu-map'
import $ from 'jquery/src/jquery'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'tS9gxkjNh10upXP1PUoLMWDnCu4GKK5x'
})


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

