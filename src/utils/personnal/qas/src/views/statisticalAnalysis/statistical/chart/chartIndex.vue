<template>
  <div>
    <!-- 查询条件框 -->
    <div
      :class="
        searchBarFixed == true ? 'chartSearchCssScroll' : 'chartSearchCss'
      "
      id="searchBar"
    >
      <el-form
        v-model="search"
        label-width="80px"
        :inline="true"
        ref="statSearchForm"
      >
        <el-row>
          <el-col :span="21">
            <el-col :span="12">
              <el-form-item label="扦样时间:">
                <el-date-picker
                  v-model="search.createdS"
                  type="year"
                  class="scrollTime"
                  placeholder="请选择"
                  value-format="yyyy"
                  :clearable="false"
                >
                </el-date-picker>
                <label class="search_label">-</label>
                <el-date-picker
                  v-model="search.createdE"
                  type="year"
                  class="scrollTime"
                  placeholder="请选择"
                  value-format="yyyy"
                  :clearable="false"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扦样区域:">
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
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="3" class="textAlignRight">
            <el-button type="primary" class="search_btn" @click="do_search()">
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 图表内容框 -->
    <div class="mt15 pl10 pr10 bgfff">
      <el-collapse v-model="contentActiveName">
        <el-collapse-item :title="title[0]" name="chart1">
          <div style="width: 80%;text-align: center;">
            <div class="tableCss">
              <el-table
                ref="productSampleQualifiedCountTable"
                :data="tableDataSource.sampleQualifiedChart"
                style="width: 100%;margin-top: 10px"
                border
              >
                <el-table-column prop="productName" label="产品">
                </el-table-column>
                <el-table-column prop="passCount" label="合格数">
                </el-table-column>
                <el-table-column prop="unPassCount" label="不合格数">
                </el-table-column>
                <el-table-column prop="passPercent" label="合格率(%)">
                </el-table-column>
              </el-table>
            </div>
            <div ref="productSampleQualifiedCount" class="chartCss"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="title[1]" name="chart2">
          <div style="width: 80%;text-align: center;">
            <div class="tableCss">
              <el-table
                ref="districtSampleQualifiedCountTable"
                :data="tableDataSource.districtSampleQualifiedChart"
                style="width: 100%;margin-top: 10px"
                border
              >
                <el-table-column prop="productName" label="地区">
                </el-table-column>
                <el-table-column prop="passCount" label="合格数">
                </el-table-column>
                <el-table-column prop="unPassCount" label="不合格数">
                </el-table-column>
                <el-table-column prop="passPercent" label="合格率(%)">
                </el-table-column>
              </el-table>
            </div>
            <div ref="districtSampleQualifiedCount" class="chartCss"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="title[2]" name="chart3">
          <div style="width: 80%;text-align: center;">
            <div class="tableCss">
              <el-table
                ref="districtSampleQualifiedCountTable"
                :data="tableDataSource.reapSeedType"
                style="width: 100%;margin-top: 10px"
                border
              >
                <el-table-column prop="productName" label="产品">
                </el-table-column>
                <el-table-column prop="seedType" label="种植品种">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="title[3]" name="chart4">
          <div ref="sampleQualifiedCount" class="chartCss"></div>
        </el-collapse-item>
        <el-collapse-item :title="title[4]" name="chart5">
          <div ref="seedTypeCountLine" class="chartCss"></div>
        </el-collapse-item>
        <el-collapse-item :title="title[5]" name="chart6">
          <div style="width: 80%;text-align: center;">
            <div
              ref="statisticalSeedTypeSampleQualified"
              class="chartCss"
            ></div>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="title[6]" name="chart7">
          <sample-location @returnTitle="returnTitle" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import sampleLocation from "./sampleLocation";
export default {
  name: "chartIndex",
  data() {
    return {
      contentActiveName: [
        "chart1",
        "chart2",
        "chart3",
        "chart4",
        "chart5",
        "chart6",
        "chart7"
      ],
      search: {
        createdS: this.$dateUtl.getFullYear() + "",
        createdE: this.$dateUtl.getFullYear() + "",
        district: ""
      },
      tableDataSource: {
        sampleQualifiedChart: [],
        districtSampleQualifiedChart: [],
        reapSeedType: []
      },
      title: [],
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
      ],
      searchBarFixed: false
    };
  },
  components: {
    sampleLocation
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
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
      const $this = this;
      //this.findSampleCountByProduct();
      this.findSampleProductQualified($this);
      this.findDistrictSampleQualifiedCount($this);
      //this.findGradeCountByCurrentYear();
      this.findSampleQualifiedCount($this);
      this.findReapSeedTypeByCurrentYear($this);
      this.findReapSeedType($this);
      this.findReapSeedTypeSampleQualified($this);
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
    findSampleProductQualified($this) {
      let sampleQualifiedChart = this.$echarts.init(
        this.$refs.productSampleQualifiedCount
      );
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district
      };
      $this.title[0] = "当年各品种样品合格统计";
      this.$get({
        url: "/_data/sample/sample/findSampleProductQualified",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          $this.title[0] = data.data.label + "各品种样品合格统计";
          // let titleYear = data.data.label;
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

            $this.tableDataSource.sampleQualifiedChart.push({
              productName: objEntity.label,
              passCount: objEntity.value,
              unPassCount: objEntity.value2,
              passPercent: objEntity.value3
            });
          }
          sampleQualifiedChart.setOption({
            /* title: {
              text: titleYear + "年各产品样品合格率统计"
            },*/
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show: false,
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
                data: xdata,
                name: "产品"
              },
              {
                type: "category",
                boundaryGap: true,
                show: false,
                data: xdata,
                name: "产品"
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
                min: 0,
                minInterval: "1"
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
    findDistrictSampleQualifiedCount($this) {
      let districtSampleQualifiedCount = this.$echarts.init(
        this.$refs.districtSampleQualifiedCount
      );
      let param = {
        district: this.search.district
      };
      $this.title[1] = "当年各地区样品合格率统计";
      this.$get({
        url: "/_data/sample/sample/findSampleQualifiedByCurrentYearAndDistrict",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          $this.title[1] = data.data.label + "各地区样品合格率统计";
          // let titleYear = data.data.label;
          let xdata = [];
          let passratedata = []; //合格率
          for (let index in data.data.commonEntityList) {
            let objEntity = data.data.commonEntityList[index];
            xdata.push(objEntity.label);
            passratedata.push(objEntity.value3);

            $this.tableDataSource.districtSampleQualifiedChart.push({
              productName: objEntity.label,
              passCount: objEntity.value,
              unPassCount: objEntity.value2,
              passPercent: objEntity.value3
            });
          }
          districtSampleQualifiedCount.setOption({
            /* title: {
              text: titleYear + "年各地区样品合格率统计"
            },*/
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show: false,
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
                data: xdata,
                name: "地区"
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
    findSampleQualifiedCount($this) {
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
      $this.title[3] = syear + "-" + eyear + "历年样品合格率统计";
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
            /*   title: {
              text: syear + "年-" + eyear + "年样品合格率统计"
            },*/
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              show: false,
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
                data: xdata,
                name: "年份"
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
    findReapSeedTypeByCurrentYear($this) {
      // let seedTypeCount = this.$echarts.init(this.$refs.seedTypeCount);
      let param = {
        district: this.search.district
      };
      $this.title[2] = "当年种子种植品种统计";
      this.$get({
        url: "/_data/task/reap/statisticalSeedTypeByCurrentYear",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          $this.title[2] = data.data.label + "年种子种植品种统计";
          /*let legenddata = [];
          let seriesdata = [];*/
          for (let index in data.data.commonEntityList) {
            let objEntity = data.data.commonEntityList[index];
            /*legenddata.push(dataObject.label);
            seriesdata.push({
              value: dataObject.value,
              name: dataObject.label
            });*/
            $this.tableDataSource.reapSeedType.push({
              productName: objEntity.label,
              seedType: objEntity.value
            });
          }
          /*seedTypeCount.setOption({
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
          });*/
        }
      });
    },
    findReapSeedType($this) {
      let seedTypeCountLine = this.$echarts.init(this.$refs.seedTypeCountLine);
      let param = {
        createdS: this.search.createdS,
        createdE: this.search.createdE,
        district: this.search.district
      };
      let syear = this.search.createdS;
      let eyear = this.search.createdE;
      this.$get({
        url: "/_data/task/reap/statisticalSeedType",
        param: param,
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          $this.title[4] = syear + "-" + eyear + "历年种子种植品种统计";
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
            /*title: {
              text: syear + "年-" + eyear + "年新粮收获种子品种种植统计",
              x: "center"
            },*/
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              show: false,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              orient: "vertical",
              left: "right",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: xdata,
              name: "年份"
            },
            yAxis: {
              type: "value",
              minInterval: "1",
              name: "数量"
            },
            series: seriesdata,
            color: $this.colorData
          });
        }
      });
    },
    findReapSeedTypeSampleQualified($this) {
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
      $this.title[5] = syear + "-" + eyear + "历年种子种植品种样品合格率统计";
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
            /* title: {
              text: syear + "年-" + eyear + "年新粮收获种子品种样品合格率统计",
              x: "center"
            },*/
            tooltip: {
              trigger: "axis"
            },
            toolbox: {
              show: false,
              feature: {
                saveAsImage: { show: true }
              }
            },
            legend: {
              orient: "vertical",
              left: "right",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: xdata,
              name: "年份"
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
    },
    // 编写滚动条事件
    handleScroll() {
      var scrollTop = document.getElementById("mainContent").scrollTop;
      var offsetTop = document.querySelector("#searchBar").offsetTop;
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    },
    returnTitle(param) {
      this.title[6] = param + "年扦样分布";
    }
  },
  created() {
    //面包屑导航
    let breadcrumbNameArray = this.$dateUtl.getBreadcrumbNameArray(
      this.$route,
      ""
    );
    this.$emit(this.$constants.EMIT_TRANSFBREADCRUMB, breadcrumbNameArray);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>
<style>
.chartSearchCss {
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
  background-color: white;
  padding-top: 20px;
  padding-right: 10px;
}
.chartSearchCssScroll {
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
  position: fixed;
  background-color: white;
  z-index: 99;
  padding-top: 20px;
  right: 30px;
  width: 735px;
  padding-right: 10px;
}
.chartSearchCssScroll .scrollTime {
  width: 100px !important;
}
.tableCss {
  padding-left: 10px;
}
.chartIndexCss {
  overflow-y: auto;
  width: 101%;
  margin-top: 5px;
  height: 720px;
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
  width: 1000px;
  height: 590px;
  margin-top: 20px;
}
.borderAndBackGround {
  background: white;
  box-shadow: 0px 1px 6px 2px rgba(123, 123, 123, 0.5);
}
</style>
