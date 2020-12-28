<template>

  <div class="disbet wapper login">
    <div>

    </div>
    <div class="Login" style="margin-top: 100px;margin-bottom: 100px">
      <el-form class="Login_box" :model="regForm" :rules="rules" ref="regForm">
        <div align="center" style="font-size: 25px">注册荣荣在线</div>
        <el-form-item prop="phone">
          <div class="login_name disbet">
            <label><img src="../../../assets/indexImg/login1.png"></label>
            <el-input clearable v-model="regForm.phone" placeholder="请输入手机号"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="code">
          <div class="login_name disbet">
            <label><img src="../../../assets/indexImg/login2.png"></label>
            <el-input v-model="regForm.code" placeholder="请输入验证码">
            </el-input>
            <el-button @click="getCode" v-if="show">获取验证码</el-button>
            <el-button v-if="!show" style="color: #777; font-size: 14px;">{{times}}秒后重试</el-button>
          </div>
        </el-form-item>
        <el-form-item prop="pass">
          <div class="login_name disbet">
            <label><img src="../../../assets/indexImg/login2.png"></label>
            <el-input v-model="regForm.pass" show-password placeholder="请输入6-20位的数字或字符"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="secondPass">
          <div class="login_name disbet">
            <label><img src="../../../assets/indexImg/login2.png"></label>
            <el-input v-model="regForm.secondPass" show-password placeholder="请再次输入密码">
            </el-input>
          </div>
        </el-form-item>
        <div class="registerBut">
          <el-button @click="login">注册</el-button>
        </div>
        <div class="register">
          已有账号?<a href="indexLogin">去登录</a>>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value != this.regForm.pass) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
      return {
        time: 6,
        times: 60,
        show: true,
        regForm: {
          phone: '',
          pass: '',
          secondPass: '',
          code: '',
        },
        rules: {
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位数的手机号', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '请输入6-20位的字母或数字', trigger: 'blur'}
          ],
          secondPass: [
            {required: true, message: '请输入二次密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        },
      }
    },
    methods: {
      //注册
      login(event) {
        this.$refs.regForm.validate((valid) => {
          if (valid) {
            var _this = this;
            let formData = new FormData();
            //将需要提交的表单数据 快速组装为H5定义的类型FormData
            Object.keys(_this.regForm).forEach((key) => {
              formData.append(key, _this.regForm[key]);
            });
            this.$axios.post("registerUser.action", formData).then(function (result) {
              if (result.data > 0) {
                _this.$message('注册成功,正在跳转登录页面,请稍等');
                window.setTimeout("window.location='indexLogin'", 3000);
              } else {
                _this.$message('注册失败,请重试');
              }
            }).catch(function (error) {
              alert(error);
            });
          }
        })
      },
      //验证码 效果
      getCode: function () {
        if (this.regForm.phone == '') {
          this.$message('请输入手机号码');
          return
        }
        this.show = false;
        var timer = setInterval(() => {
          this.times--;
          if (this.times === 0) {
            this.show = true;
            clearInterval(timer);
            this.times = 60;
          }
        }, 1000);
      },
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-width: 1200px;
  }

  .disbet {
    display: flex;
    justify-content: space-between;
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

  .Login .login_name {
    width: 100%;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    height: 56px;
    align-items: center;
    margin-top: 20px;
    position: relative;
  }

  .Login .login_name label {
    display: inline-block;
    width: 50px;
    min-width: 50px;
    text-align: center;
  }

  .Login .login_name label img {
    vertical-align: middle
  }

  .Login .login_name input {
    border: none;
    width: 100%;
    height: 25px;
    padding-left: 2px;
  }


  .Login .Login_box a {
    color: #777;
    font-size: 14px;
  }

  .Login .Login_box .login_name button {
    height: 56px;
    border-left: 1px solid #e6e6e6
  }

  .Login .Login_box .registerBut button {
    margin-top: 24px;
    height: 56px;
    width: 100%;
    border-radius: 6px;
    background-color: #019443;
    font-size: 20px;
    color: #fff;
    text-align: center;
  }

  .Login .Login_box button:hover {
    opacity: .7;
  }

  .Login .Login_box .register {
    width: 100%;
    text-align: right;
    margin-top: 17px;
    font-size: 14px;
    color: #777777;
  }

  .Login .Login_box .register a {
    color: #019443;
    font-size: 14px;
  }

  .Login .Login_box .register a:hover {
    text-decoration: underline;
  }

</style>
