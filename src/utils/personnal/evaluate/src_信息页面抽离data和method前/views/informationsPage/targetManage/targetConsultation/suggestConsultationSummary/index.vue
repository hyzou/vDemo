<template>
  <div class="pt10 pr10 pl10 width100">
    <el-col class="mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mb20" :span="24">
      <formGroup
        :formGroupSettings="searchFormItems"
        @formGroupSubmit="handleSearchFormBtn"
      />
    </el-col>
    <el-col :span="6">
      <commonTitleWithBorder title="列表信息" />
    </el-col>
    <el-col :span="6" :offset="12" class="mb10 textAlignRight">
      <el-button type="primary" @click="handleAddIndex">新增</el-button>
      <el-button type="primary">导出</el-button>
    </el-col>
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
    <el-dialog
      title="意见分析"
      :visible.sync="dialogFormSettingsAnalysis.dialogFormVisible"
      v-if="dialogFormSettingsAnalysis.dialogFormVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <div class="textAlignCenter">
        <img src="@/assets/target.jpg" alt="" />
      </div>
    </el-dialog>
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
          headerOptions: suggestConsultationTableHeader,
          isShowIndex: true,
          showIndexHeader: "序号"
        }
      },
      dialogFormSettingsAnalysis: {
        dialogFormTitle: "意见分析", //弹窗标题
        dialogType: "image", //弹窗类型
        dialogFormVisible: false,
        imgSrc: "../../../../assets/target.jpg"
      }
    };
  },
  methods: {
    handleSearchFormBtn(btns, formData) {
      console.log(btns, formData);
    },
    // 新增指标
    handleAddIndex() {
      this.dialogFormSettings.dialogFormVisible = true;
      // 弹框按钮
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "addSave",
          label: "保存",
          styleType: "primary"
        },
        {
          flag: "cancle",
          label: "退出",
          styleType: ""
        }
      ];
      // 显示的表单
      let formGroupList = JSON.parse(
        JSON.stringify(suggestConsultationDialogFormItems)
      );
      formGroupList.forEach((item, index) => {
        if (item.disabled) {
          item.disabled = false;
        }
        if (item.name === "cityOpinion") {
          item.hideItem = true;
          // formGroupList.splice(index, 1);
        }
        if (item.name === "coordinationList") {
          item.hideItem = true;
          // formGroupList.splice(index, 1);
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        hotTip:
          "您可针对本年度考核目标任务及评分标准提出修改意见,为方便牵头部门汇总和修改,如无意见请不要填写。如您填写“无意见、没有意" +
          "见、暂无意见之类的内容,系统会判断您已提出了意见,井会将您的意见提交给牵头部门,从而增加牵头部门的审核工作量。"
      };
    },
    handleTableRowButton(row, btns) {
      let formGroupList;
      switch (btns.type) {
        case "opinion":
          this.dialogFormSettings.dialogFormVisible = true;
          this.dialogFormSettings.dialogFormItems.formGroupValues = JSON.parse(
            JSON.stringify(row)
          );
          break;
        case "analysis":
          this.dialogFormSettings.dialogFormVisible = true;
          this.dialogFormSettings.dialogFormItems.formButtonList = [
            {
              flag: "publishTask",
              label: "发布为年度考核任务",
              styleType: "primary"
            },
            {
              flag: "editSave",
              label: "保存",
              styleType: "primary"
            },
            {
              flag: "cancle",
              label: "退出",
              styleType: ""
            }
          ];
          formGroupList = JSON.parse(
            JSON.stringify(suggestConsultationDialogFormItems)
          );
          formGroupList.forEach((item, index) => {
            if (item.disabled) {
              item.disabled = false;
            }
            if (item.name === "cityOpinion") {
              formGroupList.splice(index, 1);
            }
          });
          this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
          this.dialogFormSettings.dialogFormItems.formGroupValues = JSON.parse(
            JSON.stringify(row)
          );
          break;
        case "edit":
          this.dialogFormSettings.dialogFormVisible = true;
          this.dialogFormSettings.dialogFormItems.formButtonList = [
            {
              flag: "editSave",
              label: "保存",
              styleType: "primary"
            },
            {
              flag: "cancle",
              label: "退出",
              styleType: ""
            }
          ];
          formGroupList = JSON.parse(
            JSON.stringify(suggestConsultationDialogFormItems)
          );
          formGroupList.forEach(item => {
            if (item.disabled) {
              item.disabled = false;
            }
            if (item.name === "cityOpinion") {
              item.hideItem = true;
            }
            if (item.name === "coordinationList") {
              item.hideItem = true;
            }
          });
          this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
          this.dialogFormSettings.dialogFormItems.formGroupValues = JSON.parse(
            JSON.stringify(row)
          );
          break;
        case "delete":
          this.$store
            .dispatch(
              "assessment/commitDeleteIndexList",
              row.targetId ? row.targetId : ""
            )
            .then(() => {
              this.setTableList();
            });
          break;
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
      if (btns.flag === "addSave") {
        formData.targetId = this.$globalFnc.uuid();
        this.$store
          .dispatch("assessment/commitIndexList", formData)
          .then(() => {
            this.setTableList();
          });
      }
      if (btns.flag === "editSave") {
        this.$store
          .dispatch("assessment/commitIndexList", formData)
          .then(() => {
            this.setTableList();
          });
      }
    },
    setTableList() {
      suggestConsultationTableHeader.map(item => {
        if (item.prop == "cityOpinion") {
          item.isHide = true;
        }
      });
      let targetList = this.$store.getters["assessment/getIndexList"].concat();
      let targetItem = [];
      this.tableSettings.tableDatas = targetList.map((item, index) => {
        item.chageYear = this.$globalFnc.changeDateFormat(item.year, "y");
        item.operateBtns = [];
        item.operateBtns.push(
          {
            text: "编辑",
            type: "edit",
            styleType: "primary"
          },
          {
            text: "删除",
            type: "delete",
            styleType: "danger"
          },
          {
            text: "意见分析",
            type: "analysis",
            styleType: "primary"
          }
        );
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
    }
  },
  mounted() {
    this.setTableList();
  }
};
</script>

<style scoped></style>
