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
      v-if="dialogFormSettingsOfficeOpinion.dialogFormVisible"
      :dialogFormSettings="dialogFormSettingsOfficeOpinion"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>

<script>
import distributeSuperviseFormItems from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperviseItems.json";
import distributeSuperviseFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperviseBtns.json";
import officeOpinionTableHeader from "@/utils/formSettingsJson/informationsPage/assessment/officeOpinionTableHeader.json";

import officeOpinionDialogFormItems from "@/utils/formSettingsJson/informationsPage/assessment/officeOpinionDialogFormItems.json";
import officeOpinionDialogFormBtns from "@/utils/formSettingsJson/informationsPage/assessment/officeOpinionDialogFormBtns.json";
import officeOpinionRules from "@/utils/formRulesJson/assessment/officeOpinionRules";

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
          headerOptions: officeOpinionTableHeader,
          isShowIndex: false,
          showIndexHeader: "序号"
        }
      },
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      dialogFormSettingsOfficeOpinion: {
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "意见填写", //弹窗标题
        dialogType: "form", //弹窗类型
        dialogFormItems: {
          //如果是form类型，在此处配置form,详情参考formGroup表单组件
          formGroupList: officeOpinionDialogFormItems,
          formGroupValues: {},
          formButtonList: officeOpinionDialogFormBtns,
          rules: officeOpinionRules
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
      if (flag.type === "opinion") {
        this.dialogFormSettingsOfficeOpinion.dialogFormVisible = true;
        this.dialogFormSettingsOfficeOpinion.dialogFormItems.formGroupList.map(
          item => {
            if (item.name === "officeId") {
              item.data = this.$store.getters["user/orgTree"];
            }
            return item;
          }
        );
        row["officeId"] = this.$store.getters["user/userInfos"].userId;
        this.dialogFormSettingsOfficeOpinion.dialogFormItems.formGroupValues = row;
      }
    },
    //意见填写弹窗回调
    handleDialogForm(btns, formData) {
      let _this = this;
      this.dialogFormSettingsOfficeOpinion.dialogFormVisible = false;
      if (formData.assessmentId) {
        this.$confirm("确认提交给上级部门处理？提交后将不能修改", "提交", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(confirm => {
            console.log(confirm);
            formData["status"] = "complete";
            this.$store.dispatch("assessment/commitAssessmentResult", {
              formData,
              action: "officeOpinion"
            });
            _this.$message({
              message: "提交成功",
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
        assessmentResult = this.$store.getters[
          "assessment/getAssessmentResult"
        ];
      this.tableSettings.tableDatas = [];
      this.$store.getters["assessment/getAssessmentList"].forEach(item => {
        item.operateBtns = [];
        if (
          item.officeCoordinationDepartmentId &&
          item.officeCoordinationDepartmentId == userId
        ) {
          let assessment = assessmentResult[item.assessmentId];
          if (
            assessment &&
            assessment["officeOpinion"] &&
            assessment["officeOpinion"].officeOpinions
          ) {
            item.officeOpinions = assessment["officeOpinion"].officeOpinions;
            item.status = "complete";
          } else {
            item.status = "incomplete";
            item.operateBtns.push({
              styleType: "primary",
              type: "opinion",
              text: "意见",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-s-comment",
              isIcon: true
            });
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
