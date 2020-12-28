<template>
  <div id="index_wapper" class="wapper">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>

    <div style="margin-top: 35px" class="details wapper" v-for="item in goodsDetailData">
      <div class="details_msg disbet">
        <!-- 商品详情图片 -->
        <div class="details_msg_left">
          <!--                    <div class="details_msg_swiper">-->
          <!--                      <div class="gallery-top">-->
          <!--                        getImg(item.gImg)-->

          <el-carousel height="420px" arrow="always">
            <el-carousel-item v-for="url in getImg(item.gImg)">
              <el-image :src="url"></el-image>
            </el-carousel-item>
          </el-carousel>
          <!--                      </div>-->
          <!--                    </div>-->
        </div>
        <div class="details_msg_right">

          <div class="details_msg_title disbet">
            <div>
              <h2>{{item.gName}}</h2>
              <p>{{item.gDescribe}}</p>
              <p>产&emsp;&emsp;地:&emsp;<span class="col222">湖南长沙</span></p>
              <!--              <p>产品周期:&emsp;<span class="col222">12月-次年3月</span></p>-->
              <p>库&emsp;&emsp;存:&emsp;<span class="col222" >{{item.warehouseNum}}</span></p>
            </div>
          </div>

          <div class="details_msg_dv02 price">
            <em>价&emsp;&emsp;格:</em>
            <span>&yen;<span>{{item.gPriceOut}}</span></span>
          </div>

          <div class="details_msg_dv02">
            <em>发&ensp;货&ensp;地:</em>
            <span><span class="col222">湖南长沙</span> 丨 发货时间：<span class="col222">48小时内发货</span></span>
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
                    <el-image :src="getFirstImg(item.gImg)"></el-image>
                  </em>
                  <span class="col222">{{item.gName}}</span>
								</span>
                <span style="color:#f72424">总计：&yen; {{goods_SumPrice}}</span>
                <el-input-number v-if="item.warehouseNum > 0"  @change="sumPrice(item.gPriceOut)"
                                 v-model="num" :min="0"
                                 :max="item.warehouseNum"></el-input-number>
                <el-input-number v-else disabled="true" @change="sumPrice(item.gPriceOut)" v-model="num" :min="0"
                                 :max="item.warehouseNum"></el-input-number>
              </div>
            </div>
          </div>

          <div class="details_msg_dv03">
            <el-button type="danger" @click="buy(item)">立即购买</el-button>
            <el-button type="danger" @click="addCart(item)" icon="el-icon-shopping-cart-2">加入购物车</el-button>
          </div>

        </div>
      </div>

      <!--      <div class="details_details disbet">-->

      <!--        <div class="details_details_right">-->
      <!--          <div class="details_right_nav">-->
      <!--            <ul class="disbet">-->
      <!--              <li class="active" data-id='1'>-->
      <!--                物流规则-->
      <!--              </li>-->
      <!--              <li data-id='1'>售后标准</li>-->
      <!--              <li data-id='1'>商品详情</li>-->
      <!--              <li data-id='1'>商品评论</li>-->
      <!--            </ul>-->
      <!--          </div>-->
      <!--          <div class="details_details_right_dv">-->
      <!--            <div class="details_rule details_public_dv">-->
      <!--              <h2>物流规则</h2>-->
      <!--              <p>新疆,西藏,青海,海南,内蒙古,甘肃,宁夏,黑龙江,辽宁,吉林不发</p>-->
      <!--            </div>-->
      <!--            <div class="details_rule01 details_public_dv">-->
      <!--              <h2>售后标准</h2>-->
      <!--              <div style="margin-top: 37px;">-->
      <!--                <p>-->
      <!--                  1.生鲜水果一经发出，不支持退款及拒签。（拒签不予售后)<br>2.签收后24小时内把快递面单和所有坏果（切开，露出不能食用部分）一起同框拍照反馈（照片清晰可见快递单号及坏果原因），逾期不予处理，不接受丢弃之说。<br>3不支持小视频。不能提供清晰可见的快递面单加坏果同框合拍照片，一律不予理赔；不接受丢弃之说。<br>4.接受未开箱前的称重，并附上清晰可见的面单正面照片和电子称刻度照片一张，开箱后称重的不予理赔。由于水果大小不一，称重不能特别精准，所以有上下2两幅度，谢谢望理解！<br>5.因客户个人原因延误签收，拒接或无人接听，电话停机-->
      <!--                  ，地址不详，地址错误等售后不在赔付理赔范围内。<br>6.个人口感、喜好、轻微磕碰，枝磨，瓜果斑属正常现象（望谅解）不属于理赔范围。<br>7.任何水果做不到到货百分百新鲜，快递的在途周期一定程度上会影响水果的新鲜度，在不影响食用的前提下不予理赔。<br>8.签收后24小时内果皮有轻微变化、瑕疵不影响食用，不予理赔。-->
      <!--                </p>-->
      <!--              </div>-->
      <!--              <div class="Bad_fruit disbet">-->
      <!--                <div>-->
      <!--                  <img src="https://img.inongjia.net/b2b/product/NJ0301/aftersale/1.jpg?x-oss-process=image/resize,m_fill,h_192,w_222"-->
      <!--                       alt="">-->
      <!--                  <div>坏果</div>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                  <img src="https://img.inongjia.net/b2b/product/NJ0301/aftersale/2.jpg?x-oss-process=image/resize,m_fill,h_192,w_222"-->
      <!--                       alt="">-->
      <!--                  <div>重量不足</div>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                  <img src="https://img.inongjia.net/b2b/product/NJ0301/aftersale/3.jpg?x-oss-process=image/resize,m_fill,h_192,w_222"-->
      <!--                       alt="">-->
      <!--                  <div>果径不达标</div>-->
      <!--                </div>-->
      <!--                <div>-->
      <!--                  <img src="https://img.inongjia.net/b2b/product/NJ0301/aftersale/4.jpg?x-oss-process=image/resize,m_fill,h_192,w_222"-->
      <!--                       alt="">-->
      <!--                  <div>物流停滞</div>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="details_rule02 details_public_dv">-->
      <!--              <h2>商品详情</h2>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
  import imgZoom from 'vue2.0-zoom'

  export default {
    // props: {
    //   configs: {
    //     width: 500,
    //     height: 380,
    //     maskWidth: 100,
    //     maskHeight: 100,
    //     maskColor: 'red',
    //     maskOpacity: 0.2
    //   }
    // },
    data() {
      return {
        goodsDetailData: JSON.parse(sessionStorage.getItem('goodsDetailData')),
        goods_SumPrice: 0,
        num: 0,
        firstImg: '',
      }
    },
    methods: {
      goBack() {
        this.$router.push("/shoppingsystem/index")
      },
      // getGoodsDetailData(data){
      //   console.log(data)
      //   this.data  = data;
      // },
      //拿到第一个图片
      getFirstImg(url) {
        let img = url.split(",");
        var firstImg = img[0]
        if (img.length == 1) {
          firstImg = img[0]
        }
        this.firstImg = firstImg;
        // var img = url;
        // var index = img.indexOf(',');
        // var firstImg = "";
        // if (index == -1) {
        //   return img
        // }
        // imgurl = img.substr(0, img.indexOf(','))
        // return imgurl
        return firstImg
      },
      //拿到除第一个的图片
      getImg(url) {
        let img = url.split(",");
        let imgUrl = img.slice(1, img.length)
        if (img.length === 1)
          imgUrl = img.slice(0, img.length)
        return imgUrl;
      },
      //计算总价
      sumPrice(goods_Price) {
        this.goods_SumPrice = Number(goods_Price) * Number(this.num)
      },
      //直接购买
      buy(item) {
        let num = this.num;
        if (num === 0) {
          this.$alert("请输入你需要购买的数量！", "提示", {
            confirmButtonText: '确认'
          })
          return
        }
        if (this.$parent.user == null || this.$parent.user === '') {
          this.$router.push("/shoppingsystem/indexLogin")
          return;
        }
        var _this = this;
        var params1 = new URLSearchParams();
        params1.append("uid", this.$parent.user.user_id);
        params1.append("gId", item.gId);
        params1.append("gName", item.gName);
        params1.append("gImg", this.firstImg);
        params1.append("gPrice", item.gPriceOut);
        params1.append("num", num);
        params1.append("sumPrice", this.goods_SumPrice);
        this.$axios.post("gIdExistShoppingCart.action", params1).then((result) => {
          if (result.data != '' && result.data != undefined) {
            var params2 = new URLSearchParams();
            params2.append("id", result.data.id);
            params2.append("num", num + result.data.num);
            params2.append("sumPrice", (num + result.data.num) * item.gPriceOut);
            _this.$axios.post("updateGoodsNumAndSumPrice.action", params2).then((result) => {
              if (result.data > 0) {
                _this.$message.success("加入购物车成功");
                _this.$parent.getShoppingCountData();
              } else {
                _this.$message.error("加入购物车成功,未知错误,请重试");
              }
            }).catch((error) => {
              alert(error);
            })
          } else {
            _this.$axios.post("addShoppingCart.action", params1).then((result) => {
              if (result.data > 0) {
                _this.$parent.getShoppingCountData();
              } else {
                _this.$message.error("加入购物车成功,未知错误,请重试");
              }
            }).catch((error) => {
              alert(error);
            })
          }
          this.$router.push("/shoppingsystem/cart")
        }).catch((error) => {
          alert(error);
        })
      },
      //加入购物车
      addCart(item) {
        let num = this.num;
        if (num === 0) {
          this.$alert("请输入你需要购买的数量！", "提示", {
            confirmButtonText: '确认'
          })
          return
        }
        if (this.$parent.user == null || this.$parent.user === '') {
          this.$router.push("/shoppingsystem/indexLogin")
          return;
        }
        var _this = this;
        var params1 = new URLSearchParams();
        params1.append("uid", this.$parent.user.user_id);
        params1.append("gId", item.gId);
        params1.append("gName", item.gName);
        params1.append("gImg", this.firstImg);
        params1.append("gPrice", item.gPriceOut);
        params1.append("num", num);
        params1.append("sumPrice", this.goods_SumPrice);
        this.$axios.post("gIdExistShoppingCart.action", params1).then((result) => {
          if (result.data != "" && result.data != undefined) {
            var params2 = new URLSearchParams();
            params2.append("id", result.data.id);
            params2.append("num", num + result.data.num);
            params2.append("sumPrice", (num * 1 + result.data.num * 1) * item.gPriceOut);
            _this.$axios.post("updateGoodsNumAndSumPrice.action", params2).then((result) => {
              if (result.data > 0) {
                _this.$message.success("加入购物车成功");
                _this.$parent.getShoppingCountData();
              } else {
                _this.$message.error("加入购物车成功,未知错误,请重试");
              }
            }).catch((error) => {
              alert(error);
            })
          } else {
            _this.$axios.post("addShoppingCart.action", params1).then((result) => {
              if (result.data > 0) {
                _this.$message.success("加入购物车成功");
                _this.$parent.getShoppingCountData();
              } else {
                _this.$message.error("加入购物车成功,未知错误,请重试");
              }
            }).catch((error) => {
              alert(error);
            })
          }
        }).catch((error) => {
          alert(error);
        })
      }
    },
    created() {
      // this.bus.$on("goodsDetailData",this.getGoodsDetailData.bind(this));
      var goodsDetailData = this.goodsDetailData
      if (goodsDetailData === null || goodsDetailData === undefined)
        this.$router.push("/shoppingsystem/index")

    },

  }
</script>

<style>
  .col111 {
    color: #ff0037;
    font-size: 16px;
  }

  /* 居中 */
  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }

  .col222 {
    margin-left: 10px;
    font-size: 14px;
    color: #222 !important;
  }

  #index_wapper {
    width: 100%;
    padding-top: 20px;
    text-align: center;
    position: relative;
  }

  .details .details_msg .details_msg_left {
    height: 420px;
    width: 420px;
    background-color: #ffffff;
    border: solid 1px #cccccc;
  }

  .details_msg_dv02 {
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
    width: 110px;
    min-width: 110px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv span {
    color: #222;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv > div {
    width: 140px;
    max-width: 140px;
    border-radius: 2px;
    height: 28px;
    margin-left: 90px;
  }

  .details .details_msg .details_msg_right .details_msg_dv02.ck_dv02 > div .ck_dv02_dv em {
    padding-top: 0;
    border: 1px solid #b8b7bd;
    text-align: center;
    margin-right: 50px;
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
    float: right;
    margin-top: 30px;
    justify-content: center;
  }
</style>
