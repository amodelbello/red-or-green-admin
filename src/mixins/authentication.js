import { store } from '../store/store'

export default {

  isLoggedIn() {
    const token = store.getters.authToken;

    return (
      token !== undefined && 
      token !== null &&
      token !== ''
    );
  }
}