<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标准信息" name="first" :disabled="clickTab">
        <formGroup
          :formGroupSettings="formGroupSettings"
          @formGroupSubmit="handleFormButtons"
          @linkSelect="handleChangeSelect"
          @inlineFncs="handleInlineFunction"
        />
      </el-tab-pane>
      <el-tab-pane label="指标管理" name="second" :disabled="clickTab">
        <el-row>
          <el-col class="textAlignRight mb10">
            <operateButtonsGroup
              :operateButtonsSettings="operateButtonsSettings"
              @handleOperateButton="handleOperateButton"
            />
          </el-col>
        </el-row>
        <tableList
          :tablelistSettings="demoTableSettings"
          @handleTableRowButton="handleTableRowButton"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-if="dialogSelectTargetVisible"
      title="设定标准值"
      :visible.sync="dialogSelectTargetVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      append-to-body
    >
      <selectTarget
        :defaultdatas="dialogDefaultdatas"
        @selectComplete="handleSelectComplete"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogSelectTargetMultiVisible"
      title="批量设定标准值"
      :visible.sync="dialogSelectTargetMultiVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      append-to-body
    >
      <selectMultiTarget
        :defaultdatas="dialogDefaultdatas"
        @selectComplete="handleSelectComplete"
      />
    </el-dialog>
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// 页面组件引入
import selectTarget from "./selectTarget";
import selectMultiTarget from "./selectMultiTarget";

// 配置数据引入

import dialogSetConditionFormBtns from "@/utils/formSettingsJson/conditionManager/dialogSetTargetFormBtns.json";
import dialogSetConditionFormItems from "@/utils/formSettingsJson/conditionManager/dialogSetTargetFormItems.json";

import operateButtonSelectTarget from "@/utils/formSettingsJson/standardManager/operateButtonSelectTarget.json";
import tableHeader from "@/utils/formSettingsJson/standardManager/tableTargetHeader.json";
import dialogSetTargetFormBtns from "@/utils/formSettingsJson/standardManager/dialogSetTargetFormBtns.json";
import dialogUpdateTargetFormBtns from "@/utils/formSettingsJson/standardManager/dialogUpdateTargetFormBtns.json";
import dialogUpdateTargetFormItems from "@/utils/formSettingsJson/standardManager/dialogUpdateTargetFormItems.json";

// 校验规则
import setStdRule from "@/utils/formRulesJson/standardManager/setStdRule";
import setConditionRule from "@/utils/formRulesJson/conditionManager/setConditionRule";

export default {
  name: "newStandard",
  props: {
    defaultData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    selectTarget,
    selectMultiTarget
  },
  data() {
    return {
      // tab是否可点击
      clickTab: true,
      // 当前激活的tab标签页
      activeName: "first",
      // 是否显示批量添加指标对话框
      dialogSelectTargetMultiVisible: false,
      // 是否显示添加指标对话框
      dialogSelectTargetVisible: false,
      // 主键id,qasStdId
      qasStdId: "",
      // 添加指标对话框默认数据，否则子组件没办法渲染
      dialogDefaultdatas: {
        qasStdId: "",
        qasStdItemCriteriaId: "",
        flag: ""
      },
      /**
       * formGroup 表单组配置
       */
      formGroupSettings: {
        fullScreen: true,
        formGroupList: dialogUpdateTargetFormItems,
        formGroupValues: this.defaultData,
        formButtonList: dialogSetTargetFormBtns,
        rules: setStdRule.rule
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "part2",
        buttonListData: operateButtonSelectTarget
      },
      /**
       * table 表格配置
       */
      demoTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "demo",
          // headerRowClassName: "text-danger",
          // rowClassName: "text-warning",
          rowKey: "id",
          tooltipEffect: "dark",
          border: true,
          height: "400",
          defaultExpandAll: true,
          headerOptions: tableHeader,
          isMultipleTable: false,
          treeProps: {
            children: "children",
            hasChildren: "hasChildren"
          }
        }
      },
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogType: "form",
        dialogFormVisible: false,
        dialogFormItems: {
          formGroupList: [],
          formGroupValues: {},
          formButtonList: [],
          rules: setConditionRule.rule
        }
      }
    };
  },
  methods: {
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      this.$Api[btn.postUrl](data).then(() => {
        this.getStdConditions();
        this.dialogFormSettings.dialogFormVisible = false;
      });
    },
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, data) {
      let cflag = true,
        bflag = true,
        gflag = true;
      if (link == "graded") {
        this.dialogFormSettings.dialogFormItems.formGroupValues.condictType =
          "";
        if (data == "Y") {
          cflag = true;
          bflag = false;
          gflag = true;
        } else {
          cflag = false;
          bflag = true;
          gflag = true;
        }
      } else {
        if (data == "dicType") {
          cflag = false;
          bflag = false;
          gflag = true;
        } else {
          cflag = false;
          bflag = true;
          gflag = false;
        }
      }
      dialogSetConditionFormItems.map(item => {
        if (item.name == "condictType") {
          item.hideItem = cflag;
        }
        if (item.name == "busintypeid") {
          item.hideItem = bflag;
        }
        if (item.name == "grainbreedId") {
          item.hideItem = gflag;
        }
      });
    },
    /* 表单行间按钮触发方法 */
    handleInlineFunction(flag) {
      if (flag == "addCriteriaTags") {
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogSetConditionFormItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogSetConditionFormBtns;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          name: "",
          graded: "",
          busintypeid: "",
          grainbreedId: ""
        };
        this.dialogFormSettings.dialogFormTitle = "新增分类条件";
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      }
    },
    /* 表单下拉框回调 */
    handleChangeSelect(link, data) {
      if (link == "stdSuit") {
        if (data == "1") {
          this.defaultData.orgid = "";
        }
        if (data == "0") {
          this.defaultData.orgid = this.$store.getters.userInfo.orgId;
        }
      }
    },
    /* 选择指标添加,添加完成回调 */
    handleSelectComplete() {
      this.dialogSelectTargetVisible = false;
      this.dialogSelectTargetMultiVisible = false;
      this.getTestTargetlist(this.defaultData.qasStdId);
    },
    /* 表单按钮点击事件 */
    handleFormButtons(button, data) {
      data.orgid =
        data.stdSuit == "0" ? this.$store.getters.userInfo.orgId : "";
      this.$Api[button.postUrl](data).then(data => {
        let msg = "标准新建成功";
        if (this.defaultData.qasStdId) {
          msg = "标准修改成功";
        }
        this.$message.success(msg);
        this.activeName = "second";
        this.clickTab = false;
        if (data.data.qasStdId) {
          this.qasStdId = data.data.qasStdId;
          this.dialogDefaultdatas.qasStdId = data.data.qasStdId;
        }
        this.getTestTargetlist(this.qasStdId);
        this.$emit("refreshlist");
      });
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      if (!this.qasStdId) {
        this.$alert("请先设置标准信息", "提示");
        return false;
      }
      this.dialogDefaultdatas.qasStdItemCriteriaId = "";
      // this.dialogSelectTargetVisible = true;
      this.dialogSelectTargetMultiVisible = true;
    },
    /* 点击table操作栏按钮操作 */
    handleTableRowButton(rowData, button) {
      if (button.type == "edit") {
        if (button.flag == "editTargetInfo") {
          this.dialogDefaultdatas.flag = "multiple";
          this.dialogDefaultdatas.qasStdItemCriteriaId = rowData.id;
          this.dialogSelectTargetMultiVisible = true;
        } else {
          this.dialogDefaultdatas.flag = "single";
          this.dialogDefaultdatas.qasStdItemCriteriaId =
            rowData.qasStdItemCriteriaId;
          this.dialogSelectTargetVisible = true;
        }
      } else {
        let params = { qasStdItemCriteriaId: rowData.qasStdItemCriteriaId };
        this.$confirm("此操作将删除本条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$Api[button.postUrl](params).then(() => {
              this.getTestTargetlist(this.defaultData.qasStdId);
              this.$message.success("删除成功!");
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },
    /**
     * 产品类别:1-油脂、油料;2-粮食;3-食品;99-其他 字典qas_std_productType
     */
    getProductType() {
      this.$Api.getDic("qas_std_productType").then(xhr => {
        dialogUpdateTargetFormItems.map(item => {
          if (item.name == "productType") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
    },
    /**
     * 颁布组织：1-国家标准;2-行业标准;3-企业标准;4-临时标准;5-专业标准;6-其他 qas_std_issuedBy
     */
    getOrg() {
      this.$Api.getDic("qas_std_issuedBy").then(xhr => {
        dialogUpdateTargetFormItems.map(item => {
          if (item.name == "issuedBy") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
    },
    /* 获取指标项树列表table合并同类项 */
    getTestTargetlist(id) {
      this.demoTableSettings.tableDatas = [];
      this.$Api
        .getStdToBindTargetlist({ qasStdId: this.qasStdId })
        .then(data => {
          if (data.code) {
            return false;
          }
          this.dealtreedata(data);
          this.demoTableSettings.tableDatas = data[0].children;
        });
    },
    /* 处理table-tree 数据，添加子项操作项，改变text值供显示 */
    dealtreedata(data) {
      data.map(item => {
        if (item.type == "stdItemCriteria") {
          item.operateBtns = [
            {
              type: "edit",
              flag: "editTargetInfo",
              styleType: "text",
              text: "编辑指标信息",
              postUrl: "updateSingleStdSet"
            }
          ];
        }
        if (item.children && item.children.length > 0) {
          this.dealtreedata(item.children);
        } else {
          // item.text += item.refValue;
          if (item.text == null || item.text == "null") {
            item.text = "";
          }
          item.refValue = item.refValue + "\xa0\xa0" + item.text;
          item.text = item.refValue;
          item.qasStdItemCriteriaId = item.id.split("-")[0];
          item.operateBtns = [
            {
              type: "edit",
              flag: "edit",
              styleType: "text",
              text: "编辑",
              postUrl: "updateSingleStdSet"
            },
            {
              type: "remove",
              styleType: "text",
              text: "删除",
              postUrl: "deleteStdSet"
            }
          ];
        }
      });
    },
    /* 获取所有分类条件 */
    getStdConditions() {
      this.$Api.getStdConditions().then(xhr => {
        dialogUpdateTargetFormItems.map(item => {
          if (item.name == "criteriaTags") {
            item.data = this.$dateUtl.dealDicData(
              xhr,
              "name",
              "qasBasCriteriaTagId"
            );
          }
        });
      });
    }
  },
  mounted() {
    if (this.defaultData.qasStdId) {
      this.clickTab = false;
      this.formGroupSettings.formButtonList = dialogUpdateTargetFormBtns;
      this.qasStdId = this.defaultData.qasStdId;
      this.dialogDefaultdatas.qasStdId = this.defaultData.qasStdId;
      this.getTestTargetlist(this.defaultData.qasStdId);
    }
    this.getStdConditions();
    this.getProductType();
    this.getOrg();
    this.$Api
      .getDicData({ _refKey: "dict", busintypeid: "qas_bas_std_type" })
      .then(xhr => {
        dialogUpdateTargetFormItems.map(item => {
          if (item.name == "stdSuit") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
  }
};
</script>
