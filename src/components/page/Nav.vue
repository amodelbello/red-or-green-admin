<template>
<header>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo center">Red or Green Admin</a>
      <a href="" data-target="nav-links" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
      <ul 
        v-if="isLoggedIn()" 
        id="nav-mobile" 
        class="right"
      >
        <li id="display-name">
          <a class='dropdown-trigger' href='' data-target='dropdown1'>
            Hello {{ displayName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id='dropdown1' class='dropdown-content'>
            <li><a @click="logoutClick">Logout</a></li>
          </ul>
        </li>
      </ul>
      <ul v-else id="nav-mobile" class="right">
        <li><a href="/">Login</a></li>
      </ul>
    </div>
  </nav>

  <ul 
    v-if="isLoggedIn()" 
    class="sidenav" 
    id="nav-links"
  >
    <li><a href="/businesses">Businesses</a></li>
    <li><a href="/categories">Categories</a></li>
    <li v-if="userRole == 'super'"><a href="/users">Users</a></li>
  </ul>
  <ul 
    v-else
    class="sidenav" 
    id="nav-links"
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

    displayName() {
      return authMixin.getDisplayName();
    },

    userRole() {
      return authMixin.getUserRole();
    }
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
    const sidenavElems = document.querySelectorAll('.sidenav');
    const sidenavInstances = M.Sidenav.init(sidenavElems, {});

    // Dropdown
    const dropdownElems = document.querySelectorAll('.dropdown-trigger');
    const dropdownInstances = M.Dropdown.init(dropdownElems, dropdownElems);
  }
}
</script>

<style>
nav {
  text-align: left;
  padding: 0 5%;
}

#dropdown1 {
  top: 70px !important;
}
</style>
