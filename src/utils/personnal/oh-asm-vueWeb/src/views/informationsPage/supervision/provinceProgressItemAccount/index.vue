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
        <el-button type="primary" size="small" @click="closeSearch">{{
          showSearchForm ? "隐藏查询" : "显示查询"
        }}</el-button>
      </el-col>
    </el-row>
    <el-col :span="24">
      <ul class="lheight40">
        状态提醒:
        <Status />
        无落实进展
        <Status class="ml10" status="incomplete" />
        有进展未查阅
        <Status class="ml10" status="complete" />
        有进展已查阅
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
    />
  </div>
</template>

<script>
// 搜索栏表单配置
import progressAccountSearchFormItems from "@/utils/formSettingsJson/supervision/formGroup/provinceProgressAccount/progressAccountSearchFormItems.json";
import progressAccountSearchFormBtns from "@/utils/formSettingsJson/supervision/formGroup/provinceProgressAccount/progressAccountSearchFormBtns.json";
// 表格的头部
import progressAccountTableHeader from "@/utils/formSettingsJson/supervision/tableListMng/provinceProgressAccount/progressAccountTableHeader.json";
// 牵头部门落实进展台账对话框配置
import fillStandDialogItems from "@/utils/formSettingsJson/supervision/checkStand/dialogFormItems.json";
import fillStandDialogBtns from "@/utils/formSettingsJson/supervision/checkStand/dialogFormBtns.json";

import Status from "@/components/circleDot";

export default {
  name: "progressAccount",
  components: {
    Status
  },
  data() {
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
      let progressAccountList = this.$store.getters[
          "assessment/getAssessmentList"
        ].concat(),
        progressResult = this.$store.getters["supervision/getProgressResult"];
      this.progressAccountTableSettings.tableDatas = [];
      progressAccountList.forEach(item => {
        if (item.cityLeadDepartmentId) {
          item.cityLeadDepartment = this.$store.getters["user/userIdForName"][
            item.cityLeadDepartmentId
          ];
        }
        if (
          progressResult[item.assessmentId] &&
          progressResult[item.assessmentId]["departmentResult"]
        ) {
          item = Object.assign(
            {},
            item,
            progressResult[item.assessmentId]["departmentResult"]
          );
          item.implementProgress = item.departmentImplementProgress;
          item.implementProgressDate = item.departmentImplementProgressDate;
        }
        item.option = [];
        item.option.push({
          type: "detail",
          styleType: "text",
          text: "查看",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        });
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
          completeNum: "300"
        }
      ];
      if (btn.type === "detail") {
        if (!row.consultStatus) {
          this.$message.error("无落实进展情况!");
          return false;
        }
        this.standDialogFormSettings.dialogFormItems.formGroupList = fillStandDialogItems;
        this.standDialogFormSettings.dialogFormItems.formButtonList = [];
        this.standDialogFormSettings.dialogFormItems.formGroupValues = row;
        this.standDialogFormSettings.dialogFormVisible = true;
      }
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
