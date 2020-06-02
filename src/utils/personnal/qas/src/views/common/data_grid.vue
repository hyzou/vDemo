<template>
  <div class="common_table_container">
    <div class="tool-bar">
      <el-dropdown class="mg_right" @command="doPlanAction">
        <el-button class="s-tool-btn">
          批量操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="disabledItem" command="sd">
            下发计划
          </el-dropdown-item>
          <el-dropdown-item :disabled="disabledItem" command="s" divided>
            完成计划
          </el-dropdown-item>
          <el-dropdown-item :disabled="disabledItem" command="d" divided>
            删除计划
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" class="s-tool-btn" @click="show_dialog">
        创建计划
      </el-button>
    </div>
    <div class="mt20 ml20 mr20">
      <el-table
        ref="multipleTable"
        :data="get_data()"
        stripe
        :border="true"
        style="width: 100%"
        @selection-change="selectionRowsChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="name" label="计划名称" width="400">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">
              {{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nature__dsp" label="计划性质"> </el-table-column>
        <el-table-column
          prop="productName"
          label="产品品种"
          v-if="gridColumnShowVisiable"
        >
        </el-table-column>
        <el-table-column prop="taskNum" label="任务数"> </el-table-column>
        <el-table-column prop="deadlineDt" label="要求完成时间">
        </el-table-column>
        <el-table-column prop="overFlagLabel" label="是否已完成">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="scope.row.showBtn === true"
              @click="editPlan(scope.row)"
              >编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              v-if="
                scope.row.showBtn === true &&
                  parseInt(scope.row.taskNum) > 0 &&
                  scope.row.status == '1'
              "
              @click="sentPlan(scope.row)"
              >下发
            </el-button>
            <el-button
              type="text"
              size="small"
              v-if="parseInt(scope.row.taskNum) > 0"
              @click="lookTakSummary(scope.row)"
              >任务汇总
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSizeSet"
        :layout="$constants.paginationlayout"
        :total="totalNum"
      >
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <router-view
        :name="routerViewName"
        class="new_dialog"
        v-if="reset_dialog"
        :selectedQasPlanId="qasPlanId"
        @transfReloadData="reloadData"
        @closeDialog="closeDialog"
      ></router-view>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogStockVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <new-plan-stock-edit
        class="new_dialog"
        v-if="resetStock_dialog"
        :selectedQasPlanId="qasPlanId"
        @transfReloadData="reloadData"
        @closeDialog="closeDialog"
      ></new-plan-stock-edit>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogMarketVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <newPlanMarketEdit
        class="new_dialog"
        v-if="resetMarket_dialog"
        :selectedQasPlanId="qasPlanId"
        @transfReloadData="reloadData"
        @closeDialog="closeDialog"
      ></newPlanMarketEdit>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="任务汇总情况"
      :visible.sync="dialog_summaryTask_market"
      v-if="dialog_summaryTask_market"
      width="75%"
      :top="dialogMarginTop"
      :append-to-body="true"
    >
      <task-summary-plan-market
        ref="taskSummary"
        :planId="currentTaskSummaryPlanId"
      ></task-summary-plan-market>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_summaryTask_market = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="任务汇总情况"
      :visible.sync="dialog_summaryTask_reap"
      v-if="dialog_summaryTask_reap"
      width="75%"
      :top="dialogMarginTop"
      :append-to-body="true"
    >
      <task-summary-plan-reap
        ref="taskSummary"
        :planId="currentTaskSummaryPlanId"
      ></task-summary-plan-reap>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_summaryTask_reap = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="任务汇总情况"
      :visible.sync="dialog_summaryTask_stock"
      v-if="dialog_summaryTask_stock"
      width="75%"
      :top="dialogMarginTop"
      :append-to-body="true"
    >
      <task-summary-plan-stock
        ref="taskSummary"
        :planId="currentTaskSummaryPlanId"
      ></task-summary-plan-stock>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_summaryTask_stock = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogDetailVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <planMarketDetail
        class="new_dialog"
        v-if="resetMarketDetail_dialog"
        :selectedQasPlanId="qasPlanId"
        @closeDialog="closeDetailDialog"
      ></planMarketDetail>
      <plan-stock-detail
        class="new_dialog"
        v-if="resetStockDetail_dialog"
        :selectedQasPlanId="qasPlanId"
        @closeDialog="closeDetailDialog"
      ></plan-stock-detail>
      <plan-reap-detail
        class="new_dialog"
        v-if="resetReapDetail_dialog"
        :selectedQasPlanId="qasPlanId"
        @closeDialog="closeDetailDialog"
      ></plan-reap-detail>
    </el-dialog>
  </div>
</template>

<script>
import newPlanStockEdit from "../task/planStock/newPlanStockEdit";
import newPlanMarketEdit from "../task/planMarket/newPlanMarketEdit";
import taskSummaryPlanMarket from "../task/planMarket/summaryTask";
import taskSummaryPlanReap from "../task/planReap/summaryTask";
import taskSummaryPlanStock from "../task/planStock/summaryTask";
import planMarketDetail from "../task/planMarket/planMarketDetail";
import planStockDetail from "../task/planStock/planStockDetail";
import planReapDetail from "../task/planReap/planReapDetail";
export default {
  name: "data_grid",
  data() {
    return {
      dialogVisible: false,
      dialogStockVisible: false,
      dialogMarketVisible: false,
      dialog_summaryTask_market: false,
      dialog_summaryTask_reap: false,
      dialog_summaryTask_stock: false,
      currentPage: 1,
      fullscreen: false,
      reset_dialog: true,
      resetStock_dialog: false,
      resetMarket_dialog: false,
      disabledItem: true,
      selectedRows: [], //选中的记录
      gridColumnShowVisiable: true,
      dialogTitle: "粮食收获",
      routerViewName: "newPlan",
      pageSizeSet: this.$constants.numberPerpage, //每页的数量
      qasPlanId: 0, //计划id
      currentTaskSummaryPlanId: 0, // 查看任务汇总的计划Id
      param_id: "",
      dialogWidth: this.$constants.dialog_width,
      dialogMarginTop: this.$constants.dialog_margin_top,
      resetMarketDetail_dialog: false,
      resetStockDetail_dialog: false,
      resetReapDetail_dialog: false,
      dialogDetailVisible: false
    };
  },
  components: {
    newPlanStockEdit: newPlanStockEdit,
    newPlanMarketEdit: newPlanMarketEdit,
    taskSummaryPlanReap,
    taskSummaryPlanMarket,
    taskSummaryPlanStock,
    planMarketDetail,
    planStockDetail,
    planReapDetail
  },
  methods: {
    get_data() {
      let vm = this;
      let data = vm.$store.getters.get_tableData;
      //格式化时间
      data.map(function(arg) {
        arg.deadlineDt = vm.$dateUtl.getTime(arg.deadlineDt);
      });
      return data;
    },
    selectionRowsChange(val) {
      //是否选中数据
      let disabledResult = val && val.length > 0 ? false : true;
      this.disabledItem = disabledResult;
      //this.selectedRows =val;
      val.forEach(item => {
        //用item操作每一条数据。
        this.selectedRows.push({ qasPlanId: item.qasPlanId });
      });
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSizeSet = val;
      this.transfPagParam();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.transfPagParam();
    },
    show_dialog(action) {
      this.$router.push({
        name: this.routerViewName
      });
      //新增
      if (action != "edit") {
        this.qasPlanId = 0;
      }
      this.reset_dialog = false;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.reset_dialog = true;
      });
    },
    doPlanAction(commond) {
      let url = "";
      let successText = "操作成功";
      let content = "";
      switch (commond) {
        case "s": //批量完成计划
          url = "/_data/task/plan/successPlan";
          successText = "完成成功";
          content = "确认完成选中计划?";
          break;
        case "d": //批量删除计划
          url = "/_data/task/plan/deletePlan";
          successText = "删除成功";
          content = "是否确定删除选中计划?";
          break;
        case "sd": //批量下发计划
          url = "/_data/task/plan/sendPlanList";
          content = "是否确定下发选中计划?";
          break;
        default:
          break;
      }
      if (!url) {
        return false;
      }
      //弹窗
      let param = {
        content: content,
        url: url,
        sucessText: successText,
        errorText: "操作失败",
        cancelText: "已取消操作",
        qasPlanList: this.selectedRows
      };
      this.bathAction(param);
    },
    bathAction(param) {
      //弹窗
      this.$confirm(param.content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post({
            url: param.url,
            param: param.qasPlanList,
            fnc: data => {
              let showtype = "success";
              let message = param.sucessText;
              if (!data.success) {
                showtype = "warn";
                message = param.errorText;
              }
              this.$message({
                type: showtype,
                message: message
              });
              if (data.success) {
                //变为第一页
                //为了让search_panel监听变化生效执行查询方法 先设置为0  然后在search_panel查询方法内 监听到时0则赋值为1
                this.currentPage = 0;
                this.transfPagParam();
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: param.cancelText
          });
        });
    },
    transfPagParam() {
      let pageParam = {
        pageSizeNum: this.pageSizeSet,
        currentPageNum: this.currentPage
      };
      //传递值给父页面变化后的信息
      this.$emit(this.$constants.EMIT_TRANSFPAGPARAM, pageParam);
    },
    sentPlan(scopeRow) {
      //下发计划
      if (!scopeRow) {
        return false;
      }

      let param = {
        content: "是否确定下发该计划?",
        url: "/_data/task/plan/sentPlan",
        sucessText: "操作成功",
        errorText: "操作失败",
        cancelText: "已取消操作",
        qasPlanList: { qasPlanId: scopeRow.qasPlanId }
      };
      this.bathAction(param);
    },
    editPlan(scopeRow) {
      //编辑计划
      let param_id = this.$route.params.id;
      this.dialogTitle = param_id
        ? param_id === this.$constants.ROUTEID_SAMPLEREAP
          ? "新粮收获编辑计划"
          : param_id === this.$constants.ROUTEID_SAMPLESTOCK
          ? "库存粮食编辑计划"
          : "供销粮食编辑计划"
        : "粮食收获";
      this.qasPlanId = scopeRow.qasPlanId;
      //新粮收获
      if (!param_id || param_id === this.$constants.ROUTEID_SAMPLEREAP) {
        this.routerViewName = "newPlan";
        this.show_dialog("edit");
        return false;
      }
      //库存承储
      if (param_id === this.$constants.ROUTEID_SAMPLESTOCK) {
        this.resetStock_dialog = false;
        this.dialogStockVisible = true;
        this.$nextTick(() => {
          this.resetStock_dialog = true;
        });
        return false;
      } else if (param_id === this.$constants.ROUTEID_SAMPLEMARKET) {
        this.resetMarket_dialog = false;
        this.dialogMarketVisible = true;
        this.$nextTick(() => {
          this.resetMarket_dialog = true;
        });
        return false;
      }
    },
    //接收到刷新列表命令执行方法
    reloadData(obj) {
      if ("Y" == obj) {
        this.currentPage = 0;
        this.transfPagParam();
      }
    },
    closeDialog(obj) {
      if (this.$constants.LINK_STOCK == obj) {
        this.dialogStockVisible = false;
        this.resetStock_dialog = false;
      } else if (this.$constants.LINK_MARKET == obj) {
        this.dialogMarketVisible = false;
        this.resetMarket_dialog = false;
      } else {
        this.dialogVisible = false;
        this.reset_dialog = false;
      }
      this.reloadData("Y");
    },
    closeDetailDialog(obj) {
      if (this.$constants.LINK_STOCK == obj) {
        this.dialogDetailVisible = false;
        this.resetStockDetail_dialog = false;
      } else if (this.$constants.LINK_MARKET == obj) {
        this.dialogDetailVisible = false;
        this.resetMarketDetail_dialog = false;
      } else {
        this.dialogDetailVisible = false;
        this.resetReapDetail_dialog = false;
      }
    },
    lookTakSummary(scopeRow) {
      let param_id = this.$route.params.id;
      this.currentTaskSummaryPlanId = scopeRow.qasPlanId;
      if (!param_id || param_id === this.$constants.ROUTEID_SAMPLEREAP) {
        this.dialog_summaryTask_reap = true;
        return false;
      }
      //库存承储
      if (param_id === this.$constants.ROUTEID_SAMPLESTOCK) {
        this.dialog_summaryTask_stock = true;
        return false;
      } else if (param_id === this.$constants.ROUTEID_SAMPLEMARKET) {
        this.dialog_summaryTask_market = true;
        return false;
      }
    },
    showDetail(scopeRow) {
      //编辑计划
      let param_id = this.$route.params.id;
      this.dialogTitle = param_id
        ? param_id === this.$constants.ROUTEID_SAMPLEREAP
          ? "新粮收获计划查看"
          : param_id === this.$constants.ROUTEID_SAMPLESTOCK
          ? "库存粮食计划查看"
          : "供销粮食计划查看"
        : "粮食收获";
      this.qasPlanId = scopeRow.qasPlanId;
      //新粮收获
      if (!param_id || param_id === this.$constants.ROUTEID_SAMPLEREAP) {
        this.dialogDetailVisible = true;
        this.resetReapDetail_dialog = false;
        this.$nextTick(() => {
          this.resetReapDetail_dialog = true;
        });
        return false;
      }
      //库存承储
      if (param_id === this.$constants.ROUTEID_SAMPLESTOCK) {
        this.resetStockDetail_dialog = false;
        this.dialogDetailVisible = true;
        this.$nextTick(() => {
          this.resetStockDetail_dialog = true;
        });
        return false;
      }

      if (param_id === this.$constants.ROUTEID_SAMPLEMARKET) {
        this.resetMarketDetail_dialog = false;
        this.dialogDetailVisible = true;
        this.$nextTick(() => {
          this.resetMarketDetail_dialog = true;
        });
        return false;
      }
    }
  },
  created() {
    let width = window.innerWidth;
    this.fullscreen = width < 1800 ? true : false;
    let param_id = (this.param_id = this.$router.history.current.params.id);
    this.gridColumnShowVisiable =
      param_id === this.$constants.ROUTEID_SAMPLEREAP ? true : false;
    this.dialogTitle = param_id
      ? param_id === this.$constants.ROUTEID_SAMPLEREAP
        ? "新粮收获创建计划"
        : param_id === this.$constants.ROUTEID_SAMPLESTOCK
        ? "库存粮食创建计划"
        : "供销粮食创建计划"
      : "粮食收获";
    this.routerViewName = param_id
      ? param_id === this.$constants.ROUTEID_SAMPLEREAP
        ? "newPlan"
        : param_id === this.$constants.ROUTEID_SAMPLESTOCK
        ? "newPlanStock"
        : "newPlanMarket"
      : "newPlan";
  },
  props: {
    totalNum: {
      type: Number,
      default: 0
    }
  }
};
</script>
