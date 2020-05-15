<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { Toast } from "mint-ui";
export default {
  name: "app",
  created() {
    // this.getCurrentUserInfo();
    let _user = {
      accountNonExpired: true,
      accountNonLocked: true,
      authorityNames: ["demo", "storeBgy", "everyone", "processAuth"],
      credentialsNonExpired: true,
      distrinct: "330300",
      enabled: true,
      expireDate: 1609344000000,
      grainAdmin: "10000",
      grainOwner: "15",
      grainStore: "10002",
      hostIP: "0:0:0:0:0:0:0:1",
      keeper: false,
      loginName: "crk",
      name: "黄成华",
      orgAdmin: false,
      orgId: "10002",
      orgLevelCode: "99999.10000.15.10001.10002.",
      orgName: "温州市粮油储运有限公司",
      orgType: "STORE_POINT",
      qA: false,
      status: 1,
      storePointId: "271",
      sysAdmin: false,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
      userId: "2305",
      username: "crk"
    };
    sessionStorage.setItem("currentTestUserInfos", JSON.stringify(_user));
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("currentTestUserInfos")) {
      this.$store.dispatch(
        "setUserInfos",
        JSON.parse(sessionStorage.getItem("currentTestUserInfos"))
      );
      // this.$store.replaceState(
      //   Object.assign(
      //     {},
      //     this.$store.state,
      //     JSON.parse(sessionStorage.getItem("currentTestUserInfos"))
      //   )
      // );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "currentTestUserInfos",
        JSON.stringify(this.$store.state.userInfo)
      );
    });
  },
  methods: {
    /* 获取当前登陆人信息 */
    // getCurrentUserInfo() {
    //   let userInfo = JSON.parse(localStorage.getItem("currentTestUserInfos")),
    //     that = this;
    //   if (userInfo && userInfo.username && userInfo.userId) {
    //     this.$store.dispatch("SET_USERINFO", that.userInfo);
    //     localStorage.setItem(
    //       "appUserInfo",
    //       JSON.stringify(that.$store.state.userInfo)
    //     );
    //   } else {
    //     Toast({
    //       message: "获取登录人信息失败！"
    //     });
    //   }
    // }
  }
};
</script>
