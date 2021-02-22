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
          :formGroupSettings="searchFormItems"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="4" :offset="14" class="mb10 textAlignRight">
        <el-button type="primary" size="small" @click="closeSearch">{{
          showSearchForm ? "隐藏查询" : "显示查询"
        }}</el-button>
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>
<script>
import suggestConsultationSearchFormItems from "@/utils/formSettingsJson/informationsPage/targetManage/suggestConsultation/suggestConsultationItems.json";
import suggestConsultationSearchFormBtns from "@/utils/formSettingsJson/informationsPage/targetManage/suggestConsultation/suggestConsultationBtns.json";
import suggestSuggestionTableHeader from "@/utils/formSettingsJson/informationsPage/targetManage/suggestSuggestion/suggestConsultationTableHeader.json";
import suggestSuggestionTableData from "@/utils/formSettingsJson/informationsPage/targetManage/suggestSuggestion/suggestSuggestionTableData.json";

import suggestSuggestionDialogFormItems from "@/utils/formSettingsJson/informationsPage/targetManage/suggestSuggestion/suggestSuggestionDialogFormItems.json";
// import suggestConsultationDialogFormBtns from "@/utils/formSettingsJson/informationsPage/targetManage/suggestConsultation/suggestConsultationDialogFormBtns.json";
import formGroup from "@/components/formGroup";
import dialogForm from "@/components/dialog";

export default {
  name: "index",
  components: {
    formGroup,
    dialogForm
  },
  data() {
    return {
      // 搜索栏
      searchFormItems: {
        fullScreen: false,
        formGroupList: suggestConsultationSearchFormItems,
        formGroupValues: {},
        formButtonList: suggestConsultationSearchFormBtns
      },
      showSearchForm: true,
      //意见询证弹窗
      dialogFormSettings: {
        fullScreen: false,
        dialogFormVisible: false,
        dialogFormTitle: "查看建言献策",
        dialogFormItems: {
          formGroupValues: {},
          formGroupList: suggestSuggestionDialogFormItems,
          formButtonList: [
            {
              flag: "cancle",
              label: "退出",
              styleType: "primary"
            }
          ]
        }
      },
      //表格
      tableSettings: {
        tableDatas: suggestSuggestionTableData,
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "targetId",
          border: true,
          headerOptions: suggestSuggestionTableHeader,
          isShowIndex: false,
          showIndexHeader: "序号"
        }
      },
      dialogFormSettingsAnalysis: {
        dialogFormTitle: "意见分析", //弹窗标题
        dialogType: "image", //弹窗类型
        dialogFormVisible: false
      }
    };
  },
  methods: {
    handleSearchFormBtn(btns, formData) {
      console.log(btns, formData);
    },
    handleTableRowButton(row, btns) {
      if (btns.type === "look") {
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormItems.formGroupValues = JSON.parse(
          JSON.stringify(row)
        );
      }
    },
    //意见填写弹窗
    handleDialogForm(btns, formData) {
      this.dialogFormSettings.dialogFormVisible = false;
      if (btns.flag === "save" && formData.cityOpinion) {
        this.$store.getters["assessment/getTargetList"].forEach(item => {
          if (item.targetId === formData.targetId) {
            item.cityOpinion = formData.cityOpinion;
            this.$store
              .dispatch("assessment/commitTargetInfo", item)
              .then(() => this.setTableList());
          }
        });
      }
    },
    setTableList() {},
    closeSearch() {
      this.showSearchForm = !this.showSearchForm;
    }
  },
  mounted() {
    this.setTableList();
  }
};
</script>
