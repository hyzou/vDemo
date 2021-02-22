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
        各市县近{{ barOptions.series.length }}年年度考核指标评分对照表
        <span class="fontSize16">(单位：分)</span>
      </div>
      <vChart
        v-if="showChart"
        class="width100"
        :options="barOptions"
        autoresize
        @legendselectchanged="handleSelectLegends"
        theme="light"
      ></vChart>
      <div class="width100 fontSize24 textAlignCenter mt30 mb20">
        各市县近{{ barOptions.series.length }}年年度考核指标评分表
        <span class="fontSize16">(单位：分)</span>
      </div>
      <tableList
        class="mt30"
        :tablelistSettings="tablelistSettings"
        @handleTableItem="handleTableItem"
      />
    </div>
    <div v-show="!showChart">
      <nodata />
    </div>
    <!--预览及导出-->
    <el-dialog
      title="预览"
      :visible.sync="dialogPreviewExportVisible"
      width="70%"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <el-row class="mb10">
        <el-col :span="22" class="textAlignCenter" style="font-size: 24px;">
          {{ dialogPreviewExportTitle }}
        </el-col>
      </el-row>
      <tableList :tablelistSettings="previewTableSettings" />
    </el-dialog>
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataset";

export default {
  name: "distributeSuperviseSummary",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.getOrgslist().then(() => {
      this.initTable();
    });
  }
};
</script>
