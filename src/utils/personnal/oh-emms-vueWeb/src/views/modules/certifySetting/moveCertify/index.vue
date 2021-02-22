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
    >
      <div>
        <p class="fontSize16 mt15 mb10">移库执行单明细</p>
        <operateButtonsGroup
          v-show="dialogInputTableSettings.selection"
          class="textAlignLeft mb10"
          :operateButtonsSettings="dialogOperateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
        <inputTable
          class="table-list mb20"
          :defaultSettings="dialogInputTableSettings"
          :defaultdatas="tableChosedSettings.tableDatas"
          v-model="dialogInputTableValue"
          @handleTableMutiChecked="handleTableMutiChecked"
          @tableSelectChange="handleTableSelectChange"
        />
      </div>
    </dialogForm>
    <dialogForm
      v-if="dialogTableSettings.dialogFormVisible"
      :dialogFormSettings="dialogTableSettings"
      @handleDialogForm="handleDialogForm"
    >
      <div slot="other">
        <formGroup
          ref="detailSearchForm"
          @linkSelect="handleChangeSelect"
          :formGroupSettings="detailSearchFormSettings"
          @formGroupSubmit="handleDetailSearchFormBtn"
        />
        <tableList
          ref="chosedTab"
          :tablelistSettings="tableToBeChosedSettings"
          @handleTableMutiChecked="handleMetrialTableMutiChecked"
        />
        <pagination
          class="textAlignRight"
          :paginationSettings="beChosedPaginationSettings"
          @handlePaginationPagenumber="handleBeChosedPaginationPagenumber"
        />
        <operateButtonsGroup
          class="textAlignCenter mt10 mb10"
          :operateButtonsSettings="dialogSaveMetrialSettings"
          @handleOperateButton="handleOperateButton"
        />
      </div>
    </dialogForm>
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "moveCertify",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.contentItems.map(dialogItem => {
      if (dialogItem.name == "outStoreOrgId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (dialogItem.name == "inStoreOrgId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });
    this.searchFormSettings.formGroupList.map(searchItem => {
      if (searchItem.name == "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (
        searchItem.name == "outStorepointId" ||
        searchItem.name == "inStorepointId"
      ) {
        this.getStorePointList().then(list => {
          searchItem.data = list;
        });
      }
    });
    this.dialogInputTableSettings.headers.map(head => {
      if (head.key == "reserveType") {
        head.data = this.$store.getters["user/baseInfos"].grainpropertyList;
      }
    });
    this.initPageData();
  }
};
</script>
