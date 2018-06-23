import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    businesses: {}
  },
  mutations: {
    'SET_STORE' (state, businesses) {
      state.businesses = businesses
    }
  },
  actions: {
    initStore: ({commit}) => {
      axios.get('http://localhost:3000/api/businesses')
      .then((response) => {
        console.log(response.data.data);
        commit('SET_STORE', response.data.data)
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  getters: {
    businesses: state => state.businesses
  }
});