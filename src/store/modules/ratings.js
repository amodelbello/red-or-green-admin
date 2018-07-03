import axios from 'axios';
import authMixin from '@/mixins/authentication.js'

const state = {
  ratings: {},
  rating: {},
};

const getters = {
  ratings: state => state.ratings,
  rating: state => state.rating,
};

const mutations = {
  SET_RATINGS(state, ratings) {
    state.ratings = ratings
  },

  SET_RATING(state, rating) {
    state.rating = rating
  },

  EDIT_RATING(state, rating) {
    if (state.ratings.length > 0) {
      const index = state.ratings.map(c=> c._id).indexOf(rating._id);
      state.ratings.splice(index, 1, rating);
    }
    state.rating = rating;
  },

  ADD_RATING(state, rating) {
    if (state.ratings.length > 0) {
      state.ratings.push(rating);
    }

    state.rating = rating;
  },

  DELETE_RATING(state, rating) {
    if (state.ratings.length > 0) {
      const index = state.ratings.map(c => c._id).indexOf(rating._id);
      state.ratings.splice(index, 1);
    }
  },
};

const actions = {
  getRatings: ({commit}, businessId) => {
    return axios.get(process.env.VUE_APP_API_HOST + '/api/ratings/b/' + businessId)
    .then((response) => {
      commit('SET_RATINGS', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  unsetRating: ({commit}) => {
    commit('SET_RATING', {});
  },

  getRating: ({commit}, ratingId) => {
    return axios.get(
      process.env.VUE_APP_API_HOST + '/api/ratings/' + ratingId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('SET_RATING', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  editRating: ({commit}, rating) => {
    return axios.put(
      process.env.VUE_APP_API_HOST + '/api/ratings/' + rating._id, 
      rating,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('EDIT_RATING', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  addRating: ({commit}, rating) => {
    return axios.post(
      process.env.VUE_APP_API_HOST + '/api/ratings', 
      rating,
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('ADD_RATING', response.data.data);
    })
    .catch(e => {
      console.log(e.response);
    });
  },

  deleteRating: ({commit}, ratingId) => {
    return axios.delete(
      process.env.VUE_APP_API_HOST + '/api/ratings/' + ratingId, 
      authMixin.getHttpAuthHeader()
    )
    .then((response) => {
      commit('DELETE_RATING', response.data.data);
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