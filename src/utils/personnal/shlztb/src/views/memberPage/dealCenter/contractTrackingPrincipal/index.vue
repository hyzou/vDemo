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
import searchFormBtnList from "@/utils/formSettingsJson/contractTracking/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/contractTracking/searchFormItemsWithoutCode.json";
import tableHeaderOpts from "@/utils/formSettingsJson/contractTracking/tableHeaderOptWithBtns.json";
import dialogAddFormBtns from "@/utils/formSettingsJson/contractTracking/dialogAddFormBtns.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/contractTracking/dialogFormItems.json";
import dialogCommentFormBtns from "@/utils/formSettingsJson/contractTracking/dialogCommentFormBtns.json";
import dialogCommentFormItemslist from "@/utils/formSettingsJson/contractTracking/dialogCommentFormItemslist.json";
import dialogViewComments from "@/utils/formSettingsJson/contractTracking/dialogViewComments.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";
import ViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/contractTracking/dialogRule";

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
          hasExpandContent: true,
          expandContent: "contractList",
          expandContentLables: [
            {
              key: "code",
              value: "合同编号"
            },
            {
              key: "isfinish",
              value: "本次收货确认情况"
            },
            {
              key: "sendnumUnit",
              value: "本次发送数量"
            }
          ],
          tooltipEffect: "dark",
          rowKey: "sysId",
          border: true,
          defaultExpandAll: false,
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
          formGroupList: dialogEditFormItemslist,
          formGroupValues: {},
          formButtonList: [],
          rules: dialogFormRules.rule
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
    handleTableItem(id, type) {
      let that = this;
      this.$getData("getBidTargetItemInfo", { sysId: id }).then(data => {
        let tabledata = data.data;
        if (type == "project") {
          that.dialogFormSettings.dialogFormTitle = "查看专场";
          that.dialogFormSettings.dialogFormItems.formGroupList = ViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          tabledata.project.registerEndtime = that.$globalFnc.dateStampFormat(
            tabledata.project.registerEndtime
          );
          tabledata.project.contractDuedate = that.$globalFnc.dateStampFormat(
            tabledata.project.contractDuedate
          );
          tabledata.project.tradeBegintime = that.$globalFnc.dateStampFormat(
            tabledata.project.tradeBegintime
          );
          tabledata.project.tradeEndtime = that.$globalFnc.dateStampFormat(
            tabledata.project.tradeEndtime
          );
          if (
            tabledata.project.projectLimit &&
            tabledata.project.projectLimit.bidders
          ) {
            tabledata.project.available =
              tabledata.project.projectLimit.available;
            if (tabledata.project.available == "Y") {
              tabledata.project.allowMembers = tabledata.project.projectLimit.bidders.split(
                ","
              );
              tabledata.project.notallowMembers = [];
            } else {
              tabledata.project.notallowMembers = tabledata.project.projectLimit.bidders.split(
                ","
              );
              tabledata.project.allowMembers = [];
            }
          }
          that.dialogFormSettings.dialogFormItems.formGroupValues =
            tabledata.project;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        } else {
          that.dialogFormSettings.dialogFormTitle = "查看标的";
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
      if (type == "confirm") {
        this.$router.push({
          path: id.path,
          query: {
            parentSysId: id.sysSourceid,
            parentUnit: id.unit
          }
        });
      } else if (type == "comment") {
        this.dialogFormSettings.dialogFormTitle = "我的评价";
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogCommentFormItemslist;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogCommentFormBtns;
        this.dialogFormSettings.dialogFormItems.formGroupValues = id;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      } else if (type == "viewComment") {
        this.dialogFormSettings.dialogFormTitle = "查看评价";
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogViewComments;
        this.dialogFormSettings.dialogFormItems.formButtonList = [];
        this.dialogFormSettings.dialogFormItems.formGroupValues = id;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      } else if (type == "addContractAttract") {
        this.dialogFormSettings.dialogFormTitle = "交付信息";
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogAddFormBtns;
        this.dialogFormSettings.dialogFormItems.formGroupValues = id;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      } else {
        let confirmNotice = "您正在执行完成合同操作，是否继续?";
        if (id.needConfirm == "true") {
          confirmNotice =
            "当前存在<span class='text-danger'>收货方未确认</span>的合同项，您确定要完成合同吗";
        }
        this.$confirm(confirmNotice, "提示", {
          confirmButtonText: "继续完成合同",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }).then(() => {
          this.$getData(type, id).then(() => {
            this.$message.success("操作成功！");
            this.handleSearchSubmit();
          });
        });
      }
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
      that.$http(that.$api[btn.postUrl](), postdata).then(() => {
        that.dialogFormSettings.dialogFormVisible = false;
        that.$message({
          message: "操作成功！",
          type: "success"
        });
        that.handleSearchSubmit();
      });
    },
    /* 分页获取列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        };
      if (query && typeof query === "object") {
        if (query.filterRules) {
          query.filterRules.map(item => {
            postdata[item.field] = item.value;
          });
        }
      }
      that.$getData("getPrincipalContractAttractList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that
            .$getData("getPrincipalContractAttractList", postdata)
            .then(xhr => {
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
          let deliveryFlag = true,
            operateBtns = [];
          item.status_dsp = "交易中";
          item.numUnit = item.num + (item.munit == "kg" ? "千克" : "吨");
          item.finishnumUnit =
            item.finishnum + (item.munit == "kg" ? "千克" : "吨");
          item.needConfirm = "false";
          if (item.type == "02" || item.type == "11") {
            if (item.contractList && item.contractList.length > 0) {
              item.contractList.map(contract => {
                contract.isfinish = "已确认";
                contract.sendnumUnit =
                  contract.sendnum + (item.munit == "kg" ? "千克" : "吨");
                if (contract.status == "94") {
                  deliveryFlag = false;
                  item.status_dsp = "已完成";
                } else if (contract.status == "50") {
                  item.needConfirm = "true";
                  contract.isfinish = "未确认";
                }
              });
            }
            if (
              deliveryFlag ||
              !item.contractList ||
              item.contractList.length < 1
            ) {
              if (item.num == item.finishnum) {
                operateBtns.push({
                  id: {
                    sysSourceid: item.sysId,
                    needConfirm: item.needConfirm
                  },
                  text: "合同完成",
                  type: "endContractAttract"
                });
              } else {
                operateBtns.push({
                  id: {
                    sysSourceid: item.sysId
                  },
                  text: "交付",
                  type: "addContractAttract"
                });
              }
            }
          } else if (item.type == "01" || item.type == "10") {
            if (item.contractList && item.contractList.length > 0) {
              item.contractList.map(contract => {
                contract.isfinish = "已确认";
                contract.sendnumUnit =
                  contract.sendnum + (item.munit == "kg" ? "千克" : "吨");
                if (contract.status == "94") {
                  item.status_dsp = "已完成";
                  deliveryFlag = false;
                } else if (contract.status == "50") {
                  contract.isfinish = "未确认";
                }
              });
            }
            if (
              deliveryFlag &&
              item.contractList &&
              item.contractList.length > 0
            ) {
              let confirmBtnFlag = false;
              item.contractList.map(contract => {
                if (contract.status == "50") {
                  confirmBtnFlag = true;
                }
              });
              if (confirmBtnFlag) {
                operateBtns.push({
                  id: {
                    sysSourceid: item.sysId,
                    unit: item.munit,
                    path: "contractTrackingConfirmList"
                  },
                  text: "待确认",
                  type: "confirm"
                });
              }
            }
          }
          if (item.status_dsp == "已完成") {
            if (
              !item.evaluateList ||
              item.evaluateList.length == 0 ||
              (item.evaluateList.length == 1 &&
                item.evaluateList[0].valuerid !==
                  this.$store.getters.userInfo.memberId)
            ) {
              operateBtns.push({
                id: {
                  sysSourceid: item.sysId
                },
                text: "去评价",
                type: "comment"
              });
            } else {
              operateBtns.push({
                id: {
                  sysSourceid: item.sysId,
                  commentlist: item.evaluateList
                },
                text: "查看评价",
                type: "viewComment"
              });
            }
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
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "web_portal_infostatus"
      })
      .then(data => {
        let statuslist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "status") {
            item.data = statuslist;
          }
        });
      });
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
        dialogViewFormItems.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
      });
    // 获取委托方列表
    this.$getData("PortalDropdownlist", {
      _refKey: "member",
      memType: 2,
      _noCache: "true"
    }).then(data => {
      let memberlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      ViewFormItems.map(item => {
        if (item.name == "clientid") {
          item.data = memberlist;
        }
      });
    });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        _noCache: "true",
        memType: "3"
      })
      .then(data => {
        let clientlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        ViewFormItems.map(formItem => {
          if (formItem.name == "allowMembers") {
            formItem.data = clientlist;
          }
        });
        ViewFormItems.map(formItem => {
          if (formItem.name == "notallowMembers") {
            formItem.data = clientlist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_auction_protype"
      })
      .then(data => {
        let typelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        ViewFormItems.map(item => {
          if (item.name == "type") {
            item.data = typelist;
          }
        });
      });
    this.$getData("businessParamsList", {
      page: 1,
      rows: 1000,
      filterRules: JSON.stringify([{ field: "type", value: "1", op: "equal" }])
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(
        data.rows,
        "name",
        "code"
      );
      ViewFormItems.map(formItem => {
        if (formItem.name == "calcExpCode") {
          formItem.data = datalist;
        }
      });
    });
  }
};
</script>
