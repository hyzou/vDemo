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
      <el-footer>
        <footBar :footBarSettings="footBarSettings" />
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
      menuRoutes: [],
      headInfos: {
        title: "vue项目介绍文档",
        style: {
          textColor: "#005192",
          "background-color": "#fff",
          height: "86px",
          "line-height": "86px",
          "font-weight": "600",
          "font-size": "40px"
        }
      },
      footBarSettings: [
        {
          itemSeprator: "|",
          itemList: [
            {
              itemName: "会员注册",
              link: "#/informationsPage/signUp"
            },
            {
              itemName: "会员登录",
              link: "#/informationsPage/login"
            },
            {
              itemName: "关于我们",
              link: "#/informationsPage/contractUs"
            }
          ]
        },
        {
          itemList: [
            {
              itemName: "版权所有: 杭州安鸿科技股份有限公司前端开发项目组"
            },
            {
              itemName: "技术支持：杭州安鸿科技股份有限公司"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.menuRoutes = this.$store.getters.routerWhiteList[2].children;
  }
};
</script>
