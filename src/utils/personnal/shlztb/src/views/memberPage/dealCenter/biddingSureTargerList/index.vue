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
            <commonTitleWithBorder :title="titles.tableTitle" />
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
            @handleTableItem="handleTableItem"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm :dialogFormSettings="dialogFormSettings" />
  </div>
</template>

<script>
// 组件引入
import tabCard from "@/components/tabCard";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/biddingSureTargerList/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/biddingSureTargerList/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingSureTargerList/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
export default {
  name: "biddingSureTargerList",
  components: {
    tabCard,
    commonTitleWithBorder,
    formGroup,
    tableList,
    dialogForm
  },
  data() {
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "定标管理",
            name: "biddingSureTargerList"
          }
        ]
      },
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件",
        tableTitle: "待定标标的列表"
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
          field: "status",
          value: "decide",
          op: "equal"
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
          if (
            tabledata.project.projectLimit &&
            tabledata.project.projectLimit.bidders
          ) {
            tabledata.project.available =
              tabledata.project.projectLimit.available;
            if (tabledata.project.available == "Y") {
              tabledata.project.allowMembers = tabledata.project.projectLimit.bidders.split(
                ","
              );
              tabledata.project.notallowMembers = [];
            } else {
              tabledata.project.notallowMembers = tabledata.project.projectLimit.bidders.split(
                ","
              );
              tabledata.project.allowMembers = [];
            }
          }
          that.dialogFormSettings.dialogFormTitle = "查看专场信息";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues =
            tabledata.project;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this;
      if (type == "complete") {
        let gptype = id.gptype;
        delete id.gptype;
        this.$http(that.$api.flowBidConsoleItem(gptype), id).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.handleSearchSubmit();
            // that.getDataList(this.searchInfo);
          }
        });
      } else if (type == "redirect") {
        that.$router.push({
          path: id.path,
          query: {
            parentSysId: id.sysId,
            parentTaskId: id.taskId,
            parentProcessinstId: id.processinstId,
            gptype: id.gptype
          }
        });
      }
    },
    /* 获取数据列表信息 */
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
      that
        .$http(that.$api.getBidConsoleList("10"), postdata, true)
        .then(xhr => {
          if (xhr && xhr.data) {
            that.dealData(xhr);
          }
        });
    },
    dealData(xhr) {
      let that = this;
      xhr.data.map(item => {
        if (item.winQuoteid) {
          item.winQuoteScore = item.winQuote.price;
        }
        item.quoteList.map(quote => {
          quote.updated = that.$globalFnc.dateStampFormat(quote.updated);
        });
        item.projectName = item.project.name;
        item.numUnit = item.num + (item.project.munit == "kg" ? "千克" : "吨");
        item.sysAddtime = that.$globalFnc.dateStampFormat(item.sysAddtime);
        item.project.tradeBegintime = that.$globalFnc.dateStampFormat(
          item.project.tradeBegintime
        );
        item.project.tradeEndtime = that.$globalFnc.dateStampFormat(
          item.project.tradeEndtime
        );
        item.project.contractDuedate = that.$globalFnc.dateStampFormat(
          item.project.contractDuedate
        );
        item.project.registerEndtime = that.$globalFnc.dateStampFormat(
          item.project.registerEndtime
        );
        let operateBtns = [];
        if (item.processinstId) {
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
                  if (task.name == "评标") {
                    taskObj.id.path =
                      "/managePage/biddingMng/biddingOpenMng/biddingApprove";
                  }
                  if (task.name == "定标") {
                    taskObj.id.path = "biddingSure";
                  }
                  taskObj.id.gptype = item.project.type;
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
                      gptype: item.project.type,
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
        }
        item.operateBtns = operateBtns;
        item.issuetimeFormat = that.$globalFnc.dateStampFormat(item.issuetime);
      });
      that.tablelistSettings.tableDatas = xhr.data;
    }
  },
  mounted() {
    let that = this;
    this.handleSearchSubmit();
    // this.getDataList(this.searchInfo);
    that
      .$getData("PortalDropdownlist", {
        _refKey: "project",
        _noCache: "true"
      })
      .then(data => {
        let projectlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
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
      dialogViewFormItems.map(item => {
        if (item.name == "clientid") {
          item.data = memberlist;
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
  }
};
</script>
