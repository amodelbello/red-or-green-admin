<template>
<span v-if="buttonSetType == 'form'">
  <button class="
    btn 
    waves-effect 
    waves-light 
    right
    save-button
    " 
    type="submit" 
    name="action"
    @click="saveClick"
  >
    Save
  </button>

  <button class="
    btn 
    waves-effect 
    waves-light 
    right
    save-button
    " 
    type="submit" 
    name="action"
    @click="saveAndContinueClick"
  >
    Save & Continue
  </button>

  <router-link :to="backToUrl">
  <a class="
    waves-effect 
    waves-light 
    btn 
    white 
    teal-text 
    right
    back-button
  "
  >
    Back
    <i class="material-icons teal-text left">arrow_back</i>
  </a>
  </router-link>
</span>
<span v-else-if="buttonSetType == 'create'">
  <router-link :to="createUrl">
    <a class="
      btn 
      waves-effect 
      waves-light 
      right
      create-button
    "
    >
      Create
      <i class="material-icons right">add_circle</i>
    </a>
  </router-link>
</span>
</template>

<script>
export default {
  name: 'ButtonSet',
  props: [
    'buttonSetType',
    'backToUrl',
    'createUrl',
  ],
  methods: {
    saveClick() {
      this.$emit('saveClick');
    },
    saveAndContinueClick() {
      this.$emit('saveAndContinueClick');
    },
  }
}
</script>

<style scoped>
a.save-button, 
button.save-button {
  margin-left: 20px;
  margin-bottom: 40px;
}
a.create-button {
  margin-bottom: 40px;
}
</style>

