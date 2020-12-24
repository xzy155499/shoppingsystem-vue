<template>
  <div>
    <div class="pie">
      <div id="pie1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:100%;height: 300px"></div>
        <div id="main2" style="float:left;width:100%;height: 300px"></div>
      </div>

    </div>
  </div>
</template>

<script>// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  created(){
  },
  mounted(){
    this.initData();
  },
  methods:{
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));
      var json=JSON.parse(sessionStorage.getItem("user"));
      // 绘制图表
      var da=[];
      var te=[];

      $.ajax({
        type: "post",
        url: "http://localhost:8080/shoppingsystem/queMerchantsMonthByMid.action?mid="+json.mId,
        cache: false,
        async: false,
        dataType: "json",
        success: function (data) {
          for (var i = 0; i < data.length; i++) {
            da[i] = data[i].mName;
            te[i]=data[i].mId;
          }
          console.log(da)
          console.log(te)
        }
      })

      myChart.setOption({
        title: {
          text: '最近12月营销统计(单位：元)'
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
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main2'));
      // 绘制图表
      var da=[];
      var te=[];

      $.ajax({
        type: "post",
        url: "http://localhost:8080/shoppingsystem/queMerchantsYearByMid.action?mid="+json.mId,
        cache: false,
        async: false,
        dataType: "json",
        success: function (data) {
          for (var i = 0; i < data.length; i++) {
            da[i] = data[i].mName;
            te[i]=data[i].mId;
          }
          console.log(da)
          console.log(te)
        }
      })

      myChart.setOption({
        title: {
          text: '最近10年营销统计(单位：元)'
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
      })
    },
  }
}
</script>
