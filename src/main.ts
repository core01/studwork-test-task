import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// @ts-ignore
import VueNoty from 'vuejs-noty';

import '@/assets/css/tailwind.css';
import 'vuejs-noty/dist/vuejs-noty.css';

Vue.config.productionTip = false;

Vue.use(VueNoty, {
  timeout: 4000,
  progressBar: true,
  layout: 'bottomRight'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
