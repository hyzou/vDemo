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
          />
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
import searchFormBtnList from "@/utils/formSettingsJson/biddingSureTargerList/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/biddingSureTargerList/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingSureTargerList/tableHeaderOpt.json";

export default {
  name: "biddingSureTargerList",
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
      searchInfo: {
        filterRules: [
          {
            field: "status",
            value: "decide",
            op: "equal"
          }
        ]
      }
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["title"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id) {
      this.$router.push({
        path: id.path,
        query: {
          parentSysId: id.sysId
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
          page: "1",
          rows: "10"
        };
      if (query && query.filterRules) {
        query.filterRules = JSON.stringify(query.filterRules);
      }
      if (query && typeof query === "object") {
        Object.assign(postdata, query);
      }
      that.$http(that.$api.getBidTargetList(), postdata, true).then(xhr => {
        if (xhr) {
          xhr.rows.map(item => {
            item.projectName = item.project.name;
            if (item.winQuoteid) {
              item.winQuoteScore = item.winQuote.price;
            }
            let operateBtns = [
              {
                id: {
                  sysId: item.sysId,
                  path: "biddingSure"
                },
                text: "去定标",
                type: "biddingSure"
              }
            ];
            item.operateBtns = operateBtns;
          });
          that.tablelistSettings.tableDatas = xhr.rows;
          that.paginationSettings.totalNumbers = parseInt(xhr.total);
        }
      });
    }
  },
  mounted() {
    let that = this;
    this.getDataList(this.searchInfo);
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
  }
};
</script>
