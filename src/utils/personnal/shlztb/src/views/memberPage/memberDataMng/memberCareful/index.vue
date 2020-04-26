<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
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
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
import { getToken } from "@/utils/auth";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/memberCareful/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/memberCareful/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/memberCareful/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/memberCareful/dialogViewFormItems.json";

export default {
  name: "memberCareful",
  components: {
    commonTitleWithBorder,
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
        tableTitle: "会员年审列表"
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
          formGroupTypeUpload: "true",
          formGroupTypeUploadName: "fbFiles",
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: []
        }
      },
      page: 1
    };
  },
  methods: {
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "会员年审详情";
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
      if (type == "checkflow") {
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = "流程图查看";
        this.dialogFormSettings.dialogType = "image";
        this.dialogFormSettings.imgSrc =
          this.$global.flowPicUrl +
          "?processInstanceId=" +
          id +
          "&_jwt=" +
          getToken() +
          "&t=" +
          new Date().getTime();
      } else if (type == "submitMemberInfo" || type == "adjustMemberInfo") {
        let data;
        this.tablelistSettings.tableDatas.map(item => {
          if (item.sysId == id.sysId) {
            data = item;
          }
        });
        this.dialogFormSettings.dialogFormTitle = "添加年审资料";
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        this.dialogFormSettings.dialogFormItems.formGroupValues = data;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.tradeInformationList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "tradeInformationList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取菜单数据列表信息 */
    tradeInformationList(query) {
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
      that.$getData("getMemberYearCheckList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberYearCheckList", postdata).then(xhr => {
            let dealeddata = xhr;
            if (xhr.rows && xhr.rows.length > 0) {
              dealeddata = that.dealDatas(xhr);
            }
            that.$dealData(that, dealeddata, null, null, null);
          });
        } else {
          let dealeddata = data;
          if (data.rows && data.rows.length > 0) {
            dealeddata = that.dealDatas(data);
          }
          that.$dealData(that, dealeddata, null, null, null);
        }
      });
    },
    dealDatas(data) {
      data.rows.map(row => {
        row.viewfiles = [];
        row.temporaryCheck_dsp = row.temporaryCheck == "Y" ? "通过" : "";
        row.member =
          row.member && row.member.companyName ? row.member.companyName : "";
        row.taskId =
          row.userActiveTasks && row.userActiveTasks.length == 1
            ? row.userActiveTasks[0].id
            : "";
        if (row.files && row.files.length > 0) {
          row.viewfiles = this.$globalFnc.fileFormat(
            row.files,
            "officeViewUrl"
          );
          delete row.files;
        }
      });
      return data;
    }
  },
  mounted() {
    let that = this;
    that.tradeInformationList();
  }
};
</script>
