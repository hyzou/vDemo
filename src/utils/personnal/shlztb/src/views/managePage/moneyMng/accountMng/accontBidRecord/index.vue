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
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/accontBidRecord/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/accontBidRecord/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/accontBidRecord/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/accontBidRecord/dialogFormItems.json";
import dialogViewFormItems from "@/utils/formSettingsJson/accontBidRecord/dialogViewFormItems.json";
export default {
  name: "accontBidRecord",
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
        tableTitle: "交易记录列表"
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
          rowKey: "id",
          border: true,
          defaultExpandAll: true,
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
        dialogFormTitle: "添加账户信息",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: dialogEditFormItemslist,
          formGroupValues: {},
          formButtonList: []
        }
      },
      /**
       * table 角色列表已勾选的数据
       */
      checkedRoleList: [],
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {
        filterRules: []
      },
      filterRules: [
        {
          field: "member.memType",
          value: "3",
          op: "equal"
        }
      ],
      page: 1,
      pageType: this.$route.params.gptype
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: [],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看交易记录";
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
      if (type == "edit") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        delete dialogData.operateBtns;
        that.dialogFormSettings.dialogFormTitle = "查看交易记录信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        // that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else {
        postdata = {
          sysId: id
        };
        that.$http(that.$api.deleteBidTarget(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.handleSearchSubmit();
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
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 分页获取列表信息 */
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
        .$http(this.$api.getAccountTradeRecordList(), postdata, true)
        .then(xhr => {
          if (xhr && xhr.rows) {
            xhr.rows.map(item => {
              let operateBtns = [
                {
                  id: item.sysId,
                  text: "查看",
                  type: "edit"
                }
              ];
              item.operateBtns = operateBtns;
              item.memberName = item.member.companyName;
              item.addtime = that.$globalFnc.dateStampFormat(item.addtime);
            });
            that.tablelistSettings.tableDatas = xhr.rows;
            that.paginationSettings.totalNumbers = parseInt(xhr.total);
          }
        });
    }
  },
  mounted() {
    let that = this;
    that.handleSearchSubmit();
    // 获取会员列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        memType: 3,
        _noCache: "true"
      })
      .then(data => {
        let memberlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
      });
    // 出入类型
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_vouchertype",
        _noCache: "true"
      })
      .then(data => {
        let memberlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "type") {
            item.data = memberlist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "type") {
            item.data = memberlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "type") {
            item.data = memberlist;
          }
        });
      });
    // 获取交易类型列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_biztype",
        _noCache: "true"
      })
      .then(data => {
        let bidtypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
      });
    // 状态
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_voucherstatus",
        _noCache: "true"
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
    // 获取交易类型列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_biztype",
        _noCache: "true"
      })
      .then(data => {
        let bidtypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "biztype") {
            item.data = bidtypelist;
          }
        });
      });
    // 获取添加类型列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "fb_common_addtype",
        _noCache: "true"
      })
      .then(data => {
        let addtypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "sysAddtype") {
            item.data = addtypelist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "sysAddtype") {
            item.data = addtypelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "sysAddtype") {
            item.data = addtypelist;
          }
        });
      });
  }
};
</script>
