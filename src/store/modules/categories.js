import axios from 'axios';
import authMixin from '@/mixins/authentication.js'

const state = {
  categories: {}
};

const getters = {
  categories: state => state.categories
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  }
};

const actions = {
  initCategories: ({commit}) => {
    axios.get(
      'http://localhost:3000/api/categories', 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_CATEGORIES', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};