<template>
  <dl v-if="show" class="left">
    <dt>Created:</dt>
    <dd>{{ created | formatDate }}</dd>
    <dt>Last Modified:</dt>
    <dd>{{ updated | formatDate }}</dd>
  </dl>
</template>

<script>
import utility from '@/mixins/utility.js'

export default {
  name: 'MetaDates',
  props: [
    'show',
    'created',
    'updated',
  ],

  mixins: {
    utility,
  },
  filters: {
    formatDate(date) {
      return utility.formatDate(date);
    },
  },
}
</script>

<style scoped>
dt {
  color: #999;
}
dl {
  margin-top: 0px;
}
dd {
  margin: 0px 0px 20px 0px;
}
</style>