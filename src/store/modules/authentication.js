import router from '../../router'
import axios from 'axios';
import authMixin from '@/mixins/authentication.js'

const state = {
  authToken: localStorage.getItem('token')
};

const getters = {
  authToken: state => state.authToken
};

const mutations = {
  LOGIN(state, authToken) {
    state.authToken = authToken;
  },

  LOGOUT(state) {
    state.authToken = null;
  },

  REGISTER(state, authToken) {
    state.authToken = authToken;
  },
};

const actions = {
  login: ({commit, dispatch}, credentials) => {

    return axios.post(process.env.VUE_APP_API_HOST + '/api/login', credentials)
    .then((response) => {
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      commit('LOGIN', token);

      // only allow super and admin roles
      const userRole = authMixin.getUserRole();
      if (userRole !== 'super' && userRole !== 'admin') {
        dispatch('logout');
        reject();
      }

      router.push('/businesses');
    });

  },

  logout: ({commit}) => {
    localStorage.removeItem('token');
    commit('LOGOUT');
  },

  register: ({commit}, credentials) => {
    axios.get(process.env.VUE_APP_API_HOST + '/api/businesses')
    .then((response) => {
      commit('REGISTER', response.data.data);
    })
    .catch(e => {
      dispatch('logout');
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};