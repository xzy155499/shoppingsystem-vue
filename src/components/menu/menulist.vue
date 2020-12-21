<template>
  <div>
    <el-input style="width: 200px;" v-model="label" clearable placeholder="输入菜单名">
    </el-input>
    <el-button @click="condSearch">查询</el-button>
    <br/>
    <br/>
    <!-- :data="pageVo.rows" -->
    <el-table :data="menuData"
              border max-height="710px"
              row-key="id"
              :tree-props="{children: 'childMenu', hasChildren: 'hasChildMenu'}">
      <el-table-column prop="label" label="菜单名称">
      </el-table-column>
      <el-table-column prop="nodeType" label="类型">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.nodeType === 1 ? 'success' : 'warning'"
            disable-transitions>{{scope.row.nodeType == '1' ? '菜单' : '目录' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="访问地址">
        <template slot-scope="scope">
          <label>{{scope.row.path != null ? scope.row.path : '暂无数据' }}</label>
        </template>
      </el-table-column>
      <el-table-column prop="isdelete" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isdelete"
            active-color="#13ce66"

            :active-value="0"
            :inactive-value="1"
            @change="onEnable($event,scope.row)"
          />
        </template>
      </el-table-column>
      <!--    <el-table-column label="操作">-->
      <!--      <template slot-scope="scope">-->
      <!--        <el-button size="mini" type="warning" plain >编辑</el-button>-->
      <!--        @click="openEditEmpDialog(scope.row)"-->
      <!--      </template>-->
      <!--    </el-table-column>-->
    </el-table>

    <!--  <el-pagination-->
    <!--    @size-change="changeSize"-->
    <!--    @current-change="changePage"-->
    <!--    background-->
    <!--    :page-sizes="[5, 10, 15, 20]"-->
    <!--    :page-size="5"-->
    <!--    layout="total, sizes, prev, pager, next, jumper"-->
    <!--    :total="pageVo.total">-->
    <!--  </el-pagination>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        label: '',
        pageVo: {},
        menuData: [],
        switchValue: '',
        pageIndex: '1',
        pageSize: '5',
      }
    },
    methods: {
      //获取后端菜单数据信息
      getMenuData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("label", this.label);
        this.$axios.post("queryAllTreeMenu.action", params).then(function (result) {
          _this.menuData = result.data;
        }).catch(function (error) {
          console.log(error)
        })
      },
      //条件查询
      condSearch() {
        this.pageIndex = 1;
        this.getMenuData();
      },
      //分页
      changePage(page) {
        this.pageIndex = page;
        this.getMenuData();
      },
      changeSize(size) {
        this.pageSize = size;
        this.getMenuData();
      },
      onEnable(event, it) {
        this.$confirm(`你确认要${it.isdelete ? "禁用" : "启用"}菜单[${it.label}]吗?`, "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", it.id);
          params.append("isdelete", event);
          _this.$axios.post("disabledMenu.action", params).then(function (result) {
            if(result.data >0){
              _this.$message.success("更新菜单状态成功");
            }else {
              _this.$message.success("更新失败,未知错误");
            }
            _this.getMenuData();
          }).catch(function (error) {
            console.log(error)
          })
        }).catch((error) => {
          this.getMenuData();
        });

      },
    },
    created() {
      this.getMenuData();
    }
  }
</script>

<style>

</style>
