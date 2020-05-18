import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from './utils/axios'
import toReachBottom from './utils/toReachBottom'


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$toReachBottom = toReachBottom;

router.beforeEach(function(to, from, next) {
  if(to.path == "/login"){
    next()
  }
  if(router.options.meta.isLogin){
    next()
  }else{
    next('/login')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
