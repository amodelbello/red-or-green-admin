import Vue from 'vue';
import Router from 'vue-router';

import authMixin from '@/mixins/authentication.js'

import authRoutes from './authentication';
import businessRoutes from './businesses';
import categoryRoutes from './categories';

Vue.use(Router);

const routes = [
  ...authRoutes,
  ...businessRoutes,
  ...categoryRoutes,
]
.concat([
  {
    path: '*',
    redirect: '/'
  }
])
;

const router = new Router({
  mode: 'history',
  routes: routes
});


const isGuarded = (to) => {
  if (
    to.path === '/' ||
    to.path === '/register'
  ) {
    return false;
  }

  return true;
}

router.beforeEach((to, from, next) => {

  const authorized = authMixin.isLoggedIn();

  if (isGuarded(to) && authorized) {
    next();
  }

  if (isGuarded(to) && !authorized) {
    next('/');
  }

  if (!isGuarded(to) && authorized) {
    next('/businesses');
  }

  if (!isGuarded(to) && !authorized) {
    next();
  }
});

export default router;