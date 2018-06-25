import Login from '@/components/authentication/Login';
import Register from '@/components/authentication/Register';

export default [
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
];