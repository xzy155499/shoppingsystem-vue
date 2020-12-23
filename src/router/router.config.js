import Vue from 'vue'
import VueRouter from "vue-router";
//后端 总店
import Login from "../view/houduan/login/Login.vue";
import Home from '../view/Main.vue'
import HomePage from '../view/houduan/HomePage/HomePage'

import EmpList from "../components/emp/emplist.vue";
import MenuList from "../components/menu/menulist.vue";
import RoleList from "../components/role/rolelist.vue";
import Authority from "../components/authority/authority.vue";
import User from "../components/user/userManage.vue";
import GoodsList from "../components/goods/goodslist.vue";
import GoodsParentTypeList from "../components/goods/goodstypelist";
import WarehouseList from "../components/ware/warehouse";
//后端 商家
import Merchantslist from "../components/merchants/merchantslist";
import MerchantsLogin from "../components/merchants/merchantsLogin"
import MerchantsHome from '../view/houduan/HomePage/HomePageMarehouse'
import MerchantsView from "../components/merchants/merchantsView";
//前端
import Index from "../view/qianduan/index/index.vue";
import Goods from "../view/qianduan/goods/goods.vue";
import Detail from "../view/qianduan/detail/goodsDetail.vue";
import ShoppingCart from "../view/shopping/shoppingCart";

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
    //总店 首页路由
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
          path: '/shoppingsystem/menulist',
          component: MenuList,
        },
        {
          path: '/shoppingsystem/rolelist',
          component: RoleList,
        },
        {
          path: '/shoppingsystem/authority',
          component: Authority,
        },
        {
          path: '/shoppingsystem/user',
          component: User,
        },
        {
          path: "/shoppingsystem/goods",
          component: GoodsList
        },
        {
          path: "/shoppingsystem/goodstype",
          component: GoodsParentTypeList
        },
        {
          path: "/shoppingsystem/warehouse",
          component: WarehouseList
        },
        {
          path: "/shoppingsystem/merchantslist", component: Merchantslist
        }
      ]
    },
    //商家路由
    {
      path: "/shoppingmerchants/merchantsLogin", component: MerchantsLogin
    },
    {
      path: '/shoppingmerchants/merchantsHome', component: MerchantsHome,
      children: [{
          path: '/shoppingmerchants/merchantsView',
          component: MerchantsView
        }]
    },
    {
      path: '/shopping/shoppingCart', component: ShoppingCart,
    },
    //前端路由
    {
      path: '/shoppingsystem/index', component: Index,
      children: [
        {
          path: '/shoppingsystem/index',
          component: Goods
        },
        {
          path: '/shoppingsystem/index',
          component: Goods
        },
        {
          path: '/shoppingsystem/detail',
          component: Detail
        },

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
