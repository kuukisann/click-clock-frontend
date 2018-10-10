import Vue from "vue";
import Router from "vue-router";
import Checker from './components/Checker'
import History from './components/History'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/checker',
      name: 'checker',
      component: Checker
    },
    {
      path: '/history',
      name: 'history',
      component: History
    }
  ]
});
