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
      <div>
        <p class="fontSize16 mt15 mb10">明细</p>
        <operateButtonsGroup
          class="textAlignLeft mb10"
          :operateButtonsSettings="dialogOperateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
        <inputTable
          class="table-list mb20"
          :defaultSettings="dialogInputTableSettings"
          :defaultdatas="
            dialogFormSettings.dialogFormItems.formGroupValues[
              dialogInputTableSettings.name
            ]
          "
          v-model="
            dialogFormSettings.dialogFormItems.formGroupValues[
              dialogInputTableSettings.name
            ]
          "
          @handleTableMutiChecked="handleTableMutiChecked"
          :rules="dialogInputTableSettings.rules"
        />
      </div>
    </dialogForm>

    <!--    发放登记明细添加页-->
    <dialogForm
      v-if="dialogTableSettings.dialogFormVisible"
      :dialogFormSettings="dialogTableSettings"
      @handleDialogForm="handleDialogForm"
    >
      <div slot="other">
        <div class="displayFlex">
          <div style="width:500px">
            <tree
              :treeSettings="treeSettings"
              @handleTreeNodeClick="handleTreeNodeClick"
            ></tree>
          </div>
          <div style="flex:1;">
            <tableList
              ref="chosedTab"
              :tablelistSettings="tableToBeChosedSettings"
              @handleCurrentChange="handleCurrentChange"
            />
            <pagination
              :paginationSettings="toBeChosedPaginationSettings"
              @handlePaginationPagenumber="handleToBeChosedPaginationPagenumber"
            />
            <operateButtonsGroup
              class="textAlignLeft mt10 mb10"
              :operateButtonsSettings="dialogChoseMetrialSettings"
              @handleOperateButton="handleOperateButton"
            />
            <tableList
              :tablelistSettings="tableChosedSettings"
              @handleCurrentChange="handleChosedCurrentChange"
            />
            <operateButtonsGroup
              class="textAlignLeft mt10 mb10"
              :operateButtonsSettings="dialogSaveMetrialSettings"
              @handleOperateButton="handleOperateButton"
            />
          </div>
        </div>
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
  name: "outCertify",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    // 搜索
    this.searchFormSettings.formGroupList.forEach(searchItem => {
      if (searchItem.name === "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });
    this.contentItems.forEach(dialogItem => {
      if (dialogItem.name === "storeOrgId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].orgList;
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
