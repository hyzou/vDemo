<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-row>
            <el-col class="mb20" :span="24">
              <!-- <h2 class="textAlignCenter" style="font-size:22px">会员注册</h2> -->
              <!-- <commonTitleWithBorder
                class="textAlignCenter"
                :title="titles.searchTitel"
              /> -->
            </el-col>
          </el-row>
          <el-row>
            <el-col class="mb20" :span="20" :offset="2">
              <formGroup
                ref="registForm"
                :formGroupSettings="formGroupSettings"
                @formGroupSubmit="handleSearchSubmit"
              />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
// import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
// 配置数据引入
import dialogEditFormItemslist from "@/utils/formSettingsJson/memberRegist/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/memberRegist/dialogAddFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/memberRegist/dialogRule";
export default {
  name: "memberRegist",
  components: {
    // commonTitleWithBorder,
    formGroup
  },
  data() {
    let registObj = {};
    dialogEditFormItemslist.map(item => {
      registObj[item.name] = "";
    });
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        fullScreen: "true",
        formItemSpan: 12,
        formGroupList: dialogEditFormItemslist,
        formGroupValues: registObj,
        formButtonList: dialogFormAddBtnlist,
        rules: dialogFormRules.rule
      }
    };
  },
  methods: {
    /* 表单数据提交 */
    handleSearchSubmit(btn, data) {
      let that = this,
        postdata = {};
      postdata = data;
      postdata.memType = "3";
      that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
        if (xhr.success) {
          // （${xhr.data.loginName}）
          let msg = `您的登录账户为: ${xhr.data.loginName},请记录。`;
          that.$alert(msg, "注册成功！");
        }
      });
    }
  },
  mounted() {
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
};
</script>
