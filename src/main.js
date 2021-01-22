import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import store from './store';
import Vuex from 'vuex'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import less from 'less';
Vue.use(less)
Vue.use(Antd);
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
