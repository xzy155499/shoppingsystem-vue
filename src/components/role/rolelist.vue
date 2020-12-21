<template>
  <div>
    <el-row>
      <!-- 员工数据 -->
      <el-col :span="12">
        <el-button style="float:left" @click="shouQuan">授权</el-button>
        <br/><br/><br>
        <el-table :data="empPageVo.rows"
                  border ref="empTable"
                  @select="select">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="emp_name" label="姓名">
          </el-table-column>
          <el-table-column prop="photo" label="照片">
            <el-avatar shape="square" :size="50" src="../src/assets/snjz.gif"></el-avatar>
          </el-table-column>
          <el-table-column prop="emp_age" label="年龄">
          </el-table-column>
          <el-table-column prop="emp_sex" label="性别">
          </el-table-column>
          <el-table-column prop="account" label="账号">
          </el-table-column>
        </el-table>
        <!--  分页 -->
        <el-pagination background layout="prev, pager, next" :page-size="5" :total="empPageVo.total"
                       hide-on-single-page @current-change="empChangePage"></el-pagination>
      </el-col>
      <!-- 角色数据 -->
      <el-col :span="11" :offset="1">
        <el-button style="float:left" @click="openAddRoleDialog">添加角色</el-button>
        <br/><br/><br>
        <el-table :data="rolePageVo.rows" border
                  ref="roleTable" @selection-change="roleSelectionChange"
                  @select="selectRole">
          <el-table-column width="55" type="selection">

          </el-table-column>
          <el-table-column prop="role_name" label="角色名">
          </el-table-column>
          <el-table-column prop="remake" label="备注">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="openEditRoleDialog(scope.row)" plain>编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  分页 -->
        <el-pagination background layout="prev, pager, next" :page-size="5" :total="rolePageVo.total"
                       hide-on-single-page @current-change="roleChangePage"></el-pagination>
      </el-col>

    </el-row>

    <!-- 添加角色信息页面 -->
    <el-dialog title="添加角色信息" style="text-align: left" :close-on-click-modal="false" :destroy-on-close="true" closable
               :visible.sync="addDialogVisible" width="40%">
      <el-form :model="addRoleForm" :rules="rules" label-width="100px" status-icon ref="addRoleForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名：" prop="role_name">
              <el-input v-model="addRoleForm.role_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="remake">
              <el-input type="textarea" v-model="addRoleForm.remake"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色信息页面 -->
    <el-dialog title="编辑角色信息" style="text-align: left" :close-on-click-modal="false" :destroy-on-close="true" closable
               :visible.sync="editDialogVisible" width="40%">
      <el-form :model="editRoleForm" :rules="rules" label-width="100px" status-icon ref="editRoleForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名：" prop="role_name">
              <el-input v-model="editRoleForm.role_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="备注：" prop="remake">
              <el-input type="textarea" v-model="editRoleForm.remake"></el-input>
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
        rolePageIndex: '1',
        empPageIndex: '1',
        //角色数据 数组对象
        rolePageVo: {},
        //员工数据 数组对象
        empPageVo: {},
        //员工ref表格
        empTable: [],
        //角色id 数据
        roleTable: [],
        //存储授权 id
        emp_id: '',
        ridArr: [],
        addDialogVisible: false,
        editDialogVisible: false,
        //添加角色表单数据
        addRoleForm: {
          role_name: '',
          remake: '',
        },
        //修改角色表单数据
        editRoleForm: {},
        //验证
        rules: {
          role_name: [
            {required: true, message: '请输入角色名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      //获取员工数据
      getEmpData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", this.empPageIndex);
        this.$axios.post("queryAllEmp.action", params).then(function (result) {
          _this.empPageVo = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //获取角色数据
      getRoleData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", this.rolePageIndex);
        this.$axios.post("queryAllRole.action", params).then(function (result) {
          _this.rolePageVo = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //分页
      roleChangePage(page) {
        this.rolePageIndex = page;
        this.getRoleData();
      },
      //分页
      empChangePage(page) {
        this.empPageIndex = page;
        this.getEmpData();
      },
      select(selection, row) {
        this.$refs.empTable.clearSelection();
        this.$refs.roleTable.clearSelection();
        if (selection.length === 0) { // 判断selection是否有值存在
          return;
        }
        this.$refs.empTable.toggleRowSelection(row, true);
        this.emp_id = row.emp_id;
        var _this = this;
        var params = new URLSearchParams();
        params.append("emp_id", row.emp_id);
        this.$axios.post("queryRolesByEmpId.action", params).then(function (result) {
          result.data.forEach((item, index) => {

            for (let i = 0; i < _this.rolePageVo.rows.length; i++) {
              if (_this.rolePageVo.rows[i].role_id == item.role_id) {
                _this.$refs.roleTable.toggleRowSelection(_this.rolePageVo.rows[i], true);
              }
            }

          })
        }).catch((error) => {
          alert(error)
        })
      },
      //选择一个员工  角色表选中
      roleSelectionChange(selection) {
        var _this = this;
        _this.ridArr = [];
        selection.forEach((item) => {
          _this.ridArr.push(item.role_id);
        })
      },
      //授权
      shouQuan() {
        var msg = "授权成功";
        var param = new URLSearchParams();
        param.append("emp_id", this.emp_id)
        this.$axios.post("delEmpRoleById.action", param).then(function (result) {

        }).catch((error) => {
          alert(error)
        })
        this.ridArr.forEach((item) => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("emp_id", _this.emp_id);
          params.append("role_id", item);
          _this.$axios.post("shouQuanEmpRole.action", params).then(function (result) {
            if (result.data == 0) {
              msg = '授权失败,未知错误';
            }
          }).catch((error) => {
            alert(error)
          })
        })
        this.$message.info(msg);
        this.getEmpData();
        this.getRoleData();
      },
      selectRole(selection) {
        this.ridArr = [];
        for (let i = 0; i < selection.length; i++) {
          this.ridArr.push(selection.role_id)
        }
      },
      //打开添加窗口 编辑窗口
      openAddRoleDialog() {
        this.addDialogVisible = true
      },
      openEditRoleDialog(data) {
        this.editRoleForm = data;
        this.editDialogVisible = true
      },
      add() {
        var _this = this;
        this.$refs.addRoleForm.validate((valid) => {
          if (valid) {
            let formData = new FormData();
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.addRoleForm).forEach((key) => {
              formData.append(key, _this.addRoleForm[key]);
            });
            _this.$axios.post("addRole.action", formData).then(function (result) {
              if (result.data > 0) {
                _this.$message.success('添加成功');
              } else {
                _this.$message.error('添加失败,未知错误');
              }
              _this.addDialogVisible = false;
              _this.getRoleData();
            }).catch(function (error) {
              alert(error)
            })
          }
        })
      },
      //修改
      edit() {
        var _this = this;
        this.$refs.editRoleForm.validate((valid) => {
          if (valid) {
            let formData = new FormData();
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.editRoleForm).forEach((key) => {
              formData.append(key, _this.editRoleForm[key]);
            });
            _this.$axios.post("updateRoleByRoleId.action", formData).then(function (result) {
              if (result.data > 0) {
                _this.$message.success('编辑成功');
              } else {
                _this.$message.error('编辑失败,未知错误');
              }
              _this.editDialogVisible = false;
              _this.getRoleData();
            }).catch(function (error) {
              alert(error)
            })
          }
        })
      }
    },
    created() {
      this.getEmpData();
      this.getRoleData();
    }
  }
</script>

<style>

</style>
