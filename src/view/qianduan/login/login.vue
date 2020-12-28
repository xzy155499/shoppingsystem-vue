<template>

  <div class="disbet wapper login">
    <div>

    </div>
    <div class="Login" style="margin-top: 100px;margin-bottom: 200px">
      <el-form class="Login_box" :model="loginForm" :rules="rules" ref="loginForm">
        <div align="center" style="font-size: 25px">登录荣荣在线</div>
        <el-form-item prop="phone">
          <div class="login_name disbet">
            <label><img src="../../../assets/indexImg/login1.png" alt=""></label>
            <el-input v-model="loginForm.phone" clearable placeholder="请输入手机号"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="pass">
          <div class="login_name disbet">
            <label><img src="../../../assets/indexImg/login2.png" alt=""></label>
            <el-input v-model="loginForm.pass" show-password placeholder="请输入密码"></el-input>
          </div>
        </el-form-item>
        <div class="disbet" style="margin-top: 35px">
          <div>
            <input type="checkbox" value="">&ensp;自动登录
          </div>
          <a href="javascript:">忘记密码</a>
        </div>
        <!--        -->
        <el-button v-popover:popover
                   @click="login">登录
        </el-button>
        <div class="login">
          没有账号?<a href="indexRegister">去注册</a>>
        </div>
      </el-form>
      <el-popover placement="right"
                  trigger="manual" v-model="visible">
        <slide-verify
          @success="onSuccess"
          @fail="onFail"
          :accuracy="accuracy"
          slider-text="拖动左边滑块完成上方拼图"></slide-verify>
      </el-popover>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
        accuracy: 3,
        visible: false,
        loginForm: {
          phone: '',
          pass: '',
        },
        rules: {
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位数的手机号', trigger: 'blur'}
          ],
          pass: [{required: true, message: '请输入密码', trigger: 'blur'}],
        },
      }
    },
    methods: {
      login(event) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            var _this = this;
            _this.visible = true;
          }
        })
      },
      onSuccess() {
        this.$message.success('验证通过');
        //滑动验证成功之后关闭弹出的窗口
        this.visible = false;
        var _this = this;
        let formData = new FormData();
        //将需要提交的表单数据 快速组装为H5定义的类型FormData
        Object.keys(_this.loginForm).forEach((key) => {
          formData.append(key, _this.loginForm[key]);
        });
        this.$axios.post("loginUser.action", formData).then(function (result) {
          // var data = "登录成功";
          if (result.data.code == "0") {
            sessionStorage.setItem('user', JSON.stringify(result.data.user));
            sessionStorage.setItem('loginMsg', JSON.stringify(true));
            _this.$parent.loginMsg = true;
            _this.$parent.phone = result.data.user.phone;
            window.setTimeout("window.location='index'",500);
          } else {
            _this.$alert(result.data.msg, '提示', {
              confirmButtonText: '好的'
            })
          }
        }).catch(function (error) {
          alert(error);
        });
      },
      onFail() {
        this.$message.error('验证失败,请重试');
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

  .Login .Login_box button {
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

  .Login .Login_box .login {
    width: 100%;
    text-align: right;
    margin-top: 17px;
    font-size: 14px;
    color: #777777;
  }

  .Login .Login_box .login a {
    color: #019443;
    font-size: 14px;
  }

  .Login .Login_box .login a:hover {
    text-decoration: underline;
  }

</style>
