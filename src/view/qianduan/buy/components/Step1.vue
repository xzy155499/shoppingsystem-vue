<template>
  <div class="page-order-comfirm" id="orderComfirm">
    <div class="section-con">
      <div class="sec-title-border clearfix">
        <h3 style="margin-left: 80px">收货地址</h3>
        <a href="javascript:" class="right">+新增地址</a>
      </div>

      <div class="addressBox clearfix" >
        <div class="address-item" :class="{'selected': true}">
          <div class="address-item-in" >
            <div>收货人：荣荣</div>
            <div>地址：湖南省达嘉维康</div>
            <div>电话：11111</div>
            <div class="delete" @click="delAddress"><i class="el-icon-delete"></i></div>
          </div>
        </div>
      </div>
      <div class="sec-title-border clearfix">
        <h3>配送方式</h3>
      </div>
      <div class="style-list delivery">
        <ul class="clearfix">
<!--          :class="{'selected':delivery == 1}"-->
          <li class="div-right selected" >上门自提</li>
        </ul>
      </div>
      <div class="sec-title-border clearfix">
        <h3>支付方式</h3>
      </div>
      <div class="style-list pay">
        <ul class="clearfix">
          <li :class="{'selected':payment==1}">支付宝支付</li>
          <li class="div-right" :class="{'selected':payment==2}">微信支付</li>
          <li :class="{'selected':payment==3}">余额支付</li>
        </ul>
      </div>
      <div class="sec-title-border mb0 clearfix">
        <h3>订单详情</h3>
      </div>
      <div class="orderBox">
        <div class="orderC-table">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
            <thead>
            <tr>
              <th width="30%">商品</th>
              <th width="20%">收货人</th>
              <th width="20%">金额</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in 1">
              <td class="text-left">
                <div class="order-gw clearfix">
                  <div class="order-img"><img/></div>
                  <div class="order-sum">
                    <h2><a>0</a></h2>
                    <div class="parameter">0</div>
                  </div>
                </div>
              </td>
              <td>0</td>
              <td><span class="noTel">总计</span><span class="priceD">￥0</span></td>
            </tr>
            </tbody>
          </table>
          <div class="orderC-total">
            <div class="order-t">
              <dl class="clearfix">
                <dd class="dl_ddL">商品总额：</dd>
                <dd style="color: #c81623" class="dl_ddR">￥</dd>
              </dl>
            </div>
            <div class="order-fare">
              <dl class="clearfix">
                <dd class="dl_ddL">运　　费：</dd>
                <s style="color: #c81623" class="dl_ddR">￥0(包邮)</s>
              </dl>
            </div>
            <div class="order-sum">
              <dl class="clearfix">
                <dd class="dl_ddL">应付总额：</dd>
                <dd class="dl_ddR"><span class="fontBig">￥</span></dd>
              </dl>
            </div>
          </div>
          <div class="order-message">
            <dl class="clearfix">
              <dd class="dl_ddL">给卖家留言：</dd>
              <dd class="dl_ddR">
                <textarea class="textarea-gw" v-model="msg" maxlength="100"></textarea>
                <span>{{msg.length}}/99</span>
              </dd>
            </dl>
          </div>
          <div class="clear"></div>
          <div class="order-submit">
            <a href="javascript:" class="btn-red btn-submit" @click="handleSubmit">提交订单</a>
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
        addrIsShow: false,

        formItem: {
          addr_person: '',
          addr_province: '',
          addr_city: '',
          addr_district: '',
          addr_moreD: '',
          addr_tel: '',
          addr_ftel: '',
          addr_email: ''
        },
        msg: '',//留言
        payment: 1,//支付方式
        countNum1: 0
      }
    },
    methods: {
      //步骤
      handleSubmit() {
        // this.$refs.form.validate((valid) => {
        //   if (valid) {
            this.$emit('change-step', 1)
          // }
        // })
      },
      // 删除用户 地址
      delAddress(){
        this.$confirm('确定要删除该地址吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '再想想',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {

        }).catch((error)=>{

        })
      }
    },
  }
</script>

<style>
  img {
    max-width: 100%;
  }

  .page-order-comfirm {
    width: 1200px;
    margin: 0 auto;
  }

  .section-con {
    background: #FFFFFF;
    padding: 10px 30px;
    color: #363636;
    margin-bottom: 20px;
  }

  .sec-title-border {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20px;
    height: 32px;
  }

  .sec-title-border h3 {
    color: #373737;
    font-size: 16px;
    line-height: 2;
    margin: 0;
    font-weight: 600;
    display: inline;
  }

  .sec-title-border a.right {
    float: right;
    color: #5b5b5b;
    padding-right: 10px;
    padding-top: 8px;
    text-decoration: none;
  }

  .sec-title-border a:hover {
    text-decoration: underline;
  }

  .sec-title-border span {
    margin-left: 20px;
    display: inline;
    color: #bcbcbc;
  }

  .sec-title-noborder {
    border-bottom: none;
  }

  .mark {
    color: #f00;
  }

  .addressAddBox {
    padding: 0 3px;
  }

  .div-form-gw {
    margin-bottom: 10px;
  }

  .addr-add-form .div-form-gw label {
    display: block;
    margin-bottom: 5px;
  }

  .input-gw {
    background: #f3f3f3;
    padding: 8px;
    border: none;
  }

  .input-gw220 {
    width: 220px;
  }

  .input-gw150 {
    width: 153px;
  }

  .input-gw480 {
    width: 480px;
  }

  .div-three .div-three-item {
    float: left;
    margin-right: 10px;
  }

  .div-half .div-half-item {
    float: left;
    margin-right: 24px;
  }

  .btn-gray-gw {
    background: #f3f3f3;
    border: 1px solid #dddddd;
    color: #363636;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    padding: 7px 12px;
  }

  .btn-gray-gw:hover {
    background-color: #f9f9f9;
  }

  .addressBox {
    margin-bottom: 15px;
    margin-left: -7px;
    margin-right: -7px;
  }

  .addressBox .address-item {
    float: left;
    width: 50%;
    line-height: 2;
    color: #848383;
    cursor: pointer;
  }

  .addressBox .address-item:nth-child(2n+1) {
    clear: both;
  }

  .addressBox .address-item .address-item-in {
    padding: 15px 60px 15px 30px;
    margin: 0 7px 15px 7px;
    border: 2px solid #c5c5c5;
    position: relative;
  }

  .addressBox .address-item.selected .address-item-in {
    border-color: #c81623;
  }

  .addressBox .address-item .delete {
    display: none;
    position: absolute;
    right: 15px;
    top: 15px;
  }

  .addressBox .address-item .delete .icon_delete {
    display: block;
    width: 18px;
    height: 18px;
    /*background: url(../images/delete.png) no-repeat center;*/
  }

  .addressBox .address-item:hover .delete {
    display: block;
  }

  .style-list ul, .style-list li {
    list-style: none;
  }

  .style-list li {
    float: left;
    cursor: pointer;
    padding: 8px 40px;
    border: 1px solid #c5c5c5;
    margin-right: 35px;
    font-size: 110%;
    text-align: center;
  }

  .style-list li.selected {
    border-color: #c81623;
  }

  .delivery, .pay {
    margin-bottom: 50px;
  }

  .orderC-tb {
    margin-bottom: 12px;
    line-height: 1.8;
  }

  .orderC-tb, .orderC-tb a {
    color: #3e3e3e;
  }

  .orderC-tb a:hover {
    color: #000;
  }

  .orderC-tb th {
    background: #F5F5F5;
    padding: 6px 8px;
    text-align: center;
    font-weight: normal;
  }

  .orderC-tb td {
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
  }

  .orderC-tb th.text-left, .orderC-tb td.text-left {
    text-align: left;
  }

  .orderC-tb th.text-right, .orderC-tb td.text-right {
    text-align: right;
  }

  .orderC-tb-border {
    border: 1px solid #cccccc;
  }

  .orderC-tb-border td {
    border: 1px solid #dddddd;
    border-top: 0;
    padding: 0;
  }

  .orderC-tb .check_td {
    padding: 0 0 0 10px;
    text-align: left;
  }

  .order-gw {
    padding: 15px 8px;
  }

  .order-gw .order-img {
    width: 60px;
    height: 60px;
    border: 1px solid #cccccc;
    float: left;
  }

  .order-gw .order-img img {
    width: 100%;
    height: 100%;
  }

  .order-gw .order-sum {
    margin-left: 80px;
  }

  .order-gw .order-sum h2 {
    font-size: 14px;
    font-weight: normal;
    margin: 0;
  }

  .order-gw .order-sum p {
    line-height: 1.2;
  }

  .orderC-tb-border td .order-gw {
    border-bottom: 1px solid #dddddd;
  }

  .orderC-tb-border td .order-gw:last-child {
    border-bottom: 0;
  }

  .orderC-tb .paymonney {
    border-bottom: 1px solid #f5f5f5;
  }

  .orderC-tb .paymonney, .orderC-tb .payway, .orderC-tb .payStatue-tb, .orderC-tb .time {
    color: #c6c6c6;
  }

  .orderC-tb .timeA {
    padding-right: 40px;
  }

  .orderC-total {
    float: right;
    padding: 23px 20px 0 0;
    font-size: 115%;
  }

  .orderC-total > div {
    padding-bottom: 15px;
  }

  .orderC-total .order-t, .orderC-total .order-fare {
    color: #a2a2a2;
  }

  .orderC-total .order-sum {
    color: #c81623;
  }

  .orderC-total .order-sum .fontBig {
    font-size: 130%; /*font-family:'微软雅黑',microsoft yahei;*/
    font-weight: bold;
  }

  .orderC-total dl {
    display: table;
  }

  .orderC-total dl dd {
    display: table-cell;
  }

  .orderC-total dl .dl_ddL {
    text-align: right;
  }

  .orderC-total dl .dl_ddR {
    text-align: left;
    padding-left: 35px;
  }

  .order-message {
    color: #a2a2a2;
  }

  .order-message dl dd {
    float: left;
  }

  .order-message .textarea-gw {
    width: 465px;
    height: 85px;
    padding: 5px;
    border: 1px solid #e6e6e6;
  }

  .order-submit {
    text-align: right;
    margin-top: 30px;
    margin-bottom: 40px;
  }

  .order-submit a {
    margin-right: 20px;
  }

  .order-submit a.a_back {
    color: #a2a2a2;
  }

  .order-submit a.a_back:hover {
    color: #666;
  }

  .btn-red {
    display: inline-block;
    background: #c81623;
    color: #fff !important;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    text-decoration: none !important;
  }

  .btn-red:hover {
    background-color: #E82D3A;
  }

  .order-submit a.btn-submit {
    padding: 8px 30px;
    font-size: 115%;
  }

  .select-gw {
    width: 100%;
    text-align: left;
    background: #f3f3f3;
    border: 0;
    color: #363636;
    padding: 8px 30px 8px 10px;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *:focus {
    outline: none;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    font-family: "微软雅黑", microsoft yahei;
    color: #333;
    background: #fff;
  }

  body, div, span, object, iframe, p, blockquote, pre, a, abbr, acronym, address, code, del, dfn, em, q, dl, dt, dd, ol, ul, li, fieldset, form, legend, caption, tbody, tfoot, thead, article, aside, dialog, figure, footer, header, hgroup, nav, section {
    padding: 0;
    margin: 0;
  }

  audio, canvas, progress, video {
    display: inline-block;
    vertical-align: baseline;
  }

  audio:not([controls]) {
    height: 0;
  }

  [hidden], template {
    display: none;
  }

  a {
    color: #333;
    background-color: transparent;
    text-decoration: none;
    -webkit-touch-callout: none;
  }

  a:active, a:hover {
    outline: 0;
  }

  img {
    border: 0;
    vertical-align: middle;
    -webkit-touch-callout: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  button, input, optgroup, select, textarea {
    margin: 0;
    font: inherit;
    color: inherit;
  }

  button {
    overflow: visible;
  }

  [role='button']:focus {
    outline: 0;
  }

  button, select {
    text-transform: none;
  }

  button, html input[type="button"], input[type="reset"], input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
  }

  button[disabled], html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner, input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  input {
    line-height: normal;
    outline: none;
  }

  input[type="checkbox"], input[type="radio"] {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
  }

  input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  input[type="search"] {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    -webkit-appearance: textfield;
  }

  input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  input[type="text"] {
    -webkit-appearance: none;
  }

  input[type="checkbox"] {
    -webkit-appearance: checkbox;
  }

  input[type="radio"] {
    -webkit-appearance: radio;
  }

  textarea {
    overflow: auto;
    outline: none;
    -webkit-appearance: none;
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
  }

  .clearfix {
    zoom: 1;
  }

</style>
