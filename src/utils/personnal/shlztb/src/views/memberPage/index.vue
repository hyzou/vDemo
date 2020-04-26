<template>
  <div class="layout-manage">
    <el-container style="width: 100%;height: 100%;">
      <el-header class="layout-manage-header">
        <mainTopLogo :headInfos="headInfos" />
      </el-header>
      <el-container class="layout-manage-container">
        <el-aside class="layout-manage-container-aside" width="200px">
          <siderNav :sidebarData="sidebarData" />
        </el-aside>
        <el-main style="background: #F0F2F5;">
          <section class="layout-manage-container-box">
            <router-view />
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import mainTopLogo from "@/components/mainTopLogo";
import siderNav from "@/components/siderNav";

export default {
  name: "layoutMember",
  components: {
    mainTopLogo,
    siderNav
  },
  data() {
    var routerData = this.$store.getters.routerAsyncList[0].children;
    return {
      sidebarData: routerData,
      headInfos: {
        title: "会员中心",
        operate: {
          showLogout: true
        },
        style: {
          textColor: "#fff",
          backgroundColor: "#005192",
          height: "60px",
          fontWeight: "500",
          fontSize: "20px"
        }
      }
    };
  }
};
</script>
