<template>
  <div class="layoutFront">
    <el-container>
      <section class="home-mainbord">
        <mainTopLogo :headInfos="headInfos" />
      </section>
      <el-header style="height:38px">
        <horizenNav :headrouter="menuRoutes" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="mo_foot">
        <footBar />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import mainTopLogo from "@/components/mainTopLogo";
import horizenNav from "@/components/horizenNav";
import footBar from "@/components/footBar";

export default {
  name: "layoutFront",
  components: {
    mainTopLogo,
    horizenNav,
    footBar
  },
  data() {
    return {
      carouselSrcs: ["1", "2", "3", "4"],
      cardlistsArray: ["1", "2", "3", "4"],
      menuRoutes: [],
      headInfos: {
        title: "浙江社会贸易粮公共交易平台",
        style: {
          textColor: "#005192",
          backgroundColor: "#fff",
          height: "86px",
          fontWeight: "600",
          fontSize: "40px"
        }
      }
    };
  },
  mounted() {
    this.menuRoutes = this.$store.getters.routerWhiteList[2].children;
  }
};
</script>
