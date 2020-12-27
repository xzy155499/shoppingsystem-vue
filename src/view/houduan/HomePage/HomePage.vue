<template>
  <div>
  <el-row class="home" :gutter="20">
    <el-col :span="9" style="margin-top: 20px">
      <!-- 个人信息 -->
      <!--shadow属性设置卡片阴影出现的时机-->
      <el-card shadow='hover'>
        <div class="user">
          <el-avatar :size="150" :src="JSONEmp.photo"></el-avatar>
          <div class="userinfo">
            <p class="name">{{JSONEmp.emp_name}}</p>
            <p class="access">{{role_name}}</p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="login-info" align="center">
          <table>
            <tr>
              <td><p>上次登录时间：</p></td>
              <td><span>{{JSONEmp.last_time}}</span></td>
            </tr>
            <tr>
              <td><p>上次登录地点：</p></td>
              <td><span>长沙</span></td>
            </tr>
          </table>
        </div>
      </el-card>

      <!-- 购买情况 -->
      <el-card style="height: 450px ; margin-top: 20px" shadow="hover">
        <el-table :data="tableData"
                  border>
          <el-table-column prop="gName" label="商品名称">
          </el-table-column>
          <el-table-column prop="gParent" label="今日购买">
          </el-table-column>
          <el-table-column prop="gChild" label="近一周购买">
          </el-table-column>
          <el-table-column prop="warehouseNum" label="近一月购买">
          </el-table-column>
          <el-table-column prop="gNum" label="销售总量">
          </el-table-column>
        </el-table>
      </el-card>

    </el-col>

    <el-col :span="15" style="margin-top: 20px">
      <!--  本月的订单情况 -->
      <div class="num">
        <el-card  shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 荣布斯榜 -->
      <el-card style="height: 290px" shadow="hover">
        <div id="main"  style="float:left;width:100%;height: 300%"></div>
      </el-card>

      <div class="graph">
        <!-- 活跃用户情况 -->
        <el-card style="height: 270px" shadow="hover">
        </el-card>
        <!-- 销售情况 -->
        <el-card style="height: 270px" shadow="hover">
        </el-card>

      </div>

    </el-col>

  </el-row>

  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  // 引入饼状图组件
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        JSONEmp: {},
        role_name: sessionStorage.getItem('role_name'),
        countData: [
          {
            name: '今日支付订单',
            value: 4,
            icon: 's-claim',
            color: '#2ec7c9',
            text:'orderNumDay'
          },
          {
            name: '今日利润',
            value: 3,
            icon: 'star-on',
            color: '#ffb980',
            text:'orderInfoGoodsDayProfits'
          },
          {
            name: '今日新增用户',
            value: 5,
            icon: 'user',
            color: '#5ab1ef',
            text:'userNumDay'
          },
          {
            name: '近一月支付订单',
            value: 10,
            icon: 's-claim',
            color: '#2ec7c9',
            text:'orderNumMonty'
          },
          {
            name: '近一月利润',
            value: 14,
            icon: 'star-on',
            color: '#ffb980',
            text:'orderInfoGoodsMontyProfits'
          },
          {
            name: '近一月新增用户',
            value: 23,
            icon: 'user',
            color: '#5ab1ef',
            text:'userNumMonty'
          }
        ],
        tableData: [],
        map:{},
        rbsData:[],
      }
    },
    methods: {
      getDate(){
        var _this =this;
        this.$axios.post("queryAllOrderInfoGoods.action").then(function (result) {
          _this.tableData = result.data;
        }).catch(function (error) {
          alert(error)
        })
        this.$axios.post("queHomeData.action").then(function (result) {
          _this.map = result.data;
          for (let i = 0; i <_this.countData.length ; i++) {
            _this.countData[i].value=_this.map[_this.countData[i].text]
          }
        }).catch(function (error) {
          alert(error)
        })
      },//初始化数据
      initData() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        var da = [];
        var te = [];
        $.ajax({
          type: "post",
          url: "http://localhost:8080/shoppingsystem/queOrderByUid.action",
          cache: false,
          async: false,
          dataType: "json",
          success: function (data) {
            for (var i = 0; i < data.length; i++) {
              da[i] = data[i].user_name;
              te[i] = data[i].pass;
            }
          }
        })
        myChart.setOption({
          title: {
            text: '荣布斯榜(单位：元)'
          },
          tooltip: {},
          xAxis: {
            data: da
          },
          yAxis: {},
          series: [{
            name: '交易金额',
            type: 'bar',
            data: te
          }]
        });
      }
    },
    //一进组件就会去请求后端接口 获取首页数据
    created() {
      this.getDate();
      this.JSONEmp = JSON.parse(sessionStorage.getItem('emp'))
    },mounted(){
      this.initData();
    },

  }

</script>

<style>
  .home .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .home .el-avatar {
    margin-right: 40px;
  }
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #999999;
  }

  .login-info p {
    line-height: 26px;
    font-size: 14px;
    color: #999999;
  }
  .login-info span {
    color: #666666;
    font-size: 14px;
    margin-left: 50px;
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .num .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .num .icon {
    font-size: 30px;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .detail .num {
    font-size: 30px;
    margin-bottom: 10px;
  }
  .detail .txt {
    font-size: 14px;
    text-align: center;
    color: #999999;
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .graph .el-card {
    width: 48%;
  }
</style>
