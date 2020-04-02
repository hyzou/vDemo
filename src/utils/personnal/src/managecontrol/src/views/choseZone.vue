<template>
  <div class="choseZone">
    <ahheader :headerOption="headerOption" />
    <div v-show="!noDataStatus">
      <!-- <searchBar /> -->
      <dataList @childItem="choseCurrentItem" :listData="listData" />
    </div>
    <noData v-show="noDataStatus" />
  </div>
</template>

<script>
import ahheader from "@/components/ahheader.vue";
// import searchBar from "@/components/searchBar.vue";
import dataList from "@/components/dataList.vue";
import noData from "@/components/noData.vue";

export default {
  name: "choseZone",
  components: {
    ahheader,
    dataList,
    // searchBar,
    noData
  },
  data() {
    return {
      /* 初始化列表数据 */
      listData: [{ title: "1号仓库", id: 1, routePath: "/manage" }],
      /* 头部导航配置信息 */
      headerOption: {
        title: "库区选择",
        routePath: "/"
      },
      /* 判定列表数据是否为空 */
      noDataStatus: true
    };
  },
  mounted() {
    this.getstorepointList();
  },
  methods: {
    /* 获取当前登陆人可查看库区列表信息 */
    getstorepointList() {
      const that = this;
      let data = that.$store.state.userInfo;
      that.$http(that.$api.getstorepointList(), data, true).then(function(xhr) {
        that.listData = xhr;
        if (that.listData.length > 0) {
          that.noDataStatus = false;
          that.listData.map(function(item) {
            item.title = item.text;
            item.id = item.value;
          });
        }
      });
    },
    /* 点击区域列表项目，跳转manage页面 */
    choseCurrentItem(item) {
      let obj = {
          storePointId: item.id
        },
        that = this;
      this.$store.dispatch('setPointInfos', obj);
      localStorage.setItem("appPointInfo",JSON.stringify(that.$store.state.pointInfo));
      // this.$store.state.pointInfo.storePointId = item.id;
      this.$router.push("/manage");
    }
  }
};
</script>
