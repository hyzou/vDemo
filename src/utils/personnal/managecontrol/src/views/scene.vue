<template>
  <div id="scene" class="scene">
    <ahheader :headerOption="headerOption" />
    <leftBtns :leftButtonsArray="leftBtns" @leftBtnOperate="leftBtnOperate" />
    <div class="main" v-show="!noDataStatus">
      <div id="storeHouseList">
        <div
          v-for="position in listDataPosition"
          :key="position.id"
          :id="position.id"
          :class="['storeHouseItem',{storeHouseItemBorder: position.storeHouseItemBorder}]"
          :name="position.name"
          :style="position.attr"
          @click="pitchOnStoreHouse(position.id)"
        >
          <div
            :id="position.id + 'storeHouseTip'"
            :storeHouseId="position.id"
            :class="['storeHouseTip',{
                storeHouseNoTip:tipStyle.storeHouseNoTip,
                storeHouseMonitorTip:tipStyle.storeHouseMonitorTip,
                storeHouseNumTip:tipStyle.storeHouseNumTip
              }]"
            v-html="position.name"
          ></div>
        </div>
      </div>
      <sidebar ref="sidebar" :storeHouseData="storeHouseData" :monitorData="monitorData" />
    </div>
    <noData v-show="noDataStatus" />
  </div>
</template>

<script>
import ahheader from "@/components/ahheader.vue";
import leftBtns from "@/components/leftButtonsGroup.vue";
import sidebar from "@/components/sidebar.vue";
import noData from "@/components/noData.vue";

import { Toast, Button, Popup } from "mint-ui";

import common from "@/util/commonJs.js";
import socket from "@/util/socketJs.js";
import touch from "@/util/touchJs.js";

import storeHousePosition from "@/config/271sceneConfig.json";

export default {
  name: "scene",
  components: {
    ahheader,
    leftBtns,
    sidebar,
    noData
  },
  data() {
    return {
      /* 仓房数据列表 */
      listData: [],
      /* 仓房数据列表的数组映射 */
      listDataMap: {},
      /* 仓房位置信息 */
      listDataPosition: [],
      /* 头部导航配置信息 */
      headerOption: {
        title: "库区场景",
        routePath: "/manage"
      },
      /* 判定列表数据是否为空 */
      noDataStatus: true,
      /* stompClient进程对象 */
      stompClient: null,
      /* socket订阅对象 */
      subscribeStorePointState: null,
      subscribeStorePointRealTime: null,
      /* 左边按钮列表 */
      leftBtns: [
        {
          type: "sh-data",
          text: "仓房信息",
          icon: "zonglan",
          isDisabled: true
        },
        {
          type: "sh-monitor",
          text: "仓房监控",
          icon: "shipinjiankong",
          isDisabled: false
        }
        // {
        //   type: "num-detection",
        //   text: "数量检测",
        //   icon: "jiance",
        //   isDisabled: false
        // }
      ],
      /* 标签样式和被选中的功能 */
      tipStyle: {
        checked: "sh-data",
        storeHouseNoTip: true,
        storeHouseMonitorTip: false,
        storeHouseNumTip: false
      },
      /* 标签样式和被选中的功能映射 */
      tipStyleMap: {
        "sh-data": "storeHouseNoTip",
        "sh-monitor": "storeHouseMonitorTip",
        "num-detection": "storeHouseNumTip"
      },
      /* 选中仓房数据 */
      storeHouseData: {},
      /* 选中仓的监控设备列表 */
      monitorData: []
    };
  },
  mounted() {
    let that = this;
    this.headerOption = {
      title: that.$store.state.pointInfo.storePointName + "库区场景",
      routePath: "/manage"
    };
    that.getStoreHouse();
    that.openSocketSubscribe();

    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    if (width < height) {
      Toast({
        message: "建议横屏观看！",
        iconClass: "icon icon-success"
      });
    }
  },
  methods: {
    /* 获取当前设备列表信息 */
    getStoreHouse() {
      const that = this;
      let storeHouseIdMap = {};
      let data = {
        storePointId: that.$store.state.pointInfo.storePointId,
        tokenId: that.$store.state.userInfo.tokenId,
        userName: that.$store.state.userInfo.userName
      };
      that
        .$http(that.$api.getStorePointWithHouses(), data, true)
        .then(function(xhr) {
          that.listData = xhr.storeHouseList;
          if (that.listData.length > 0) {
            that.noDataStatus = false;
            that.listData = that.listData.map(function(item, i) {
              item = {
                storeHouseId: item.storeHouseId,
                storeHouseName: item.storeHouseName,
                length: item.length,
                width: item.width,
                height: item.height,
                radius: item.radius,
                designCapacity: item.designCapacity,
                baseData: {
                  storeHouseName: item.storeHouseName,
                  storeHouseType: item.storeHouseType || "—",
                  operatorName: item.keeperName || "—",
                  designCapacity: item.designCapacity || "—",
                  gbdName:
                    item.houseGrainStorage == undefined
                      ? "—"
                      : item.houseGrainStorage.grainType || "—",
                  num:
                    item.houseGrainStorage == undefined
                      ? "—"
                      : item.houseGrainStorage.storageCapacity != undefined
                      ? item.houseGrainStorage.storageCapacity
                      : "—",
                  haverstYear:
                    item.houseGrainStorage == undefined
                      ? "—"
                      : item.houseGrainStorage.harvestTime || "—",
                  storageName:
                    item.houseGrainStorage == undefined
                      ? "—"
                      : item.houseGrainStorage.storageType || "—",
                  grainOrigin:
                    item.houseGrainStorage == undefined
                      ? "—"
                      : item.houseGrainStorage.grainOrigin || "—",
                  grainLevel:
                    item.houseGrainStorage == undefined
                      ? "—"
                      : item.houseGrainStorage.grainLevel || "—",
                  heapLength: parseFloat(item.length).toFixed(2),
                  heapWidth: parseFloat(item.width).toFixed(2),
                  heapHeight: parseFloat(item.grainHeight).toFixed(2),
                  workStatus: "无作业"
                },
                grainData: {
                  insideTemperature: null,
                  outsideTemperature: null,
                  insideHumidity: null,
                  outsideHumidity: null,
                  maxTemperature: null,
                  minTemperature: null,
                  avgTemperature: null
                },
                warnData: {
                  failedPoint: null,
                  pestSituation: null,
                  highTemperatureSituation: null
                }
              };
              that.listDataMap[item.storeHouseId] = i;
              storeHouseIdMap[item.storeHouseName] = item.storeHouseId;
              return item;
            });
            that.getStoreHousePosition(storeHouseIdMap);
          }
        });
    },
    /* 获取仓房对应地图的位置信息 */
    getStoreHousePosition(storeHouseIdMap) {
      const that = this;
      storeHousePosition.modelAttr.map(function(house) {
        that.listDataPosition.push({
          id: storeHouseIdMap[house.name],
          name: house.name,
          attr: house.attr,
          storeHouseItemBorder: false,
          storeHouseItemHover: true
        });
      });
    },
    /* 点击仓房弹出信息框 */
    pitchOnStoreHouse(id) {
      this.listDataPosition.map(item => {
        if (item.id === id) {
          item.storeHouseItemBorder = true;
        } else {
          item.storeHouseItemBorder = false;
        }
      });
      this.storeHouseData = this.listData[this.listDataMap[id]];
      this.$refs.sidebar.showInformation(this.tipStyle.checked);
      if (this.tipStyle.checked === "sh-monitor") {
        this.monitorData = [];
        this.getStoreHouseMonitors(id);
      }
    },
    /* 获取仓房下所有的监控设备 */
    getStoreHouseMonitors(id) {
      const that = this;
      let data = {
        storePointId: that.$store.state.pointInfo.storePointId,
        storeHouseId: id,
        page: 1,
        rows: 1000
      };
      that.$http(that.$api.getHouseMonitor(), data, true).then(function(xhr) {
        if (xhr.rows.length > 0) {
          xhr.rows.map(function(item) {
            that.monitorData.push({
              id: item.deviceId,
              name: item.deviceDescribe
            });
          });
        }
      });
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
      let storePointId = that.$store.state.pointInfo.storePointId;
      that.stompClient = stompClient;
      that.subscribeStorePointState = socket.openSubscribe({
        stompClient: stompClient,
        url: that.$api.getStorePointState(storePointId).url,
        callback: that.subscribeFunc
      });
      that.subscribeStorePointRealTime = socket.openSubscribe({
        stompClient: stompClient,
        url: that.$api.getStorePointRealTime(storePointId).url,
        callback: that.realTimeSubscribeFunc
      });
    },
    subscribeFunc(response) {
      let data = JSON.parse(response.body);
      if (data.type === "WRAP_5T_2H") {
        data = data.wrapped;
        this.setTHData(data);
      } else if (data.type === "WRAP_HS_PROCESS_SCD") {
        data = data.wrapped;
        // this.setTPData(isThis.pageId, data);
      }
    },
    /* 仓房五温两湿socket数据处理 */
    setTHData(data) {
      let that = this;
      //  if(data.storeHouseId == "518" || data.storeHouseId == 518) debugger;
      let wsValue = {};
      if (common.hasValue(data.weatherStationResult)) {
        let ws = data.weatherStationResult;
        if (ws.weatherStations instanceof Array) {
          if (common.hasValue(ws.weatherStations[0])) {
            if (common.hasValue(ws.weatherStations[0].value)) {
              wsValue = ws.weatherStations[0].value;
            }
          }
        }
      }
      let thValue = {};
      if (common.hasValue(data.temperatureHumidityResult)) {
        let th = data.temperatureHumidityResult;
        if (th.temperatureHumiditys instanceof Array) {
          if (common.hasValue(th.temperatureHumiditys[0])) {
            if (common.hasValue(th.temperatureHumiditys[0].value)) {
              thValue = th.temperatureHumiditys[0].value;
            }
          }
        }
      }
      let tp = {};
      if (common.hasValue(data.temperaturePointResult)) {
        tp = data.temperaturePointResult;
      }
      let information = {
        acqTime: data.acqTime,
        storePointId: data.storePointId,
        storeHouseId: data.storeHouseId,
        outsideTemperature: wsValue.temperature,
        outsideHumidity: wsValue.humidity,
        grainData: {
          insideTemperature: thValue.temperature,
          insideHumidity: thValue.humidity,
          maxTemperature: tp.maxTemperature,
          minTemperature: tp.minTemperature,
          avgTemperature: tp.avgTemperature
        },
        failedPoint: tp.faultPointsSize
      };

      that.listData.map(function(item) {
        item.grainData.outsideTemperature = information.outsideTemperature;
        item.grainData.outsideHumidity = information.outsideHumidity;
        if (item.storeHouseId === information.storeHouseId) {
          for (let key in information.grainData) {
            item.grainData[key] = information.grainData[key];
          }
          item.warnData.failedPoint = information.failedPoint;
        }
        if (that.storeHouseData.storeHouseId === item.storeHouseId) {
          that.storeHouseData = item;
        }
        return item;
      });
    },
    /* 仓房实时数据处理 */
    realTimeSubscribeFunc(response) {
      let data = JSON.parse(response.body);
    },
    /* 左侧按钮列表事件 */
    leftBtnOperate(msg) {
      const that = this;

      that.tipStyle.checked = msg.type;
      that.leftBtns.map(function(item) {
        if (item.type === msg.type) {
          item.isDisabled = true;
          that.tipStyle[that.tipStyleMap[item.type]] = true;
        } else {
          item.isDisabled = false;
          that.tipStyle[that.tipStyleMap[item.type]] = false;
        }
      });

      that.listDataPosition.map(function(item) {
        let storeHouse = that.listData[that.listDataMap[item.id]];
        if (msg.type === "num-detection") {
          item.name =
            "仓号：" +
            storeHouse.storeHouseName +
            "<br/>种类：" +
            storeHouse.baseData.gbdName +
            "<br/>数量：" +
            storeHouse.baseData.num;
        } else {
          item.name = storeHouse.storeHouseName;
        }
      });
    }
  },
  beforeDestroy() {
    /* 生命周期结束，关闭socket */
    if (this.stompClient) {
      socket.closeSubscribe([
        this.subscribeStorePointState,
        this.subscribeStorePointRealTime
      ]);
      socket.socketDisconnect(this.stompClient);
    }
  }
};
</script>
<style lang = 'less' scoped>
#scene {
  width: 100%;
  height: 100%;
  .main {
    position: relative;
    background: url(../assets/scene2d.png) no-repeat;
    background-size: 100% 100%;
    left: 60px;
    width: calc(100% - 60px);
    height: 100%;
    #storeHouseList {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      .storeHouseItem {
        position: absolute;
        text-align: center;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        .storeHouseTip {
          position: absolute;
          color: #fff;
        }
        .storeHouseNoTip {
          font-size: 0.5em;
          line-height: 2em;
          text-align: center;
          width: 3em;
          height: 2em;
          background: url(../assets/tooltip.png) no-repeat;
          background-size: 100% 100%;
          opacity: 1;
          padding-left: 0px;
          padding-right: 0px;
          border-radius: 0px;
          border: none;
        }
        .storeHouseMonitorTip {
          font-size: 0.5em;
          line-height: 2em;
          text-align: center;
          width: 3em;
          height: 2em;
          background: url(../assets/monitor.png) no-repeat;
          background-size: 100% 100%;
          opacity: 1;
          padding-left: 0px;
          padding-right: 1em;
          border-radius: 0px;
          border: none;
        }
        .storeHouseNumTip {
          font-size: 0.3em;
          line-height: 2em;
          text-align: left;
          width: 8em;
          height: 6em;
          background: #1d1d1d;
          opacity: 0.8;
          padding-left: 1em;
          padding-right: 0px;
          border-radius: 3px;
          border: 1px solid #aaa;
        }
      }
      .storeHouseItemBorder {
        border: 1px solid #ff7f00;
      }
    }
  }
}
</style>