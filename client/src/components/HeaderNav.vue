<template>
  <div class="header-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <span class="title">在线管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.username}}</p>
          </div>
          <div class="username">
            <el-dropdown @command="setDialoginInfo" trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "header-nav",
  computed:{
    user(){
      return this.$store.getters.user;
    }
  },
  methods:{
    setDialoginInfo(cmdItem){
      // console.log(cmdItem);
      switch(cmdItem){
        case "info":
          this.showList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showList(){
      // console.log("个人信息");
      return this.$router.push('/infoshow')
    },
    logout(){
      // console.log("退出");
      // 清除token
      localStorage.removeItem("eletoken");
      this.$store.dispatch("clearCurrentState");
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.header-nav{
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px 0 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container{
  line-height: 60px;
  min-width: 400px;
}
.title{
  vertical-align: middle;
  font-size: 22px;
  font-family: 'Microsoft YaHei';
  letter-spacing: 3px;
}
.user{
  line-height: 60px;
  float: right;
  text-align: right;
  padding-right: 10px;
}
.avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome{
  display: inline-block;
  width: auto;
  vertical-align: middle;
  /* padding: 0 5px; */
  margin-left: 10px;
}
.name{
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename{
  font-size: 12px;
}
.username{
  display: inline-block;
  color: #409eff;
  font-weight: bolder;
}
el-dropdown{
  color: #fff;
}
</style>