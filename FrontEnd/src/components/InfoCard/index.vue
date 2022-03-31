<template>
  <div class="my">
    <div class="header-info">
      <div class="avatar">
        <img href="https://imgtu.com/i/b3XNqK"><img src="https://s4.ax1x.com/2022/03/02/b3XNqK.jpg" alt="b3XNqK.jpg" border="0" />
      </div>
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
      <router-link to="/contact" class="more">联系我</router-link>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
export default {
  data() {
    return {
      totalCount: 0,
      categoryCount: 0
    };
  },
  mounted() {
    this.getBlogsCount();
    this.getAllCategory();
  },
  methods: {
    getBlogsCount() {
      const _this = this;
      axios
        .get("/api/blogs/getAllBlogsCount")
        .then(function(response) {
          console.log(response)
          _this.totalCount = response.data.total || 0;
        })
        .catch(function(error) {
          console.log(_this);
          console.log(error);
        });
    },
    getAllCategory() {
      const _this = this;
      axios
        .get("/api/blogs/getAllCategory")
        .then(function(response) {
          _this.categoryCount = response.data.data.length || 0;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>