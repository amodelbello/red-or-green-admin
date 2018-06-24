import { store } from '../store/store'

export default {

  isLoggedIn() {
    const token = this.getAuthToken();

    return (
      token !== undefined && 
      token !== null &&
      token !== ''
    );
  },

  getHttpAuthHeader() {
    const config = {
      headers: {'Authorization': 'Bearer ' + this.getAuthToken() }
    };

    return config;
  },

  getAuthToken() {
    return store.getters.authToken;
  }
}