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
    })
    .catch(e => {
      dispatch('logout');
    });
  },

  logout: ({commit}) => {
    console.log("LOGOUT CLICKED!!!");
    localStorage.removeItem('token');
    commit('LOGOUT');
  },

  register: ({commit}, credentials) => {
    axios.get('http://localhost:3000/api/businesses')
    .then((response) => {
      console.log(response.data.data);
      commit('REGISTER', response.data.data);
    })
    .catch(e => {
      console.log(`Problem registering new user: ${e}`);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};