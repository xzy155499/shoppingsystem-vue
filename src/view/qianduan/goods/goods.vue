<template>
  <div>
    <!--  轮播条 -->
    <div align="center">
      <el-carousel :interval="4000" type="card">
        <el-carousel-item>
          <el-image src="../src/assets/CarouselImg/Carousel-1.jpg"></el-image>
        </el-carousel-item>
        <el-carousel-item>
          <el-image src="../src/assets/CarouselImg/Carousel-2.jpg"></el-image>
        </el-carousel-item>
        <el-carousel-item>
          <el-image src="../src/assets/CarouselImg/Carousel-3.jpg"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div id="index_wapper" class="wapper">
      <!-- 商品查询 -->
      <el-input placeholder="商品名称" v-model="goods_name" style="width:64%;">
        <template slot="append">
          <el-button icon="el-icon-search" type="primary" native-type="submit">查询
          </el-button>
        </template>
      </el-input>
      <ul class="index_nav disbet">
        <li><a href="#goods-fruits"><i class="index_nav_icon01"></i>新鲜水果</a></li>
        <li><a href="#goods-cooked"><i class="index_nav_icon03"></i>美味熟食</a></li>
        <li><a href="#goods-snacks"><i class="index_nav_icon04"></i>休闲零食</a></li>
        <!--          <li><a href=""><i class="icon-haixian"></i>优质海鲜</a></li>-->
      </ul>
      <!-- 每日推荐 -->
      <div class="main_product mart24 public_dv1">
        <div class="main_product_title">
          <span>每日推荐</span>
          <a href="javascript:;"><em></em></a>
          <img src="../../../assets/indexImg/everydayLogo.png">
        </div>
        <div class="main_product_list">
          <ul class="disbet">
            <li>
              <a>
                <div class="img_dv">
                  <el-image class="goods-list-image" src="../src/assets/img/orange.jpg"></el-image>
                </div>
                <h2></h2>
                <p class="overhide2">规格:&ensp;5</p>
                <div class="price_dv">&yen;<span>15</span></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 新鲜水果 -->
      <div class="public_dv public_dv2">
        <div class="public_dv_title disbet">
          <h2 id="goods-fruits">新鲜水果</h2>
          <a href="javascript:;" @click="moreFruits">查看更多 ></a>
        </div>
        <el-row>
          <el-col v-for="item in FruitsData.rows" :xs="24" :sm="7" :md="6" :lg="6" :xl="6">
            <br>
            <div @click="detail(item.gId)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="goods-list-card-body">
                  <div class="goods-list-tag-group">
                    <el-badge class="item" v-if="item === 4" value="new"></el-badge>
                    <el-badge class="item" v-if="item.gNum >= 400" value="hot"></el-badge>
                    <el-badge class="item" v-else-if="item.gNum < 100 && item.gNum > 20" value="推荐"
                              type="success"></el-badge>
                    <el-badge class="item" v-if="item.warehouseNum === 0" value="缺货"></el-badge>
                  </div>
                  <div class="goods-list-image-group">
                    <el-image class="goods-list-image" :src="getImg(item.gImg)"></el-image>
                  </div>
                  <div class="goods-list-title">{{item.gName}}</div>
                  <div class="goods-list-description">{{item.gDescribe}}</div>
                  <div class="goods-list-price">
                    <span>&yen; {{item.gPriceOut}}元</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 美味熟食 -->
      <div class="public_dv public_dv3">
        <div class="public_dv_title disbet">
          <h2 id="goods-cooked">美味熟食</h2>
          <a href="">查看更多 ></a>
        </div>
        <el-row>
          <el-col v-for="item in CookedData.rows" :xs="24" :sm="7" :md="6" :lg="6" :xl="6">
            <br>
            <div @click="detail(item.gId)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="goods-list-card-body">
                  <div class="goods-list-tag-group">
                    <el-badge class="item" v-if="item === 4" value="new"></el-badge>
                    <el-badge class="item" v-if="item.gNum >= 400" value="hot"></el-badge>
                    <el-badge class="item" v-else-if="item.gNum < 100 && item.gNum > 20" value="推荐"
                              type="success"></el-badge>
                    <el-badge class="item" v-if="item.warehouseNum === 0" value="缺货"></el-badge>
                  </div>
                  <div class="goods-list-image-group">
                    <el-image class="goods-list-image" :src="getImg(item.gImg)"></el-image>
                  </div>
                  <div class="goods-list-title">{{item.gName}}</div>
                  <div class="goods-list-description">{{item.gDescribe}}</div>
                  <div class="goods-list-price">
                    <span>&yen; {{item.gPriceOut}}元</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 休闲零食 -->
      <div class="public_dv public_dv4">
        <div class="public_dv_title disbet">
          <h2 id="goods-snacks">休闲零食</h2>
          <!--          <h2>其他</h2>-->
          <a href="">查看更多 ></a>
        </div>
        <el-row>
          <el-col v-for="item in SnacksData.rows" :xs="24" :sm="7" :md="6" :lg="6" :xl="6">
            <br>
            <div @click="detail(item.gId)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="goods-list-card-body">
                  <div class="goods-list-tag-group">
                    <el-badge class="item" v-if="item === 4" value="new"></el-badge>
                    <el-badge class="item" v-if="item.gNum >= 400" value="hot"></el-badge>
                    <el-badge class="item" v-else-if="item.gNum < 100 && item.gNum > 20" value="推荐"
                              type="success"></el-badge>
                    <el-badge class="item" v-if="item.warehouseNum === 0" value="缺货"></el-badge>
                  </div>
                  <div class="goods-list-image-group">
                    <el-image class="goods-list-image" :src="getImg(item.gImg)"></el-image>
                  </div>
                  <div class="goods-list-title">{{item.gName}}</div>
                  <div class="goods-list-description">{{item.gDescribe}}</div>
                  <div class="goods-list-price">
                    <span>&yen; {{item.gPriceOut}}元</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 其他 -->
      <div class="public_dv public_dv5">
        <div class="public_dv_title disbet">
          <h2 id="goods-else">其他</h2>
          <a href="" >查看更多 ></a>
        </div>
        <el-row>
          <el-col v-for="item in ElseData.rows" :xs="24" :sm="7" :md="6" :lg="6" :xl="6">
            <br>
            <div @click="detail(item.gId)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="goods-list-card-body">
                  <div class="goods-list-tag-group">
                    <el-badge class="item" v-if="item === 4" value="new"></el-badge>
                    <el-badge class="item" v-if="item.gNum >= 400" value="hot"></el-badge>
                    <el-badge class="item" v-else-if="item.gNum < 100 && item.gNum > 20" value="推荐"
                              type="success"></el-badge>
                    <el-badge class="item" v-if="item.warehouseNum === 0" value="缺货"></el-badge>
                  </div>
                  <div class="goods-list-image-group">
                    <el-image class="goods-list-image" :src="getImg(item.gImg)"></el-image>
                  </div>
                  <div class="goods-list-title">{{item.gName}}</div>
                  <div class="goods-list-description">{{item.gDescribe}}</div>
                  <div class="goods-list-price">
                    <span>&yen; {{item.gPriceOut}}元</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timer: null, //定时器名称
        FruitsData: [],
        CookedData: [],
        SnacksData: [],
        ElseData: [],
        pageSize: '8',
        goods_name: '',
        parentTypeId: null
        // layout: 'total, sizes, prev, pager, next, jumper',
        // total: 0,
      }
    },
    methods: {
      //水果
      goodsFruitsData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", this.pageSize);
        params.append("gParent", "1");
        this.$axios.post("queryAllGoods.action", params).then(function (result) {
          _this.FruitsData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //更多水果
      moreFruits() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", "20");
        params.append("gParent", "1");
        this.$axios.post("queryAllGoods.action", params).then(function (result) {
          _this.FruitsData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //熟食
      goodsCookedData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", this.pageSize);
        params.append("gParent", "2");
        this.$axios.post("queryAllGoods.action", params).then(function (result) {
          _this.CookedData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //零食
      goodsSnacksData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", this.pageSize);
        params.append("gParent", "3");
        this.$axios.post("queryAllGoods.action", params).then(function (result) {
          _this.SnacksData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //其他
      goodsElseData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", this.pageSize);
        params.append("gParent", "5");
        this.$axios.post("queryAllGoods.action", params).then(function (result) {
          _this.ElseData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      getImg(url) {
        var img = url;
        var index = img.indexOf(',');
        var imgurl = "";
        if (index == -1) {
          return img
        }
        imgurl = img.substr(0, img.indexOf(','))
        return imgurl
      },
      detail(goods_id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", goods_id);
        this.$axios.post("queryGoodsById.action", params).then(function (result) {
          var data = result.data;
          _this.$router.push({path: '/shoppingsystem/detail', query: {data}})
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    // beforeDestroy(){
    //   clearInterval(this.timer);
    //   this.timer = null;
    // },
    created() {
      this.goodsFruitsData();
      this.goodsCookedData();
      this.goodsSnacksData();
      this.goodsElseData();
      // if (this.timer) {
      //   clearInterval(this.timer)
      // } else {
      //   this.timer = setInterval(() => {
      //     setTimeout(this.goodsFruitsData(), 0)
      //     setTimeout(this.goodsCookedData(), 0)
      //     setTimeout(this.goodsSnacksData(), 0)
      //     setTimeout(this.goodsElseData(), 0)
      //     console.log("刷新" + new Date());
      //   }, 100000)
      // }
    }
  }
</script>

<style>

  /*.icon-haixian{*/
  /*  background:url('../../assets/CarouselImg/haixian.png') no-repeat center center;*/
  /*}*/
  * {
    margin: 0;
    padding: 0;
  }

  .el-card {
    margin-left: 5px;
    width: 285px;
    height: 310px;
  }

  .goods-list-card-body {
    position: relative;
    text-align: center;
    cursor: pointer;
  }

  .goods-list-tag-group {
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 9;
  }

  .goods-list-image-group {
    height: 200px;
    overflow: hidden;
  }

  .goods-list-image {
    width: 100%;
    height: 200px;
    transition: all ease-in-out 0.3s;
  }

  .goods-list-image:hover {
    transform: scale(1.1);
  }

  .goods-list-title {
    margin: 8px 0;
    font-size: 16px;
    font-weight: bold;
  }

  .goods-list-description {
    font-size: 14px;
    color: #808695;
  }

  .goods-list-price, .goods-list-price span {
    margin: 8px 0;
    font-size: 15px;
    color: #f72424;
  }

  /*********************************/

  * {
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }

  .mart24 {
    margin-top: 24px;
  }

  /*body {*/
  /*  width: 100%;*/
  /*  min-width: 1200px;*/
  /*  font-family: "Microsoft YaHei";*/
  /*}*/





  .overhide1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .xiajia {
    position: relative;
  }

  .xiajia::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 8;
  }

  .xiajia::before {
    content: '宸插敭缃�';
    display: block;
    color: #fff;
    position: absolute;
    transform: rotate(-45deg);
    position: absolute;
    right: 10px;
    bottom: 24px;
    z-index: 9;
  }

  .disbet {
    display: flex;
    justify-content: space-between;
  }

  .login {
    align-items: center;
  }

  .login .left {
    margin-top: 10px;
  }

  .Login {
    width: 430px;
    padding: 34px 30px;
    height: auto;
    background: #fff;
    border: solid 1px #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 0px 10px 0px rgba(0, 0, 0, .1);
  }

  .Login .login_ul {
    display: flex;
    justify-content: center;
  }

  .Login .login_ul li {
    cursor: pointer;
    font-size: 20px;
    color: #333;
    margin: 0 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid;
    border-color: #fff;
  }

  .Login .login_ul li.active {
    color: #019545;
    border-color: #019545;
  }

  .Login .Login_box {
    margin-top: 5px;
    width: 100%;
  }

  .Login .Login_box .login_name {
    width: 100%;
    border: solid 1px;
    border-color: #e6e6e6;
    border-radius: 6px;
    height: 56px;
    align-items: center;
    margin-top: 35px;
    position: relative;
  }

  .Login .Login_box .login_name label {
    display: inline-block;
    width: 54px;
    min-width: 54px;
    text-align: center;
  }

  .Login .Login_box .login_name label img {
    vertical-align: middle
  }

  .Login .Login_box .login_name input {
    border: none;
    width: 100%;
    height: 28px;
    border-left: 1px solid #d3d3d3;
    padding-left: 10px;
  }

  .Login .Login_box .login_name.on {
    border-color: #f03a3c;
  }

  .Login .Login_box .login_name.on .warning_box {
    display: block
  }

  .Login .Login_box .register .login_name {
    margin-top: 15px
  }

  .Login .Login_box .loginbox01 {
    margin-top: 15px;
  }

  .Login .Login_box .loginbox01 > div {
    color: #777;
    font-size: 14px;
  }

  .Login .Login_box .loginbox01 a {
    color: #777;
    font-size: 14px;
  }

  .Login .Login_box .loginbox02 {
    margin-top: 40px;
    text-align: center;
    color: #777777;
    font-size: 14px;
  }

  .Login .Login_box .loginbox02 a {
    font-size: 14px;
    color: #019443;
  }

  .Login .Login_box button {
    margin-top: 24px;
    height: 56px;
    width: 100%;
    border-radius: 6px;
    background-color: #019443;
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 56px;
  }

  .Login .Login_box button:hover {
    opacity: .7;
  }

  .Login .Login_box .loginbox03 {
    width: 100%;
    text-align: right;
    margin-top: 17px;
    font-size: 14px;
    color: #777777;
  }

  .Login .Login_box .loginbox03 a {
    color: #019443;
    font-size: 14px;
  }

  .Login .Login_box .warning_box {
    font-size: 12px;
    color: #f03a3c;
    position: absolute;
    bottom: -16px;
    left: 0;
    display: none;
  }

  .Login .Login_box .register .warning_box {
    bottom: -16px;
    font-size: 12px;
  }

  .Login .Login_box .warning_box img {
    width: 12px;
    height: 12px;
    vertical-align: -1px;
  }

  .Login .Login_box .register .warning_box img {
    width: 12px;
    height: 12px;
    vertical-align: -1px;
  }

  .Login .register_box h2 {
    text-align: center;
    font-size: 20px;
    color: #333333;
    font-weight: 400
  }

  .Login .login_name .get_code {
    display: block;
    width: 130px;
    min-width: 130px;
    white-space: nowrap;
    text-align: center;
    color: #757575;
    cursor: pointer;
  }

  .login_pop {
    width: 378px;
    height: 196px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 0px 10px 0px rgba(0, 0, 0, .1);
    padding: 40px 0;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }

  .login_pop h2 {
    text-align: center;
    font-size: 24px;
    color: #333333;
    font-weight: 400;
  }

  .login_pop h2 img {
    margin-right: 5px;
    vertical-align: middle;
  }

  .login_pop p {
    margin-top: 20px;
    font-size: 14px;
    color: #777777;
    text-align: center;
  }

  .login_pop a {
    display: inline-block;
    width: 125px;
    height: 42px;
    text-align: center;
    color: #fff;
    line-height: 42px;
    border-radius: 2px;
    background-color: #2daa66;
    margin-top: 20px;
    font-size: 16px;
  }

  .login_pop a:hover {
    opacity: .7;
  }

  .login_dv02 {
    display: none;
  }

  .Login .Login_box input[type="checkbox"] {
    text-indent: 0;
    margin: 0;
    width: 15px;
    height: 15px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    line-height: 15px;
    position: relative;
  }

  .Login .Login_box input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid;
    border-color: #bdbfc2;
  }

  .Login .Login_box input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #019443;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 12px;
    font-weight: bold;
    outline: none;
    border-color: #ccc;
    border-color: #019443
  }


  /* 寮圭獥 */
  .public_pop {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: none;
  }

  .public_pop .public_pop_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    background: #fff;
    border-radius: 6px;
    height: 529px;
  }

  .public_pop .public_pop_box h2 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    color: #333333;
    font-weight: 400;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
  }

  .public_pop .public_pop_box h2 span {
    font-size: 16px;
    color: #2daa66;
    position: absolute;
    top: -2px;
    right: 20px;
    cursor: pointer;
  }

  .public_pop.login_box .public_pop_box {
    width: auto;
    height: auto;
  }


  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  .loading div {
    width: 200px;
    height: 100px;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .loading p {
    margin-top: 10px;
    color: #fff;
    font-size: 14px;
  }

  #index_wapper {
    width: 100%;
    padding-top: 20px;
    text-align: center;
    position: relative;
  }

  #index_wapper i {
    background: url('../../../assets/indexImg/index_icon.png') no-repeat;
    display: inline-block;
    vertical-align: middle;
  }

  #index_wapper .index_title > h1 {
    text-align: center;
    margin-bottom: 16px;
  }

  #index_wapper .index_title .index_seach {
    margin: 24px auto 0 auto;
    width: 650px;
    height: 48px;
    border-radius: 10px;
    border: 2px solid #00903C;
    padding-left: 20px;
  }

  #index_wapper .index_title .index_seach input {
    width: 100%;
    border: none;
  }

  #index_wapper .index_title .index_seach button {
    width: 108px;
    min-width: 108px;
    height: 100%;
    color: #fff;
    background: #00903C;
    text-align: center;
    margin-right: -2px;
    border-radius: 0 10px 10px 0;
  }

  #index_wapper .index_title .index_seach button:hover {
    opacity: 0.7;
  }

  #index_wapper .index_nav {
    justify-content: center;
    margin-top: 40px;
  }

  #index_wapper .index_nav li {
    margin: 0 20px;
  }

  #index_wapper .index_nav li:hover a {
    color: #049948;
  }

  #index_wapper .index_nav li a i {
    margin-right: 13px;
    width: 24px;
    height: 24px;
  }

  #index_wapper .index_nav li a .index_nav_icon01 {
    background-position: -71px -23px;
  }

  #index_wapper .index_nav li a .index_nav_icon02 {
    background-position: -71px -67px;
  }

  #index_wapper .index_nav li a .index_nav_icon03 {
    background-position: -71px -110px;
  }

  #index_wapper .index_nav li a .index_nav_icon04 {
    background-position: -71px -150px;
  }

  #index_wapper #index_swiper_01 {
    margin-top: 40px;
    height: 60px;
    width: 100%;
  }

  #index_wapper #index_swiper_01 .swiper-slide {
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  #index_wapper #index_swiper_01 ul {
    width: 100%;
    background: #f7f7f7;
    border-radius: 4px;
    height: 60px;
    justify-content: space-around;
  }

  #index_wapper #index_swiper_01 ul li {
    width: 33%;
    line-height: 60px;
    overflow: hidden;
    position: relative;
  }

  #index_wapper #index_swiper_01 ul li:not(:last-child):after {
    position: absolute;
    content: '';
    display: inline-block;
    height: 18px;
    width: 1px;
    background: #DDDDDD;
    top: 22px;
    right: 0;
  }

  #index_wapper .This_activity {
    margin-top: 40px;
    height: 324px;
  }

  #index_wapper .This_activity .This_activity_left {
    width: 240px;
    min-width: 240px;
    background: linear-gradient(150deg, #23c96f, #019545);
    text-align: center;
    padding: 58px 0 46px 0;
  }

  #index_wapper .This_activity .This_activity_left h3 {
    color: #087234;
    font-size: 30px;
    line-height: 1;
  }

  #index_wapper .This_activity .This_activity_left p {
    text-align: center;
    font-size: 18px;
    color: #045B28;
    margin-top: 12px;
  }

  #index_wapper .This_activity .This_activity_left h2 {
    margin: 30px 0 25px 0;
    text-align: center;
    font-size: 26px;
    line-height: 1;
    color: #FFFD48;
  }

  #index_wapper .This_activity .This_activity_left span {
    color: #fff;
    font-size: 18px;
  }

  #index_wapper .This_activity .This_activity_left span span {
    font-size: 20px;
  }

  #index_wapper .This_activity .This_activity_left div {
    margin-top: 25px;
    text-align: center;
  }

  #index_wapper .This_activity .This_activity_left div a {
    display: inline-block;
    width: 68px;
    height: 22px;
    background: linear-gradient(150deg, #bef66d, #43b76c);
    box-shadow: 0px 4px 6px 0px rgba(116, 187, 81, 0.38);
    border-radius: 11px;
    text-align: center;
    line-height: 22px;
    color: #fff;
  }

  #index_wapper .This_activity .This_activity_left div a:hover {
    opacity: 0.7;
  }

  #index_wapper .This_activity .This_activity_right {
    width: 960px;
    border: 1px solid #dddddd;
    border-left: none;
    padding: 0 60px;
    position: relative;
  }

  #index_wapper .This_activity .This_activity_right #index_swiper_02 {
    width: 100%;
    height: 100%;
  }

  #index_wapper .This_activity .This_activity_right #index_swiper_02 .swiper-slide {
    text-align: center;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  #index_wapper .This_activity .This_activity_right .shop_list {
    width: 100%;
    text-align: center;
  }

  #index_wapper .This_activity .This_activity_right .shop_list .img_dv {
    width: 100%;
    height: 164px;
  }

  #index_wapper .This_activity .This_activity_right .shop_list .img_dv img {
    max-width: 187px;
    max-height: 164px;
    width: 100%;
  }

  #index_wapper .This_activity .This_activity_right .shop_list h2 {
    margin-top: 15px;
    color: #666;
    font-weight: bold;
    text-align: left;
  }

  #index_wapper .This_activity .This_activity_right .shop_list p {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    text-align: left;
  }

  #index_wapper .This_activity .This_activity_right .shop_list .price_dv {
    color: #F96363;
    font-size: 14px;
    text-align: left;
    margin-top: 16px;
  }

  #index_wapper .This_activity .This_activity_right .shop_list .price_dv span {
    color: #f72424;
    margin-left: 8px;
    font-size: 18px;
  }

  #index_wapper .This_activity .This_activity_right .index_swiper_02-next,
  #index_wapper .This_activity .This_activity_right .index_swiper_02-prev {
    width: 50px;
    height: 33px;
    background: #E5E5E5;
    text-align: center;
    line-height: 33px;
    border-radius: 50px 50px 0 0;
    position: absolute;
    cursor: pointer;
    outline: none;
  }

  #index_wapper .This_activity .This_activity_right .index_swiper_02-next:hover,
  #index_wapper .This_activity .This_activity_right .index_swiper_02-prev:hover {
    background: #ccc;
  }

  #index_wapper .This_activity .This_activity_right .index_swiper_02-next span,
  #index_wapper .This_activity .This_activity_right .index_swiper_02-prev span {
    border: solid #fff;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 5px;
    transform: rotate(45deg);
  }

  #index_wapper .This_activity .This_activity_right .index_swiper_02-next {
    left: -9px;
    top: 100px;
    transform: rotate(90deg);
  }

  #index_wapper .This_activity .This_activity_right .index_swiper_02-prev {
    right: -9px;
    top: 100px;
    transform: rotate(-90deg);
  }

  #index_wapper .main_product {
    padding: 40px 0 0 0;
    border: 1px solid #dddddd;
    width: 100%;
  }

  #index_wapper .main_product .main_product_title {
    padding-left: 24px;
    text-align: left;
  }

  #index_wapper .main_product .main_product_title span {
    color: #222;
    font-size: 24px;
    line-height: 1;
  }

  #index_wapper .main_product .main_product_title a {
    margin: 0 23px 0 14px;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #049948;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    vertical-align: bottom;
  }

  #index_wapper .main_product .main_product_title a em {
    font-style: normal;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    margin-bottom: 2px;
  }

  #index_wapper .main_product .main_product_list {
    margin-top: 26px;
    padding: 20px 14px;
  }

  #index_wapper .main_product .main_product_list ul {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #index_wapper .main_product .main_product_list ul li {
    width: 230px;
    text-align: left;
    padding: 20px 25px;
    transition: all 0.3s;
  }

  #index_wapper .main_product .main_product_list ul li:not(:nth-of-type(5n)) {
    margin-right: 5px;
  }

  #index_wapper .main_product .main_product_list ul li:hover {
    background: #F6F6F6;
    box-shadow: 0 15px 30px 0 rgba(31, 46, 62, 0.12);
  }

  #index_wapper .main_product .main_product_list ul li:hover .img_dv img {
    transform: translateY(-5px);
  }

  #index_wapper .main_product .main_product_list ul li:hover h2,
  #index_wapper .main_product .main_product_list ul li:hover p,
  #index_wapper .main_product .main_product_list ul li:hover .price_dv {
    transform: translateX(5px);
  }

  #index_wapper .main_product .main_product_list ul li .img_dv {
    width: 100%;
    height: 164px;
    text-align: center;
  }

  #index_wapper .main_product .main_product_list ul li .img_dv img {
    max-width: 187px;
    max-height: 164px;
    transition: all 0.3s;
  }

  #index_wapper .main_product .main_product_list ul li h2 {
    margin-top: 15px;
    color: #666;
    font-weight: bold;
    text-align: left;
    transition: all 0.3s;
  }

  #index_wapper .main_product .main_product_list ul li p {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    text-align: left;
    transition: all 0.3s;
  }

  #index_wapper .main_product .main_product_list ul li .price_dv {
    color: #F96363;
    font-size: 14px;
    text-align: left;
    margin-top: 16px;
    transition: all 0.3s;
  }

  #index_wapper .main_product .main_product_list ul li .price_dv span {
    color: #f72424;
    margin-left: 8px;
    font-size: 18px;
  }

  #index_wapper .public_dv .public_dv_title {
    height: 24px;
    margin: 30px 0 10px 0;
    align-items: center;
  }

  #index_wapper .public_dv .public_dv_title h2 {
    font-size: 24px;
    color: #222;
    padding-left: 10px;
    line-height: 1;
    height: 24px;
    border-left: 3px solid #049948;
  }

  #index_wapper .public_dv .public_dv_title a {
    color: #999;
    font-size: 14px;
  }

  #index_wapper .public_dv .public_dv_title a:hover {
    color: #049948;
  }

  #index_wapper .public_dv .public_list {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #index_wapper .public_dv .public_list li {
    width: 284px;
    text-align: left;
    padding: 20px 25px;
    margin-top: 20px;
    border: 1px solid #dddddd;
  }

  #index_wapper .public_dv .public_list li:not(:nth-of-type(4n)) {
    margin-right: 21px;
  }

  #index_wapper .public_dv .public_list li:hover {
    background: #F6F6F6;
  }

  #index_wapper .public_dv .public_list li .img_dv {
    width: 100%;
    height: 164px;
    text-align: center;
  }

  #index_wapper .public_dv .public_list li .img_dv img {
    max-width: 187px;
    max-height: 164px;
  }

  #index_wapper .public_dv .public_list li h2 {
    margin-top: 15px;
    color: #666;
    font-weight: bold;
    text-align: left;
  }

  #index_wapper .public_dv .public_list li p {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    text-align: left;
  }

  #index_wapper .public_dv .public_list li .price_dv {
    color: #F96363;
    font-size: 14px;
    text-align: left;
    margin-top: 16px;
  }

  #index_wapper .public_dv .public_list li .price_dv span {
    color: #f72424;
    margin-left: 8px;
    font-size: 18px;
  }

  #index_wapper .index_right_menu {
    display: none;
    width: 40px;
    position: fixed;
    margin-left: 1212px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  #index_wapper .index_right_menu ul {
    width: 100%;
  }

  #index_wapper .index_right_menu ul li {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
  }

  #index_wapper .index_right_menu ul li i {
    width: 25px;
    height: 25px;
  }

  #index_wapper .index_right_menu ul li a span {
    color: #fff;
    font-size: 12px;
    display: none;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon01 {
    background-position: -24px -23px;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon02 {
    background-position: -24px -65px;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon03 {
    background-position: -24px -108px;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon04 {
    background-position: -24px -151px;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon05 {
    background-position: -24px -191px;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon06 {
    background-position: -24px -230px;
  }

  #index_wapper .index_right_menu ul li .index_right_menu_icon07 {
    background-position: -24px -270px;
  }

  #index_wapper .index_right_menu ul li:hover {
    background: #008842;
    line-height: 16px;
    padding: 3px;
  }

  #index_wapper .index_right_menu ul li:hover a span {
    display: block;
  }

  #index_wapper .index_right_menu ul li:hover a i {
    display: none;
  }

  #index_wapper .index_right_menu ul li.active {
    background: #008842;
    line-height: 16px;
    padding: 3px;
  }

  #index_wapper .index_right_menu ul li.active a span {
    display: block;
  }

  #index_wapper .index_right_menu ul li.active a i {
    display: none;
  }
</style>
