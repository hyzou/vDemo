<template>
  <div>
    <el-col class="mainPage-searchTitle mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mainPage-searchForm" :span="24">
      <formGroup
        v-if="showSearchForm"
        :formGroupSettings="searchFormSettings"
        @formGroupSubmit="handleSearchFormBtn"
        @linkSelect="handleChangeSelect"
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

    <!--    新增购置 详情页-->
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleChangeSelect"
    >
      <div>
        <p class="fontSize16 mt15 mb10">物资明细</p>
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
        />
      </div>
    </dialogForm>
    <!--          :defaultdatas="tableChosedSettings.tableDatas"-->
    <!--    @linkSelect="handleLinkSelect"-->
    <!--    @handleInputGroupButton="handleInputGroupButton"-->

    <!--    应急以及补充采购物资选择页-->
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

    <!--    物资选择页面-->
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
          @handleTableMutiChecked="handleReservePlanMaterialMutiChecked"
          :selectedList="chosedReservePlanMaterialData"
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
  name: "purchase",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.setFormDefaultValue();
    this.initPageData();
  }
};
</script>
