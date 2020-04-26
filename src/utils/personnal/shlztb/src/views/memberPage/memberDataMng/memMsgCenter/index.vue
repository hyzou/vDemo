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
import searchFormBtnList from "@/utils/formSettingsJson/memMsgCenter/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/memMsgCenter/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/memMsgCenter/tableHeaderOpt.json";
import dialogCheckFormItemslist from "@/utils/formSettingsJson/memMsgCenter/dialogCheckFormItems.json";
import dialogFormCheckBtnlist from "@/utils/formSettingsJson/memMsgCenter/dialogCheckFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/memMsgCenter/dialogViewFormItems.json";
export default {
  name: "memMsgCenter",
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
        tableTitle: "消息列表"
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
      searchInfo: {},
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
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "消息详情";
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
        postdata = id;
      // eslint-disable-next-line
      that.$getData("singleMsgRead", postdata).then(data => {
        that.$store.dispatch("setUnreadNotice");
        that.getDataList();
        if (type == "checkMsg") {
          let data;
          that.tablelistSettings.tableDatas.map(item => {
            if (item.msgId == id.msgId) {
              data = item;
            }
          });
          that.dialogFormSettings.dialogFormTitle = "查看信息";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogCheckFormItemslist;
          that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormCheckBtnlist;
          that.dialogFormSettings.dialogFormItems.formGroupValues = data;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.searchInfo.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
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
      that.$getData("getAllMsgList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getAllMsgList", postdata).then(xhr => {
            that.dealListData(xhr);
          });
        } else {
          that.dealListData(data);
        }
      });
    },
    dealListData(xhr) {
      let that = this;
      if (!xhr || !xhr.rows) {
        return false;
      }
      xhr.rows.map(item => {
        let operateBtns = [
          {
            id: {
              msgId: item.msgId,
              receiverId: item.receiverId
            },
            text: "查看信息",
            type: "checkMsg"
          }
        ];
        if (item.status == "0") {
          operateBtns.push({
            id: {
              msgId: item.msgId,
              receiverId: item.receiverId
            },
            text: "忽略本条",
            type: "ignore"
          });
        }
        item.operateBtns = operateBtns;
        item.title = item.msg.title;
        item.content = item.msg.content;
        // item.content = item.content;
        item.statusName = item.status == "0" ? "未读" : "已读";
        item.sysAddtime = that.$globalFnc.dateStampFormat(item.msg.sysAddtime);
      });
      that.tablelistSettings.tableDatas = xhr.rows;
      that.paginationSettings.totalNumbers = parseInt(xhr.total);
    }
  },
  mounted() {
    this.getDataList();
  }
};
</script>
