<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import utility from '@/mixins/utility.js'
import Loading from '@/components/page/Loading.vue';
import ButtonSet from '@/components/page/form/ButtonSet.vue';
import GridButtonSet from '@/components/page/form/GridButtonSet.vue';

export default {
  name: 'Users',
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
      'users',
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'getUsers',
      'deleteUser',
    ]),

    deleteClick(userId) {
      this.deleteUser(userId)
    },
  },
  watch: {
    users: function(newVal, oldVal) {
      this.loading = false;
    }
  },
    mixins: {
    utility,
  },
  filters: {
    formatDate(date) {
      return utility.formatDate(date, 'M/DD/YYYY');
    },
  },
  created() {
    this.getUsers();
  },
}
</script>

<template>
<div class="row">
  <h1>Users</h1>
  <div v-if="loading" class="loading">
    <loading></loading>
  </div>
  <div v-else>
    <table>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Role</th>
      </tr>
      <tr v-for="(user, k) in users" :key="k">

        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.created | formatDate }}</td>
        <td>{{ user.updated | formatDate }}</td>
        <td>{{ user.role }}</td>

        <td class="button-set">
          <grid-button-set
            :item="user"
            itemNameFieldName="username"
            itemEditPath="/users"
            v-on:deleteConfirmed="deleteClick(user._id)"
          ></grid-button-set>
        </td>

      </tr>
    </table>

    <button-set
      buttonSetType="create"
      createUrl="/users/add"
    ></button-set>
  </div>

</div>
</template>

<style scoped>
td.button-set {
  width:90px;
}
</style>