import axios from 'axios';

const state = {
  businesses: {}
};

const getters = {
  businesses: state => state.businesses
};

const mutations = {
  SET_BUSINESSES(state, businesses) {
    state.businesses = businesses
  }
};

const actions = {
  initBusinesses: ({commit}) => {
    axios.get('http://localhost:3000/api/businesses')
    .then((response) => {
      console.log(response.data.data);
      commit('SET_BUSINESSES', response.data.data)
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