<template>
  <div class="common_page">
    <router-view
      name="search"
      class="common_page_top"
      :pageSizeNum="pageSizeNum"
      :currentPageNum="currentPageNum"
      @transfToalNum="getTotalNum"
      @transfReloadData="reloadGrid"
      @changeDataGrid="changeDataGrid"
      @isHideColumn="isHide"
    ></router-view>
    <router-view
      name="dataGrid"
      class="common_page_bot"
      @transfPagParam="getPageParam"
      :totalNum="totalNum"
      :changeDataGridVal="changeDataGridVal"
      :isHideColumn="isHideColumn"
      ref="dataGrid"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "data_table",
  data() {
    return {
      pageSizeNum: this.$constants.numberPerpage,
      currentPageNum: 1,
      totalNum: 0, //默认总条数
      changeDataGridVal: "",
      isHideColumn: false
    };
  },
  methods: {
    getPageParam(pageparam) {
      if (this.currentPageNum === 0 && pageparam.currentPageNum === 0) {
        pageparam.currentPageNum = 1;
      }
      this.pageSizeNum = pageparam.pageSizeNum;
      this.currentPageNum = pageparam.currentPageNum;
    },
    getTotalNum(totalnum) {
      this.totalNum = totalnum;
    },
    reloadGrid(obj) {
      //刷新列表命令
      if ("Y" == obj) {
        this.$refs["dataGrid"].reloadData();
      }
    },
    changeDataGrid(val) {
      this.changeDataGridVal = val;
    },
    isHide(val) {
      this.isHideColumn = val;
    }
  },
  created() {
    let param_id = this.$router.history.current.params.id;
    let routeName = "";
    switch (param_id) {
      case this.$constants.ROUTEID_SAMPLEREAP:
        routeName = "新粮收获";
        break;
      case this.$constants.ROUTEID_SAMPLESTOCK:
        routeName = "库存承储";
        break;
      case this.$constants.ROUTEID_SAMPLEMARKET:
        routeName = "供销粮食";
        break;
      default:
        break;
    }
    this.$emit(
      this.$constants.EMIT_TRANSFBREADCRUMB,
      this.$dateUtl.getBreadcrumbNameArray(this.$route, routeName)
    );
  }
};
</script>
