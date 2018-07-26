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
        <select
          id="user-select" 
          v-model="rating.user._id" 
          class="browser-default form-input-margin"
          :disabled="isEdit"
        >
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
        <select
          id="chile-type"
          v-model="rating.category._id"
          class="browser-default form-input-margin"
          :disabled="isEdit"
        >
          <option value="" disabled>Chile Type:</option>
          <option :value="redCategoryId">Red</option>
          <option :value="greenCategoryId">Green</option>
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
        <textarea 
          id="comments-textarea" 
          class="materialize-textarea" 
          v-model="rating.comments"
        ></textarea>
        <label 
          for="comments-textarea"
          :class="{ active: rating.comments }"
        >Comments</label>
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
      hideContinueButton="true"
      :showDeleteButton="isEdit"
      v-on:saveAndContinueClick="redirect = false"
      v-on:saveClick="redirect = true"
      v-on:deleteClick="doDelete = true"
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
    'businessId'
  ],
  mixins: {
    utility,
  },
  data() {
    return {
      errors: [],
      redirect: true,
      doDelete: false,
    }
  },
  computed: {
    ...mapGetters([
      'rating',
      'users',
    ]),

    redCategoryId() {
      return utility.getCategoryIdFromName('red');
    },

    greenCategoryId() {
      return utility.getCategoryIdFromName('green');
    },

    isAdd() {
      return (this.rating._id === undefined);
    },

    isEdit() {
      return (this.rating._id !== undefined);
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
      'deleteRating',
      'unsetRating',
      'getUsers',
    ]),

    formSubmit(rating) {
      // from prop
      rating.business = this.businessId;
      rating.category = utility.getCategoryIdFromName(rating.category);

      if (this.validateForm()) {
        if (this.isAdd) {
          this.addRating(rating)
          .then(() => {
            this.ratingChanged();
            utility.showToast('Rating added.');
          });

        } else if (this.isEdit) {

          if (this.doDelete) {
            this.doDelete = false;
            this.deleteRating(rating._id)
            .then(() => {
              this.ratingChanged();
              utility.showToast('Rating deleted.', 'red');
            });


          } else {
            this.editRating(rating)
            .then(() => {
              this.ratingChanged();
              utility.showToast('Rating saved.');
            });
          }
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

    ratingChanged() {
      this.$emit('ratingChanged');
    },

  },
  created() {
    if (this.isEdit) {
      this.getRating(this.ratingId);
    } else {
      this.unsetRating();
    }

    const users = this.getUsers([{ key: 'role', value: 'default' }]).then((users) => {
      // console.log(this.users);
    });
  }
}
</script>

<style scoped>
.form-input-margin {
  margin-top: 10px;
}
</style>