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
      @linkSelect="handleDialogSelectChange"
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
import searchFormBtnList from "@/utils/formSettingsJson/signReview/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/signReview/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/signReview/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/signReview/dialogFormItems.json";
import dialogCheckFormItemslist from "@/utils/formSettingsJson/signReview/dialogCheckFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/signReview/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/signReview/dialogViewFormItems.json";
export default {
  name: "signReview",
  components: {
    commonTitleWithBorder,
    formGroup,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    return {
      //标题管理
      titles: {
        searchTitel: "查询条件",
        tableTitle: "专场报名列表"
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
      filterRules: [
        {
          field: "processinstStatus",
          value: "enrollStart",
          op: "notequal"
        }
      ],
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
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看专场报名";
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
            if (task.formKey == "approve") {
              if (task.userTaskActions && task.userTaskActions.length > 0) {
                task.userTaskActions.map(taskAction => {
                  taskAction.flag = taskAction.value;
                  taskAction.label = taskAction.text;
                  taskAction.needAction = true;
                  taskAction.styleType = "primary";
                  taskAction.postUrl = "approveMemberSignUp";
                });
                that.dialogFormSettings.dialogFormItems.formButtonList =
                  task.userTaskActions;
              }
              that.dialogFormSettings.dialogFormItems.formGroupList = dialogCheckFormItemslist;
            }
          });
          // dialogData.project.projectScoreList.forEach(score => {
          //   dialogData.bidScoreList.forEach(selfscore => {
          //     if (score.sysId == selfscore.projectStoreId) {
          //       score.selfScore = selfscore.selfScore;
          //       return;
          //     }
          //   });
          // });
          // dialogData.scoreListStr = dialogData.project.projectScoreList;
          delete dialogData.project;
          delete dialogData.member;
          delete dialogData.operateBtns;
          delete dialogData.userActiveTasks;
          if (dialogData.processStatus) {
            delete dialogData.processStatus;
          }
          that.dialogFormSettings.dialogFormTitle = "专场报名审批";
          that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      } else if (type == "edit") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });

        // dialogData.project.projectScoreList.forEach(score => {
        //   dialogData.bidScoreList.forEach(selfscore => {
        //     if (score.sysId == selfscore.projectStoreId) {
        //       score.selfScore = selfscore.selfScore;
        //       return;
        //     }
        //   });
        // });
        // dialogData.scoreListStr = dialogData.project.projectScoreList;
        delete dialogData.project;
        delete dialogData.member;
        delete dialogData.operateBtns;
        delete dialogData.userActiveTasks;
        that.dialogFormSettings.dialogFormTitle = "编辑专场报名表";
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
            sysId: id
          };
          that.$http(that.$api.removeApplyList(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.handleSearchSubmit();
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
              that.handleSearchSubmit();
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
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取报名列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: "1",
          rows: "10"
        },
        searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$http(that.$api.myApplyList(), postdata).then(xhr => {
        if (xhr) {
          xhr.rows.map(item => {
            if (item.files) {
              item.viewfiles = that.$globalFnc.fileFormat(
                item.files,
                "officeViewUrl"
              );
            }
            if (item.project && item.project.name) {
              item.projectName = item.project.name;
            }
            item.projectClient = item.member.companyName;
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
                    id: item.sysId,
                    text: task.name,
                    type: "flowForm"
                  };
                  operateBtns.push(taskObj);
                  if (task.userTaskActions && task.userTaskActions.length > 0) {
                    task.userTaskActions.map(action => {
                      if (action.value == "complete") {
                        let actionObj = {
                          id: {
                            sysId: item.sysId,
                            taskId: task.id,
                            processinstId: item.processinstId,
                            userAction: "complete"
                          },
                          text: action.text,
                          needAction: true,
                          type: "complete"
                        };
                        operateBtns.push(actionObj);
                      }
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
            item.enrolltime = that.$globalFnc.dateStampFormat(item.enrolltime);
            item.operateBtns = operateBtns;
            item.project.projectScoreList.forEach(score => {
              item.bidScoreList.forEach(selfscore => {
                if (score.sysId == selfscore.projectStoreId) {
                  score.selfScore = selfscore.selfScore;
                  return;
                }
              });
            });
            item.scoreListStr = item.project.projectScoreList;
          });
          that.tablelistSettings.tableDatas = xhr.rows;
          that.paginationSettings.totalNumbers = parseInt(xhr.total);
        }
      });
    }
  },
  mounted() {
    // let that = this;
    // if (that.$route.params.parentSysId) {
    // 	that.handleTableRowButton(that.$route.params.parentSysId, "flowForm")
    // }
    // 获取我的申请的列表
    this.handleSearchSubmit();
    // 获取项目列表
    this.$getData("PortalDropdownlist", {
      _refKey: "project",
      // status: "apply",
      _noCache: "true"
    }).then(data => {
      let projectlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
      dialogEditFormItemslist.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
      dialogCheckFormItemslist.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "projectId") {
          item.data = projectlist;
        }
      });
    });
    // 获取会员列表
    this.$getData("PortalDropdownlist", {
      _refKey: "member",
      memType: 3,
      _noCache: "true"
    }).then(data => {
      let memberlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "memberId") {
          item.data = memberlist;
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
