<template>
  <!--不带选择框的分页条-->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="10"
    :layout="$constants.paginationlayout"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "noSelPage",
  data() {
    return {
      currentPage: 1,
      total: 0
    };
  }
};
</script>
