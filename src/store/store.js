import Vue from 'vue';
import Vuex from 'vuex';

import businesses from './modules/businesses';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    businesses
  }
});