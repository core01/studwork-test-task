import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Starship from './views/Starship.vue';
import Starships from './views/Starships.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/starships',
      name: 'starships',
      component: Starships
    },
    {
      path: '/starship/:id',
      name: 'starship',
      component: Starship
    }
  ]
});
