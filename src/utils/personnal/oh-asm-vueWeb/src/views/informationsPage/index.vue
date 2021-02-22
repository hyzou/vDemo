<template>
  <div class="layoutFront">
    <el-container>
      <section class="headerBarContainer">
        <el-row>
          <el-col :span="19">
            <headerBar class="mgAuto" :headInfos="headInfos" />
          </el-col>
          <!--<el-col :span="13">-->
          <!--<el-header style="height:86px;">-->
          <!--<horizenNav :headrouter="menuRoutes" />-->
          <!--</el-header>-->
          <!--</el-col>-->
          <el-col :span="5" align="right">
            <div class="headerOperation displayFlex pt30 pr60">
              <div class="text-white mr20">
                <el-image
                  class="mr5"
                  :src="headPortrait"
                  :style="{ width: '26px', verticalAlign: 'bottom' }"
                ></el-image>
                <div
                  class="displayInlineBlock"
                  style="line-height: 16px;font-size: 16px;padding-top: 5px;padding-bottom: 4px;"
                >
                  {{ loginName }}
                </div>
              </div>
              <div
                class="text-white cursor mr20"
                title="政务云系统切换"
                @click="handleChangeGovSystem"
                style="padding-top:3px;"
              >
                <em class="iconfont iconzhengwuyun fontSize20"></em>
              </div>
              <div
                class="text-white cursor mr20"
                title="责任制系统切换"
                @click="handleChangeSystem"
                style="padding-top:3px;"
              >
                <i class="iconfont iconqiehuan1 fontSize20"></i>
              </div>
              <div
                class="text-white cursor mr20"
                title="我的消息"
                style="padding-top:3px;"
              >
                <i class="iconfont iconxiaoxi2 fontSize20"></i>
              </div>
              <div
                class="text-white cursor"
                style="padding-top:3px;"
                title="退出登录"
                @click="handleLogout"
              >
                <i class="iconfont iconguanbi1 fontSize20"></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
      <el-main class="positionFix mainContentBox">
        <div class="home">
          <el-row class="pageContent">
            <div class="pageItem pageAside">
              <siderNav :sidebarData="menuRoutes" />
            </div>
            <div class="pageMainContent">
              <router-view :key="routeKey" />
            </div>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
// import horizenNav from "@/components/horizenNav";
import siderNav from "@/components/siderNav";
import provincelogo from "@/assets/mainlogo/province.png";
import citylogo from "@/assets/mainlogo/city.png";
import distractlogo from "@/assets/mainlogo/distract.png";
import headPortrait from "@/assets/headPortrait.png";
export default {
  name: "layoutFront",
  components: {
    headerBar,
    // horizenNav,
    siderNav
  },
  data() {
    let mainlogo = provincelogo,
      role = sessionStorage.getItem("sysType");
    if (role == "oh-asm-province") {
      mainlogo = provincelogo;
    } else if (role == "oh-asm-city") {
      mainlogo = citylogo;
    } else if (role == "oh-asm-district") {
      mainlogo = distractlogo;
    }
    return {
      headPortrait: headPortrait,
      loginName: this.$store.getters["user/userInfos"].name,
      unreadNotice: 0,
      nowdate: new Date().getTime(),
      menuRoutes: [],
      headInfos: {
        // title: "浙江省粮食安全市县长责任制考核信息系统",
        logoStyle: { imgSrc: mainlogo, showImg: true, style: { top: "20px" } },
        style: {
          textColor: "#005192",
          "background-color": "",
          height: "86px",
          "line-height": "86px",
          "font-weight": "600",
          "font-size": "22px"
        },
        operate: false
      }
    };
  },
  methods: {
    handleChangeGovSystem() {
      window.location.href = "http://59.202.38.200:8888";
      // this.$message.warning("切换到政务云集成首页");
    },
    handleChangeSystem() {
      this.$router.push({ name: "choseSystem", params: { isReload: "true" } });
    },
    handleLogout() {
      this.$confirm("确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        location.href = this.$global.logout;
      });
    }
  },
  mounted() {
    this.menuRoutes = this.$store.getters["user/asyncRouterslist"][4].children;
  },
  computed: {
    routeKey() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  }
};
</script>
