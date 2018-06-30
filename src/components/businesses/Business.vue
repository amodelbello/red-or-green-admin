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
      <div class="input-field col" :class="{ s12: isAdd, s6: isEdit }">
        <input type="text" id="business.name" v-model="business.name" class="validate">
        <label for="business.name" :class="{ active: business.name }">Name</label>
      </div>
      <div v-if="isEdit" class="input-field col s4 offset-s1">
        <strong class="chile-rating red-text left">Red: {{ getChileRating('Red Chile') }}</strong>
        <strong class="chile-rating green-text right">Green: {{ getChileRating('Green Chile') }}</strong>
      </div>
    </div>

    <ul class="collapsible" id="business-info">
      <li>
        <div class="collapsible-header"><i class="material-icons">info_outline</i>Info</div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s6">
              <input type="text" id="business.address.street" v-model="business.address.street" class="validate">
              <label for="business.address.street" :class="{ active: business.address.street }">Address</label>
            </div>
            <div class="input-field col s6">
              <input type="text" id="business.phone" v-model="business.phone" class="validate">
              <label for="business.phone" :class="{ active: business.phone }">Phone</label>
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
        </div>
      </li>
    </ul>

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
import utility from '@/mixins/utility.js'
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
  mixins: {
    utility
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

    getChileRating(category) {
      return utility.findAverageRatingByCategoryName(this.business, category);
    },

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
  },
  mounted() {
    const el = document.getElementById('business-info');
    const addressFields = M.Collapsible.init(el, {});
  }
}
</script>

<style scoped>
strong.chile-rating {
  font-size: 1.6em;
}
.collapsible {
  margin-bottom: 40px;
}
</style>