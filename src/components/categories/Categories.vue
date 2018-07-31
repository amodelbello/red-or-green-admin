<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Loading from '@/components/page/Loading.vue';
import ButtonSet from '@/components/page/form/ButtonSet.vue';
import GridButtonSet from '@/components/page/form/GridButtonSet.vue';

export default {
  name: 'Categories',
  components: {
    Loading,
    ButtonSet,
    GridButtonSet,
  },
  data() {
    return {
      modalInstance: null,
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'category',
    ]),
  },
  methods: {
    ...mapActions([
      'getCategories',
      'deleteCategory',
    ]),

    deleteClick(categoryId) {
      this.deleteCategory(categoryId)
    },
  },
  watch: {
    categories: function(newVal, oldVal) {
      this.loading = false;
    }
  },
  created() {
    this.getCategories();
  },
}
</script>

<template>
<div class="row">
  <h1>Categories</h1>
  <div v-if="loading" class="loading">
    <loading></loading>
  </div>
  <div v-else>
    <table>
      <tr v-for="(category, k) in categories" :key="k">

        <td>{{ category.name }}</td>

        <td class="button-set">
          <grid-button-set
            :item="category"
            itemEditPath="/categories"
            v-on:deleteConfirmed="deleteClick(category._id)"
          ></grid-button-set>
        </td>

      </tr>
    </table>

    <button-set
      buttonSetType="create"
      createUrl="/categories/add"
    ></button-set>
  </div>

</div>
</template>

<style scoped>
td.button-set {
  width:90px;
}
</style>