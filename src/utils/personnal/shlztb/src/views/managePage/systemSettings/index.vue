<template>
  <div class="layout" style="height:100%;">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "layoutManage",
  components: {},
  data() {
    return {
      sidebarData: ["1", "2", "3", "4"]
    };
  }
};
</script>
