<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="indexCss">
    <!--<el-collapse v-model="activeName" accordion>-->
    <div style="width: 100%;margin-top: 20px;">
      <div class="defFirstCss">
        <div class="defFirstCss_header"><span>当前年份统计</span></div>
        <div style="margin-top: 50px;">
          <el-carousel :interval="3000" arrow="always" height="500px">
            <el-carousel-item>
              <div ref="link_1" class="indexcarousel"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div ref="link_2" class="indexcarousel"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div ref="link_3" class="indexcarousel"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="defSecondCss">
        <div class="defSecondCssDivF pt10">
          <div ref="taskStatusCount" style="width:100%;height: 100%;"></div>
        </div>
        <div class="defSecondCssDivS pt10">
          <div ref="monthTaskCount" style="width:100%;height: 100%;"></div>
        </div>
      </div>
    </div>
    <!-- 历史统计 -->
    <div class="defMainWith70pCss">
      <div class="defFirstCss_header"><span>历史统计</span></div>
      <!-- 样品等级统计  -->
      <!-- <div ref="gradeCount" style="width:45%;height: 100%;float: left"></div>-->
      <!-- 合格率和合格数统计 -->
      <div
        ref="passCount"
        class="floatLeft width100 pt10 pl10"
        style="height: 90%;"
      ></div>
    </div>
    <!-- 待办任务 -->
    <div class="defMainWith28pCss">
      <div class="defFirstCss_header"><span>待办任务</span></div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="450px;"
          height="450px"
          :row-class-name="tableRowClass"
        >
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.overDate || scope.row.overDateStr"
                size="mini"
                :type="
                  scope.row.overDate == true
                    ? 'danger'
                    : scope.row.overDateStr
                    ? 'warning'
                    : ''
                "
                disable-transitions
                >{{
                  scope.row.overDate == true
                    ? "已超期"
                    : scope.row.overDateStr
                    ? scope.row.overDateStr + "天后超期"
                    : ""
                }}
              </el-tag>
              <el-button type="text" @click="showDetail(scope.row)">
                {{ scope.row.planName }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="deadlineDt" label="截止日期" width="100">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="进行中任务"
      :visible.sync="taskStatusIngCountShow"
      v-if="taskStatusIngCountShow"
      :top="mg_top"
      :width="dialogWith"
      :append-to-body="true"
    >
      <!-- 柱状图组件 -->
      <bar v-if="taskStatusIngCountShow"></bar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="taskStatusIngCountShow = false">
          关 闭
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogMarketDetailVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <planMarketDetail
        class="new_dialog"
        v-if="resetMarketDetail_dialog"
        :selectedQasPlanId="qasPlanId"
        @closeDialog="closeDetailDialog"
      ></planMarketDetail>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogStockDetailVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <plan-stock-detail
        class="new_dialog"
        v-if="resetStockDetail_dialog"
        :selectedQasPlanId="qasPlanId"
        @closeDialog="closeDetailDialog"
      ></plan-stock-detail>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="dialogReapDetailVisible"
      :width="dialogWidth"
      :top="dialogMarginTop"
    >
      <plan-reap-detail
        class="new_dialog"
        v-if="resetReapDetail_dialog"
        :selectedQasPlanId="qasPlanId"
        @closeDialog="closeDetailDialog"
      ></plan-reap-detail>
    </el-dialog>
  </div>
</template>

<script>
import bar from "./index/bar";

import planMarketDetail from "../views/task/planMarket/planMarketDetail";
import planStockDetail from "../views/task/planStock/planStockDetail";
import planReapDetail from "../views/task/planReap/planReapDetail";
export default {
  name: "def",
  data() {
    return {
      activeName: "1",
      tableData: [],
      taskStatusIngCountShow: false,
      mg_top: "4%",
      dialogWith: "60%",
      qasPlanId: 0, //计划id
      dialogWidth: this.$constants.dialog_width,
      dialogMarginTop: this.$constants.dialog_margin_top,
      resetMarketDetail_dialog: false,
      resetStockDetail_dialog: false,
      resetReapDetail_dialog: false,
      dialogReapDetailVisible: false,
      dialogMarketDetailVisible: false,
      dialogStockDetailVisible: false,
      dialogTitle: ""
    };
  },
  components: {
    bar: bar,
    planReapDetail,
    planMarketDetail,
    planStockDetail
  },
  mounted() {
    this.taskStatusCount();
    this.linkNatureCount();
    this.monthTaskCount();
    // this.adminLevelTaskCount();
    // 样品等级统计
    // this.gradeCount();
    //合格数和合格率相关统计
    this.passCount();
  },
  methods: {
    taskStatusCount() {
      const $this = this;
      let myChart = this.$echarts.init(this.$refs.taskStatusCount);
      this.$get({
        url: "/_data/task/samplingTask/findTaskStatusCountByCurrentYear",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let legenddata = [];
          let seriesdata = [];
          for (let index in data.data) {
            let dataObject = data.data[index];
            legenddata.push(dataObject.label);
            seriesdata.push({
              value: dataObject.value,
              name: dataObject.label
            });
          }
          myChart.setOption({
            title: {
              text: "任务状态统计",
              subtext: "点击进行中可查看具体进行中状态数量",
              x: "left"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "right",
              top: "middle",
              data: legenddata,
              icon: "circle"
            },
            series: [
              {
                name: "",
                type: "pie",
                radius: "60%",
                center: ["50%", "50%"],
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
            color: ["#5DB2FF", "#FDCE83"]
          });
          myChart.on("click", function(params) {
            if (params.dataIndex != 1) {
              //不是进行中
              return false;
            }
            $this.taskStatusIngCountShow = true;
          });
        }
      });
    },
    //监管环节各计划性质统计
    linkNatureCount() {
      let myChartLink1 = this.$echarts.init(this.$refs.link_1);
      let myChartLink2 = this.$echarts.init(this.$refs.link_2);
      let myChartLink3 = this.$echarts.init(this.$refs.link_3);
      let chartArray = [myChartLink1, myChartLink2, myChartLink3];
      this.$get({
        url: "/_data/task/samplingTask/linkNatureCount",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          for (let index in data.data) {
            let xdata = [];
            let ydata = [];
            let dataObject = data.data[index];
            for (let i in dataObject.commonEntityList) {
              let dataObjectEntity = dataObject.commonEntityList[i];
              xdata.push(dataObjectEntity.label);
              ydata.push(dataObjectEntity.value);
            }
            this.setLinkNatureOption(
              chartArray[parseInt(index) - 1],
              dataObject.label,
              xdata,
              ydata,
              index
            );
          }
        }
      });
    },
    setLinkNatureOption(chartId, title, xdata, ydata, index) {
      chartId.setOption({
        title: {
          text: title,
          x: "center"
        },

        tooltip: {
          formatter: "{b} 任务数 : {c} "
        },
        xAxis: [
          {
            type: "category",
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
            name: "监管环节"
          }
        ],
        yAxis: [
          {
            type: "value",
            minInterval: "1",
            name: "任务数"
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "50%",
            data: ydata,
            itemStyle: {
              normal: {
                color: function(params) {
                  let color = ["#0077FF", "#80BBFF"];
                  if (index == 2) {
                    color = ["#FFB33B", "#FFD18B"];
                  } else if (index == 3) {
                    color = ["#2AD7D7", "#82DFDF"];
                  }
                  return params.dataIndex % 2 > 0 ? color[1] : color[0];
                }
              }
            }
          }
        ]
      });
    },
    //defCountCss
    monthTaskCount() {
      let monthTaskCountChart = this.$echarts.init(this.$refs.monthTaskCount);
      this.$get({
        url: "/_data/task/samplingTask/findEveryMonthTaskCountForCurrentYear",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let xdata = [];
          let ydata = [];
          for (let index in data.data) {
            let dataObjectEntity = data.data[index];
            xdata.push(dataObjectEntity.label);
            ydata.push(dataObjectEntity.value);
          }
          monthTaskCountChart.setOption({
            title: {
              text: "各月份任务统计"
            },
            color: ["#0077FF"],
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                params = params[0];
                return params.name + "月份 : " + params.value;
              },
              axisPointer: {
                animation: false
              }
            },
            xAxis: {
              type: "category",
              data: xdata,
              name: "月份"
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: ydata,
                type: "line",
                smooth: false
              }
            ]
          });
        }
      });
    },
    findWaitTask($this) {
      $this.$get({
        url: "/_data/task/samplingTask/findWaitTask",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          $this.tableData = data.data;
          $this.tableData.map(function(arg) {
            arg.deadlineDt = $this.$dateUtl.getTime(arg.deadlineDt);
          });
        }
      });
    },
    gradeCount() {
      let gradeCount = this.$echarts.init(this.$refs.gradeCount);
      this.$get({
        url: "/_data/sample/sample/findGradeCount",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let dataRows = data.data;
          let legenddata = [];
          let seriesdata = [];
          for (let index in dataRows) {
            let dataObject = data.data[index];
            legenddata.push(dataObject.label);
            seriesdata.push({
              value: dataObject.value,
              name: dataObject.label,
              selected: "true"
            });
          }
          gradeCount.setOption({
            color: [
              "#37A2DA",
              "#32C5E9",
              "#67E0E3",
              "#9FE6B8",
              "#FFDB5C",
              "#FF9F7F",
              "#FB7293",
              "#E062AE",
              "#E690D1",
              "#E7BCF3",
              "#9D96F5",
              "#8378EA",
              "#8EB5F2"
            ],
            title: {
              text: "样品等级统计",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}: {c}({d}%)"
            },
            legend: {
              orient: "vertical",
              x: "left",
              data: legenddata,
              icon: "circle"
            },
            series: [
              {
                name: "",
                type: "pie",
                radius: "55%",
                center: ["40%", "50%"],
                data: seriesdata,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
                /*name: "",
                type: "pie",
                radius: ["30%", "50%"],
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    show: false,
                    position: "center",
                    formatter: "{b}\n {c}\n({d}%)"
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                data: seriesdata*/
              }
            ]
          });
        }
      });
    },
    passCount() {
      let passCount = this.$echarts.init(this.$refs.passCount);
      this.$get({
        url: "/_data/sample/sample/findPassForHistoryYearCount",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let xdata = [];
          //let passdata = [];//合格数量
          //let unpassdata = [];//不合格数量
          let passratedata = []; //合格率
          let dimensions = ["year", "pass", "unpass"];
          let datasetSource = [];
          for (let index in data.data) {
            let objEntity = data.data[index];
            datasetSource.push({
              year: objEntity.label,
              pass: objEntity.value,
              unpass: objEntity.value2
            });
            xdata.push(objEntity.label);
            // passdata.push(objEntity.value);
            // unpassdata.push(objEntity.value2);
            passratedata.push(objEntity.value3);
          }
          passCount.setOption({
            title: {
              text: "样品合格率统计"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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
                minInterval: "1",
                min: 0
              } //'#2AD7D7', '#82DFDF'
            ],
            series: [
              {
                name: "合格数量",
                type: "bar",
                color: "#2AD7D7",
                yAxisIndex: 1,
                xAxisIndex: 1
              },
              {
                name: "不合格数量",
                type: "bar",
                color: "#80BBFF",
                yAxisIndex: 1,
                xAxisIndex: 1
              },
              {
                name: "合格率(%)",
                type: "line",
                data: passratedata,
                color: ["#FFB33B"]
              }
            ]
          });
        }
      });
    },

    showDetail(scopeRow) {
      //编辑计划
      let param_id = scopeRow.link;
      this.dialogTitle = param_id
        ? param_id === this.$constants.LINK_REAP
          ? "新粮收获计划查看"
          : param_id === this.$constants.LINK_STOCK
          ? "库存粮食计划查看"
          : "供销粮食计划查看"
        : "粮食收获";
      this.qasPlanId = scopeRow.qasPlanId;
      this.dialogReapDetailVisible = false;
      this.dialogStockDetailVisible = false;
      this.dialogMarketDetailVisible = false;
      //新粮收获
      if (!param_id || param_id === this.$constants.LINK_REAP) {
        this.dialogReapDetailVisible = true;
        this.resetReapDetail_dialog = false;
        this.$nextTick(() => {
          this.resetReapDetail_dialog = true;
        });
        return false;
      }
      //库存承储
      if (param_id === this.$constants.LINK_STOCK) {
        this.resetStockDetail_dialog = false;
        this.dialogStockDetailVisible = true;
        this.$nextTick(() => {
          this.resetStockDetail_dialog = true;
        });
        return false;
      }

      if (param_id === this.$constants.LINK_MARKET) {
        this.resetMarketDetail_dialog = false;
        this.dialogMarketDetailVisible = true;
        this.$nextTick(() => {
          this.resetMarketDetail_dialog = true;
        });
        return false;
      }
    },

    closeDetailDialog(obj) {
      if (this.$constants.LINK_STOCK == obj) {
        this.dialogStockDetailVisible = false;
        this.resetStockDetail_dialog = false;
      } else if (this.$constants.LINK_MARKET == obj) {
        this.dialogMarketDetailVisible = false;
        this.resetMarketDetail_dialog = false;
      } else {
        this.dialogReapDetailVisible = false;
        this.resetReapDetail_dialog = false;
      }
    },
    tableRowClass({ row, index }) {
      //判断是 超期 还是即将到期还是 正常
      return row.overDate ? "overRow" : row.overDateStr ? "musOverRow" : "";
    }
  },
  created() {
    const $this = this;
    this.findWaitTask($this);
    //发送命令给父级(Navi)修改面包屑导航
    this.$emit(this.$constants.EMIT_TRANSFBREADCRUMB, []);
  }
};
</script>
<style>
.el-carousel__item h3 {
  font-size: 14px;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n) {
  font-size: 14px;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n + 1) {
  font-size: 14px;
  opacity: 0.75;
}

.el-collapse-item__header {
  font-size: 1.17em;
  font-weight: bold;
}
.overRow {
  color: #f56c6c;
}
.musOverRow {
  color: #e6a23c;
}
</style>
