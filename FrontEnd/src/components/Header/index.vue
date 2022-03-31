<template>
  <nav class="topbar">
    <div class="loginButton" type="text" @click="changeShow" ><span class="logo-text">L</span></div>
    <div class='popContainer' v-show="dialogVisible">
      <div class="login">
        <div class="loginPart">
          <h2 class="loginTitle">用户登录</h2>
          <el-form>
            <div class="inputElement"><el-input v-model="username"  @input="onInput()" placeholder="请输入用户名"></el-input></div>
            <div class="inputElement"><el-input v-model="password" type="password" @input="onInput()" placeholder="请输入密码 "></el-input></div>
            <div class="Btn">
              <el-button class="LoginlBtn" type="primary" @click="CancelFunc" round>取消</el-button>
              <el-button class="CancelBtn" type="success" @click="LoginFunc" round>登录</el-button>
              
            </div>
          </el-form>
        </div>
      </div>
    </div>
    

    <ul class="menu">
      <li class="menu-item">
        <router-link to="/" class="link">主页</router-link>
      </li>
      <li class="menu-item">
        <router-link :to = "`/label/` + labels[0]" class="link">标签</router-link>
      </li>
      <li class="menu-item">
        <router-link :to= "`/category/` + categorys[0]" class="link">分类</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/timeline" class="link">时间线</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/contact" class="link">联系我</router-link>
      </li>
    </ul>
    <div class="search">
      <i class="iconfont iconsearch"></i>
      <input placeholder="请输入搜索的内容..." class="search-input" type="text" />
    </div>
    <span class="mobile-nav" @click="handleMobileNav">
      <i class="iconfont iconnav"></i>
    </span>
    <transition name="fade">
      <nav v-show="showNav" class="mobile-nav-item">
        <div class="header-button">
          <i @click="handleMobileNav" class="iconfont iconback"></i>
          <!-- <i class="iconfont iconlanguage" @click="switchLanguage"></i> -->
        </div>
        <div class="header-info">
          <span class="name">677</span>
          <i class="mail">liuqiqin677@qq.com</i>
          <div class="statistics">
            <span class="articles">
              {{totalCount}}
              <i class="white">&nbsp;文章</i>
            </span>
            <span class="verticle-line white">|</span>
            <span class="link">
              {{categoryCount}}
              <i class="white">&nbsp;分类</i>
            </span>
          </div>
        </div>
        <div class="line"></div>
        <ul class="nav-menu">
          <li class="nav-menu-item" @click="handleMobileNav">
            <router-link to="/">
              <i class="iconfont iconhome"></i>
              <i class="white">主页</i>
            </router-link>
          </li>
          <li class="nav-menu-item" @click="handleMobileNav">
            <router-link to="/label">
              <i class="iconfont iconlabel"></i>
              <i class="white">标签</i>
            </router-link>
          </li>
          <li class="nav-menu-item" @click="handleMobileNav">
            <router-link to="/category">
              <i class="iconfont iconfenlei-"></i>
              <i class="white">分类</i>
            </router-link>
          </li>
          <li class="nav-menu-item" @click="handleMobileNav">
            <router-link to="/timeline">
              <i class="iconfont icontimeline"></i>
              <i class="white">时间线</i>
            </router-link>
          </li>
          <li class="nav-menu-item" @click="handleMobileNav">
            <router-link to="/contact">
              <i class="iconfont iconother"></i>
              <i class="white">联系我</i>
            </router-link>
          </li>
        </ul>
      </nav>
    </transition>
  </nav>
</template>

<script>
import axios from "@/utils/axios";
export default {
  data() {
    return {
      showNav: false,
      totalCount: 0,
      categoryCount: 0,
      labels : [],
      categorys : [],
      dialogVisible: false,
      username : "",
      password : "",
    };
  },
  created() {
    this.getBlogsCount();
    this.getAllCategory();
    this.getAllTags();
  },
  methods: {
    onInput(){
      // this.$clear();
      this.$forceUpdate();
    },
    changeShow(){
      this.dialogVisible = !this.dialogVisible
    },

    LoginFunc(){
      var _this = this;
      axios
        .get("/auth",{
          params: {
            username: this.username,
            password: this.password,
          }
        }).then(function(response) {
          
          if (response.data.code == 200){
            window.sessionStorage.setItem("token",response.data.data.token);
            _this.$router.push("/admin");
          }else{
            console.log(response.data.code);
          }
        }).catch(function(error) {
          console.log(error);
        }),
      
      this.changeShow();
    },

    CancelFunc(){
      this.changeShow();
    },

    handleMobileNav() {
      this.showNav = !this.showNav;
    },
    getBlogsCount() {
      const _this = this;
      axios
        .get("/api/blogs/getAllBlogsCount")
        .then(function(response) {
          _this.totalCount = response.data.total || 0;
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllCategory() {
      const _this = this;
      axios
        .get("/api/blogs/getAllCategory")
        .then(function(response) {
          _this.categoryCount = response.data.data.length || 0;
          _this.categorys =  response.data.data || [];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllTags() {
      const _this = this;
      axios
        .get("/api/blogs/getAllTags")
        .then(function(response) {
          _this.labels = response.data.info  || [];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>