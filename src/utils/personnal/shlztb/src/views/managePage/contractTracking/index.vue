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
            @handleTableItem="handleTableItem"
          />
          <pagination
            :paginationSettings="paginationSettings"
            @handlePaginationPagenumber="handlePaginationPagenumber"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm :dialogFormSettings="dialogFormSettings" />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/contractTracking/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/contractTracking/searchFormItemsWithoutCode.json";
import tableHeaderOpts from "@/utils/formSettingsJson/contractTracking/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";
import ViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
export default {
  name: "contractTracking",
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
        tableTitle: "合同追踪列表"
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
          hasExpandContent: true,
          expandContent: "contractList",
          expandContentLables: [
            {
              key: "code",
              value: "合同编号"
            },
            {
              key: "isfinish",
              value: "本次收货确认情况"
            },
            {
              key: "sendnumUnit",
              value: "本次发送数量"
            }
          ],
          tooltipEffect: "dark",
          rowKey: "sysId",
          border: true,
          defaultExpandAll: false,
          headerOptions: tableHeaderOpts
        }
      },
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 4
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
        containByNames: ["no"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id, type) {
      let that = this;
      this.$getData("getBidTargetItemInfo", { sysId: id }).then(data => {
        let tabledata = data.data;
        if (type == "project") {
          that.dialogFormSettings.dialogFormTitle = "查看专场";
          that.dialogFormSettings.dialogFormItems.formGroupList = ViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
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
          that.dialogFormSettings.dialogFormItems.formGroupValues =
            tabledata.project;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        } else {
          that.dialogFormSettings.dialogFormTitle = "查看标的";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        };
      if (query && typeof query === "object") {
        if (query.filterRules) {
          query.filterRules.map(item => {
            postdata[item.field] = item.value;
          });
        }
      }
      that.$getData("getContractAttractList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getContractAttractList", postdata).then(xhr => {
            that.dealData(xhr);
          });
        } else {
          that.dealData(data);
        }
      });
    },
    dealData(data) {
      if (data.rows && data.rows.length > 0) {
        data.rows.map(item => {
          item.status_dsp = "交易中";
          item.numUnit = item.num + (item.munit == "kg" ? "千克" : "吨");
          item.finishnumUnit =
            item.finishnum + (item.munit == "kg" ? "千克" : "吨");
          if (item.contractList && item.contractList.length > 0) {
            item.contractList.map(contract => {
              contract.isfinish = "已确认";
              contract.sendnumUnit =
                contract.sendnum + (item.munit == "kg" ? "千克" : "吨");
              if (contract.status == "94") {
                item.status_dsp = "已完成";
              } else if (contract.status == "50") {
                contract.isfinish = "未确认";
              }
            });
          }
        });
      }
      this.tablelistSettings.tableDatas = data.rows;
      this.paginationSettings.totalNumbers = parseInt(data.total);
    }
  },
  mounted() {
    let that = this;
    that.handleSearchSubmit();
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
        dialogViewFormItems.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "web_portal_infostatus"
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
      ViewFormItems.map(item => {
        if (item.name == "clientid") {
          item.data = memberlist;
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
        ViewFormItems.map(formItem => {
          if (formItem.name == "allowMembers") {
            formItem.data = clientlist;
          }
        });
        ViewFormItems.map(formItem => {
          if (formItem.name == "notallowMembers") {
            formItem.data = clientlist;
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
        ViewFormItems.map(item => {
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
      ViewFormItems.map(formItem => {
        if (formItem.name == "calcExpCode") {
          formItem.data = datalist;
        }
      });
    });
  }
};
</script>
