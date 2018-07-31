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
      error: false
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
      const loginPromise = this.login({
        email: this.email,
        password: this.password,
      })
      .catch(e => {
        this.error = true;
      });
    }
  },
}
</script>

<template>
<div id="login-page" class="row">
  <div class="row" v-if="error">
    <div class="col s6 offset-s3">
      <div class="card red lighten-5">
        <div class="card-content">
          <span class="card-title">Login Failed</span>
          <p>Incorrect Username/Password combination</p>
        </div>
        <div class="card-action red accent-1">
          <a @click="error = !error" class="black-text">Dismiss</a>
        </div>
      </div>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col s6 offset-s3">
      <img src="../../../src/assets/red_greenChile.png">
    </div>
  </div>

  <div class="row">
    <div class="col s6 offset-s3">
      <form @submit.prevent="submit">
          <div class="input-field col s12">
            <input id="email" type="email" v-model="email" class="validate">
            <label for="email">Email</label>
          </div>
        
          <div class="input-field col s12">
            <input id="password" type="password" v-model="password" class="validate">
            <label for="password">Password</label>
          </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">
          Log in
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>
#login-page {
  padding-top: 40px;
}
</style>
