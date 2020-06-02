<template>
  <div>
    <stockSettingRuleSet01
      ref="settingRuleDialog"
      v-if="dialogSetting.reapSettingRuleSet01Show"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
    ></stockSettingRuleSet01>
    <stockSettingRuleSet02
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.reapSettingRuleSet02Show"
    >
    </stockSettingRuleSet02>
    <stockSettingRuleSet03
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.reapSettingRuleSet03Show"
    >
    </stockSettingRuleSet03>
    <stockSettingRuleSet04
      ref="settingRuleDialog"
      :ruleId="ruleId"
      :defaultSearchData="defaultSearchData"
      v-if="dialogSetting.reapSettingRuleSet04Show"
    >
    </stockSettingRuleSet04>
  </div>
</template>

<script>
import stockSettingRuleSet01 from "./stockSettingRuleSet01";
import stockSettingRuleSet02 from "./stockSettingRuleSet02";
import stockSettingRuleSet03 from "./stockSettingRuleSet03";
import stockSettingRuleSet04 from "./stockSettingRuleSet04";
export default {
  name: "stockSettingRuleSet",
  data() {
    return {
      dialogSetting: {
        reapSettingRuleSet01Show: false,
        reapSettingRuleSet02Show: false,
        reapSettingRuleSet03Show: false,
        reapSettingRuleSet04Show: false
      }
    };
  },
  components: {
    stockSettingRuleSet01,
    stockSettingRuleSet02,
    stockSettingRuleSet03,
    stockSettingRuleSet04
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
      this.dialogSetting.reapSettingRuleSet01Show = false;
      this.dialogSetting.reapSettingRuleSet02Show = false;
      let menuId = val.menuid;
      if (menuId == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_4) {
        this.dialogSetting.reapSettingRuleSet01Show = true;
      } else if (
        menuId == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_10
      ) {
        this.dialogSetting.reapSettingRuleSet03Show = true;
      } else if (
        menuId == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_8 ||
        menuId == this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_9
      ) {
        this.dialogSetting.reapSettingRuleSet04Show = true;
      } else {
        this.dialogSetting.reapSettingRuleSet02Show = true;
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
