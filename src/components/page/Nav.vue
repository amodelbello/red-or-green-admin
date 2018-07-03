<template>
<header>
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Red or Green Admin</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul 
        v-if="isLoggedIn()" 
        id="nav-mobile" 
        class="right hide-on-med-and-down"
      >
        <li><a href="/businesses">Businesses</a></li>
        <li><a href="/categories">Categories</a></li>
        <li><a href="/users">Users</a></li>
        <li><a @click="logoutClick">Logout</a></li>
      </ul>
      <ul v-else id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
  </nav>

  <ul 
    v-if="isLoggedIn()" 
    class="sidenav" 
    id="mobile-demo"
  >
    <li><a href="/businesses">Businesses</a></li>
    <li><a href="/categories">Categories</a></li>
    <li><a href="/users">Users</a></li>
    <li><a @click="logoutClick">Logout</a></li>
  </ul>
  <ul 
    v-else
    class="sidenav" 
    id="mobile-demo"
  >
    <li><a href="/">Login</a></li>
    <li><a href="/register">Register</a></li>
  </ul>
</header>
</template>

<script>
import authMixin from '@/mixins/authentication.js'
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
      return authMixin.isLoggedIn();
    },

    logoutClick() {
      this.logout();
      this.$router.push('/');
    }
  },
  mixins: {
    authMixin
  },
  mounted() {
    // Sidenav
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  }
}
</script>

<style>
nav {
  text-align: left;
  padding: 0 5%;
}
</style>
