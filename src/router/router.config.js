import Vue from 'vue'
import VueRouter from "vue-router";

import Login from "../view/login/Login.vue";
import Home from '../view/Main.vue'
import HomePage from '../view/homePage/HomePage'

import EmpList from "../components/emp/emplist.vue";
import MenuList from "../components/menu/menulist.vue";
import GoodsList from "../components/goods/goodslist.vue";
import GoodsParentTypeList from "../components/goods/goodstypelist";
import WarehouseList from "../components/ware/warehouse";


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 完整路由代码
export default new VueRouter({
  mode: 'history',
  routes: [
    //默认页面
    {path: "/", redirect: "/shoppingsystem/login"},
    //登录路由
    {path: '/shoppingsystem/login', component: Login,},
    //首页路由
    {
      path: '/shoppingsystem/home', component: Home,
      children: [
        {
          path: '/shoppingsystem/home',
          component: HomePage
        },
        {
          path: '/shoppingsystem/emplist',
          component: EmpList,
        },
        {
          path: '/shoppingsystem/menulist', component: MenuList,
        },
        {
          path: "/goods", component: GoodsList
        },
        {
          path: "/goodstype", component: GoodsParentTypeList
        },
        {
          path: "/warehouse", component: WarehouseList
        }
      ]
    },
  ]
})
//3.定义路由处理器  VueRouter
//在构造的参数中，配置路由组
var router = new VueRouter({
  routes: this.routes,
});

var vm = new Vue({
  el: "#app",
  router: router   //4.挂载路由
})

// //设置默认展示页面
// vm.$router.replace({
//   path: '',
// })
