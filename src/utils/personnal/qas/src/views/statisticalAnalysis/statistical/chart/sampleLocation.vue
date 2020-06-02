<template>
  <div ref="mapDivSample" class="dis_map_containerLocation"></div>
</template>

<script>
import "echarts/map/js/province/jiangxi.js";
import obj from "echarts/map/json/province/jiangxi.json";
import markerIcon from "@/static/img/dis-icon.png";
export default {
  name: "sampleLocation",
  data() {
    return {
      area_color: ["#FEFBDF", "#EBC9D4", "#D9E8D6", "#F7E4C7", "#FFCBC1"]
    };
  },
  methods: {
    loadMap() {
      const $this = this;
      let mapDivSample = $this.$echarts.init(this.$refs.mapDivSample);
      // 监听屏幕变化自动缩放图表
      /* window.addEventListener("resize", function() {
        mapDivSample.resize();
      });
*/
      //获取今年所有的样品的扦样地点
      $this.$get({
        url: "/_data/task/samplingLocation/findSamplingLocationByCurrentYear",
        fnc: data => {
          if (!data || !data.success) {
            return false;
          }
          let title = data.data.label;
          $this.$emit("returnTitle", title);
          /* if (
            !data.data.commonEntityList ||
            data.data.commonEntityList.length == 0
          ) {
            return false;
          }*/
          let dataMap = [];
          if (
            data.data.commonEntityList &&
            data.data.commonEntityList.length > 0
          ) {
            for (let index in data.data.commonEntityList) {
              let objectEntity = data.data.commonEntityList[index];
              dataMap.push({
                latitude: objectEntity.label,
                longitude: objectEntity.value
              });
            }
          }
          mapDivSample.setOption({
            geo: {
              show: true,
              roam: true,
              map: "江西",
              zoom: 1.1,
              selectedMode: false, //是否允许选中多个区域，
              markLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              label: {
                normal: {
                  show: true,
                  color: "#000"
                },
                emphasis: {
                  show: true,
                  color: "#FFFF0F"
                }
              },
              itemStyle: {
                // 描边线宽 为 0 时无描边
                borderWidth: 0.5,
                // 图形的描边颜色 支持的颜色格式同 color
                borderColor: "#000",
                // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                borderType: "solid"
              }
            },
            series: [
              {
                // 类型
                type: "effectScatter",
                coordinateSystem: "geo",
                symbol: "image://" + markerIcon,
                symbolSize: 20,
                rippleEffect: {
                  period: 0
                },
                // 地图系列中的数据内容数组，数组项可以为单个数值
                data: dataMap.map(function(itemOpt) {
                  return {
                    // name: itemOpt.name,
                    value: [
                      itemOpt.longitude,
                      itemOpt.latitude
                      // itemOpt.value //数量
                    ],
                    label: {
                      emphasis: {
                        position: "right",
                        show: false
                      }
                    }
                  };
                })
              },
              {
                // 类型
                type: "map",
                // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
                map: "江西",
                geoIndex: 0,

                // 地图区域的多边形 图形样式
                itemStyle: {
                  color: function(param) {
                    let name = param.name;
                    if (
                      "南昌市" == name ||
                      "新余市" == name ||
                      "赣州市" == name ||
                      "鹰潭市" == name
                    ) {
                      return "#ECCAD5";
                    } else if ("吉安市" == name || "上饶市" == name) {
                      return "#DAE9D7";
                    } else if (
                      "九江市" == name ||
                      "萍乡市" == name ||
                      "抚州市" == name
                    ) {
                      return "#F8E5C8";
                    } else {
                      return "#FFFCE0";
                    }
                  },
                  // 描边线宽 为 0 时无描边
                  borderWidth: 0.5,
                  // 图形的描边颜色 支持的颜色格式同 color
                  borderColor: "#000",
                  // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                  borderType: "solid"
                }
              }
            ]
          });
        }
      });
    }
  },
  mounted() {
    //this.findSampleLocation();
    this.loadMap();
  }
};
</script>

<style>
.dis_map_containerLocation {
  height: 800px;
}
</style>
