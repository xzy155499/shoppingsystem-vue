<template>
<div>
  <el-row :gutter="20">
    <el-col :span="6" :offset="9">
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
        <el-button type="danger" plain circle @click="AgreeMerchants(scope.row.mId)">同意入驻</el-button>
        <el-button type="danger" plain circle >拒绝入驻</el-button>
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

</div>
</template>

<script>
    export default {
        name: "AllowMerchantsEnter",
      data(){
          return{
            search: '',
            newSearch: '',
            index:1,
            tableData: [],
          }
      },methods:{
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("mName", this.newSearch);
          this.$axios.post("AllowMerchantsEnter.action", params).then(function (result) {
            _this.tableData = result.data;
          }).catch(function (error) {
            alert(error)
          })
        },
         currentPage(index) {
          this.index = index;
          this.getData();
        },que() {
          this.newSearch = this.search;
          this.index = 1;
          this.getData();
        },AgreeMerchants(id){
          var _this =this;
          this.$confirm('确定同意, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = new URLSearchParams();
            params.append("id",id);
            this.$axios.post("AgreeMerchants.action",params).then(function (result) {
              _this.$message({
                type: 'success',
                message: '入驻成功!'
              });
              _this.getData();
            }).catch(function (error) {
              alert(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消同意'
            });
          });
        },
      },created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
