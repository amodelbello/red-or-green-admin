<template>
<div class="row">
<h1>Categories</h1>
<table>
  <tr v-for="(category, k) in categories" :key="k">
    <td>{{ category.name }}</td>
    <!-- <td>Rating: {{ business.rating }}</td> -->
  </tr>
</table>
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
</style>