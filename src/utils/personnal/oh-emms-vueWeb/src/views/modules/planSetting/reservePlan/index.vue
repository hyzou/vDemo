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

    <!--    新增弹框-->
    <el-dialog
      v-if="reservePlanDialog.dialogVisible"
      width="70%"
      :title="reservePlanDialog.dialogName"
      :visible.sync="reservePlanDialog.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <template>
        <formGroup
          :formGroupSettings="reservePlanFormSettings"
          ref="planDetail"
        />
      </template>
      <template>
        <el-row>
          <el-col class="mainPage-searchTitle mb20" :span="8">
            <commonTitleWithBorder title="计划明细" />
          </el-col>
          <el-col :span="16" class="mainPage-tableAboveBtns textAlignRight">
            <operateButtonsGroup
              class="textAlignRight"
              :operateButtonsSettings="planDetailOperateButtonsSettings"
              @handleOperateButton="handleOperateButton"
            />
          </el-col>
        </el-row>
        <inputTable
          :defaultSettings="planDetailTableSettings"
          :defaultdatas="
            reservePlanFormSettings.formGroupValues[
              planDetailTableSettings.name
            ]
          "
          v-model="
            reservePlanFormSettings.formGroupValues[
              planDetailTableSettings.name
            ]
          "
          @handleTableMutiChecked="handlePlanDetailTableMutiChecked"
        />
        <!--        @handleTableMutiChecked="handleTableMutiChecked"-->
        <!--        @tableSelectChange="handleChangeSelect"-->
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="formBtn in reservePlanDialog.formButtonList"
          :key="formBtn.flag"
          :type="formBtn.styleType"
          :size="formBtn.size || 'small'"
          :icon="formBtn.icon"
          @click="handlePlanDialog(formBtn)"
        >
          {{ formBtn.label }}
        </el-button>
      </span>
    </el-dialog>

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
          @handleTableMutiChecked="handleMaterialTableMutiChecked"
          :selectedList="selectMaterialData"
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
  name: "taskSetManage",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.initPageData();
  }
};
</script>
