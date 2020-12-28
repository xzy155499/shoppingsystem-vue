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
          <a href="javascript:"><em></em></a>
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
                <p style="color: #222;font-size: 16px">甜橙</p>
                <p>好吃的甜橙</p>
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
          <a href="javascript:" @click="moreFruits">查看更多 ></a>
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
          <a href="javascript:" @click="moreCooked">查看更多 ></a>
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
          <a href="javascript:" @click="moreSnacks">查看更多 ></a>
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
          <a href="javascript:" @click="moreElse">查看更多 ></a>
        </div>
        <el-row>
          <el-col v-for="item in ElseData.rows" :xs="24" :sm="7" :md="6" :lg="6" :xl="6">
            <br>
            <div @click="detail(item.gId)">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="goods-list-card-body">
                  <div class="goods-list-tag-group">
                    <el-badge class="item" v-if="item.warehouseNum === 0" value="缺货"></el-badge>
                    <el-badge class="item" v-if="item.gNum >= 400" value="hot"></el-badge>
                    <el-badge class="item" v-else-if="item.gNum < 100 && item.gNum > 20" value="推荐"
                              type="success"></el-badge>
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
        parentTypeId: null,
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
      //更多 水果
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
      //更多 熟食
      moreCooked() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", "20");
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
      //更多 零食
      moreSnacks() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", "20");
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
      //更多 其他
      moreElse() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", "20");
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
      //商品详情页面
      detail(goods_id) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("id", goods_id);
        this.$axios.post("queryGoodsById.action", params).then(function (result) {
          var data = result.data;
          sessionStorage.setItem('goodsDetailData', JSON.stringify(data));

          // _this.bus.$emit('goodsDetailData', result.data);
          _this.$router.push('/shoppingsystem/detail')
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
    color: #ff0037;
    font-size: 16px;
  }

  /*********************************/

  a {
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  /* 居中 */
  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }

  .mart24 {
    margin-top: 24px;
  }


  .disbet {
    display: flex;
    justify-content: space-between;
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

  #index_wapper .index_nav li a .index_nav_icon03 {
    background-position: -71px -110px;
  }

  #index_wapper .index_nav li a .index_nav_icon04 {
    background-position: -71px -150px;
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

  #index_wapper .This_activity .This_activity_right .index_swiper_02-next span,
  #index_wapper .This_activity .This_activity_right .index_swiper_02-prev span {
    border: solid #fff;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 5px;
    transform: rotate(45deg);
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


</style>
