<template>
  <div class="width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          ref="searchForm"
          :formGroupSettings="progressAccountSearchFormGroupSettings"
          @formGroupSubmit="handleProgressAccountSearchButtons"
        />
      </el-col>
    </el-row>
    <el-row class="progressAccount-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button type="primary" size="small" @click="closeSearch">
          {{ showSearchForm ? "隐藏查询" : "显示查询" }}
        </el-button>
      </el-col>
    </el-row>
    <el-col :span="24">
      <ul class="lheight40">
        状态提醒:
        <Status />
        未填报
        <Status class="ml10" status="incomplete" />
        已填报未完成
        <Status class="ml10" status="complete" />
        已完成
      </ul>
    </el-col>
    <tableList
      :tablelistSettings="progressAccountTableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
      @handlePaginationPagesize="handleSizeChange"
    />
    <!--牵头部门落实进展台账-->
    <dialogForm
      v-if="standDialogFormSettings.dialogFormVisible"
      :dialogFormSettings="standDialogFormSettings"
      @handleDialogForm="handleSaveStand"
    />
  </div>
</template>

<script>
// 搜索栏表单配置
import progressAccountSearchFormItems from "@/utils/formSettingsJson/supervision/formGroup/provinceProgressAccount/provinceProgressFillSearchFormItems.json";
import progressAccountSearchFormBtns from "@/utils/formSettingsJson/supervision/formGroup/progressAccount/progressAccountSearchFormBtns.json";
// 表格的头部
import progressAccountTableHeader from "@/utils/formSettingsJson/supervision/tableListMng/progressAccount/progressAccountTableHeader.json";
// 牵头部门落实进展台账对话框配置
import fillStandDialogItems from "@/utils/formSettingsJson/supervision/fillStand/dialogFormItems.json";
import fillStandDialogBtns from "@/utils/formSettingsJson/supervision/fillStand/dialogFormBtns.json";
// 牵头部门分配台账对话框配置
import assignStandDialogItems from "@/utils/formSettingsJson/supervision/assignStand/dialogFormItems.json";
import assignStandDialogBtns from "@/utils/formSettingsJson/supervision/assignStand/dialogFormBtns.json";

import Status from "@/components/circleDot";

export default {
  name: "progressAccount",
  components: {
    Status
  },
  data() {
    progressAccountTableHeader.map(item => {
      if (item.prop == "cityLeadDepartment") {
        item.isHide = true;
      }
    });
    return {
      //牵头部门落实进展台账
      standDialogFormSettings: {
        width: "70%",
        dialogFormVisible: false, //弹窗是否可见（开或关）
        dialogFormTitle: "牵头部门落实进展台账", //弹窗标题
        dialogType: "formBlocks", //弹窗类型
        dialogFormItems: {
          formGroupList: fillStandDialogItems,
          formGroupValues: {},
          formButtonList: fillStandDialogBtns
        }
      },
      // 搜索栏
      progressAccountSearchFormGroupSettings: {
        fullScreen: false,
        formGroupList: progressAccountSearchFormItems,
        formGroupValues: {},
        formButtonList: progressAccountSearchFormBtns
      },
      showSearchForm: true,
      // 表格设置
      progressAccountTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "progressAccountTable",
          tooltipEffect: "dark",
          rowKey: "assessmentId",
          hasExpandContent: true,
          expandContent: "infolist",
          expandContentClass: "overflowXhYa",
          expandItemClass: "width100",
          expandContentLables: [
            {
              key: "completeRate",
              value: "任务完成情况："
            },
            {
              key: "agriculturalArea",
              value: "耕地面积(万亩)："
            },
            {
              key: "planAgriculturalArea",
              value: "计划值(万亩)："
            },
            {
              key: "departmentImplementProgress",
              value: "任务落实进展情况："
            },
            {
              key: "departmentImplementProgressMaterials",
              value: "任务落实依据："
            },
            {
              key: "implementProgressDate",
              value: "落实日期："
            }
          ],
          border: true,
          headerOptions: progressAccountTableHeader
        }
      },
      // 分页
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      }
    };
  },
  mounted() {
    this.setProgressAccountList();
  },
  methods: {
    setProgressAccountList() {
      // let userId = this.$store.getters["user/userInfos"].userId,
      let progressAccountList = this.$store.getters[
          "assessment/getAssessmentList"
        ].concat(),
        progressResult = this.$store.getters["supervision/getProgressResult"];
      this.progressAccountTableSettings.tableDatas = [];
      progressAccountList.forEach(item => {
        // item.cityLeadDepartmentId = userId;
        // if (
        //   // (item.cityCoordinationDepartmentId &&
        //   //   item.cityCoordinationDepartmentId == userId) ||
        //   item.cityLeadDepartmentId &&
        //   item.cityLeadDepartmentId == userId
        // ) {
        item.cityLeadDepartment = this.$store.getters["user/userIdForName"][
          item.cityLeadDepartmentId
        ];
        item.cityCoordinationDepartment = this.$store.getters[
          "user/userIdForName"
        ][item.cityCoordinationDepartmentId];

        if (
          (progressResult[item.targetId] &&
            progressResult[item.targetId]["departmentResult"]) ||
          (progressResult[item.targetId] &&
            progressResult[item.targetId]["officeResult"])
        ) {
          item = Object.assign(
            {},
            item,
            progressResult[item.targetId]["officeResult"]
              ? progressResult[item.targetId]["officeResult"]
              : {},
            progressResult[item.targetId]["departmentResult"]
              ? progressResult[item.targetId]["departmentResult"]
              : {}
          );
          item.implementProgress = item.departmentImplementProgress;
          item.implementProgressDate = item.departmentImplementProgressDate;
        }
        item.option = [];
        item.option.push(
          {
            type: "edit",
            styleType: "primary",
            text: "编辑",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          },
          {
            type: "distribute",
            styleType: "primary",
            text: "分配",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-set-up",
            isIcon: true
          }
        );
        item.infolist = [
          {
            completeRate: "未完成",
            agriculturalArea: "300",
            planAgriculturalArea: "500",
            departmentImplementProgress: "已落实300万亩",
            departmentImplementProgressMaterials: "",
            implementProgressDate: "2020-08-17"
          }
        ];
        this.progressAccountTableSettings.tableDatas.push(item);
        // }
      });
      this.paginationSettings.totalNumbers = this.progressAccountTableSettings.tableDatas.length;
    },
    // 搜索
    handleProgressAccountSearchButtons() {},
    // 表格按钮
    handleTableRowButton(row, btn) {
      row.dataSetList = [
        {
          dataName: "耕地面积",
          planNum: "500",
          completeNum: ""
        }
      ];
      if (btn.type === "distribute") {
        let officelist = [];
        this.$store.getters["user/orgTree"].map(item => {
          if (item.orgId == this.$store.getters["user/userInfos"].userId) {
            officelist = item.children;
          }
        });
        assignStandDialogItems.map(assignItem => {
          if (assignItem.name == "assignLeadOffice") {
            assignItem.children.map(assItem => {
              if (assItem.name == "officeId") {
                assItem.data = this.$globalFnc.arrayToFormDropdown(
                  officelist,
                  "orgName",
                  "orgId"
                );
              }
            });
          }
        });
        this.standDialogFormSettings.dialogFormItems.formGroupList = assignStandDialogItems;
        this.standDialogFormSettings.dialogFormItems.formButtonList = assignStandDialogBtns;
        this.standDialogFormSettings.dialogFormItems.formGroupValues = row;
        this.standDialogFormSettings.dialogFormVisible = true;
      }
      if (btn.type === "edit") {
        this.standDialogFormSettings.dialogFormItems.formGroupList = fillStandDialogItems;
        this.standDialogFormSettings.dialogFormItems.formButtonList = fillStandDialogBtns;
        this.standDialogFormSettings.dialogFormItems.formGroupValues = row;
        this.standDialogFormSettings.dialogFormVisible = true;
      }
    },
    // 牵头部门落实进展台账
    handleSaveStand(btns, formData) {
      formData.departmentImplementProgressDate = this.$globalFnc.changeDateFormat(
        new Date(),
        "ymd"
      );
      formData.consultStatus = "incomplete";
      this.$store
        .dispatch("supervision/commitProgressResult", {
          formData,
          action: "departmentResult"
        })
        .then(() => {
          this.setProgressAccountList();
        });
      this.standDialogFormSettings.dialogFormVisible = false;
    },
    //底部分页回调函数
    handlePaginationPagenumber() {},
    handleSizeChange() {},
    closeSearch() {
      this.showSearchForm = !this.showSearchForm;
    }
  }
};
</script>
