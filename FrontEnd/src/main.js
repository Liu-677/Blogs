import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueParticles from 'vue-particles'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css'


Vue.use(VueParticles)
Vue.use(ElementUI);
Vue.use(mavonEditor) // markdown  挂在到全局
Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
