<template>
  <div class="common_table_container">
    <div class="tool-bar"></div>
    <template>
      <el-table
        ref="multipleTable"
        :data="get_data()"
        stripe
        style="width: 100%"
        :border="true"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="样品名称"></el-table-column>
        <el-table-column prop="productName" label="产品品种"> </el-table-column>
        <el-table-column prop="code" label="样品编号"> </el-table-column>
        <el-table-column prop="testBy" label="检测人员"> </el-table-column>
        <el-table-column prop="status__dsp" label="状态"></el-table-column>
        <el-table-column prop="samplingDt" label="扦样时间"></el-table-column>
        <el-table-column
          prop="deadlineDt"
          label="要求完成时间"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showDetail(scope.row)">
              查看
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="showLocationUpdate(scope.row)"
            >
              校正
            </el-button>
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
          layout="total,sizes, prev, pager, next"
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

    <!-- 详情 -->
    <el-dialog
      :close-on-click-modal="false"
      title="样品位置校正"
      :visible.sync="samplingTaskLocationShow"
      :width="$constants.dialog_width"
      :top="$constants.dialog_margin_top"
    >
      <sampleLocation
        ref="sampleLocation"
        :qasSampleId="qasSampleId"
        v-if="samplingTaskLocationShow"
      ></sampleLocation>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateSampleTaskLocation">
          保存
        </el-button>
        <el-button @click="samplingTaskLocationShow = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sampleLocation from "./sampleLocation";
import sampleReapDetail from "../../sample/receiveSample/sampleReapDetail";
import sampleStockDetail from "../../sample/receiveSample/sampleStockDetail";
import sampleMarketDetail from "../../sample/receiveSample/sampleMarketDetail";
export default {
  name: "sampleDataGrid",
  data() {
    return {
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage, //每页的数量
      dialogWidth: this.$constants.dialog_width,
      dialogMarginTop: this.$constants.dialog_margin_top,
      sampleDetailShow: false,
      qasSampleId: 0,
      sampleReapDetailShow: false,
      sampleStockDetailShow: false,
      sampleMarketDetailShow: false,
      samplingTaskLocationShow: false
    };
  },
  components: {
    sampleReapDetail: sampleReapDetail,
    sampleStockDetail: sampleStockDetail,
    sampleMarketDetail: sampleMarketDetail,
    sampleLocation: sampleLocation
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
        arg.deadlineDt = arg.deadlineDt
          ? vm.$dateUtl.getTime(arg.deadlineDt)
          : "";
      });
      return data;
    },
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
    //查看样品
    showDetail(scopeRow) {
      if (!scopeRow) {
        return false;
      }
      this.qasSample = scopeRow;
      this.qasSampleId = scopeRow.qasSampleId;
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
    showLocationUpdate(scopeRow) {
      if (!scopeRow) {
        return false;
      }
      this.qasSampleId = scopeRow.qasSampleId;
      this.samplingTaskLocationShow = true;
    },
    updateSampleTaskLocation() {
      let sampleTask = this.$refs.sampleLocation.qasSample.qasSamplingTask;
      if (!sampleTask) {
        return false;
      } else {
        this.$Api.updateSampleTask(sampleTask).then(result => {
          if (result.success) {
            this.samplingTaskLocationShow = false;
            this.$message.success("保存成功!");
          }
        });
      }
    }
  },
  props: {
    totalNum: {
      type: Number,
      default: 0
    }
  }
};
</script>
