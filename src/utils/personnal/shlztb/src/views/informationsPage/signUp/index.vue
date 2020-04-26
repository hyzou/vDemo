<template>
  <div class="detailPage">
    <div class="memberSignup">
      <div class="mainRegContainer">
        <section class="home-mainbord">
          <mainTopLogo :headInfos="headInfos" />
        </section>
        <section class="registerBody">
          <el-row :span="24">
            <el-col :span="24">
              <formGroup
                :formGroupSettings="formGroupSettings"
                @formGroupSubmit="handleFormSubmit"
              />
            </el-col>
          </el-row>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import mainTopLogo from "@/components/mainTopLogo";
import formGroup from "@/components/formGroup";

import dialogEditFormItemslist from "@/utils/formSettingsJson/signUp/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/signUp/dialogAddFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/memberRegist/dialogRule";
export default {
  name: "signUp",
  components: {
    mainTopLogo,
    formGroup
  },
  data() {
    console.log(dialogFormRules);
    return {
      headInfos: {
        title: "浙江社会贸易粮公共交易平台",
        style: {
          textColor: "#005192",
          height: "100px",
          lineHeight: "100px",
          fontWeight: "600",
          fontSize: "40px"
        },
        operate: false
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        fullScreen: "true",
        formItemSpan: 12,
        formGroupList: dialogEditFormItemslist,
        formGroupValues: {
          memType: "3"
        },
        formButtonList: dialogFormAddBtnlist,
        rules: dialogFormRules.rule
      }
    };
  },
  methods: {
    getPagePortalNews() {
      let filter = {
          field: "type",
          value: "05",
          op: "equal"
        },
        filterArray = [];
      filterArray.push(filter);
      let that = this,
        postdata = {
          page: 1,
          rows: 7,
          filterRules: JSON.stringify(filterArray)
        };
      that.$http(that.$api.pagePortalNews(), postdata).then(xhr => {
        if (xhr.rows && xhr.rows.length > 0) {
          that.paragraph.text = xhr.rows[0].content;
        }
      });
    },
    // 表单按钮事件
    handleFormSubmit(btn, formData) {
      let that = this;
      if (btn.flag == "cancle") {
        this.$router.push({ path: "/" });
      } else if (btn.flag == "save") {
        let postdata = {};
        postdata = formData;
        that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
          if (xhr.success) {
            // （${xhr.data.）loginName}
            let msg = `您的登录账户为: ${xhr.data.loginName},请记录。`;
            that.$alert(msg, "注册成功！", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.push({ path: "/" });
              }
            });
          }
        });
      }
    },
    /*获取发票种类*/
    getInvoiceType() {
      let that = this;
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
        });
    }
  },
  mounted() {
    // this.getInvoiceType();
  }
};
</script>
