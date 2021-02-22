<template>
  <div class="pr10 pl10 width100">
    <el-button type="text" @click="handleBack"><<返回</el-button>
    <div v-show="showChart">
      <el-row>
        <el-col :span="8">
          <table border="1">
            <tr>
              <td class="textAlignCenter pd10" width="150">年度考核目标任务</td>
              <td class="pd10" style="height:80px;">
                {{ provinceKpiDetail.assessmentTarget }}
              </td>
            </tr>
            <tr>
              <td class="textAlignCenter pd10">评分标准</td>
              <td class="pd10" style="height:150px;">
                {{ provinceKpiDetail.scoreStandard }}
              </td>
            </tr>
            <tr>
              <td class="textAlignCenter pd10">分值</td>
              <td class="textAlignCenter pd10" style="height:40px;">
                {{ provinceKpiDetail.targetScore }}
              </td>
            </tr>
            <tr>
              <td class="textAlignCenter pd10">自评分</td>
              <td class="textAlignCenter pd10" style="height:40px;">
                {{ provinceKpiDetail.selfScore }}
              </td>
            </tr>
            <tr
              v-if="
                provinceKpiDetail.selfScore != provinceKpiDetail.scoreStandard
              "
            >
              <td class="textAlignCenter pd10">减分原因</td>
              <td class="pd10" style="height:220px;">
                {{ provinceKpiDetail.reason }}
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :span="16">
          <el-col :span="20" :offset="2">
            <div>
              指标项：<el-radio-group
                v-model="standardItemData"
                size="mini"
                @change="handleChangeItem"
              >
                <el-radio-button
                  v-for="item in detailData.initKpiVars"
                  :label="item.asmSchemeKpiAllotId"
                  :key="item.asmSchemeKpiAllotId"
                  class="positionRel"
                >
                  {{ item.name }}
                  <div
                    v-show="item.asmSchemeKpiAllotId == standardItemData"
                    slot-scope=""
                    class="bdTop bdBottom bdRight bdLeft mt10 mb10 textAlignLeft pd10 borderR4 positionAbs"
                    style="background:#334f70;left:50%;top:25px;width:180px;margin-left:-90px;"
                  >
                    <div
                      class="positionAbs"
                      style="width:10px;height:10px;background:#334f70;transform: rotate(45deg);left:50%;margin-left:-5px;top:-5px"
                    ></div>
                    <div>规划值:{{ standardItemObject.targetValue }}</div>
                    <div class="mt15">
                      本省实际占有值:{{ standardItemObject.value }}
                    </div>
                  </div>
                </el-radio-button>
              </el-radio-group>
            </div>
            <div class="width100 fontSize24 textAlignCenter mb30 mt100">
              {{ standardItemName + "各数据项占比对照表" }}
              <span class="fontSize16"> (单位：{{ standardItemUnit }}) </span>
            </div>
            <vChart
              class="width100"
              :options="barOptions"
              @click="handleChart"
              autoresize
              theme="light"
            ></vChart>
            <div class="width100 fontSize24 textAlignCenter mt30 mb20">
              {{ standardItemName + "各数据项本省实际占有量对照表" }}
              <span class="fontSize16">(单位：{{ standardItemUnit }})</span>
            </div>
            <tableList
              class="mb50"
              :tablelistSettings="tablelistPlanSettings"
            />
          </el-col>
        </el-col>
      </el-row>
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
