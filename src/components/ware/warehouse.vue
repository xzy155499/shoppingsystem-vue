<template>
  <div id="warehouse">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-button @click="show">添加仓库</el-button>
        <el-button @click="show">地图一览</el-button>
      </el-col>
      <el-col :span="6" :offset="6" >
        <el-input style="width: 250px;" clearable   v-model="search" placeholder="输入关键字搜索">

        </el-input><el-button @click="que1">查询</el-button>
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
          <el-button type="warning" icon="el-icon-edit" @click="updshow(scope.row)"  plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.wId)" plain circle ></el-button>
          <el-button  icon="el-icon-search" @click="que(scope.row.wId)" circle plain></el-button>
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

    <el-dialog title="添加仓库页面" :visible.sync="adddialogFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <el-input placeholder="请输入内容" v-model="name">
        <template slot="prepend">请输入仓库名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="note">
        <template slot="prepend">请输入仓库描述:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="detailed">
        <template slot="prepend">请输入仓库详细地址:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="showCenter" :disabled="true">
        <template slot="prepend">请选择仓库坐标:</template>
        <el-button slot="append" icon="el-icon-search" @click="addBDMapFormVisible=true"></el-button>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>




    <el-dialog title="添加仓库坐标选择页面" :visible.sync="addBDMapFormVisible">
      <!--将编辑页面子组件加入到列表页面 -->
      <BDMap ref="addMap">
<!--        <el-button slot="button-slot" @click="test">测试</el-button>-->
        <div slot="marker-slot"></div>
      </BDMap>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideaddBDMapFormVisible">取 消</el-button>
        <el-button type="primary" @click="addBDM">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="地图一览页面" :visible.sync="addBDMapFormVisible">
    <!--将编辑页面子组件加入到列表页面 -->
    <BDMap ref="showMap">
      <div slot="marker-slot-label"></div>
      <div slot="center-slot"></div>
    </BDMap>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideaddBDMapFormVisible">隐藏</el-button>
    </div>
    </el-dialog>

    <el-dialog title="修改仓库页面" :visible.sync="upddialogFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <el-input placeholder="请输入内容" v-model="name">
        <template slot="prepend">请输入仓库名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="note">
        <template slot="prepend">请输入仓库描述:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="detailed">
        <template slot="prepend">请输入仓库详细地址:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="showCenter" :disabled="true">
        <template slot="prepend">请选择仓库坐标:</template>
        <el-button slot="append" icon="el-icon-search" @click="updBDMapFormVisibleShow"></el-button>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改仓库坐标选择页面" :visible.sync="updBDMapFormVisible" >
      <!--将编辑页面子组件加入到列表页面 -->
      <BDMap ref="updMap">
        <div slot="marker-slot"></div>
      </BDMap>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updBDMapFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updBDM">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="仓库详情页面" :visible.sync="quedialogFormVisible" >
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button @click="queadddialogFormVisible = true">添加仓库</el-button>
        </el-col>
        <el-col :span="6" :offset="6">
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
        <el-table-column prop="cName" label="仓库名称">
        </el-table-column>
        <el-table-column prop="cDescribe" label="仓库描述">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quedialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import BDMap from "../../components/test.vue"
  export default {
    name: "warehouse",
    data(){
      return{
        search: '',
        //用户数据 数组对象
        tableData: [],
        childtableData:[],
        adddialogFormVisible: false,
        upddialogFormVisible:false,
        quedialogFormVisible:false,
        addBDMapFormVisible:false,
        updBDMapFormVisible:false,
        name:"",
        describe:"",
        quename:"",
        quedescribe:"",
        wid:0,
        wgid:0,
        position: {lng: 116.404, lat: 39.915},
        province:"",
        city:"",
        county:"",
        showCenter:"",
        note:"",
        detailed:"",
        index:1
      }
    },
    methods: {
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("wName",this.search);
        params.append("page",this.index);
        this.$axios.post("queryAllWarehouse.action",params).then(function (result) {
          _this.tableData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      show(){
        this.adddialogFormVisible=true;
      },add(){
        if (this.province=="" || this.name=="" || this.note=="" || this.describe){
          this.$message.error('请完善信息');
          return
        }
        var _this =this;
        var params = new URLSearchParams();
        params.append("wName",this.name);
        params.append("wCoordinates",this.showCenter);
        params.append("wNote",this.note);
        params.append("wProvince",this.province);
        params.append("wCity",this.city);
        params.append("wCounty",this.county);
        params.append("wDetailed",this.detailed);
        this.$axios.post("addWarehouse.action",params).then(function (result) {
          if (result.data!=0){
            _this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else{
            _this.$message.error('添加失败');
          }
          _this.addBDM();
          _this.adddialogFormVisible=false;
          _this.getData();
        }).catch(function (error) {
          alert(error)
        })
      },del(id){
        this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("delWarehouse.action",params).then(function (result) {
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
        var cs = this.$refs.updMap.cs;
        this.province=cs.province;
        this.city=cs.city;
        this.county=cs.district;
        params.append("wName",this.name);
        params.append("wCoordinates",this.showCenter);
        params.append("wNote",this.note);
        params.append("wProvince",this.province);
        params.append("wCity",this.city);
        params.append("wCounty",this.county);
        params.append("wDetailed",this.detailed);
        params.append("wId",this.wid);


        this.$axios.post("updWarehouse.action",params).then(function (result) {
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
        this.name =row.wName;
        this.note=row.wNote;
        this.detailed=row.wDetailed;
        this.showCenter=row.wCoordinates;
        this.wid =row.wId;
      },que(id){
        this.wid=id;
        var _this = this;
        var params = new URLSearchParams();
        params.append("id",id);
        this.$axios.post("queryAllWarehouseGoods.action",params).then(function (result) {
          _this.childtableData=result.data;
          _this.quedialogFormVisible=true;
        }).catch(function (error) {
          alert(error)
        })
      },
      quehide(){
        this.quename="";
        this.quedescribe="";
        this.queupddialogFormVisible=false;
        this.queadddialogFormVisible=false
      },addBDM(){
        var _this = this;
        var center =this.$refs.addMap.center;
        var lng = center.lng;
        var lat = center.lat;
        this.showCenter=center.lng+","+center.lat
        var url = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=tS9gxkjNh10upXP1PUoLMWDnCu4GKK5x&output=json&coordtype=wgs84ll&location=' + lat + ',' + lng
        $.ajax({
          'url': url,
          'dataType': 'jsonp',
          'success': function (data) {
            _this.province=data.result.addressComponent.province
            _this.city=data.result.addressComponent.city
            _this.county=data.result.addressComponent.district
            _this.addBDMapFormVisible =false;
          }
        })
      },hideaddBDMapFormVisible(){
        this.addBDMapFormVisible=false;
        this.province="";
        this.city="";
        this.county="";
        this.showCenter="";
      },currentPage(index){
        this.index=index;
        this.getData();
      },que1(){
        this.index=1;
        this.getData();
      },updBDMapFormVisibleShow(){
        this.updBDMapFormVisible=true;
        var _this = this;
        var center={}
        //延时加载
        this.$nextTick(()=> {
          var num =_this.showCenter.indexOf(",");
          var lng = _this.showCenter.substr(0,num);
          var lat = _this.showCenter.substr(num+1);
          center = {"lng":lng,"lat":lat}
          //console.log(_this.$refs.updMap.center)
        })
        setTimeout(function () {
           _this.$refs.updMap.center=center;
           _this.$refs.updMap.center1=center;
        },500)
      },updBDM(){
        var center = this.$refs.updMap.center;
        this.showCenter = center.lng+","+center.lat
        this.updBDMapFormVisible=false;
        this.$refs.updMap.getpdrr();
      },
      test(){


      }
    },beforeMount:function (){
      this.getData();
    },components:{
      BDMap:BDMap
  }
  }
</script>

<style>
</style>
