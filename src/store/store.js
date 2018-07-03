import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './modules/authentication';
import businesses from './modules/businesses';
import categories from './modules/categories';
import ratings from './modules/ratings';
import users from './modules/users';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    authentication,
    businesses,
    categories,
    ratings,
    users,
  }
});