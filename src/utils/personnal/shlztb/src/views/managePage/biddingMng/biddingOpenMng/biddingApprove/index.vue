<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('biddingApproveTargerList')"
        >
          <i class="el-icon-arrow-left"></i>
          返回待评标列表页
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
import tableOperationsBtnList from "@/utils/formSettingsJson/biddingApprove/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingApprove/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/biddingApprove/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/biddingApprove/dialogEditFormBtns.json";
// 校验规则
import dialogFormRules from "@/utils/formRulesJson/biddingApprove/dialogRule";

export default {
  name: "biddingApprove",
  components: {
    commonTitleWithBorder,
    operateButtonsGroup,
    tableList,
    dialogForm
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        tableTitle: "待评标会员列表"
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
      },
      // 标的详情数据
      targetData: {}
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
          this.$alert("您已完成评标！", "操作成功！", {
            confirmButtonText: "确定",
            callback: () => {
              this.$router.push({
                path:
                  "/managePage/biddingMng/biddingOpenMng/biddingApproveTargerList"
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
        let dialogData = {},
          copyItem,
          scoreArry = [];
        that.tablelistSettings.tableDatas.map(item => {
          if (item.sysId == id) {
            copyItem = JSON.parse(JSON.stringify(item));
          }
        });
        for (let i = 0; i < copyItem.scoreList.length; i++) {
          let selfscore = copyItem.scoreList[i];
          for (
            let j = 0;
            j < that.targetData.project.projectScoreList.length;
            j++
          ) {
            let score = that.targetData.project.projectScoreList[j];
            if (score.sysId == selfscore.projectStoreId) {
              let newObj = {};
              newObj.adminScore = selfscore.adminScore;
              newObj.selfScore = selfscore.selfScore;
              newObj.bidScoreId = selfscore.sysId;
              newObj.itemName = score.itemName;
              newObj.itemStandard = score.itemStandard;
              newObj.itemScore = score.itemScore;
              scoreArry.push(newObj);
              break;
            }
          }
        }
        dialogData.scoreListStr = scoreArry;
        dialogData.projectId = that.targetData.project.sysId;
        dialogData.sysId = copyItem.sysId;
        dialogData.viewfiles = copyItem.viewfiles;
        delete dialogData.scoreList;
        that.dialogFormSettings.dialogFormTitle = "评标";
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
          that
            .getBidConsoleItem({ sysId: that.$route.query.parentSysId })
            .then(data => {
              let list = JSON.parse(JSON.stringify(data.data.quoteList));
              that.targetData = JSON.parse(JSON.stringify(data.data));
              list.map(item => {
                (item.operateBtns = [
                  {
                    id: item.sysId,
                    text: "评标",
                    type: "approve"
                  }
                ]),
                  (item.selfscoreTotal = 0);
                item.adminscoreTotal = 0;
                item.totalScore = 0;
                item.scoreList.map(score => {
                  if (!score.adminScore) {
                    score.adminScore = 0;
                  }
                  item.selfscoreTotal += parseInt(score.selfScore);
                  item.adminscoreTotal += parseInt(score.adminScore);
                });
                item.totalScore = item.priceScore + item.adminscoreTotal;
                item.updated = that.$globalFnc.dateStampFormat(item.updated);
              });
              that.tablelistSettings.tableDatas = list;
            });
        }
      });
    },
    /* 获取待评分标的详情 */
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
      that.targetData = JSON.parse(JSON.stringify(data.data));
      list.map(item => {
        (item.operateBtns = [
          {
            id: item.sysId,
            text: "评标",
            type: "approve"
          }
        ]),
          (item.selfscoreTotal = 0);
        item.adminscoreTotal = 0;
        item.totalScore = 0;
        item.scoreList.map(score => {
          if (score.adminScore) {
            item.adminscoreTotal += parseInt(score.adminScore);
          }
          item.selfscoreTotal += parseInt(score.selfScore);
        });
        item.totalScore = item.priceScore + item.adminscoreTotal;
        item.updated = that.$globalFnc.dateStampFormat(item.updated);
        if (item.enroll && item.enroll.files) {
          item.viewfiles = that.$globalFnc.fileFormat(
            item.enroll.files,
            "officeViewUrl"
          );
        }
      });
      that.tablelistSettings.tableDatas = list;
    });
    // 获取项目列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "project",
        _noCache: "true"
      })
      .then(data => {
        let projectlist = this.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(item => {
          if (item.name == "projectId") {
            item.data = projectlist;
          }
        });
      });
  }
};
</script>
