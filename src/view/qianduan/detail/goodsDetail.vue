<template>
  <div id="index_wapper" class="wapper">
    <el-page-header @back="goBack" content="详情页面">


    </el-page-header>
    <!--    <el-carousel :autoplay="false" style="width: 420px;height: 420px" indicator-position="outside">-->
    <!--      <el-carousel-item>-->
    <div class="goods-detail">
      <el-row>
        <el-col :xs="24" :sm="10" :md="6" :lg="6" :xl="6">
          <br>
          <div>
            <el-card>
              <div>
                <el-image class="goods-list-image" src="../src/assets/img/orange1.jpg"></el-image>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <!--      </el-carousel-item>-->
      <!--    </el-carousel>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      goBack() {
        this.$router.push("/shoppingsystem/index")
      }
    },
  }
</script>

<style>
  .goods-detail {
    width: 420px;
    height: 420px;
  }

</style>
