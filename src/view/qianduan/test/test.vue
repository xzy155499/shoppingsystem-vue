<template>
    <div>
      <el-button @click="showBDMapFormVisible=true">添加收货地址</el-button>
      <el-dialog title="地图一览页面" :visible.sync="showBDMapFormVisible">
        <!--将编辑页面子组件加入到列表页面 -->
        <baidu-map class="map" :center="center" :zoom="13"
                   style="height: 540px;width: 100%">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
          <div v-for="da in data" >
            <bm-marker :position="da.position" :dragging="false" @click="infoWindowOpen(da.id)">
              <bm-info-window :show="da.show" @close="infoWindowClose(da.id)" @open="infoWindowOpen(da.id)">
                <el-card class="box-card">
                  <div style="color: #303133;font-size: 14px;width: 7px;display:inline-block">{{da.storesName}}</div>
                  <div style="width: 80%;display:inline-block;float: right" >
                    <img :src="da.img" style="width: 50%;height: 50%;">
                  </div>
                  <br><br><br>
                  <span style="color: #909399;font-size: 10px">商家姓名:{{da.name}}</span>
                  <br>
                  <span style="color: #909399;font-size: 10px">商家电话:{{da.phone}}</span>
                  <br>
                  <span style="color: #909399;font-size: 10px">详细地址:{{da.detailedAddress}}</span>
                  <br>
                  <el-button  style="width:100%; margin:auto" @click="addUserMerchants(da.id)">添加收货地址</el-button>
                </el-card>
              </bm-info-window>
            </bm-marker>
          </div>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>

        <div slot="footer" class="dialog-footer">
          <el-button @click="showBDMapFormVisible=false">隐藏</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
          return{
            showBDMapFormVisible:false,
            center:{
              lng: 116.424,
              lat: 39.915
            },
            data:[],
          }
        },methods:{
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("rows",99999999);
          this.$axios.post("queryAllMerchants.action",params).then(function (result) {
            _this.data=[];
            var data =result.data.rows;
            for (let i = 0; i < data.length; i++) {
              var index = data[i].mCoordinates.indexOf(',');
              var lng =data[i].mCoordinates.substr(0,index);
              var lat =data[i].mCoordinates.substr(index+1);
              _this.data.push({position:{lng:lng,lat:lat},show:false,id:data[i].mId,name:data[i].mName,
                detailedAddress:data[i].mDetailedAddress,storesName:data[i].mStoresName,img:data[i].mImg,
                phone:data[i].mPhone})
            }
          }).catch(function (error) {
            alert(error)
          })
        },infoWindowClose(index) {
        for (let i = 0; i < this.data.length; i++) {
          if (index==this.data[i].id){
            index=i
          }
        }
        var pdrr = this.data[index];
        pdrr.show = false;
        this.data.splice(index, 1, pdrr)
      },
      infoWindowOpen(index) {
        for (let i = 0; i < this.data.length; i++) {
          if (index==this.data[i].id){
            index=i
          }
        }
        var pdrr = this.data[index];
        pdrr.show = true;
        this.data.splice(index, 1, pdrr)
      },
        addUserMerchants(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("mId",id);
          params.append("uId","1");
          this.$axios.post("addUserMerchants.action",params).then(function (result) {
            _this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }).catch(function (error) {
            alert(error)
          })
        }
      },created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
