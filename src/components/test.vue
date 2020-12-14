<template>
  <div>
    <slot name="button-slot"></slot>
    <baidu-map class="map" :center="center" :zoom="15"
               style="height: 600px;width: 1000px">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <slot name="marker-slot">
      <div v-for="da in data" >
        <bm-marker :position="da.position" :dragging="false" @click="infoWindowOpen(da.id)">
          <bm-info-window :show="da.show" @close="infoWindowClose(da.id)" @open="infoWindowOpen(da.id)">{{da.text}}
          </bm-info-window>
        </bm-marker>
      </div>
      </slot>
      <div>
        <bm-marker :position="center" :dragging="true" @dragging="getPosition">
          <bm-label :content="pdrr" :labelStyle="{color: 'red', fontSize : '10px'}"
                    :offset="{width: -25, height: 30}"></bm-label>
          <bm-context-menu>
            <bm-context-menu-item :callback="getPosition" text="获取坐标"></bm-context-menu-item>
          </bm-context-menu>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </bm-marker>
      </div>
    </baidu-map>
    <a>{{center.lng}}</a>
    <a>,{{center.lat}}</a>
<!--    <el-button @click="getpdrr">获取坐标</el-button>-->
  </div>
</template>
<!--<script src="src/jquery.min.js"></script>-->
<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  // import {getRecommend} from "../recommend"
  // import {ERR_OK} from "../config"
  export default {
    name: "test",
    components: {
      BaiduMap
    },
    data() {
      return {
        pdrr: "请选择坐标",
        show: [false, false],
        data: [{position: {lng: 116.404, lat: 39.915}, id: 0, text: "我爱北京天安门", show: false},
          {position: {lng: 116.414, lat: 39.915}, id: 1, text: "我爱北京天安门2", show: false},
          {position: {lng: 116.404, lat: 39.925}, id: 2, text: "我爱北京天安门3", show: false}]
        ,
        center: {
          lng: 116.424,
          lat: 39.915
        }
      }
    },
    methods: {
      infoWindowClose(index) {
        var pdrr = this.data[index];
        pdrr.show = false;
        this.data.splice(index, 1, pdrr)
      },
      infoWindowOpen(index) {
        var pdrr = this.data[index];
        pdrr.show = true;
        this.data.splice(index, 1, pdrr)
      },
      getPosition(e) {
        var _this = this;
        this.center = {
          lng: `${e.point.lng}`,
          lat: `${e.point.lat}`
        }
      }, getpdrr() {
        var _this = this;
        var lng = this.center.lng;
        var lat = this.center.lat;
        var url = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=tS9gxkjNh10upXP1PUoLMWDnCu4GKK5x&output=json&coordtype=wgs84ll&location=' + lat + ',' + lng
        $.ajax({
          'url': url,
          'dataType': 'jsonp',
          'success': function (data) {
            _this.pdrr=data.result.addressComponent.city
          }
        })
      },getCenter(){
        this.$emit("getCenter",this.center)
      }
    }
  }

</script>

<style>

</style>
