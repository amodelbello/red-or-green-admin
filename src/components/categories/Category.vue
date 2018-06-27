<template>
<div class="row">
  <h1>{{ pageHeaderContent }}</h1>
  <form @submit.prevent="formSubmit(category)" class="col s12">
    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li class="red-text" v-for="(error, k) in errors" :key="k">{{ error }}</li>
      </ul>
    </p>
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="category.name" v-model="category.name" class="validate">
        <label for="category.name" :class="{ active: category.name }">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <textarea v-model="category.description" id="category.description" class="materialize-textarea"></textarea>
        <label for="category.description" :class="{ active: category.name }">Description</label>
      </div>
    </div>

    <meta-dates 
      :show="isEdit"
      :created="category.created"
      :updated="category.updated"
    ></meta-dates>

    <button class="btn waves-effect waves-light right" type="submit" name="action">
      Submit
      <i class="material-icons right">send</i>
    </button>

    <router-link to="/categories">
    <a id="back-button" class="waves-effect waves-light btn white teal-text right">
      Back
      <i class="material-icons teal-text left">arrow_back</i>
    </a>
    </router-link>
  </form>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MetaDates from '@/components/meta/Dates.vue'

export default {
  name: 'Category',
  components: {
    MetaDates
  },
  props: [
    'categoryId'
  ],
  data() {
    return {
      errors: [],
    }
  },
  computed: {
    ...mapGetters([
      'category'
    ]),

    isAdd() {
      return (this.categoryId === undefined);
    },

    isEdit() {
      return (this.categoryId !== undefined);
    },

    pageHeaderContent() {
      if (this.isAdd) {
        return 'Add Category';
      } else {
        return 'Edit Category';
      }
    },

  },
  methods: {
    ...mapActions([
      'getCategory',
      'addCategory',
      'editCategory',
      'unsetCategory',
    ]),

    formSubmit(category) {
      if (this.validateForm()) {
        if (this.isAdd) {
          this.addCategory(category);
          this.$router.push('/categories/edit/' + category._id);

        } else if (this.isEdit) {
          this.editCategory(category);
          this.$router.push('/categories');
        }
      }
    },
    
    validateForm() {
      if (this.category.name) {
        return true;
      }

      this.errors = [];

      if (!this.category.name) {
        this.errors.push('Category name is required.');
      }

      return false;
    }
  },
  created() {
    if (this.categoryId !== undefined) {
      this.getCategory(this.categoryId);
    } else {
      this.unsetCategory();
    }
  }
}
</script>

<style scoped>
a#back-button {
  margin-right: 20px;
}
</style>