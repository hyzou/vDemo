<template>
  <div class="width100">
    <el-col class="mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mb20" :span="24">
      <formGroup
        :formGroupSettings="reviewProgressSearchFormGroupSettings"
        @formGroupSubmit="handleReviewProgressSearchButtons"
      />
    </el-col>
    <el-row class="reviewProgress-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button key="add" type="primary" @click="handleAddWorkProgress"
          >新增
        </el-button>
        <el-button type="danger" @click="handleDeleteSelectData"
          >批量删除
        </el-button>
        <el-button type="primary" @click="handleExportSelectData"
          >选中导出
        </el-button>
        <el-button type="primary" @click="handleExportAllData">导出 </el-button>
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="reviewProgressTableSettings"
      @handleTableRowButton="handleTableRowButton"
      @handleTableMutiChecked="handleTableMutiChecked"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
      @handlePaginationPagesize="handleSizeChange"
    />
    <el-dialog
      v-if="workProgressDialogSetting.dialogVisible"
      top="90px"
      width="80%"
      :title="workProgressDialogSetting.dialogName"
      :visible.sync="workProgressDialogSetting.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <workProgress
        ref="workProgress"
        :workProgressForm="workProgressForm"
      ></workProgress>
      <div slot="footer" class="dialog-footer textAlignCenter">
        <el-button type="primary" @click="handleSaveData"
          >提交至省考核办</el-button
        >
        <el-button type="primary" @click="handleSaveData">保存</el-button>
        <el-button @click="handleCloseDialog">退出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 搜索栏表单配置
import reviewProgressSearchFormItems from "@/utils/formSettingsJson/supervision/formGroup/reviewProgress/reviewProgressSearchFormItems.json";
import reviewProgressSearchFormBtns from "@/utils/formSettingsJson/supervision/formGroup/reviewProgress/reviewProgressSearchFormBtns.json";
// 表格的头部
import reviewProgressTableHeader from "@/utils/formSettingsJson/supervision/tableListMng/reviewProgress/reviewProgressTableHeaderWithoutCity.json";
// import reviewProgressTableData from "@/utils/formSettingsJson/supervision/tableListMng/reviewProgress/reviewProgressTableData.json";

// 引入考核工作进度组件
import workProgress from "./workProgress/index.vue";
export default {
  name: "reviewProgress",
  components: {
    workProgress
  },
  data() {
    return {
      // 搜索栏
      reviewProgressSearchFormGroupSettings: {
        fullScreen: false,
        formGroupList: reviewProgressSearchFormItems,
        formGroupValues: {},
        formButtonList: reviewProgressSearchFormBtns
      },
      // 表格设置
      reviewProgressTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "reviewProgressTable",
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: reviewProgressTableHeader,
          isMultipleTable: "true"
        }
      },
      // 表格选中的数据
      tableSelectedData: [],
      // 分页
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      // 考核工作进展表单
      workProgressDialogSetting: {
        dialogVisible: false,
        dialogName: "市考核工作进展情况表单"
      },
      workProgressForm: {}
    };
  },
  created() {
    // 保存几条列表数据
    // reviewProgressTableData.forEach(item => {
    //   this.$store.dispatch("supervision/setWorkProgress", item);
    // });
  },
  mounted() {
    this.setReviewProgressList();
  },
  methods: {
    // 获取考核工作进展情况列表
    setReviewProgressList() {
      this.reviewProgressTableSettings.tableDatas = this.$store.getters[
        "supervision/workProgress"
      ].slice(
        (this.paginationSettings.currentPage - 1) * 10,
        this.paginationSettings.currentPage * 10
      );
      this.paginationSettings.totalNumbers = this.$store.getters[
        "supervision/workProgress"
      ].length;
    },
    // 搜索
    handleReviewProgressSearchButtons() {},
    // 表格按钮
    handleTableRowButton(data, type) {
      if (type.type === "edit") {
        data.date = this.parserDate(data.dateTime);
        this.workProgressForm = data;
        this.workProgressDialogSetting.dialogVisible = true;
      }
      if (type.type === "delete") {
        this.$store
          .dispatch(
            "supervision/commitDeleteWorkProgress",
            data.id ? data.id : ""
          )
          .then(() => {
            this.setReviewProgressList();
          });
      }
    },
    // 获取选中数据
    handleTableMutiChecked(val) {
      this.tableSelectedData = val;
    },
    // 新增工作进度
    handleAddWorkProgress() {
      this.workProgressForm = {};
      this.workProgressDialogSetting.dialogVisible = true;
    },
    // 退出工作进度
    handleCloseDialog() {
      this.workProgressDialogSetting.dialogVisible = false;
    },
    // 批量删除
    handleDeleteSelectData() {
      if (!this.tableSelectedData.length) {
        this.$message("请先选择要删除的信息");
        return;
      }
      this.tableSelectedData.forEach(item => {
        this.$store
          .dispatch(
            "supervision/commitDeleteWorkProgress",
            item.id ? item.id : ""
          )
          .then(() => {
            this.setReviewProgressList();
          });
      });
    },
    // 导出选中
    handleExportSelectData() {},
    // 导出
    handleExportAllData() {},
    //底部分页回调函数
    handlePaginationPagenumber(val) {
      this.paginationSettings.currentPage = val;
      this.setReviewProgressList();
    },
    handleSizeChange(val) {
      this.paginationSettings.currentPage = val;
      this.setReviewProgressList();
    },
    // 保存数据
    handleSaveData() {
      let saveData = this.$refs.workProgress.saveData();
      if (!saveData) {
        return;
      }
      saveData.option = [
        {
          type: "edit",
          styleType: "primary",
          text: "编辑"
        },
        {
          type: "delete",
          styleType: "danger",
          text: "删除"
        }
      ];
      saveData.dateTime = this.$globalFnc.changeDateFormat(
        saveData.date,
        "ymd"
      );
      this.$store
        .dispatch("supervision/commitWorkProgress", saveData)
        .then(() => {
          this.setReviewProgressList();
        });
      this.workProgressDialogSetting.dialogVisible = false;
    },
    parserDate(date) {
      var t = Date.parse(date);
      if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
      }
    }
  }
};
</script>

<style scoped></style>
