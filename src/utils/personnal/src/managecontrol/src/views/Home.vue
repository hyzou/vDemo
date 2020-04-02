<template>
  <div class="home">
    <!-- <navbarGroup /> -->
    <!-- <tabContainerGroup /> -->
  </div>
</template>

<script>
// import navbarGroup from "@/components/navbarGroup.vue";
// import tabContainerGroup from "@/components/tabContainerGroup.vue";
import { Toast } from "mint-ui";

export default {
  name: "home",
  components: {
    // navbarGroup,
    // tabContainerGroup
  },
  data() {
    return {
      /* 登录名 */
      userInfo: {
        // tokenId: "hch1",
        // userName: "crk",
        // userId: "2305"
      },
      mainUsers: {},
      selected: ""
      // token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNT0JJTEVfTE9HSU4iLCJhdWQiOiJjcmsiLCJpc3MiOiJPTkhPTkVTVCIsInVkaWQiOiJjcmstZGVmYXVsdCIsImV4cCI6MTU2NjU0OTMwNywidXNlciI6IntcclxuICBcInVzZXJJZFwiIDogXCIyMzA1XCIsXHJcbiAgXCJsb2dpbk5hbWVcIiA6IFwiY3JrXCIsXHJcbiAgXCJuYW1lXCIgOiBcImNya1wiLFxyXG4gIFwiZGlzdHJpbmN0XCIgOiBcIjM2MDEyMVwiLFxyXG4gIFwib3JnSWRcIiA6IFwiMTAwMDJcIixcclxuICBcIm9yZ1R5cGVcIiA6IFwiU1RPUkVfUE9JTlRcIixcclxuICBcIm9yZ0xldmVsQ29kZVwiIDogXCI5OTk5OS4xMDAwMC4xNS4xMDAwMS4xMDA4NzAuXCIsXHJcbiAgXCJncm91cFwiIDogXCJPUkdfQURNSU5cIixcclxuICBcImF1dGhvcml0eU5hbWVzXCIgOiBbIFwic3RvcmVCZ3lcIiwgXCJldmVyeW9uZVwiIF1cclxufSIsImlhdCI6MTU2Mzk1NzMwN30.fZ0eFD4roByWtuwkZL7EMA7szlDIY1EAB12Awkb4kRk#"
    };
  },
  mounted() {
    this.getCurrentUserInfo();
  },
  methods: {
    /* 获取当前登陆人信息 */
    getCurrentUserInfo() {
      let userInfo = JSON.parse(localStorage.getItem("currentUserInfos")),
        that = this;



      if (userInfo && userInfo.username && userInfo.userId) {
        this.userInfo.userId = userInfo.userId;
        this.userInfo.userName = userInfo.username;
        this.getCurPointHouseInfo();
        this.$store.dispatch("setUserInfos", that.userInfo);
        localStorage.setItem(
          "appUserInfo",
          JSON.stringify(that.$store.state.userInfo)
        );
        // this.$store.state.userInfo = this.userInfo;
        // localStorage.removeItem("currentUserInfos");
      } else {
        Toast({
          message: "获取登录人信息失败！"
        });
      }
    },
    /* 获取当前登陆人信息 */
    getCurPointHouseInfo() {
      const that = this;
      let data = that.userInfo;
      that.$http(that.$api.getCurPointHouse(), data, true).then(function(xhr) {
        that.mainUsers = xhr.data;
        if (xhr.data) {
          // that.$store.state.pointInfo = xhr.data;
          that.$store.dispatch("setPointInfos", xhr.data);
          localStorage.setItem(
            "appPointInfo",
            JSON.stringify(that.$store.state.pointInfo)
          );
          // console.log(that.$store);
          that.$router.push("/manage");
        } else {
          that.$router.push("/choseZone");
        }
      });
    }
  }
};
</script>
