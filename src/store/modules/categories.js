import axios from 'axios';
import authMixin from '@/mixins/authentication.js'

const state = {
  categories: {},
  category: {},
};

const getters = {
  categories: state => state.categories,
  category: state => state.category,
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },

  SET_CATEGORY(state, category) {
    state.category = category
  },

  EDIT_CATEGORY(state, category) {
    if (state.categories.length > 0) {
      const index = state.categories.map(c=> c._id).indexOf(category._id);
      state.categories.splice(index, 1, category);
    }
    state.category = category;
  },

  ADD_CATEGORY(state, category) {
    if (state.categories.length > 0) {
      state.categories.push(category);
    }

    state.category = category;
  },

  DELETE_CATEGORY(state, category) {
    if (state.categories.length > 0) {
      const index = state.categories.map(c => c._id).indexOf(category._id);
      state.categories.splice(index, 1);
    }
  },
};

const actions = {
  getCategories: ({commit}) => {
    axios.get(
      process.env.VUE_APP_API_HOST + '/api/categories', 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_CATEGORIES', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  unsetCategory: ({commit}) => {
    commit('SET_CATEGORY', {});
  },

  getCategory: ({commit}, categoryId) => {
    axios.get(
      process.env.VUE_APP_API_HOST + '/api/categories/' + categoryId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_CATEGORY', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  editCategory: ({commit}, category) => {
    axios.put(
      process.env.VUE_APP_API_HOST + '/api/categories/' + category._id, 
      category,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('EDIT_CATEGORY', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  addCategory: ({commit}, category) => {
    axios.post(
      process.env.VUE_APP_API_HOST + '/api/categories', 
      category,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('ADD_CATEGORY', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  deleteCategory: ({commit}, categoryId) => {
    axios.delete(
      process.env.VUE_APP_API_HOST + '/api/categories/' + categoryId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('DELETE_CATEGORY', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};