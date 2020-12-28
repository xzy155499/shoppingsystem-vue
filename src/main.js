import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Main from './view/Main.vue'

import Axios from 'axios'
import BaiduMap from 'vue-baidu-map'
import $ from 'jquery/src/jquery'

import * as echarts from 'echarts/lib/echarts';
// 引入 echarts 主模块。
import 'echarts/lib/echarts'
// 引入柱形图
import 'echarts/lib/chart/bar'
//// 引入提示框组件、标题组件、工具箱、legend组件。
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

//滑动图片验证插件
import SlideVerify from 'vue-monoplasty-slide-verify';
//兄弟路由传值
import bus from './bus'
Vue.prototype.bus=bus;


Vue.prototype.$echarts =echarts;
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'tS9gxkjNh10upXP1PUoLMWDnCu4GKK5x'
})

Vue.use(SlideVerify);
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

