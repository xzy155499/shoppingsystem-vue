<template>
  <div id="index_wapper" class="wapper" style="margin-top: 50px;margin-bottom: 100px">
    <div style="text-align: right">
      <a style="color: #ff0037;" href="javascript:" @click="continueShopping">继续购物</a>
    </div>
    <el-tabs value="cart">
      <el-tab-pane style="margin-top: 30px" label="购物车" name="cart">

        <el-table @select="selectGoods" @select-all="selectAllGoods" :data="shoppingCartData" style="width: 100%"
                  max-height="600">
          <el-table-column width="60" type="selection">
          </el-table-column>

          <el-table-column prop="gImg" label="商品" width="150">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.gImg"></el-image>
            </template>
          </el-table-column>

          <el-table-column prop="gName" width="150">
          </el-table-column>

          <el-table-column prop="gPrice" label="单价" width="200">
            <template slot-scope="scope">
              <span><span class="colorRed">&yen;{{scope.row.gPrice}}</span></span>
            </template>
          </el-table-column>

          <el-table-column prop="num" label="数量" width="250">
            <template slot-scope="scope">
              <el-input-number style="width: 150px;" @change="changeNum(scope.row.id)" v-model="num=scope.row.num"
                               :min="1"></el-input-number>
            </template>
          </el-table-column>

          <el-table-column prop="sumPrice" label="小计金额" width="200">
            <template slot-scope="scope">
              <span class="colorRed">&yen;<span class="colorRed size">{{scope.row.sumPrice}}</span></span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="del(scope.row.id)" icon="el-icon-delete" type="text" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="shoppingCartData.length > 0">
          <el-row>
            <el-card shadow="hover" style="margin-top: 50px;width: 99%;height: 100px">
              <el-col :span="6" :offset="5" style="margin-top: 20px">
                <span>已选 <span class="colorRed size">{{selectGoodsCount}}</span>个商品&emsp;<span class="colorRed size">{{selectGoodsNum}}</span>件</span>
              </el-col>
              <el-col :span="4" style="margin-top: 20px">
                <span>合计金额：<span class="colorRed">&yen;</span><span
                  class="colorRed size">{{goodsSumPrice}}</span></span>
              </el-col>
              <el-col :span="8" style="margin-top: 15px;text-align: right">
                <el-button @click="pay">结算</el-button>
              </el-col>
            </el-card>
          </el-row>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: this.$parent.user,
        shoppingCartData: [],
        num: 0,
        //商品id
        gIdArr: [],
        //商品数量
        numArr: [],
        //商品总计
        sumArr: [],
        //商品数量
        selectGoodsCount: 0,
        //商品中的几件
        selectGoodsNum: 0,
        goodsSumPrice: 0,
        select: [],
      }
    },
    methods: {
      //获取用户购物车数据
      getShoppingCartData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("uid", this.user.user_id);
        this.$axios.post("queryUserShoppingCartByUid.action", params).then(function (result) {
          _this.shoppingCartData = result.data;
        }).catch(function (error) {
          alert(error)
        })
      },
      //继续购物
      continueShopping() {
        this.$router.push('/shoppingsystem/index')
      },
      //选择商品 计算总计 bug
      goodsSumPriceAndGoodsNum(id) {
        this.goodsSumPrice = 0
        var num=0;
        for (let i = 0; i < this.shoppingCartData.length; i++) {
          if (this.shoppingCartData[i].id == id) {
            this.shoppingCartData[i].sumPrice = this.shoppingCartData[i].num * this.shoppingCartData[i].gPrice;
          }
          for (let j = 0; j < this.select.length; j++) {
            if (this.shoppingCartData[i].id == this.select[j].id) {
              this.goodsSumPrice += this.select[i].num * this.select[i].gPrice;

              num+=this.select[j].num;
            }
          }
        }
        this.selectGoodsNum = num;
      },
      //加减商品数量
      changeNum(id) {
        this.goodsSumPriceAndGoodsNum(id)
        var params = new URLSearchParams();
        params.append("id", id);
        params.append("num", this.num.num);
        var sumPrice = this.num.num * this.num.gPrice
        params.append("sumPrice", sumPrice);
        this.$axios.post("updateGoodsNumAndSumPrice.action", params).then(function (result) {

        }).catch(function (error) {
          alert(error)
        })
      },
      //删除购物车的商品
      del(id) {
        this.$confirm('确定要删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '再想想',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("delShoppingCartById.action", params).then(function (result) {
            if (result.data > 0) {
              _this.$message.success("删除成功");
              _this.$parent.getShoppingCountData();
            } else {
              _this.$message.error("删除失败,请重试")
            }
            _this.getShoppingCartData();
          }).catch(function (error) {
            alert(error)
          })
        }).catch((error) => {
          console.log(error)
        });
      },
      //用户选择商品 获取已选商品数量
      selectGoods(selection, row) {
        this.select = selection;
        var _this = this;
        this.selectGoodsNum = 0;
        this.goodsSumPrice = 0;
        this.selectGoodsCount = selection.length;
        selection.forEach((item) => {
          _this.goodsSumPrice += item.sumPrice;
          _this.gIdArr.push(item.gId);
          _this.numArr.push(item.num);
          _this.sumArr.push(item.sumPrice);
          _this.selectGoodsNum += item.num;
        })
        console.log("单选" + this.gIdArr + this.numArr + this.sumArr);
      },
      //用户全部选择
      selectAllGoods(selection) {
        this.select = selection;
        var _this = this;
        this.goodsSumPrice = 0;
        this.selectGoodsNum = 0;
        this.selectGoodsCount = selection.length;
        selection.forEach((item) => {
          _this.goodsSumPrice += item.sumPrice;
          _this.gIdArr.push(item.gId);
          _this.numArr.push(item.num);
          _this.sumArr.push(item.sumPrice);
          _this.selectGoodsNum += item.num;
        })
        console.log("全选" +this.gIdArr + this.numArr + this.sumArr)
      },
      //结算 支付
      pay() {
        if (this.selectGoodsCount === 0) {
          this.$alert("请勾选你要购买的商品", '提示', {
            confirmButtonText: '确认'
          })
          return
        }
        var vNow = new Date();
        var orderId = "";
        orderId += String(vNow.getFullYear());
        orderId += String(vNow.getMonth() + 1);
        orderId += String(vNow.getDate());
        orderId += String(vNow.getHours());
        orderId += String(vNow.getMinutes());
        orderId += String(vNow.getSeconds());
        orderId += String(vNow.getMilliseconds());
        var _this = this;
        var params1 = new URLSearchParams();
        params1.append("orderId", orderId);
        params1.append("userId",this.user.user_id);
        params1.append("sum",this.goodsSumPrice);

        var params2 = new URLSearchParams();
        params2.append("orderId",orderId);
        params2.append("gIdArr",this.gIdArr);
        params2.append("numArr",this.numArr);
        params2.append("sumArr",this.sumArr);
        console.log(params1)
        console.log(params2)
        this.$axios.post("addOrderInfo.action", params1).then(function (result) {
          if (result.data > 0) {
            _this.$axios.post("addOrderInfo.action", params2).then(function (result) {
              _this.$router.push('/shoppingsystem/orderBuy')
            }).catch(function (error) {
              alert(error)
            })

          } else {
            _this.$message.error("创建订单失败,请重试")
          }
        }).catch(function (error) {
          alert(error)
        })


      }
    },
    created() {
      if (this.user == '' || this.user == null) {
        this.$alert("请先登录", '提示', {
          confirmButtonText: '确认'
        })
      } else {
        this.getShoppingCartData();
      }
    }
  }
</script>

<style>
  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }

  .size {
    font-size: 25px;
  }

  .colorRed {
    color: #ff0037;
  }
</style>
