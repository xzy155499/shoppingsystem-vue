<template>
  <div id="goodslist">
    <el-input style="width: 250px;" clearable v-model="search" placeholder="输入关键字搜索">
      <el-button slot="addgoods">添加</el-button>
    </el-input>
    <br/><br/>

    <el-table :data="tableData.rows"
              border>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="gImg" label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.gImg" style="height: 60px;width: 60px">
        </template>
        <!-- <img src="../assets/logo.png">-->
        <!--        <img slot-scope="{row}" :src="row.gImg" class="card-pic" width="60" height="60"/>-->
        <!--        <div >{{show(row.gImg)}}</div>-->
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
        <el-button type="warning" icon="el-icon-edit" plain circle></el-button>
        <el-button type="danger" icon="el-icon-delete" plain circle></el-button>
      </el-table-column>
    </el-table>
    <el-upload
      action="src/assets"
      list-type="picture-card"
      multiple
      :auto-upload="false">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url" alt=""
        >
        <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "goodslist",
    data() {
      return {
        search: '',
        //用户数据 数组对象
        tableData: [],
        // imageUrl: require("../assets/logo.png")
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      }
    },
    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      show(data) {
        console.log(data)
      },
      getData() {
        var _this = this;
        this.$axios.post("queryAllGoods.action").then(function (result) {
          _this.tableData = result.data;
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
