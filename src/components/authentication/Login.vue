<template>
<div class="row">
  <img src="../../../src/assets/red_greenChile.png">
  <form class="col s6 offset-s3" @submit.prevent="submit">
    <div class="row">
      <div class="input-field col s12">
        <input id="email" type="email" v-model="email" class="validate">
        <label for="email">Email</label>
      </div>
    </div>
    
    <div class="row">
      <div class="input-field col s12">
        <input id="password" type="password" v-model="password" class="validate">
        <label for="password">Password</label>
      </div>
    </div>
    <button class="btn waves-effect waves-light right" type="submit" name="action">
      Log in
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  props: {
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters([
      'authToken'
    ]),
  },
  methods: {
    ...mapActions([
      'login'
    ]),

    submit() {
      this.login({
        email: this.email,
        password: this.password,
      });
    }
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
