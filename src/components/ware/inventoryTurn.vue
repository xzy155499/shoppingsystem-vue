<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3">
    </el-col>

    <el-col :span="6" :offset="6" >
      <el-input style="width: 250px;" clearable   v-model="search" placeholder="输入关键字搜索">

      </el-input><el-button @click="que">查询</el-button>
    </el-col>
  </el-row>
  <br/>
  <el-table :data="tableData.rows"
            border>
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="wName" label="仓库名称">
    </el-table-column>
    <el-table-column prop="wCoordinates" label="仓库经纬度">
    </el-table-column>
    <el-table-column prop="detailedAddress" label="仓库地址">
    </el-table-column>
    <el-table-column prop="wDetailed" label="仓库详细地址">
    </el-table-column>
    <el-table-column prop="wNote" label="仓库备注">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="warning"  @click="updshow(scope.row)"  plain circle>转库</el-button>
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

  <el-dialog title="选择转库商品页面" :visible.sync="showdialogFormVisible" width="70%">
    <!--仓库页面 -->
    <el-row :gutter="24">
      <el-col :span="12" >
        <el-table :data="childData">
          <el-table-column prop="wgNum" label="商品图片">
            <template slot-scope="scope">
              <el-image :src="getImg(scope)" style="height: 60px;width: 60px"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="goods.gName" label="商品名称">
          </el-table-column>
          <el-table-column prop="goods.gDescribe" label="商品描述">
          </el-table-column>
          <el-table-column prop="wgNum" label="商品库存">
          </el-table-column>
          <el-table-column label="转库">
            <template slot-scope="scope">
              <el-button size="mini" plain circle round @click="addGoods(scope.row.gId)">+</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="childData.length"
          :page-size="5"
          @current-change="currentPage">
        </el-pagination>
      </el-col>
      <el-col :span="12">
        <el-table :data="childData1"
                  border>
          <el-table-column prop="goods.gImg" label="商品图片">
            <template slot-scope="scope">
              <el-image :src="getImg(scope)" style="height: 60px;width: 60px"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="goods.gName" label="商品名称">
          </el-table-column>
          <el-table-column prop="goods.gDescribe" label="商品描述">
          </el-table-column>
          <el-table-column prop="wgNum" label="商品库存">
          </el-table-column>
          <el-table-column prop="" label="采购数量" width="180">
            <template slot-scope="scope">
              <el-input-number size="mini" :max="scope.row.wgNum" :min="1" v-model="scope.row.wId" ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showdialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="selectWarehouse" v-if="childData1.length!=0">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="选择仓库页面" :visible.sync="warehousedialogFormVisible" >

    <div slot="footer" class="dialog-footer">
      <label>选择转库仓库</label>  <el-select v-model="value" placeholder="请选择">

      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
      </el-option>

    </el-select>
      <el-button @click="warehousedialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="inventoryTurn" >确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
    export default {
        name: "inventoryTurn",
      data(){
          return{
            tableData: [],
            childData:[],
            childData1:[],
            search: '',
            newsearch:'',
            index:'',
            bo:false,
            showdialogFormVisible:false,
            warehousedialogFormVisible:false,
            options:[],
            value:"",
            wid:0,
          }
      },
      methods: {
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("wName",this.newsearch);
          params.append("page",this.index);
          this.$axios.post("queryAllWarehouse.action",params).then(function (result) {
            _this.tableData = result.data;


          }).catch(function (error) {
            alert(error)
          })
        },que(){
          this.index=1;
          this.newsearch=this.search;
          this.getData();
        },currentPage(index){
        this.index=index;
        this.getData();
      },updshow(row){
          this.childData1=[];
          this.wid=row.wId
         this.childData=row.list;
          for (let i = 0; i < this.childData.length; i++) {
            if (this.childData[i].wgNum==0){
              this.childData.splice(i,1);
              break;
            }
            this.childData[i].wId=0;
          }
         this.showdialogFormVisible=true;
        }, getImg(scope) {
          console.log()
          var img = scope.row.goods.gImg;
          var index = img.indexOf(',');
          var imgurl = "";
          if (index == -1) {
            return img
          }
          imgurl = img.substr(0, img.indexOf(','))
          return imgurl
        },addGoods(id){
          for (let i = 0; i <this.childData.length ; i++) {
            if (id==this.childData[i].gId){
              this.childData1.push(this.childData[i])
              this.childData.splice(i,1);
              break;
            }
          }
        },inventoryTurn(){
          if (this.value==""){
            this.$message({
              type: 'info',
              message: '请选择仓库'
            });
            return
          }
          var _this = this;
          var params = new URLSearchParams();
          params.append("wid",this.wid);
          params.append("newwid",this.value);
          var nums = "";
          var gids ="";
          for (let i = 0; i < this.childData1.length; i++) {
            nums+=_this.childData1[i].wId+",";
            gids+=_this.childData1[i].gId+",";
          }
          params.append("nums",nums);
          params.append("gids",gids);
          this.$axios.post("turnWarehouse.action",params).then(function (result) {
            _this.$message({
              type: 'success',
              message: '转库成功!'
            })
            _this.showdialogFormVisible=false;
            _this.warehousedialogFormVisible=false;
            }).catch(function (error) {
              alert(error)
            })
        },selectWarehouse(){
          var data = this.tableData.rows;
          var op =[];
          for (let i = 0; i < data.length; i++) {
            if (this.wid==data[i].wId){
              op.push({label:data[i].wName,value:data[i].wId,disabled: true})
            }else{
              op.push({label:data[i].wName,value:data[i].wId})
            }
          }
          this.options=op;
          this.warehousedialogFormVisible=true
        }
      },created() {
          this.getData();
      }
    }
</script>

<style scoped>

</style>
