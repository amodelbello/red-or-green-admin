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
            v-on:deleteButtonClicked="deleteConfirm(category._id)"
          ></grid-button-set>
        </td>

      </tr>
    </table>

    <button-set
      buttonSetType="create"
      createUrl="/categories/add"
    ></button-set>
  </div>

  <!-- Delete Modal -->
  <div id="delete-modal" class="modal">
    <div class="modal-content">
      <h4 class="red-text">Are you sure?</h4>
      <p>You are about to permanently delete "<em><strong>{{ category.name }}</strong></em>"</p>
    </div>
    <div class="modal-footer">
      <a @click="cancelClick()" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a @click="deleteClick(category._id)" class="modal-close waves-effect waves-white btn red white-text">Delete</a>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Loading from '@/components/page/Loading.vue';
import ButtonSet from '@/components/page/buttonSets/ButtonSet.vue';
import GridButtonSet from '@/components/page/buttonSets/GridButtonSet.vue';

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
      'getCategory',
      'deleteCategory',
      'unsetCategory',
    ]),

    deleteConfirm(categoryId) {
      this.getCategory(categoryId);
      this.openModal();
    },

    cancelClick() {
      this.unsetCategory();
    },

    deleteClick(categoryId) {
      this.deleteCategory(categoryId)
    },

    closeModal() {
      this.modalInstance.close();
    },

    openModal() {
      this.modalInstance.open();
    }
  },
  watch: {
    categories: function(newVal, oldVal) {
      this.loading = false;
    }
  },
  created() {
    this.getCategories();
  },

  mounted() {
    // Modal
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, {});
    const el = document.getElementById('delete-modal');
    this.modalInstance = M.Modal.getInstance(el);
  }
}

</script>

<style scoped>
td.button-set {
  width:90px;
}
</style>