<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="loginForm"
             label-position="left" label-width="0px"
             class="demo-ruleForm login-page">
      <h3 align="center" class="title">后台管理系统登录</h3>

      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item prop="pass">
        <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>

      <el-checkbox v-model="checked" class="rememberme">记住密码
      </el-checkbox>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        loginForm: {
          account: '',
          pass: '',
        },
        rules: {
          account: [{required: true, message: '请输入账号', trigger: 'blur'}],
          pass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: false
      }
    },
    methods: {
      handleSubmit(event) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("account", _this.loginForm.account);
            params.append("pass", _this.loginForm.pass);
            this.$axios.post("login.action", params).then(function (result) {
              if (result.data.code == "0") {
                // //将登录成功的用户名存入store中
                sessionStorage.setItem('emp',JSON.stringify(result.data.emp));
                sessionStorage.setItem('role_name', result.data.roles[0].role_name);
                // sessionStorage.setItem('emp_id',result.data.emp.emp_id);
                _this.$router.push("/shoppingsystem/home")
              } else {
                _this.$alert(result.data.msg, '提示', {
                  confirmButtonText: 'ok'
                })
              }
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

  .login-container {
    width: 100%;
    height: 100%;
    /*background: #4373a5;*/
    margin-top: 250px;

    /* 登录框上下对齐 */
    display: flex;
    align-items: center;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 0px auto;
    width: 350px;
    padding: 20px 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label {
    margin: 0px 0px 15px;
    text-align: left;
  }
  .title{
    margin: 0px 0px 15px;
  }
</style>
