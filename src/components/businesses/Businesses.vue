<template>
<div class="row">
<h1>Businesses</h1>
<table>
  <tr v-for="(business, k) in businesses" :key="k">
    <td>{{ business.name }}</td>
    <td>Rating: {{ business.rating }}</td>
  </tr>
</table>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Businesses',
  props: {
  },
  computed: {
    ...mapGetters([
      'businesses'
    ]),
  },
  methods: {
    ...mapActions([
      'initBusinesses'
    ]),
  },
  created() {
    this.initBusinesses();
  }
}
</script>

<style scoped>
</style>