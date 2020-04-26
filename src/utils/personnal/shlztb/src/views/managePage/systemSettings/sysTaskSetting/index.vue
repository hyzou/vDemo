<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-col class="mb20" :span="24">
            <formGroup
              :formGroupSettings="formGroupSettings"
              @formGroupSubmit="handleSearchSubmit"
            />
          </el-col>
          <el-col class="mb20" :span="24">
            <el-col :span="6">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
            <el-col :span="18">
              <operateButtonsGroup
                class="textAlignRight"
                :operateButtonsSettings="operateButtonsSettings"
                @handleOperateButton="handleOperateButton"
              />
            </el-col>
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
            @handleTableItem="handleTableItem"
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
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/sysTaskSetting/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/sysTaskSetting/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/sysTaskSetting/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/sysTaskSetting/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/sysTaskSetting/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/sysTaskSetting/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/sysTaskSetting/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/sysTaskSetting/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/sysTaskSetting/dialogRule";

export default {
  name: "sysTaskSetting",
  components: {
    commonTitleWithBorder,
    formGroup,
    operateButtonsGroup,
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
        searchTitel: "查询条件",
        tableTitle: "系统任务列表"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: searchFormBtnList
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "scheduleTaskId",
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
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {
        filterRules: []
      },
      filterRules: [],
      page: 1
    };
  },
  methods: {
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, data) {
      if (link == "expressionType") {
        if (data == "1") {
          dialogFormRules.rule.cronExpression[0].required = false;
          dialogFormRules.rule.simpleExpressionStartdate[0].required = true;
          dialogFormRules.rule.simpleExpressionInterval[0].required = true;
        } else {
          dialogFormRules.rule.cronExpression[0].required = true;
          dialogFormRules.rule.simpleExpressionStartdate[0].required = false;
          dialogFormRules.rule.simpleExpressionInterval[0].required = false;
        }
      }
    },
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name", "group"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      dialogFormRules.rule.cronExpression[0].required = false;
      dialogFormRules.rule.simpleExpressionStartdate[0].required = false;
      dialogFormRules.rule.simpleExpressionInterval[0].required = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "新增系统任务";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.scheduleTaskId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看任务详情";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "edit") {
        postdata = {
          scheduleTaskId: id
        };
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.scheduleTaskId == postdata.scheduleTaskId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        if (dialogData.expressionType == "0") {
          dialogFormRules.rule.cronExpression[0].required = true;
          dialogFormRules.rule.simpleExpressionStartdate[0].required = false;
          dialogFormRules.rule.simpleExpressionInterval[0].required = false;
        } else {
          dialogFormRules.rule.cronExpression[0].required = false;
          dialogFormRules.rule.simpleExpressionStartdate[0].required = true;
          dialogFormRules.rule.simpleExpressionInterval[0].required = true;
        }
        that.dialogFormSettings.dialogFormTitle = "编辑系统任务";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else if (type == "remove") {
        postdata = {
          scheduleTaskId: id
        };
        let postUrl;
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postUrl = "removeSystemTask";
          that.$getData(postUrl, postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.handleSearchSubmit();
            }
          });
        });
      } else if (type == "open" || type == "stop" || type == "run") {
        postdata = {
          scheduleTaskId: id
        };
        let postUrl;
        if (type == "run") {
          postUrl = "runSystemTask";
        } else {
          postUrl = "editSystemTask";
          postdata.enabled = type == "open" ? "1" : "0";
        }
        that.$getData(postUrl, postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.handleSearchSubmit();
          }
        });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取列表数据信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        },
        searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("systemTaskList", postdata).then(data => {
        let formatdata = [
            {
              formated: "simpleExpressionStartdate",
              formatFnc: "dateStampFormat",
              needformat: "simpleExpressionStartdate"
            },
            {
              formated: "lastRunTime",
              formatFnc: "dateStampFormat",
              needformat: "lastRunTime"
            },
            {
              formated: "nextRunTime",
              formatFnc: "dateStampFormat",
              needformat: "nextRunTime"
            }
          ],
          operateBtns;
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("systemTaskList", postdata).then(xhr => {
            let dealedData;
            if (xhr.rows && xhr.rows.length > 0) {
              dealedData = that.dealdatas(xhr);
            } else {
              dealedData = xhr;
            }
            that.$dealData(
              that,
              dealedData,
              "scheduleTaskId",
              operateBtns,
              formatdata
            );
          });
        } else {
          let dealedData;
          if (data.rows && data.rows.length > 0) {
            dealedData = that.dealdatas(data);
          } else {
            dealedData = data;
          }
          that.$dealData(
            that,
            dealedData,
            "scheduleTaskId",
            operateBtns,
            formatdata
          );
        }
      });
    },
    dealdatas(data) {
      data.rows.map(row => {
        row.enabled_dsp = ["禁用", "启用"][parseInt(row.enabled)];
        row.state_dsp = (function() {
          switch (row.state) {
            case "NONE":
              return "无";
            case "NORMAL":
              return "正常";
            case "PAUSED":
              return "暂停";
            case "COMPLETE":
              return "完成";
            case "ERROR":
              return "错误";
            case "BLOCKED":
              return "堵塞";
            case "WRONG":
              return "未启用 ";
            case "END":
              return "结束";
            default:
              return row.state;
          }
        })();
        let isOpen =
            row.enabled == "0" && row.state != "END" ? "true" : "false",
          isClose = row.enabled == "1" && row.state != "END" ? "true" : "false",
          isRun =
            row.state == "NORMAL" || row.state == "PAUSED" ? "true" : "false";
        row.operateBtns = [
          {
            id: row.scheduleTaskId,
            text: "启用",
            type: "open",
            showflag: isOpen
          },
          {
            id: row.scheduleTaskId,
            text: "禁用",
            type: "stop",
            showflag: isClose
          },
          {
            id: row.scheduleTaskId,
            text: "立即运行一次",
            type: "run",
            showflag: isRun
          },
          {
            id: row.scheduleTaskId,
            text: "编辑",
            type: "edit"
          },
          {
            id: row.scheduleTaskId,
            text: "删除",
            type: "remove"
          }
        ];
      });
      return data;
    }
  },
  mounted() {
    this.handleSearchSubmit();
  }
};
</script>
