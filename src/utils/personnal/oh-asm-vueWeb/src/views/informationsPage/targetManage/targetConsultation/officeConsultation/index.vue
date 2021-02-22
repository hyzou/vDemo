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
    <pagination :paginationSettings="paginationSettings" />
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
import suggestConsultationTableHeader from "@/utils/formSettingsJson/informationsPage/targetManage/suggestConsultation/suggestConsultationTableHeader.json";

import suggestConsultationDialogFormItems from "@/utils/formSettingsJson/informationsPage/targetManage/suggestConsultation/suggestConsultationDialogFormItems.json";
import suggestConsultationDialogFormBtns from "@/utils/formSettingsJson/informationsPage/targetManage/suggestConsultation/suggestConsultationDialogFormBtns.json";
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
      // 分页
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
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
        dialogFormTitle: "意见征询",
        dialogFormItems: {
          formGroupValues: {},
          formGroupList: suggestConsultationDialogFormItems,
          formButtonList: suggestConsultationDialogFormBtns
        }
      },
      //表格
      tableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "targetId",
          border: true,
          headerOptions: [],
          isShowIndex: false,
          showIndexHeader: "序号"
        }
      }
    };
  },
  created() {
    this.tableSettings.tableSettingOptions.headerOptions = suggestConsultationTableHeader.map(
      item => {
        if (item.prop === "cityOpinion") {
          item.prop = "officeOpinion";
        }
        return item;
      }
    );
  },
  methods: {
    handleSearchFormBtn(btns, formData) {
      console.log(btns, formData);
    },
    handleTableRowButton(row, btns) {
      suggestConsultationDialogFormItems.map(item => {
        if (item.name == "cityName") {
          item.hideItem = true;
        }
      });
      if (btns.type === "opinion") {
        let formGroupList = JSON.parse(
          JSON.stringify(suggestConsultationDialogFormItems)
        );
        formGroupList.forEach(item => {
          if (item.name === "coordinationList") {
            item.hideItem = true;
          }
          if (item.name === "cityOpinion") {
            item.label = "征询意见";
            item.name = "officeOpinion";
          }
        });
        this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormItems.formGroupValues = JSON.parse(
          JSON.stringify(row)
        );
      }
    },
    //意见填写弹窗
    handleDialogForm(btns, formData) {
      this.dialogFormSettings.dialogFormVisible = false;
      if (btns.flag === "save" && formData.officeOpinion) {
        this.$store.getters["assessment/getTargetList"].forEach(item => {
          if (item.targetId === formData.targetId) {
            item.officeOpinion = formData.officeOpinion;
            this.$store
              .dispatch("assessment/commitTargetInfo", item)
              .then(() => this.setTableList());
          }
        });
      } else if (btns.flag === "post" && formData.officeOpinion) {
        this.$store.getters["assessment/getTargetList"].forEach(item => {
          if (item.targetId === formData.targetId) {
            item.officeOpinion = formData.officeOpinion;
            item.postFlag = "true";
            this.$store
              .dispatch("assessment/commitTargetInfo", item)
              .then(() => this.setTableList());
          }
        });
      }
    },
    setTableList() {
      let targetList = this.$store.getters["assessment/getTargetList"];
      let targetItem = [];
      this.tableSettings.tableDatas = targetList.map((item, index) => {
        item.operateBtns = [];
        if (!item.postFlag) {
          //未填写过意见可填写
          item.operateBtns.push({
            text: "意见",
            type: "opinion",
            styleType: "primary",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-s-comment",
            isIcon: true
          });
        }
        targetItem.push({
          value: index + 1,
          label: item.assessmentTarget
        });
        return item;
      });
      this.paginationSettings.totalNumbers = this.tableSettings.tableDatas.length;

      this.searchFormItems.formGroupList.map(item => {
        if (item.name === "assessmentTarget") {
          item.data = targetItem;
        }
        return item;
      });
    },
    closeSearch() {
      this.showSearchForm = !this.showSearchForm;
    }
  },
  mounted() {
    this.setTableList();
  }
};
</script>
