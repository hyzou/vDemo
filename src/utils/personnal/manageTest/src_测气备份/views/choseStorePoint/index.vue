<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-search v-model="searchValue" cancel-text="取消" placeholder="搜索">
    </mt-search>
    <mt-cell
      v-for="store in storepointList"
      :key="store.value"
      :title="store.text"
      @click.native="handleRouterTo(store)"
      v-show="store.text.indexOf(searchValue) > -1"
      is-link
    >
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: "choseStorePoint",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // 库点列表
      storepointList: [],
      // 顶部操作栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "选择库点",
        routePath: "backToApp"
      },
      // 搜索栏
      searchValue: ""
    };
  },
  methods: {
    // 项目点击事件，测试流程点击跳转
    handleRouterTo(storeInfo) {
      let userInfo = this.$store.getters.userInfo;
      userInfo.storePointId = storeInfo.value;
      this.$store.dispatch("setUserInfos", userInfo);
      this.$router.push("home");
    },
    // 获取当前登录人关联库区列表
    getstorepointList() {
      this.$postData(
        this.$api.getstorepointList,
        this.$store.getters.userInfo
      ).then(xhr => {
        this.storepointList = xhr;
      });
    }
  },
  mounted() {
    this.getstorepointList();
  }
};
</script>
