import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/authentication/Login';
import Register from '@/components/authentication/Register';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
