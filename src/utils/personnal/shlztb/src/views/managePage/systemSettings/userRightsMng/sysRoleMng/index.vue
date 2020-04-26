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
import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/sysRoleMng/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/sysRoleMng/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/sysRoleMng/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/sysRoleMng/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/sysRoleMng/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/sysRoleMng/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/sysRoleMng/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/sysRoleMng/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/sysRoleMng/dialogRule";

export default {
  name: "sysRoleMng",
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
        tableTitle: "系统角色列表"
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
        containByNames: ["rolename", "roleid"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      dialogEditFormItemslist.map(item => {
        if (item.name == "roleid") {
          item.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "新增系统角色";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.roleid == id) {
          that.dialogFormSettings.dialogFormTitle = "查看系统角色";
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
        if (id instanceof Object) {
          postdata = {
            roleid: id.roleid
          };
        } else {
          postdata = {
            roleid: id
          };
        }
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.roleid == postdata.roleid) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "roleid") {
            item.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑系统角色";
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
            roleids: id
          };
          that.$http(that.$api.deleteRoleList(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.handleSearchSubmit();
            }
          });
        });
      } else if (type == "open" || type == "stop") {
        let status;
        status = type == "open" ? "1" : "0";
        postdata = {
          roleids: id,
          status: status
        };
        that.$http(that.$api.updateRoleStatus(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            this.getDataList();
          }
        });
      } else if (type == "assignMenu" || type == "assignUser") {
        let pathName =
          type == "assignMenu" ? "sysRoleAssignMenu" : "sysRoleAssignUser";
        that.$router.push({
          path: pathName,
          query: {
            roleid: id
          }
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
      if (btn.flag == "edit") {
        delete data.operateBtns;
        delete data.group;
      }
      let options = {
        doActionFncName: "handleSearchSubmit"
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
      that.$getData("getRoleList", postdata).then(data => {
        let operateBtns = [
          {
            text: "编辑",
            type: "edit"
          },
          {
            text: "删除",
            type: "remove"
          },
          {
            text: "启用",
            type: "open",
            showflag: "true"
          },
          {
            text: "禁用",
            type: "stop",
            showflag: "false"
          },
          {
            text: "分配菜单",
            type: "assignMenu"
          },
          {
            text: "分配用户",
            type: "assignUser"
          }
        ];
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getRoleList", postdata).then(xhr => {
            that.$dealData(that, xhr, "roleid", operateBtns, []).then(() => {
              that.tablelistSettings.tableDatas.map(tabledata => {
                let isOpen = tabledata.status == "1" ? "false" : "true",
                  isClose = tabledata.status == "1" ? "true" : "false";
                tabledata.status_dsc =
                  tabledata.status == "1" ? "启用" : "禁用";
                tabledata.operateBtns.map(button => {
                  if (button.type == "open") {
                    button.showflag = isOpen;
                  }
                  if (button.type == "stop") {
                    button.showflag = isClose;
                  }
                });
              });
            });
          });
        } else {
          that.$dealData(that, data, "roleid", operateBtns, []).then(() => {
            that.tablelistSettings.tableDatas.map(tabledata => {
              let isOpen = tabledata.status == "1" ? "false" : "true",
                isClose = tabledata.status == "1" ? "true" : "false";
              tabledata.status_dsc = tabledata.status == "1" ? "启用" : "禁用";
              tabledata.operateBtns.map(button => {
                if (button.type == "open") {
                  button.showflag = isOpen;
                }
                if (button.type == "stop") {
                  button.showflag = isClose;
                }
              });
            });
          });
        }
      });
    }
  },
  mounted() {
    this.handleSearchSubmit();
    this.$getData("getRoleGroupList", {}).then(data => {
      let invoicetypelist = this.$globalFnc.arrayToFormDropdown(
        data.data,
        "groupname",
        "groupid"
      );
      dialogEditFormItemslist.map(item => {
        if (item.name == "groupid") {
          item.data = invoicetypelist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "groupid") {
          item.data = invoicetypelist;
        }
      });
    });
  }
};
</script>
