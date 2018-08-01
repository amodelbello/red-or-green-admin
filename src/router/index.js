import Vue from 'vue';
import Router from 'vue-router';

import auth from '@/mixins/authentication.js'

import authRoutes from './authentication';
import businessRoutes from './businesses';
import categoryRoutes from './categories';
import userRoutes from './users';

Vue.use(Router);

const routes = [
  ...authRoutes,
  ...businessRoutes,
  ...categoryRoutes,
  ...userRoutes,
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

  const authorized = auth.methods.isLoggedIn();

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