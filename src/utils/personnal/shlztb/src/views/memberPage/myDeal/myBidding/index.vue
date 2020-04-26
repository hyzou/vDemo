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
import searchFormBtnList from "@/utils/formSettingsJson/biddingTargetsMng/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/biddingTargetsMng/searchFormItems.json";
import tableTargetHeaderOpts from "@/utils/formSettingsJson/biddingTargetsMng/tableHeaderOpt.json";
import tableBidHeaderOpts from "@/utils/formSettingsJson/myBidding/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";
import ViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
// import ViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/viewFormItems.json";
export default {
  name: "biddingTargetsMng",
  components: {
    commonTitleWithBorder,
    formGroup,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    let tableHeaderOpts,
      titleObj = {};
    if (this.$store.getters.userInfo.type == "3") {
      tableHeaderOpts = tableBidHeaderOpts;
      titleObj.searchTitel = "查询条件";
      titleObj.tableTitle = "我的应价列表";
    } else {
      tableHeaderOpts = tableTargetHeaderOpts;
      titleObj.searchTitel = "查询条件";
      titleObj.tableTitle = "我委托的交易列表";
    }
    return {
      /**
       * titles 标题管理
       */
      titles: titleObj,
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
      page: 1,
      /**
       * 专场模式
       */
      specialType: "",
      /**
       * 标的属性列表
       */
      attrList: []
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
    handleTableItem(id, type) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
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
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 获取数据列表信息 */
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
      // mybidList getDataList
      that.$http(that.$api.mybidList(), postdata, true).then(xhr => {
        if (xhr) {
          if (!xhr.rows) {
            return false;
          }
          xhr.rows.map(item => {
            item.projectName = item.project.name;
            item.numUnit =
              item.num + (item.project.munit == "kg" ? "千克" : "吨");
            if (item.winQuoteid) {
              item.winQuoteScore = item.winQuote.price;
              item.winCompany = item.winQuote.biddername;
            }
            if (item.propList && item.propList.length > 0) {
              item.propListStr = item.propList;
            }
            if (item.quoteList && item.quoteList.length > 0) {
              item.quoteList.map(quote => {
                if (quote.bidder == that.$store.getters.userInfo.memberId) {
                  item.myPrice = quote.price;
                }
              });
            }
          });
          that.tablelistSettings.tableDatas = xhr.rows;
          that.paginationSettings.totalNumbers = parseInt(xhr.total);
        }
      });
    },
    /* 获取专场信息 */
    getSpecialDetail(id) {
      let that = this;
      let promise = new Promise((resolve, reject) => {
        that
          .$getData("getSpecialItemInfomation", {
            sysId: id
          })
          .then(data => {
            that.specialType = data.data.type;
            resolve(data);
          })
          .catch(response => {
            reject(response);
          });
      });
      return promise;
    }
  },
  mounted() {
    let that = this,
      tableHeaderOpts;
    if (this.$store.getters.userInfo.type == "3") {
      tableHeaderOpts = tableBidHeaderOpts;
    } else {
      tableHeaderOpts = tableTargetHeaderOpts;
    }
    tableHeaderOpts.map(item => {
      if (item.prop == "operateBtns") {
        tableHeaderOpts.pop();
      }
    });
    this.getDataList();
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
        busintypeid: "ts_auction_bidstatus"
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
  }
};
</script>
