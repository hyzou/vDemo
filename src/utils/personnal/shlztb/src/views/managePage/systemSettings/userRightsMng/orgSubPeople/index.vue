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
import tableOperationsBtnList from "@/utils/formSettingsJson/orgSubPeople/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/orgSubPeople/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/orgSubPeople/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/orgSubPeople/dialogEditFormBtns.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/orgSubPeople/dialogAddFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/orgSubPeople/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/orgSubPeople/dialogRule";

export default {
  name: "orgSubPeople",
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
        tableTitle: "下属人员列表"
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
      mainOrgId: this.$route.query.orgid
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton() {
      // console.log(dialogFormRules.rule.password[0].required);
      this.dialogFormSettings.dialogFormItems.rules.password[0].required = true;
      this.dialogFormSettings.dialogFormItems.rules.confirmpassword[0].required = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      dialogEditFormItemslist.map(item => {
        if (item.name == "userid") {
          item.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "添加人员信息";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.getDataItemDetail(id).then(data => {
        let userInfo = data.data;
        userInfo.birthdate = that.$globalFnc.dateStampFormat(
          userInfo.birthdate,
          "ymd"
        );
        userInfo.roleids = [];
        if (userInfo.roles && userInfo.roles.length > 0) {
          userInfo.roles.map(role => {
            userInfo.roleids.push(role.roleid);
          });
        }
        userInfo.userid = userInfo.operator.userid;
        userInfo.operatorname = userInfo.operator.operatorname;
        that.dialogFormSettings.dialogFormTitle = "查看人员信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
        that.dialogFormSettings.dialogFormItems.formButtonList = [];
        that.dialogFormSettings.dialogFormItems.formGroupValues = userInfo;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "edit") {
        dialogFormRules.rule.password[0].required = false;
        dialogFormRules.rule.confirmpassword[0].required = false;
        that.getDataItemDetail(id).then(data => {
          let userInfo = data.data;
          userInfo.birthdate = that.$globalFnc.dateStampFormat(
            userInfo.birthdate,
            "ymd"
          );
          userInfo.roleids = [];
          if (userInfo.roles && userInfo.roles.length > 0) {
            userInfo.roles.map(role => {
              userInfo.roleids.push(role.roleid);
            });
          }
          dialogEditFormItemslist.map(item => {
            if (item.name == "userid") {
              item.disabled = true;
            }
          });
          userInfo.userid = userInfo.operator.userid;
          userInfo.operatorname = userInfo.operator.operatorname;
          that.dialogFormSettings.dialogFormTitle = "编辑人员信息";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
          that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
          that.dialogFormSettings.dialogFormItems.formGroupValues = userInfo;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        });
      } else if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            operatorids: id
          };
          that
            .$http(that.$api.deleteOrganizationPeople(), postdata)
            .then(xhr => {
              if (xhr.success) {
                that.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.getDataList();
              }
            });
        });
      }
    },
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList();
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      if (btn.flag == "cancle") {
        this.dialogFormSettings.dialogFormVisible = false;
        return false;
      }
      if (data.password !== data.confirmpassword) {
        this.$message.error("请再次确认您的密码！");
        return false;
      }
      let that = this,
        postdata = {},
        params = JSON.parse(JSON.stringify(data));
      postdata = params;
      postdata["operator.operatorname"] = postdata.operatorname;
      postdata["operator.password"] = postdata.password;
      postdata["operator.userid"] = postdata.userid;
      postdata["createtime"] = postdata.createtime
        ? new Date(postdata.createtime)
        : "";
      postdata["lastmodifytime"] = postdata.lastmodifytime
        ? new Date(postdata.lastmodifytime)
        : "";
      if (btn.flag == "edit") {
        postdata[
          "operatorid"
        ] = this.dialogFormSettings.dialogFormItems.formGroupValues.operatorid;
      }
      delete postdata.operatorname;
      delete postdata.password;
      delete postdata.userid;
      delete postdata.operateBtns;
      delete postdata.operator;
      delete postdata.org;
      let formData = new FormData();
      formData.append("orgid", this.mainOrgId);
      if (postdata.roleids && postdata.roleids.length > 0) {
        postdata.roleids.map(opeId => {
          formData.append("roleids", opeId);
        });
        delete postdata.roleids;
      }
      Object.keys(postdata).forEach(key => {
        if (postdata[key]) {
          formData.append(key, postdata[key]);
        }
      });
      that.$http(that.$api[btn.postUrl]("true"), formData).then(xhr => {
        if (xhr.success) {
          that.dialogFormSettings.dialogFormVisible = false;
          that.$message({
            message: "操作成功！",
            type: "success"
          });
          that.getDataList();
        }
      });
      // .catch(error => {
      //   if (error.msg.indexOf("该条记录已存在") > -1) {
      //     that.$message({
      //       message: "当前用户登录名已存在，请重新编辑",
      //       type: "error"
      //     });
      //   }
      // });
    },
    /* 获取列表数据信息 */
    getDataList() {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage,
          orgid: this.mainOrgId
        };
      that.$getData("getOrganizationPeopleList", postdata).then(data => {
        let formatdata = [
          {
            formated: "birthdate",
            formatFnc: "dateStampFormat",
            type: "ymd",
            needformat: "birthdate"
          }
        ];
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getOrganizationPeopleList", postdata).then(xhr => {
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
            that.$dealData(that, xhr, "operatorid", null, formatdata);
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
          that.$dealData(that, data, "operatorid", null, formatdata);
        }
      });
    },
    getNopageRolelist() {
      this.$getData("getRoleListNopage", {}).then(data => {
        let rolelist = [];
        if (data.data && data.data.length > 0) {
          data.data.map(row => {
            let roleItem = {};
            roleItem.key = row.roleid;
            roleItem.label = row.rolename;
            rolelist.push(roleItem);
          });
        }
        dialogEditFormItemslist.map(item => {
          if (item.name == "roleids") {
            item.data = rolelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "roleids") {
            let disabledRolelist = JSON.parse(JSON.stringify(rolelist));
            disabledRolelist.map(role => {
              role.disabled = true;
            });
            item.data = disabledRolelist;
          }
        });
      });
    },
    getDataItemDetail(id) {
      let that = this,
        postdata = {
          operatorid: id
        },
        promise = new Promise(resolve => {
          that.$getData("getOrganizationPeopleDetail", postdata).then(data => {
            resolve(data);
          });
        });
      return promise;
    }
  },
  mounted() {
    this.getDataList();
    this.getNopageRolelist();
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "BNDICT_education"
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
      dialogEditFormItemslist.map(item => {
        if (item.name == "degree") {
          item.data = datalist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "degree") {
          item.data = datalist;
        }
      });
    });

    // this.$getData("PortalDropdownlist", {
    //   _refKey: "dict",
    //   busintypeid: "BNDICT_gender"
    // }).then(data => {
    //   let datalist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
    //   dialogEditFormItemslist.map(item => {
    //     if (item.name == "gender") {
    //       item.data = datalist;
    //     }
    //   });
    //   dialogViewFormItems.map(item => {
    //     if (item.name == "gender") {
    //       item.data = datalist;
    //     }
    //   });
    // });
  }
};
</script>
