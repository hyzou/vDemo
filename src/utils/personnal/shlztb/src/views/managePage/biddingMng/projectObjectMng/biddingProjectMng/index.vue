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
      ref="dialogform"
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
import { getToken } from "@/utils/auth";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/biddingProjectMng/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/biddingProjectMng/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/biddingProjectMng/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingProjectMng/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/biddingProjectMng/dialogFormItemsNew.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/biddingProjectMng/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/biddingProjectMng/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
// 校验规则
import dialogFormRules from "@/utils/formRulesJson/biddingProjectMng/dialogRule";
export default {
  name: "biddingProjectMng",
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
        tableTitle: "专场信息列表"
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
       * @param {params} tableDatas table表格数据列表
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
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
       **/
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
      page: 1,
      /**
       * clientlist 委托单位列表
       */
      clientlist: []
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      dialogEditFormItemslist.map(item => {
        item.hideItem = false;
      });
      let that = this;
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "新增专场信息";
      that.dialogFormSettings.dialogFormItems.formGroupValues = {
        scoreListStr: [
          {
            itemName: "",
            itemStandard: "",
            itemScore: ""
          }
        ],
        allowMembers: "",
        notallowMembers: ""
      };
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          if (tabledata.allowMembers && tabledata.allowMembers.length > 0) {
            dialogViewFormItems.map(item => {
              if (item.name == "notallowMembers") {
                item.hideItem = true;
              }
            });
          }
          if (
            tabledata.notallowMembers &&
            tabledata.notallowMembers.length > 0
          ) {
            dialogViewFormItems.map(item => {
              if (item.name == "allowMembers") {
                item.hideItem = true;
              }
            });
          }
          that.dialogFormSettings.dialogFormTitle = "查看专场信息";
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
      } else if (type == "restartCopyProject") {
        that.$http(that.$api.updateSingleProject(), id).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.getDataList();
          }
        });
      } else if (type == "restartTrading") {
        that.$router.push({
          name: "biddingControlSpecial"
        });
      } else if (type == "restartProject") {
        that.$http(that.$api.restartProject(), id).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.getDataList();
          }
        });
      } else if (type == "edit") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        if (dialogData.allowMembers && dialogData.allowMembers.length > 0) {
          dialogEditFormItemslist.map(item => {
            if (item.name == "notallowMembers") {
              item.hideItem = true;
            }
            if (item.name == "allowMembers") {
              item.hideItem = false;
            }
          });
        }
        if (
          dialogData.notallowMembers &&
          dialogData.notallowMembers.length > 0
        ) {
          dialogEditFormItemslist.map(item => {
            if (item.name == "notallowMembers") {
              item.hideItem = false;
            }
            if (item.name == "allowMembers") {
              item.hideItem = true;
            }
          });
        }
        dialogData.scoreListStr =
          dialogData.projectScoreList && dialogData.projectScoreList.length > 0
            ? dialogData.projectScoreList
            : [
                {
                  itemName: "",
                  itemStandard: "",
                  itemScore: ""
                }
              ];
        if (dialogData.calcScore == 100) {
          dialogEditFormItemslist.map(item => {
            if (item.name == "scoreListStr") {
              item.hideItem = true;
            }
          });
        }
        that.dialogFormSettings.dialogFormTitle = "编辑专场信息";
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
          that.$http(that.$api.removeSpecialItem(), postdata).then(xhr => {
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
        } else {
          if (type == "redirectAndFlow") {
            that.$http(that.$api.completeflowSpecialItem(), id).then(xhr => {
              if (xhr.success) {
                that.$message({
                  message: "操作成功！",
                  type: "success"
                });
                that.$router.push({
                  name: id.path,
                  params: {
                    parentSysId: id.sysId
                  }
                });
              }
            });
          } else if (type == "redirect") {
            that.$router.push({
              name: id.path,
              params: {
                parentSysId: id.sysId,
                gptype: id.gptype
              }
            });
          }
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
      dialogEditFormItemslist.map(item => {
        if (item.name == link) {
          if (link == "multyQuote") {
            item.hideItem = data == "10" || data == "11" ? false : true;
          } else if (link == "scoreListStr") {
            item.hideItem = data == 100 ? true : false;
          } else {
            item.hideItem = data.length ? true : false;
            this.dialogFormSettings.dialogFormItems.formGroupValues[link] = "";
          }
        }
      });
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let maxScore = 100,
        exsitScore = 0;
      if (data.allowMembers && data.allowMembers instanceof Array) {
        data.available = "Y";
        data.limitMembers = data.allowMembers.join(",");
      }
      if (data.notallowMembers && data.notallowMembers instanceof Array) {
        data.available = "N";
        data.limitMembers = data.notallowMembers.join(",");
      }
      let params = this.$vueCopy(data),
        tradeBegintime = new Date(params.tradeBegintime),
        tradeEndtime = new Date(params.tradeEndtime),
        signUpEndtime = new Date(params.registerEndtime),
        contractTime = new Date(params.contractDuedate);
      if (tradeBegintime.getTime() >= tradeEndtime.getTime()) {
        this.$message.error("交易结束时间不能小于或等于交易开始时间！");
        return false;
      }
      if (tradeBegintime.getTime() <= signUpEndtime.getTime()) {
        this.$message.error("交易开始时间不能小于或等于报名结束时间！");
        return false;
      }
      if (tradeEndtime.getTime() >= contractTime.getTime()) {
        this.$message.error("合同签订截止时间不能小于或等于交易结束时间！");
        return false;
      }
      if (params.calcScore) {
        maxScore = 100 - params.calcScore;
      }
      if (params.calcScore < 100) {
        params.scoreListStr.map(scoreItem => {
          exsitScore += parseInt(scoreItem.itemScore);
        });
        if (exsitScore > maxScore) {
          this.$message.error(
            "各项综合分分值总分超出最大限制（综合分=100-价格分）！"
          );
          return false;
        }
      }
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, params, btn, options);
    },
    /* 获取菜单数据列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: this.page,
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
      that
        .$http(that.$api.specialInfomationList(), postdata, true)
        .then(xhr => {
          if (xhr) {
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
                if (
                  item.loseTradeBidNum > 0 &&
                  item.processStatus.value == "end" &&
                  (item.type == "01" || item.type == "02") &&
                  !item.totalEnd
                ) {
                  item.status__dsp = "已结束（部分标的流标）";
                  operateBtns.push({
                    id: {
                      sysId: item.sysId,
                      totalEnd: "N"
                    },
                    text: "流标重启专场",
                    type: "restartCopyProject"
                  });
                }
                if (
                  item.loseTradeBidNum > 0 &&
                  item.processStatus.value == "end" &&
                  (item.type == "01" || item.type == "02") &&
                  item.totalEnd == "N"
                ) {
                  item.status__dsp = "交易中（标的流标重启）";
                  operateBtns.push({
                    id: {
                      sysId: item.sysId,
                      totalEnd: "N"
                    },
                    text: "交易中",
                    type: "restartTrading"
                  });
                }
                if (item.processStatus.value == "lossTrade") {
                  item.status__dsp = "专场流标（无会员报名）";
                  operateBtns.push({
                    id: {
                      sysId: item.sysId,
                      status: item.status
                    },
                    text: "重启专场",
                    type: "restartProject"
                  });
                }
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
                        if (task.name == "设置标的") {
                          taskObj.id.path = "biddingTargetsMng";
                        }
                        if (task.name == "发布招标通知书") {
                          taskObj.id.path = "dealAnnouncement";
                        }
                        if (task.name == "发布交易结果") {
                          taskObj.id.path = "dealResults";
                        }
                        if (task.name == "报名审批") {
                          taskObj.id.path = "signReview";
                        }
                        if (task.name == "交易中") {
                          taskObj.id.path = "biddingControlSpecial";
                        }
                        taskObj.id.gptype = item.type;
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
              item.issuetimeFormat = that.$globalFnc.dateStampFormat(
                item.issuetime
              );
              if (item.projectLimit && item.projectLimit.bidders) {
                item.available = item.projectLimit.available;
                if (item.available == "Y") {
                  item.allowMembers = item.projectLimit.bidders.split(",");
                  item.notallowMembers = [];
                } else {
                  item.notallowMembers = item.projectLimit.bidders.split(",");
                  item.allowMembers = [];
                }
              }
              item.registerEndtime = that.$globalFnc.dateStampFormat(
                item.registerEndtime
              );
              item.contractDuedate = that.$globalFnc.dateStampFormat(
                item.contractDuedate
              );
              item.tradeBegintime = that.$globalFnc.dateStampFormat(
                item.tradeBegintime
              );
              item.tradeEndtime = that.$globalFnc.dateStampFormat(
                item.tradeEndtime
              );
            });
            that.tablelistSettings.tableDatas = xhr.rows;
            that.paginationSettings.totalNumbers = parseInt(xhr.total);
          }
        });
    }
  },
  mounted() {
    let that = this;
    this.getDataList();
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_auction_prostatus"
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
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_auction_protype"
      })
      .then(data => {
        let typelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(item => {
          if (item.name == "type") {
            item.data = typelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "type") {
            item.data = typelist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        _noCache: "true",
        memType: "2"
      })
      .then(data => {
        let clientlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "clientid") {
            item.data = clientlist;
          }
        });
        dialogEditFormItemslist.map(formItem => {
          if (formItem.name == "clientid") {
            formItem.data = clientlist;
          }
        });
        dialogViewFormItems.map(formItem => {
          if (formItem.name == "clientid") {
            formItem.data = clientlist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        _noCache: "true",
        memType: "3"
      })
      .then(data => {
        let clientlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(formItem => {
          if (formItem.name == "allowMembers") {
            formItem.data = clientlist;
          }
        });
        dialogEditFormItemslist.map(formItem => {
          if (formItem.name == "notallowMembers") {
            formItem.data = clientlist;
          }
        });
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
    that
      .$getData("businessParamsList", {
        page: 1,
        rows: 1000,
        filterRules: JSON.stringify([
          { field: "type", value: "1", op: "equal" }
        ])
      })
      .then(data => {
        let datalist = that.$globalFnc.arrayToFormDropdown(
          data.rows,
          "name",
          "code"
        );
        dialogEditFormItemslist.map(formItem => {
          if (formItem.name == "calcExpCode") {
            formItem.data = datalist;
          }
        });
        dialogViewFormItems.map(formItem => {
          if (formItem.name == "calcExpCode") {
            formItem.data = datalist;
          }
        });
      });
  }
};
</script>
