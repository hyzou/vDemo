<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('sysRoleMng')"
        >
          <i class="el-icon-arrow-left"></i>
          返回系统角色管理页面
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
import tableOperationsBtnList from "@/utils/formSettingsJson/sysRoleAssignUser/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/sysRoleAssignUser/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/sysRoleAssignUser/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/sysRoleAssignUser/dialogAddFormBtns.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/sysRoleAssignUser/dialogRule";

export default {
  name: "sysRoleAssignUser",
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
        tableTitle: "系统角色分配人员列表"
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
          rowKey: "operatorid",
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
      mainRoleId: this.$route.query.roleid
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "系统角色分配人员";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            operatorids: id,
            roleid: this.mainRoleId
          };
          that.$http(that.$api.deleteUserOfRole(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.tradeInformationList();
              that.getUserlistForRole();
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
      if (btn.flag == "cancle") {
        this.dialogFormSettings.dialogFormVisible = false;
        return false;
      }
      let that = this,
        formData = new FormData();
      formData.append("roleid", this.mainRoleId);
      if (data.operatorids && data.operatorids.length > 0)
        data.operatorids.map(opeId => {
          formData.append("operatorids", opeId);
        });
      that.$http(that.$api[btn.postUrl]("true"), formData).then(xhr => {
        if (xhr.success) {
          that.dialogFormSettings.dialogFormVisible = false;
          that.$message({
            message: "操作成功！",
            type: "success"
          });
          that.tradeInformationList();
          that.getUserlistForRole();
        }
      });
    },
    /* 获取列表数据信息 */
    tradeInformationList() {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage,
          roleid: this.mainRoleId
        };
      that.$getData("getUserOfRole", postdata).then(data => {
        let operateBtns = [
          {
            text: "删除",
            type: "remove"
          }
        ];
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getUserOfRole", postdata).then(xhr => {
            if (xhr.rows && xhr.rows.length > 0) {
              xhr.rows.map(row => {
                row.operatorname = row.operator.operatorname;
                row.typeName = row.operator.typeName;
                row.userid = row.operator.userid;
                row.userStatus_dsp =
                  row.operator.status == "1" ? "启用" : "禁用";
                row.rolename = row.role.rolename;
              });
            }
            that.$dealData(that, xhr, "operatorid", operateBtns, []);
          });
        } else {
          if (data.rows && data.rows.length > 0) {
            data.rows.map(row => {
              row.operatorname = row.operator.operatorname;
              row.typeName = row.operator.typeName;
              row.userid = row.operator.userid;
              row.userStatus_dsp = row.operator.status == "1" ? "启用" : "禁用";
              row.rolename = row.role.rolename;
            });
          }
          that.$dealData(that, data, "operatorid", operateBtns, []);
        }
      });
    },
    getUserlistForRole() {
      let postdata = {
        roleid: this.mainRoleId
      };
      this.$getData("getUserlistForRole", postdata).then(xhr => {
        let userlist = [];
        if (xhr.rows && xhr.rows.length > 0) {
          xhr.rows.map(row => {
            let userItem = {};
            userItem.value = row.operatorid.toString(); //.toString()
            userItem.label = row.operatorname;
            userlist.push(userItem);
          });
        }
        // let userlist = this.$globalFnc.arrayToFormDropdown(
        //   xhr.rows,
        //   "operatorname",
        //   "operatorid"
        // );
        dialogEditFormItemslist.map(item => {
          if (item.name == "operatorids") {
            item.data = userlist;
          }
        });
      });
    }
  },
  mounted() {
    this.tradeInformationList();
    this.getUserlistForRole();
  }
};
</script>
