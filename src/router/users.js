import Users from '@/components/users/Users';
import User from '@/components/users/User';

export default [
    {
      path: '/users',
      name: 'Users',
      component: Users,
      props: true
    },
    {
      path: '/users/add',
      name: 'AddUser',
      component: User,
      props: true
    },
    {
      path: '/users/edit/:userId',
      name: 'EditUser',
      component: User,
      props: true
    }
];