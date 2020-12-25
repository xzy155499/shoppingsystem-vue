<template>

  <div class="disbet wapper login">
    <div class="left">
      <img>
    </div>
    <div class="Login left" style="margin-top: 200px;margin-bottom: 200px">


      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <div class="login_box">
          <div class="Login_box">
            <div>
              <div class="login_dv01">
                <div class="login_name disbet">
                  <label><img src="../../../assets/indexImg/login1.png" alt=""></label>
                  <el-input v-model="loginForm.photo" placeholder="请输入手机号"></el-input>
                </div>
                <div class="login_name disbet">
                  <label><img src="../../../assets/indexImg/login2.png" alt=""></label>
                  <el-input v-model="loginForm.pass" placeholder="请输入密码"></el-input>
                </div>
              </div>
              <div class="disbet loginbox01">
                <div>
                  <input style="margin-bottom:2px;" type="checkbox" value="">&ensp;自动登录
                </div>
                <a href="javascript:">忘记密码</a>
              </div>
              <button type="button" @click="handleSubmit">登录</button>
              <div class="loginbox03">
                没有账号?<a href="" class="go_register">去注册</a>>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          photo: '',
          pass: ''
        },
        rules: {
          photo: [{required: true, message: '请输入手机号', trigger: 'blur'}],
          pass: [{required: true, message: '请输入密码', trigger: 'blur'}],
        },
      }
    },
    methods: {
      handleSubmit(event) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            var _this = this;
            let formData = new FormData();
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.loginForm).forEach((key) => {
              formData.append(key, _this.loginForm[key]);
            });
            this.$axios.post("userlogin.action", formData).then(function (result) {
              sessionStorage.setItem('msg',"false");
              _this.$router.push("/shoppingsystem/index")
            }).catch(function (error) {
              alert(error);
            });
          }
        })
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  a :hover{
    text-decoration: underline;
  }

  * {
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
  }

  html,
  body {
    -ms-overflow-style: scrollbar;
  }

  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }



  body {
    width: 100%;
    min-width: 1200px;
    font-family: "Microsoft YaHei";
  }

  a,
  button,
  textarea {
    text-decoration: none;
    outline: none;
    font-family: "Microsoft YaHei";
    border: none;
  }

  .disbet {
    display: flex;
    justify-content: space-between;
  }

  .login {
    align-items: center;
  }

  .login .left {
    margin-top: 500px;
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
    width: 50px;
    min-width: 50px;
    text-align: center;
  }

  .Login .Login_box .login_name label img {
    vertical-align: middle
  }

  .Login .Login_box .login_name input {
    border: none;
    width: 100%;
    height: 25px;
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

  .Login .Login_box .loginbox01>div {
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


</style>
