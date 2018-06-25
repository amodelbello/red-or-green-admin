import Categories from '@/components/categories/Categories';
import Category from '@/components/categories/Category';

export default [
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
      props: true
    },
    {
      path: '/categories/add',
      name: 'AddCategory',
      component: Category,
      props: true
    },
    {
      path: '/categories/edit/:categoryId',
      name: 'EditCategory',
      component: Category,
      props: true
    }
];