<template>
  <div class="common_table_container">
    <div class="tool-bar"></div>
    <template>
      <el-table
        ref="multipleTable"
        :data="get_data()"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="样品名称"></el-table-column>
        <el-table-column prop="productName" label="产品品种"> </el-table-column>
        <el-table-column prop="code" label="样品编号"> </el-table-column>
        <el-table-column prop="testCode" label="检测编号"> </el-table-column>
        <el-table-column
          prop="isBackup__dsp"
          label="样品用途"
        ></el-table-column>
        <el-table-column prop="status__dsp" label="状态"></el-table-column>
        <el-table-column prop="samplingDt" label="扦样时间"></el-table-column>
        <el-table-column prop="receiveDt" label="收样时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showSample(scope.row)">
              查看样品
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
    <!-- 查看样品 -->
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialog_sampleShow"
      :width="dialogWidth"
      :top="dialogMarginTop"
      v-if="dialog_sampleShow"
    >
      <sampleResultDetail
        class="new_dialog"
        v-if="dialogDetailShow"
        :qasSampleId="selectedQasSampleId"
      ></sampleResultDetail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogMethod">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import sampleResultDetail from "../resultEnter/sampleResultDetail";
export default {
  name: "dataGrid",
  data() {
    return {
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage, //每页的数量
      dialogWidth: this.$constants.dialog_width,
      dialogMarginTop: this.$constants.dialog_margin_top,
      dialog_sampleShow: false,
      dialogTitle: "查看样品",
      selectedQasSampleId: 0,
      dialogDetailShow: false
    };
  },
  components: {
    sampleResultDetail: sampleResultDetail
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
    showSample(scopeRow) {
      this.selectedQasSampleId = scopeRow.qasSampleId;
      this.dialog_sampleShow = true;
      this.dialogDetailShow = false;
      this.dialogTitle = "查看样品";
      this.dialogDetailShow = true;
    },
    closeDialogMethod() {
      this.dialog_sampleShow = false;
      this.dialogDetailShow = false;
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

<style scoped></style>
