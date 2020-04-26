<template>
  <div class="pagination">
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationSettings.currentPage"
        :page-sizes="paginationSettings.pageSizeChangeList"
        :page-size="paginationSettings.pageSize"
        :layout="paginationSettings.layout"
        :total="paginationSettings.totalNumbers"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    paginationSettings: Object
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handlePaginationPagesize", val);
    },
    handleCurrentChange(val) {
      this.$emit("handlePaginationPagenumber", val);
    }
  }
};
</script>
