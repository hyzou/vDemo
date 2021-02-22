<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          :formGroupSettings="searchSettings"
          @formGroupSubmit="handleSearchFormBtn"
          @linkSelect="handleLinkSelect"
          ref="searchForm"
        />
      </el-col>
    </el-row>
    <el-row class="mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="24"
        class="lheight40"
        v-if="
          !(
            pageType === this.$global.SCHME_TYPE_SPECIAL &&
            pageOperateType === 'check'
          )
        "
      >
        <span class="mr10">{{
          pageOperateType === "edit" ? "自评状态" : "当前流程节点状态"
        }}</span>
        <Status status="incomplete" />未完成
        <Status class="ml10" status="complete" />已完成
        <Status class="ml10" status="reported" />
        {{ pageOperateType === "edit" ? "已上报" : "已发布" }}
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <!--分块 弹窗-->
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
    <!--弹窗-->
    <dialogForm
      v-if="dialogNormalFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogNormalFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleLinkSelect"
    />
    <!--结果上报-->
    <el-dialog
      v-if="evaluationSubmitDialog.dialogVisible"
      width="80%"
      :title="evaluationSubmitDialog.dialogName"
      :visible.sync="evaluationSubmitDialog.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      @close="handleSubmitEvaluationList({ flag: 'cancel' })"
    >
      <el-row>
        <el-col class="mb20" :span="24">
          <commonTitleWithBorder title="查询条件" />
        </el-col>
        <el-col class="mb20" :span="24">
          <formGroup
            :formGroupSettings="kpiSearchFormSetting"
            @formGroupSubmit="handleKpiSearchFormBtn"
            @linkSelect="handleLinkSelect"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col class="mb20" :span="2">
          <commonTitleWithBorder title="列表信息" />
        </el-col>
        <el-col :span="10" class="lheight40">
          状态提醒：<Status status="incomplete" />未完成
          <Status class="ml10" status="complete" />已完成
          <Status class="ml10" status="reported" />已发布
        </el-col>
        <el-col :span="12" class="textAlignRight">
          <operateButtonsGroup
            class="textAlignRight"
            :operateButtonsSettings="submitButtonsSettings"
            @handleOperateButton="handleOperateButton"
          />
        </el-col>
      </el-row>
      <tableList :tablelistSettings="kpiTableSettings" />
      <pagination
        :paginationSettings="kpiPaginationSettings"
        @handlePaginationPagenumber="handleKpiPaginationPagenumber"
      />
      <!--<el-row>-->
      <!--<el-col class="mb20" :span="24">-->
      <!--<commonTitleWithBorder :title="titleMessage" />-->
      <!--</el-col>-->
      <!--<el-col class="mb20" :span="24">-->
      <!--<formGroup-->
      <!--:formGroupSettings="submitKpiFormSetting"-->
      <!--ref="submitForm"-->
      <!--@linkSelect="handleLinkSelect"-->
      <!--/>-->
      <!--<div class="textAlignRight">-->
      <!--<el-button-->
      <!--v-for="formBtn in evaluationSubmitDialog.formButtonList"-->
      <!--:key="formBtn.flag"-->
      <!--:type="formBtn.styleType"-->
      <!--:size="formBtn.size || 'small'"-->
      <!--:icon="formBtn.icon"-->
      <!--@click="handleSubmitEvaluation(formBtn)"-->
      <!--&gt;-->
      <!--{{ formBtn.label }}-->
      <!--</el-button>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--</el-row>-->
    </el-dialog>

    <!--预览及导出-->
    <el-dialog
      title="预览及导出"
      :visible.sync="dialogPreviewExportVisible"
      v-if="dialogPreviewExportVisible"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <el-row class="mb10">
        <el-col :span="22" class="textAlignCenter" style="font-size: 24px;"
          >杭州市2019年度落实粮食安全市县长责任制自查评分表</el-col
        >
      </el-row>
      <tableList :tablelistSettings="previewTableSettings" />
    </el-dialog>
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";
import Status from "@/components/circleDot";
export default {
  name: "index",
  data: function() {
    return dataFnc(this);
  },
  components: {
    Status
  },
  methods: {
    ...methods
  },
  created() {
    let routeArr = this.$route.fullPath.split("/");
    switch (routeArr[routeArr.length - 2]) {
      case "normal":
        this.pageType = this.$global.SCHME_TYPE_YEAR;
        break;
      case "special":
        this.pageType = this.$global.SCHME_TYPE_SPECIAL;
        break;
      default:
        this.pageType = this.$global.SCHME_TYPE_OTHER;
        break;
    }
    this.pageOperateType = routeArr[routeArr.length - 1];
  },
  mounted() {
    this.setSearchFormData();
    // 按钮组赋值
    this.operateButtonsSettings.buttonListData = this.operateButtonsObj[
      this.pageOperateType
    ];
    // 表格表头赋值
    this.tableSettings.tableSettingOptions.headerOptions = this.distributeSuperviseTableHeader[
      this.pageType
    ][this.pageOperateType];
    this.initPageData();
  }
};
</script>
