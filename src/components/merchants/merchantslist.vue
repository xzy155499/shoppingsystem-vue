<template>
  <div id="goodslist">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-button @click="mapdialogFormVisible=true">地图一览</el-button>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
        </el-input>
        <el-button @click="que">查询</el-button>
      </el-col>
    </el-row>
    <br/><br/>
    <el-table :data="tableData.rows"
              border>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="mImg" label="商家图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.mImg" style="height: 60px;width: 60px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="mName" label="商家姓名">
      </el-table-column>
      <el-table-column prop="mUsername" label="商家账号">
      </el-table-column>
      <el-table-column prop="mPwd" label="商家密码">
      </el-table-column>
      <el-table-column prop="mStoresName" label="商家门店名称">
      </el-table-column>
      <el-table-column prop="mNote" label="商家备注">
      </el-table-column>
      <el-table-column prop="mState" label="商家状态">
        <template slot-scope="scope">
          <div v-if="scope.row.mState=='禁用'" style="color: red">{{scope.row.mState}}</div>
          <div v-if="scope.row.mState!='禁用'">{{scope.row.mState}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="mPhone" label="商家电话">
      </el-table-column>
      <el-table-column prop="mTime" label="商家注册时间">
      </el-table-column>
      <el-table-column prop="mDetailed" label="商家地址">
      </el-table-column>
      <el-table-column prop="mDetailedAddress" label="商家详细地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" plain circle @click="del(scope.row.mId)"></el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.total"
      :page-size="5"
      @current-change="currentPage">
    </el-pagination>

    <el-dialog title="地图一览页面" :visible.sync="mapdialogFormVisible">
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

                </el-card>
              </bm-info-window>
            </bm-marker>
          </div>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      </baidu-map>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: "merchantslist.vue",
    data() {
      return {
        search: '',
        newSearch: '',
        //用户数据 数组对象
        tableData: [],
        mapdialogFormVisible: false,
        mid: 1,
        index:1,
        center: {
          lng: 116.414,
          lat: 39.905
        },
        data:[]
      }
    },
    methods: {
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("mName", this.newSearch);
        params.append("page", this.index);
        this.$axios.post("queryAllMerchants.action", params).then(function (result) {
          _this.tableData = result.data;
          var data =result.data.rows;
          _this.data=[];
          for (let i = 0; i < data.length; i++) {
            var index = data[i].mCoordinates.indexOf(',');
            var lng =data[i].mCoordinates.substr(0,index);
            var lat =data[i].mCoordinates.substr(index+1);
            _this.data.push({position:{lng:lng,lat:lat},show:false,id:data[i].mId,name:data[i].mName,
              detailedAddress:data[i].mDetailedAddress,storesName:data[i].mStoresName,img:data[i].mImg,
              phone:data[i].mPhone})
          }
          console.log(_this.data)
        }).catch(function (error) {
          alert(error)
        })
      }, currentPage(index) {
        this.index = index;
        this.getData();
      }, que() {
        this.newSearch = this.search;
        this.index = 1;
        this.getData();
      }, del(id) {
        this.$confirm('此操作将拉黑商家吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("delMerchants.action", params).then(function (result) {
            _this.$message({
              type: 'success',
              message: '拉黑成功!'
            });
            _this.getData();
          }).catch(function (error) {
            alert(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拉黑'
          });
        });
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
      }
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
