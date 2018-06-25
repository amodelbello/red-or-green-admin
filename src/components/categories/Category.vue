<template>
<div class="row">
  <h1>{{ pageHeaderContent }}</h1>
  <form action="">
    <div class="row">
      <div class="input-field col s12">
        <input type="text" id="category.name" v-model="category.name" class="validate">
        <label for="category.name" :class="{ active: category.name }">Name</label>
      </div>
    </div>
    <div class="row">
    <form @submit.prevent="formSubmit(category)" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <textarea v-model="category.description" id="category.description" class="materialize-textarea"></textarea>
          <label for="category.description" :class="{ active: category.name }">Description</label>
        </div>
      </div>

      <dl v-if="isEdit" class="left">
        <dt>Created:</dt>
        <dd>{{ category.created | formatDate }}</dd>
        <dt>Last Modified:</dt>
        <dd>{{ category.updated | formatDate }}</dd>
      </dl>

      <button class="btn waves-effect waves-light right" type="submit" name="action">
        Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
  </form>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import format from '@/mixins/formatting.js'

export default {
  name: 'Category',
  props: [
    'categoryId'
  ],
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
      if (this.isAdd) {
        this.addCategory(category);
        this.$router.push('/categories/edit/' + category._id);

      } else if (this.isEdit) {
        this.editCategory(category);
        this.$router.push('/categories');
      }
    }
  },
  mixins: {
    format,
  },
  filters: {
    formatDate(date) {
      return format.formatDate(date);
    },
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
dt {
  color: #999;
}
dl {
  margin-top: 0px;
}
dd {
  margin: 0px 0px 20px 0px;
}
</style>