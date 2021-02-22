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
          @formGroupSubmit="initPageData"
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
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <!--分块 弹窗-->
    <dialogForm
      v-if="dialogFormBlockSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormBlockSettings"
      @handleDialogForm="handleDialogFormBlock"
    />
    <!--正常 弹窗-->
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
    <!--查看详情-->
    <el-dialog
      v-if="superviseDetailDialog.dialogVisible"
      width="80%"
      :title="superviseDetailDialog.dialogName"
      :visible.sync="superviseDetailDialog.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      @close="superviseDetailDialog.dialogVisible = false"
    >
      <el-row>
        <!--<el-col class="mb20" :span="24">-->
        <!--<commonTitleWithBorder title="查询条件" />-->
        <!--</el-col>-->
        <el-col class="mb20" :span="24">
          <formGroup
            :formGroupSettings="kpiSearchFormSetting"
            @formGroupSubmit="handleKpiSearchFormBtn"
          />
        </el-col>
      </el-row>
      <el-row>
        <!--<el-col class="mb20" :span="2">-->
        <!--<commonTitleWithBorder title="列表信息" />-->
        <!--</el-col>-->
        <el-col :span="10" class="lheight40">
          {{ singleData.processText }}状态：<Status status="incomplete" />未完成
          <Status class="ml10" status="complete" />已完成
          <Status class="ml10" status="reported" />已发布
        </el-col>
        <!--<el-col :span="12" class="textAlignRight">-->
        <!--<operateButtonsGroup-->
        <!--class="textAlignRight"-->
        <!--:operateButtonsSettings="submitButtonsSettings"-->
        <!--@handleOperateButton="handleOperateButton"-->
        <!--/>-->
        <!--</el-col>-->
      </el-row>
      <tableList
        :tablelistSettings="kpiTableSettings"
        @handleTableRowButton="handleKpiTableRowButton"
      />
      <pagination
        :paginationSettings="kpiPaginationSettings"
        @handlePaginationPagenumber="handleKpiPaginationPagenumber"
      />
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
    // 按钮组赋值
    // this.operateButtonsSettings.buttonListData = this.operateButtonsObj[
    //   this.pageOperateType
    // ];
    // 表格表头赋值
    this.tableSettings.tableSettingOptions.headerOptions = this.superviseTableHeader[
      this.pageType
    ];

    this.setSearchFormData();
  }
};
</script>
