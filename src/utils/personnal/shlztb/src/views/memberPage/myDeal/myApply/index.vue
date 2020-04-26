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
import tabCard from "@/components/tabCard";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/myApply/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/myApply/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/myApply/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/myApply/dialogViewFormItems.json";
import dialogViewProjectFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";

export default {
  name: "myApply",
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
            label: "我的报名",
            name: "myApply"
          }
        ]
      },
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
      filterRules: [],
      page: 1
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      if (flag.flag == "clear") {
        this.formGroupSettings.formGroupValues = {};
        this.getDataList();
        return false;
      }
      let option = {
        containByNames: ["title"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id, flag) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          if (flag == "project") {
            tabledata.project.registerEndtime = that.$globalFnc.dateStampFormat(
              tabledata.project.registerEndtime
            );
            tabledata.project.contractDuedate = that.$globalFnc.dateStampFormat(
              tabledata.project.contractDuedate
            );
            tabledata.project.tradeBegintime = that.$globalFnc.dateStampFormat(
              tabledata.project.tradeBegintime
            );
            tabledata.project.tradeEndtime = that.$globalFnc.dateStampFormat(
              tabledata.project.tradeEndtime
            );
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
            that.dialogFormSettings.dialogFormTitle = "查看专场";
            that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewProjectFormItems;
            that.dialogFormSettings.dialogFormItems.formButtonList = [];
            that.dialogFormSettings.dialogFormItems.formGroupValues =
              tabledata.project;
            that.dialogFormSettings.dialogFormVisible = true;
            that.dialogFormSettings.dialogType = "form";
          } else {
            that.dialogFormSettings.dialogFormTitle = "查看专场报名";
            that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
            that.dialogFormSettings.dialogFormItems.formButtonList = [];
            that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
            that.dialogFormSettings.dialogFormVisible = true;
            that.dialogFormSettings.dialogType = "form";
          }
        }
      });
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
      that.$http(that.$api.myApplyList(), postdata, true).then(xhr => {
        if (xhr && xhr.rows && xhr.rows.length > 0) {
          xhr.rows.map(item => {
            item.projectName = item.project.name;
            item.processinstStatus__dsp =
              item.processinstStatus__dsp == "报名调整"
                ? "报名未通过"
                : item.processinstStatus__dsp;
            item.projectClient = item.project.client;
            if (item.files) {
              item.viewfiles = that.$globalFnc.fileFormat(
                item.files,
                "officeViewUrl"
              );
            }
            item.project.projectScoreList.forEach(score => {
              item.bidScoreList.forEach(selfscore => {
                if (score.sysId == selfscore.projectStoreId) {
                  score.selfScore = selfscore.selfScore;
                  return;
                }
              });
            });
            item.scoreListStr = item.project.projectScoreList;
            item.enrolltime = that.$globalFnc.dateStampFormat(item.enrolltime);
          });
        }
        that.tablelistSettings.tableDatas = xhr.rows;
        that.paginationSettings.totalNumbers = parseInt(xhr.total);
      });
    }
  },
  mounted() {
    this.getDataList();
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
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "ts_auction_protype"
    }).then(data => {
      let typelist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
      dialogViewProjectFormItems.map(item => {
        if (item.name == "type") {
          item.data = typelist;
        }
      });
      this.$getData("businessParamsList", {
        page: 1,
        rows: 1000,
        filterRules: JSON.stringify([
          { field: "type", value: "1", op: "equal" }
        ])
      }).then(data => {
        let datalist = this.$globalFnc.arrayToFormDropdown(
          data.rows,
          "name",
          "code"
        );
        dialogViewProjectFormItems.map(formItem => {
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
        dialogViewProjectFormItems.map(item => {
          if (item.name == "clientid") {
            item.data = memberlist;
          }
        });
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
      dialogViewProjectFormItems.map(formItem => {
        if (formItem.name == "allowMembers") {
          formItem.data = clientlist;
        }
      });
      dialogViewProjectFormItems.map(formItem => {
        if (formItem.name == "notallowMembers") {
          formItem.data = clientlist;
        }
      });
    });
  }
};
</script>
