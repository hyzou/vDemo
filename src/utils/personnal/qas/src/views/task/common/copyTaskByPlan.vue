<template>
  <div>
    <el-form label-width="80px" :inline="true">
      <!--<el-form-item label="计划环节 :">
        <el-select v-model="link" disabled placeholder="计划环节">
          <el-option
            v-for="item in planLink"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>-->
      <el-row>
        <el-col :span="21">
          <el-col :span="6">
            <el-form-item label="计划性质 :">
              <el-select
                v-model="search.nature"
                placeholder="计划性质"
                clearable
              >
                <el-option
                  v-for="item in $store.getters.natures"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品品种 :" v-if="search.showVisiable">
              <el-cascader
                v-model="search.product"
                :options="$store.getters.products"
                :props="{
                  expandTrigger: 'hover',
                  label: 'text',
                  value: 'id',
                  checkStrictly: true
                }"
                ref="productLabel"
                @change="handChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期 :">
              <el-date-picker
                v-model="search.createdS"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                class="search_date"
              >
              </el-date-picker>
              <label class="search_label">至</label>
              <el-date-picker
                v-model="search.createdE"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                class="search_date"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="3" class="textAlignRight">
          <el-button type="primary" @click="do_search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      :height="420"
      class="copyTask_table"
      :border="true"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="name"
        label="计划名称"
        width="400"
      ></el-table-column>
      <el-table-column prop="nature__dsp" label="计划性质"> </el-table-column>
      <el-table-column prop="productName" label="产品品种"> </el-table-column>
      <el-table-column prop="taskNum" label="子任务数"> </el-table-column>
      <el-table-column prop="deadlineDt" label="要求完成时间">
      </el-table-column>
      <el-table-column prop="overFlagLabel" label="是否已完成">
      </el-table-column>
    </el-table>
    <tiny_page
      @transfTinyPagParam="getTransfTinyPagParam"
      :total="total"
      :selectedNum="selectedNum"
    ></tiny_page>
    <div class="dialog-footer" style="text-align: right">
      <el-button type="primary" :disabled="showCopyBtn" @click="copySelected"
        >确认勾选</el-button
      >
    </div>
  </div>
</template>

<script>
import tiny_page from "../../common/tiny_page";
export default {
  name: "copyTaskByPlan",
  components: {
    tiny_page
  },
  data() {
    return {
      /*-------------查询条件---------*/
      search: {
        product: "",
        productName: "",
        nature: "",
        createdS: "",
        createdE: "",
        showVisiable: true
      },
      /*-------------模板参数---------*/
      tableData: [], // 表格数据
      currentPage: 1,
      total: 0,
      planNature: [], //计划性质
      showCopyBtn: false, // 复制任务按钮是否可用
      selectRows: [], //当前选中行
      selectedNum: 0,
      qasPlanId: "", // 当前选择查看的计划id
      dialogTitle: "粮食收获", // 计划明细查看窗口标题
      resetMarketDetail_dialog: false,
      resetStockDetail_dialog: false,
      resetReapDetail_dialog: false,
      dialogDetailVisible: false,
      dialogWidth: this.$constants.dialog_width,
      dialogMarginTop: this.$constants.dialog_margin_top,
      pageSize: this.$constants.numberPerpage
    };
  },
  props: {
    planType: {
      type: String,
      required: true
    }
  },
  methods: {
    getTableDataUrl() {
      let url;
      if (this.planType == this.$constants.LINK_STOCK) {
        url = "_data/task/plan/findStockPageVo?overFlag=1";
      } else if (this.planType == this.$constants.LINK_MARKET) {
        url = "_data/task/plan/findMarketPageVo?overFlag=1";
      } else {
        url = "_data/task/plan/findReapPageVo?overFlag=1";
      }
      return url;
    },
    do_search() {
      let vm = this;
      let param = {
        page: this.currentPageNum === 0 ? 1 : this.currentPageNum,
        rows: this.pageSizeNum,
        nature: this.search.nature
      };
      if (1 < this.search.product.length) {
        param.grainBreed = this.search.product[this.search.product.length - 1];
      } else if (this.search.productName) {
        param.productName = this.search.productName;
      }
      if (this.search.createdS) {
        param.createdS = this.search.createdS;
      }
      if (this.search.createdE) {
        param.createdE = this.search.createdE;
      }
      let url = this.getTableDataUrl();
      this.$get({
        url: url,
        fnc: data => {
          if (data.success) {
            this.total = data.total;
            data.rows.map(function(arg) {
              arg.deadlineDt = vm.$dateUtl.getTime(arg.deadlineDt);
            });
            this.tableData = data.rows;
          }
        },
        param: param
      });
    },
    selectChange(rows) {
      this.selectRows = rows;
      this.selectedNum = rows.length;
      if (rows.length > 0) {
        this.showCopyBtn = true;
      }
      this.showCopyBtn = false;
    },
    /** 复制选中计划的任务*/
    copySelected() {
      let rows = this.selectRows;
      if (rows.length <= 0) {
        this.$message({
          type: "info",
          message: "请选择计划"
        });
        return;
      }
      let planId = [];
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].qasPlanId) {
          planId.push(rows[i].qasPlanId);
        }
      }
      let param = {};
      param.rows = rows;
      param.planIds = planId;
      //debugger;
      this.$emit(this.$constants.EMIT_COPY_PLAN_TASK, param);
    },
    closeDetailDialog(obj) {
      this.dialogDetailVisible = false;
      if (this.$constants.LINK_STOCK == obj) {
        this.resetStockDetail_dialog = false;
      } else if (this.$constants.LINK_MARKET == obj) {
        this.resetMarketDetail_dialog = false;
      } else {
        this.resetReapDetail_dialog = false;
      }
    },
    getTransfTinyPagParam(obj) {
      this.currentPage = obj.currentPageNum;
      this.pageSize = obj.pageSizeNum;
    },
    handChange() {
      let name = this.$refs["productLabel"].getCheckedNodes();
      this.search.productName = name[0] ? name[0].label : "";
    }
  },
  mounted: function() {
    this.do_search();
  }
};
</script>

<style scoped></style>
