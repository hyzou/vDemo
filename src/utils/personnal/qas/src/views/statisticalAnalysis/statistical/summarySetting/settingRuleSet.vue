<!-- 规则新增和修改 -->
<template>
  <div>
    <el-form
      ref="settingRuleForm"
      label-width="210px"
      :inline="true"
      :model="settingRuleDataSource"
      :rules="settingRuleRules"
    >
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="settingRuleDataSource.name"></el-input>
      </el-form-item>
      <el-form-item label="产品品种">
        <el-select
          v-model="settingRuleDataSource.productBreeds"
          multiple
          placeholder="请选择"
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
      <el-form-item label="备注" prop="notes">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入备注"
          v-model="settingRuleDataSource.notes"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
        type="primary"
        class="s-tool-btn"
        @click="chooseCheckItemDialog = true"
      >
        选择检验指标
      </el-button>
      <el-table
        ref="sampleCheckItemsTable"
        :data="checkItemDataSourec"
        style="width: 100%;margin-top: 5px;"
        :max-height="maxHeight"
        :height="maxHeight"
        border
      >
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="检验指标"> </el-table-column>
        <el-table-column prop="code" label="编码" width="180">
        </el-table-column>
        <el-table-column prop="munit" label="法定单位" width="180">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteItem(scope.row, scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="选择检验指标"
      :visible.sync="chooseCheckItemDialog"
      v-if="chooseCheckItemDialog"
      width="75%"
      top="4%"
      :append-to-body="true"
    >
      <qaCheckItemChoose @reloadCheckItem="reloadCheckItem"></qaCheckItemChoose>
    </el-dialog>
  </div>
</template>

<script>
import qaCheckItemChoose from "@/views/common/qaCheckItemChooseNoSave";
export default {
  name: "settingRuleSet",
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
        productBreeds: [],
        notes: ""
      },
      products: [],
      maxHeight: "410px",
      chooseCheckItemDialog: false,
      checkItemDataSourec: []
    };
  },
  components: {
    qaCheckItemChoose
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
        this.checkItemDataSourec.push(item);
      });
      this.chooseCheckItemDialog = false;
    },
    deleteItem(scopeRow, index) {
      this.checkItemDataSourec.splice(index, 1);
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
          $this.$set(this.settingRuleDataSource, "title", dataMsg.title);
          $this.$set(this.settingRuleDataSource, "notes", dataMsg.notes);
          let productsArray = [];
          dataMsg.productBreeds.forEach(item => {
            productsArray.push(item);
          });
          $this.$set(
            $this.settingRuleDataSource,
            "productBreeds",
            productsArray
          );
          dataMsg.basCheckitemList.forEach(item => {
            $this.checkItemDataSourec.push(item);
          });
        }
      });
    }
  },
  created() {
    this.findProductLevel1();
    if (this.ruleId) {
      //获取数据
      this.loadData();
    }
  },
  props: {
    ruleId: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
