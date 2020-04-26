<template>
  <div class="common_page">
    <searchPanel
      :pageObject="pageObject"
      @transfToalNum="transfToalNum"
    ></searchPanel>
    <dataGrid :totalNum="totalNum" @transfPagParam="transfPagParam"></dataGrid>
  </div>
</template>

<script>
import resultSeartch_searchPanel from "../resultSearch/searchPanel";
import resultSeartch_dataGrid from "../resultSearch/dataGrid";
export default {
  name: "resultSearchIndex",
  data() {
    return {
      pageObject: {
        currentPageNum: 1,
        pageSizeNum: 10
      },
      totalNum: 0
    };
  },
  components: {
    searchPanel: resultSeartch_searchPanel,
    dataGrid: resultSeartch_dataGrid
  },
  methods: {
    transfToalNum(val) {
      this.totalNum = val;
    },
    transfPagParam(val) {
      this.pageObject.currentPageNum = val.currentPageNum;
      this.pageObject.pageSizeNum = val.pageSizeNum;
    }
  },
  created() {
    //面包屑导航
    let breadcrumbNameArray = this.$dateUtl.getBreadcrumbNameArray(
      this.$route,
      ""
    );
    this.$emit(this.$constants.EMIT_TRANSFBREADCRUMB, breadcrumbNameArray);
  }
};
</script>

<style scoped></style>
