import router from '../../router'
import axios from 'axios';

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

    credentials = {
      'email': 'adminuser@lalala.com',
      'password': 'password1',
    }

    axios.post('http://localhost:3000/api/login', credentials)
    .then((response) => {
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      commit('LOGIN', token);
      router.push('/businesses');
    })
    .catch(e => {
      dispatch('logout');
    });
  },

  logout: ({commit}) => {
    localStorage.removeItem('token');
    commit('LOGOUT');
  },

  register: ({commit}, credentials) => {
    axios.get('http://localhost:3000/api/businesses')
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