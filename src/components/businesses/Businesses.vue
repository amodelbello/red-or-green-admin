<template>
<div class="row">
  <h1>Businesses</h1>
  <div v-if="loading" class="loading">
    <loading></loading>
  </div>
  <div v-else>
    <table>
      <tr>
        <th>Name</th>
        <th>Red</th>
        <th>Green</th>
        <th>&nbsp;</th>
      </tr>
      <tr v-for="(business, k) in businesses" :key="k">

        <td>{{ business.name }}</td>

        <!--
          TODO: Refactor this please... my god.
        -->
        <td>
          <span v-for="(rating, k) in business.ratings" :key="k">
            <span v-if="rating.category.name == 'Red Chile'">
              {{ rating.averageRating }}
            </span>
          </span>
        </td>

        <td>
          <span v-for="(rating, k) in business.ratings" :key="k">
            <span v-if="rating.category.name == 'Green Chile'">
              {{ rating.averageRating }}
            </span>
          </span>
        </td>

        <td class="button-set">
          <grid-button-set
            :item="business"
            itemEditPath="/businesses"
            v-on:deleteConfirmed="deleteClick(business._id)"
          ></grid-button-set>
        </td>

      </tr>
    </table>

    <button-set
      buttonSetType="create"
      createUrl="/businesses/add"
    ></button-set>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Loading from '@/components/page/Loading.vue';
import ButtonSet from '@/components/page/form/ButtonSet.vue';
import GridButtonSet from '@/components/page/form/GridButtonSet.vue';

export default {
  name: 'Businesses',
  props: {
  },
  components: {
    Loading,
    ButtonSet,
    GridButtonSet,
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
td.button-set {
  width:90px;
}
</style>