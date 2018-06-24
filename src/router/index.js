import Vue from 'vue';
import Router from 'vue-router';

import authMixin from '@/mixins/authentication.js'

import Login from '@/components/authentication/Login';
import Register from '@/components/authentication/Register';
import Businesses from '@/components/businesses/Businesses';
import Categories from '@/components/categories/Categories';

Vue.use(Router);

const shouldBeGuarded = (to) => {
  if (
    to.path === '/' ||
    to.path === '/logout' ||
    to.path === '/register'
  ) {
    return false;
  }

  return true;
}

const router = new Router({
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
      path: '/categories',
      name: 'Categories',
      component: Categories,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {

  const authorized = authMixin.isLoggedIn();

  if (authorized && shouldBeGuarded(to)) {
    next();
  }

  if (!authorized && shouldBeGuarded(to)) {
    next('/');
  }

  if (authorized && !shouldBeGuarded(to)) {
    next('/businesses');
  }

  if (!authorized && !shouldBeGuarded(to)) {
    next();
  }
});

export default router;