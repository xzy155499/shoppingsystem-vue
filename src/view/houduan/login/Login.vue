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

      <el-form-item prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <div class="login-code" @click="refreshCode">
              <!--验证码组件-->
              <validate_code :identifyCode="identifyCode"></validate_code>
            </div>
          </el-col>
        </el-row>
      </el-form-item>


      <el-form-item style="width:100%;">
        <el-button type="primary" :loading="loading" style="width:100%;" @click="handleSubmit">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import ValidateCode from '../../../view/houduan/login/validateCode.vue'

  export default {
    data() {
      const validateCode = (rule, value, callback) => {
        if (this.identifyCode !== value) {
          this.loginForm.code = ''
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      }
      return {
        identifyCodes: '1234567890',
        identifyCode: '',
        loginForm: {
          account: '',
          pass: '',
          code: ''
        },
        loading: false,
        rules: {
          account: [{required: true, message: '请输入账号', trigger: 'blur'}],
          pass: [{required: true, message: '请输入密码', trigger: 'blur'}],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: validateCode, trigger: 'input' }
          ]
        },
      }
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
      },
      handleSubmit(event) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            var _this = this;
            _this.loading = true
            var params = new URLSearchParams();
            params.append("account", _this.loginForm.account);
            params.append("pass", _this.loginForm.pass);
            this.$axios.post("login.action", params).then(function (result) {
              if (result.data.code == "0") {
                // //将登录成功的用户名存入store中
                sessionStorage.setItem('emp',JSON.stringify(result.data.emp));
                // if( result.data.roles[0].role_name == undefined){
                //   sessionStorage.setItem('role_name', "暂无该员工角色");
                // } else {
                  sessionStorage.setItem('role_name', result.data.roles[0].role_name);
                // }
                _this.loading = false;
                _this.$router.push("/shoppingsystem/home")
              } else {
                _this.$alert(result.data.msg, '提示', {
                  confirmButtonText: 'ok'
                })
                _this.loading = false
              }
            }).catch(function (error) {
              alert(error);
            });
          }
        })
      }
    },
    created(){
      this.refreshCode();
    },
    components:{
      validate_code:ValidateCode
    },
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

  .title{
    margin: 0px 0px 15px;
  }
</style>
