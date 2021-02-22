<template>
  <div class="mainPage">
    <el-col class="mainPage-searchTitle mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mainPage-searchForm" :span="24">
      <formGroup
        v-if="showSearchForm"
        ref="searchForm"
        @linkSelect="handleChangeSelect"
        :formGroupSettings="searchFormSettings"
        @formGroupSubmit="handleSearchFormBtn"
      />
    </el-col>
    <el-col class="mainPage-TableTitle" :span="6">
      <commonTitleWithBorder title="列表信息" />
    </el-col>
    <el-col :span="18" class="mainPage-tableAboveBtns textAlignRight">
      <operateButtonsGroup
        class="textAlignRight"
        :operateButtonsSettings="operateButtonsSettings"
        @handleOperateButton="handleOperateButton"
      />
    </el-col>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleChangeSelect"
      @handleRemoveFiles="handleRemoveFiles"
    >
    </dialogForm>
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "inspectCertify",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    // 搜索
    this.searchFormSettings.formGroupList.map(searchItem => {
      if (searchItem.name == "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });
    this.contentItems.map(dialogItem => {
      if (dialogItem.name == "storeOrgId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (dialogItem.name == "sourceType") {
        dialogItem.data = this.$store.getters[
          "user/baseInfos"
        ].outSourceTypeList;
      }
    });
    this.$setStorePointAndOrgInput(this, {
      method: "getStorePointList",
      searchlist: this.searchFormSettings.formGroupList,
      searchOrg: "storeOrgId",
      searchPoint: "storepointId",
      dialoglist: this.contentItems,
      dialogOrg: "storeOrgId",
      dialogPoint: "storepointId"
    });
    this.initPageData();
  }
};
</script>
