<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="9" >
          <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
          </el-input><el-button @click="que">查询</el-button>
        </el-col>
      </el-row>
      <br/><br/>
      <el-row :gutter="24">
        <el-col :span="12" >
      <el-table :data="tableData.rows"
                border>
        <el-table-column prop="gImg" label="商品图片">
          <template slot-scope="scope">
            <el-image :src="getImg(scope)" style="height: 60px;width: 60px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="gName" label="商品名称">
        </el-table-column>
        <el-table-column prop="gPriceInto" label="商品进货价">
        </el-table-column>
        <el-table-column prop="gPriceOut" label="商品出售价">
        </el-table-column>
        <el-table-column prop="gDescribe" label="商品描述">
        </el-table-column>
        <el-table-column prop="gNum" label="商品销量">
        </el-table-column>
        <el-table-column prop="warehouseNum" label="商品总库存">
        </el-table-column>
        <el-table-column label="采购">
          <template slot-scope="scope">
            <el-button size="mini" plain circle round @click="updateGoods(scope.row.gId)">+</el-button>
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
        </el-col>
        <el-col :span="12">
          <el-table :data="tableData1"
                    border>
            <el-table-column prop="gImg" label="商品图片">
              <template slot-scope="scope">
                <el-image :src="getImg(scope)" style="height: 60px;width: 60px"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="gName" label="商品名称">
            </el-table-column>
            <el-table-column prop="gPriceInto" label="商品进货价">
            </el-table-column>
            <el-table-column prop="gPriceOut" label="商品出售价">
            </el-table-column>
            <el-table-column prop="gDescribe" label="商品描述">
            </el-table-column>
            <el-table-column prop="warehouseNum" label="商品总库存">
            </el-table-column>
            <el-table-column prop="" label="采购数量" width="180">
              <template slot-scope="scope">
              <el-input-number size="mini" :min="1" v-model="scope.row.gNum" @change="((val)=>{changeNum(val, scope.row.gId)})"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="采购">
              <template slot-scope="scope">
                <el-button size="mini" plain circle round @click="delGoods(scope.row.gId)">-</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-if="tableData1.length!=0" @click="showdialogFormVisible=true">采购</el-button>
        </el-col>
      </el-row>

      <el-dialog title="修改商品页面" :visible.sync="showdialogFormVisible">
        <el-table :data="warehousetableData.rows"
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
             <el-button  circle plain @click="addWarehouseGoods(scope.row.wId,scope.row.wName)">选择仓库</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "storageWarehouse",
      data() {
        return {
          search: '',
          newSearch:'',
          index:1,
          tableData: [],
          tableData1: [],
          ids:[],
          warehousetableData:[],
          showdialogFormVisible:false
        }
      }, methods: {
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          var ids ="";
          for (let i = 0; i <this.ids.length ; i++) {
            ids+=this.ids[i].id+","
          }
          ids=ids.substr(0,ids.length-1)
          params.append("gName", this.newSearch);
          params.append("page", this.index);
          params.append("gImg", ids);
          this.$axios.post("queryAllGoods1.action", params).then(function (result) {
            _this.tableData = result.data;
          }).catch(function (error) {
            alert(error)
          })
          this.$axios.post("queryAllGoods2.action", params).then(function (result) {
            for (let i = 0; i < result.data.length; i++) {
              for (let j = 0; j < _this.ids.length; j++) {
                if (result.data[i].gId==_this.ids[j].id){
                  result.data[i].gNum=_this.ids[j].num;
                  break;
                }
              }
            }
            _this.tableData1 = result.data;
          }).catch(function (error) {
            alert(error)
          })
        },
        getwarehousetableData(){
          var _this = this;
          this.$axios.post("queryAllWarehouse.action").then(function (result) {
            _this.warehousetableData = result.data;
          }).catch(function (error) {
            alert(error)
          })
        },
        currentPage(index) {
          this.index = index;
          this.getData();
        }, que() {
          this.newSearch = this.search;
          this.index = 1;
          this.getData();
        }, getImg(scope) {
          var img = scope.row.gImg;
          var index = img.indexOf(',');
          var imgurl = "";
          if (index == -1) {
            return img
          }
          imgurl = img.substr(0, img.indexOf(','))
          return imgurl
        },updateGoods(id){
          this.ids.push({id:id,num:1});
          this.getData();
        },delGoods(id){
          for (let i = 0; i <this.ids.length ; i++) {
            if (this.ids[i].id==id){
              this.ids.splice(i,1);
              break;
            }
          }
          this.getData();
        },changeNum(val, id){
          for (let i = 0; i <this.ids.length ; i++) {
            if (this.ids[i].id==id){
              this.ids[i].num=val;
              break;
            }
          }
        },addWarehouseGoods(id,name){
            this.$confirm('是否添加到'+name+'仓库, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var _this = this;
              var ids ="";
              var nums="";
              for (let i = 0; i <this.ids.length ; i++) {
                ids+=this.ids[i].id+",";
                nums+=this.ids[i].num+","
              }
              var params = new URLSearchParams();
              params.append("wid",id);
              params.append("ids",ids);
              params.append("nums",nums);
              this.$axios.post("addWarehouseGoods.action",params).then(function (result) {
                _this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                _this.ids=[];
                _this.getData();
                _this.showdialogFormVisible=false;
              }).catch(function (error) {
                alert(error)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消添加'
              });
            });
        }
      },created() {
        this.getData();
        this.getwarehousetableData();
      }
    }
</script>

<style scoped>

</style>
