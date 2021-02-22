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

    <!--调拨明细添加页-->
    <el-dialog
      v-if="materialDetailDialog.dialogVisible"
      width="70%"
      :title="materialDetailDialog.dialogName"
      :visible.sync="materialDetailDialog.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <template>
        <!--        物资选择页搜索-->
        <formGroup
          :formGroupSettings="materialSearchFormSettings"
          @formGroupSubmit="handleMaterialSearchFormBtn"
        />
      </template>
      <template>
        <tableList
          :tablelistSettings="materialDetailTableSettings"
          @handleTableMutiChecked="handleMaterialTableMutiChecked"
          :selectedList="chosedMaterialData"
        />
        <pagination
          :paginationSettings="materialPaginationSettings"
          @handlePaginationPagenumber="handleMaterialPaginationPagenumber"
        />
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="formBtn in materialDetailDialog.formButtonList"
          :key="formBtn.flag"
          :type="formBtn.styleType"
          :size="formBtn.size || 'small'"
          :icon="formBtn.icon"
          @click="handleMaterialDetailDialog(formBtn.flag)"
        >
          {{ formBtn.label }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "scrapCertify",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    // 搜索
    this.searchFormSettings.formGroupList.map(searchItem => {
      if (searchItem.name === "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });
    this.contentItems.map(dialogItem => {
      if (dialogItem.name === "storeOrgId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (dialogItem.name === "transport") {
        this.$getData(this.$api.transportList).then(res => {
          dialogItem.data = this.$globalFnc.arrayToFormDropdown(
            res,
            "text",
            "value"
          );
        });
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
