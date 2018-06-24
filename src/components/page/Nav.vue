<template>
<header>
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Red or Green Admin</a>
      <ul v-if="isLoggedIn()" id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/businesses">Businesses</a></li>
        <li><a @click="logoutClick">Logout</a></li>
      </ul>
      <ul v-else id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
  </nav>
</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Nav',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'authToken'
    ]),
  },
  methods: {
    ...mapActions([
      'logout'
    ]),

    isLoggedIn() {
      const token = this.authToken;
      if (
        token !== null &&
        token !== undefined
      ) {
        return true;
      }

      return false;
    },

    logoutClick() {
      this.logout();
      this.$router.push('/');
    }
  },
}
</script>

<style>
nav {
  text-align: left;
  padding: 0 5%;
}
</style>
