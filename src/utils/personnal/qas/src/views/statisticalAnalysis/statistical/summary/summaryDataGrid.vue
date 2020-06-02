<template>
  <div>
    <!-- 查询条件：基本查询条件扦样时间、扦样区域、品种、规则(必选，只有一个则选中，多个则下拉框选择) -->
    <el-collapse v-model="activeName" accordion class="pl15 pr15">
      <el-collapse-item name="first">
        <template slot="title">
          <span class="panel_tit">汇总条件</span>
        </template>
        <el-row>
          <el-col :span="24">
            <reapSearchPanel
              ref="searchPanel"
              v-if="showParam.reapSearchPanelShow"
              :defaultSearchData="defaultSearchData"
              @doSearch="doSearch"
            ></reapSearchPanel>
            <stockSearchPanel
              ref="searchPanel"
              v-if="showParam.stockSearchPanelShow"
              :defaultSearchData="defaultSearchData"
              @doSearch="doSearch"
            ></stockSearchPanel>
            <marketSearchPanel
              ref="searchPanel"
              v-if="showParam.marketSearchPanelShow"
              :defaultSearchData="defaultSearchData"
              @doSearch="doSearch"
            ></marketSearchPanel>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="common_table_container">
      <div class="tool-bar"></div>
      <!-- 报表 -->
      <div>
        <iframe
          title="report"
          scrolling="auto"
          frameborder="0"
          v-bind:src="reportUrl"
          style="width:100%;height:600px;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import reapSearchPanel from "./reap/reapSearchPanel";
import stockSearchPanel from "./stock/stockSearchPanel";
import marketSearchPanel from "./market/marketSearchPanel";
export default {
  name: "summaryDataGrid",
  data() {
    return {
      activeName: "first",
      showParam: {
        reapSearchPanelShow: false,
        stockSearchPanelShow: false,
        marketSearchPanelShow: false
      },
      reportUrl: ""
    };
  },
  components: {
    reapSearchPanel,
    stockSearchPanel,
    marketSearchPanel
  },
  methods: {
    doSearch(url) {
      if (!url) {
        return false;
      }
      this.reportUrl = url;
    },
    showSearchPanel(link) {
      this.showParam.reapSearchPanelShow = false;
      this.showParam.stockSearchPanelShow = false;
      this.showParam.marketSearchPanelShow = false;
      if (this.$constants.LINK_REAP == link) {
        this.showParam.reapSearchPanelShow = true;
        return false;
      }
      if (this.$constants.LINK_STOCK == link) {
        this.showParam.stockSearchPanelShow = true;
        return false;
      }
      this.showParam.marketSearchPanelShow = true;
      return false;
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
        this.reportUrl = "";
        this.showSearchPanel(val.selectedLink);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
