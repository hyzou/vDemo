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
import searchFormBtnList from "@/utils/formSettingsJson/memberAccontQuery/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/memberAccontQuery/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/memberAccontQuery/tableHeaderOpt.json";
import dialogViewFormItems from "@/utils/formSettingsJson/memberAccontQuery/dialogViewFormItems.json";
export default {
  name: "memberAccontQuery",
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
        tableTitle: "会员账户列表"
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
      filterRules: [
        {
          field: "member.memType",
          value: "3",
          op: "equal"
        }
      ],
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
        containByNames: ["no"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看会员账户";
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
        .$http(that.$api.getMemberAccountQueryList(), postdata, true)
        .then(xhr => {
          if (xhr && xhr.rows) {
            xhr.rows.map(item => {
              let operateBtns = [
                {
                  id: item.sysId,
                  text: "查看",
                  type: "edit"
                }
                // {
                // 	id: item.sysId,
                // 	text: "删除",
                // 	type: "remove"
                // }
              ];
              item.operateBtns = operateBtns;
              item.sysAddtime = that.$globalFnc.dateStampFormat(
                item.sysAddtime
              );
              item.memberName = item.member ? item.member.companyName : "";
              if (item.status == "1") {
                item.status__dsp = "正常";
              } else {
                item.status__dsp = "销户";
              }
            });
          }
          that.tablelistSettings.tableDatas = xhr.rows;
          that.paginationSettings.totalNumbers = parseInt(xhr.total);
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
        dialogViewFormItems.map(item => {
          if (item.name == "memberid") {
            item.data = memberlist;
          }
        });
      });
  }
};
</script>
