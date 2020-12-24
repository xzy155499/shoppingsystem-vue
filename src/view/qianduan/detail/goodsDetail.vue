<template>
  <div id="index_wapper" class="wapper">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <!--        <div class="goods-detail" v-for="item in goodsDetailData">-->
    <!--          <el-row>-->
    <!--            <el-col :xs="24" :sm="10" :md="6" :lg="6" :xl="6">-->
    <!--              <br>-->
    <!--              <div>-->
    <!--                <el-card>-->
    <!--                  <div>-->
    <!--                    <el-image class="goods-list-image" :src="getImg(item.gImg)"></el-image>-->
    <!--                  </div>-->
    <!--                </el-card>-->
    <!--              </div>-->
    <!--            </el-col>-->
    <!--          </el-row>-->
    <!--          <div>啦啦啦{{item.gName}}-->
    <!--          </div>-->
    <!--        </div>-->
    <div style="margin-top: 35px" class="details wapper" v-for="item in goodsDetailData">
      <div class="details_msg disbet">
        <!-- 商品详情图片 -->
        <div class="details_msg_left">
                    <div class="details_msg_swiper">
                      <div class="gallery-top">
          <el-image :src="getImg(item.gImg)"></el-image>
                      </div>
                    </div>
        </div>
        <div class="details_msg_right">

          <div class="details_msg_title disbet">
            <div>
              <h2>{{item.gName}}</h2>
              <p>{{item.gDescribe}}</p>
              <p>产品周期:&emsp;<span class="col222">12月-次年3月底</span></p>
              <p>产&emsp;&emsp;地:&emsp;<span class="col222">不详</span></p>
            </div>
          </div>

          <div class="details_msg_dv02 price">
            <em>价&emsp;&emsp;格:</em>
            <span>&yen;<span>{{item.gPriceOut}}</span></span>
          </div>

          <div class="details_msg_dv02">
            <em>发&ensp;货&ensp;地:</em>
            <span><span class="col222">湖南长沙</span> 丨 发货时效：<span class="col222">24小时内出单号48小时内发货</span></span>
          </div>

          <div class="details_msg_dv02">
            <em>快&emsp;&emsp;递:</em>
            <span class="col222">荣荣快递</span>
          </div>

          <div class="details_msg_dv02 ck_dv02 disbet" style="margin-top: 20px">
            <em>购买数量:</em>
            <div>
              <div class="disbet ck_dv02_dv">
								<span>
									<em :title="item.gName">
                    <el-image :src="getImg(item.gImg)"></el-image>
                  </em>
									{{item.gName}}
								</span>
                <span style="color:#f72424">&yen; {{goods_SumPrice}}</span>
                <el-input-number @change="sumPrice(item.gPriceOut)" v-model="num" :min="0" :max="1000"></el-input-number>
              </div>
            </div>
          </div>

          <div class="details_msg_dv03 disbet">
            <el-button type="success" icon="el-icon-shopping-cart-2">加入购物车</el-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsDetailData: [],
        goods_SumPrice: 0,
        num: 0,
      }
    },
    methods: {
      goBack() {
        this.$router.push("/shoppingsystem/index")
      },
      getImg(url) {
        let img = url.split(",");
        var firstImg = img[1]
        if (img.length == 1) {
          firstImg = img[0]
        }
        return firstImg
      },
      //计算总价
      sumPrice(goods_Price){
        this.goods_SumPrice = Number(goods_Price) * Number(this.num)
      }
    },
    created() {
      this.goodsDetailData = this.$route.query.data
      console.log(JSON.stringify(this.goodsDetailData))
    }
  }
</script>

<style>
  .col111{
    color: #ff0037;
    font-size: 16px;
  }

  .col222 {
    margin-left: 10px;
    font-size: 14px;
    color: #222 !important;
  }
  .details .details_msg .details_msg_left  {
    height: 420px;
    width: 420px;
    background-color: #ffffff;
    border: solid 1px #cccccc;
  }
  .details_msg_dv02{
    text-align: left;
  }
  .details .details_msg .details_msg_right .details_msg_title {
    text-align: left;
  }
  .details .details_msg .details_msg_right .details_msg_title h2 {
    color: #111111;
    font-size: 18px;
  }

  .details .details_msg .details_msg_right .details_msg_title p {
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
  }
  .details .details_msg .details_msg_right .details_msg_dv02 {
    margin-top: 14px;
    width: 100%;
  }

  .details > .details_msg > .details_msg_right > .details_msg_dv02.price span {
    color: #ff0037;
    font-size: 16px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.price span span {
    font-size: 24px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv {
    position: relative;
    height: 63px;
    align-items: center;
    border-bottom: 1px solid #eee;
    justify-content: flex-start;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv > span:nth-of-type(1) {
    display: block;
    width: 330px;
    min-width: 330px;
    max-width: 330px;
    display: flex;
    align-items: center;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv > span:nth-of-type(2) {
    display: block;
    width: 70px;
    min-width: 70px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv span {
    color: #222;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv > div {
    width: 140px;
    max-width: 140px;
    border-radius: 2px;
    height: 28px;
    margin-left: 130px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv em {
    padding-top: 0;
    border: 1px solid #b8b7bd;
    text-align: center;
    margin-right: 5px;
    box-sizing: border-box;
    height: 60px;
    cursor: pointer;
    vertical-align: middle;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv em:hover {
    border: 1px solid #2daa66;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv em img {
    width: 78px;
    height: 58px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02 em {
    font-style: normal;
    font-size: 14px;
    color: #999999;
    display: inline-block;
    width: 80px;
    text-align: left;
    min-width: 80px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02 span {
    font-size: 14px;
    color: #999999;
  }

  .details .details_msg .details_msg_right .details_msg_dv03 {
    margin-top: 40px;
    justify-content: center;
  }
</style>
