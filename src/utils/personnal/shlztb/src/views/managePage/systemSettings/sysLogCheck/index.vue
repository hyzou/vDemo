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
          <tableList :tablelistSettings="tablelistSettings" />
          <pagination
            :paginationSettings="paginationSettings"
            @handlePaginationPagenumber="handlePaginationPagenumber"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/sysLogCheck/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/sysLogCheck/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/sysLogCheck/tableHeaderOpt.json";

export default {
  name: "sysLogCheck",
  components: {
    commonTitleWithBorder,
    formGroup,
    tableList,
    pagination
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件",
        tableTitle: "系统日志列表"
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
       * searchbar 记录搜索栏搜索记录
       */
      page: 1,
      searchInfo: {},
      filterRules: []
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["loginName", "companyName"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
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
          rows: this.$global.numberPerpage
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("systemLog", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("systemLog", postdata).then(xhr => {
            that.dealListData(xhr);
          });
        } else {
          that.dealListData(data);
        }
      });
    },
    dealListData(xhr) {
      if (xhr.rows) {
        xhr.rows.map(row => {
          row.created = this.$globalFnc.dateStampFormat(row.created);
          row.loginStatus_dsc = ["成功", "失败"][parseInt(row.loginStatus)];
          row.auditLevel_dsc = ["低", "中", "高"][parseInt(row.auditLevel)];
          row.logType_dsc = ["登录日志", "审计日志"][parseInt(row.logType) - 1];
        });
      }
      this.tablelistSettings.tableDatas = xhr.rows;
      this.paginationSettings.totalNumbers = parseInt(xhr.total);
    }
  },
  mounted() {
    this.handleSearchSubmit();
  }
};
</script>
