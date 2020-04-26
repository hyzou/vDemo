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
            <!-- <commonTitleWithBorder :title="titles.tableTitle" /> -->
            <el-col :span="6">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
            <el-col :span="18">
              <operateButtonsGroup
                class="textAlignRight"
                :operateButtonsSettings="operateButtonsSettings"
                @handleOperateButton="handleOperateButton"
              />
            </el-col>
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/msgMngCommon/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/msgMngCommon/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/msgMngCommon/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/msgMngCommon/tableHeaderOpt.json";

export default {
  name: "memberMsgMng",
  components: {
    commonTitleWithBorder,
    formGroup,
    operateButtonsGroup,
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
        tableTitle: "会员短信管理列表"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {
          type: "1"
        },
        formButtonList: searchFormBtnList
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
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
      filterRules: [
        {
          field: "memType",
          value: "3",
          op: "equal"
        }
      ],
      usertype: "1"
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["companyName", "name"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      let url = `${this.$global.mainPrefix}/${
        this.$api.exportMsgExcel().url
      }?memType=3&type=${this.usertype}`;
      window.open(url, "_blank");
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 获取数据列表信息 */
    getDataList(query) {
      if (query && query.filterRules && query.filterRules.length > 0) {
        query.filterRules.map(item => {
          if (item.field == "type") this.usertype = item.value;
        });
      }
      let that = this,
        postdata = {
          page: this.page,
          rows: this.$global.numberPerpage,
          type: this.usertype
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("getUsersContractlist", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getUsersContractlist", postdata).then(xhr => {
            that.$dealData(that, xhr);
          });
        } else {
          that.$dealData(that, data);
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.handleSearchSubmit();
  }
};
</script>
