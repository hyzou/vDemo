<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('contractTrackingMember')"
        >
          <i class="el-icon-arrow-left"></i>
          返回合同追踪列表
        </el-link>
      </el-col>
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
          <!-- @handleTableItem="handleTableItem" -->
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
import searchFormBtnList from "@/utils/formSettingsJson/contractTracking/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/contractTracking/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/contractTracking/tableHeaderOptConfirm.json";
// import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";
// import ViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";

export default {
  name: "contractTrackingPrincipal",
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
        containByNames: ["title"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    // handleTableItem(id, type) {
    //   // this.$getData("getBidTargetItemInfo", { sysId: id }).then(data => {
    //   // });
    // },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      this.$confirm("您当前正在执行确认收货操作，是否继续确认收货？", "提示", {
        confirmButtonText: "确认收货",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
        type: "warning"
      }).then(() => {
        this.$getData(type, id).then(() => {
          this.$message.success("操作成功！");
          this.handleSearchSubmit();
        });
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      if (btn.flag == "cancle") {
        this.dialogFormSettings.dialogFormVisible = false;
        return false;
      }
      let that = this,
        postdata = {};
      postdata = data;
      that.$http(that.$api[btn.postUrl](), postdata, true).then(() => {
        that.dialogFormSettings.dialogFormVisible = false;
        that.$message({
          message: "操作成功！",
          type: "success"
        });
        that.getDataList();
      });
    },
    /* 分页获取列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage,
          sysSourceid: this.$route.query.parentSysId || ""
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("confirmContractAttract", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("confirmContractAttract", postdata).then(xhr => {
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
          let operateBtns = [];
          item.sendnumUnit =
            item.sendnum +
            (this.$route.query.parentUnit == "kg" ? "千克" : "吨");
          if (item.status == "50") {
            operateBtns.push({
              id: {
                sysId: item.sysId
              },
              text: "确认收货",
              type: "sureContractAttract"
            });
          }
          item.operateBtns = operateBtns;
        });
      }
      this.tablelistSettings.tableDatas = data.rows;
      this.paginationSettings.totalNumbers = parseInt(data.total);
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
      });
  }
};
</script>
