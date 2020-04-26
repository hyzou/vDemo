<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-row>
            <el-col :span="8" :offset="8">
              <formGroup
                :formGroupSettings="formGroupSettings"
                @formGroupSubmit="handleChangePsw"
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
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/managerChangePsw/pswSheetBtn.json";
import searchFormItemslist from "@/utils/formSettingsJson/managerChangePsw/pswSheetSettings.json";
import dialogFormRules from "@/utils/formRulesJson/changePsw/dialogRule";
export default {
  name: "changePsw",
  components: {
    commonTitleWithBorder,
    formGroup
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "修改密码"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        fullScreen: "true",
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: searchFormBtnList,
        rules: dialogFormRules.rule
      }
    };
  },
  methods: {
    /* 提交更改密码操作 */
    handleChangePsw(btn, data) {
      if (btn.flag == "cancle") {
        this.dialogFormSettings.dialogFormVisible = false;
        return false;
      }
      let params = JSON.parse(JSON.stringify(data));
      params = this.$globalFnc.postArrtoString(params);
      let that = this,
        postdata = {};
      postdata = params;
      postdata.userAction = btn.flag;
      if (postdata.newPassword !== postdata.confirmPassword) {
        that.$message.error("新密码与确认新密码不一致，请重试！");
        return false;
      }
      that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
        if (xhr.success) {
          that.$message({
            message: "操作成功！",
            type: "success"
          });
        }
      });
    }
  }
};
</script>
