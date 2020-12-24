<template>
  <div>
    <div class="pie">
      <div id="pie1">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="main1" style="float:left;width:100%;height: 300px"></div>
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
      // 绘制图表
      var json =[];
      var da=[];
      var te={};
      $.ajax({
        type: "post",
        url: "http://localhost:8080/shoppingsystem/queMerchantsStatistical.action",
        cache: false,
        async: false,
        dataType: "json",
        success: function (data) {
          for (var i = 0; i < data.length; i++) {
            var a = {name: data[i].mProvince, value: data[i].mId};
            json.push(a);
            da[i] = data[i].mProvince;
            if (i < 5) {
              te[data[i].mProvince] = true;
            } else {
              te[data[i].mProvince] = false;
            }
          }
        }
      })

      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: da
        },
        series: [
          {
            name: '门店位置',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: json
          }
        ]
      });
    },
  }
}
</script>
