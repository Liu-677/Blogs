<template>
    <div class="loginContainer">
      <div class="loginButton" type="text" @click="changeShow" ><span class="logo-text">L</span></div>
      <div class='popContainer' v-show="dialogVisible">
        <div class="login">
          <div class="loginPart">
            <h2>用户登录</h2>
            <el-form>
              <div class="inputElement"><el-input v-model="username" placeholder="请输入用户名/手机号 "></el-input></div>
              <div class="inputElement"><el-input v-model="password" placeholder="请输入密码 "></el-input></div>
              <div>
                <el-button type="primary" @click="changeShow">登录</el-button>
                <el-button type="primary" @click="changeShow">取消</el-button>
              </div>
              <div style="text-align: right;color: white;"><el-link type="warning">没有账号？去注册</el-link></div>
            </el-form>
          </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
      return{
        dialogVisible: false
        };
    },
    methods:{
        changeShow(){
        this.dialogVisible = !this.dialogVisible
        },
    
    }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>