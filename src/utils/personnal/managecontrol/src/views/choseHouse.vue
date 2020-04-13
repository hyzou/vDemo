<template>
  <div class="choseHouse">
    <ahheader :headerOption="headerOption" />
    <dataList
      v-show="!noDataStatus"
      @childItem="choseCurrentItem"
      :listData="listData"
    />
    <noData v-show="noDataStatus" />
    <router-view></router-view>
  </div>
</template>

<script>
import ahheader from "@/components/ahheader.vue";
import dataList from "@/components/dataList.vue";
import noData from "@/components/noData.vue";

export default {
  name: "choseHouse",
  components: {
    ahheader,
    dataList,
    noData
  },
  data() {
    return {
      /* 初始化列表数据 */
      listData: [],
      /* 头部导航配置信息 */
      headerOption: {
        title: "仓房列表",
        routePath: "/manage"
      },
      /* 判定列表数据是否为空 */
      noDataStatus: true
    };
  },
  mounted() {
    this.getStorePointWithHouses();
  },
  methods: {
    /* 获取当前库区下仓房列表信息 */
    getStorePointWithHouses() {
      const that = this;
      let data = {
        storePointId: that.$store.state.pointInfo.storePointId,
        tokenId: that.$store.state.userInfo.tokenId,
        userName: that.$store.state.userInfo.userName
      };
      that
        .$http(that.$api.getStorePointWithHouses(), data, true)
        .then(function(xhr) {
          that.listData = xhr.storeHouseList;
          if (that.listData.length > 0) {
            that.noDataStatus = false;
            that.listData.map(function(item) {
              item.title = item.storeHouseName;
              item.id = item.storeHouseId;
            });
          }
        });
    },
    /* 点击仓房列表项目，跳转设备页面 */
    choseCurrentItem(item) {
      let page = this.$store.state.wholeParam.page;
      this.$router.push({
        path: page,
        query: {
          storeHouseId: item.storeHouseId,
          storeHouseName: item.storeHouseName
        }
      });
    }
  }
};
</script>
