<!-- 柱状图 -->
<template>
  <div>
    <div ref="barCount" class="barCount"></div>
  </div>
</template>

<script>
export default {
  name: "bar",
  data() {
    return {};
  },
  mounted() {
    //dom 实例化之后
    this.barCount();
  },
  methods: {
    barCount() {
      let barCount = this.$echarts.init(this.$refs.barCount);
      //弹出框查看具体的状态数量
      this.$get({
        url: "/_data/task/samplingTask/findTaskStatusINGCountByCurrentYear",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let xdata = [];
          let ydata = [];
          for (let index in data.data) {
            let dataObject = data.data[index];
            xdata.push(dataObject.label);
            ydata.push(dataObject.value);
          }
          this.setBarOption(barCount, "", xdata, ydata, "#409EFF");
        }
      });
    },

    setBarOption(chartId, title, xdata, ydata, color) {
      chartId.setOption({
        color: [color],
        title: {
          text: title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b} 任务数 : {c} "
        },
        xAxis: [
          {
            type: "category",
            data: xdata,
            axisTick: {
              alignWithLabel: true
            },
            name: "状态"
          }
        ],
        yAxis: [
          {
            type: "value",
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
                  let color = ["#0077FF", "#FFB33B", "#2AD7D7"];
                  return color[params.dataIndex];
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
