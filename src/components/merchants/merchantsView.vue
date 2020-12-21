<template>
  <div>
  <el-input placeholder="请输入内容" v-model="json.mName">
    <template slot="prepend">商家姓名:</template>
    </el-input><br><br>
  <el-input placeholder="请输入内容" v-model="json.mUsername" :disabled="true" >
    <template slot="prepend">用户名:</template>
    </el-input><br><br>
    <el-input placeholder="请输入内容" v-model="json.mStoresName">
      <template slot="prepend">商店名称:</template>
    </el-input><br><br>
  <el-input placeholder="请输入内容" v-model="json.mPwd">
    <template slot="prepend">密码:</template>
    </el-input><br><br>
  <el-input placeholder="请输入内容" v-model="json.mPhone">
  <template slot="prepend">联系电话:</template>
  </el-input><br><br>
  <el-input placeholder="请输入内容" v-model="json.mNote">
    <template slot="prepend">备注:</template>
    </el-input><br><br>
    <el-input placeholder="请输入内容" v-model="json.mDetailedAddress">
      <template slot="prepend">详细地址:</template>
    </el-input><br><br>
    <el-input placeholder="请输入内容" v-model="json.mCoordinates" :disabled="true">
      <template slot="prepend">门店坐标:</template>
      <el-button slot="append" icon="el-icon-search" @click="dialogFormVisible=true"></el-button>
    </el-input>
    <br><br>
    <el-select v-model="json.mSex" filterable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="upd">修改</el-button>
    <el-dialog title="地图页面" :visible.sync="dialogFormVisible">
    <baidu-map class="map" :center="center1" :zoom="15"
               style="height: 540px;width: 100%">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <div>
          <bm-marker :position="center" :dragging="true" @dragging="getPosition">
            <bm-label :content="pdrr" :labelStyle="{color: 'red', fontSize : '10px'}"
                      :offset="{width: -25, height: 30}"></bm-label>
          </bm-marker>
        </div>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="map">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "merchantsView",
      data(){
          return{
            json:{},
            center: {
              lng: 116.424,
              lat: 39.915
            },
            center1: {
              lng: 116.424,
              lat: 39.915
            },
            pdrr: "请选择坐标",
            dialogFormVisible:false,
            value:'',
            options:[{
              value: '男',
              label: '男'
            }, {
              value: '女',
              label: '女'
            }]
          }
      },methods:{
        map(){
          var _this = this;
          this.json.mCoordinates=this.center.lng+","+this.center.lat;
          var lng = this.center.lng;
          var lat = this.center.lat;
          var url = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=tS9gxkjNh10upXP1PUoLMWDnCu4GKK5x&output=json&coordtype=wgs84ll&location=' + lat + ',' + lng
          $.ajax({
            'url': url,
            'dataType': 'jsonp',
            'success': function (data) {
              var cs=data.result.addressComponent
              _this.json.mProvince=cs.province;
              _this.json.mCity=cs.city;
              _this.json.mCounty=cs.district;
              _this.dialogFormVisible=false;
            }
          })

        }, getPosition(e) {
          this.center = {
            lng: `${e.point.lng}`,
            lat: `${e.point.lat}`
          }
        },upd(){
          this.$confirm('您确定要修改吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            var _this = this;
            var params = new URLSearchParams();
            Object.keys(_this.json).forEach((item) => {
              params.append(item,_this.json[item]);
            })
            _this.$axios.post("updMerchants.action",params).then(function (result) {
              _this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }).catch(function (error) {
              alert(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            });
          });
        }
      },
      created() {
        this.json=JSON.parse(sessionStorage.getItem("user"));
      }
    }
</script>

<style scoped>

</style>
