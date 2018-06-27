<template>
<div class="row">
  <h1>Categories</h1>
  <div v-if="loading" class="loading">
    <h6>Loading...</h6>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
  <div v-else>
    <table>
      <tr v-for="(category, k) in categories" :key="k">

        <td>{{ category.name }}</td>

        <td class="edit-button-cell">
          <router-link 
            :to="{ 
              name: 'EditCategory', 
              params: { categoryId: category._id }
            }"
          >
            <a 
              class="
                btn-floating 
                btn-small 
                waves-effect 
                waves-light 
                right
              ">
                <i class="material-icons">edit</i>
            </a>
          </router-link>
        </td>

        <td class="delete-button-cell">
          <a 
            @click="deleteConfirm(category._id)" 
            class="
            btn-floating 
            btn-small 
            waves-effect 
            waves-light 
            right 
            red 
            modal-trigger
            "
            href="#delete-modal"
          >
            <i class="material-icons">delete</i>
          </a>
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
import ButtonSet from '@/components/page/ButtonSet.vue'

export default {
  name: 'Categories',
  components: {
    ButtonSet,
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
td.edit-button-cell,
td.delete-button-cell
{
  width:50px;
}
</style>