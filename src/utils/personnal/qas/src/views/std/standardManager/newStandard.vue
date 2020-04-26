<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标准信息" name="first" :disabled="clickTab">
        <formGroup
          :formGroupSettings="formGroupSettings"
          @formGroupSubmit="handleFormButtons"
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
      title="设定指标"
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
  </div>
</template>

<script>
// 页面组件引入
import selectTarget from "./selectTarget";

// 配置数据引入
import operateButtonSelectTarget from "@/utils/formSettingsJson/standardManager/operateButtonSelectTarget.json";
import tableHeader from "@/utils/formSettingsJson/standardManager/tableTargetHeader.json";
import dialogSetTargetFormBtns from "@/utils/formSettingsJson/standardManager/dialogSetTargetFormBtns.json";
import dialogSetTargetFormItems from "@/utils/formSettingsJson/standardManager/dialogSetTargetFormItems.json";
import dialogUpdateTargetFormBtns from "@/utils/formSettingsJson/standardManager/dialogUpdateTargetFormBtns.json";
import dialogUpdateTargetFormItems from "@/utils/formSettingsJson/standardManager/dialogUpdateTargetFormItems.json";

// 校验规则
import setStdRule from "@/utils/formRulesJson/standardManager/setStdRule";

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
    selectTarget
  },
  data() {
    return {
      // tab是否可点击
      clickTab: true,
      // 当前激活的tab标签页
      activeName: "first",
      // 是否显示添加指标对话框
      dialogSelectTargetVisible: false,
      // 主键id,qasStdId
      qasStdId: "",
      // 添加指标对话框默认数据，否则子组件没办法渲染
      dialogDefaultdatas: {
        type: {},
        stdItem: {
          testMethodStdId: "",
          qasStdId: ""
        },
        criteriaTags: [],
        priority: 1,
        qasStdItemCriteriaId: "",
        qasBasItemId: "",
        displayRefValue: "",
        judgeValueIfTrue: "",
        expr: ""
      },
      /**
       * formGroup 表单组配置
       */
      formGroupSettings: {
        fullScreen: true,
        formGroupList: dialogSetTargetFormItems,
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
      }
    };
  },
  methods: {
    /* 选择指标添加,添加完成回调 */
    handleSelectComplete(data) {
      this.dialogSelectTargetVisible = false;
      // this.getStdBindTargetlist(data.stdItem.qasStdId);
      this.getTestTargetlist(data.stdItem.qasStdId);
    },
    /* 表单按钮点击事件 */
    handleFormButtons(button, data) {
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
          this.dialogDefaultdatas.stdItem.qasStdId = data.data.qasStdId;
        }
        // this.getStdBindTargetlist(this.qasStdId);
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
      this.dialogDefaultdatas = {
        type: {},
        stdItem: {
          qasStdId: this.qasStdId
        },
        priority: 1
      };
      this.dialogSelectTargetVisible = true;
    },
    /* 点击table操作栏按钮操作 */
    handleTableRowButton(rowData, button) {
      if (button.type == "edit") {
        this.$Api
          .getStdBindSingleTargetInfo({
            qasStdItemCriteriaId: rowData.qasStdItemCriteriaId
          })
          .then(xhr => {
            this.dialogDefaultdatas = Object.assign(
              this.dialogDefaultdatas,
              xhr.data
            );
            if (
              this.dialogDefaultdatas.stdItemCriteriaTags &&
              this.dialogDefaultdatas.stdItemCriteriaTags.length > 0
            ) {
              this.dialogDefaultdatas.type = {};
              this.dialogDefaultdatas.stdItemCriteriaTags.map(tag => {
                this.dialogDefaultdatas.type[
                  tag.qasBasCriteriaTagId
                ] = tag.tagValus.split(",");
              });
            }
            this.dialogSelectTargetVisible = true;
          });
      } else {
        let params = { qasStdItemCriteriaId: rowData.qasStdItemCriteriaId };
        this.$confirm("此操作将删除本条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$Api[button.postUrl](params).then(() => {
              // this.getStdBindTargetlist(this.defaultData.qasStdId);
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
        dialogSetTargetFormItems.map(item => {
          if (item.name == "productType") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
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
        dialogSetTargetFormItems.map(item => {
          if (item.name == "issuedBy") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
        dialogUpdateTargetFormItems.map(item => {
          if (item.name == "issuedBy") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
    },
    /**
     * 获取当前标准下指标信息列表
     */
    // getStdBindTargetlist(id) {
    //   this.$Api.getStdBindTargetlist({ qasStdId: id }).then(xhr => {
    //     xhr.map(item => {
    //       item.operateBtns = [
    //         {
    //           type: "edit",
    //           styleType: "text",
    //           text: "编辑",
    //           postUrl: "updateSingleStdSet"
    //         },
    //         {
    //           type: "remove",
    //           styleType: "text",
    //           text: "删除",
    //           postUrl: "deleteStdSet"
    //         }
    //       ];
    //     });
    //     // this.demoTableSettings.tableDatas = xhr;
    //   });
    // },
    /* 获取指标项树列表table合并同类项 */
    getTestTargetlist(id) {
      this.demoTableSettings.tableDatas = [];
      this.$Api.getStdToBindTargetlist({ qasStdId: id }).then(data => {
        if (data.code) {
          return false;
        }
        this.dealtreedata(data);
        this.demoTableSettings.tableDatas = data[0].children;
      });
    },
    /* 处理table-tree 数据，添加子项操作项，改变text值供显示 */
    dealtreedata(data) {
      // console.log(data);
      data.map(item => {
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
        dialogSetTargetFormItems.map(item => {
          if (item.name == "criteriaTags") {
            item.data = this.$dateUtl.dealDicData(
              xhr,
              "name",
              "qasBasCriteriaTagId"
            );
          }
        });
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
      // this.getStdBindTargetlist(this.defaultData.qasStdId);
      this.getTestTargetlist(this.defaultData.qasStdId);
      this.formGroupSettings.formGroupList = dialogUpdateTargetFormItems;
      this.formGroupSettings.formButtonList = dialogUpdateTargetFormBtns;
      this.qasStdId = this.defaultData.qasStdId;
      this.dialogDefaultdatas.stdItem.qasStdId = this.defaultData.qasStdId;
    }
    this.getStdConditions();
    this.getProductType();
    this.getOrg();
  }
};
</script>
