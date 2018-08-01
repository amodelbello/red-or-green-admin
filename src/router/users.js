import Users from '@/components/users/Users';
import User from '@/components/users/User';

import auth from '@/mixins/authentication.js'

const userIsSuper = (to, from, next) => {
  const role = auth.methods.getUserRole();
  if (role === 'super') {
    next();
  } else {
    next('/login')
  }
}

export default [
    {
      path: '/users',
      name: 'Users',
      component: Users,
      props: true,
      beforeEnter: userIsSuper,
    },
    {
      path: '/users/add',
      name: 'AddUser',
      component: User,
      props: true,
      beforeEnter: userIsSuper,
    },
    {
      path: '/users/edit/:userId',
      name: 'EditUser',
      component: User,
      props: true
    }
];