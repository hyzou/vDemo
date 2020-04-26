<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.tableTitle" />
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
          />
          <pagination
            :paginationSettings="paginationSettings"
            @handlePaginationPagenumber="handlePaginationPagenumber"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/sysParamSetting/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/sysParamSetting/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/sysParamSetting/dialogEditFormBtns.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/sysParamSetting/dialogRule";

export default {
  name: "sysParamSetting",
  components: {
    commonTitleWithBorder,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        tableTitle: "系统参数列表"
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "sysId",
          border: true,
          headerOptions: tableHeaderOpts
        }
      },
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      },
      page: 1
    };
  },
  methods: {
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "edit") {
        if (id instanceof Object) {
          postdata = {
            code: id.code
          };
        } else {
          postdata = {
            code: id
          };
        }
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.code == postdata.code) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "code") {
            item.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑系统参数";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.tradeInformationList();
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "tradeInformationList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取列表数据信息 */
    tradeInformationList() {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage,
          filterRules: JSON.stringify([
            { field: "type", value: "0", op: "equal" }
          ])
        };
      that.$getData("systemParamsList", postdata).then(data => {
        let operateBtns = [
          {
            text: "编辑",
            type: "edit"
          }
        ];
        that.$dealData(that, data, "code", operateBtns, []);
      });
    }
  },
  mounted() {
    this.tradeInformationList();
  }
};
</script>
