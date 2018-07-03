import axios from 'axios';
import authMixin from '@/mixins/authentication.js'

const state = {
  users: {},
  user: {},
};

const getters = {
  users: state => state.users,
  user: state => {
    if (state.user.address === null || state.user.address === undefined) {
      state.user.address = {};
    }
    return state.user;
  },
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },

  SET_USER(state, user) {
    state.user = user
  },

  EDIT_USER(state, user) {
    if (state.users.length > 0) {
      const index = state.users.map(c=> c._id).indexOf(user._id);
      state.users.splice(index, 1, user);
    }
    state.user = user;
  },

  ADD_USER(state, user) {
    if (state.users.length > 0) {
      state.users.push(user);
    }

    state.user = user;
  },

  DELETE_USER(state, user) {
    if (state.users.length > 0) {
      const index = state.users.map(c => c._id).indexOf(user._id);
      state.users.splice(index, 1);
    }
  },
};

const actions = {
  getUsers: ({commit}) => {
    return axios.get(
      process.env.VUE_APP_API_HOST + '/api/users', 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_USERS', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  unsetUser: ({commit}) => {
    commit('SET_USER', {});
  },

  getUser: ({commit}, userId) => {
    return axios.get(
      process.env.VUE_APP_API_HOST + '/api/users/' + userId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_USER', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  editUser: ({commit}, user) => {
    return axios.put(
      process.env.VUE_APP_API_HOST + '/api/users/' + user._id, 
      user,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('EDIT_USER', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  addUser: ({commit}, user) => {
    return axios.post(
      process.env.VUE_APP_API_HOST + '/api/users', 
      user,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('ADD_USER', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  deleteUser: ({commit}, userId) => {
    return axios.delete(
      process.env.VUE_APP_API_HOST + '/api/users/' + userId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('DELETE_USER', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};