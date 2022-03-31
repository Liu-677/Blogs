import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/pages/home/index.vue'
// import Blog from '@/pages_front/blog/index.vue'
// import Label from '@/pages_front/label/index.vue'
// import category from '@/pages_front/category/index.vue'
// import timeLine from '@/pages_front/timeLine/index.vue'
// import contact from '@/pages_front/contact/index.vue'
// import articleDetail from '@/pages_front/articleDetail/index.vue'

/* 管理系统 */
// import Admin from '@/pages_admin/admin/index.vue' // 后台管理模板
// import Index from '@/pages_admin/index/index.vue' // 数据统计
// import Page from '@/pages_admin/page/index.vue' // 页面管理
// import Publish from '@/pages_admin/publish/index.vue' // 发布文章
// import Article from '@/pages_admin/blog/index.vue' // 文章管理
// import Labels from '@/pages_admin/label/index.vue' // 标签
// import File from '@/pages_admin/file/index.vue' // 文件管理
// import Linkz from '@/pages_admin/link/index.vue' // 友链
// import Settings from '@/pages_admin/setting/index.vue' // 系统设置

/*  测试文件 */ 
// import Test from '@/pages_admin/test.vue'
// import { resolve } from 'core-js/fn/promise'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  // routes: [{
  //   path: '/',
  //   name: 'home',
  //   component: Blog
  // },  {
  //   path: '/articleDetail/:id',
  //   name: 'articleDetail',
  //   component: articleDetail
  // }, {
  //   path: '/label/:label',
  //   name: 'label',
  //   component: Label,
  //   props: true
  // }, {
  //   path: '/category/:category',
  //   name: 'category',
  //   component: category,
  //   props: true
  // }, {
  //   path: '/timeLine',
  //   name: 'timeLine',
  //   component: timeLine,
  // }, {
  //   path: '/contact',
  //   name: 'contact',
  //   component: contact,
  //   },

  //   { // 后台页面管理
  //     path: '/admin',
  //     name: 'admin',
  //     component: Admin,
  //     redirect: '/admin/index',
  //     children: [
  //         { path: '/admin/index', name: 'index', component: Index },
  //         { path: '/admin/page', name: 'page', component: Page },
  //         { path: '/admin/publish', name: 'publish', component: Publish },
  //         { path: '/admin/article', name: 'article', component: Article },
  //         { path: '/admin/file', name: 'file', component: File },
  //         { path: '/admin/labels', name: 'labels', component: Labels },
  //         { path: '/admin/linkz', name: 'linkz', component: Linkz },
  //       { path: '/admin/settings', name: 'settings', component: Settings },
  //       {path: '/admin/test', name: 'test', component: Test },
  //     ]
  //   }
  // ],

//懒加载
   routes: [{
    path: '/',
    name: 'home',
    component: resolve => require(['@/pages_front/blog/index.vue'],resolve)
  },  {
    path: '/articleDetail/:id',
    name: 'articleDetail',
    component: resolve => require(['@/pages_front/articleDetail/index.vue'],resolve)
  }, {
    path: '/label/:label',
    name: 'label',
    component: resolve => require(['@/pages_front/label/index.vue'],resolve),
    props: true
  }, {
    path: '/category/:category',
    name: 'category',
    component: resolve => require(['@/pages_front/category/index.vue'],resolve),
    props: true
  }, {
    path: '/timeLine',
    name: 'timeLine',
    component: resolve => require(['@/pages_front/timeLine/index.vue'],resolve),
  }, {
    path: '/contact',
    name: 'contact',
    component: resolve => require(['@/pages_front/contact/index.vue'],resolve),
    },

    { // 后台页面管理
      path: '/admin',
      name: 'admin',
      component: resolve => require(['@/pages_admin/admin/index.vue'],resolve),
      redirect: '/admin/index',
      children: [
        {
          path: '/admin/index', name: 'index', component: resolve => require(['@/pages_admin/index/index.vue'],resolve)
        },
        {
          path: '/admin/page', name: 'page', component: resolve => require(['@/pages_admin/page/index.vue'],resolve)
        },
        {
          path: '/admin/publish', name: 'publish', component: resolve => require(['@/pages_admin/publish/index.vue'],resolve)
        },
        {
          path: '/admin/article', name: 'article', component: resolve => require(['@/pages_admin/blog/index.vue'],resolve)
        },
        {
          path: '/admin/file', name: 'file', component: resolve => require(['@/pages_admin/file/index.vue'],resolve)
        },
        {
          path: '/admin/labels', name: 'labels', component:  resolve => require(['@/pages_admin/label/index.vue'],resolve)
        },
        {
          path: '/admin/linkz', name: 'linkz', component:  resolve => require(['@/pages_admin/link/index.vue'],resolve)
        },
        {
          path: '/admin/settings', name: 'settings', component: resolve => require(['@/pages_admin/setting/index.vue'],resolve)
        },
      ]
    }
  ],





  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

// router.beforeEach((to,from,next)=>{
//   //如果用户访问登录页，直接放行
//   if(to.path ==="/login") return next();
//   //从sessionStorage中获取到保存的token值
//   const tokenStr = window.sessionStorage.getItem("token");
//   //没有token，强制跳转到登录页面
//   if(!tokenStr) return next("/login");
//   next();//有token，直接放行
// })

export default router