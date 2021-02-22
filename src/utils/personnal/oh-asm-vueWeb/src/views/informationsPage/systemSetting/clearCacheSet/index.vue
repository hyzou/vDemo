<template>
  <div class="pr10 pl10 width100">
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <!--<pagination-->
    <!--:paginationSettings="paginationSettings"-->
    <!--@handlePaginationPagenumber="handlePaginationPagenumber"-->
    <!--/>-->
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "cacheSet",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.initPageData();
  }
};
</script>
