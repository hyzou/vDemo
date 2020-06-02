<template>
  <div>
    <marketSearchPanel01
      ref="searchPanelDetail"
      v-if="showParam.marketSearchPanel01Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></marketSearchPanel01>
    <marketSearchPanel02
      ref="searchPanelDetail"
      v-if="showParam.marketSearchPanel02Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></marketSearchPanel02>
    <marketSearchPanel03
      ref="searchPanelDetail"
      v-if="showParam.marketSearchPanel03Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></marketSearchPanel03>
    <marketSearchPanel04
      ref="searchPanelDetail"
      v-if="showParam.marketSearchPanel04Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></marketSearchPanel04>
    <marketSearchPanel05
      ref="searchPanelDetail"
      v-if="showParam.marketSearchPanel05Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></marketSearchPanel05>
  </div>
</template>

<script>
import marketSearchPanel01 from "./marketSearchPanel01";
import marketSearchPanel02 from "./marketSearchPanel02";
import marketSearchPanel03 from "./marketSearchPanel03";
import marketSearchPanel04 from "./marketSearchPanel04";
import marketSearchPanel05 from "./marketSearchPanel05";
export default {
  name: "marketSearchPanel",
  data() {
    return {
      showParam: {
        marketSearchPanel01Show: false,
        marketSearchPanel02Show: false,
        marketSearchPanel03Show: false,
        marketSearchPanel04Show: false,
        marketSearchPanel05Show: false
      }
    };
  },
  components: {
    marketSearchPanel01,
    marketSearchPanel02,
    marketSearchPanel03,
    marketSearchPanel04,
    marketSearchPanel05
  },
  methods: {
    showSearchPanel(val) {
      this.showParam.marketSearchPanel01Show = false;
      this.showParam.marketSearchPanel02Show = false;
      this.showParam.marketSearchPanel03Show = false;
      this.showParam.marketSearchPanel04Show = false;
      this.showParam.marketSearchPanel05Show = false;
      if (val.menuid == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_4) {
        this.showParam.marketSearchPanel01Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_5) {
        this.showParam.marketSearchPanel02Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_6) {
        this.showParam.marketSearchPanel03Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_7) {
        this.showParam.marketSearchPanel04Show = true;
        return false;
      }
      this.showParam.marketSearchPanel05Show = true;
    },
    doSearch(url) {
      if (!url) {
        return false;
      }
      //通知父页面
      this.$emit("doSearch", url);
    }
  },
  props: {
    defaultSearchData: {
      type: Object
    }
  },
  watch: {
    defaultSearchData: {
      handler(val) {
        this.showSearchPanel(val);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
