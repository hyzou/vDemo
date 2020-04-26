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
import searchFormBtnList from "@/utils/formSettingsJson/salesConfirmation/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/salesConfirmation/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/salesConfirmation/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";
import ViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";

export default {
  name: "salesConfirmation",
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
        tableTitle: "成交确认书列表"
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
          field: "status",
          value: "end",
          op: "equal"
        }
      ],
      page: 1,
      numberPerpage: this.$global.numberPerpage,
      pageType: this.$route.params.gptype
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
    /* table每栏操作项点击事件 */
    handleTableItem(id, type) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.propList && tabledata.propList.length > 0) {
          tabledata.propListStr = tabledata.propList;
        }
        if (type !== "target" && tabledata.sysId == id) {
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
        } else if (type == "target" && tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看标的";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id) {
      let postdata = {
        bidId: id
      };
      this.$getData("getDealConfirmInfo", postdata).then(xhr => {
        let confirmData = xhr.data;
        confirmData.bidPriceCH = this.$globalFnc.parseNumberToCnMoney(
          confirmData.bidPrice
        );
        confirmData.bidFeeCH = this.$globalFnc.parseNumberToCnMoney(
          confirmData.bidFee
        );
        confirmData.allPriceCH = this.$globalFnc.parseNumberToCnMoney(
          confirmData.allPrice
        );
        let keys = Object.keys(confirmData),
          url = this.$global.confirmUrl;
        for (let key of keys) {
          url += `${key}=${encodeURIComponent(confirmData[key])}&`;
        }
        window.open(url, "_blank");
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 获取列表数据信息 */
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
      that.$getData("getConfirmNoticeList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getConfirmNoticeList", postdata).then(xhr => {
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
        item.projectName = item.project.name;
        item.numUnit = item.num + (item.project.munit == "kg" ? "千克" : "吨");
        let latestData = Math.max.apply(
          Math,
          item.quoteList.map(input => {
            return input.updated;
          })
        );
        item.quoteList.map(quote => {
          if (latestData == quote.updated) {
            item.latestPrice = quote.price;
          }
          quote.updated = that.$globalFnc.dateStampFormat(quote.updated);
        });
        let operateBtns = [
          {
            id: item.sysId,
            text: "查看成交确认书",
            type: "checkflow"
          }
        ];
        item.operateBtns = operateBtns;
        item.winprice =
          item.winQuote && item.winQuote.price ? item.winQuote.price : "";
        item.winCompany =
          item.winQuote && item.winQuote.biddername
            ? item.winQuote.biddername
            : "";
        // item.winprice = item.winQuote.price;
        // item.winCompany = item.winQuote.biddername;
      });
      that.tablelistSettings.tableDatas = xhr.rows;
      that.paginationSettings.totalNumbers = parseInt(xhr.total);
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
