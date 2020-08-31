<template>
  <div class="register">
    <section class="form-container">
      <div class="manage_tip">
        <span class="title">在线管理平台</span>
        <!-- 
          model:数据对象
          rules:数据验证的规则,简单的理解就是你想要什么样的数据,什么时候对数据进行验证,数据不达标的时候体是什么信息
          ref:表单绑定的名称
        -->
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
        <!-- 传入prop是为了后面对整个表单进行验证 -->
        <!-- 在methods下的validate就是elementui 封装的额对整个表单进行验证的函数 -->
        <!-- 传入prop的同时还需要传入对应的v-model数据 -->
        <!-- 比如最近的这个,prop="name" -->
        <!-- 那么在进行表单验证的时候就会去验证registerUser.name的值,如果不传prop就不会进行验证 -->
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerUser.name" placeholder="请设置用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请设置密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  component: {},
  data() {
    // 验证两次的密码是否一样
    // value代表着本input的输入框
    // 后面的代表的是上一个的输入框
    var validatePass2 = (rules, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 定义数据模型
      registerUser: {
        name: "",
        password: "",
        password2: "",
        identity:''
      },
      // 校验规则
      rules: {
        name: [
          {
            required: true, //是否为必要值
            // type:"email"--代表类型要为email
            message: "用户名不能为空", //提示信息
            trigger: "blur", //trigger(何种触发):失去焦点时
          },
          {
            min: 2, //最小长度
            max: 30, //最大长度
            message: "长度在2-30之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true, //是否为必要值
            message: "密码不能为空", //提示信息
            trigger: "blur", //trigger(何种触发):失去焦点时
          },
          {
            min: 6,
            max: 30,
            message: "密码长度在6-30之间",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true, //是否为必要值
            message: "请再次验证密码", //提示信息
            trigger: "blur", //trigger(何种触发):失去焦点时
          },
          {
            // 在这里进行验证两次的密码
            validator: validatePass2,
            message:"两次密码不一致",
            trigger: "blur",
          },
        ],
        identity:[
          {
            required:true,
            message:"请选择身份",
            trigger:"blur"
          }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // 对接接口
          this.axios
            .post("/api/users/register", this.registerUser)
            .then(() => {
              this.$message({
                message: "注册成功",
                type: "success",
              });
            });
          this.$router.push('/login')
        }
      });
    },
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
}
</style>