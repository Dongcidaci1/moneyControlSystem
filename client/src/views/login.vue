<template>
  <div class="login">
    <section class="form-container">
      <div class="manage_tip">
        <span class="title">在线管理平台登录</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="loginUser.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  name: "register",
  component: {},
  data() {
    return {
      loginUser: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          {
            required: true, //是否为必要值
            // type:"email"--代表类型要为email
            message: "用户名不能为空", //提示信息
            trigger: "blur", //trigger(何种触发):失去焦点时
          }
        ],
        password: [
          {
            required: true, //是否为必要值
            message: "密码不能为空", //提示信息
            trigger: "blur", //trigger(何种触发):失去焦点时
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      /* 
      1.先验证表单,表单数据有效则向接口提交,提交的时候是提交数据对象
      2.提交之后返回的是一个promise
      3.获取返回数据里面的token
      4.将token存储到localStorage
      5.解析token
      6.将解析后的token存储到vuex
      */
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // 对接接口
          this.axios
            .post("/api/users/login", this.loginUser)
            .then(res=>{
              //登陆成功获取token
              //token，通过解构赋值获取res.data里面的token
              const {token} = res.data;
              // 存储到ls
              localStorage.setItem('eleToken',token);
              // 解析token
              const  decoded = jwt_decode(token);
              // console.log(decoded);
              //token存储到vuex
              this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
              this.$store.dispatch("setUser",decoded)
              // 存储之后跳转到首页
              this.$router.push('/index');
            });
          
        }
      });
    },
    isEmpty(value){
      return(
        value===undefined ||
        value ===null ||
        (typeof value ==='object' && Object.keys(value).length===0) ||
        (typeof value ==='string' && value.trim().length===0)
      ); 
    }
  },
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.form-container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 0%;
  left: 14%;
  /* padding-left: 25%;
  padding-right: 25%;
  padding-top: 14%; */
  padding: 14% 25% 0 25%;
  border-radius: 5px;
  text-align: center;
}
.form-container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #000;
  display: inline-block;
  margin: 40px 0px 40px 40px;
}
.registerForm {
  margin-top: 10px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #ccc;
}
.submit_btn {
  width: 100%;
  margin-left: -60px;
}
</style>