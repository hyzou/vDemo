<template>
  <div class="home">
    <div class="pageContent">
      <!--<section class="pageItem pageAside">-->
      <!--<siderNav :sidebarData="sidebarData" />-->
      <!--</section>-->
      <section class="pageItem pageMainContent ml15 mt15 pd15">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script>
// import siderNav from "@/components/siderNav";

export default {
  name: "assessment",
  // components: {
  //   siderNav
  // },
  data() {
    return {
      sidebarData: []
    };
  },
  methods: {
    /**
     * 点击事件名称命名：handle(前缀)+Function（功能名称）
     */
    /**
     * 获取当前路由，提取子路由
     */
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
