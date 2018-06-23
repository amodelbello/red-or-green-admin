<template>
<div>
  <img src="../../../src/assets/red_greenChile.png">
  <h1>This is Register.</h1>  
  <router-link :to="{name: 'Login'}" tag="a">Login</router-link>
</div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
  color: maroon;
}
</style>