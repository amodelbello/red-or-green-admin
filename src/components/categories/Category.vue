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

    <button-set
      backToUrl="/categories"
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

export default {
  name: 'Category',
  components: {
    MetaDates,
    ButtonSet,
  },
  props: [
    'categoryId'
  ],
  data() {
    return {
      errors: [],
      redirect: true,
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

          if (this.redirect) {
            this.$router.push('/categories');
          } else {
            this.$router.push('/categories/edit/' + category._id);
          }

        } else if (this.isEdit) {
          this.editCategory(category);

          if (this.redirect) {
            this.$router.push('/categories');
          }
        }
      }
    },
    
    validateForm() {
      this.errors = [];

      if (this.category.name) {
        return true;
      }

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
</style>