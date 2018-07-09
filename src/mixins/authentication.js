import { store } from '../store/store'

const getAuthToken = () => {
  return store.getters.authToken;
};

const getTokenPayload = () => {
    const token = getAuthToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload;
    } else {
      return null;
    }
};

export default {

  isLoggedIn() {
    const token = getAuthToken();

    if (token) {
      const payload = getTokenPayload();
      return payload.expiration > Date.now() / 1000;
    } else {
      return false;
    }
  },

  getHttpAuthHeader() {
    const config = {
      headers: { 'Authorization': 'Bearer ' + getAuthToken() }
    };

    return config;
  },

  getUserRole() {
    const payload = getTokenPayload();
    if (payload !== null) {
      const userRole = getTokenPayload().role;
      return userRole;
    } else {
      return null;
    }
  }
}