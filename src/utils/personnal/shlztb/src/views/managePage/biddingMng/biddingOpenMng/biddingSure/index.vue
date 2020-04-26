<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('biddingSureTargerList')"
        >
          <i class="el-icon-arrow-left"></i>
          返回待定标列表页
        </el-link>
      </el-col>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <el-col :span="4">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
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
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/biddingSure/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/biddingSure/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/biddingSure/dialogEditFormBtns.json";

export default {
  name: "biddingSure",
  components: {
    commonTitleWithBorder,
    tableList,
    dialogForm
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件",
        tableTitle: "招投标标的列表"
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
      }
    };
  },
  methods: {
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this;
      if (type == "approve") {
        let dialogData = id;
        that.dialogFormSettings.dialogFormTitle = "定标";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      }
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      if (btn.flag == "cancle") {
        this.dialogFormSettings.dialogFormVisible = false;
        return false;
      }
      let params = JSON.parse(JSON.stringify(data));
      params = this.$globalFnc.postArrtoString(params);
      let that = this,
        postdata = {};
      postdata = params;
      that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
        if (xhr.success) {
          that.dialogFormSettings.dialogFormVisible = false;
          that.$message({
            message: "操作成功！",
            type: "success"
          });
        }
      });
    },
    /* 获取待定标数据详情 */
    getBidConsoleItem(params) {
      let that = this;
      return new Promise(resolve => {
        that.$http(that.$api.getBidTargetItemInfo(), params).then(xhr => {
          resolve(xhr);
        });
      });
    }
  },
  mounted() {
    let that = this,
      defaultParams = {};

    if (that.$route.query.parentSysId) {
      defaultParams = {
        sysId: that.$route.query.parentSysId
      };
    }
    that.getBidConsoleItem(defaultParams).then(data => {
      let list = JSON.parse(JSON.stringify(data.data.quoteList));
      list.map(item => {
        (item.operateBtns = [
          {
            id: {
              quoteId: item.sysId,
              bidId: item.sysParentid
            },
            text: "定标",
            type: "approve"
          }
        ]),
          (item.selfscoreTotal = 0);
        item.adminscoreTotal = 0;
        item.totalScore = 0;
        item.scoreList.map(score => {
          item.selfscoreTotal += parseInt(score.selfScore);
          item.adminscoreTotal += parseInt(score.adminScore);
        });
        item.updated = that.$globalFnc.dateStampFormat(item.updated);
        item.totalScore = item.priceScore + item.adminscoreTotal;
      });
      that.tablelistSettings.tableDatas = list;
    });
  }
};
</script>
