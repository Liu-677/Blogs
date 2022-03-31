<template>
    <el-container>
      <el-aside>
        <el-menu
          class="el-menu-vertical-demo"
          text-color = #eeeeee
        >

        <el-menu-item
          :index="item.index.toString()"
          v-for="(item) in MenuList"
          :key="item.index"
          @click="MenuFunc(item.RouterName)">
          <i :class= "item.icon" ></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
var MenuList = [
  { index: 1, title: "数据统计", icon: "el-icon-s-data", RouterName: "index" 
  },{
    index: 2, title: "发布文章", icon: "el-icon-edit-outline", RouterName: "publish"
  },{
    index: 3, title: "文章管理", icon: "el-icon-tickets", RouterName: "article"
  },{ 
    index: 4, title: "页面管理", icon: "el-icon-reading", RouterName: "page" 
  },{ 
    index: 5, title: "分类/标签", icon: "el-icon-price-tag", RouterName: "labels"
  },{ 
    index: 6, title: "文件管理", icon: "el-icon-s-help", RouterName: "file" 
  },{ 
    index: 7, title: "友链管理", icon: "el-icon-link", RouterName: "linkz" 
  },{
    index: 8,title: "系统设置",icon: "el-icon-setting",RouterName: "settings"
  },{
    index: 9,title: "返回主页",icon: "el-icon-error",RouterName: "home"
  }
];
export default {
  name: "admin",

  data() {
    return {
      MenuList: MenuList,
      isCollapse: false
    };
  },
  methods: {
    MenuFunc(val) {
      this.$router.push({ name: val }); // 必须给一个路由出口<router-view></router-view>
    },
    IsCollapse() {
      this.isCollapse = !this.isCollapse; // 菜单是否隐藏
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

