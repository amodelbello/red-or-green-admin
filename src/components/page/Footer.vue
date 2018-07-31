<script>
export default {
  name: 'Footer',
  props: {
  },
  computed: {
    copyrightYear() {
      const today = new Date();
      return today.getFullYear();
    }
  }
}
</script>

<template>
<footer class="page-footer">
  <div class="footer-copyright">
    <div class="container">
    &copy; {{ copyrightYear }} Red or Green
    </div>
  </div>
</footer>
</template>

<style>
</style>


