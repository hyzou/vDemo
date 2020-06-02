<template>
  <div>
    <el-form
      ref="settingRuleForm"
      label-width="210px"
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
          <el-form-item label="产品品种" class="width100">
            <el-select
              v-model="settingRuleDataSource.productBreed"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in products"
                :key="item.sysId"
                :label="item.name"
                :value="item.sysId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
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
  name: "stockSettingRuleSet02",
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
    findProductLevel1() {
      const $this = this;
      this.$Api.gradeLevel().then(data => {
        $this.products = data;
      });
    },
    reloadCheckItem(obj) {
      obj.forEach(item => {
        item.sortNo = this.checkItemDataSource.length + 1;
        this.checkItemDataSource.push(item);
      });

      this.checkItemDataSource.forEach((item, index) => {
        if (0 == index) {
          item.topDisabled = true;
        } else {
          item.topDisabled = false;
        }
        if (this.checkItemDataSource.length - 1 == index) {
          item.bottomDisabled = true;
        } else {
          item.bottomDisabled = false;
        }
        item.sortMax = this.checkItemDataSource.length;
        item.oldSortNo = item.sortNo;
      });
      this.chooseCheckItemDialog = false;
    },
    deleteItem(scopeRow, index) {
      this.checkItemDataSource.splice(index, 1);
    },
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
          $this.$set(
            $this.settingRuleDataSource,
            "productBreed",
            dataMsg.productBreed
          );
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
    },
    //上移
    moveUpDataRow(scopeRow, index) {
      scopeRow.topDisabled = index - 1 == 0 ? true : false;
      scopeRow.bottomDisabled = false;
      scopeRow.sortNo = scopeRow.sortNo - 1;
      //先获取上一条数据
      let upData = this.checkItemDataSource[index - 1];
      upData.topDisabled = false;
      upData.bottomDisabled =
        index == this.checkItemDataSource.length - 1 ? true : false;
      upData.sortNo = upData.sortNo + 1;
      //删除上一条数据
      this.checkItemDataSource.splice(index - 1, 1);
      //当前位置插入之前的数据
      this.checkItemDataSource.splice(index, 0, upData);
    },
    //下移
    moveDownDataRow(scopeRow, index) {
      scopeRow.topDisabled = false;
      scopeRow.bottomDisabled =
        index + 1 == this.checkItemDataSource.length - 1 ? true : false;
      scopeRow.sortNo = scopeRow.sortNo + 1;
      //先获取上一条数据
      let upData = this.checkItemDataSource[index + 1];
      upData.topDisabled = index == 0 ? true : false;
      upData.bottomDisabled = false;
      upData.sortNo = upData.sortNo - 1;
      //删除上一条数据
      this.checkItemDataSource.splice(index + 1, 1);
      //当前位置插入之前的数据
      this.checkItemDataSource.splice(index, 0, upData);
    },
    //输入数字上移或是下移
    sortNoChange(scopeRow, index, oldSortNo) {
      if (scopeRow.sortNo == index) {
        return false;
      }
      //输入的比长度大或者小
      if (
        scopeRow.sortNo < 1 ||
        scopeRow.sortNo > this.checkItemDataSource.length
      ) {
        scopeRow.sortNo = oldSortNo;
        return false;
      }
      scopeRow.topDisabled = scopeRow.sortNo - 1 == 0 ? true : false;
      scopeRow.bottomDisabled =
        scopeRow.sortNo == this.checkItemDataSource.length ? true : false;
      scopeRow.oldSortNo = scopeRow.sortNo;
      //先获取上一条数据
      let upData = this.checkItemDataSource[scopeRow.sortNo - 1];
      upData.topDisabled = index == 0 ? true : false;
      upData.bottomDisabled =
        index == this.checkItemDataSource.length - 1 ? true : false;
      this.$set(upData, "sortNo", index + 1);
      this.$set(upData, "oldSortNo", upData.sortNo);

      this.checkItemDataSource.splice(scopeRow.sortNo - 1, 1);
      //当前位置插入之前的数据
      this.checkItemDataSource.splice(scopeRow.sortNo - 1, 0, scopeRow);

      this.checkItemDataSource.splice(index, 1);
      this.checkItemDataSource.splice(index, 0, upData);
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
        this.findProductLevel1();
        //获取数据
        this.loadData();
      },
      immediate: true
    },
    defaultSearchData: {
      handler(val) {
        this.settingRuleDataSource.selectedLink = val.selectedLink;
        this.findProductLevel1();
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
