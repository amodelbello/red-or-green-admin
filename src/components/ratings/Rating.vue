<template>
<div class="row">
  <form @submit.prevent="formSubmit(rating)" class="col s12">
    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li class="red-text" v-for="(error, k) in errors" :key="k">{{ error }}</li>
      </ul>
    </p>
    <div class="row">
      <div class="input-field col s6">
        <select id="user-select" v-model="rating.user" class="browser-default form-input-margin">
          <option value="" disabled>Select User</option>
          <option 
            v-for="(user, k) in users" 
            :key="k" 
            :value="user._id" 
          >{{ user.username }}</option>
        </select>
        <label for="user-select" class="active">User</label>
      </div>
      <div class="input-field col s6">
        <select id="chile-type" v-model="rating.category" class="browser-default form-input-margin">
          <option value="" disabled>Chile Type:</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
        </select>
        <label for="chile-type" class="active">Chile Type</label>
      </div>
    </div>
    <div class="row">
      <table class="input-field">
        <tr>
          <th colspan="5">Rating:</th>
        </tr>
        <tr>
          <td>
            <label>
              <input class="with-gap" v-model="rating.rating" type="radio" value="1" />
              <span>1</span>
            </label>
          </td>
          <td>
            <label>
              <input class="with-gap" v-model="rating.rating" type="radio" value="2" />
              <span>2</span>
            </label>
          </td>
          <td>
            <label>
              <input class="with-gap" v-model="rating.rating" type="radio" value="3" />
              <span>3</span>
            </label>
          </td>
          <td>
            <label>
              <input class="with-gap" v-model="rating.rating" type="radio" value="4" />
              <span>4</span>
            </label>
          </td>
          <td>
            <label>
              <input class="with-gap" v-model="rating.rating" type="radio" value="5" />
              <span>5</span>
            </label>
          </td>
        </tr>
      </table>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <textarea id="comments-textarea" class="materialize-textarea" v-model="rating.comments"></textarea>
        <label for="comments-textarea">Comments</label>
      </div>
    </div>

    <meta-dates 
      :show="isEdit"
      :created="rating.created"
      :updated="rating.updated"
    ></meta-dates>

    <button-set
      backToUrl=""
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

export default {
  name: 'Rating',
  components: {
    MetaDates,
    ButtonSet,
  },
  props: [
    'ratingId',
    'businessId'
  ],
  mixins: {
    utility,
  },
  data() {
    return {
      errors: [],
      redirect: true,
    }
  },
  computed: {
    ...mapGetters([
      'rating',
      'users',
    ]),

    isAdd() {
      return (this.ratingId === undefined);
    },

    isEdit() {
      return (this.ratingId !== undefined);
    },

    pageHeaderContent() {
      if (this.isAdd) {
        return 'Add Rating';
      } else {
        return 'Edit Rating';
      }
    },

  },
  methods: {
    ...mapActions([
      'getRating',
      'addRating',
      'editRating',
      'unsetRating',
      'getUsers',
    ]),

    formSubmit(rating) {
      // from prop
      rating.business = this.businessId;
      rating.category = this.getCategoryIdFromName(rating.category);

      if (this.validateForm()) {
        if (this.isAdd) {
          this.addRating(rating)
          .then(() => {
            // close modal...
            // toast...
          });

        } else if (this.isEdit) {
          this.editRating(rating)
          .then(() => {
            console.log('Added Rating');
            // close modal...
            // toast...
          });
        }
      }
    },
    
    validateForm() {
      this.errors = [];

      if (true) {
        return true;
      }

      return false;
    },

    getCategoryIdFromName(name) {
      switch (name) {
        case 'Red':
          return '5b199079e968472545119302';
        case 'Green':
          return '5b19b39552e70a499c889122';
        default:
          return false;
      }
    }
  },
  created() {
    if (this.ratingId !== undefined) {
      this.getRating(this.ratingId);
    } else {
      this.unsetRating();
    }

    const users = this.getUsers([{ key: 'role', value: 'default' }]).then((users) => {
      console.log(this.users);
    });
  }
}
</script>

<style scoped>
.form-input-margin {
  margin-top: 10px;
}
</style>