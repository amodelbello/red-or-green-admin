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
    axios.get(process.env.VUE_APP_API_HOST + '/api/businesses')
    .then((response) => {
      commit('SET_BUSINESSES', response.data.data);
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