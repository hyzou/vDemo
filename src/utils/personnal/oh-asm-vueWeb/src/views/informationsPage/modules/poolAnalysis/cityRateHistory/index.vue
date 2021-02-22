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
        各市县近{{
          searchFormItemSettings.formGroupValues.yearsNumber
        }}年年度考核排名曲线
      </div>
      <vChart
        class="width100"
        :options="barOptions"
        autoresize
        theme="light"
      ></vChart>
      <div class="width100 fontSize24 textAlignCenter mt30 mb20">
        各市县近{{
          searchFormItemSettings.formGroupValues.yearsNumber
        }}年年度考核排名表
      </div>
      <tableList :tablelistSettings="tablelistSettings" />
    </div>
    <div v-show="!showChart">
      <nodata />
    </div>
  </div>
</template>

<script>
import "echarts/lib/chart/line";
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
  name: "cityRateHistory",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.getOrgslist().then(data => {
      if (data.length > 0) {
        this.searchFormItemSettings.formGroupValues.assessOrgId = data[0].orgid;
      }
      this.initTable();
    });
  }
};
</script>
