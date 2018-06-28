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
    href="#delete-modal"
    >
    <i class="material-icons">delete</i>
  </a>
</span>
</template>

<script>
export default {
  name: 'GridButtonSet',
  props: [
    'item',
    'itemIdFieldName',
    'itemEditPath',
  ],
  computed: {
    idFieldName() {
      return this.itemIdFieldName || '_id';
    },
    editUrl() {
      return this.itemEditPath + '/edit/' + this.item[this.idFieldName];
    }
  },
  methods: {
    deleteButtonClicked() {
      this.$emit('deleteButtonClicked');
    },

    editButtonClicked() {
      this.$router.push(this.editUrl);
    }
  },
}
</script>

<style scoped>
</style>

