<template>
  <div id="main-scatter-3d">
    <div id="echarts-scatter-3d"></div>
    <mt-switch
      id="transOrRota"
      v-model="transOrRota"
      @change="changeTransOrRota"
    >{{transOrRotaName}}</mt-switch>
  </div>
</template>

<script>
import { Switch } from "mint-ui";

import touch from "@/util/touchJs.js";


export default {
  data() {
    return {
      rem: 16,
      color: [], //图表映射颜色列表
      myCharts: null,
      transOrRotaName: "旋转",
      transOrRota: false
    };
  },
  props: {
    option: Object
  },
  mounted() {
    // this.rem = parseInt(
    //   document
    //     .getElementsByTagName("html")[0]
    //     .style.fontSize.match(/\d/g)
    // );
    let mainOption = this.initMainOption();
    this.paintCharts(mainOption);
    // let dom = document.getElementById("echarts-scatter-3d");
    // let myCharts = this.$echarts.init(dom);
    // myCharts.setOption();
    // myCharts.resize()
  },
  methods: {
    /* 初始化图表属性对象 */
    initMainOption() {
      let option = this.option;
      let rem = this.rem;
      let mainOption = {
        backgroundColor: "rgba(245, 247, 251, 1)",
        title: {
          left: "center",
          top: "2%",
          color: "#1f2e4d",
          fontFamily: "PingFangSC-Regular",
          subtextStyle: {
            color: "#707070"
          },
          textAlign: "left"
        },
        tooltip: {},
        visualMap: {
          //温度条
          left: "5.5%",
          bottom: "0",
          show: false,
          seriesIndex: option.seriesIndex || [], //需要颜色映射的图表序号
          itemHeight: (function() {
            if (window.innerWidth >= 1920) {
              return 100;
            } else if (window.innerWidth >= 1600) {
              return 90;
            } else if (window.innerWidth >= 1366) {
              return 80;
            } else {
              return 70;
            }
          })(),
          itemWidth: (function() {
            if (window.innerWidth >= 1920) {
              return 20;
            } else if (window.innerWidth >= 1600) {
              return 18;
            } else if (window.innerWidth >= 1366) {
              return 16;
            } else {
              return 14;
            }
          })(),
          min: 0,
          max: 40,
          precision: 1,
          dimension: 5,
          realtime: false,
          calculable: true,
          color: option.color || ["#bf444c", "#d88273", "#f6efa6"],
          textStyle: {
            color: "#000",
            fontSize: rem - 3
          },
          outOfRange: {
            color: ["#cccfd1"]
          },
          colorAlpha: 1,
          opacity: 1
        },
        legend: {
          left: "22%",
          top: "13%",
          type: "scroll",
          data: [],
          inactiveColor: "#686a70",
          itemGap: 30,
          selectedMode: "single"
        },
        xAxis3D: {
          // x坐标轴
          show: true,
          name: option.xAxis3D ? option.xAxis3D.name || "x" : "x",
          nameTextStyle: {
            // 坐标名称样式
            fontSize: rem - 2
          },
          splitNumber: 1,
          nameGap: 15, // 坐标轴线与名字距离
          type: "value", // 坐标轴类型,'value' 数值轴,'category' 类目轴,'time' 时间轴,'log'
          // 对数轴
          min: 0, // 坐标轴最小值
          max: 5, // 坐标轴最大值
          splitLine: {
            show: true,
            lineStyle: {
              color: "#000"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: "rgba(208,208,208,0.3)"
            }
          }
        },
        yAxis3D: {
          // y坐标轴
          show: true,
          name: option.yAxis3D ? option.yAxis3D.name || "y" : "y",
          nameGap: 15,
          nameTextStyle: {
            // 坐标名称样式
            fontSize: rem - 2
          },
          splitNumber: 1,
          min: 0,
          max: 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#000"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: "rgba(208,208,208,0.3)"
            }
          }
        },
        zAxis3D: {
          // z坐标轴
          show: true,
          name: option.zAxis3D ? option.zAxis3D.name || "z" : "z",
          nameTextStyle: {
            // 坐标名称样式
            fontSize: rem - 2
          },
          splitNumber: 1,
          nameGap: 10,
          min: 0,
          max: 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#000"
            }
          } /*,
						splitArea : {
							show : true,
							areaStyle  : {
								color : '#23527c'
							}
						}*/
        },
        grid3D: {
          show: true,
          viewControl: {
            projection: "orthographic",
            panMouseButton: "right",
            rotateMouseButton: "left",
            beta: "60",
            rotateSensitivity: 1,
            distance: 300
          },
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          boxWidth: rem * 8 * 3 + 64, // 三维笛卡尔坐标系组件在三维场景中的宽度
          boxHeight: rem * 3 + 16, // 三维笛卡尔坐标系组件在三维场景中的高度
          boxDepth: rem * 7 * 3 + 48 // 三维笛卡尔坐标系组件在三维场景中的深度
        },
        series: option.series || []
      };
      return mainOption;
    },
    /* 绘制echarts */
    paintCharts(mainOption) {
      let dom = document.getElementById("echarts-scatter-3d");
      if (this.option.divPosition) {
        let divPosition = this.option.divPosition;

        for (let key in divPosition) {
          dom.style[key] = divPosition[key];
        }
      }

      this.myCharts = this.$echarts.init(dom);
      

      this.updateCharts(mainOption);

      this.chartsOnFunc(dom);
      this.myCharts.resize();
    },
    /* 更新echarts */
    updateCharts(option) {
      this.myCharts.setOption(option);
      this.myCharts.resize();
    },
    /* echarts绑定事件 */
    chartsOnFunc(dom) {
      let that = this;
      touch.onFunc({
        obj: dom,
        myCharts: that.myCharts,
        scaleFunc: that.scaleFunc
      });
    },
    scaleFunc(type) {
      let option = this.myCharts.getOption();
      let boxWidth = option.grid3D[0].boxWidth;
      let boxHeight = option.grid3D[0].boxHeight;
      let boxDepth = option.grid3D[0].boxDepth;
      if(type === 0){
        this.updateCharts({
          grid3D: {
            boxWidth: boxWidth * 0.8,
            boxHeight: boxHeight * 0.8,
            boxDepth: boxDepth * 0.8,
            viewControl: {
              beta: "60"   //不加这行代码，会出现坐标系不缩小的问题
            }
            
          }
        });
      }else{
        this.updateCharts({
          grid3D: {
            boxWidth: boxWidth * 1.2,
            boxHeight: boxHeight * 1.2,
            boxDepth: boxDepth * 1.2,
            viewControl: {
              beta: "60"
            }
          }
        });
      }
    },
    changeTransOrRota() {
      if (this.transOrRota) {
        this.transOrRotaName = "移动";
        this.updateCharts({
          grid3D: {
            viewControl: {
              rotateSensitivity: 0
            }
          }
        });
      } else {
        this.transOrRotaName = "旋转";
        this.updateCharts({
          grid3D: {
            viewControl: {
              rotateSensitivity: 1
            }
          }
        });
      }
    }
  }
};
</script>
<style scoped>
#main-scatter-3d {
  position: relative;
  width: 100%;
  height: 100%;
}
#echarts-scatter-3d {
  width: 100%;
  height: 100%;
}
#transOrRota {
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>