<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          ref="searchForm"
          :formGroupSettings="suggestSetFormItems"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row class="mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button type="primary" size="small" @click="closeSearch">{{
          showSearchForm ? "隐藏查询" : "显示查询"
        }}</el-button>
      </el-col>
    </el-row>
    <el-col :span="24" class="lheight40">
      状态提醒：<Status status="incomplete" />未完成
      <Status class="ml10" status="complete" />已完成
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
    <!--市县级分配弹窗表单-->
    <dialogForm
      v-if="dialogFormSettingsDistribute.dialogFormVisible"
      :dialogFormSettings="dialogFormSettingsDistribute"
      @handleDialogForm="handleDialogFormDistribute"
    />
    <!--市县级自评弹窗表单-->
    <dialogForm
      v-if="dialogFormSettingsSelfEvaluation.dialogFormVisible"
      :dialogFormSettings="dialogFormSettingsSelfEvaluation"
      @handleDialogForm="handleDialogFormSelfEvaluation"
      @linkSelect="linkSelect"
    />
  </div>
</template>

<script>
import distributeSuperviseFormItems from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperviseItems.json";
import distributeSuperviseFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperviseBtns.json";

import distributeDialogFormItems from "@/utils/formSettingsJson/informationsPage/assessment/distributeDialogFormItems.json";
import distributeDialogFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/distributeDialogFormBtns.json";

import distributeSuperviseTableHeader from "@/utils/formSettingsJson/informationsPage/assessment/cityLeadTableHeader.json";

import selfEvaluationDialogFormItems from "@/utils/formSettingsJson/informationsPage/assessment/selfEvaluation/selfEvaluationDialogFormItems.json";
import selfEvaluationDialogFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/selfEvaluation/selfEvaluationDialogFormBtns.json";

import officeSelfRules from "@/utils/formRulesJson/assessment/officeSelfRules";
import cityDistributeRules from "@/utils/formRulesJson/assessment/cityDistributeRules";

import formGroup from "@/components/formGroup";
import Status from "@/components/circleDot";

export default {
  name: "index",
  components: {
    formGroup,
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
      showSearchForm: true,
      tableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "assessmentId",
          border: true,
          headerOptions: distributeSuperviseTableHeader,
          isShowIndex: false,
          showIndexHeader: "序号"
        }
      },
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      dialogFormSettingsDistribute: {
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "分配", //弹窗标题
        dialogType: "form", //弹窗类型
        dialogFormItems: {
          //如果是form类型，在此处配置form,详情参考formGroup表单组件
          formGroupList: distributeDialogFormItems,
          formGroupValues: {},
          formButtonList: distributeDialogFormBtns,
          rules: cityDistributeRules
        }
      },
      dialogFormSettingsSelfEvaluation: {
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "自评打分", //弹窗标题
        dialogType: "form", //弹窗类型
        width: "70%",
        dialogFormItems: {
          //如果是form类型，在此处配置form,详情参考formGroup表单组件
          formGroupList: selfEvaluationDialogFormItems,
          formGroupValues: {
            reduceScore: "N"
          },
          formButtonList: selfEvaluationDialogFormBtns,
          rules: officeSelfRules
        }
      }
    };
  },
  methods: {
    //条件查询
    handleSearchFormBtn(btns, formData) {
      console.log(btns, formData);
    },
    //表格操作按钮
    handleTableRowButton(row, flag) {
      if (flag.type === "distribute") {
        //分配
        this.dialogFormSettingsDistribute.dialogFormVisible = true;
        // let orgTree = this.$store.getters["user/orgTree"];
        this.dialogFormSettingsDistribute.dialogFormItems.formGroupList.map(
          item => {
            if (item.name === "officeLeadDepartmentId") {
              item.hideItem = false;
              // item.data = orgTree;
            }
            if (item.name === "officeCoordinationDepartmentId") {
              item.hideItem = true;
              item.data = [];
            }
            return item;
          }
        );
        this.dialogFormSettingsDistribute.dialogFormItems.formGroupValues = row;
      } else if (flag.type === "self") {
        let assessmentResult = this.$store.getters[
          "assessment/getAssessmentResult"
        ];
        if (row.cityCoordinationDepartmentId) {
          //判断是否拥有配合部门
          if (
            !assessmentResult[row.targetId] ||
            !assessmentResult[row.targetId]["cityOpinion"] ||
            !assessmentResult[row.targetId]["cityOpinion"]["opinion"]
          ) {
            this.$message({
              message: "配合部门未完成意见填写,无法自评!",
              type: "warning"
            });
            return;
          } else {
            if (assessmentResult[row.targetId]["cityOpinion"]) {
              let coordination = assessmentResult[row.targetId]["cityOpinion"];
              row["coordinationList"] = [];
              // row.checkName = assessmentResult[row.assessmentId]['officeSelf']
              //     ? assessmentResult[row.assessmentId]['officeSelf'].checkName
              //     : '';
              // row.selfName = assessmentResult[row.assessmentId]['officeSelf']
              //     ? assessmentResult[row.assessmentId]['officeSelf'].selfName
              //     : '';
              row["coordinationList"].push({
                coordination: row.cityCoordinationDepartment,
                coordinationOpinions: coordination.opinion,
                coordinationMaterials: coordination.materials
              });
              this.startOfficeSelf(row);
            }
          }
        } else {
          this.startOfficeSelf(row);
        }
      }
    },
    startOfficeSelf(row) {
      this.dialogFormSettingsSelfEvaluation.dialogFormVisible = true;
      this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues = {
        dailyfileslist: [
          {
            fileName: "商务局关于耕地面积年度任务3月份落实情况",
            fileType: "docx",
            sortNum: "1"
          },
          {
            fileName: "商务局关于耕地面积年度任务4月份落实情况",
            fileType: "docx",
            sortNum: "2"
          }
        ],
        quoteFiles: "N"
      };
      this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupList.map(
        item => {
          if (item.name === "selfOrgName") {
            item.data = this.$store.getters["user/orgTree"];
          }
          return item;
        }
      );
      row.selfOrgName = this.$store.getters["user/userInfos"].userId;
      row.dailyfileslist = [
        {
          fileName: "商务局关于耕地面积年度任务3月份落实情况",
          fileType: "docx",
          sortNum: "1"
        },
        {
          fileName: "商务局关于耕地面积年度任务4月份落实情况",
          fileType: "docx",
          sortNum: "2"
        }
      ];
      let values = {
        ...row,
        reduceScore: row.reduceScore || "N",
        quoteFiles: "N"
      };
      this.linkSelect("reduceScoreHandle", row.reduceScore);
      this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues = values;
    },
    linkSelect(linkName, data) {
      if (linkName === "reduceScoreHandle") {
        if (data === "Y") {
          this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupList.map(
            item => {
              if (item.name === "reason" || item.name === "measures") {
                item.hideItem = false;
              }
              return item;
            }
          );
        } else {
          this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupList.map(
            item => {
              if (item.name === "reason" || item.name === "measures") {
                item.hideItem = true;
              }
              return item;
            }
          );
        }
      } else if (linkName == "quoteFiles") {
        selfEvaluationDialogFormItems.map(item => {
          if (item.name === "dailyfileslist") {
            let flag = data == "Y" ? false : true;
            item.hideItem = flag;
          }
        });
      }
    },
    //分配弹窗回调按钮
    handleDialogFormDistribute(btns, formData) {
      this.dialogFormSettingsDistribute.dialogFormVisible = false;
      if (btns.flag === "save") {
        let list = this.tableSettings.tableDatas;
        list.forEach(item => {
          if (item.targetId === formData.targetId) {
            let userText = this.$store.getters["user/userIdForName"];
            item.officeLeadDepartment =
              userText[formData.officeLeadDepartmentId];
            item.officeLeadDepartmentId = formData.officeLeadDepartmentId;
            item = Object.assign({}, item, formData);
            this.$store
              .dispatch("assessment/commitAssessmentInfo", item)
              .then(() => {
                this.setTableList();
              });
          }
        });
      }
    },
    //底部分页回调函数
    handlePaginationPagenumber() {},
    //自评弹窗
    handleDialogFormSelfEvaluation(btns, formData) {
      console.log(formData, "formData");
      let _this = this;
      this.dialogFormSettingsSelfEvaluation.dialogFormVisible = false;
      if (formData.targetId) {
        this.$confirm("确认提交给考核办？提交后数据不能修改", "提交", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(confirm => {
            console.log(confirm);
            this.$store.getters["assessment/getAssessmentList"].forEach(
              item => {
                if (item.assessmentId === formData.assessmentId) {
                  item.selfScore = formData.selfScore;
                  item.scoreBasis = formData.scoreBasis;
                  item.reason = formData.reason;
                  item.measures = formData.measures;
                  item.reduceScore = formData.reduceScore;
                  item.selfName = formData.selfName;
                  item.checkName = formData.checkName;
                  this.$store.dispatch("assessment/commitAssessmentInfo", item);
                }
              }
            );
            this.$store
              .dispatch("assessment/commitAssessmentResult", {
                formData,
                action: "citySelf"
              })
              .then(() => {
                _this.$message({
                  message: "数据提交成功",
                  type: "success"
                });
                this.setTableList();
              });
          })
          .catch();
      }
    },
    handleSizeChange() {},
    setTableList() {
      this.totalScore = 0;
      this.totalSelfScore = 0;
      let userId = this.$store.getters["user/userInfos"].userId,
        tableDateSource = JSON.parse(
          JSON.stringify(this.$store.getters["assessment/getAssessmentList"])
        ),
        assessmentResult = this.$store.getters[
          "assessment/getAssessmentResult"
        ];
      this.tableSettings.tableDatas = [];
      tableDateSource.forEach(item => {
        item.operateBtns = [];
        if (item.cityLeadDepartmentId && item.cityLeadDepartmentId == userId) {
          this.totalScore += parseFloat(item.targetScore, 2);
          this.totalSelfScore += parseFloat(
            item.selfScore ? item.selfScore : 0,
            2
          );
          if (
            assessmentResult[item.targetId] &&
            assessmentResult[item.targetId].citySelf &&
            assessmentResult[item.targetId].citySelf.selfScore
          ) {
            item.status = "complete";
          } else {
            if (item.selfScore && !assessmentResult[item.targetId]) {
              item.status = "complete";
            } else {
              item.operateBtns.push({
                styleType: "primary",
                type: "self",
                text: "自评",
                class: "text-primary fontSize20 mr10",
                icon: "el-icon-tickets",
                isIcon: true
              });
              if (!item.officeLeadDepartmentId) {
                item.operateBtns.push({
                  styleType: "primary",
                  type: "distribute",
                  text: "分配",
                  class: "text-primary fontSize20 mr10",
                  icon: "el-icon-set-up",
                  isIcon: true
                });
              }
              item.status = "incomplete";
            }
          }
          this.tableSettings.tableDatas.push(item);
        }
      });
      this.paginationSettings.totalNumbers = this.tableSettings.tableDatas.length;
    },
    closeSearch() {
      this.showSearchForm = !this.showSearchForm;
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
