<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <tabCard class="tab-container" :tabSettings="tabSettings" />
        <div class="table-container">
          <el-row>
            <el-col :span="24" v-if="$store.getters.userInfo.type == '3'">
              <el-alert
                v-if="passflag == 'adjustMemberInfo'"
                class="mt10 mb10"
                title="抱歉，您的注册申请未通过审核，请点击下方修改按钮修改您的会员信息"
                type="error"
                effect="dark"
              >
              </el-alert>
              <el-alert
                v-if="passflag == 'handleRegister'"
                class="mt10 mb10"
                title="您的注册申请正在审批中，您目前暂不能参与任何交易活动，请谅解"
                type="warning"
                effect="dark"
              >
              </el-alert>
            </el-col>
          </el-row>
          <el-row class="mt15 mb15 pl10">
            <el-col>
              登录用户名：<span class=" text-primary">{{ loginName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="12"
              v-for="(member, index) in memberInfo"
              :key="index"
            >
              <commonTitleWithBorder :title="member.title" />
              <idCard :data="member" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
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
import tabCard from "@/components/tabCard";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import idCard from "@/components/idCard";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import dialogForm from "@/components/dialog/dialogForm";

// 配置数据引入
import tableOperationsBtnList from "@/utils/formSettingsJson/memberInfoMng/operationBtns.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/memberInfoMng/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/memberInfoMng/dialogEditFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/memberRegist/dialogRule";

export default {
  name: "memberInfoMng",
  components: {
    tabCard,
    commonTitleWithBorder,
    idCard,
    operateButtonsGroup,
    dialogForm
  },
  data() {
    delete dialogFormRules.rule.loginPassword;
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "账户信息列表",
            name: "memberInfoMng"
          }
        ]
      },
      passflag: "",
      ticketType: [],
      title: "交易代表信息",
      basMemberId: null,
      loginName: "",
      memberInfo: [
        {
          title: "交易代表信息",
          icon: "el-icon-user-solid",
          data: [
            {
              key: "姓名：",
              flag: "memName",
              value: ""
            },
            {
              key: "联系电话：",
              flag: "memPhone",
              value: ""
            },
            {
              key: "手机：",
              flag: "memMobile",
              value: ""
            },
            {
              key: "电子邮箱：",
              flag: "memEmail",
              value: ""
            }
          ]
        },
        {
          title: "法人代表信息",
          icon: "el-icon-s-check",
          data: [
            {
              key: "法人代表姓名：",
              flag: "legalman",
              value: ""
            },
            {
              key: "法人代表联系电话：",
              flag: "lawphone",
              value: ""
            },
            {
              key: "法人代表手机：",
              flag: "lawmobile",
              value: ""
            },
            {
              key: "法人代表电子邮箱：",
              flag: "lawemail",
              value: ""
            }
          ]
        },
        {
          title: "公司信息",
          icon: "el-icon-s-data",
          data: [
            {
              key: "公司名称：",
              flag: "companyName",
              value: ""
            },
            {
              key: "统一社会信用代码：",
              flag: "companyCode",
              value: ""
            },
            {
              key: "公司所在地：",
              flag: "companyAddress",
              value: ""
            },
            // {
            //   key: "详细地址：",
            //   flag: "companyDistrict",
            //   value: ""
            // },
            {
              key: "开户银行：",
              flag: "companyBank",
              value: ""
            },
            {
              key: "开户名：",
              flag: "companyBankAccountName",
              value: ""
            },
            {
              key: "银行账号：",
              flag: "companyBankAccount",
              value: ""
            },
            {
              key: "发票种类：",
              flag: "ticketName",
              value: ""
            }
          ]
        }
      ],
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
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      }
    };
  },
  methods: {
    /* 获取会员信息 */
    getMemberInfo() {
      let that = this,
        postdata = {
          loginName: this.$store.getters.userInfo.loginName
        };
      that.$http(this.$api.getMemberInfo(), postdata, true).then(xhr => {
        if (xhr.data.userActiveTasks && xhr.data.userActiveTasks.length) {
          xhr.data.userActiveTasks.map(task => {
            if (task.formKey == "adjustRegisterInfo") {
              xhr.data.taskId = task.id;
              return false;
            }
          });
        }
        that.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
        that.passflag = xhr.data.processStatus.value;
        that.ticketType.map(ticket => {
          if (ticket.value == xhr.data.invoicetype) {
            xhr.data.ticketName = ticket.text;
          }
        });
        that.basMemberId = xhr.data.basMemberId;
        that.loginName = xhr.data.loginName;
        that.memberInfo.map(member => {
          member.data.map(item => {
            item.value = xhr.data[item.flag];
          });
        });
        that.$store.dispatch("setUserInfo", postdata, true);
      });
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let that = this,
        postdata = {};
      postdata = data;
      // postdata.userAction = btn.flag;
      if (that.passflag == "adjustMemberInfo") {
        btn.postUrl = "flowMember";
        postdata.userAction = "submit";
      }
      that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
        if (xhr.success) {
          this.dialogFormSettings.dialogFormVisible = false;
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.dialogFormSettings.dialogFormVisible = false;
          this.getMemberInfo();
        }
      });
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "修改账户信息";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
    }
  },
  mounted() {
    let that = this;
    // 发票种类
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_invoicetype"
      })
      .then(data => {
        let invoicetypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        that.ticketType = data;
        that.getMemberInfo();
      });
  }
};
</script>
