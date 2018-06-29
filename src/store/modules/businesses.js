import axios from 'axios';
import authMixin from '@/mixins/authentication.js'

const state = {
  businesses: {},
  business: {},
};

const getters = {
  businesses: state => state.businesses,
  business: state => state.business,
};

const mutations = {
  SET_BUSINESSES(state, businesses) {
    state.businesses = businesses
  },

  SET_BUSINESS(state, business) {
    state.business = business
  },

  EDIT_BUSINESS(state, business) {
    if (state.businesses.length > 0) {
      const index = state.businesses.map(c=> c._id).indexOf(business._id);
      state.businesses.splice(index, 1, business);
    }
    state.business = business;
  },

  ADD_BUSINESS(state, business) {
    if (state.businesses.length > 0) {
      state.businesses.push(business);
    }

    state.business = business;
  },

  DELETE_BUSINESS(state, business) {
    if (state.businesses.length > 0) {
      const index = state.businesses.map(c => c._id).indexOf(business._id);
      state.businesses.splice(index, 1);
    }
  },
};

const actions = {
  getBusinesses: ({commit}) => {
    axios.get(process.env.VUE_APP_API_HOST + '/api/businesses')
    .then((response) => {
      commit('SET_BUSINESSES', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  getBusiness: ({commit}, businessId) => {
    axios.get(
      process.env.VUE_APP_API_HOST + '/api/businesses/' + businessId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_BUSINESS', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  editBusiness: ({commit}, business) => {
    axios.put(
      process.env.VUE_APP_API_HOST + '/api/businesses/' + business._id, 
      business,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('EDIT_BUSINESS', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  addBusiness: ({commit}, business) => {
    axios.post(
      process.env.VUE_APP_API_HOST + '/api/businesses', 
      business,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('ADD_BUSINESS', response.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  },

  deleteBusiness: ({commit}, businessId) => {
    axios.delete(
      process.env.VUE_APP_API_HOST + '/api/businesses/' + businessId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('DELETE_BUSINESS', response.data.data);
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