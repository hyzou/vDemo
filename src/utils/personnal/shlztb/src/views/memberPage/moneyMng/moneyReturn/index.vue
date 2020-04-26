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
import { getToken } from "@/utils/auth";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/moneyReturn/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/moneyReturn/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/moneyReturn/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/moneyReturn/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/moneyReturn/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/moneyReturn/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/moneyReturn/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/moneyReturn/dialogViewFormItems.json";

export default {
  name: "moneyReturn",
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
        tableTitle: "可用金退回列表"
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
          rowKey: "id",
          border: true,
          defaultExpandAll: true,
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
        dialogFormTitle: "添加账户信息",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: dialogEditFormItemslist,
          formGroupValues: {},
          formButtonList: []
        }
      },
      /**
       * table 角色列表已勾选的数据
       */
      checkedRoleList: [],
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
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["title"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
      this.dialogFormSettings.dialogFormTitle = "可用金退回申请";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "可用押金退回详情";
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
      if (type == "checkflow") {
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogFormTitle = "流程图查看";
        that.dialogFormSettings.dialogType = "image";
        that.dialogFormSettings.imgSrc =
          that.$global.flowPicUrl +
          "?processInstanceId=" +
          id +
          "&_jwt=" +
          getToken() +
          "&t=" +
          new Date().getTime();
      } else if (type == "edit" || type == "adjustWithdraw") {
        if (id instanceof Object) {
          postdata = {
            sysId: id.sysId
          };
        } else {
          postdata = {
            sysId: id
          };
        }
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == postdata.sysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        that.dialogFormSettings.dialogFormTitle = "查看可用金退回信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        if (
          type == "adjustWithdraw" &&
          dialogData.userActiveTasks &&
          dialogData.userActiveTasks.length > 0
        ) {
          dialogData.userActiveTasks.map(task => {
            that.dialogFormSettings.dialogFormTitle = task.name;
            dialogData.taskId = task.id;
            if (task.userTaskActions && task.userTaskActions.length > 0) {
              task.userTaskActions.map(taskAction => {
                taskAction.flag = taskAction.value;
                taskAction.label = taskAction.text;
                taskAction.needAction = true;
                taskAction.styleType = "primary";
                taskAction.postUrl = "flowMemberMoneyBack";
              });
              that.dialogFormSettings.dialogFormItems.formButtonList =
                task.userTaskActions;
            }
          });
          delete dialogData.userActiveTasks;
          delete dialogData.processStatus;
          delete dialogData.member;
          delete dialogData.operateBtns;
        }
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
            sysId: id
          };
          that.$http(that.$api.removeTradeInformation(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.handleSearchSubmit();
            }
          });
        });
      } else if (type == "approve") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id.sysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        if (
          dialogData.userActiveTasks &&
          dialogData.userActiveTasks.length > 0
        ) {
          dialogData.userActiveTasks.map(task => {
            that.dialogFormSettings.dialogFormTitle = task.name;
            dialogData.taskId = task.id;
            if (task.formKey == "approve") {
              if (task.userTaskActions && task.userTaskActions.length > 0) {
                task.userTaskActions.map(taskAction => {
                  taskAction.flag = taskAction.value;
                  taskAction.label = taskAction.text;
                  taskAction.needAction = true;
                  taskAction.styleType = "primary";
                  taskAction.postUrl = "flowTradeInformation";
                });
                that.dialogFormSettings.dialogFormItems.formButtonList =
                  task.userTaskActions;
              }
              // that.dialogFormSettings.dialogFormItems.formGroupList = dialogCheckFormItemslist;
            }
          });
          delete dialogData.userActiveTasks;
          if (dialogData.processStatus) {
            delete dialogData.processStatus;
          }
        }
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
      } else {
        that
          .$http(that.$api.flowBidConsoleItem(that.pageType), id)
          .then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.tradeInformationList(that.searchInfo);
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
      data.flowComments ? delete data.flowComments : null;
      data.userActiveTasks ? delete data.userActiveTasks : null;
      data.processStatus ? delete data.processStatus : null;
      data.member ? delete data.member : null;
      data.operateBtns ? delete data.operateBtns : null;
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 分页获取列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("getMemberMoneyBackList", postdata).then(data => {
        let formatdata = [
          {
            formated: "sysAddtime",
            formatFnc: "dateStampFormat",
            needformat: "sysAddtime"
          }
        ];
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberMoneyBackList", postdata).then(xhr => {
            if (xhr.rows && xhr.rows.length > 0) {
              xhr.rows.map(row => {
                row.memberName = row.member.companyName;
              });
            }
            that.$dealData(that, xhr, null, null, formatdata);
          });
        } else {
          if (data.rows && data.rows.length > 0) {
            data.rows.map(row => {
              row.memberName = row.member.companyName;
            });
          }
          that.$dealData(that, data, null, null, formatdata);
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.getDataList();
    // 获取会员列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        memType: 3,
        _noCache: "true"
      })
      .then(data => {
        let memberlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
      });
    // 出入类型
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_vouchertype",
        _noCache: "true"
      })
      .then(data => {
        let memberlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "type") {
            item.data = memberlist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "type") {
            item.data = memberlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "type") {
            item.data = memberlist;
          }
        });
      });
    // 状态
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_voucherstatus",
        _noCache: "true"
      })
      .then(data => {
        let statuslist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "status") {
            item.data = statuslist;
          }
        });
      });
    // 获取交易类型列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_biztype",
        _noCache: "true"
      })
      .then(data => {
        let bidtypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
      });
    // 获取添加类型列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "fb_common_addtype",
        _noCache: "true"
      })
      .then(data => {
        let addtypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "sysAddtype") {
            item.data = addtypelist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "sysAddtype") {
            item.data = addtypelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "sysAddtype") {
            item.data = addtypelist;
          }
        });
      });
  }
};
</script>
