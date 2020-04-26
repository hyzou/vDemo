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
import searchFormBtnList from "@/utils/formSettingsJson/memberControl/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/memberControl/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/memberControl/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/memberControl/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/memberControl/dialogFormItems.json";
import dialogCheckFormItemslist from "@/utils/formSettingsJson/memberControl/dialogCheckFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/memberControl/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/memberControl/dialogViewFormItems.json";

export default {
  name: "memberControl",
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
        tableTitle: "会员列表"
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
          formButtonList: []
        }
      },
      /**
       * searchbar 记录搜索栏搜索记录
       */
      page: 1,
      searchInfo: {},
      filterRules: [
        {
          field: "memType",
          value: "3",
          op: "equal"
        }
      ]
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["companyName", "loginName"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.basMemberId == id) {
          that.dialogFormSettings.dialogFormTitle = "会员详情";
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
      } else if (type == "edit" || type == "adjustRegisterInfo") {
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
          if (itemdata.basMemberId == postdata.sysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑会员信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        if (
          type == "adjustRegisterInfo" &&
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
                taskAction.postUrl = "flowMember";
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
            basMemberId: id
          };
          that.$http(that.$api.removeMember(), postdata).then(xhr => {
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
          if (itemdata.basMemberId == id.sysId) {
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
                  taskAction.postUrl = "flowMember";
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
        this.$confirm("您正在执行重置密码操作，是否继续?", "提示", {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            basMemberId: id.basMemberId
          };
          that.$http(that.$api.resetMemberPsd(), postdata).then(xhr => {
            if (xhr.success) {
              this.$alert("操作成功！该用户密码已重置为000000!", "提示");
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
      if (data.flowComments) {
        delete data.flowComments;
      }
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取数据列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: this.page,
          rows: this.$global.numberPerpage
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("getMemberList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberList", postdata).then(xhr => {
            that.dealListData(xhr);
          });
        } else {
          that.dealListData(data);
        }
      });
    },
    dealListData(xhr) {
      this.$dealData(this, xhr, "basMemberId").then(data => {
        data.tablelistSettings.tableDatas.map(item => {
          item.memTypeDsc = item.memType == "2" ? "委托方" : "会员";
          item.operateBtns.push({
            text: "重置密码",
            type: "resetPsw",
            id: {
              basMemberId: item.basMemberId,
              postUrl: "resetMemberPsd"
            }
          });
        });
      });
    }
  },
  mounted() {
    let that = this;
    if (that.$route.params.parentSysId) {
      that.handleOperateButton(that.$route.params);
    }
    that.handleSearchSubmit();
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_invoicetype"
      })
      .then(data => {
        let invoicetypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        dialogCheckFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
      });
  }
};
</script>
