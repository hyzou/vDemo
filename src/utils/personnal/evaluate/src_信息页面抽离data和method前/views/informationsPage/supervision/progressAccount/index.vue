<template>
  <div class="width100">
    <el-col class="mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mb20" :span="24">
      <formGroup
        :formGroupSettings="progressAccountSearchFormGroupSettings"
        @formGroupSubmit="handleProgressAccountSearchButtons"
      />
    </el-col>
    <el-row class="progressAccount-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button type="primary" @click="handleExportAllData">导出</el-button>
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
    <!--查看-->
    <el-dialog
      v-if="indexAddignmentDialogSetting.dialogVisible"
      class="device-test"
      top="90px"
      width="70%"
      :title="indexAddignmentDialogSetting.dialogName"
      :visible.sync="indexAddignmentDialogSetting.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <index-assignment
        :indexConfigForm="indexConfigForm"
        ref="indexAssignment"
      ></index-assignment>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSaveData" v-if="showDialogSave"
          >保存</el-button
        >
        <el-button
          type="primary"
          @click="handleCloseDialog"
          v-if="showDialogSave"
          >退出</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 搜索栏表单配置
import progressAccountSearchFormItems from "@/utils/formSettingsJson/supervision/formGroup/progressAccount/progressAccountSearchFormItems.json";
import progressAccountSearchFormBtns from "@/utils/formSettingsJson/supervision/formGroup/progressAccount/progressAccountSearchFormBtns.json";
// 表格的头部
import progressAccountTableHeader from "@/utils/formSettingsJson/supervision/tableListMng/progressAccount/progressAccountTableHeader.json";
// import progressAccountTableData from "@/utils/formSettingsJson/supervision/tableListMng/progressAccount/progressAccountTableData.json";

import Status from "@/components/circleDot";
// 引入指标分配
import indexAssignment from "./indexAssignment/index.vue";

export default {
  name: "progressAccount",
  components: {
    Status,
    indexAssignment
  },
  data() {
    return {
      // 搜索栏
      progressAccountSearchFormGroupSettings: {
        fullScreen: false,
        formGroupList: progressAccountSearchFormItems,
        formGroupValues: {},
        formButtonList: progressAccountSearchFormBtns
      },
      // 表格设置
      progressAccountTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "progressAccountTable",
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: progressAccountTableHeader
        }
      },
      // 分页
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      // 查看
      indexAddignmentDialogSetting: {
        dialogVisible: false,
        dialogName: "市县考核办指标分派设置表单"
      },
      indexConfigForm: {},
      showDialogSave: false
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
          text: "查看"
        });
        this.progressAccountTableSettings.tableDatas.push(item);
      });
      this.paginationSettings.totalNumbers = this.progressAccountTableSettings.tableDatas.length;
    },
    // 搜索
    handleProgressAccountSearchButtons() {},
    // 表格按钮
    handleTableRowButton(row, type) {
      let data = {};
      if (type.type === "detail") {
        if (!row.consultStatus) {
          this.$message.error("无落实进展情况!");
          return;
        }
        this.showDialogSave = false;
        data = {
          isDepartment: true,
          isOffice: false,
          departmentDisabled: true
        };
        this.indexConfigForm = Object.assign({}, row, data);
        this.indexAddignmentDialogSetting.dialogVisible = true;
        row.consultStatus = "complete";
        this.$store
          .dispatch("assessment/commitAssessmentInfo", row)
          .then(() => {
            this.setProgressAccountList();
          });
      }
    },
    // 关闭弹框
    handleCloseDialog() {
      this.indexAddignmentDialogSetting.dialogVisible = false;
    },
    // 保存数据
    handleSaveData() {
      let saveData = this.$refs.indexAssignment.saveData();
      saveData.implementProgressDate = this.$globalFnc.changeDateFormat(
        new Date(),
        "ymd"
      );
      saveData.consultStatus = "incomplete";
      this.$store
        .dispatch("assessment/commitAssessmentInfo", saveData)
        .then(() => {
          this.setProgressAccountList();
        });
      this.indexAddignmentDialogSetting.dialogVisible = false;
    },
    //底部分页回调函数
    handlePaginationPagenumber() {},
    handleSizeChange() {},
    // 导出
    handleExportAllData() {}
  }
};
</script>

<style scoped></style>
