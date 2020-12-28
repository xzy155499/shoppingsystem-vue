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
  data(){
    return {

    }
  },
  created(){
  },
  mounted(){
    this.initData();
  },
  methods:{
    changenum(currentValue, oldValue){
      this.te={};
      for (let i = 0; i <this.json ; i++) {
        this.te[this.json.gName]=i<currentValue;
      }
      alert(currentValue)
    },
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
        url: "http://localhost:8080/shoppingsystem/queryAllGoods.action?rows=999999",
        cache: false,
        async: false,
        dataType: "json",
        success: function (data) {
          var data = data.rows;
          for (let i = 0; i <data.length ; i++) {
            for (let j = 0; j <data.length ; j++) {
              if (data[i].gNum>data[j].gNum){
                var a = data[i];
                data[i]=data[j];
                data[j]=a;
              }
            }
          }
          for (var i = 0; i < data.length; i++) {
            var a={name :  data[i].gName  , value : data[i].gNum};
            json.push(a);
            da[i] =data[i].gName;
            if (i<5){
              te[data[i].gName] = true
            }else{
              te[data[i].gName] = false
            }
          }
        }
      })
      myChart.setOption({
        title: {
          text: '商品销量统计',
          //subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: da,
          selected: te
        },
        series: [
          {
            name: '商品销量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: json,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  }
}
</script>
