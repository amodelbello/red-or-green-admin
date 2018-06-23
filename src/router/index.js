import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/authentication/Login';
import Register from '@/components/authentication/Register';
import Businesses from '@/components/businesses/Businesses';

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
      path: '/businesses',
      name: 'Businesses',
      component: Businesses,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
