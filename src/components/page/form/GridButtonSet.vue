<template>
<span>
  <a 
    @click="editButtonClicked"
    class="
      btn-floating 
      btn-small 
      waves-effect 
      waves-light 
      left
    "
    >
      <i class="material-icons">edit</i>
  </a>

  <a 
    @click="deleteButtonClicked"
    class="
      btn-floating 
      btn-small 
      waves-effect 
      waves-light 
      right 
      red 
      modal-trigger
    "
    :href="modalIdWithHash"
    >
    <i class="material-icons">delete</i>
  </a>

  <!-- Delete Modal -->
  <div :id="modalId" class="modal">
    <div class="modal-content">
      <h4 class="red-text">Are you sure?</h4>
      <p>You are about to permanently delete "<em><strong>{{ item[nameFieldName] }}</strong></em>"</p>
    </div>
    <div class="modal-footer">
      <a @click="deleteCancelled()" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a @click="deleteConfirmed()" class="modal-close waves-effect waves-white btn red white-text">Delete</a>
    </div>
  </div>
</span>
</template>

<script>
export default {
  name: 'GridButtonSet',
  props: [
    'item',
    'itemIdFieldName',
    'itemNameFieldName',
    'itemEditPath',
  ],
  computed: {
    idFieldName() {
      return this.itemIdFieldName || '_id';
    },

    nameFieldName() {
      return this.itemNameFieldName || 'name'
    },

    editUrl() {
      return this.itemEditPath + '/edit/' + this.item[this.idFieldName];
    },

    modalId() {
      return 'delete-modal-' + this.item[this.idFieldName];
    },

    modalIdWithHash() {
      return '#delete-modal-' + this.item[this.idFieldName];
    },
  },
  methods: {
    deleteButtonClicked() {
      this.openModal();
    }, 

    deleteCancelled() {
      this.closeModal();
    },

    deleteConfirmed() {
      this.$emit('deleteConfirmed');
      this.closeModal();
    },

    editButtonClicked() {
      this.$router.push(this.editUrl);
    },

    closeModal() {
      this.modalInstance.close();
    },

    openModal() {
      this.modalInstance.open();
    }
  },
  mounted() {
    // Delete Confirm Modal
    const el = document.getElementById(this.modalId);
    this.modalInstance = M.Modal.init(el, {});
  }
}
</script>

<style scoped>
</style>

