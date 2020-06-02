<template>
  <div>
    <marketSettingRuleSet01
      ref="settingRuleDialog"
      v-if="dialogSetting.marketSettingRuleSet01Show"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
    ></marketSettingRuleSet01>
    <marketSettingRuleSet02
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.marketSettingRuleSet02Show"
    >
    </marketSettingRuleSet02>
    <marketSettingRuleSet03
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.marketSettingRuleSet03Show"
    >
    </marketSettingRuleSet03>
    <marketSettingRuleSet04
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.marketSettingRuleSet04Show"
    >
    </marketSettingRuleSet04>
    <marketSettingRuleSet05
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.marketSettingRuleSet05Show"
    >
    </marketSettingRuleSet05>
  </div>
</template>

<script>
import marketSettingRuleSet01 from "./marketSettingRuleSet01";
import marketSettingRuleSet02 from "./marketSettingRuleSet02";
import marketSettingRuleSet03 from "./marketSettingRuleSet03";
import marketSettingRuleSet04 from "./marketSettingRuleSet04";
import marketSettingRuleSet05 from "./marketSettingRuleSet05";
export default {
  name: "marketSettingRuleSet",
  data() {
    return {
      dialogSetting: {
        marketSettingRuleSet01Show: false,
        marketSettingRuleSet02Show: false,
        marketSettingRuleSet03Show: false,
        marketSettingRuleSet04Show: false,
        marketSettingRuleSet05Show: false
      }
    };
  },
  components: {
    marketSettingRuleSet01,
    marketSettingRuleSet02,
    marketSettingRuleSet03,
    marketSettingRuleSet04,
    marketSettingRuleSet05
  },
  methods: {
    //保存
    saveSetting() {
      const $this = this;
      //执行校验
      this.$refs.settingRuleDialog.$refs["settingRuleForm"].validate(valid => {
        if (!valid || !$this.defaultSearchData.menuid) {
          return false;
        }
        let settingRuleDataSource =
          $this.$refs.settingRuleDialog.settingRuleDataSource;

        //表单数据源
        let param = settingRuleDataSource;
        param.title = settingRuleDataSource.name;
        param.menuId = $this.defaultSearchData.menuid;
        param.link = $this.defaultSearchData.selectedLink;
        if (settingRuleDataSource.nature) {
          param.nature = settingRuleDataSource.nature;
        }
        //检测项数据源
        let checkItemDataSoource =
          $this.$refs.settingRuleDialog.checkItemDataSource;
        param.basCheckitemList = checkItemDataSoource;
        this.dialogSetting.ruleSettingShow = false;
        let url = "/_data/statistical/ruleSetting/insertInfo"; //默认新增
        if ($this.ruleId) {
          //修改
          url = "/_data/statistical/ruleSetting/updateInfo";
          param.qasStatRuleId = $this.ruleId;
        }
        $this.$post({
          url: url,
          param: param,
          fnc: data => {
            if (!data.success) {
              $this.$message({
                type: "warn",
                message: data.msg
              });
              return false;
            }
            $this.$message({
              type: "success",
              message: "保存成功"
            });
            //告诉父页面完成信息
            $this.$emit("ruleSaveSuccess", "");
          }
        });
      });
    },
    showDialog(val) {
      this.dialogSetting.marketSettingRuleSet01Show = false;
      this.dialogSetting.marketSettingRuleSet02Show = false;
      this.dialogSetting.marketSettingRuleSet03Show = false;
      this.dialogSetting.marketSettingRuleSet04Show = false;
      this.dialogSetting.marketSettingRuleSet05Show = false;
      let menuId = val.menuid;
      if (menuId == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_4) {
        this.dialogSetting.marketSettingRuleSet01Show = true;
        return false;
      }
      if (menuId == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_5) {
        this.dialogSetting.marketSettingRuleSet02Show = true;
        return false;
      }
      if (menuId == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_6) {
        this.dialogSetting.marketSettingRuleSet03Show = true;
        return false;
      }
      if (menuId == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_7) {
        this.dialogSetting.marketSettingRuleSet04Show = true;
        return false;
      }
      if (menuId == this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_8) {
        this.dialogSetting.marketSettingRuleSet05Show = true;
        return false;
      }
    }
  },
  props: {
    ruleId: {
      type: String,
      default: ""
    },
    defaultSearchData: {
      type: Object
    }
  },
  watch: {
    defaultSearchData: {
      handler(val) {
        this.showDialog(val);
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
