<template>
  <div>
    <stockSearchPanel01
      ref="searchPanelDetail"
      v-if="showParam.stockSearchPanel01Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></stockSearchPanel01>
    <stockSearchPanel02
      ref="searchPanelDetail"
      v-if="showParam.stockSearchPanel02Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></stockSearchPanel02>
    <stockSearchPanel03
      ref="searchPanelDetail"
      v-if="showParam.stockSearchPanel03Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></stockSearchPanel03>
    <stockSearchPanel04
      ref="searchPanelDetail"
      v-if="showParam.stockSearchPanel04Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></stockSearchPanel04>
    <stockSearchPanel05
      ref="searchPanelDetail"
      v-if="showParam.stockSearchPanel05Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></stockSearchPanel05>
  </div>
</template>

<script>
import stockSearchPanel01 from "./stockSearchPanel01";
import stockSearchPanel02 from "./stockSearchPanel02";
import stockSearchPanel03 from "./stockSearchPanel03";
import stockSearchPanel04 from "./stockSearchPanel04";
import stockSearchPanel05 from "./stockSearchPanel05";
export default {
  name: "stockSearchPanel",
  data() {
    return {
      showParam: {
        stockSearchPanel01Show: false,
        stockSearchPanel02Show: false,
        stockSearchPanel03Show: false,
        stockSearchPanel04Show: false,
        stockSearchPanel05Show: false
      }
    };
  },
  components: {
    stockSearchPanel01,
    stockSearchPanel02,
    stockSearchPanel03,
    stockSearchPanel04,
    stockSearchPanel05
  },
  methods: {
    showSearchPanel(val) {
      this.showParam.stockSearchPanel01Show = false;
      this.showParam.stockSearchPanel02Show = false;
      this.showParam.stockSearchPanel03Show = false;
      this.showParam.stockSearchPanel04Show = false;
      this.showParam.stockSearchPanel05Show = false;
      if (val.menuid == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_4) {
        this.showParam.stockSearchPanel01Show = true;
        return false;
      }
      if (
        val.menuid == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_5 ||
        val.menuid == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_6 ||
        val.menuid == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_7
      ) {
        this.showParam.stockSearchPanel02Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_8) {
        this.showParam.stockSearchPanel03Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_9) {
        this.showParam.stockSearchPanel04Show = true;
        return false;
      }
      this.showParam.stockSearchPanel05Show = true;
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
