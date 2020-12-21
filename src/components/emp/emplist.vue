<template>
  <div>
    <el-button slot="append" @click="openAddEmpDialog" style="float:left">添加</el-button>
    <el-input style="width: 200px;" clearable v-model="emp_name" placeholder="输入名字">
    </el-input>
    <el-select v-model="emp_sex" clearable style="width: 200px;">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
    <el-button @click="condSearch">查询</el-button>
    <br/><br/>

    <el-table :data="pageVo.rows"
              border max-height="710px">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="emp_name" label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.emp_name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <p>联系电话: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-link type="primary" :underline="false">{{ scope.row.emp_name }}</el-link>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="photo" label="照片">
        <template slot-scope="scope">
        <el-avatar shape="square" :size="50" :src="scope.row.photo"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="emp_age" label="年龄" sortable>
      </el-table-column>
      <el-table-column prop="emp_sex" label="性别">
      </el-table-column>
      <el-table-column prop="id_number" label="身份证">
      </el-table-column>
      <el-table-column prop="account" label="账号">
      </el-table-column>
<!--      <el-table-column prop="pass" label="密码">-->
<!--      </el-table-column>-->
      <el-table-column prop="isdelete" label="情况">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isdelete === 0 ? 'success' : 'danger'"
            disable-transitions>{{scope.row.isdelete == '0' ? '在职' : '离职' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" plain @click="openEditEmpDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="del(scope.row.emp_id)">解雇</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      background
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageVo.total">
    </el-pagination>

    <!-- 添加员工信息页面 -->
    <el-dialog title="添加员工信息" style="text-align: left" :close-on-click-modal="false" :destroy-on-close="true" closable
               :visible.sync="addDialogVisible">
      <el-form :model="addEmpForm" :rules="rules" label-width="100px" status-icon ref="addEmpForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="emp_name">
              <el-input v-model="addEmpForm.emp_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄：" prop="emp_age">
              <el-input-number style="width: 360px" v-model="addEmpForm.emp_age" controls-position="right" :min="18"
                               :max="60"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：" prop="emp_sex">
              <el-radio-group v-model="addEmpForm.emp_sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" prop="address">
            <el-form-item label="地址：" v-model="addEmpForm.address">
              <el-cascader clearable style="width: 360px"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="账号：" prop="account">
              <el-input v-model="addEmpForm.account"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="密码：" prop="pass">
              <el-input v-model="addEmpForm.pass" label-width="100px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="身份证号：" prop="id_number">
              <el-input v-model="addEmpForm.id_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="addEmpForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑员工信息页面 -->
    <el-dialog title="编辑员工信息" style="text-align: left" :close-on-click-modal="false" :destroy-on-close="true" closable
               :visible.sync="editDialogVisible">
      <el-form :model="editEmpForm" :rules="rules" label-width="100px" status-icon ref="editEmpForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="emp_name">
              <el-input v-model="editEmpForm.emp_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄：" prop="emp_age">
              <el-input-number style="width: 360px" v-model="editEmpForm.emp_age" controls-position="right" :min="18"
                               :max="60"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：" prop="emp_sex">
              <el-radio-group v-model="editEmpForm.emp_sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" prop="address">
            <el-form-item label="地址：" v-model="editEmpForm.address">
              <el-cascader clearable style="width: 360px"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <!--
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号：" prop="account">
              <el-input v-model="editEmpForm.account"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="密码：" prop="pass">
              <el-input v-model="editEmpForm.pass" label-width="100px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        -->
        <el-row>
          <el-col>
            <el-form-item label="身份证号：" prop="id_number">
              <el-input v-model="editEmpForm.id_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="editEmpForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        emp_name: '',
        emp_sex: '',
        pageIndex: '1',
        pageSize: '5',
        //员工数据 数组对象
        pageVo: {},
        addDialogVisible: false,
        editDialogVisible: false,
        //添加员工表单数据
        addEmpForm: {
          emp_name: '',
          // photo: '',
          emp_age: '18',
          emp_sex: '男',
          id_number: '',
          phone: '',
          address: '',
          // account: '',
          // pass: '',
        },
        //编辑员工表单数据
        editEmpForm: {},
        //验证
        rules: {
          emp_name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          emp_age: [
            {required: true, message: '请输入年龄', trigger: 'change'},
          ],
          emp_sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          id_number: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位数的号码', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请选择地址信息', trigger: 'change'}
          ],
          // account: [
          //   {required: true, message: '请输入账号', trigger: 'blur'},
          //   {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          // ],
          // pass: [
          //   {required: true, message: '请输入密码', trigger: 'blur'}
          // ],
        }
      }
    },
    methods: {
      getEmpData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("emp_name", this.emp_name);
        params.append("emp_sex", this.emp_sex);
        params.append("page", this.pageIndex);
        params.append("rows", this.pageSize);
        this.$axios.post("queryAllEmp.action", params).then(function (result) {
          _this.pageVo = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //条件查询
      condSearch() {
        this.pageIndex = 1;
        this.getEmpData();
      },
      //分页
      changePage(page) {
        this.pageIndex = page;
        this.getEmpData();
      },
      changeSize(size){
        this.pageSize = size;
        this.getEmpData();
      },
      //删除
      del(emp_id) {
        this.$confirm('是否解雇该员工?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("emp_id", emp_id);
          this.$axios.post("delEmpByEmpId.action", params).then(function (result) {
            if (result.data > 0) {
              _this.$message.success('解雇成功');
            } else {
              _this.$message.error('解雇失败,未知错误');
            }
            _this.getEmpData();
          }).catch(function (error) {
            alert(error)
          })
        }).catch((error) => {
          console.log(error)
        });

      },
      //打开添加窗口 编辑窗口
      openAddEmpDialog() {
        this.addDialogVisible = true
      },
      openEditEmpDialog(data) {
        this.editEmpForm = data;
        this.editDialogVisible = true
      },
      //添加
      add() {
        var _this = this;
        this.$refs.addEmpForm.validate((valid) => {
          if (valid) {
            let formData = new FormData();
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.addEmpForm).forEach((key) => {
              formData.append(key, _this.addEmpForm[key]);
            });
            _this.$axios.post("addEmp.action", formData).then(function (result) {
              if (result.data > 0) {
                _this.$message.success('添加成功');
              } else {
                _this.$message.error('添加失败,未知错误');
              }
              _this.addDialogVisible = false;
              _this.getEmpData();
            }).catch(function (error) {
              alert(error)
            })
          }
        })
      },
      //修改
      edit() {
        var _this = this;
        this.$refs.editEmpForm.validate((valid) => {
          if (valid) {
            let formData = new FormData();
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.editEmpForm).forEach((key) => {
              if(key == 'last_time' || key == 'this_time'){
                return;
              }
              formData.append(key, _this.editEmpForm[key]);
            });
            _this.$axios.post("updateEmpByEmpId.action", formData).then(function (result) {
              if (result.data > 0) {
                _this.$message.success('编辑成功');
              } else {
                _this.$message.error('编辑失败,未知错误');
              }
              _this.getEmpData();
              _this.editDialogVisible = false;
            }).catch(function (error) {
              alert(error)
            })
          }
        })
      }
    },
    created() {
      this.getEmpData();
    }
  }
</script>

<style>

</style>
