<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          ref="searchForm"
          :formGroupSettings="searchFormItemSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>

    <div v-show="showChart">
      <div class="width100 fontSize24 textAlignCenter mb30">
        {{ "各市县年度考核失分项个数对照表" }}
        <span class="fontSize16">(单位：个)</span>
      </div>
      <vChart
        class="width100"
        :options="barOptions"
        autoresize
        theme="light"
      ></vChart>
      <div class="width100 fontSize24 textAlignCenter mt30 mb20">
        {{ "各市县年度考核失分项个数排名表(按照失分项个数从高到低排列)" }}
        <span class="fontSize16">(单位：个)</span>
      </div>
      <tableList class="mb50" :tablelistSettings="tablelistSettingsCurrent" />
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
  name: "deductionScoreSummary",
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
