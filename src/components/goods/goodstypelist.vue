<template>
  <div id="goodsParentType">
    <el-row :gutter="20">
      <el-col :span="3">
      <el-button @click="show">添加类型</el-button>
      </el-col>
      <el-col :span="6" :offset="6" >
      <el-input style="width: 250px;" clearable @input="getData"  v-model="search" placeholder="输入关键字搜索">
        <el-button  slot="addgoods">添加</el-button>
      </el-input>
      </el-col>
    </el-row>
    <br/>
    <el-table :data="tableData"
              border>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="pName" label="类型名称">
      </el-table-column>
      <el-table-column prop="pDescribe" label="类型描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="warning" icon="el-icon-edit" @click="updshow(scope.row)"  plain circle></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.pId)" plain circle ></el-button>
       <el-button  icon="el-icon-search" @click="que(scope.row.pId)" circle plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加类型页面" :visible.sync="adddialogFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <el-input placeholder="请输入内容" v-model="name">
        <template slot="prepend">请输入类型名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="describe">
        <template slot="prepend">请输入类型描述:</template>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改类型页面" :visible.sync="upddialogFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <el-input placeholder="请输入内容" v-model="name">
        <template slot="prepend">请输入类型名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="describe">
        <template slot="prepend">请输入类型描述:</template>
      </el-input>
      <div slot="footer" class="dialog-footer">

        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="类型详情页面" :visible.sync="quedialogFormVisible" >
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button @click="queadddialogFormVisible = true">添加类型</el-button>
        </el-col>
        <el-col :span="6" :offset="6" >
          <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
            <el-button  slot="addgoods">添加</el-button>
          </el-input>
        </el-col>
      </el-row>
      <br/><br/>
      <!--   -->
      <el-table :data="childtableData"
                border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="cName" label="类型名称">
        </el-table-column>
        <el-table-column prop="cDescribe" label="类型描述">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" icon="el-icon-edit" @click="queupd(scope.row)"  plain circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="quedel(scope.row.cId)" plain circle ></el-button>
         </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quedialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商品详情添加页面" :visible.sync="queadddialogFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <el-input placeholder="请输入内容" v-model="quename">
        <template slot="prepend">请输入类型名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="quedescribe">
        <template slot="prepend">请输入类型描述:</template>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="queadddialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="queadd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="商品详情修改页面" :visible.sync="queupddialogFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <el-input placeholder="请输入内容" v-model="quename">
        <template slot="prepend">请输入类型名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="quedescribe">
        <template slot="prepend">请输入类型描述:</template>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quehide">取 消</el-button>
        <el-button type="primary" @click="queupd1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "goodsParentType",
    data(){
      return{
        search: '',
        //用户数据 数组对象
        tableData: [],
        childtableData:[],
        adddialogFormVisible: false,
        upddialogFormVisible:false,
        quedialogFormVisible:false,
        queadddialogFormVisible:false,
        queupddialogFormVisible:false,
        name:"",
        describe:"",
        quename:"",
        quedescribe:"",
        pid:0,
        cid:0
      }
    },
    methods: {
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("pName",this.search);
        this.$axios.post("queryAllGoodsParentType.action",params).then(function (result) {
          _this.tableData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      show(){
        this.adddialogFormVisible=true;
      },add(){
        var _this =this;
        var params = new URLSearchParams();
        params.append("pName",this.name);
        params.append("pDescribe",this.describe);
        this.$axios.post("addGoodsParentType.action",params).then(function (result) {
          if (result.data!=0){
            _this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else{
            _this.$message.error('添加失败');
          }
          _this.adddialogFormVisible=false;
          _this.getData();
        }).catch(function (error) {
          alert(error)
        })
      },del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("delGoodsParentType.action",params).then(function (result) {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
            _this.getData();
          }).catch(function (error) {
            alert(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },hide:function(){
        this.name="";
        this.describe="";
        this.adddialogFormVisible=false;
        this.upddialogFormVisible =false;
      },upd(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("pId",this.pid);
        params.append("pName",this.name);
        params.append("pDescribe",this.describe);
        this.$axios.post("updGoodsParentType.action",params).then(function (result) {
          if (result.data!=0){
            _this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
          _this.$message.error('修改失败');
        }
          _this.getData();
          _this.hide();
        }).catch(function (error) {
          alert(error)
        })
      },updshow(row){
        this.upddialogFormVisible=true;
        this.name =row.pName;
        this.describe=row.pDescribe;
        this.pid=row.pId;
      },que(id){
        this.pid=id;
        var _this = this;
        var params = new URLSearchParams();
        params.append("id",id);
        this.$axios.post("queryAllGoodsChildType.action",params).then(function (result) {
          _this.childtableData=result.data;
          _this.quedialogFormVisible=true;
        }).catch(function (error) {
          alert(error)
        })
      },queadd(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("pId",this.pid);
        params.append("cName",this.quename);
        params.append("cDescribe",this.quedescribe);
        this.$axios.post("addGoodsChildType.action",params).then(function (result) {
          if (result.data!=0){
            _this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }else{
            _this.$message.error('添加失败');
          }
          _this.queadddialogFormVisible=false;
          _this.que(_this.pid);
        }).catch(function (error) {
          alert(error)
        })
      },quedel(id){
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("delGoodsChildType.action",params).then(function (result) {
            if (result.data!=0){
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              _this.$message.error('删除失败');
            }
            _this.que(_this.pid);
          }).catch(function (error) {
            alert(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },queupd(row){
        this.quename= row.cName;
        this.quedescribe=row.cDescribe;
        this.cid=row.cId;
        this.queupddialogFormVisible=true;
      },
      quehide(){
        this.quename="";
        this.quedescribe="";
        this.queupddialogFormVisible=false;
        this.queadddialogFormVisible=false
      },queupd1(){
        var _this = this;
        var params = new URLSearchParams();

        params.append("cId",this.cid);
        params.append("pId",0);
        params.append("cName",this.quename);
        params.append("cDescribe",this.quedescribe);
        this.$axios.post("updGoodsChildType.action",params).then(function (result) {
          if (result.data!=0){
            _this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            _this.$message.error('修改失败');
          }
          _this.que(_this.pid);
          _this.quehide();
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style>
</style>
