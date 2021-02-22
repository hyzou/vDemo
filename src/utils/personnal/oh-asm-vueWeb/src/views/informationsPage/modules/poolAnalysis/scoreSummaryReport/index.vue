<template>
  <div class="width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-show="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchFormGroupSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row class="reviewProgress-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <iframe
          title="报表"
          style="display:block;width:100%;height:600px;border:1px solid #ccc;"
          :src="url"
        ></iframe>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "scoreSummaryReport",
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
