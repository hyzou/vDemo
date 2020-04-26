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
import sampleSearch from "./sampleSearch";
import sampleDataGrid from "./sampleDataGrid";
export default {
  name: "sampleManagerIndex",
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
    searchPanel: sampleSearch,
    dataGrid: sampleDataGrid
  },
  methods: {
    transfToalNum(val) {
      this.totalNum = val;
    },
    transfPagParam(val) {
      this.pageObject = {
        currentPageNum: val.currentPageNum,
        pageSizeNum: val.pageSizeNum
      };
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
