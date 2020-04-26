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
import searchFormBtnList from "@/utils/formSettingsJson/memberYearCheck/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/memberYearCheck/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/memberYearCheck/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/memberYearCheck/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/memberYearCheck/dialogFormItems.json";
import dialogCheckFormItemslist from "@/utils/formSettingsJson/memberYearCheck/dialogCheckFormItems.json";
// import dialogFormAddBtnlist from "@/utils/formSettingsJson/memberYearCheck/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/memberYearCheck/dialogEditFormBtns.json";
// import dialogFormCheckBtnlist from "@/utils/formSettingsJson/memberYearCheck/dialogCheckFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/memberYearCheck/dialogViewFormItems.json";

export default {
  name: "memberYearCheck",
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
        tableTitle: "会员年审列表"
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
        containByNames: ["loginName", "companyName"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.$confirm("您正在发起会员年审，是否继续?", "提示", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$getData("startMemberYearCheckFlow", {}).then(() => {
          this.getDataList();
          this.$message.success("您已成功发起会员年审，请知悉");
        });
      });
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "会员年审详情";
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
      } else if (type == "edit" || type == "check") {
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
        that.dialogFormSettings.dialogFormTitle = "会员年审资料";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        if (
          type == "check" &&
          dialogData.userActiveTasks &&
          dialogData.userActiveTasks.length > 0
        ) {
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogCheckFormItemslist;
          dialogData.userActiveTasks.map(task => {
            that.dialogFormSettings.dialogFormTitle = task.name;
            dialogData.taskId = task.id;
            if (task.userTaskActions && task.userTaskActions.length > 0) {
              task.userTaskActions.map(taskAction => {
                taskAction.flag = taskAction.value;
                taskAction.label = taskAction.text;
                taskAction.needAction = true;
                taskAction.styleType = "primary";
                taskAction.postUrl = "submitMemberYearCheckInfoComment";
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
      } else if (type == "reomve") {
        postdata = {
          sysId: id
        };
        that.$http(that.$api.removeMember(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.getDataList();
          }
        });
      } else if (type == "passOnce" || type == "canclepassOnce") {
        postdata = {
          sysId: id.sysId
        };
        that.$http(that.$api[id.postUrl](), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.getDataList();
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
      data.viewfiles ? delete data.viewfiles : null;
      data.operateBtns ? delete data.operateBtns : null;
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取菜单数据列表信息 */
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
      that.$getData("getMemberYearCheckList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberYearCheckList", postdata).then(xhr => {
            let dealeddata = xhr;
            if (xhr.rows && xhr.rows.length > 0) {
              dealeddata = that.dealDatas(xhr);
            }
            that.$dealData(that, dealeddata, null, null, null).then(() => {
              that.tablelistSettings.tableDatas.map(tableItem => {
                if (
                  tableItem.temporaryCheck !== "Y" &&
                  tableItem.status !== "passReview"
                ) {
                  tableItem.operateBtns.push({
                    text: "临时通过",
                    type: "passOnce",
                    id: {
                      sysId: tableItem.sysId,
                      postUrl: "submitMemberYearCheckInfoOnce"
                    }
                  });
                }
                if (tableItem.temporaryCheck == "Y") {
                  tableItem.operateBtns.push({
                    text: "取消临时通过",
                    type: "canclepassOnce",
                    id: {
                      sysId: tableItem.sysId,
                      postUrl: "cancleMemberYearCheckInfoOnce"
                    }
                  });
                }
              });
            });
          });
        } else {
          let dealeddata = data;
          if (data.rows && data.rows.length > 0) {
            dealeddata = that.dealDatas(data);
          }
          that.$dealData(that, dealeddata, null, null, null).then(() => {
            that.tablelistSettings.tableDatas.map(tableItem => {
              if (
                tableItem.temporaryCheck !== "Y" &&
                tableItem.status !== "passReview"
              ) {
                tableItem.operateBtns.push({
                  text: "临时通过",
                  type: "passOnce",
                  id: {
                    sysId: tableItem.sysId,
                    postUrl: "submitMemberYearCheckInfoOnce"
                  }
                });
              }
              if (tableItem.temporaryCheck == "Y") {
                tableItem.operateBtns.push({
                  text: "取消临时通过",
                  type: "canclepassOnce",
                  id: {
                    sysId: tableItem.sysId,
                    postUrl: "cancleMemberYearCheckInfoOnce"
                  }
                });
              }
            });
          });
        }
      });
    },
    dealDatas(data) {
      data.rows.map(row => {
        row.temporaryCheck_dsp = row.temporaryCheck == "Y" ? "通过" : "";
        row.memberName =
          row.member && row.member.companyName ? row.member.companyName : "";
        row.memberloginName =
          row.member && row.member.loginName ? row.member.loginName : "";
        row.viewfiles = [];
        if (row.files && row.files.length > 0) {
          row.viewfiles = this.$globalFnc.fileFormat(
            row.files,
            "officeViewUrl"
          );
          delete row.files;
        }
      });
      return data;
    }
  },
  mounted() {
    let that = this;
    that.getDataList();
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_base_membercheckstatus"
      })
      .then(data => {
        let datalist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "status") {
            item.data = datalist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        memType: 3,
        _noCache: "true"
      })
      .then(data => {
        let datalist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "memberId") {
            item.data = datalist;
          }
        });
      });
  }
};
</script>
