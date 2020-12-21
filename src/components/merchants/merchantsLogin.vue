<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2"
             label-position="left" label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">商家登录</h3>

      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>

      <el-checkbox v-model="checked" class="rememberme">记住密码
      </el-checkbox>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          username: 'pdrr',
          password: '123456',
        },
        rules2: {
          username: [{required: true, message: '请输入账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: false
      }
    },
    methods: {
      handleSubmit(event) {
        var _this =this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var params = new URLSearchParams();
            params.append("mUsername",this.ruleForm2.username);
            params.append("mPwd",this.ruleForm2.password);
            _this.$axios.post("loginMerchants.action",params).then(function (result) {
              if (result.data!="") {
                _this.logining = false;
                sessionStorage.setItem('user',JSON.stringify(result.data));
                _this.$router.push("/shoppingmerchants/merchantsHome")
              } else {
                _this.logining = false;
                _this.$alert('用户名或密码错误!', '提示', {
                  confirmButtonText: 'ok'
                })
              }
            }).catch(function (error) {
              alert(error)
            })


          } else {
            return false;
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
</style>
