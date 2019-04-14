<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import utility from '@/mixins/utility.js';
import Loading from '@/components/page/Loading.vue';
import ButtonSet from '@/components/page/form/ButtonSet.vue';
import GridButtonSet from '@/components/page/form/GridButtonSet.vue';

export default {
  name: 'Businesses',
  components: {
    Loading,
    ButtonSet,
    GridButtonSet,
  },
  props: {},
  mixins: [utility],
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['businesses']),
  },
  methods: {
    ...mapActions(['getBusinesses', 'deleteBusiness']),

    deleteClick(businessId) {
      this.deleteBusiness(businessId);
    },
  },
  watch: {
    businesses: function(newVal, oldVal) {
      this.loading = false;
    },
  },
  created() {
    this.getBusinesses();
  },
};
</script>

<template>
  <div class="row">
    <h1>Businesses</h1>
    <div v-if="loading" class="loading">
      <loading/>
    </div>
    <div v-else>
      <table>
        <tr v-for="(business, k) in businesses" :key="k">
          <td>{{ business.name }}</td>

          <td>
            <strong class="red-text">{{ findAverageRatingByCategoryName(business, 'Red Chile') }}</strong>
          </td>

          <td>
            <strong
              class="green-text"
            >{{ findAverageRatingByCategoryName(business, 'Green Chile') }}</strong>
          </td>

          <td class="button-set">
            <grid-button-set
              :item="business"
              item-edit-path="/businesses"
              @deleteConfirmed="deleteClick(business._id)"
            />
          </td>
        </tr>
      </table>

      <button-set button-set-type="create" create-url="/businesses/add"/>
    </div>
  </div>
</template>

<style scoped>
td.button-set {
  width: 90px;
}
</style>