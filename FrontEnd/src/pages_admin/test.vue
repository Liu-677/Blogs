<template>
    <div class="main">
      <div class="loginButton" type="text" @click="changeShow" ><span class="logo-text">L</span></div>
   
      <div class='popContainer' v-show="dialogVisible">
        <div class="login" >
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
    </div>
</template>


<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
    changeShow(){
      this.dialogVisible = !this.dialogVisible
    } 
    
    }
  };
</script>

<style lang="less" scoped>
@import "@/common/color.less";


</style>

<style lang="less">
@import "@/common/color.less";

.popContainer{
      position: fixed;
      border: transparent;
      padding:0;
      margin:0;
      
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255,255,255,0.7);
      
  .loginPart{
      position:absolute;
      top:50%;
      left:50%;
      /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
      transform:translate(-50%,-50%);
      /*实现块元素百分比下居中*/
      width:450px;
      padding:50px;
      background: rgba(0,0,0,.5);
      /*背景颜色为黑色，透明度为0.8*/
      box-sizing:border-box;
      /*box-sizing设置盒子模型的解析模式为怪异盒模型，
      将border和padding划归到width范围内*/
      box-shadow: 0px 15px 25px rgba(0,0,0,.5);
      /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
      border-radius:15px;
      /*边框圆角，四个角均为15px*/
    }

  .loginPart h2{
    margin:0 0 30px;
    padding:0;
    color: #fff;
    text-align:center;
    /*文字居中*/
  }
  .loginPart .inputbox{
    position:relative;
  }
  .loginPart .inputElement input{
    width: 100%;
    padding:10px 0;
    font-size:16px;
    color:#fff;
    letter-spacing: 1px;
    /*字符间的间距1px*/
    margin-bottom: 30px;
    border:none;
    border-bottom: 1px solid #fff;
    outline:none;
    /*outline用于绘制元素周围的线
    outline：none在这里用途是将输入框的边框的线条使其消失*/
    background: transparent;
    /*背景颜色为透明*/
  }

  .login{
    width:100%;
    height:100%;
  }


}

.main{
    position: relative;
    .loginButton{
        @media (max-width: 992px) {
      width: 40px;
      height: 40px;
      border-radius: 40px;
    }
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    border: 0.5px solid @whiteColor4;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
    margin: 0 0 0 20px;
    &:hover {
      border-color: @whiteColor;
      cursor: pointer;
      .logo-text {
        color: @whiteColor;
      }
    }
    }

    .logo-text {
      color: @whiteColor;
      @media (max-width: 992px) {
        font-size: 16px;
      }
      font-size: 24px;
      color: @whiteColor4;
      transition: 0.5s all;
    }
    
}


</style>
