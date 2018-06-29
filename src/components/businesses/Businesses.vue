<template>
<div class="row">
  <h1>Businesses</h1>
  <div v-if="loading" class="loading">
    <loading></loading>
  </div>
  <div v-else>
    <table>
      <tr v-for="(business, k) in businesses" :key="k">

        <td>{{ business.name }}</td>

        <td>
          <strong class="red-text">
            {{ getChileRating(business, 'Red Chile') }}
          </strong>
        </td>

        <td>
          <strong class="green-text">
            {{ getChileRating(business, 'Green Chile') }}
          </strong>
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
import utility from '@/mixins/utility.js'
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
  mixins: {
    utility
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
      'getBusinesses',
      'deleteBusiness'
    ]),

    deleteClick(businessId) {
      this.deleteBusiness(businessId)
    },

    getChileRating(business, category) {
      return utility.findAverageRatingByCategoryName(business, category);
    }

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