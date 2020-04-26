<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="title" />
          </el-col>
          <el-row>
            <el-col :span="12" :offset="6">
              <idCard class="managerInfo" :data="userInfo" />
            </el-col>
          </el-row>
          <el-row class="pt20">
            <el-col :span="12" :offset="6">
              <div class="textAlignCenter">
                <operateButtonsGroup
                  :operateButtonsSettings="operateButtonsSettings"
                  @handleOperateButton="handleOperateButton"
                />
              </div>
            </el-col>
          </el-row>
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
import idCard from "@/components/idCard";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import dialogForm from "@/components/dialog/dialogForm";
//数据配置项引入
import tableOperationsBtnList from "@/utils/formSettingsJson/personalInfo/operationBtns.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/personalInfo/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/personalInfo/dialogEditFormBtns.json";

export default {
  name: "personalInfo",
  components: {
    commonTitleWithBorder,
    idCard,
    operateButtonsGroup,
    dialogForm
  },
  data() {
    return {
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
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
          // rules: dialogFormRules.rule
        }
      },
      ticketType: [],
      title: "个人信息",
      dialogInfo: {},
      userInfo: {
        data: [
          {
            key: "姓名",
            flag: "operatorname",
            value: ""
          },
          {
            key: "性别",
            flag: "genderName",
            value: ""
          },
          {
            key: "生日",
            flag: "birthdate",
            value: ""
          },
          {
            key: "学历",
            flag: "degreeName",
            value: ""
          },
          {
            key: "电话号码",
            flag: "otel1",
            value: ""
          },
          {
            key: "手机号码",
            flag: "mobileno",
            value: ""
          }
        ]
      }
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "修改账户信息";
      this.dialogFormSettings.dialogFormItems.formGroupValues = this.dialogInfo;
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "getMemberInfo"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取会员信息 */
    getMemberInfo() {
      let that = this,
        postdata = {
          operatorid: this.$store.getters.userInfo.userId
        };
      that.$http(that.$api.getManagerInfo(), postdata, true).then(xhr => {
        // xhr.data.managerName = that.$store.getters.userInfo.name;
        xhr.data.operatorname = xhr.data.operator.operatorname;
        xhr.data.birthdate = this.$globalFnc.dateStampFormat(
          xhr.data.birthdate,
          "ymd"
        );
        that.dialogInfo = xhr.data;
        that.ticketType.map(ticket => {
          if (ticket.value == xhr.data.invoicetype) {
            xhr.data.ticketName = ticket.text;
          }
        });
        that.userInfo.data.map(item => {
          item.value = xhr.data[item.flag];
        });
        that.$store.dispatch("setUserInfo", postdata, true);
      });
    }
  },
  mounted() {
    let that = this;
    that.getMemberInfo();
    // 学历
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "BNDICT_education"
      })
      .then(data => {
        let datalist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(formItem => {
          if (formItem.name == "degree") {
            formItem.data = datalist;
          }
        });
      });
    // 性别
    // that
    //   .$getData("PortalDropdownlist", {
    //     _refKey: "dict",
    //     busintypeid: "BNDICT_gender"
    //   })
    //   .then(data => {
    //     let datalist = that.$globalFnc.arrayToFormDropdown(
    //       data,
    //       "text",
    //       "value"
    //     );
    //     dialogEditFormItemslist.map(formItem => {
    //       if (formItem.name == "gender") {
    //         formItem.data = datalist;
    //       }
    //     });
    //   });
  }
};
</script>
