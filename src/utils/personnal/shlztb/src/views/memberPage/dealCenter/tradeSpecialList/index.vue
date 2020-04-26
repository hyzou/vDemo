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
import searchFormBtnList from "@/utils/formSettingsJson/biddingControlSpecial/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/biddingControlSpecial/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingControlSpecial/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
export default {
  name: "biddingControlSpecial",
  components: {
    tabCard,
    commonTitleWithBorder,
    formGroup,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    let querylist = [
      // {
      //   field: "status",
      //   value: "trading",
      //   op: "equal"
      // }
    ];
    if (this.$store.getters.userInfo.type == "2") {
      querylist.push({
        field: "flagWatch",
        value: "Y",
        op: "equal"
      });
    }
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "专场列表",
            name: "tradeSpecialList"
          }
        ]
      },
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
      filterRules: querylist,
      // filterRules:[
      //   {
      //     field: "status",
      //     value: "trading",
      //     op: "equal"
      //   },
      //   {
      //     field: "flagWatch",
      //     value: "Y",
      //     op: "equal"
      //   }
      // ],
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
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
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
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id) {
      let path;
      if (this.$store.getters.userInfo.type == "3") {
        path = "specialList";
      } else {
        path = "inspectTrade";
      }
      this.$router.push({
        path: path,
        query: {
          parentSysId: id.sysId,
          gptype: id.gptype
        }
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
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
      that
        .$http(that.$api.specialInfomationProjectList(), postdata, true)
        .then(xhr => {
          if (xhr) {
            xhr.rows.map(item => {
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
              let operateBtns = [];
              operateBtns = [
                {
                  id: {
                    sysId: item.sysId,
                    gptype: item.type
                  },
                  text: "进入专场",
                  type: "edit"
                }
              ];
              item.operateBtns = operateBtns;
              if (item.totalEnd && item.totalEnd == "N") {
                item.status__dsp = "交易中（标的流标重启）";
              }
              if (item.type == "10" || item.type == "11") {
                item.typeDesc = "挂牌";
              } else {
                item.typeDesc = "竞价";
              }
              item.issuetimeFormat = that.$globalFnc.dateStampFormat(
                item.issuetime
              );
            });
            that.tablelistSettings.tableDatas = xhr.rows;
            that.paginationSettings.totalNumbers = parseInt(xhr.total);
          }
        });
    },
    /* 获取菜单数据详情 */
    gettradeInformationDetail(params) {
      let that = this;
      return new Promise(resolve => {
        that.$http(that.$api.tradeInformationDetail(), params).then(xhr => {
          resolve(xhr);
        });
      });
    }
  },
  mounted() {
    let that = this;
    this.handleSearchSubmit();
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
          if (item.name == "sysId") {
            item.data = projectlist;
          }
        });
      });
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
        dialogViewFormItems.map(formItem => {
          if (formItem.name == "clientid") {
            formItem.data = clientlist;
          }
        });
      });
  }
};
</script>
