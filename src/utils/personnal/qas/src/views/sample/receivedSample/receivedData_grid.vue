<template>
  <div class="common_table_container">
    <div class="tool-bar">
      <!--<el-dropdown @command="doPlanAction">
        <el-button class="s-tool-btn">
          批量操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          &lt;!&ndash; <el-dropdown-item :disabled="disabledItem">发起直报</el-dropdown-item>&ndash;&gt;
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
    <template>
      <el-table
        ref="receivedSampleTable"
        :data="get_data()"
        stripe
        style="width: 100%"
        :border="true"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="planName" label="任务名称"> </el-table-column>
        <el-table-column prop="name" label="样品名称" width="120">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" width="120">
        </el-table-column>
        <el-table-column prop="testCode" label="检测编号" width="220">
        </el-table-column>
        <el-table-column prop="isBackup__dsp" label="样品用途" width="120">
        </el-table-column>
        <el-table-column prop="status__dsp" label="检测状态" width="120">
        </el-table-column>
        <el-table-column prop="samplingDt" label="扦样时间" width="120">
        </el-table-column>
        <el-table-column prop="receiveDt" label="收样时间" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showDetail(scope.row)"
              >详情</el-button
            >
            <!--<el-button type="text" size="small" @click="">直报</el-button>-->
            <!-- <el-button type="text" size="small" @click="showFP(scope.row)">
              信息
            </el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
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
    </template>

    <!-- 详情 -->
    <el-dialog
      :close-on-click-modal="false"
      title="样品详情"
      :visible.sync="sampleDetailShow"
      :width="$constants.dialog_width"
      :top="$constants.dialog_margin_top"
    >
      <!-- 详情组件内容 -->
      <sample-reap-detail
        :qasSampleId="qasSampleId"
        v-if="sampleReapDetailShow"
      ></sample-reap-detail>
      <sampleStockDetail
        :qasSampleId="qasSampleId"
        v-if="sampleStockDetailShow"
      ></sampleStockDetail>
      <sampleMarketDetail
        :qasSampleId="qasSampleId"
        v-if="sampleMarketDetailShow"
      ></sampleMarketDetail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sampleDetailShow = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 分配信息 -->

    <el-dialog
      :close-on-click-modal="false"
      title="查看样品分配信息"
      :visible.sync="showFPShow"
      v-if="showFPShow"
      :top="mg_top"
      :width="dialogWith"
      :append-to-body="true"
    >
      <div style="height: 300px;text-align: center">
        <el-row>
          <el-col>
            <label>检测状态:</label>
            <el-input
              v-model="fp.status"
              disabled
              style="width: 200px"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <label>检测人员:</label>
            <el-input
              v-model="fp.testBy"
              disabled
              style="width: 200px"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <label>审批人员:</label>
            <el-input
              v-model="fp.auditBy"
              disabled
              style="width: 200px"
            ></el-input>
          </el-col>
        </el-row>
        <el-button
          class="step_btn"
          @click="showFPShow = false"
          style="margin-top: 10px;"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sampleReapDetail from "../receiveSample/sampleReapDetail";
import sampleStockDetail from "../receiveSample/sampleStockDetail";
import sampleMarketDetail from "../receiveSample/sampleMarketDetail";
export default {
  name: "receivedData_grid",
  data() {
    return {
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage, //每页的数量
      disabledItem: true,
      sampleDetailShow: false,
      qasSampleId: 0,
      showFPShow: false,
      mg_top: "4%",
      dialogWith: "20%",
      fp: {},
      sampleReapDetailShow: false,
      sampleStockDetailShow: false,
      sampleMarketDetailShow: false
    };
  },
  components: {
    sampleReapDetail: sampleReapDetail,
    sampleStockDetail: sampleStockDetail,
    sampleMarketDetail: sampleMarketDetail
  },
  methods: {
    get_data() {
      let vm = this;
      let data = vm.$store.getters.get_tableData;
      //格式化时间
      data.map(function(arg) {
        arg.samplingDt = arg.samplingDt
          ? vm.$dateUtl.getTime(arg.samplingDt)
          : "";
        arg.receiveDt = arg.receiveDt ? vm.$dateUtl.getTime(arg.receiveDt) : "";
      });
      return data;
    },
    selectionRowsChange() {},
    handleSizeChange(val) {
      this.pageSizeSet = val;
      this.transfPagParam();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.transfPagParam();
    },
    transfPagParam() {
      let pageParam = {
        pageSizeNum: this.pageSizeSet,
        currentPageNum: this.currentPage
      };
      //传递值给父页面变化后的信息
      this.$emit(this.$constants.EMIT_TRANSFPAGPARAM, pageParam);
    },
    showDetail(scopeRow) {
      if (!scopeRow) {
        return false;
      }
      this.qasSampleId = scopeRow.qasSampleId;
      this.sampleDetailShow = true;

      this.sampleDetailShow = true;
      this.sampleReapDetailShow = false;
      this.sampleStockDetailShow = false;
      this.sampleMarketDetailShow = false;
      if (scopeRow.link == this.$constants.LINK_REAP) {
        this.sampleReapDetailShow = true;
      } else if (scopeRow.link == this.$constants.LINK_STOCK) {
        this.sampleStockDetailShow = true;
      } else if (scopeRow.link == this.$constants.LINK_MARKET) {
        this.sampleMarketDetailShow = true;
      }
    },
    showFP(scopeRow) {
      if (!scopeRow) {
        return false;
      }
      this.fp.status = scopeRow.status__dsp;
      this.fp.testBy = scopeRow.testBy;
      this.fp.auditBy = scopeRow.auditBy;
      this.showFPShow = true;
    },
    doPlanAction() {}
  },
  created() {},
  props: {
    totalNum: {
      type: Number
    }
  }
};
</script>
