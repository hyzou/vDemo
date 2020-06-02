<template>
  <div>
    <reapSearchPanel01
      ref="searchPanelDetail"
      v-if="showParam.reapSearchPanel01Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></reapSearchPanel01>
    <reapSearchPanel02
      ref="searchPanelDetail"
      v-if="showParam.reapSearchPanel02Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></reapSearchPanel02>
    <reapSearchPanel03
      ref="searchPanelDetail"
      v-if="showParam.reapSearchPanel03Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></reapSearchPanel03>
    <reapSearchPanel04
      ref="searchPanelDetail"
      v-if="showParam.reapSearchPanel04Show"
      :defaultSearchData="defaultSearchData"
      @doSearch="doSearch"
    ></reapSearchPanel04>
  </div>
</template>

<script>
import reapSearchPanel01 from "./reapSearchPanel01";
import reapSearchPanel02 from "./reapSearchPanel02";
import reapSearchPanel03 from "./reapSearchPanel03";
import reapSearchPanel04 from "./reapSearchPanel04";
export default {
  name: "reapSearchPanel",
  data() {
    return {
      showParam: {
        reapSearchPanel01Show: false,
        reapSearchPanel02Show: false,
        reapSearchPanel03Show: false,
        reapSearchPanel04Show: false
      }
    };
  },
  components: {
    reapSearchPanel01,
    reapSearchPanel02,
    reapSearchPanel03,
    reapSearchPanel04
  },
  methods: {
    showSearchPanel(val) {
      this.showParam.reapSearchPanel01Show = false;
      this.showParam.reapSearchPanel02Show = false;
      this.showParam.reapSearchPanel03Show = false;
      this.showParam.reapSearchPanel04Show = false;
      if (
        val.menuid == this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG_4 ||
        val.menuid == this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG_6 ||
        val.menu == this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG_9
      ) {
        this.showParam.reapSearchPanel01Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG_5) {
        this.showParam.reapSearchPanel02Show = true;
        return false;
      }
      if (val.menuid == this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG_8) {
        this.showParam.reapSearchPanel04Show = true;
        return false;
      }
      this.showParam.reapSearchPanel03Show = true;
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
