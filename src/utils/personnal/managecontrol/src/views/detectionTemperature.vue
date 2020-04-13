<template>
  <div id="detectionTemperature" class="detectionTemperature">
    <ahheader :headerOption="headerOption" />
    <div class="charts" v-show="!noDataStatus">
      <scatter3D ref="updateCharts" :option="echartsOption" />
    </div>
    <mt-button class="manualTemp" type="primary"  @click.native="manualTemperature" :disabled = "manualTemp.disabled">测温</mt-button>
    <noData v-show="noDataStatus" />
  </div>
</template>

<script>
import ahheader from "@/components/ahheader.vue";
import scatter3D from "@/components/scatter3DCharts.vue";
import noData from "@/components/noData.vue";

import { Toast,Button } from "mint-ui";

import common from "@/util/commonJs.js";
import socket from "@/util/socketJs.js";
import updateVisualMap from "@/util/updateVisualMap.js";
import touch from "@/util/touchJs.js";

export default {
  name: "detectionTemperature",
  components: {
    ahheader,
    scatter3D,
    noData
  },
  data() {
    return {
      /* 测温点数据列表 */
      listData: [],
      /* 测温点数据列表数组的映射 */
      listDataMap: {},
      /* 给测温点数据分组，创建层排列和其他 */
      pointFloor: {
        other: {},
        x: {},
        y: {},
        z: {}
      },
      /* 生成echarts所需数据 */
      echartsOption: {
        seriesIndex: [0],
        xAxis3D: {
          name: "列"
        },
        yAxis3D: {
          name: "排"
        },
        zAxis3D: {
          name: "层"
        },
        divPosition: {
          width: window.innerWidth * 0.9 + "px",
          height: window.innerHeight + "px",
          left: 0,
          top: 0
        }
      },
      /* 初始series配置 */
      initSeries: {
        type: "scatter3D",
        symbolSize: 6,
        show: true,
        itemStyle: {
          // 图形样式，normal 是图形在默认状态下的样式；emphasis
          // 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
          normal: "emphasis",
          emphasis: {
            show: true,
            color: "#CC00FF", // 颜色
            position: "top",
            borderColor: "#e5e5e5", // 边框颜色
            borderWidth: 0.1, // 柱条的描边宽度，默认不描边。
            borderType: "solid", // 柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
            barBorderRadius: 0, // 柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
            shadowBlur: 10, // 图形阴影的模糊大小。
            shadowColor: "#000", // 阴影颜色
            shadowOffsetX: 0, // 阴影水平方向上的偏移距离。
            shadowOffsetY: 0, // 阴影垂直方向上的偏移距离。
            opacity: 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          }
        }
      },
      /* 起始位置指示图表 */
      initialPoint: {
        name: "起始位置",
        type: "scatter3D",
        symbol:
          "path://M410.642 385.938l-119.088 42.142c-34.382 12.168-47.187-3.356-27.037-35.228l219.779-347.616c19.906-31.486 52.82-31.871 72.969 1e-8l219.779 347.61599999c19.907 31.487 8.045 47.64199999-27.037 35.22700001l-119.088-42.14200001-89.078 559.012c-11.633 72.997-30.473 73.105-42.122 0l-89.078-559.013z",
        //symbol : 'arrow',
        symbolSize: [10, 2 * 10],
        show: true,
        data: [
          {
            value: [1, 1, 0],
            itemStyle: {
              color: "#00F5FF"
            },
            label: {
              show: true,
              formatter: function(params) {
                return "起始位置";
              },
              textStyle: {
                fontSize: 0.8 * 14
              },
              position: "bottom"
            },
            visualMap: false
          }
        ]
      },
      /* 测温阵列最高最低温 */
      maxTemp: -999,
      minTemp: 999,
      /* 头部导航配置信息 */
      headerOption: {
        title: "温湿度检测",
        routePath: "/choseHouse"
      },
      /* 判定列表数据是否为空 */
      noDataStatus: true,
      /* stompClient进程对象 */
      stompClient: null,
      /* socket订阅对象 */
      subscribeDeviceState: null,
      subscribeStoreHouseState: null,
      subscribeDeviceRealTime: null,
      /* 存储实时的测温点数据 */
      pointData: [],
      /* 每5秒循环更新测温阵列的定时器 */
      updatePointInterval: null,
      /* 检测手动测温是否超时的延时器 */
      tempTimeOut: null,
      /* 测温按钮参数 */
      manualTemp:{
        disabled : true
      }
     
    };
  },
  props: {
    showData: Array
  },
  mounted() {
    let that = this;
    this.headerOption = {
      title: that.$route.query.storeHouseName + "温湿度检测",
      routePath: "/choseHouse"
    };
    that.getStoreHouseDevice();
    that.openSocketSubscribe();
    that.updatePointInterval = setInterval(function() {
      if (that.pointData.length > 0) {
        that.updateCharts(that.pointData);
        that.pointData = [];
      }
    }, 5000);

    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    if (width < height) {
      Toast({
        message: "建议横屏观看！",
        iconClass: "icon icon-success"
      });
    }

    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    let func = function() {
      setTimeout(() => {
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        let echartsDom = document.getElementById("echarts-scatter-3d");
        let myCharts = echarts.getInstanceByDom(echartsDom);

        echartsDom.style.width = width * 0.9 + "px";
        echartsDom.style.height = height + "px";
        if (myCharts) {
          myCharts.resize();
        }
      }, 500);
    };
    window.removeEventListener(evt, func);
    window.addEventListener(evt, func);
    // let dom = document.getElementById("detectionTemperature");
    // common.orientation(dom);
    // touch.onFunc({
    //   obj: dom,
    //   tranlateFunc: function(xOffset,yOffset){
    //     let dom = document.getElementById('detectionTemperature');
    //   }
    // });
  },
  methods: {
    /* 获取当前设备列表信息 */
    getStoreHouseDevice() {
      const that = this;
      let data = that.$store.state.userInfo;
      data.storePointId = that.$store.state.pointInfo.storePointId;
      data.storeHouseId = that.$route.query.storeHouseId;
      that
        .$http(that.$api.getStoreHouseDevice(), data, true)
        .then(function(xhr) {
          if (xhr.deviceDisplayList.length > 0) {
            that.noDataStatus = false;
            that.createOption(xhr.deviceDisplayList);
          }
        });
    },
    /* 创建echarts所需数据 */
    createOption(data) {
      const that = this;

      let dataList = [];
      let maxXYZ = {
        x: 0,
        y: 0,
        z: 0
      };

      data.map(function(item, i) {
        if (item.deviceType == "t_points") {
          that.listData.push(item);
          dataList.push(that.getPointData(item));
          that.listDataMap[item.generalOrder] = i;
          maxXYZ.x = Math.max(maxXYZ.x, item.x);
          maxXYZ.y = Math.max(maxXYZ.y, item.y);
          maxXYZ.z = Math.max(maxXYZ.z, item.z);
        }
      });

      let option = {
        xAxis3D: {
          max: maxXYZ.x + 1
        },
        yAxis3D: {
          max: maxXYZ.y + 1
        },
        zAxis3D: {
          max: maxXYZ.z + 1
        },
        visualMap: updateVisualMap.updateVisualMapData(),
        series: []
      };

      let scatter = {
        name: "测温点",
        dimensions: ["x", "y", "z", "线缆号", "点位", "温度", "差值"],
        label: {
          show: true,
          formatter: function(params) {
            let resultlabel = that.labelFormatter(params);
            return resultlabel;
          },
          textStyle: {
            fontSize: 10
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return that.tooltipFormatter(params);
          }
        },
        data: dataList
      };

      option.series.push({ ...scatter, ...that.initSeries });
      option.series.push(...that.createPointLine(that.listData));
      option.series.push(that.initialPoint);

      that.$refs.updateCharts.updateCharts(option);
    },
    /* 更新 */
    updateOption(data) {
      const that = this;

      data.map(function(item, i) {
        let value = item.value / 10;
        let index = that.listDataMap[item.generalOrder];

        that.listData[index].value = value;
        that.maxTemp = Math.max(that.maxTemp, value);
        that.minTemp = Math.min(that.minTemp, value);
      });
      let dataList = [];
      that.listData.map(function(item, i) {
        dataList.push(that.getPointData(item, that.maxTemp, that.minTemp));
      });
      if(that.$refs.updateCharts){
          that.$refs.updateCharts.updateCharts({
              series: [
                  {
                      name: "测温点",
                      data: dataList
                  }
              ]
          });
      }
    },
    /* 更新echarts所需数据 */
    getPointData(item, maxTemp, minTemp) {
      let val = [
        item["x"],
        item["y"],
        item["z"],
        item["lineOrder"],
        item["pointOrder"],
        item["value"]
      ];
      if (this.$common.hasValue(maxTemp)) {
        if (item["value"] == maxTemp) {
          return {
            value: val,
            itemStyle: {
              borderWidth: 1,
              color: "#FF0A00"
            },
            // label : isThis.label,
            visualMap: false
          };
        }
      }
      if (this.$common.hasValue(minTemp)) {
        if (item["value"] == minTemp) {
          return {
            value: val,
            itemStyle: {
              borderWidth: 1,
              color: "#000AFF"
            },
            //   label : isThis.label,
            visualMap: false
          };
        }
      }
      if (!this.$common.hasValue(item["value"])) {
        return {
          value: val,
          itemStyle: {
            borderWidth: 1,
            color: "#c4c3bf"
          },
          visualMap: false
        };
      }
      return val;
    },
    /* 创建测温阵列中的线缆 */
    createPointLine(points) {
      let lineMapping = {};
      let series = [];
      points.map(function(point, i) {
        if (lineMapping[point.lineOrder + ""] instanceof Array) {
          lineMapping[point.lineOrder + ""].push([point.x, point.y, point.z]);
        } else {
          lineMapping[point.lineOrder + ""] = [];
          lineMapping[point.lineOrder + ""].push([point.x, point.y, point.z]);
        }
        if (points.length - 1 == i) {
          for (let key in lineMapping) {
            series.push({
              type: "line3D",
              color: ["#c4c3bf"],
              data: lineMapping[key],
              lineStyle: {
                width: 1
              },
              tooltip: {
                show: false
              }
            });
          }
        }
      });
      return series;
    },
    /* 测温点标签格式 */
    labelFormatter(params) {
      let hasValue = this.$common.hasValue;

      let resultlabel = "";
      if (!hasValue(params.value[5])) {
        resultlabel = resultlabel + "—";
      } else {
        resultlabel = resultlabel + params.value[5];
      }
      if (
        !hasValue(params.value[6]) &&
        typeof params.value[6] !== "undefined"
      ) {
        resultlabel = resultlabel + "(—)";
      } else if (hasValue(params.value[6])) {
        resultlabel = resultlabel + "(" + params.value[6] + ")";
      }
      return resultlabel;
    },
    /* 测温点提示框格式 */
    tooltipFormatter(params) {
      let hasValue = this.$common.hasValue;

      let res = "测温点<br/>";
      res += params.marker + "<br/>";
      if (hasValue(params.data.value)) {
        res += "-位置x:" + parseInt(params.data.value[0]) + "<br/>";
        res += "-位置y:" + params.data.value[1] + "<br/>";
        res += "-层z:" + (params.data.value[2] * 1 - 0.1).toFixed(0) + "<br/>";
        res += "-线缆号：" + params.data.value[3] + "<br/>";
        res += "-点位：" + params.data.value[4] + "<br/>";
        if (!hasValue(params.data.value[5])) {
          res += "-温度:无效值<br/>";
          if (hasValue(params.data.value[6])) {
            res += "-对比值:" + params.data.value[6] + "<br/>";
          }
        } else {
          res += "-温度:" + params.data.value[5] + "<br/>";
          if (params.data.value[6] || params.data.value[6] === 0) {
            res += "-差值:" + params.data.value[6] + "<br/>";
          }
        }
        if (
          !hasValue(params.data.value[6]) &&
          typeof params.data.value[6] !== "undefined"
        ) {
          res += "-差值:无效值<br/>";
        }
      } else {
        res += "-位置x:" + params.data[0] + "<br/>";
        res += "-位置y:" + params.data[1] + "<br/>";
        res += "-层z:" + (params.data[2] * 1 - 0.1).toFixed(0) + "<br/>";
        res += "-线缆号：" + params.data[3] + "<br/>";
        res += "-点位：" + params.data[4] + "<br/>";
        if (!hasValue(params.data[5])) {
          res += "-温度:无效值<br/>";
          if (hasValue(params.data[6])) {
            res += "-对比值:" + params.data[6] + "<br/>";
          }
        } else {
          res += "-温度:" + params.data[5] + "<br/>";
          if (hasValue(params.data[6])) {
            res += "-差值:" + params.data[6] + "<br/>";
          }
        }
        if (
          !hasValue(params.data[6]) &&
          typeof params.data[6] !== "undefined"
        ) {
          res += "-差值:无效值<br/>";
        }
      }
      return res;
    },
    /* 发送socket信息进行测温操作 */
    manualTemperature() {
      const that = this;
      let storePointId = that.$store.state.pointInfo.storePointId,
        storeHouseId = that.$route.query.storeHouseId;

      Toast({
            message: '开始测温！',
            iconClass: 'icon icon-success'
        });
      that.stompClient.send(that.$api.getHouseState(storePointId, storeHouseId).url,{}, "");

      //开始测温，将测温按钮禁用
      that.manualTemp.disabled = true;
      //创建延时器，当测温超时后给出提示
      if (!that.tempTimeOut) {
        that.tempTimeOut = setTimeout(() => {
          Toast({
            message: '测温超时！',
            iconClass: 'icon icon-success'
          });
          that.manualTemp.disabled = false;
          clearTimeout(that.tempTimeOut);
        }, 15000);
      }
    },
    /* 开启socket和相关订阅 */
    openSocketSubscribe() {
      const that = this;

      socket.socketConnect({
        stompClient: that.stompClient,
        url: that.$api.socketMain().url,
        userName: that.$store.state.userInfo.userName,
        callback: that.openSubscribe
      });
    },
    openSubscribe(stompClient) {
      const that = this;
      let storePointId = that.$store.state.pointInfo.storePointId,
        storeHouseId = that.$route.query.storeHouseId,
        userName = that.$store.state.userInfo.userName;
      that.stompClient = stompClient;
      that.subscribeDeviceState = socket.openSubscribe({
        stompClient: stompClient,
        url: that.$api.getDeviceState(storePointId, storeHouseId).url,
        callback: that.subscribeFunc
      });
      that.subscribeStoreHouseState = socket.openSubscribe({
        stompClient: stompClient,
        url: that.$api.getUserDeviceState(userName, storePointId, storeHouseId)
          .url,
        callback: that.subscribeFunc
      });
      that.subscribeDeviceRealTime = socket.openSubscribe({
        stompClient: stompClient,
        url: that.$api.getRealTimeDeviceState(storePointId, storeHouseId).url,
        callback: that.realTimeSubscribeFunc
      });
      //取消测温按钮的禁用
      that.manualTemp.disabled = false;
    },
    subscribeFunc(response) {
      let data = JSON.parse(response.body).wrapped.temperaturePointResult;
      this.updateOption(data.points);

      //接收到socket测温数据，取消测温按钮的禁用和清除延时器
      clearTimeout(this.tempTimeOut);
      this.manualTemp.disabled = false;
    },
    realTimeSubscribeFunc(response) {
      let data = JSON.parse(response.body);
      let pointData = [];
      data.map(function(point) {
        if (point.deviceType === "t_points") {
          pointData.push({
            deviceId: point.deviceId,
            generalOrder: point.generalOrder,
            value: point.newValue
          });
        }
      });
      this.pointData = pointData;
    }
  },
  beforeDestroy() {
    /* 生命周期结束，关闭socket */
    socket.closeSubscribe([
      this.subscribeDeviceState,
      this.subscribeStoreHouseState,
      this.subscribeDeviceRealTime
    ]);
    socket.socketDisconnect(this.stompClient);
    /* 关闭定时器 */
    clearInterval(this.updatePointInterval);
  }
};
</script>
<style lang = 'less' scoped>
.detectionTemperature {
  .charts {
    position: absolute;
    left: 5%;
    width: 90%;
    height: 100%;
  }
  .manualTemp {
    position: absolute;
    bottom: -1em;
    right: 3em;
  }
}
</style>