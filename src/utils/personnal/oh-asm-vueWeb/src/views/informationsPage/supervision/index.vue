<template>
  <div class="home">
    <div class="pageContent">
      <section class="pageItem pageMainContent ml15 mt15 pd15">
        <router-view :key="key" />
      </section>
    </div>
  </div>
</template>

<script>
// import siderNav from "@/components/siderNav";
export default {
  name: "supervision",
  // components: {
  //   siderNav
  // },
  data() {
    return {
      sidebarData: []
    };
  },
  methods: {
    getChildRouter(routes, path) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === path) {
          return routes[i];
        } else if (routes[i].children) {
          let routePage = this.getChildRouter(routes[i].children, path);
          if (routePage) {
            return routePage;
          }
        }
      }
    }
  },
  computed: {
    key() {
      return this.$router.fullPath;
    }
  },
  mounted() {
    let path =
      "/" +
      this.$route.path.split("/")[1] +
      "/" +
      this.$route.path.split("/")[2];
    let routes = this.$router.options.routes;
    let pageRoute = this.getChildRouter(routes, path);
    this.sidebarData = pageRoute ? pageRoute.children : [];
  }
};
</script>
