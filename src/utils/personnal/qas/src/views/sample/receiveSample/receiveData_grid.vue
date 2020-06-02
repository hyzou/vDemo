<template>
  <div>
    <div class="common_table_container" v-if="chooseGrid && chooseGrid != '1'">
      <gridData></gridData>
    </div>
    <div class="common_table_container" v-else>
      <div class="mt20 ml20 mr20">
        <div class="textAlignLeft lheight40">
          已收样品:
        </div>
        <el-table
          ref="multipleTable"
          :data="get_data()"
          :border="true"
          stripe
          style="width: 100%"
        >
          <!-- <el-table-column
          type="selection"
          width="50">
        </el-table-column>-->
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="testCode" label="检测编号"> </el-table-column>
          <el-table-column prop="name" label="样品名称"> </el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="isBackup__dsp" label="样品用途">
          </el-table-column>
          <el-table-column prop="status__dsp" label="检测状态">
          </el-table-column>
          <el-table-column prop="receiveDtStr" label="收样时间">
          </el-table-column>
        </el-table>
        <!-- <div class="block">
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
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import gridData from "./gridData";
export default {
  name: "receiveData_grid",
  data() {
    return {
      currentPage: 1,
      pageSizeSet: this.$constants.numberPerpage, //每页的数量
      //totalNum: 0,
      gridData: [],
      chooseGrid: ""
    };
  },
  components: {
    gridData: gridData
  },
  methods: {
    get_data() {
      let vm = this;
      let data = this.gridData;
      //格式化时间
      data.map(function(arg) {
        arg.receiveDtStr = arg.receiveDt
          ? vm.$dateUtl.getTime(arg.receiveDt)
          : "";
      });
      return data;
    },
    selectionRowsChange() {},
    handleSizeChange(val) {
      this.pageSizeSet = val;
      this.searchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchData();
    },
    //接收到刷新列表命令执行方法
    reloadData() {
      this.searchData();
    },
    searchData() {
      let pageParam = {
        page: this.currentPage,
        rows: this.pageSizeSet
      };
      this.$get({
        url: "/_data/sample/sample/findSamplePage",
        fnc: data => {
          this.gridData = data.rows;
        },
        param: pageParam
      });
    }
  },
  created() {
    this.searchData();
  },
  props: {
    changeDataGridVal: {
      type: String,
      default: ""
    }
  },
  watch: {
    changeDataGridVal: {
      handler(val) {
        this.chooseGrid = val;
      },
      immediate: true
    }
  }
};
</script>
