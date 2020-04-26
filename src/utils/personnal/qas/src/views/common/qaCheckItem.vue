<template>
  <div>
    <div class="common_table_container">
      <div
        class="tool-bar bgfff"
        style="margin-right: 23px;"
        v-show="!disabledParam"
      >
        <el-button
          class="s-tool-btn"
          :disabled="disabledBtn"
          @click="removeQaItemBatch"
        >
          批量删除
        </el-button>
        <el-button
          type="primary"
          class="s-tool-btn"
          :disabled="disabledToDo"
          @click="chooseCheckItemDialog = true"
        >
          选择检验指标
        </el-button>
        <!--<el-button type="primary" class="s-tool-btn" :disabled="disabledToDo"
          >保存修改</el-button
        >-->
      </div>
      <div>
        <div class="contentLeftLayout">
          <el-table
            :data="
              tableDataArray.filter(
                data => !searchName || data.name.includes(searchName)
              )
            "
            style="width: 100%;"
            :height="tableStyle.height"
            :max-height="tableStyle.maxHeight"
            border
          >
            <el-table-column>
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="searchName"
                  size="small"
                  placeholder="输入产品搜索"
                />
              </template>
              <template slot-scope="scope">
                <el-link
                  @click="findCheckItem(scope.row)"
                  v-bind:class="{ activefont: scope.row.isActive }"
                  >{{ scope.row.label }}</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="contentRightLayout">
          <el-table
            :data="tableData"
            :height="tableStyle.height"
            :max-height="tableStyle.maxHeight"
            style="width: 100%"
            border
            @selection-change="selectionQaCheckItem"
          >
            <el-table-column type="selection" width="80"> </el-table-column>
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="basItem.name" label="名称">
            </el-table-column>
            <el-table-column prop="basItem.code" label="编码" width="120">
            </el-table-column>
            <el-table-column prop="basItem.munit" label="计量单位" width="120">
            </el-table-column>
            <el-table-column label="操作" width="120" v-if="!disabledParam">
              <template slot-scope="scope">
                <el-link type="primary" @click="deleteQaItem(scope.row)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
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
      <qaCheckItemChoose
        :selectedQasPlanSampleRequestId="qasPlanSampleRequestId"
        @reloadCheckItem="reloadCheckItem"
      ></qaCheckItemChoose>
    </el-dialog>
  </div>
</template>

<script>
import qaCheckItemChoose from "./qaCheckItemChoose";
export default {
  name: "target",
  data() {
    return {
      tableDataArray: [],
      searchName: "",
      tableData: [],
      tableStyle: {
        height: "530px",
        maxHeight: "530px"
      },
      selectedQaItemRows: [],
      qasPlanSampleRequestId: 0,
      disabledBtn: true,
      disabledToDo: true,
      chooseCheckItemDialog: false
    };
  },
  methods: {
    findRequestGrainBreed() {
      if (this.selectedQasPlanId == 0) {
        this.tableData = [];
        this.tableDataArray = [];
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/task/sampleRequest/findRequestGrainBreed",
        param: { qasPlanId: this.selectedQasPlanId },
        fnc: data => {
          if (!data || !data.success || !data.data) {
            return false;
          }
          data.data.map(item => {
            item.isActive = false;
          });
          $this.tableDataArray = data.data;
        }
      });
    },
    findCheckItem(scopeRow) {
      if (!scopeRow || !scopeRow.value) {
        this.tableData = [];
        return false;
      }
      let value = scopeRow.value;
      scopeRow.isActive = true;
      this.disabledToDo = false;
      if (this.qasPlanSampleRequestId != value) {
        this.qasPlanSampleRequestId = value;
      }
      this.findData();
    },
    deleteQaItem(scopeRow) {
      if (!scopeRow || !scopeRow.qasPlanQaitemId) {
        return false;
      }
      this.selectedQaItemRows = [];
      this.selectedQaItemRows.push({
        qasPlanQaitemId: scopeRow.qasPlanQaitemId
      });
      //确定删除已选择的项目 ?
      this.deleteQaItemBatch("确定删除该项?");
    },
    deleteQaItemBatch(context) {
      const $this = this;
      this.$confirm(context, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $this.$post({
            url: "/_data/task/planQaItem/deleteItems",
            param: this.selectedQaItemRows,
            fnc: data => {
              if (!data || !data.success) {
                this.$message({
                  type: "error",
                  message: "操作失败"
                });
                return false;
              }
              this.$message({
                type: "success",
                message: "操作成功"
              });
              $this.findData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    selectionQaCheckItem(val) {
      this.disabledBtn = val.length > 0 ? false : true;
      this.selectedQaItemRows = [];
      const $this = this;
      val.map(item => {
        $this.selectedQaItemRows.push({
          qasPlanQaitemId: item.qasPlanQaitemId
        });
      });
    },
    reloadCheckItem(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.$message({
        type: "success",
        message: "添加成功"
      });
      this.findData();
      this.chooseCheckItemDialog = false;
    },
    findData() {
      if (!this.qasPlanSampleRequestId || this.qasPlanSampleRequestId == 0) {
        this.tableData = [];
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/task/planQaItem/findQasPlanQaItem",
        param: { qasPlanSampleRequestId: this.qasPlanSampleRequestId },
        fnc: data => {
          if (!data || !data.success || !data.data) {
            return false;
          }
          $this.tableData = data.data;
        }
      });
    },
    removeQaItemBatch() {
      this.deleteQaItemBatch("确定批量删除选择的检测项吗?");
    }
  },
  props: {
    selectedQasPlanId: {
      type: Number
    },
    disabledParam: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectedQasPlanId: {
      handler(val) {
        if (val == 0) {
          this.tableData = [];
          this.tableDataArray = [];
          return false;
        }
        //获取产品
        this.findRequestGrainBreed();
      },
      immediate: true
    }
  },
  components: {
    qaCheckItemChoose: qaCheckItemChoose
  }
};
</script>

<style scoped>
.right_btn {
  float: right;
  margin-right: 15px;
}

.target-footer {
  padding-top: 16px;
}
</style>
