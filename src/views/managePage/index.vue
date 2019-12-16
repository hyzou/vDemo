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
        <el-main class="topTargetItem" style="background: #F0F2F5;">
          <section class="layout-manage-container-box">
            <router-view />
          </section>
          <!-- 返回顶部的按钮 -->
          <el-backtop target=".topTargetItem" :bottom="100">
            <div class="backTopArrow">
              <i class="el-icon-caret-top"></i>
            </div>
          </el-backtop>
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
  name: "layoutManage",
  components: {
    mainTopLogo,
    siderNav
  },
  data() {
    var routerData = this.$store.getters.routerAsyncList[0].children;
    return {
      sidebarData: routerData,
      headInfos: {
        title: "管理员",
        operate: {
          showLogout: true
        },
        style: {
          color: "#fff",
          background: "#005192",
          height: "60px",
          "line-height": "60px",
          "font-weight": "500",
          "font-size": "20px"
        }
      }
    };
  }
};
</script>
