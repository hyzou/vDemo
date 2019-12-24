<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <chart ref="chart1" :options="chartSettings" autoresize />
      </el-col>
      <el-col :span="24">
        <chart ref="chart2" :options="barChartSettings" autoresize />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;chart ref="chart1" :options="chartSettings" :auto-resize="true" />
                  chartSettings:{
                    xAxis: {
                      type: "category",
                      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                    },
                    yAxis: {
                      type: "value"
                    },
                    series: [
                      {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line",
                        smooth: true
                      }
                    ]
                  },
                </code>
              </pre>
          </li>
          <li>
            <tableList :tablelistSettings="tablelistSettings" />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/footBarMng/tableData.json";

export default {
  name: "footBarMng",
  components: {
    tableList
  },
  data() {
    return {
      /**
       * footBar 基本数据配置
       */
      chartSettings: {},
      barChartSettings: {},
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: tableData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      }
    };
  },
  mounted() {
    this.chartSettings = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true
        }
      ]
    };
    this.barChartSettings = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "bar",
          smooth: true
        }
      ]
    };
  }
};
</script>
