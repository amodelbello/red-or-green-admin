import Businesses from '@/components/businesses/Businesses';
import Business from '@/components/businesses/Business';

export default [
    {
      path: '/businesses',
      name: 'Businesses',
      component: Businesses,
      props: true
    },
    {
      path: '/businesses/add',
      name: 'AddBusiness',
      component: Business,
      props: true
    },
    {
      path: '/businesses/edit/:businessId',
      name: 'EditBusiness',
      component: Business,
      props: true
    }
];