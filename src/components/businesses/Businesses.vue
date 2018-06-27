<template>
<div class="row">
  <h1>Businesses</h1>
  <div v-if="loading" class="loading">
    <h6>Loading...</h6>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
  <div v-else>
    <table>
      <tr v-for="(business, k) in businesses" :key="k">
        <td>{{ business.name }}</td>
        <td>
          <span v-for="(rating, k) in business.ratings" :key="k">
            {{ rating.category.name }}: {{ rating.averageRating }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Businesses',
  props: {
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters([
      'businesses'
    ]),
  },
  methods: {
    ...mapActions([
      'getBusinesses'
    ]),
  },
  watch: {
    businesses: function(newVal, oldVal) {
      this.loading = false;
    }
  },
  created() {
    this.getBusinesses();
  },
}
</script>

<style scoped>
</style>