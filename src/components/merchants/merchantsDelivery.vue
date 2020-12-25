<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="9" >
        <el-input style="width: 250px;" clearable v-model="search" placeholder="输入用户姓名">
        </el-input><el-button @click="que">查询</el-button>
      </el-col>
    </el-row>
    <br/><br/>
    <el-table :data="tableData.rows"
              border>

      <el-table-column prop="userInfo.user_name" label="用户姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.userInfo.user_name }}</p>
            <p>联系电话: {{ scope.row.userInfo.phone }}</p>
            <p>用户性别: {{ scope.row.userInfo.user_sex }}</p>
            <div slot="reference" class="name-wrapper">
              <el-link type="primary" :underline="false">{{ scope.row.userInfo.user_name }}</el-link>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="userInfo.merchants" label="商家店名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>商家姓名: {{ scope.row.merchants.mName }}</p>
            <p>联系电话: {{ scope.row.merchants.mPhone }}</p>
            <p>详细地址: {{ scope.row.merchants.mDetailedAddress }}</p>
            <p>备注: {{ scope.row.merchants.mNote }}</p>
            <div slot="reference" class="name-wrapper">
              <el-link type="primary" :underline="false">{{ scope.row.merchants.mName }}</el-link>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="list" label="商品数量">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" >
            <div v-for="data in scope.row.list">
              <p>商品名称: {{ data.goods.gName }} 商品价格: {{ data.goods.gPriceOut }} 商品数量: {{ data.num }} 商品总价: {{ data.sum }}  </p>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-link type="primary" :underline="false">{{ scope.row.list.length }}</el-link>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间">
      </el-table-column>
      <el-table-column prop="sum" label="总价">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain circle round @click="delivery(scope.row)">签收</el-button>
          <el-button size="mini" plain circle round @click="delivery(scope.row)">拒绝签收</el-button>
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
    name: "MerchantsOrder"
    ,data() {
      return {
        tableData: [],
        index: 1,
        search: "",
        newsearch: "",
        ids: "",
        json:{},
      }
    },
    methods:{
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page",this.index);
        params.append("mStoresName",'');
        params.append("orderState",'已发货');
        params.append("merchantId",this.json.mId);
        params.append("uName",this.newsearch);
        this.$axios.post("queMerchantsOrder.action", params).then(function (result) {
          _this.tableData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },que(){
        this.index=1;
        this.newsearch=this.search;
        this.getData();
      },
      currentPage(index) {
        this.index = index;
        this.getData();
      },delivery(row){
        var id = row.orderId;
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderId",id);
        this.$axios.post("updDeliveryByOid.action", params).then(function (result) {
          _this.$message({
            type: 'success',
            message: '签收成功!'
          });
          _this.tableData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
    },created() {
      this.json=JSON.parse(sessionStorage.getItem("user"));
      this.getData()
    }
  }
</script>

<style scoped>

</style>
