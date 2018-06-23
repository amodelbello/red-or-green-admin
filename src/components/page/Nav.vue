<template>
<header>
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Red or Green Admin</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
  </nav>
</header>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    msg: String
  }
}
</script>

<style>
nav {
  text-align: left;
  padding: 0 5%;
}
</style>
