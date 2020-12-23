<template>
  <div id="goodslist">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-button @click="adddialogFormVisible=true">添加商品</el-button>
      </el-col>
      <el-col :span="6" :offset="6" >
        <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
        </el-input><el-button @click="que">查询</el-button>
      </el-col>
    </el-row>
    <br/><br/>

    <el-table :data="tableData.rows"
              border>
      <el-table-column type="selection" width="55">
      </el-table-column>
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
      <el-table-column prop="gTime" label="商品上架时间">
      </el-table-column>
      <el-table-column prop="type" label="商品类型">
      </el-table-column>
      <el-table-column prop="gNum" label="商品销量">
      </el-table-column>
      <el-table-column prop="gFinalSales" label="商品最后一次销售时间">
      </el-table-column>
      <el-table-column prop="gFinalPurchase" label="商品最后一次进货时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="warning" icon="el-icon-edit" plain circle @click=updShow(scope.row)></el-button>
        <el-button type="danger" icon="el-icon-delete" plain circle @click="del(scope.row.gId)"></el-button>
        <el-button type="danger"  plain circle @click="showUpdImg(scope.row)">修改图片</el-button>
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

    <el-dialog title="添加商品页面" :visible.sync="adddialogFormVisible">
      <!--将编辑页面子组件加入到列表页面 -->
      <el-form :model="addform">
      <el-input placeholder="请输入内容" v-model="name">
        <template slot="prepend">请输入商品名称:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="priceInto">
        <template slot="prepend">请输入商品进货价:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="priceOut">
        <template slot="prepend">请输入商品卖出价:</template>
      </el-input>
      <br>
      <br>
      <el-input placeholder="请输入内容" v-model="describe">
        <template slot="prepend">请输入商品描述:</template>
      </el-input>
      <br>
      <br>
      <el-row :gutter="24">
        <el-col :span="12">
            <div>
              <el-cascader
                :options="options"
                v-model="value"
                filterable></el-cascader>
            </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品图片">
            <input type="file" @change="getFile($event)" multiple>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改商品图片页面" :visible.sync="updImgdialogFormVisible">
      <!--将编辑页面子组件加入到列表页面 -->
      <el-row :gutter="24">
        <el-col :span="20">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple :auto-upload="false"
            :file-list="fileList"
            :on-change="updImg"
            :on-remove="delImg"
            :before-remove="beforeRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="4">
          <div v-for="i in fileList">
            <el-radio v-model="radio" :label="i.name" @change="changeRadio(i.name)"
                      style="margin-top: 55%">展示图片</el-radio>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updImgdialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改商品页面" :visible.sync="upddialogFormVisible">
      <!--将编辑页面子组件加入到列表页面 -->
      <el-form :model="addform">
        <el-input placeholder="请输入内容" v-model="name">
          <template slot="prepend">请输入商品名称:</template>
        </el-input>
        <br>
        <br>
        <el-input placeholder="请输入内容" v-model="priceInto">
          <template slot="prepend">请输入商品进货价:</template>
        </el-input>
        <br>
        <br>
        <el-input placeholder="请输入内容" v-model="priceOut">
          <template slot="prepend">请输入商品卖出价:</template>
        </el-input>
        <br>
        <br>
        <el-input placeholder="请输入内容" v-model="describe">
          <template slot="prepend">请输入商品描述:</template>
        </el-input>
        <br>
        <br>
            <div>
              <el-cascader
                :options="options"
                v-model="value"
                filterable></el-cascader>
            </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upddialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="upd1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import jQuery from "jquery"
  export default {
    name: "goodslist",
    data() {
      return {
        search: '',
        newSearch:'',
        //用户数据 数组对象
        tableData: [],
        // imageUrl: require("../assets/logo.png")
        dialogImageUrl: '',
        dialogVisible: false,
        adddialogFormVisible:false,
        updImgdialogFormVisible:false,
        upddialogFormVisible:false,
        disabled: false,
        index:1,
        priceInto:1,
        priceOut:1,
        describe:"",
        name:"",
        gid:1,
        value:"",
        options:[],
        addform:{
          img:[]
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        ,
        files:[],
        radio:1
      }
    },
    methods: {
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("gName",this.newSearch);
        params.append("page",this.index);
        this.$axios.post("queryAllGoods.action",params).then(function (result) {
          _this.tableData = result.data;
        }).catch(function (error) {
          alert(error)
        })
        this.$axios.post("queryAllGoodsParentType.action").then(function (result) {
          var data=[];
          for (let i = 0; i < result.data.length; i++) {
            var childData= [];
            for (let j = 0; j < result.data[i].goodsChildType.length; j++) {
              var d =result.data[i].goodsChildType[j];
              childData.push({value:d.cId,label:d.cName})
            }
            var d = result.data[i];
            data.push({value:d.pId,label:d.pName,children:childData})
          }
          _this.options =data;
        }).catch(function (error) {
          alert(error)
        })

      },currentPage(index){
        this.index=index;
        this.getData();
      },que(){
        this.newSearch=this.search;
        this.index=1;
        this.getData();
      },hide(){

      },add(event){
        var _this =this;
        var value=this.value+"";
        var gParent = value.substr(0,value.indexOf(','));
        var gChild = value.substr(value.indexOf(',')+1);
        //阻止元素发生默认的行为
        var  formData = new FormData();
        var json={
          gPriceInto:this.priceInto,
          gPriceOut:this.priceOut,
          gName:this.name,
          gDescribe:this.describe,
          gParent:gParent,
          gChild:gChild,
          img:this.addform.img
        }
        Object.keys(json).forEach((key) => {
          if (key=="img"){
            for (let i = 0; i < json[key].length; i++){
              formData.append(key,json[key][i]);
            }
          }else{
            formData.append(key,json[key]);
          }
        });
        // 此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
        // 此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
        this.$axios({
          method: 'post',
          url: 'addGoods.action',
          data:formData,
          headers: {
            'Content-Type':'multipart/form-data'
          }
        })
          .then(function (response) {
            _this.$message({
              type: 'success',
              message: '添加成功!'
            });
            _this.adddialogFormVisible = false;
            _this.getData();
          })
          .catch(function (error) {
            _this.$message.error('添加失败');
            _this.adddialogFormVisible = false;
            _this.getData();
          });

      },getFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到addform中的img  后台通过img获取文件内容

        this.addform.img=[];
        for (let i = 0; i <event.target.files.length ; i++) {
          this.addform.img[i] = event.target.files[i];
        }
        console.log(this.addform.img);
      },getImg(scope){
        var img = scope.row.gImg;
        var index = img.indexOf(',');
        var imgurl ="";
        if (index==-1){
          return img
        }
        imgurl = img.substr(0,img.indexOf(','))
        return imgurl
      },updImg(file,fileList){
        if (fileList.length>=10){
          this.$message.error('最多展示十张图片');
          fileList.pop();
          return  false;
        }
        for (let i = 0; i < fileList.length-1; i++) {
            if (file.name == fileList[i].name){
              this.$message.error('不能有相同名称的图片');
              fileList=fileList.pop();
              return false
            }
        }
        this.fileList.push({name: file.name,url:file.url})
        this.files=fileList;
      },
      delImg(file,fileList){
        this.files=fileList;
        for (let i = 0; i <this.fileList.length ; i++) {
          if (file.name==this.fileList[i].name){
            this.fileList.splice(i,1);
            break;
          }
        }
      },showUpdImg(row){
        this.gid=row.gId;
          this.fileList=[];
          var url = row.gImg;
          var imgs =url.split(",");
          for (let i = 0; i <imgs.length ; i++) {
            var index = imgs[i].lastIndexOf('/');
            var imgName = imgs[i].substr(index+1);
            if (i==0){
              this.radio=imgName;
            }
            this.fileList.push({name: imgName,url:imgs[i]})
          }
          this.files=this.fileList;
          this.updImgdialogFormVisible=true;
      },changeRadio(name){
        //alert(this.radio)
      },upd(){
        var _this = this;
        //阻止元素发生默认的行为
        var  formData = new FormData();
        for (let i = 0; i <this.files.length ; i++) {
          if (this.files[i].raw!=undefined){
            formData.append('img',this.files[i].raw)
          }
        }
        var img =this.files[0];
        for (let i = 0; i < this.files.length; i++) {
          if (this.files[i].name==this.radio){
            this.files[0]=this.files[i];
            this.files[i]=img;
            break;
          }
        }
        if (this.files==""){
          formData.append('imgName',[])
        }
        for (let i = 0; i <this.files.length ; i++) {
          formData.append('imgName',this.files[i].name)
        }
        formData.append("gId",this.gid);
        // 此处使用原生的axios，因为文件提交 要设置 类型Content-Type=multipart/form-data，切记，需要post提交
        // 此处axios原生类似于 jquery的 原生  $.ajax 和 $.get  $.post
        this.$axios({
          method: 'post',
          url: 'updGoodsImg.action',
          data:formData,
          headers: {
            'Content-Type':'multipart/form-data'
          }
        })
          .then(function (response) {
            _this.$message({
              type: 'success',
              message: '修改成功!'
            });
            _this.updImgdialogFormVisible = false;
            _this.getData();
          })
          .catch(function (error) {
            _this.$message.error('修改失败');
            _this.updImgdialogFormVisible = false;
            _this.getData();
          });
      },del(id){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("delGoods.action",params).then(function (result) {
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
      },updShow(row){
        this.gid = row.gId;
        this.name=row.gName;
        this.priceInto=row.gPriceInto;
        this.priceOut = row.gPriceOut;
        this.describe = row.gDescribe;
        this.value=[row.gParent,row.gChild]
        this.upddialogFormVisible=true;
      },upd1(){
        var value =this.value+"";
        var parent = value.substr(0,value.indexOf(','))
        var child = value.substr(value.indexOf(',')+1)
        var _this = this;
        var params = new URLSearchParams();
        params.append("gParent",parent);
        params.append("gChild",child);
        params.append("gId",this.gid);
        params.append("gName",this.name);
        params.append("gPriceInto",this.priceInto);
        params.append("gPriceOut",this.priceOut);
        params.append("gDescribe",this.describe);
        this.$axios.post("updGoods.action",params).then(function (result) {
          if (result.data != 0) {
            _this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            _this.$message.error('修改失败');
          }
          _this.getData();
          _this.upddialogFormVisible=false;
        })
      },beforeRemove(file, fileList){
          if (fileList.length==1){
            this.$message.error('最少保留一张图片');
            return  false;
          }
      }
    },
    created: function () {
      this.getData();
    }
  }
</script>

<style>

</style>
