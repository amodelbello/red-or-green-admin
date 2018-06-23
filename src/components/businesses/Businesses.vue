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
export default {
  name: 'Businesses',
  props: {
  },
  computed: {
    businesses() {
      return this.$store.getters.businesses;
    }
  },
  created() {
    this.$store.dispatch('initStore');
  }
}
</script>

<style scoped>
</style>