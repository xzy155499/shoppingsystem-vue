<template>
  <div id="emplist">
    <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
      <el-button  slot="append" @click="addUser">添加</el-button>
    </el-input>
    <br/><br/>

    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              border>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="warning" icon="el-icon-edit" plain circle></el-button>
        <el-button type="danger" icon="el-icon-delete" plain circle ></el-button>
      </el-table-column>
    </el-table>

    <!-- 添加员工信息页面 -->
    <el-dialog title="添加员工信息" style="text-align: left"  :close-on-click-modal="false"  :destroy-on-close="true" closable :visible.sync="addDialogVisible">
      <!--将添加员工信息页面组件加入到列表页面 -->
      <adduser></adduser>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Adduser from "../../components/emp/addemp.vue"

  export default {
    name: "emplist",
    data(){
      return{
        addDialogVisible: false,
        search: '',
        //用户数据 数组对象
        tableData: [{
          name: '荣荣',
          date: '2016-05-02',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          name: '胖达荣荣',
          date: '2016-05-04',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: 'Roger',
          date: '2016-05-01',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: '木子川页',
          date: '2016-05-03',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods:{
      //添加用户
      addUser: function() {
        this.addDialogVisible = true
      },
    },
    components: {
      adduser: Adduser
    }
  }
</script>

<style>

</style>
