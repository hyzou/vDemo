<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('orgPeopleMng')"
        >
          <i class="el-icon-arrow-left"></i>
          返回机构管理页面
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
import pagination from "@/components/pagination";
// 配置数据引入
import tableOperationsBtnList from "@/utils/formSettingsJson/orgSubOrgs/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/orgSubOrgs/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/orgSubOrgs/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/orgSubOrgs/dialogEditFormBtns.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/orgSubOrgs/dialogAddFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/orgSubOrgs/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/orgSubOrgs/dialogRule";

export default {
  name: "orgSubOrgs",
  components: {
    commonTitleWithBorder,
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
        tableTitle: "下属机构列表"
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
          rowKey: "orgid",
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
      page: 1,
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
      mainOrgId: this.$route.query.orgid
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton() {
      dialogEditFormItemslist.map(dialog => {
        if (dialog.name == "orgcode") {
          dialog.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "添加机构信息";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.orgid == id) {
          that.dialogFormSettings.dialogFormTitle = "查看机构信息";
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
        postdata = {
          orgid: id
        };
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.orgid == postdata.orgid) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(dialog => {
          if (dialog.name == "orgcode") {
            dialog.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑机构信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            orgids: id,
            parentorgid: this.mainOrgId
          };
          that.$http(that.$api.deleteOrganization(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              this.tradeInformationList();
            }
          });
        });
      }
    },
    handlePaginationPagenumber(num) {
      this.page = num;
      this.tradeInformationList();
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      data.parentorgid = this.mainOrgId;
      let options = {
        doActionFncName: "tradeInformationList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取列表数据信息 */
    tradeInformationList() {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage,
          orgid: this.mainOrgId
        };
      that.$getData("getOrganizationOrgList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getOrganizationOrgList", postdata).then(xhr => {
            // if (xhr.rows && xhr.rows.length > 0) {
            //   xhr.rows.map(row => {
            //     row.operatorname = row.operator.operatorname;
            //     row.typeName = row.operator.typeName;
            //     row.userid = row.operator.userid;
            //     row.userStatus_dsp =
            //       row.operator.status == "1" ? "启用" : "禁用";
            //     row.rolename = row.role.rolename;
            //   });
            // }
            that.$dealData(that, xhr, "orgid", null, []);
          });
        } else {
          // if (data.rows && data.rows.length > 0) {
          //   data.rows.map(row => {
          //     row.operatorname = row.operator.operatorname;
          //     row.typeName = row.operator.typeName;
          //     row.userid = row.operator.userid;
          //     row.userStatus_dsp = row.operator.status == "1" ? "启用" : "禁用";
          //     row.rolename = row.role.rolename;
          //   });
          // }
          that.$dealData(that, data, "orgid", null, []);
        }
      });
    }
  },
  mounted() {
    this.tradeInformationList();
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "ts_auction_ownerfund"
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
      dialogViewFormItems.map(item => {
        if (item.name == "flagFund") {
          item.data = datalist;
        }
      });
      dialogEditFormItemslist.map(item => {
        if (item.name == "flagFund") {
          item.data = datalist;
        }
      });
    });
    this.$getData("getOrganizationPeopleList", {
      page: 1,
      rows: 1000,
      filterRules: JSON.stringify([{ field: "type", value: "1", op: "equal" }])
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(
        data.rows,
        "operatorname",
        "operatorid"
      );
      dialogEditFormItemslist.map(item => {
        if (item.name == "managerid") {
          item.data = datalist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "managerid") {
          item.data = datalist;
        }
      });
    });
    // this.$getData("PortalDropdownlist", {
    //   _refKey: "dict",
    //   busintypeid: "ts_auction_orgtype"
    // }).then(data => {
    //   let datalist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
    //   dialogEditFormItemslist.map(item => {
    //     if (item.name == "orgtypeid") {
    //       item.data = datalist;
    //     }
    //   });
    // });
  }
};
</script>
