<template>
  <div class="dialog_root">
    <formGroup
      :formGroupSettings="formGroupSettings"
      @formGroupSubmit="handleFormButtons"
      @linkSelect="handleChangeSelect"
      @inlineFncs="handleInlineFunction"
    />
    <tableList
      v-if="defaultData.readonly == 'true'"
      :tablelistSettings="demoTableSettings"
    />
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// 配置数据引入
import dialogSetConditionFormBtns from "@/utils/formSettingsJson/conditionManager/dialogSetTargetFormBtns.json";
import dialogSetConditionFormItems from "@/utils/formSettingsJson/conditionManager/dialogSetTargetFormItems.json";

import dialogSetStdMethodFormBtns from "@/utils/formSettingsJson/standardManager/dialogSetStdMethodFormBtns.json";
import dialogSetStdMethodFormItems from "@/utils/formSettingsJson/standardManager/dialogSetStdMethodFormItems.json";
import dialogUpdateStdMethodFormBtns from "@/utils/formSettingsJson/standardManager/dialogUpdateStdMethodFormBtns.json";

// 校验规则
import setStdMethodRule from "@/utils/formRulesJson/standardManager/setStdMethodRule";
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
  data() {
    return {
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
          headerOptions: [
            {
              prop: "text",
              lable: "检测指标"
            }
          ],
          isMultipleTable: false,
          treeProps: {
            children: "children",
            hasChildren: "hasChildren"
          }
        }
      }, // 主键id,qasStdId
      qasStdId: "",
      /**
       * formGroup 表单组配置
       */
      formGroupSettings: {
        fullScreen: true,
        formGroupList: dialogSetStdMethodFormItems,
        formGroupValues: this.defaultData,
        formButtonList: dialogSetStdMethodFormBtns,
        rules: setStdMethodRule.rule
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
    /* 点击对话框更改数据联动操作，添加分类级联操作 */
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
    /* 表单行间按钮触发方法，添加分类按钮点击事件 */
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
    /* 表单按钮点击事件 */
    handleFormButtons(button, data) {
      data.stdSuit = "1";
      data.orgid =
        data.stdSuit == "0" ? this.$store.getters.userInfo.orgId : "";
      let postdata = {};
      postdata.qasStd = data;
      if (data.basItems && data.basItems.length > 0) {
        postdata.basItems = [];
        data.basItems.map(item => {
          let basItem = {};
          basItem.qasBasItemId = item;
          postdata.basItems.push(basItem);
        });
        delete postdata.qasStd.basItems;
      }
      this.$Api[button.postUrl](postdata).then(data => {
        let msg = "方法新建成功";
        if (this.defaultData.qasStdId) {
          msg = "方法修改成功";
        }
        this.$message.success(msg);
        if (data.data.qasStdId) {
          this.qasStdId = data.data.qasStdId;
        }
        this.$emit("refreshlist", "addMethods");
      });
    },
    /**
     * 产品类别:1-油脂、油料;2-粮食;3-食品;99-其他 字典qas_std_productType
     */
    getProductType() {
      this.$Api.getDic("qas_std_productType").then(xhr => {
        dialogSetStdMethodFormItems.map(item => {
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
        dialogSetStdMethodFormItems.map(item => {
          if (item.name == "issuedBy") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
    },
    /* 获取所有分类条件 */
    getStdConditions() {
      this.$Api.getStdConditions().then(xhr => {
        dialogSetStdMethodFormItems.map(item => {
          if (item.name == "criteriaTags") {
            item.data = this.$dateUtl.dealDicData(
              xhr,
              "name",
              "qasBasCriteriaTagId"
            );
          }
        });
      });
    },
    /* 获取所有分类条件 */
    getStdSuit() {
      this.$Api
        .getDicData({ _refKey: "dict", busintypeid: "qas_bas_std_type" })
        .then(xhr => {
          dialogSetStdMethodFormItems.map(item => {
            if (item.name == "stdSuit") {
              item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
            }
          });
        });
    },
    /* 获取指标项树列表 */
    getTestTargetlist() {
      this.$Api.getTestTargetlist({}).then(data => {
        dialogSetStdMethodFormItems.map(item => {
          if (item.name == "basItems") {
            item.data = data[0].children;
          }
        });
        // this.demoTableSettings.tableDatas = data[0].children;
      });
    },
    /* 获取已勾选的指标项树列表 */
    testMethodtree() {
      this.$Api
        .testMethodtree({ qasStdId: this.defaultData.qasStdId })
        .then(data => {
          this.demoTableSettings.tableDatas = data[0].children;
        });
    }
  },
  mounted() {
    dialogSetStdMethodFormItems.map(item => {
      item.disabled = this.defaultData.readonly == "true" ? true : false;
      if (item.name == "basItems") {
        item.hideItem = this.defaultData.readonly == "true" ? true : false;
      }
    });
    if (this.defaultData.qasStdId) {
      this.formGroupSettings.formButtonList =
        this.defaultData.readonly == "true"
          ? []
          : dialogUpdateStdMethodFormBtns;
      this.qasStdId = this.defaultData.qasStdId;
    }
    if (this.defaultData.readonly == "true") {
      this.testMethodtree();
    }
    this.getStdConditions();
    this.getProductType();
    this.getOrg();
    this.getStdSuit();
    this.getTestTargetlist();
  }
};
</script>
