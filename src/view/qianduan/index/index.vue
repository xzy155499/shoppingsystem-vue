<template>
  <div class="index-head">
    <!-- 回到顶部 -->
    <el-backtop :bottom="50">
      <div
        style="{
        height: 100%;
        width: 100%;
        border-radius:50%; /* 边框圆角 */
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        <i class="el-icon-caret-top" style="color: #1989fa"></i>
      </div>
    </el-backtop>
    <!-- 头部 -->
    <el-menu :default-active="1+''" class="el-menu-demo" mode="horizontal">
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">购物车</el-menu-item>
      <el-menu-item style="float: right;" index="4">
        客服咨询电话:&nbsp;123-4567-8910
      </el-menu-item>
      <el-menu-item style="float: right;">
        <div class="r-content">
          <el-dropdown trigger="click" size="mini">
              <span class="el-dropdown-link">
                <el-avatar :size="40" src="../src/assets/img/qimu.jpg"></el-avatar>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu-item>
      <el-menu-item style="float: right;" index="3">订单管理</el-menu-item>

    </el-menu>
    <!-- 中间部分 路由 -->
    <router-view></router-view>
    <!-- 底部 -->
    <div class="index_fotter">
      <div class="wapper index_fotter_dv disbet">
        <div class="index_fotter_dv_left">
          <p>荣荣在线</p>
          <p>中国一家有影响力<br>农产品、食品产地直发B2B供应链、服务平台</p>
          <div style="margin-top: 68px;">公司地址:湖南省长沙市岳麓区达嘉维康有限公司</div>
        </div>
        <div class="index_fotter_dv_right">
          <div>咨询电话:</div>
          <em style="margin: 16px 0;display: block;font-size: 22px;line-height: 1;">123-4567-8910</em>
          <div>服务时间: 周一到周日 09:00-21:00</div>
          <img style="margin:30px 0 18px 0" src="../../../assets/img/index.png" alt="找货上农甲,品类齐全,服务好">
          <div style="font-size: 16px;">客服邮箱：2321259949@qq.com</div>
        </div>
      </div>
      <div class="site_footer">
        达嘉维康医药有限公司 版权所有
        湘ICP备18017268号-2
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .el-menu {
    box-shadow: 0px 0px 14px 0px rgba(207, 207, 207, 0.51);
  }

  .index_fotter {
    background: #F3F3F3;
    margin-top: 34px;
  }

  .index_fotter_dv {
    padding: 63px 0 40px 0;
    border-bottom: 1px solid #DFDFDF;
  }

  .index_fotter_dv .index_fotter_dv_left p {
    font-size: 18px;
    color: #999999;
    line-height: 2;
  }

  .index_fotter_dv .index_fotter_dv_left div {
    color: #999999;
  }

  .index_fotter_dv .index_fotter_dv_right div {
    font-size: 18px;
    color: #999;
  }

  .site_footer {
    line-height: 108px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  a {
    text-decoration: blink;
  }
</style>
