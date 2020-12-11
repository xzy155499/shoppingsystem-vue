<template>
  <div id="emplist">
    <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
      <el-button  slot="append">添加</el-button>
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
      <el-table-column label="操作">
        <el-button type="warning" icon="el-icon-edit" plain circle></el-button>
        <el-button type="danger" icon="el-icon-delete" plain circle ></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "emplist",
    data(){
      return{
        search: '',
        //用户数据 数组对象
        tableData: [{
          name: '菜单一',
          date: '2016-05-02',
        }, {
          name: '菜单二',
          date: '2016-05-04',
        }, {
          name: '菜单三',
          date: '2016-05-01',
        }, {
          name: '菜单四',
          date: '2016-05-03',
        }],
      }
    },
  }
</script>

<style>

</style>
