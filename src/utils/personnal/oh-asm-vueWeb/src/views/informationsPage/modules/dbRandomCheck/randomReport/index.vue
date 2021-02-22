<template>
  <div class="home">
    <router-view :key="pathKey" />
  </div>
</template>

<script>
export default {
  name: "randomReport",
  computed: {
    pathKey() {
      return this.$route.fullPath;
    }
  }
};
</script>
