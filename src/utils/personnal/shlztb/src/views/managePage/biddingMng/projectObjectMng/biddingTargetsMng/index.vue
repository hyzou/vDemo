<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24" v-if="$route.params.parentSysId">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('biddingProjectMng')"
        >
          <i class="el-icon-arrow-left"></i>
          返回专场管理页面
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
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/biddingTargetsMng/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/biddingTargetsMng/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/biddingTargetsMng/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingTargetsMng/tableHeaderOpt.json";
import dialogaddFormItemslist from "@/utils/formSettingsJson/biddingTargetsMng/dialogAddFormItems.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/biddingTargetsMng/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/biddingTargetsMng/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/biddingTargetsMng/dialogEditFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/biddingTargetsMng/dialogRule";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";
import ViewFormItems from "@/utils/formSettingsJson/biddingProjectMng/dialogViewFormItems.json";
// import ViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/viewFormItems.json";
export default {
  name: "biddingTargetsMng",
  components: {
    commonTitleWithBorder,
    formGroup,
    operateButtonsGroup,
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
        tableTitle: "标的列表"
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
      page: 1,
      /**
       * clientlist 委托单位列表
       */
      clientlist: [],
      /**
       * 专场模式
       */
      specialType: "",
      /**
       * 标的属性列表
       */
      attrList: []
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name", "no"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton(data) {
      let that = this;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        sysParentid: "",
        propListStr: [
          {
            name: "",
            code: "",
            value: ""
          }
        ]
      };
      if (data.parentSysId) {
        this.dialogFormSettings.dialogFormItems.formGroupValues.sysParentid =
          data.parentSysId;
      }
      dialogaddFormItemslist.map(item => {
        if (
          item.name == "delay" ||
          item.name == "delayscreen" ||
          item.name == "rangeprice"
        ) {
          item.hideItem =
            that.specialType == "10" || that.specialType == "11" ? true : false;
        }
        if (item.name == "highestprice") {
          item.hideItem =
            that.specialType == "02" || that.specialType == "11" ? true : false;
        }
        if (item.name == "lowestprice") {
          item.hideItem =
            that.specialType == "02" || that.specialType == "11" ? false : true;
        }
        if (item.name == "sysParentid") {
          item.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "添加标的信息表";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogaddFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id, type) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (type !== "target" && tabledata.sysId == id) {
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
        } else if (type == "target" && tabledata.sysId == id) {
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
      let that = this,
        postdata;
      if (type == "edit") {
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        that.getSpecialDetail(dialogData.sysParentid).then(() => {
          dialogEditFormItemslist.map(item => {
            if (
              item.name == "delay" ||
              item.name == "delayscreen" ||
              item.name == "rangeprice"
            ) {
              item.hideItem =
                that.specialType == "10" || that.specialType == "11"
                  ? true
                  : false;
            }
            if (item.name == "highestprice") {
              item.hideItem =
                that.specialType == "02" || that.specialType == "11"
                  ? true
                  : false;
            }
            if (item.name == "lowestprice") {
              item.hideItem =
                that.specialType == "02" || that.specialType == "11"
                  ? false
                  : true;
            }
            if (item.name == "sysParentid") {
              item.disabled = true;
            }
          });
          dialogViewFormItems.map(item => {
            if (
              item.name == "delay" ||
              item.name == "delayscreen" ||
              item.name == "rangeprice"
            ) {
              item.hideItem =
                that.specialType == "10" || that.specialType == "11"
                  ? true
                  : false;
            }
            if (item.name == "highestprice") {
              item.hideItem =
                that.specialType == "02" || that.specialType == "11"
                  ? true
                  : false;
            }
            if (item.name == "lowestprice") {
              item.hideItem =
                that.specialType == "02" || that.specialType == "11"
                  ? false
                  : true;
            }
            if (item.name == "sysParentid") {
              item.disabled = true;
            }
          });
        });
        delete dialogData.project;
        delete dialogData.operateBtns;
        dialogData.propListStr = dialogData.propList;
        that.dialogFormSettings.dialogFormTitle = "编辑标的信息表";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else {
        postdata = {
          sysId: id
        };
        that.$http(that.$api.deleteBidTarget(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.getDataList();
          }
        });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, data) {
      let that = this;
      if (link == "propListStr") {
        that.attrList.map(attr => {
          if (attr.sysCode == data) {
            attr.detailList.map(detail => {
              detail.code = detail.detailCode;
              // delete detail.detailCode;
              detail.name = detail.detailName;
              // delete detail.detailName;
              detail.value = "";
            });
            that.dialogFormSettings.dialogFormItems.formGroupValues.propListStr = that.$vueCopy(
              attr.detailList
            );
            return false;
          }
        });
      } else {
        if (!data) {
          return false;
        }
        this.getSpecialDetail(data).then(() => {
          that.dialogFormSettings.dialogFormItems.formGroupList.map(item => {
            if (
              item.name == "delay" ||
              item.name == "delayscreen" ||
              item.name == "rangeprice"
            ) {
              item.hideItem =
                that.specialType == "10" || that.specialType == "11"
                  ? true
                  : false;
            }
            if (item.name == "highestprice") {
              item.hideItem =
                that.specialType == "02" || that.specialType == "11"
                  ? true
                  : false;
            }
            if (item.name == "lowestprice") {
              item.hideItem =
                that.specialType == "02" || that.specialType == "11"
                  ? false
                  : true;
            }
            if (item.name == "sysParentid") {
              item.disabled = false;
            }
          });
          // that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        });
      }
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
          doActionFncName: "getDataList"
        },
        falseFlag = true;
      if (data.propListStr && data.propListStr.length > 0) {
        if (
          data.propListStr.length == 1 &&
          !data.propListStr[0].code &&
          !data.propListStr[0].name &&
          !data.propListStr[0].value
        ) {
          data.propListStr = [];
          falseFlag = true;
        } else {
          data.propListStr.map(prop => {
            if (prop.code && prop.name && prop.value) {
              falseFlag = true;
            } else {
              falseFlag = false;
            }
          });
        }
      }
      if (falseFlag) {
        this.$dialogformBtnAction(this, data, btn, options);
      } else {
        this.$message.error("请完善您创建的每条标的属性信息！");
        return false;
      }
      //
    },
    /* 获取数据列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: this.page,
          rows: that.$global.numberPerpage
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$http(that.$api.getBidTargetList(), postdata, true).then(xhr => {
        if (xhr) {
          if (!xhr.rows) {
            return false;
          }
          xhr.rows.map(item => {
            item.projectName =
              item.project && item.project.name ? item.project.name : "";
            item.numUnit =
              item.num + (item.project.munit == "kg" ? "千克" : "吨");
            if (item.winQuoteid) {
              item.winQuoteScore = item.winQuote.price;
              item.winCompany = item.winQuote.biddername;
            }
            if (!item.propList || item.propList.length == 0) {
              item.propList = [
                {
                  name: "",
                  code: "",
                  value: ""
                }
              ];
            }
            item.propListStr = item.propList;
            let operateBtns = [
              {
                id: item.sysId,
                text: "编辑",
                type: "edit"
              },
              {
                id: item.sysId,
                text: "删除",
                type: "remove"
              }
            ];
            if (item.status == "setBid") {
              item.operateBtns = operateBtns;
            }
          });
          that.tablelistSettings.tableDatas = xhr.rows;
          that.paginationSettings.totalNumbers = parseInt(xhr.total);
        }
      });
    },
    /* 获取专场信息 */
    getSpecialDetail(id) {
      let that = this;
      let promise = new Promise((resolve, reject) => {
        that
          .$getData("getSpecialItemInfomation", {
            sysId: id
          })
          .then(data => {
            that.specialType = data.data.type;
            resolve(data);
          })
          .catch(response => {
            reject(response);
          });
      });
      return promise;
    }
  },
  mounted() {
    let that = this;
    if (that.$route.params.parentSysId) {
      that.getSpecialDetail(that.$route.params.parentSysId).then(() => {
        that.handleOperateButton(that.$route.params);
      });
    }
    this.getDataList();
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
        dialogEditFormItemslist.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "project",
        _noCache: "true",
        status: "setBid"
      })
      .then(data => {
        let projectlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogaddFormItemslist.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_auction_bidstatus"
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
    that
      .$getData("getBidTargetSettingList", {
        page: 1,
        rows: 100
      })
      .then(data => {
        let datalist = that.$globalFnc.arrayToFormDropdown(
          data.rows,
          "name",
          "sysCode"
        );
        that.attrList = datalist;
        dialogaddFormItemslist.map(item => {
          if (item.name == "propCode") {
            item.data = datalist;
          }
        });
      });
  }
};
</script>
