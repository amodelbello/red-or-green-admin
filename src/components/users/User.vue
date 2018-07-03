<template>
<div class="row">
  <h1>{{ pageHeaderContent }}</h1>
  <form @submit.prevent="formSubmit(user)" class="col s12">

    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li class="red-text" v-for="(error, k) in errors" :key="k">{{ error }}</li>
      </ul>
    </p>

    <div class="row">
      <div class="input-field col s6">
        <input type="email" id="user.email" v-model="user.email" class="validate">
        <label for="user.email" :class="{ active: user.email }">Email</label>
      </div>
      <div class="input-field col s6">
        <input type="text" id="user.username" v-model="user.username" class="validate">
        <label for="user.username" :class="{ active: user.username }">Username</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <input type="text" id="user.firstName" v-model="user.firstName" class="validate">
        <label for="user.firstName" :class="{ active: user.firstName }">Fist Name</label>
      </div>
      <div class="input-field col s6">
        <input type="text" id="user.lastName" v-model="user.lastName" class="validate">
        <label for="user.lastName" :class="{ active: user.lastName }">Last Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <input type="text" id="user.address.street" v-model="user.address.street" class="validate">
        <label for="user.address.street" :class="{ active: user.address.street }">Address</label>
      </div>
      <div class="input-field col s6">
        <input type="text" id="user.phone" v-model="user.phone" class="validate">
        <label for="user.phone" :class="{ active: user.phone }">Phone</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <input type="text" id="user.address.city" v-model="user.address.city" class="validate">
        <label for="user.address.city" :class="{ active: user.address.city }">City</label>
      </div>
      <div class="input-field col s4">
        <state-select :value.sync="user.address.state"></state-select>
      </div>
      <div class="input-field col s4">
        <input type="text" id="user.address.zip" v-model="user.address.zip" class="validate">
        <label for="user.address.zip" :class="{ active: user.address.zip }">Zip</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <a class="waves-effect waves-light btn-small grey lighten-4 black-text" @click="togglePasswordField()">Change Password</a>
      </div>
      <div class="input-field col s6" :class="{ hide: !passwordFieldIsVisible }">
        <input type="password" id="user.password" v-model="user.password" class="validate">
        <label for="user.password" :class="{ active: user.password }">New Password</label>
      </div>
    </div>

    <meta-dates 
      :show="isEdit"
      :created="user.created"
      :updated="user.updated"
    ></meta-dates>

    <button-set
      backToUrl="/users"
      buttonSetType="form"
      v-on:saveAndContinueClick="saveAndContinueButtonClick()"
      v-on:saveClick="redirect = true"
    ></button-set>
  </form>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MetaDates from '@/components/meta/Dates.vue'
import ButtonSet from '@/components/page/form/ButtonSet.vue'
import StateSelect from '@/components/page/form/StateSelect.vue'

export default {
  name: 'User',
  components: {
    MetaDates,
    ButtonSet,
    StateSelect,
  },
  props: [
    'userId'
  ],
  data() {
    return {
      errors: [],
      redirect: true,
      passwordFieldIsVisible: false,
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),

    isAdd() {
      return (this.userId === undefined);
    },

    isEdit() {
      return (this.userId !== undefined);
    },

    pageHeaderContent() {
      if (this.isAdd) {
        return 'Add User';
      } else {
        return 'Edit User';
      }
    },

  },
  methods: {
    ...mapActions([
      'getUser',
      'addUser',
      'editUser',
      'unsetUser',
    ]),

    saveAndContinueButtonClick() {
      this.redirect = false;
      this.passwordFieldIsVisible = false;
    },

    togglePasswordField() {
      if (this.passwordFieldIsVisible) {
        this.passwordFieldIsVisible = false;
        this.user.password = '';
      } else {
        this.passwordFieldIsVisible = true;
      } 
    },

    formSubmit(user) {
      if (this.validateForm()) {
        if (this.isAdd) {
          this.addUser(user)
          .then(() => {
            if (this.redirect) {
              this.$router.push('/users');
            } else {
              this.$router.push('/users/edit/' + this.user._id);
            }
          });

        } else if (this.isEdit) {
          this.editUser(user)
          .then(() => {
            if (this.redirect) {
              this.$router.push('/users');
            }
          });
        }
      }
    },
    
    validateForm() {
      this.errors = [];

      if (this.user.username) {
        return true;
      }

      if (!this.user.username) {
        this.errors.push('Username is required.');
      }

      return false;
    }
  },
  created() {
    if (this.userId !== undefined) {
      this.getUser(this.userId).then(() => {
      });
    } else {
      this.unsetUser();
    }
  }
}
</script>

<style scoped>
</style>