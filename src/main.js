// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import $ from 'jquery';
import store from 'storejs';

Vue.config.productionTip = false
Vue.use(VueRouter);

Vue.use(iView);

Vue.prototype.$store = store;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h => h(App)
})
