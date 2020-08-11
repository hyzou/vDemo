<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      /* 登录人信息 */
      /*本地测试环境需要用到的登录人信息，多库点*/
      // userInfo: {
      //   userId: "1432",
      //   username: "admin1"
      // }
      /*本地测试环境需要用到的登录人信息，单库点*/
      // userInfo: {
      //   userId: "595",
      //   username: "bscrk",
      //   storePointId: "433"
      // }
      /*打包到正式环境需要用到的登录人信息*/
      userInfo: {
        userId: JSON.parse(localStorage.getItem("currentTestUserInfos")).userId,
        username: JSON.parse(localStorage.getItem("currentTestUserInfos"))
          .username
      }
    };
  },
  methods: {
    /* 获取当前登陆人信息 */
    getCurrentUserInfo() {
      let userInfo = this.userInfo,
        that = this;
      if (userInfo && userInfo.username && userInfo.userId) {
        this.getCurPointHouseInfo().then(data => {
          this.userInfo.hasonlyOnePoint = "true";
          this.userInfo.storePointId = data.storePointId;
          this.$store.dispatch("setUserInfos", this.userInfo);
          sessionStorage.setItem(
            "currentTestUserInfos",
            JSON.stringify(that.$store.state.userInfo)
          );
        });
      } else {
        this.$messagebox.alert("获取登录人信息失败！");
      }
    },
    /* 获取当前登陆人信息 */
    getCurPointHouseInfo() {
      const that = this;
      return new Promise(resolve => {
        that.$postData(this.$api.getCurPointHouse, that.userInfo).then(xhr => {
          if (xhr.data && xhr.data.storePointId) {
            resolve(xhr.data);
          } else {
            this.$store.dispatch("setUserInfos", this.userInfo);
            sessionStorage.setItem(
              "currentTestUserInfos",
              JSON.stringify(that.$store.state.userInfo)
            );
            this.$router.push("choseStorePoint");
          }
        });
      });
    }
  },
  created() {
    // 获取登录人信息
    this.getCurrentUserInfo();
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "currentTestUserInfos",
        JSON.stringify(this.$store.state.userInfo)
      );
    });
  }
};
</script>
