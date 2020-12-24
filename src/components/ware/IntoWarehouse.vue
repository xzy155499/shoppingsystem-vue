<template>
<div>
  <el-row :gutter="20">
    <el-col :span="6" :offset="9" >
      <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
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
        <el-button size="mini" plain circle round @click="showWarehouse(scope.row)">同意出库</el-button>
        <el-button size="mini" plain circle round @click="showWarehouse(scope.row)">拒绝出库</el-button>
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

  <el-dialog title="选择仓库页面" :visible.sync="showdialogFormVisible">
    <!--仓库页面 -->
    <el-row :gutter="24">
      <el-col :span="12" >
        <el-table :data="warehouseData.rows"
                  border @select="selectWarehouse" ref="multipleTable"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="selectable" width="55">
          </el-table-column>
          <el-table-column prop="wName" label="仓库名称">
          </el-table-column>
          <el-table-column prop="detailedAddress" label="仓库地址">
          </el-table-column>
          <el-table-column prop="wNote" label="仓库备注">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tableData.total"
          :page-size="5"
          @current-change="currentPage">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        <el-table :data="goodsData"
                  border>
          <el-table-column prop="goods.gImg" label="商品图片">
            <template slot-scope="scope">
              <el-image :src="getImg(scope)" style="height: 60px;width: 60px"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="goods.gName" label="商品名称">
          </el-table-column>
          <el-table-column prop="num" label="商品数量">
          </el-table-column>
          <el-table-column prop="sum" label="商品总价">
          </el-table-column>
          <el-table-column prop="sum" label="出货数量">
            <template slot-scope="scope">
              <label style="color: red" v-if="scope.row.goods.gNum<scope.row.num">{{scope.row.goods.gNum}}</label>
              <label style="color: green" v-if="scope.row.goods.gNum>=scope.row.num">{{scope.row.num}}</label>
            </template>

          </el-table-column>
        </el-table>
      </el-col>
    </el-row>



    <div slot="footer" class="dialog-footer">
      <el-button @click="showdialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="intoWarehouse" v-if="bo">确 定</el-button>
    </div>
  </el-dialog>


</div>
</template>

<script>
    export default {
        name: "IntoWarehouse"
      ,data(){
          return{
            tableData:[],
            index:1,
            search:"",
            newsearch:"",
            oid:0,
            showdialogFormVisible:false,
            warehouseData:[],
            goodsData:[],
            bo:false,
            ids:"",
          }
      },methods:{
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("page",this.index);
          params.append("remake",this.newScale);
          this.$axios.post("queryAllOrderInfo.action", params).then(function (result) {
            _this.tableData = result.data;
          }).catch(function (error) {
            alert(error)
          })
          var params1 = new URLSearchParams();
          params1.append("wName",this.search);
          params1.append("page",this.index);
          this.$axios.post("queryAllWarehouse.action",params1).then(function (result) {
            _this.warehouseData = result.data;
          }).catch(function (error) {
            alert(error)
          })
        },que(){
          this.index=1;
          this.newScale=this.search;
          this.getData()
        },showWarehouse(row){
          this.oid=row.orderId;
          this.goodsData=row.list;
          for (let i = 0; i <this.goodsData.length ; i++) {
            this.goodsData[i].goods.gNum=0;
          }
          this.showdialogFormVisible=true;

        },currentPage(index) {
          this.index = index;
          this.getData();
        },getImg(scope){
          var img = scope.row.goods.gImg;
          var index = img.indexOf(',');
          var imgurl ="";
          if (index==-1){
            return img
          }
          imgurl = img.substr(0,img.indexOf(','))
          return imgurl
        },selectWarehouse(selection, row){
          return false
        },selectable(row,index){
          //console.log(row)
          return true;

        },handleSelectionChange(val) {
          console.log(val)
          this.bo=true;
          for (let i = 0; i <this.goodsData.length ; i++) {
            this.goodsData[i].goods.gNum=0;
          }
          this.ids="";
          for (let i = 0; i <val.length ; i++) {
            this.ids+=val[i].wId+",";
          }

          for (let k = 0; k <this.goodsData.length ; k++) {
            var sum=0;
            for (let i = 0; i <val.length ; i++) {
              for (let j = 0; j <val[i].list.length ; j++) {
                if (val[i].list[j].gId==this.goodsData[k].goods.gId){
                  this.goodsData[k].goods.gNum+=val[i].list[j].wgNum;
                  sum+=val[i].list[j].wgNum;
                }
              }
            }
            if (sum<this.goodsData[k].num){
              this.bo=false;
            }
          }
        },
        intoWarehouse(){
          if(!this.bo){
            this.$message.error('库存不足');
          }else{
            var _this = this;
            var params = new URLSearchParams();
            params.append(  "id",this.oid);
            params.append("ids",this.ids);
            this.$axios.post("intoWarehouse.action",params).then(function (result) {
              _this.$message({
                type: 'success',
                message: '出库成功!'
              });
              _this.getData();
              _this.showdialogFormVisible=false;
            }).catch(function (error) {
              alert(error)
            })
          }
        }
      },created() {
        this.getData();
      }
    }
</script>

<style scoped>

</style>
