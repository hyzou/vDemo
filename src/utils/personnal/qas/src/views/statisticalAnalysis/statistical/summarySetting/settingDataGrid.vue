<template>
  <div>
    <el-collapse v-model="activeName" accordion class="pl15 pr15 bgfff">
      <el-collapse-item name="first">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-form label-width="auto" :inline="true">
          <el-row>
            <el-col :span="21">
              <el-col :span="8">
                <el-form-item label="规则名称">
                  <el-input v-model="searchParam.searchName"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="3" class="textAlignRight">
              <el-button
                type="primary"
                class="search_btn"
                @click="searchData()"
              >
                查询
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="common_table_container">
      <div class="tool-bar">
        <el-button type="primary" @click="addSetting">
          新增规则
        </el-button>
      </div>
      <div class="mt20 ml20 mr20">
        <el-table
          ref="ruleTable"
          :data="ruleDataArray"
          stripe
          :border="true"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="title" label="名称" width="380px">
          </el-table-column>
          <el-table-column prop="notes" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editRule(scope.row)">
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteRule(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageSetting.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSetting.pageSize"
          :layout="$constants.paginationlayout"
          :total="pageSetting.totalNumbers"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogSetting.title"
      :visible.sync="dialogSetting.ruleSettingShow"
      :width="$constants.dialog_width"
      :top="$constants.dialog_margin_top"
      v-if="dialogSetting.ruleSettingShow"
    >
      <reap-setting-rule-set
        ref="ruleSettingDialog"
        :defaultSearchData="defaultSearchData"
        :rule-id="ruleId"
        @ruleSaveSuccess="ruleSaveSuccess"
        v-if="dialogSetting.reapRuleSettingShow"
      ></reap-setting-rule-set>
      <stockSettingRuleSet
        ref="ruleSettingDialog"
        :defaultSearchData="defaultSearchData"
        :rule-id="ruleId"
        @ruleSaveSuccess="ruleSaveSuccess"
        v-if="dialogSetting.stockRuleSettingShow"
      ></stockSettingRuleSet>
      <marketSettingRuleSet
        ref="ruleSettingDialog"
        :defaultSearchData="defaultSearchData"
        :rule-id="ruleId"
        @ruleSaveSuccess="ruleSaveSuccess"
        v-if="dialogSetting.marketRuleSettingShow"
      ></marketSettingRuleSet>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSetting">
          保存
        </el-button>
        <el-button @click="dialogSetting.ruleSettingShow = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import reapSettingRuleSet from "./reap/reapSettingRuleSet";
import stockSettingRuleSet from "./stock/stockSettingRuleSet";
import marketSettingRuleSet from "./market/marketSettingRuleSet";
export default {
  name: "settingDataGrid",
  data() {
    return {
      activeName: "first",
      ruleDataArray: [],
      links: [],
      menuDataSource: [], //目录
      dialogSetting: {
        title: "新增规则", //默认
        ruleSettingShow: false,
        reapRuleSettingShow: false,
        stockRuleSettingShow: false,
        marketRuleSettingShow: false
      },
      pageSetting: {
        totalNumbers: 0,
        currentPage: 1,
        pageSize: this.$constants.numberPerpage
      },
      ruleId: "", //规则id
      searchParam: {
        searchName: "",
        selectedLink: "",
        menuId: ""
      }
    };
  },
  components: {
    reapSettingRuleSet,
    stockSettingRuleSet,
    marketSettingRuleSet
  },
  methods: {
    //获取数据
    searchData() {
      if (!this.defaultSearchData.menuid) {
        return false;
      }
      let param = {
        page: this.pageSetting.currentPage,
        rows: this.pageSetting.pageSize
      };
      if (this.defaultSearchData.menuid) {
        param.menuId = this.defaultSearchData.menuid;
      }
      if (this.searchParam.searchName) {
        param.title = encodeURIComponent(this.searchParam.searchName);
      }
      this.$get({
        url: "/_data/statistical/ruleSetting/getRulePage",
        fnc: data => {
          if (!data.success || data.total == 0) {
            this.ruleDataArray = [];
            return false;
          }
          this.ruleDataArray = data.rows || [];
          this.pageSetting.totalNumbers = data.total;
        },
        param: param
      });
    },
    handleSizeChange(val) {
      this.pageSetting.pageSize = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.pageSetting.currentPage = val;
      this.searchData();
    },
    editRule(scopeRow) {
      this.ruleId = scopeRow.qasStatRuleId;
      this.dialogSetting.ruleSettingShow = true;
      this.dialogSetting.reapRuleSettingShow = false;
      this.dialogSetting.stockRuleSettingShow = false;
      this.dialogSetting.marketRuleSettingShow = false;
      if (this.defaultSearchData.selectedLink == this.$constants.LINK_REAP) {
        this.dialogSetting.reapRuleSettingShow = true;
        return false;
      }
      if (this.defaultSearchData.selectedLink == this.$constants.LINK_STOCK) {
        this.dialogSetting.stockRuleSettingShow = true;
        return false;
      }
      if (this.defaultSearchData.selectedLink == this.$constants.LINK_MARKET) {
        this.dialogSetting.marketRuleSettingShow = true;
        return false;
      }
    },
    deleteRule(scopeRow) {
      const $this = this;
      this.$confirm("确定删除该规则吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $this.$post({
            url: "/_data/statistical/ruleSetting/removeInfo",
            param: { qasStatRuleId: scopeRow.qasStatRuleId },
            fnc: data => {
              if (!data.success) {
                this.$message({
                  type: "warn",
                  message: data.msg
                });
                return false;
              }
              this.$message({
                type: "success",
                message: "删除成功"
              });
              $this.searchData();
            }
          });
        })
        .catch(() => {
          $this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    addSetting() {
      this.ruleId = "";
      this.dialogSetting.ruleSettingShow = true;
      this.dialogSetting.reapRuleSettingShow = false;
      this.dialogSetting.stockRuleSettingShow = false;
      this.dialogSetting.marketRuleSettingShow = false;
      if (this.defaultSearchData.selectedLink == this.$constants.LINK_REAP) {
        this.dialogSetting.reapRuleSettingShow = true;
        return false;
      }
      if (this.defaultSearchData.selectedLink == this.$constants.LINK_STOCK) {
        this.dialogSetting.stockRuleSettingShow = true;
        return false;
      }
      if (this.defaultSearchData.selectedLink == this.$constants.LINK_MARKET) {
        this.dialogSetting.marketRuleSettingShow = true;
        return false;
      }
    },
    saveSetting() {
      this.$refs.ruleSettingDialog.saveSetting();
    },
    ruleSaveSuccess() {
      this.searchData();
      this.dialogSetting.ruleSettingShow = false;
      this.dialogSetting.reapRuleSettingShow = false;
      this.dialogSetting.stockRuleSettingShow = false;
      this.dialogSetting.marketRuleSettingShow = false;
    }
  },
  created() {},
  mounted() {
    //this.findLinks();
    //this.getMenu();
    //this.searchData();
  },
  props: {
    defaultSearchData: {
      type: Object
    }
  },
  watch: {
    defaultSearchData: {
      handler(val) {
        this.searchParam.searchName = "";
        this.searchData();
      },
      immediate: true
    }
  }
};
</script>
