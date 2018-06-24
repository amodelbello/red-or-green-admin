import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/authentication/Login';
import Register from '@/components/authentication/Register';
import Businesses from '@/components/businesses/Businesses';

Vue.use(Router);

const isLoggedIn = () => {
  return (
    localStorage.getItem('token') !== undefined && 
    localStorage.getItem('token') !== null
  );
}

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
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authorized = isLoggedIn();

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

  console.log(authorized);
  console.log(to);
  console.log(from);
  next();
});

export default router;