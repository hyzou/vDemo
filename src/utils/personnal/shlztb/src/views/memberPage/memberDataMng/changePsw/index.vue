<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <tabCard class="tab-container" :tabSettings="tabSettings" />
        <div class="table-container">
          <el-row class="pt30">
            <el-col :span="8" :offset="8">
              <formGroup
                :formGroupSettings="pswSheetSettingsData"
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
import tabCard from "@/components/tabCard";
import formGroup from "@/components/formGroup";
// 配置数据引入
import pswSheetBtn from "@/utils/formSettingsJson/changePswMember/pswSheetBtn.json";
import pswSheetSettings from "@/utils/formSettingsJson/changePswMember/pswSheetSettings.json";
import dialogFormRules from "@/utils/formRulesJson/changePsw/dialogRule";
// pswSheetSettings.json

export default {
  name: "changePsw",
  components: {
    tabCard,
    formGroup
  },
  data() {
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "修改密码",
            name: "changePsw"
          }
        ]
      },
      // 表格配置
      pswSheetSettingsData: {
        fullScreen: "true",
        formItemSpan: 12,
        formGroupList: pswSheetSettings,
        formGroupValues: {},
        formButtonList: pswSheetBtn,
        rules: dialogFormRules.rule
      }
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
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
      if (postdata.confirmPassword !== postdata.newPassword) {
        that.$message.error("确认新密码与新密码不一致，请重新输入！");
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
