<!-- 省（市）收获粮食安全风险监测结果汇总表规则新增和修改 -->
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
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="settingRuleDataSource.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品品种">
            <el-select
              v-model="settingRuleDataSource.productBreed"
              placeholder="请选择"
              class="width100"
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
          <el-form-item label="备注" prop="notes">
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
    <div>
      <div class="width100 textAlignRight">
        <el-button
          type="primary"
          class="s-tool-btn"
          @click="chooseCheckItemDialog = true"
        >
          选择检验指标
        </el-button>
      </div>
      <el-table
        ref="sampleCheckItemsTable"
        :data="checkItemDataSource"
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
        <el-table-column label="排序值" width="160">
          <template slot-scope="scope">
            <el-input
              type="number"
              size="mini"
              :min="1"
              :max="scope.row.sortMax"
              v-model="scope.row.sortNo"
              @change="
                sortNoChange(scope.row, scope.$index, scope.row.oldSortNo)
              "
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <!--<el-button>
              定义超标幅度规则
            </el-button>-->
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-top"
                size="mini"
                title="上移"
                :disabled="scope.row.topDisabled"
                @click="moveUpDataRow(scope.row, scope.$index)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-bottom"
                size="mini"
                title="下移"
                :disabled="scope.row.bottomDisabled"
                @click="moveDownDataRow(scope.row, scope.$index)"
              ></el-button>
            </el-button-group>
            &nbsp;
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
  name: "reapSettingRuleSet03",
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
