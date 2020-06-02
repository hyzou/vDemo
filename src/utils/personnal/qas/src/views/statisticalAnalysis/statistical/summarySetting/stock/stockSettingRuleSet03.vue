<template>
  <div>
    <el-form
      ref="settingRuleForm"
      label-width="100px"
      :model="settingRuleDataSource"
      :rules="settingRuleRules"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="规则名称" prop="name" class="width100">
            <el-input v-model="settingRuleDataSource.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="notes" class="width100">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="settingRuleDataSource.notes"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "stockSettingRuleSet03",
  data() {
    return {
      settingRuleRules: {
        name: {
          required: true,
          message: "不得为空",
          trigger: "change"
        }
      },
      settingRuleDataSource: {
        name: "",
        productBreed: "",
        notes: "",
        selectedLink: "",
        menuId: ""
      },
      products: [],
      maxHeight: "410px",
      chooseCheckItemDialog: false,
      checkItemDataSource: []
    };
  },
  methods: {
    loadData() {
      if (!this.ruleId) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/statistical/ruleSetting/loadQasStatRule",
        param: { qasStatRuleId: this.ruleId },
        fnc: data => {
          if (!data.success) {
            return false;
          }
          let dataMsg = data.data;
          $this.$set($this.settingRuleDataSource, "name", dataMsg.title);
          $this.$set($this.settingRuleDataSource, "notes", dataMsg.notes);
          $this.$set($this.settingRuleDataSource, "menuId", dataMsg.menuId);
          $this.$set($this.settingRuleDataSource, "selectedLink", dataMsg.link);
          $this.$set($this.defaultSearchData, "menuid", dataMsg.menuId);
          dataMsg.basCheckitemList.forEach((item, index) => {
            if (0 == index) {
              item.topDisabled = true;
            } else {
              item.topDisabled = false;
            }
            if (dataMsg.basCheckitemList.length - 1 == index) {
              item.bottomDisabled = true;
            } else {
              item.bottomDisabled = false;
            }
            item.sortMax = dataMsg.basCheckitemList.length;
            item.oldSortNo = item.sortNo;
            $this.checkItemDataSource.push(item);
          });
        }
      });
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
    ruleId: {
      handler(val) {
        if (!val) {
          return false;
        }
        //获取数据
        this.loadData();
      },
      immediate: true
    },
    defaultSearchData: {
      handler(val) {
        this.settingRuleDataSource.selectedLink = val.selectedLink;
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
