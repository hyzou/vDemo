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
          返回定标管理
        </el-link>
      </el-col>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import tableOperationsBtnList from "@/utils/formSettingsJson/biddingSure/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingSure/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/biddingSure/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/biddingSure/dialogEditFormBtns.json";
// 校验规则
import dialogFormRules from "@/utils/formRulesJson/biddingSure/dialogRule";

export default {
  name: "biddingSure",
  components: {
    commonTitleWithBorder,
    operateButtonsGroup,
    tableList,
    dialogForm
  },
  data() {
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "成交确认书管理",
            name: "salesConfirmation"
          }
        ]
      },
      /**
       * titles 标题管理
       */
      titles: {
        tableTitle: "待定标会员列表"
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
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      }
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton() {
      let postdata = {};
      postdata.processinstId = this.$route.query.parentProcessinstId;
      postdata.sysId = this.$route.query.parentSysId;
      postdata.taskId = this.$route.query.parentTaskId;
      postdata.userAction = "complete";
      this.$http(
        this.$api.flowBidConsoleItem(this.$route.query.gptype),
        postdata
      ).then(xhr => {
        if (xhr.success) {
          this.$alert("您已完成定标！", "操作成功！", {
            confirmButtonText: "确定",
            callback: () => {
              this.$router.push({
                path: "/memberPage/dealCenter/biddingSureTargerList"
              });
            }
          });
        }
      });
    },
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
      let options = {
        doActionFncName: ""
      };
      this.$dialogformBtnAction(this, data, btn, options).then(() => {
        if (this.$route.query.parentSysId) {
          let defaultParams = {
            sysId: this.$route.query.parentSysId
          };
          setTimeout(() => {
            this.getBidConsoleItem(defaultParams);
          }, 500);
        }
      });
    },
    /* 获取待定标数据详情 */
    getBidConsoleItem(params) {
      let that = this;
      that.$getData("getBidTargetItemInfo", params).then(data => {
        let winQuoteId, optionalQuoteid;
        if (data.data.winQuoteid) {
          winQuoteId = data.data.winQuoteid;
        }
        if (data.data.optionalQuoteid) {
          optionalQuoteid = data.data.optionalQuoteid;
        }
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
          if (item.sysId == optionalQuoteid) {
            item.winCompany = "备选";
          } else if (item.sysId == winQuoteId) {
            item.winCompany = "中标";
          } else {
            item.winCompany = "未中标";
          }
        });
        that.tablelistSettings.tableDatas = list;
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
      this.getBidConsoleItem(defaultParams);
    }
  }
};
</script>
