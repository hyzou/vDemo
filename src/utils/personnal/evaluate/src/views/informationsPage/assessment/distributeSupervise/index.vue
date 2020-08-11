<template>
  <div class="pt10 pr10 pl10 width100">
    <el-col class="mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mb20" :span="24">
      <formGroup
        :formGroupSettings="suggestSetFormItems"
        @formGroupSubmit="handleSearchFormBtn"
      />
    </el-col>
    <el-row class="mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button type="primary" @click="handlePreviewExport"
          >预览及导出</el-button
        >
        <el-button type="primary" @click="handleSelfEvaluation"
          >开启局自评</el-button
        >
        <el-button type="primary" @click="handleSubmitSelfEvaluationResult"
          >自评结果上报</el-button
        >
      </el-col>
    </el-row>
    <el-col :span="24" class="lheight40">
      状态提醒：<Status status="incomplete" />未完成
      <Status class="ml10" status="complete" />已完成
      <Status class="ml10" status="reported" />已上报
      <span class="ml20">
        评分点分值合计 ({{ totalScore | toDecimal2 }}) 分，自评分共计(
        {{ totalSelfScore | toDecimal2 }}
        )分
      </span>
    </el-col>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
      @handlePaginationPagesize="handleSizeChange"
    />
    <!--开启市局自评弹窗-->
    <dialogForm
      v-if="dialogFormSettingsSelfEvaluation.dialogFormVisible"
      :dialogFormSettings="dialogFormSettingsSelfEvaluation"
      @handleDialogForm="handleOpenSelfEvaluation"
    />
    <!--考核办分配弹窗-->
    <dialogForm
      v-if="dialogFormSettingsAssessmentDistribute.dialogFormVisible"
      :dialogFormSettings="dialogFormSettingsAssessmentDistribute"
      @handleDialogForm="handleAssessmentDistribute"
    />
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
        <el-col :span="2" class="textAlignRight"
          ><el-button type="primary" @click="handleDialogTableExport"
            >导出</el-button
          ></el-col
        >
      </el-row>
      <tableList :tablelistSettings="previewTableSettings" />
    </el-dialog>
    <el-dialog
      title="查看"
      :visible.sync="dialogSelfEvaluationVisible"
      v-if="dialogSelfEvaluationVisible"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <tableForm :tableFormData="tableFormData"> </tableForm>
    </el-dialog>
  </div>
</template>

<script>
import distributeSuperviseFormItems from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperviseItems.json";
import distributeSuperviseFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperviseBtns.json";
import distributeSuperviseTableHeader from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperiseTableHeader.json";

import previewTableHeader from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperisePreviewTableHeader.json";

import selfEvaluationOpenDialogFormItems from "@/utils/formSettingsJson/informationsPage/assessment/selfEvaluationOpenDialogFormItems.json";
import selfEvaluationOpenDialogFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/selfEvaluationOpenDialogFormBtns.json";

import assessmentDistributeDialogFormItems from "@/utils/formSettingsJson/informationsPage/assessment/assessmentDistributeDialogFormItems.json";
import assessmentDistributeDialogFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/assessmentDistributeDialogFormBtns.json";

import selfEvaluationDistributeOpenRule from "@/utils/formRulesJson/distributeSupervise/openSelfEvalutation";
import distributeRules from "@/utils/formRulesJson/distributeSupervise/distributeRules";

import formGroup from "@/components/formGroup";
import tableForm from "@/components/tableForm";
import Status from "@/components/circleDot";

export default {
  name: "index",
  components: {
    formGroup,
    tableForm,
    Status
  },
  data() {
    return {
      totalScore: 0,
      totalSelfScore: 0,
      // 搜索栏
      suggestSetFormItems: {
        fullScreen: false,
        formGroupList: distributeSuperviseFormItems,
        formGroupValues: {},
        formButtonList: distributeSuperviseFormBtns
      },
      tableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "assessmentId",
          border: true,
          headerOptions: distributeSuperviseTableHeader,
          isShowIndex: true,
          showIndexHeader: "序号"
        }
      },
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      //自评开启配置
      dialogFormSettingsSelfEvaluation: {
        width: "800px",
        dialogFormTitle: "市局自评设置", //弹窗标题
        dialogType: "form", //弹窗类型
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormItems: {
          //如果是form类型，在此处配置form,详情参考formGroup表单组件
          formGroupList: selfEvaluationOpenDialogFormItems,
          formGroupValues: {
            year: "2019",
            enable: "1"
          },
          formButtonList: selfEvaluationOpenDialogFormBtns,
          rules: selfEvaluationDistributeOpenRule
        }
      },
      //预览导出表单配置
      dialogPreviewExportSetting: {
        width: "70%",
        title: "预览以及导出",
        dialogFormVisible: false //弹窗是否可见（开或关）
      },
      dialogPreviewExportVisible: false,
      previewTableSettings: {
        dialogFormClassName: "min",
        tableDatas: [],
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "assessmentId",
          border: true,
          headerOptions: previewTableHeader,
          isShowIndex: false
        }
      },
      dialogSelfEvaluationVisible: false,
      tableFormData: {},
      //考核办分配弹窗
      dialogFormSettingsAssessmentDistribute: {
        width: "70%",
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "分配", //弹窗标题
        dialogType: "form", //弹窗类型
        dialogFormItems: {
          //如果是form类型，在此处配置form,详情参考formGroup表单组件
          formGroupList: assessmentDistributeDialogFormItems,
          formGroupValues: {},
          formButtonList: assessmentDistributeDialogFormBtns,
          rules: distributeRules
        }
      }
    };
  },
  methods: {
    handleSearchFormBtn() {},
    handleTableRowButton(row, flag) {
      if (flag.type === "distribute") {
        //分配
        this.dialogFormSettingsAssessmentDistribute.dialogFormVisible = true;
        this.dialogFormSettingsAssessmentDistribute.dialogFormItems.formGroupValues = row;
      } else if (flag.type === "preview") {
        this.tableFormData = {};
        this.dialogSelfEvaluationVisible = true;
        this.tableFormData = row;
      }
    },
    //考核办分配保存
    handleAssessmentDistribute(btns, formData) {
      this.dialogFormSettingsAssessmentDistribute.dialogFormVisible = false;
      if (btns.flag === "save") {
        this.tableSettings.tableDatas.map(item => {
          if (item.assessmentId === formData.assessmentId) {
            let userText = this.$store.getters["user/userIdForName"];
            item.cityLeadDepartment = userText[formData.cityLeadDepartmentId];
            item.cityCoordinationDepartment =
              userText[formData.cityCoordinationDepartmentId];
            item = Object.assign({}, item, formData);
            this.$store
              .dispatch("assessment/commitAssessmentInfo", item)
              .then(() => {
                this.setTableList();
              });
            return item;
          }
        });
        this.setTableList();
      }
    },
    //开启市局自评
    handleSelfEvaluation() {
      this.dialogFormSettingsSelfEvaluation.dialogFormVisible = true;
      this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues = {};
      let assessmentOpen = this.$store.getters["assessment/getAssessmentOpen"];
      if (assessmentOpen && Object.keys(assessmentOpen).length > 0) {
        this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues = assessmentOpen;
      } else {
        this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues = {
          year: "2019",
          enable: "1"
        };
      }
    },
    //开启自评
    handleOpenSelfEvaluation(btn, formData) {
      this.dialogFormSettingsSelfEvaluation.dialogFormVisible = false;
      if (btn.flag === "save") {
        this.$store.dispatch("assessment/commitAssessmentOpen", formData);
      }
    },
    //结果上报
    handleSubmitSelfEvaluationResult() {
      let complete = 0;
      this.tableSettings.tableDatas.forEach(item => {
        if (item.status === "incomplete") {
          complete++;
        }
      });
      if (complete > 0) {
        this.$confirm(
          "上报列表有未完成内容，您确定提交给省级考核办吗？提交后只能查看,不能再作任何修改！",
          "上报",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(confirm => {
            console.log(confirm);
            let list = this.$store.getters["assessment/getAssessmentList"];
            list.map(item => (item.status = "reported"));
            this.$store
              .dispatch("assessment/commitAssessmentInfo", list)
              .then(() => {
                this.setTableList();
              });
          })
          .catch();
      } else {
        this.$confirm(
          "您确定提交给省级考核办吗？提交后只能查看,不能再作任何修改！",
          "上报",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(confirm => {
            console.log(confirm);
            let list = this.$store.getters["assessment/getAssessmentList"];
            list.map(item => (item.status = "reported"));
            this.$store
              .dispatch("assessment/commitAssessmentInfo", list)
              .then(() => {
                this.setTableList();
              });
          })
          .catch();
      }
    },
    //底部分页回调函数
    handlePaginationPagenumber() {},
    handleSizeChange() {},
    //预览及导出
    handlePreviewExport() {
      this.dialogPreviewExportVisible = true;
      this.previewTableSettings.tableDatas = this.tableSettings.tableDatas;
    },
    handleDialogTableExport() {},
    setTableList() {
      this.totalScore = 0;
      this.totalSelfScore = 0;
      let assessmentResult = this.$store.getters[
        "assessment/getAssessmentResult"
      ];
      let list = this.$store.getters["assessment/getAssessmentList"];
      list.map(item => {
        this.totalScore += parseFloat(item.targetScore, 2);
        this.totalSelfScore += parseFloat(
          item.selfScore ? item.selfScore : 0,
          2
        );
        item.operateBtns = [];
        if (
          assessmentResult[item.assessmentId] &&
          assessmentResult[item.assessmentId]["citySelf"]
        ) {
          item.selfName =
            assessmentResult[item.assessmentId]["citySelf"].selfName;
          item.checkName =
            assessmentResult[item.assessmentId]["citySelf"].checkName;
          if (item.status == "incomplete") {
            item.status = "complete";
          }
        }
        if (
          assessmentResult[item.assessmentId] &&
          assessmentResult[item.assessmentId]["cityOpinion"]
        ) {
          item.opinion =
            assessmentResult[item.assessmentId]["cityOpinion"].opinion;
          item.material =
            assessmentResult[item.assessmentId]["cityOpinion"].material;
        }
        if (!item.cityLeadDepartmentId && item.status !== "reported") {
          item.operateBtns.push({
            styleType: "primary",
            type: "distribute",
            text: "分配"
          });
        }
        item.operateBtns.push({
          styleType: "text",
          type: "preview",
          text: "查看"
        });
        return item;
      });
      this.tableSettings.tableDatas = [];
      this.tableSettings.tableDatas = list;
      this.paginationSettings.totalNumbers = this.tableSettings.tableDatas.length;
    }
  },
  mounted() {
    this.setTableList();
    let list = this.$store.getters["assessment/getAssessmentList"];
    let formList = this.suggestSetFormItems.formGroupList;
    this.suggestSetFormItems.formGroupList = this.$globalFnc.setFilterFormData(
      list,
      JSON.parse(JSON.stringify(formList))
    );
  }
};
</script>

<style scoped></style>
