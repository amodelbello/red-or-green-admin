<template>
<div class="row">
  <h1>{{ pageHeaderContent }}</h1>
  <form @submit.prevent="formSubmit(business)" class="col s12">
    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li class="red-text" v-for="(error, k) in errors" :key="k">{{ error }}</li>
      </ul>
    </p>
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="business.name" v-model="business.name" class="validate">
        <label for="business.name" :class="{ active: business.name }">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="business.address.street" v-model="business.address.street" class="validate">
        <label for="business.address.street" :class="{ active: business.address.street }">Address</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="business.address.street2" v-model="business.address.street2" class="validate">
        <label for="business.address.street2" :class="{ active: business.address.street2 }">Address 2</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <input type="text" id="business.address.city" v-model="business.address.city" class="validate">
        <label for="business.address.city" :class="{ active: business.address.city }">City</label>
      </div>
      <div class="input-field col s4">
        <state-select :value.sync="business.address.state"></state-select>
      </div>
      <div class="input-field col s4">
        <input type="text" id="business.address.zip" v-model="business.address.zip" class="validate">
        <label for="business.address.zip" :class="{ active: business.address.zip }">Zip</label>
      </div>
    </div>

    <meta-dates 
      :show="isEdit"
      :created="business.created"
      :updated="business.updated"
    ></meta-dates>

    <button-set
      backToUrl="/businesses"
      buttonSetType="form"
      v-on:saveAndContinueClick="redirect = false"
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
  name: 'Business',
  components: {
    MetaDates,
    ButtonSet,
    StateSelect,
  },
  props: [
    'businessId'
  ],
  data() {
    return {
      errors: [],
      redirect: true,
    }
  },
  computed: {
    ...mapGetters([
      'business'
    ]),

    isAdd() {
      return (this.businessId === undefined);
    },

    isEdit() {
      return (this.businessId !== undefined);
    },

    pageHeaderContent() {
      if (this.isAdd) {
        return 'Add Business';
      } else {
        return 'Edit Business';
      }
    },

  },
  methods: {
    ...mapActions([
      'getBusiness',
      'addBusiness',
      'editBusiness',
      'unsetBusiness',
    ]),

    formSubmit(business) {
      if (this.validateForm()) {
        if (this.isAdd) {
          this.addBusiness(business);

          if (this.redirect) {
            this.$router.push('/businesses');
          } else {
            this.$router.push('/businesses/edit/' + business._id);
          }

        } else if (this.isEdit) {
          this.editBusiness(business);

          if (this.redirect) {
            this.$router.push('/businesses');
          }
        }
      }
    },
    
    validateForm() {
      if (this.business.name) {
        return true;
      }

      this.errors = [];

      if (!this.business.name) {
        this.errors.push('Business name is required.');
      }

      return false;
    }
  },
  created() {
    if (this.businessId !== undefined) {
      this.getBusiness(this.businessId);
    } else {
      this.unsetBusiness();
    }
  }
}
</script>

<style scoped>
</style>