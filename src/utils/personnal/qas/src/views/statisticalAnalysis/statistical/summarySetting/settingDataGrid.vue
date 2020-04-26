<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="first">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-row>
          <el-col :span="24">
            <label class="search_label">规则名称</label>
            <el-input v-model="searchName" class="search_input"></el-input>
            <el-button type="primary" class="search_btn" @click="searchData()">
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="common_table_container">
      <div class="tool-bar">
        <el-button
          type="primary"
          @click="dialogSetting.ruleSettingShow = true"
          v-show="defaultSearchData.menuid"
        >
          新增规则
        </el-button>
      </div>
      <template>
        <el-table
          ref="ruleTable"
          :data="ruleDataArray"
          stripe
          style="width: 100%"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="title" label="名称"> </el-table-column>
          <el-table-column prop="notes" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editRule(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="deleteRule(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
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
    >
      <settingRuleSet
        ref="settingRuleDialog"
        v-if="dialogSetting.ruleSettingShow"
        :ruleId="ruleId"
      ></settingRuleSet>
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
import settingRuleSet from "./settingRuleSet";
export default {
  name: "settingDataGrid",
  data() {
    return {
      activeName: "first",
      ruleDataArray: [],
      searchName: "",
      dialogSetting: {
        title: "新增规则", //默认
        ruleSettingShow: false
      },
      pageSetting: {
        totalNumbers: 0,
        currentPage: 1,
        pageSize: this.$constants.numberPerpage
      },
      ruleId: "" //规则id
    };
  },
  components: {
    settingRuleSet
  },
  methods: {
    //获取数据
    searchData() {
      if (!this.defaultSearchData.menuid) {
        return false;
      }
      let param = {
        page: this.pageSetting.currentPage,
        rows: this.pageSetting.pageSize,
        menuId: this.defaultSearchData.menuid
      };
      if (this.searchName) {
        param.title = this.searchName;
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
    //保存
    saveSetting() {
      if (!this.defaultSearchData.menuid) {
        return false;
      }
      const $this = this;
      //执行校验
      this.$refs.settingRuleDialog.$refs["settingRuleForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        //表单数据源
        let settingRuleDataSource =
          $this.$refs.settingRuleDialog.settingRuleDataSource;
        let param = settingRuleDataSource;
        param.title = settingRuleDataSource.name;
        param.menuId = this.defaultSearchData.menuid;
        //检测项数据源
        let checkItemDataSoource =
          $this.$refs.settingRuleDialog.checkItemDataSourec;
        param.basCheckitemList = checkItemDataSoource;
        this.dialogSetting.ruleSettingShow = false;
        let url = "/_data/statistical/ruleSetting/insertInfo"; //默认新增
        if ($this.ruleId) {
          //修改
          url = "/_data/statistical/ruleSetting/updateInfo";
          param.qasStatRuleId = $this.ruleId;
        }
        this.$post({
          url: url,
          param: param,
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
              message: "保存成功"
            });
            $this.searchData();
          }
        });
      });
    },
    editRule(scopeRow) {
      this.dialogSetting.ruleSettingShow = true;
      this.ruleId = scopeRow.qasStatRuleId;
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
    }
  },

  props: {
    defaultSearchData: {
      type: Object
    }
  },
  watch: {
    defaultSearchData: {
      handler(val) {
        if (!val.menuid) {
          return false;
        }
        this.searchData();
      },
      immediate: true
    }
  }
};
</script>
