<template>
  <div>
    <el-row>
      <!-- 角色数据 -->
      <el-col :span="12">
        <el-button style="float:left" @click="shouQuan">授权</el-button>
        <br/><br/><br>
        <el-table :data="rolePageVo.rows" border
                  ref="roleTable" @select="selectRole"
                  @selection-change="roleSelectionChange">

          <el-table-column width="55" type="selection">

          </el-table-column>
          <el-table-column prop="role_name" label="角色名">
          </el-table-column>
          <el-table-column prop="remake" label="备注">
          </el-table-column>

        </el-table>
        <!--  分页 -->
        <el-pagination background layout="prev, pager, next" :page-size="5" :total="rolePageVo.total"
                       hide-on-single-page @current-change="roleChangePage"></el-pagination>
      </el-col>

      <!-- 菜单数据 -->
      <el-col :span="10" :offset="2" style="margin-top: 60px">
        <el-tree
          :data="menuData"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="treeProps"
          :default-checked-keys="defKeys"
          ref="treeRef">
        </el-tree>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        rolePageIndex: '1',
        roleTable: '',
        role_id: '',
        //角色数据 数组对象
        rolePageVo: {},
        //菜单数据 数组对象
        menuData: [],
        defKeys: [],// 角色拥有的菜单id 默认选中的节点ID值数组
        treeRef: {},
        // 树形控件的属性绑定对象
        treeProps: {
          label: 'label',
          children: 'childMenu'
        }
      }
    },
    methods: {
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
      //获取后端菜单数据信息
      getMenuData() {
        var _this = this;
        this.$axios.post("queryAllTreeMenu.action").then(function (result) {
          _this.menuData = result.data;
        }).catch(function (error) {
          console.log(error)
        })
      },
      //分页
      roleChangePage(page) {
        this.rolePageIndex = page;
        this.getRoleData();
      },
      selectRole(selection, row) {
        this.$refs.roleTable.clearSelection();
        if (selection.length === 0) { // 判断selection是否有值存在
          return;
        }
        this.$refs.roleTable.toggleRowSelection(row, true);
        this.role_id = row.role_id;
        var _this = this;
        var params = new URLSearchParams();
        params.append("role_id", this.role_id);
        var arr = [];
        this.$axios.post("queryMenuIdByRid.action", params).then(function (result) {

          result.data.forEach((item) => {
            if (item==1 || item==2 || item==3 || item==4 || item==5 || item==6  ){
              return
            }
            arr.push(item)
          })

          _this.defKeys = arr;
        }).catch((error) => {
          alert(error)
        })
      },
      roleSelectionChange(selection) {
        if (selection.length === 0) {
          this.defKeys = [];
          this.getMenuData();
        }
      },
      //授权
      shouQuan() {
        var param = new URLSearchParams();
        param.append("role_id", this.role_id)
        this.$axios.post("delRoleMenuByRid.action", param).then(function (result) {

        }).catch((error) => {
          alert(error)
        })
        const keys = [
          this.$refs.treeRef.getCheckedKeys(),
          this.$refs.treeRef.getHalfCheckedKeys()
        ]
        let menuIds = keys.join(',')
        var _this = this;
        var params = new URLSearchParams();
        params.append("role_id", this.role_id);
        params.append("menuIds", menuIds);
        this.$axios.post("shouQuanRoleMenu.action", params).then(function (result) {
          _this.$message.info(result.data.msg);
        }).catch((error) => {
          alert(error)
        })
        //this.defKeys = []
        this.getRoleData();
        this.getMenuData();
      },
    },
    created() {
      this.getRoleData();
      this.getMenuData();
    }
  }
</script>

<style>

</style>
