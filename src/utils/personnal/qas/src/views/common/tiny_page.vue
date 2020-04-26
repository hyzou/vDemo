<template>
  <div class="block">
    <span class="selected">已选择{{ selectedNum }}条数据</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSizeNum"
      :layout="$constants.paginationlayout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tiny_page",
  data() {
    return {
      currentPage: 1,
      pageSizeNum: this.$constants.numberPerpage
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSizeNum = val;
      this.transfPagParam();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.transfPagParam();
    },
    transfPagParam() {
      let pageParam = {
        pageSizeNum: this.pageSizeNum,
        currentPageNum: this.currentPage
      };
      //传递值给父页面变化后的信息
      this.$emit(this.$constants.TINY_EMIT_TRANSFPAGPARAM, pageParam);
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    selectedNum: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style scoped>
.selected {
  float: left;
  padding-top: 6.5px;
  margin-right: 15px;
}
</style>
