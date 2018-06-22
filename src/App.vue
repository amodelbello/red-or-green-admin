<template>
  <div id="app">
    <header>
    <Nav msg="Hello"></Nav>
    </header>
    <main id="main">
    <img src="./assets/logo.png">
    <router-view/>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/page/Nav.vue'
import Footer from '@/components/page/Footer.vue'
import Login from '@/components/authentication/Login.vue'
import Register from '@/components/authentication/Register.vue'

export default {
  name: 'app',
  components: {
    Nav,
    Footer,
    Login,
    Register,
  }
}
</script>

<style>
#app {
  /* sticky footer */
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  /* other */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  /* sticky footer */
  flex: 1 0 auto;
}
</style>
