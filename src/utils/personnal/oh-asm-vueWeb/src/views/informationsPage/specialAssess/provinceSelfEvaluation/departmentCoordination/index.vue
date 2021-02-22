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
    <el-col :span="16" class="lheight40">
      状态提醒：<Status status="incomplete" />未完成
      <Status class="ml10" status="complete" />已完成
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
    <!--意见填写-->
    <dialogForm
      v-if="dialogFormSettingsOpinion.dialogFormVisible"
      :dialogFormSettings="dialogFormSettingsOpinion"
      @handleDialogForm="handleDialogFormOpinion"
    />
  </div>
</template>

<script>
import distributeSuperviseFormItems from "@/utils/formSettingsJson/informationsPage/specialAssessment/distributeSuperviseItems.json";
import distributeSuperviseFormBtns from "@/utils/formSettingsJson/informationsPage/specialAssessment/distributeSuperviseBtns.json";

import distributeDialogFormItems from "@/utils/formSettingsJson/informationsPage/specialAssessment/distributeDialogFormItems.json";
import distributeDialogFormBtns from "@/utils/formSettingsJson/informationsPage/specialAssessment/distributeDialogFormBtns.json";

import opinionDialogFormItems from "@/utils/formSettingsJson/informationsPage/specialAssessment/opinionDialogFormItems.json";
import opinionDialogFormBtns from "@/utils/formSettingsJson/informationsPage/specialAssessment/opinionDialogFormBtns.json";

import distributeSuperviseTableHeader from "@/utils/formSettingsJson/informationsPage/specialAssessment/cityCoordinationTableHeader.json";
import cityOpinionRules from "@/utils/formRulesJson/assessment/cityOpinionRules";
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
      dialogFormSettingsOpinion: {
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "市级分配", //弹窗标题
        dialogType: "form", //弹窗类型
        dialogFormItems: {
          //如果是form类型，在此处配置form,详情参考formGroup表单组件
          formGroupList: opinionDialogFormItems,
          formGroupValues: {},
          formButtonList: opinionDialogFormBtns,
          rules: cityOpinionRules
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
              item.hideItem = true;
              item.data = [];
            }
            if (item.name === "officeCoordinationDepartmentId") {
              // item.data = orgTree;
              item.hideItem = false;
            }
            return item;
          }
        );
        this.dialogFormSettingsDistribute.dialogFormItems.formGroupValues = row;
      } else if (flag.type === "opinion") {
        let assessmentResult = this.$store.getters[
          "assessment/getSpecialAssessmentResult"
        ];
        this.dialogFormSettingsOpinion.dialogFormVisible = true;
        if (row.officeCoordinationDepartmentId) {
          //拥有下级配合部门
          let result = assessmentResult[row.assessmentId];
          if (
            result &&
            result["specialOfficeOpinions"] &&
            result["specialOfficeOpinions"]["specialOfficeOpinions"]
          ) {
            row.coordinationList = [];
            row.coordinationList.push({
              office: row.officeCoordinationDepartment,
              officeOpinions: result["officeOpinion"]["officeOpinions"],
              officeMaterials: result["officeOpinion"]["officeMaterials"],
              officeInputName: result["officeOpinion"]["officeInputName"],
              officeCheckName: result["officeOpinion"]["officeCheckName"]
            });
          }
        }
        this.dialogFormSettingsOpinion.dialogFormItems.formGroupList.map(
          item => {
            if (item.name === "coordinationName") {
              item.data = this.$store.getters["user/orgTree"];
            }
            return item;
          }
        );
        row["coordinationName"] = this.$store.getters["user/userInfos"].userId;
        this.dialogFormSettingsOpinion.dialogFormItems.formGroupValues = row;
      }
    },
    //分配弹窗回调按钮
    handleDialogFormDistribute(btns, formData) {
      this.dialogFormSettingsDistribute.dialogFormVisible = false;
      if (btns.flag === "save") {
        this.tableSettings.tableDatas.map(item => {
          if (item.targetId === formData.targetId) {
            let userText = this.$store.getters["user/userIdForName"];
            item.officeCoordinationDepartment =
              userText[formData.officeCoordinationDepartmentId];
            item = Object.assign({}, item, formData);
            this.$store
              .dispatch("assessment/commitSpecialAssessmentInfo", item)
              .then(() => {
                this.setTableList();
              });
          }
          return item;
        });
      }
    },
    //市级意见填写
    handleDialogFormOpinion(btns, formData) {
      let _this = this;
      this.dialogFormSettingsOpinion.dialogFormVisible = false;
      if (formData.assessmentId) {
        this.$confirm("确认提交给牵头部门处理？", "提交", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(confirm => {
            console.log(confirm);
            _this.$store.dispatch("assessment/commitSpecialAssessmentResult", {
              formData,
              action: "specialCityOpinion"
            });
            _this.$message({
              message: "数据提交成功",
              type: "success"
            });
            this.setTableList();
          })
          .catch();
      }
    },
    //底部分页回调函数
    handlePaginationPagenumber() {},
    handleSizeChange() {},
    setTableList() {
      let userId = this.$store.getters["user/userInfos"].userId,
        tableDateSource = JSON.parse(
          JSON.stringify(
            this.$store.getters["assessment/getSpecialAssessmentList"]
          )
        ),
        assessmentResult = this.$store.getters[
          "assessment/getSpecialAssessmentResult"
        ];
      this.tableSettings.tableDatas = [];
      tableDateSource.forEach(item => {
        // item.cityCoordinationDepartmentId = userId;
        item.operateBtns = [];
        if (
          item.cityCoordinationDepartmentId &&
          item.cityCoordinationDepartmentId == userId
        ) {
          if (
            assessmentResult[item.targetId] &&
            assessmentResult[item.targetId]["specialCityOpinion"] &&
            assessmentResult[item.targetId]["specialCityOpinion"].opinion
          ) {
            item.status = "complete";
          } else {
            if (item.selfScore && !assessmentResult[item.targetId]) {
              item.status = "complete";
            } else {
              item.operateBtns.push({
                styleType: "primary",
                type: "opinion",
                text: "意见",
                class: "text-primary fontSize20 mr10",
                icon: "el-icon-s-comment",
                isIcon: true
              });
              if (!item.officeCoordinationDepartmentId) {
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
          item.opinion =
            assessmentResult[item.targetId] &&
            assessmentResult[item.targetId].specialCityOpinion &&
            assessmentResult[item.targetId].specialCityOpinion.opinion
              ? assessmentResult[item.targetId].specialCityOpinion.opinion
              : "";
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
    let list = this.$store.getters["assessment/getSpecialAssessmentList"];
    let formList = this.suggestSetFormItems.formGroupList;
    this.suggestSetFormItems.formGroupList = this.$globalFnc.setFilterFormData(
      list,
      JSON.parse(JSON.stringify(formList))
    );
  }
};
</script>
