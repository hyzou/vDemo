<template>
  <div class="pr10 pl10 width100">
    <tabCard
      class="tab-container"
      :tabSettings="tabSettings"
      @handleTabChange="handleTabChange"
    />
    <el-row>
      <!-- <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col> -->
      <el-col class="mb10" :span="24">
        <formGroup
          ref="searchForm"
          :formGroupSettings="searchFormItemSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <div v-show="showChart">
      <div class="width100 fontSize24 textAlignCenter mb30">
        各市县任务完成情况对照表
      </div>
      <el-table
        :data="tableData"
        :height="tableData.length > 10 ? 48 * 13 : 48 * (tableData.length + 3)"
        style="width: 100%"
      >
        <!--<el-table-column prop="targetName" label="考核目标任务">-->
        <el-table-column prop="targetName" label="数据项" width="240px" fixed>
        </el-table-column>
        <el-table-column
          :label="cell.text"
          v-for="(cell, idx) in tableCellSettings"
          :key="cell.value"
          :class-name="idx % 2 == 1 ? 'oddColomn' : 'eveColomn'"
        >
          <el-table-column
            :prop="`${cell.value}.plan`"
            label="规划值"
            :class-name="idx % 2 == 1 ? 'oddColomn' : 'eveColomn'"
          >
          </el-table-column>
          <el-table-column
            :prop="`${cell.value}.complete`"
            label="完成值"
            :class-name="idx % 2 == 1 ? 'oddColomn' : 'eveColomn'"
          >
          </el-table-column>
          <el-table-column
            :prop="`${cell.value}.percent`"
            label="完成度(%)"
            width="100px"
            :class-name="idx % 2 == 1 ? 'oddColomn' : 'eveColomn'"
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!showChart">
      <nodata />
    </div>
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "taskImplementAnalysis",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.initTable();
  }
};
</script>
