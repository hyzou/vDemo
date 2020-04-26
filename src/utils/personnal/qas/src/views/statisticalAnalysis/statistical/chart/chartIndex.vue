<template>
  <div>
    <!-- 查询条件框 -->
    <div class="chartSearchCss">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="search" disabled>
          <el-row>
            <el-col :span="24">
              <label class="search_label">扦样时间</label>
              <el-date-picker
                v-model="search.createdS"
                type="year"
                placeholder="请选择"
                value-format="yyyy"
                :clearable="false"
              >
              </el-date-picker>
              <label class="search_label">-</label>
              <el-date-picker
                v-model="search.createdE"
                type="year"
                placeholder="请选择"
                value-format="yyyy"
                :clearable="false"
              >
              </el-date-picker>
              <label class="search_label">扦样区域</label>
              <el-cascader
                :options="regions"
                :props="{
                  expandTrigger: 'hover',
                  label: 'text',
                  value: 'id',
                  checkStrictly: true
                }"
                :clearable="false"
                v-model="district"
                ref="searchArea"
                placeholder="选择区域"
                @change="districtChange"
              ></el-cascader>
              <el-button type="primary" class="search_btn" @click="do_search()">
                查询
              </el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 图表内容框 -->
    <div class="chartIndexCss">
      <!--第一排图表-->
      <div style="width: 100%;">
        <div class="chartFirstCss">
          <div ref="sampleCountByProduct" class="chartCss"></div>
        </div>
        <div class="chartSecondCss">
          <div ref="productSampleQualifiedCount" class="chartCss"></div>
        </div>
      </div>
      <!-- 第二排图表 -->
      <div style="width: 100%;">
        <div class="chartFirstCss" style="margin-top: 5px;">
          <div ref="districtSampleQualifiedCount" class="chartCss"></div>
        </div>
        <div class="chartSecondCss" style="margin-top: 5px;">
          <div ref="sampleQualifiedByGrade" class="chartCss"></div>
        </div>
      </div>
      <!-- 第三排 -->
      <div style="width: 100%;">
        <div class="chartFirstCss" style="margin-top: 5px;">
          <div ref="sampleQualifiedCount" class="chartCss"></div>
        </div>
        <div class="chartSecondCss" style="margin-top: 5px;">
          <div ref="seedTypeCount" class="chartCss"></div>
        </div>
      </div>
      <!-- 第四排 -->
      <div style="width: 100%;">
        <div class="chartFirstCss" style="margin-top: 5px;">
          <div ref="seedTypeCountLine" class="chartCss"></div>
        </div>
        <div class="chartSecondCss" style="margin-top: 5px;">
          <div ref="statisticalSeedTypeSampleQualified" class="chartCss"></div>
        </div>
      </div>
      <!--<div style="width: 100%;">
        <div class="chartLastCss40">
          <div ref="reapChart" class="chartCss"></div>
        </div>
        <div class="chartLastCss30">
          <div ref="stockChart" class="chartCss"></div>
        </div>
        <div class="chartLastCss30">
          <div ref="marketChart" class="chartCss"></div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "chartIndex",
  data() {
    return {
      activeName: "search",
      search: {
        createdS: this.$dateUtl.getFullYear() + "",
        createdE: this.$dateUtl.getFullYear() + "",
        district: ""
      },
      district: "",
      regions: [],
      colorData: [
        "#EB6366",
        "#F369B5",
        "#A97BE9",
        "#0077FF",
        "#5DB2FF",
        "#13C2C2",
        "#52C41A",
        "#A0D911",
        "#FAAD14",
        "#FA8C16",
        "#99FB99",
        "#17BB92",
        "#435188",
        "#78C2F4",
        "#E0FFFF"
      ],
      colorReverseData: [
        "#78C2F4",
        "#435188",
        "#17BB92",
        "#99FB99",
        "#FA8C16",
        "#FAAD14",
        "#A0D911",
        "#52C41A",
        "#13C2C2",
        "#5DB2FF",
        "#0077FF",
        "#A97BE9",
        "#F369B5",
        "#EB6366",
        "#E0FFFF"
      ]
    };
  },
  mounted() {
    //不清楚为什么会出现长度为0的情况 在App.vue里设置的
    if (this.$store.getters.get_areaLevel.length == 0) {
      const $this = this;
      this.$get({
        url: "/_data/basic/district2/treeByUser",
        fnc: data => {
          $this.$store.dispatch(
            "set_areaLevel",
            data && data.length > 0 ? data[0].children : []
          );
          $this.regions = $this.$store.getters.get_areaLevel;
          $this.district = $this.$store.getters.get_areaLevel[0].id;
          $this.search.district = $this.district;
          $this.do_search();
        }
      });
    } else {
      this.regions = this.$store.getters.get_areaLevel;
      this.district = this.$store.getters.get_areaLevel[0].id;
      this.search.district = this.district;
      this.do_search();
    }
  },
  methods: {
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.search.district = areas[0] && areas[0].value ? areas[0].value : "";
    },
    do_search() {
      this.findSampleCountByProduct();
      this.findSampleProductQualified();
      this.findDistrictSampleQualifiedCount();
      this.findGradeCountByCurrentYear();
      this.findSampleQualifiedCount();
      this.findReapSeedTypeByCurrentYear();
      this.findReapSeedType();
      this.findReapSeedTypeSampleQualified();
      /* this.findNatureReapCount();
      this.findNatureStockCount();
      this.findNatureMarketCount();*/
    },

    findSampleCountByProduct() {
      let sampleCountByProduct = this.$echarts.init(
        this.$refs.sampleCountByProduct
      );
      let param = {
        district: this.search.district
      };
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findProductSampleCountByCurrentYear",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let titleYear = data.data.label;
          let legenddata = [];
          let seriesdata = [];
          for (let index in data.data.commonEntityList) {
            let dataObject = data.data.commonEntityList[index];
            legenddata.push(dataObject.label);
            seriesdata.push({
              value: dataObject.value,
              name: dataObject.label
            });
          }
          sampleCountByProduct.setOption({
            title: {
              text: titleYear + "年各产品样品份数统计",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {d}%"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              orient: "vertical",
              left: "left",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            series: [
              {
                type: "pie",
                radius: "60%",
                center: ["50%", "40%"],
                selectedMode: "single",
                data: seriesdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ],
            color: $this.colorData
          });
        }
      });
    },
    //获取各产品样品合格率
    findSampleProductQualified() {
      let sampleQualifiedChart = this.$echarts.init(
        this.$refs.productSampleQualifiedCount
      );
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district
      };
      this.$get({
        url: "/_data/sample/sample/findSampleProductQualified",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let titleYear = data.data.label;
          let xdata = [];
          let passratedata = []; //合格率
          let dimensions = ["product", "pass", "unpass"];
          let datasetSource = [];
          for (let index in data.data.commonEntityList) {
            let objEntity = data.data.commonEntityList[index];
            datasetSource.push({
              product: objEntity.label,
              pass: objEntity.value,
              unpass: objEntity.value2
            });
            xdata.push(objEntity.label);
            passratedata.push(objEntity.value3);
          }
          sampleQualifiedChart.setOption({
            title: {
              text: titleYear + "年各产品样品合格率统计"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            dataset: {
              dimensions: dimensions,
              source: datasetSource
            },
            legend: {
              data: ["合格率(%)", "合格数量", "不合格数量"]
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: true,
                data: xdata
              },
              {
                type: "category",
                boundaryGap: true,
                show: false,
                data: xdata
              }
            ],
            yAxis: [
              {
                type: "value",
                scale: true,
                name: "合格率(%)",
                max: 100,
                min: 0
              },
              {
                type: "value",
                scale: true,
                name: "合格数量",
                min: 0
              }
            ],
            series: [
              {
                name: "合格数量",
                type: "bar",
                color: "#52C41A",
                yAxisIndex: 1,
                xAxisIndex: 1
              },
              {
                name: "不合格数量",
                type: "bar",
                color: "#A0D911",
                yAxisIndex: 1,
                xAxisIndex: 1
              },
              {
                name: "合格率(%)",
                type: "line",
                data: passratedata,
                color: ["#FAAD14"]
              }
            ]
          });
        }
      });
    },
    findDistrictSampleQualifiedCount() {
      let districtSampleQualifiedCount = this.$echarts.init(
        this.$refs.districtSampleQualifiedCount
      );
      let param = {
        district: this.search.district
      };
      this.$get({
        url: "/_data/sample/sample/findSampleQualifiedByCurrentYearAndDistrict",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let titleYear = data.data.label;
          let xdata = [];
          let passratedata = []; //合格率
          for (let index in data.data.commonEntityList) {
            let objEntity = data.data.commonEntityList[index];
            xdata.push(objEntity.label);
            passratedata.push(objEntity.value3);
          }
          districtSampleQualifiedCount.setOption({
            title: {
              text: titleYear + "年各地区样品合格率统计"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: xdata
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: true,
                data: xdata
              }
            ],
            yAxis: [
              {
                type: "value",
                scale: true,
                name: "合格率(%)"
              }
            ],
            series: [
              {
                name: "合格率(%)",
                type: "bar",
                data: passratedata
              }
            ],
            color: this.colorReverseData
          });
        }
      });
    },
    findGradeCountByCurrentYear() {
      let sampleQualifiedByGrade = this.$echarts.init(
        this.$refs.sampleQualifiedByGrade
      );
      let param = {
        district: this.search.district
      };
      this.$get({
        url: "/_data/sample/sample/findGradeCountByCurrentYear",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let titleYear = data.data.label;
          let xdata = [];
          let passratedata = []; //合格率
          for (let index in data.data.commonEntityList) {
            let objEntity = data.data.commonEntityList[index];
            xdata.push(objEntity.label);
            passratedata.push(objEntity.value3);
          }
          sampleQualifiedByGrade.setOption({
            title: {
              text: titleYear + "年各等级样品合格率统计"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              },

              formatter: "{b} : {c}%"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: xdata
            },
            xAxis: [
              {
                type: "value",
                name: "合格率(%)"
              }
            ],
            yAxis: [
              {
                type: "category",
                scale: true,
                data: xdata
              }
            ],
            series: [
              {
                type: "bar",
                data: passratedata
              }
            ],
            color: this.colorData
          });
        }
      });
    },
    findSampleQualifiedCount() {
      let sampleQualifiedCount = this.$echarts.init(
        this.$refs.sampleQualifiedCount
      );
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district
      };
      let syear = this.search.createdS;
      let eyear = this.search.createdE;
      this.$get({
        url: "/_data/sample/sample/findSampleQualified",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let xdata = [];
          let passratedata = []; //合格率
          for (let index in data.data) {
            let objEntity = data.data[index];
            xdata.push(objEntity.label);
            passratedata.push(objEntity.value3);
          }
          sampleQualifiedCount.setOption({
            title: {
              text: syear + "年-" + eyear + "年样品合格率统计"
            },
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: xdata
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: true,
                data: xdata
              }
            ],
            yAxis: [
              {
                type: "value",
                scale: true,
                name: "合格率(%)",
                max: 100,
                min: 0
              }
            ],
            series: [
              {
                name: "合格率(%)",
                type: "line",
                data: passratedata,
                color: ["#FA8C16"]
              }
            ]
          });
        }
      });
    },
    //=====新粮收获
    //新粮收获种子品种统计
    findReapSeedTypeByCurrentYear() {
      let seedTypeCount = this.$echarts.init(this.$refs.seedTypeCount);
      let param = {
        district: this.search.district
      };
      const $this = this;
      this.$get({
        url: "/_data/task/reap/statisticalSeedTypeByCurrentYear",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let titleYear = data.data.label;
          let legenddata = [];
          let seriesdata = [];
          for (let index in data.data.commonEntityList) {
            let dataObject = data.data.commonEntityList[index];
            legenddata.push(dataObject.label);
            seriesdata.push({
              value: dataObject.value,
              name: dataObject.label
            });
          }
          seedTypeCount.setOption({
            title: {
              text: titleYear + "年新粮收获种子品种种植统计",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c}"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              orient: "vertical",
              left: "left",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            series: [
              {
                type: "pie",
                radius: "60%",
                center: ["50%", "40%"],
                selectedMode: "single",
                data: seriesdata,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ],
            color: $this.colorData
          });
        }
      });
    },
    findReapSeedType() {
      let seedTypeCountLine = this.$echarts.init(this.$refs.seedTypeCountLine);
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district
      };
      let syear = this.search.createdS;
      let eyear = this.search.createdE;
      const $this = this;
      this.$get({
        url: "/_data/task/reap/statisticalSeedType",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let legenddata = [];
          let seriesdata = [];
          let xdata = [];
          for (let index in data.data.commonEntityValues) {
            let dataValue = data.data.commonEntityValues[index];
            xdata.push(dataValue);
          }
          for (let i in data.data.commonEntityList) {
            let dataValue = data.data.commonEntityList[i];
            legenddata.push(dataValue.label);
            let valuedata = [];
            for (let iindex in dataValue.commonEntityValues) {
              valuedata.push(dataValue.commonEntityValues[iindex]);
            }
            seriesdata.push({
              name: dataValue.label,
              type: "line",
              data: valuedata
            });
          }

          seedTypeCountLine.setOption({
            title: {
              text: syear + "年-" + eyear + "年新粮收获种子品种种植统计",
              x: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              orient: "vertical",
              left: "left",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: xdata
            },
            yAxis: {
              type: "value"
            },
            series: seriesdata,
            color: $this.colorData
          });
        }
      });
    },
    findReapSeedTypeSampleQualified() {
      let statisticalSeedTypeSampleQualified = this.$echarts.init(
        this.$refs.statisticalSeedTypeSampleQualified
      );
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district
      };
      let syear = this.search.createdS;
      let eyear = this.search.createdE;
      const $this = this;
      this.$get({
        url: "/_data/task/reap/statisticalSeedTypeSampleQualified",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let legenddata = [];
          let seriesdata = [];
          let xdata = [];
          for (let index in data.data.commonEntityValues) {
            let dataValue = data.data.commonEntityValues[index];
            xdata.push(dataValue);
          }
          for (let i in data.data.commonEntityList) {
            let dataValue = data.data.commonEntityList[i];
            legenddata.push(dataValue.label);
            let valuedata = [];
            for (let iindex in dataValue.commonEntityValues) {
              valuedata.push(dataValue.commonEntityValues[iindex]);
            }
            seriesdata.push({
              name: dataValue.label,
              type: "line",
              data: valuedata
            });
          }

          statisticalSeedTypeSampleQualified.setOption({
            title: {
              text: syear + "年-" + eyear + "年新粮收获种子品种样品合格率统计",
              x: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              orient: "vertical",
              left: "left",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: xdata
            },
            yAxis: {
              type: "value",
              name: "合格率(%)"
            },
            series: seriesdata,
            color: $this.colorReverseData
          });
        }
      });
    }
    //===新粮收获end
    /*//新粮收获
    findNatureReapCount() {
      let reapChart = this.$echarts.init(this.$refs.reapChart);
      this.findNatureCount(reapChart, this.$constants.LINK_REAP, "#F369B5");
    },
    //库存承储
    findNatureStockCount() {
      let stockChart = this.$echarts.init(this.$refs.stockChart);
      this.findNatureCount(stockChart, this.$constants.LINK_STOCK, "#13C2C2");
    },
    //供销粮食
    findNatureMarketCount() {
      let marketChart = this.$echarts.init(this.$refs.marketChart);
      this.findNatureCount(marketChart, this.$constants.LINK_MARKET, "#FA8C16");
    },
    //各监管环节的计划性质合格率
    findNatureCount(chartObject, link, color) {
      let title =
        link == this.$constants.LINK_MARKET
          ? "供销粮食"
          : link == this.$constants.LINK_STOCK
          ? "库存承储"
          : "新粮收获";
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district,
        link: link
      };
      this.$get({
        url: "/_data/task/plan/countSampleQualifiedByLink",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let legenddata = [];
          let seriesdata = [];
          for (let index in data.data) {
            let dataObject = data.data[index];
            legenddata.push(dataObject.label);
            seriesdata.push(dataObject.value3);
          }
          chartObject.setOption({
            title: {
              text: title + "各监管环节合格率统计"
            },
            tooltip: {
              trigger: "axis",
              formatter: "{b} : {c}%"
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: legenddata
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                type: "line",
                data: seriesdata,
                color: color
              }
            ]
          });
        }
      });
    }*/
  },
  created() {
    //面包屑导航
    let breadcrumbNameArray = this.$dateUtl.getBreadcrumbNameArray(
      this.$route,
      ""
    );
    this.$emit(this.$constants.EMIT_TRANSFBREADCRUMB, breadcrumbNameArray);
  }
};
</script>
<style>
.chartSearchCss {
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
}
.chartIndexCss {
  overflow-y: auto;
  width: 101%;
  margin-top: 5px;
  height: 650px;
}
.chartFirstCss {
  width: 50%;
  height: 100%;
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
  float: left;
}
.chartSecondCss {
  width: 49%;
  float: left;
  margin-left: 10px;
  height: 100%;
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
}
.chartLastCss30 {
  width: 30%;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
  height: 100%;
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
}
.chartLastCss40 {
  width: 39%;
  float: left;
  margin-top: 5px;
  height: 100%;
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
}
.chartCss {
  width: 100%;
  height: 590px;
  margin-top: 20px;
}
.borderAndBackGround {
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
}
</style>
