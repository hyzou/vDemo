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
            <commonTitleWithBorder :title="titles.tableTitle" />
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
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
import { getToken } from "@/utils/auth";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/moneyBack/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/moneyBack/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/moneyBack/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/moneyBack/dialogFormItems.json";
import dialogCheckFormItemslist from "@/utils/formSettingsJson/moneyBack/dialogCheckFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/moneyBack/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/moneyBack/dialogViewFormItems.json";
export default {
  name: "moneyBack",
  components: {
    commonTitleWithBorder,
    formGroup,
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
        tableTitle: "可用金退回交易记录列表"
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
          // rules: dialogFormRules.rule
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
      filterRules: [
        {
          field: "biztype",
          value: "22",
          op: "equal"
        },
        {
          field: "member.memType",
          value: "3",
          op: "equal"
        }
      ],
      page: 1,
      numberPerpage: this.$global.numberPerpage
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
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看可用金退回信息";
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
      } else if (type == "edit" || type == "adjustNews") {
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
        that.dialogFormSettings.dialogFormTitle = "编辑交易公告";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        if (
          type == "adjustNews" &&
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
                taskAction.postUrl = "flowTradeInformation";
              });
              that.dialogFormSettings.dialogFormItems.formButtonList =
                task.userTaskActions;
            }
          });
          delete dialogData.userActiveTasks;
          delete dialogData.processStatus;
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
      } else if (type == "check") {
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
            if (task.formKey == "check") {
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
              that.dialogFormSettings.dialogFormItems.formGroupList = dialogCheckFormItemslist;
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
              that.handleSearchSubmit();
            }
          });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.searchInfo.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      data.flowComments ? delete data.flowComments : null;
      data.member ? delete data.member : null;
      data.operateBtns ? delete data.operateBtns : null;
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 分页获取列表信息 */
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
      that.$getData("getMemberMoneyBackList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberMoneyBackList", postdata).then(xhr => {
            that.dealListData(xhr);
          });
        } else {
          that.dealListData(data);
        }
      });
    },
    dealListData(xhr) {
      let that = this;
      if (!xhr.rows) {
        return false;
      }
      xhr.rows.map(item => {
        let operateBtns = [];
        if (item.processinstId) {
          let operateBtnItem = {
            id: item.processinstId,
            text: "查看流程",
            type: "checkflow"
          };
          operateBtns.push(operateBtnItem);
          if (item.userActiveTasks && item.userActiveTasks.length > 0) {
            item.userActiveTasks.map(task => {
              let taskObj = {
                id: {
                  sysId: item.sysId,
                  taskId: task.id,
                  processinstId: item.processinstId
                },
                text: task.name
              };
              let hasOtherBtns = true;
              if (task.formKey) {
                if (task.formKey.indexOf("{") != -1) {
                  let formkeyObj = JSON.parse(task.formKey);
                  taskObj.type = formkeyObj.action;
                } else {
                  taskObj.type = task.formKey;
                  hasOtherBtns = false;
                }
                operateBtns.push(taskObj);
              }
              if (
                hasOtherBtns &&
                task.userTaskActions &&
                task.userTaskActions.length > 0
              ) {
                task.userTaskActions.map(action => {
                  let actionObj = {
                    id: {
                      sysId: item.sysId,
                      taskId: task.id,
                      processinstId: item.processinstId,
                      userAction: action.value
                    },
                    text: action.text,
                    needAction: true,
                    type: "complete"
                  };
                  operateBtns.push(actionObj);
                });
              }
            });
          }
        } else {
          operateBtns = [
            {
              id: item.sysId,
              text: "编辑",
              type: "edit"
            },
            {
              id: item.sysId,
              text: "删除",
              type: "remove"
            }
          ];
        }
        item.operateBtns = operateBtns;
        item.sysAddtime = that.$globalFnc.dateStampFormat(item.sysAddtime);
        item.memberName = item.member.companyName;
      });
      that.tablelistSettings.tableDatas = xhr.rows;
      that.paginationSettings.totalNumbers = parseInt(xhr.total);
    }
  },
  mounted() {
    let that = this;
    that.handleSearchSubmit();
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
        dialogCheckFormItemslist.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
      });
  }
};
</script>
