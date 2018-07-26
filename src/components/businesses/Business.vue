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
      <li :class="{ active: isEdit }">
        <div class="collapsible-header"><i class="material-icons">rate_review</i>Ratings</div>
        <div class="collapsible-body">
          <div class="row">
            <div class="input-field col s6">
              <table>
                <tr>
                  <th colspan="3">Red</th>
                </tr>
                <tr v-for="(rating, k) in redRatings" :key="k" @click="editRatingButtonClicked(rating)">
                  <td>{{ rating.updated | formatDate }}</td>
                  <td>{{ rating.user.username || '(pending user)' | truncateText }}</td>
                  <td class="red-text"><strong>{{ rating.rating }}</strong></td>
                </tr>
                <tr v-if="redRatings.length === 0">
                  <td colspan="3" class="grey-text">(no ratings yet)</td>
                </tr>
              </table>
            </div>
            <div class="input-field col s6">
              <table>
                <tr>
                  <th colspan="3">Green</th>
                </tr>
                <tr v-for="(rating, k) in greenRatings" :key="k" @click="editRatingButtonClicked(rating)">
                  <td>{{ rating.updated | formatDate }}</td>
                  <td>{{ rating.user.username || '(pending user)' | truncateText }}</td>
                  <td class="green-text"><strong>{{ rating.rating }}</strong></td>
                </tr>
                <tr v-if="greenRatings.length === 0">
                  <td colspan="3" class="grey-text">(no ratings yet)</td>
                </tr>
              </table>
            </div>

          </div>

          <div v-if="isEdit" class="row">
            <!-- Modal Trigger -->
            <div class="center-align">
              <a 
                id="ratings-modal-trigger"
                class="waves-effect waves-light btn modal-trigger"
                href="#ratings-modal"
                @click="addRatingButtonClicked()"
              >Add Rating</a>
            </div>
            <!-- Modal Structure -->
            <div id="ratings-modal" class="modal">
              <div class="modal-content">
                <rating 
                  :businessId="business._id"
                  v-on:ratingChanged="refreshRatings()"
                ></rating>
              </div>
            </div>
          </div>

        </div>
      </li>
      <li :class="{ active: isAdd }">
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
import Rating from '@/components/ratings/Rating.vue'
import MetaDates from '@/components/meta/Dates.vue'
import ButtonSet from '@/components/page/form/ButtonSet.vue'
import StateSelect from '@/components/page/form/StateSelect.vue'

export default {
  name: 'Business',
  components: {
    Rating,
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
      redRatings: [],
      greenRatings: [],
      collapsible: null,
    }
  },
  mixins: {
    utility,
  },
  filters: {
    formatDate(date) {
      return utility.formatDate(date, 'M/DD/YYYY');
    },
    truncateText(text) {
      return utility.truncateText(text, 20, true)
    }
  },
  computed: {
    ...mapGetters([
      'business',
      'ratings',
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
      'getRatings',
      'getRating',
      'unsetRating',
    ]),

    getChileRating(category) {
      return utility.findAverageRatingByCategoryName(this.business, category);
    },

    addRatingButtonClicked() {
      this.unsetRating();
      this.ratingModalInstance.open(); 
    },

    editRatingButtonClicked(rating) {
      this.getRating(rating._id);
      this.ratingModalInstance.open(); 
    },

    formSubmit(business) {
      if (this.validateForm()) {
        if (this.isAdd) {
          this.addBusiness(business)
          .then(() => {
            if (this.redirect) {
              this.$router.push('/businesses');
            } else {
              this.$router.push('/businesses/edit/' + this.business._id);
              utility.showToast('Business created.');
              this.collapsible.open(0);
            }
          });

        } else if (this.isEdit) {
          this.editBusiness(business)
          .then(() => {
            if (this.redirect) {
              this.$router.push('/businesses');
            } else {
              utility.showToast('Business saved.');
            } 
          });
        }
      }
    },
    
    validateForm() {
      this.errors = [];

      if (this.business.name) {
        return true;
      }

      if (!this.business.name) {
        this.errors.push('Business name is required.');
      }

      return false;
    },

    getRatingsByCategory(categoryName, categoryRatingsPropertyName) {
      const ratings = this.ratings.filter((rating) => {
        if (
          rating.category === utility.getCategoryIdFromName(categoryName) ||
          rating.category.name === categoryName
        ){
          return true;
        }
        return false;
      });
      this[categoryRatingsPropertyName] = ratings;
      return ratings;
    },

    loadRatings() {
      this.getRatings(this.businessId).then(() => {
        this.loadRatingsByCategory();
      });
    },

    refreshRatings() {
      this.loadRatingsByCategory();
      this.ratingModalInstance.close(); 
    },

    loadRatingsByCategory() {
      this.getRatingsByCategory('Red Chile', 'redRatings')
      this.getRatingsByCategory('Green Chile', 'greenRatings')
    }
  },

  created() {
    if (this.businessId !== undefined) {
      this.getBusiness(this.businessId);
      this.loadRatings();
    } else {
      this.loadRatings();
    }
  },

  mounted() {
    const el = document.getElementById('business-info');
    this.collapsible = M.Collapsible.init(el, {});

    const ratingModal = document.getElementById('ratings-modal');
    this.ratingModalInstance = M.Modal.init(ratingModal, {});
  }
}
</script>

<style scoped>
strong.chile-rating {
  font-size: 1.4em;
}
.collapsible {
  margin-bottom: 40px;
}
#ratings-modal-trigger {
  margin-top: 0px;
}
#business-info table tr {
  cursor: pointer;
}
#business-info table tr:hover {
  background-color: #f9f9f9;
}
</style>