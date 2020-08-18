<template>
  <div class="layoutFront">
    <el-container>
      <section class="headerBarContainer">
        <headerBar class="mgAuto toplogoWidth" :headInfos="headInfos" />
      </section>
      <el-header style="height:38px;">
        <horizenNav :headrouter="menuRoutes" />
      </el-header>
      <el-main class="positionFix mainContentBox">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import horizenNav from "@/components/horizenNav";

import { staticRouterMap } from "@/router/index";
import logo from "@/assets/mainlogo.png";
export default {
  name: "layoutFront",
  components: {
    headerBar,
    horizenNav
  },
  data() {
    return {
      menuRoutes: [],
      headInfos: {
        // title: "浙江省粮食安全市县长责任制考核信息系统",
        logoStyle: { imgSrc: logo, showImg: true, style: { top: "18px" } },
        style: {
          textColor: "#005192",
          "background-color": "",
          height: "86px",
          "line-height": "86px",
          "font-weight": "600",
          "font-size": "22px"
        },
        operate: true,
        loginName: this.$store.getters["user/userInfos"].userName,
        unreadNotice: 6
      }
    };
  },
  mounted() {
    this.menuRoutes = staticRouterMap[4].children;
  }
};
</script>
