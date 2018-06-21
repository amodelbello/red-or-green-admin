<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <!-- <Login msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Login from '@/components/authentication/Login.vue'
import Register from '@/components/authentication/Register.vue'

export default {
  name: 'app',
  components: {
    Login,
    Register,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
