<template>
  <div class="pr10 pl10 width100">
    <el-button type="text" @click="handleBack"><<返回</el-button>
    <div v-show="showChart">
      <div class="width100 fontSize24 textAlignCenter mb30">
        {{ standardItemName + "占比对照表" }}
        <span class="fontSize16"> (单位：{{ standardItemUnit }}) </span>
      </div>
      <vChart
        class="width100"
        :options="barOptions"
        autoresize
        theme="light"
      ></vChart>
      <div class="width100 fontSize24 textAlignCenter mt30 mb20">
        {{ standardItemName + "实际占有量对照表" }}
        <span class="fontSize16">(单位：{{ standardItemUnit }})</span>
      </div>
      <tableList class="mb50" :tablelistSettings="tablelistPlanSettings" />
    </div>
    <div v-show="!showChart">
      <nodata />
    </div>
  </div>
</template>

<script>
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataset";

// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "itemParamsSummary",
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
