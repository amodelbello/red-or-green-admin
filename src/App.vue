<template>
  <div id="app">
    <Nav></Nav>

    <main class="container">
      <router-view/>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/page/Nav.vue'
import Footer from '@/components/page/Footer.vue'

export default {
  name: 'app',
  components: {
    Nav,
    Footer,
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
  color: #2c3e50;
}

h1 {
  font-size: 2rem;
  text-align: center;
}

a {
  cursor: pointer;
}
main {
  /* sticky footer */
  flex: 1 0 auto;
}

button, a.btn {
  margin-top: 40px;
}

button:focus,
div:focus,
ul:focus,
li:focus
{
  outline: none;
}

div.loading {
  margin-top: 40px;
  text-align: center;
}

strong {
  font-weight: bold;
}
</style>
