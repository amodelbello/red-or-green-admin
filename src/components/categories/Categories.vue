<template>
<div class="row">
  <h1>Categories</h1>
  <table>
    <tr v-for="(category, k) in categories" :key="k">
      <td>{{ category.name }}</td>
      <td class="edit-button-cell">
        <a class="btn-floating btn-small waves-effect waves-light right"><i class="material-icons">edit</i></a>
      </td>
    </tr>
  </table>
  <button class="btn waves-effect waves-light right" type="submit" name="action">
    Create
    <i class="material-icons right">add_circle</i>
  </button>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Categories',
  computed: {
    ...mapGetters([
      'categories'
    ]),
  },
  methods: {
    ...mapActions([
      'initCategories'
    ]),
  },
  created() {
    this.initCategories();
  }
}
</script>

<style scoped>
table {
  margin-bottom: 40px;
}
</style>