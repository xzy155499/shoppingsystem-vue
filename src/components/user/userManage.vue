<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="3">
        <el-button @click="addUserVisible = true" size="small "  type="success" icon="el-icon-plus" circle></el-button>
      </el-col>
      <el-col :span="20" >
        <el-input v-model="user_name" placeholder="输入用户姓名" style="width: 200px"></el-input>
        <el-input id="phone" v-model="phone" placeholder="用户账号" style="width: 200px"></el-input>
        <el-button @click="getuserManageData()" type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
  <el-table
    ref="multipleTable"
    :data="usertableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="userChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="user_sex"
      label="性别"
      width="80">
    </el-table-column>
    <el-table-column
      prop="birth_date"
      label="出生日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="id_number"
      label="身份证号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
      width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button-group>
          <el-button @click="userEdit(scope.row)" icon="el-icon-edit"></el-button>
          <el-button @click="userDelete(scope.row)" icon="el-icon-delete"></el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageindex"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    <el-dialog


      title="添加"
      :visible.sync="addUserVisible"
      width="50%">

      <!-- 在这个空白处希望放上一个vue页面 -->
      <el-form ref="form" :model="addUserForm" label-width="80px">
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.user_name" placeholder="输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <input type="file" @change="getFile($event)">
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="addUserForm.user_sex" >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="addUserForm.birth_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.id_number" placeholder="输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.phone" placeholder="输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
          <el-input type="password" v-model="addUserForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addUser()">添加</el-button>
        <el-button @click="addUserVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog


      title="修改用户"
      :visible.sync="editUserVisible"
      width="50%">

      <!-- 在这个空白处希望放上一个vue页面 -->
      <el-form ref="form" :model="editUserForm" label-width="80px">
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.user_name" placeholder="输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <input type="file" @change="getFile($event)">
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="editUserForm.user_sex" >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="editUserForm.birth_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.id_number" placeholder="输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.phone" placeholder="输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="(userEditData())">修改</el-button>
        <el-button @click="editUserVisible = false">取消</el-button>
      </el-form>
    </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "userManage",
        data(){
          return{
            usertableData:[],
            userSelection:[],
            phone:"",
            user_name:"",
            pagevo:{},   //接收后台传递过来的pagevo数据(json格式的)
            pageindex:1,   //页码  默认第一页
            username:"", //条件查询
            total:1,  //总页记录数
            totalpage:1,//总页数
            pagesize:5,//页最大行数
            addUserVisible: false,
            editUserVisible : false,
            delUserVisible: false,
            formLabelWidth:'100px',
            addUserForm: {
              user_name:"",
              photo:"",
              user_sex:"",
              birth_date:"",
              id_number:"",
              phone:"",
              pass:""
            },
            editUserForm: {
              user_id:"",
              user_name:"",
              photo:"",
              user_sex:"",
              birth_date:"",
              id_number:"",
              phone:"",
              pass:""
            }
          }
        },
        methods: {
          userChange(val) {
            this.userSelection = val;
          },
          userEdit( row) {
            this.editUserVisible = true;
            var _this=this;
            var param=new URLSearchParams();
            param.append("user_id",row.user_id)
            this.$axios.post("queryByIdUser.action",param).then(function (result) {
              _this.editUserForm.user_name=result.data.user_name;
              _this.editUserForm.photo=result.data.photo;
              _this.editUserForm.user_sex=result.data.user_sex;
              _this.editUserForm.birth_date=result.data.birth_date;
              _this.editUserForm.id_number=result.data.id_number;
              _this.editUserForm.phone=result.data.phone;
              _this.editUserForm.pass=result.data.pass;
              _this.editUserForm.user_id=result.data.user_id;
            }).catch(function (error) {
              alert(error)
            })
          },
          userEditData(){
            var _this=this;
            var param=new URLSearchParams();
            param.append("user_id",_this.editUserForm.user_id);
            param.append("user_name",_this.editUserForm.user_name);
            param.append("photo",_this.editUserForm.photo);
            param.append("user_sex",_this.editUserForm.user_sex);
            param.append("birth_date",_this.editUserForm.birth_date);
            param.append("id_number",_this.editUserForm.id_number);
            param.append("phone",_this.editUserForm.phone);
            param.append("pass",_this.editUserForm.pass);
            this.$axios.post("editUser.action",param).then(function (result) {

            }).catch(function (error) {
              alert(error)
            })
            _this.editUserVisible= false;
            _this.getuserManageData();
          },
          userDelete( row) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              var _this=this;
              var param=new URLSearchParams();
              param.append("user_id",row.user_id)
              this.$axios.post("delUser.action",param).then(function (result) {
                if(result.data){
                  _this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              }).catch(function (error) {
                alert(error)
              })
              if(_this.total%_this.pagesize==1){
                _this.pageindex=_this.pageindex-1;
              }
              _this.getuserManageData();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          getuserManageData(){
            var _this=this;
            var usertableData =new URLSearchParams();
            usertableData.append("user_name",_this.user_name);
            usertableData.append("phone",_this.phone);
            usertableData.append("page",_this.pageindex);
            usertableData.append("rows",_this.pagesize);
            this.$axios.post("queryAllUser.action",usertableData).then(function (result) {
              _this.pagevo=result.data;
              _this.usertableData=_this.pagevo.rows;
              var total=_this.pagevo.total;
              _this.total = total;//总记录
              //总页数
              _this.totalpage = _this.total%_this.pagesize==0?_this.total/_this.pagesize:Math.floor(total/_this.pagesize) +1;
            }).catch(function (error) {
              alert(error)
            })
          },
          //处理页码大
          handleSizeChange(val) {
            this.pagesize=val;
            this.getuserManageData();
          },
          //当前页变动时候触发的事件
          handleCurrentChange(val) {
            this.pageindex=val;
            this.getuserManageData();
          },
          addUser(){
            var _this=this;
            var param =new URLSearchParams();
            param.append("user_name",_this.addUserForm.user_name);
            param.append("photo",_this.addUserForm.photo);
            param.append("user_sex",_this.addUserForm.user_sex);
            param.append("birth_date",_this.addUserForm.birth_date);
            param.append("id_number",_this.addUserForm.id_number);
            param.append("phone",_this.addUserForm.phone);
            param.append("pass",_this.addUserForm.pass);
            this.$axios.post("addUsers.action",param).then(function (result) {
              if(result.data==1){
                _this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
              }else{
                _this.$message({
                  type: 'info',
                  message: '添加失败!'
                });
              }
              _this.getuserManageData();
            }).catch(function (error) {
              alert(error)
            })
            _this.addUserVisible=false;
          }
        },
        created() {
            this.getuserManageData();
        }
    }
</script>

<style scoped>

</style>
