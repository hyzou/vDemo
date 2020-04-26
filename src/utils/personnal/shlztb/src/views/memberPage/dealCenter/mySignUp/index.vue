<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <tabCard class="tab-container" :tabSettings="tabSettings" />
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
            <!-- <el-col :span="18">
              <operateButtonsGroup
                class="textAlignRight"
                :operateButtonsSettings="operateButtonsSettings"
                @handleOperateButton="handleOperateButton"
              />
            </el-col> -->
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
import tabCard from "@/components/tabCard";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
import { getToken } from "@/utils/auth";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/mySignUp/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/mySignUp/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/mySignUp/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/mySignUp/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/mySignUp/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/mySignUp/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/mySignUp/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
import dialogViewApplyItems from "@/utils/formSettingsJson/mySignUp/dialogViewApplyItems.json";
import dialogFormRules from "@/utils/formRulesJson/mySignUp/dialogRule";

export default {
  name: "mySignUp",
  components: {
    tabCard,
    commonTitleWithBorder,
    formGroup,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "我要报名",
            name: "myApply"
          }
        ]
      },
      //标题管理
      titles: {
        searchTitel: "查询条件",
        tableTitle: "我要报名的专场列表"
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
          formGroupTypeUpload: "true",
          formGroupTypeUploadName: "fbFiles",
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
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name", "no"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      let that = this;
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "添加专场报名表";
      that.dialogFormSettings.dialogFormItems.formGroupValues = {};
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id, type) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        //console.log(tabledata);
        if (tabledata.sysId == id) {
          if (type == "applystatus") {
            let dialogData,
              viewData = {};
            that.tablelistSettings.tableDatas.map(itemdata => {
              if (itemdata.sysId == id) {
                dialogData = JSON.parse(JSON.stringify(itemdata));
              }
            });
            if (!dialogData.enroll) {
              this.$message.error("您尚未报名该专场");
              return false;
            }
            dialogData.projectScoreList.forEach(score => {
              dialogData.enroll.bidScoreList.forEach(selfscore => {
                if (score.sysId == selfscore.projectStoreId) {
                  score.selfScore = selfscore.selfScore;
                  return;
                }
              });
            });
            viewData.scoreListStr = dialogData.projectScoreList;
            viewData.projectId = id;
            viewData.note = dialogData.enroll.note;
            viewData.viewfiles = dialogData.enroll.files;
            that.dialogFormSettings.dialogFormTitle = "专场报名详情";
            that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewApplyItems;
            that.dialogFormSettings.dialogFormItems.formButtonList = [];
            that.dialogFormSettings.dialogFormItems.formGroupValues = viewData;
            that.dialogFormSettings.dialogFormVisible = true;
            that.dialogFormSettings.dialogType = "form";
          } else {
            if (tabledata.projectLimit && tabledata.projectLimit.bidders) {
              tabledata.available = tabledata.projectLimit.available;
              if (tabledata.available == "Y") {
                tabledata.allowMembers = tabledata.projectLimit.bidders.split(
                  ","
                );
                tabledata.notallowMembers = [];
              } else {
                tabledata.notallowMembers = tabledata.projectLimit.bidders.split(
                  ","
                );
                tabledata.allowMembers = [];
              }
            }
            that.dialogFormSettings.dialogFormTitle = "专场详情";
            that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
            that.dialogFormSettings.dialogFormItems.formButtonList = [];
            that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
            that.dialogFormSettings.dialogFormVisible = true;
            that.dialogFormSettings.dialogType = "form";
          }
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
      } else if (type == "applyProject") {
        let that = this,
          dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
        that.dialogFormSettings.dialogFormTitle = "添加专场报名表";
        that.dialogFormSettings.dialogFormItems.formGroupValues = {
          projectId: id,
          scoreListStr: dialogData.projectScoreList
        };
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
      } else if (type == "flowForm") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
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
            if (task.formKey == "request") {
              if (task.userTaskActions && task.userTaskActions.length > 0) {
                task.userTaskActions.map(taskAction => {
                  taskAction.flag = taskAction.value;
                  taskAction.label = taskAction.text;
                  taskAction.needAction = true;
                  taskAction.styleType = "primary";
                  taskAction.postUrl = "flowApplyList";
                });
                that.dialogFormSettings.dialogFormItems.formButtonList =
                  task.userTaskActions;
              }
              that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
            }
          });
        }
        dialogData.project.projectScoreList.forEach(score => {
          dialogData.bidScoreList.forEach(selfscore => {
            if (score.sysId == selfscore.projectStoreId) {
              score.selfScore = selfscore.selfScore;
              return;
            }
          });
        });
        dialogData.scoreListStr = dialogData.project.projectScoreList;
        delete dialogData.project;
        delete dialogData.member;
        delete dialogData.operateBtns;
        delete dialogData.userActiveTasks;
        delete dialogData.processStatus;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else if (type == "edit" || type == "request") {
        let dialogData,
          viewData = {},
          itemsysId;
        itemsysId = type == "edit" ? id : id.sysId;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == itemsysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogData.projectScoreList.forEach(score => {
          dialogData.enroll.bidScoreList.forEach(selfscore => {
            if (score.sysId == selfscore.projectStoreId) {
              score.selfScore = selfscore.selfScore;
              return;
            }
          });
        });
        viewData.scoreListStr = dialogData.projectScoreList;
        viewData.projectId = itemsysId;
        viewData.note = dialogData.enroll.note;
        viewData.sysId = dialogData.enroll.sysId;
        viewData.taskId = id.taskId;
        viewData.processinstId = dialogData.enroll.processinstId;
        viewData.viewfiles = dialogData.enroll.files;
        viewData.flowComments = dialogData.enroll.flowComments
          ? dialogData.enroll.flowComments
          : [];
        that.dialogFormSettings.dialogFormTitle = "编辑专场报名表";
        if (type == "request") {
          if (
            dialogData.enroll.userActiveTasks &&
            dialogData.enroll.userActiveTasks.length > 0
          ) {
            dialogData.enroll.userActiveTasks.map(task => {
              that.dialogFormSettings.dialogFormTitle = task.name;
              if (task.formKey == "request") {
                if (task.userTaskActions && task.userTaskActions.length > 0) {
                  task.userTaskActions.map(taskAction => {
                    taskAction.flag = taskAction.value;
                    taskAction.label = taskAction.text;
                    taskAction.needAction = true;
                    taskAction.styleType = "primary";
                    taskAction.postUrl = "flowApplyList";
                  });
                  that.dialogFormSettings.dialogFormItems.formButtonList =
                    task.userTaskActions;
                }
                that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
              }
            });
          }
        } else {
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
          that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        }
        that.dialogFormSettings.dialogFormItems.formGroupValues = viewData;
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
          that.$http(that.$api.removeApplyList(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.getDataList();
            }
          });
        });
      } else {
        if (type == "complete") {
          that.$http(that.$api.completeflowSpecialItem(), id).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.getDataList();
            }
          });
        }
        if (type == "redirect") {
          that.$router.push({
            name: id.path,
            params: {
              parentSysId: id.sysId
            }
          });
        }
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, data) {
      let that = this,
        postdata = {
          sysId: data
        };
      that.$http(that.$api.getSpecialItemInfomation(), postdata).then(xhr => {
        if (xhr.success) {
          that.dialogFormSettings.dialogFormItems.formGroupValues = {
            projectId: data,
            scoreListStr: xhr.data.projectScoreList
          };
        }
      });
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data, postDatas) {
      let options = {
          doActionFncName: "getDataList"
        },
        canpost = true;
      postDatas.scoreListStr.map(store => {
        if (!store.selfScore) {
          canpost = false;
        }
      });
      if (!canpost) {
        this.$message.error("请填写自评分！");
        return false;
      }
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取菜单数据列表信息 */
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
      that.$getData("mySignupProjectList", postdata).then(data => {
        let applylist;
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("specialInfomationList", postdata).then(xhr => {
            applylist = xhr;
          });
        } else {
          applylist = data;
        }
        // applylist.rows.map(row => {
        //   row.type_desc =
        //     row.type == "10" || row.type == "11" ? "挂牌" : "竞价";
        // });
        that.$dealData(that, applylist).then(() => {
          that.tablelistSettings.tableDatas.map(tableItem => {
            tableItem.applystatus_desc = tableItem.enroll
              ? tableItem.enroll.processinstStatus__dsp
              : "未报名";
            if (tableItem.enroll && tableItem.enroll.files) {
              tableItem.viewfiles = that.$globalFnc.fileFormat(
                tableItem.enroll.files,
                "officeViewUrl"
              );
            }
            tableItem.registerEndtime = that.$globalFnc.dateStampFormat(
              tableItem.registerEndtime
            );
            tableItem.contractDuedate = that.$globalFnc.dateStampFormat(
              tableItem.contractDuedate
            );
            tableItem.tradeBegintime = that.$globalFnc.dateStampFormat(
              tableItem.tradeBegintime
            );
            tableItem.tradeEndtime = that.$globalFnc.dateStampFormat(
              tableItem.tradeEndtime
            );
            let operateBtns = [];
            if (!tableItem.enroll) {
              let actionObj = {
                id: tableItem.sysId,
                text: "报名专场",
                type: "applyProject"
              };
              operateBtns.push(actionObj);
            } else {
              if (tableItem.enroll.processinstStatus == "enrollStart") {
                operateBtns = [
                  {
                    id: tableItem.sysId,
                    text: "编辑",
                    type: "edit"
                  },
                  {
                    id: tableItem.enroll.sysId,
                    text: "删除",
                    type: "remove"
                  }
                ];
              } else {
                if (tableItem.enroll.processinstId) {
                  let operateBtnItem = {
                    id: tableItem.enroll.processinstId,
                    text: "查看流程",
                    type: "checkflow"
                  };
                  operateBtns.push(operateBtnItem);
                  if (
                    tableItem.enroll.userActiveTasks &&
                    tableItem.enroll.userActiveTasks.length > 0
                  ) {
                    tableItem.enroll.userActiveTasks.map(task => {
                      let taskObj = {
                        id: {
                          sysId: tableItem.sysId,
                          taskId: task.id,
                          processinstId: tableItem.enroll.processinstId
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
                              sysId: tableItem.enroll.sysId,
                              taskId: task.id,
                              processinstId: tableItem.enroll.processinstId,
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
                }
              }
            }
            tableItem.operateBtns = operateBtns;
          });
        });
      });
    }
  },
  mounted() {
    // 获取我的申请的列表
    this.getDataList();
    // 获取项目列表
    this.$getData("PortalDropdownlist", {
      _refKey: "project",
      _noCache: "true"
    }).then(data => {
      let projectlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "sysId") {
          item.data = projectlist;
        }
      });
      dialogEditFormItemslist.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
      dialogViewApplyItems.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
    });
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "ts_auction_protype"
    }).then(data => {
      let typelist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
      dialogViewFormItems.map(item => {
        if (item.name == "type") {
          item.data = typelist;
        }
      });
    });
    this.$getData("businessParamsList", {
      page: 1,
      rows: 1000,
      filterRules: JSON.stringify([{ field: "type", value: "1", op: "equal" }])
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(
        data.rows,
        "name",
        "code"
      );
      dialogViewFormItems.map(formItem => {
        if (formItem.name == "calcExpCode") {
          formItem.data = datalist;
        }
      });
    });
    // 获取委托方列表
    this.$getData("PortalDropdownlist", {
      _refKey: "member",
      memType: 2,
      _noCache: "true"
    }).then(data => {
      let memberlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "clientid") {
          item.data = memberlist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "clientid") {
          item.data = memberlist;
        }
      });
    });
    this.$getData("PortalDropdownlist", {
      _refKey: "member",
      _noCache: "true",
      memType: "3"
    }).then(data => {
      let clientlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      dialogViewFormItems.map(formItem => {
        if (formItem.name == "allowMembers") {
          formItem.data = clientlist;
        }
      });
      dialogViewFormItems.map(formItem => {
        if (formItem.name == "notallowMembers") {
          formItem.data = clientlist;
        }
      });
    });
    // 获取流程状态列表
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "ts_bid_enrollStatus",
      _noCache: "true"
    }).then(data => {
      let statuslist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "processinstStatus") {
          item.data = statuslist;
        }
      });
    });
  }
};
</script>
