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
import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/calcFormula/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/calcFormula/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/calcFormula/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/calcFormula/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/calcFormula/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/calcFormula/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/calcFormula/dialogEditFormBtns.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/calcFormula/dialogRule";

export default {
  name: "calcFormula",
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
        tableTitle: "价格分表达式列表"
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
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {
        filterRules: []
      },
      filterRules: [{ field: "type", value: "1", op: "equal" }],
      page: 1,
      scoreTips:
        "min(最低报价)；max(最高报价)；avg(平均报价)；my(我的报价)；score(价格分分值)"
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name", "code"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        type: "1",
        flowComments: this.scoreTips
      };
      dialogEditFormItemslist.map(item => {
        if (item.name == "code") {
          item.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "新增价格分表达式";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "edit") {
        postdata = {
          code: id
        };
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.code == postdata.code) {
            itemdata.flowComments = this.scoreTips ? this.scoreTips : [];
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "code") {
            item.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑价格分表达式";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            code: id
          };
          that.$http(that.$api.removeBusinessParams(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.handleSearchSubmit();
            }
          });
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
      if (btn.flag == "add") {
        data.type = "1";
        data.status = "1";
      }
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
      that.$getData("businessParamsList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("businessParamsList", postdata).then(xhr => {
            that.$dealData(that, xhr, "code", null, []);
          });
        } else {
          that.$dealData(that, data, "code", null, []);
        }
      });
    }
  },
  mounted() {
    this.handleSearchSubmit();
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "fb_common_status"
    }).then(data => {
      let invoicetypelist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "status") {
          item.data = invoicetypelist;
        }
      });
      dialogEditFormItemslist.map(item => {
        if (item.name == "status") {
          item.data = invoicetypelist;
        }
      });
    });
  }
};
</script>
