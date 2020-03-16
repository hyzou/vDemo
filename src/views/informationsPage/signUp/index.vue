<template>
  <div class="detailPage">
    <div class="memberSignup">
      <div class="mainRegContainer">
        <section class="home-mainbord">
          <headerBar :headInfos="headInfos" />
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
import headerBar from "@/components/headerBar";
import formGroup from "@/components/formGroup";

import dialogEditFormItemslist from "@/utils/formSettingsJson/signUp/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/signUp/dialogAddFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/memberRegist/dialogRule";
export default {
  name: "signUp",
  components: {
    headerBar,
    formGroup
  },
  data() {
    return {
      headInfos: {
        title: "demo示例",
        style: {
          "text-color": "#005192",
          height: "100px",
          "line-height": "100px",
          "font-weight": "600",
          "font-size": "40px"
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
    // 表单按钮事件
    handleFormSubmit(btn, formData) {
      console.log(formData);
      let that = this;
      if (btn.flag == "cancle") {
        this.$router.push({ path: "/" });
      } else if (btn.flag == "save") {
        let msg = `您的登录账户为: admin,请记录。`;
        that.$alert(msg, "注册成功！", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push({ path: "/" });
          }
        });
      }
    }
  }
};
</script>
