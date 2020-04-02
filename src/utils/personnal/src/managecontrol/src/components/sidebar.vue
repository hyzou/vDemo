<template>
  <div class="sidebar-main">
    <mt-popup class="sidebar-content" v-model="popupVisible" position="right">
      <div v-show="sidebarView.informationView">
        <div class="tab-nav">
          <mt-button
            :type="btnType.tab1"
            size="small"
            @click.native.prevent="tabActive('tab1')"
          >基本信息</mt-button>
          <mt-button
            :type="btnType.tab2"
            size="small"
            @click.native.prevent="tabActive('tab2')"
          >粮情信息</mt-button>
          <mt-button
            :type="btnType.tab3"
            size="small"
            @click.native.prevent="tabActive('tab3')"
          >报警信息</mt-button>
        </div>
        <mt-tab-container class="sidebar-container" v-model="active">
          <mt-tab-container-item id="tab1">
            <template v-for="(item,index) in baseData">
              <mt-cell :key="index" :title="item.name" :value="item.value + item.unit"></mt-cell>
            </template>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab2">
            <template v-for="(item,index) in grainData">
              <mt-cell :key="index" :title="item.name" :value="item.value + item.unit"></mt-cell>
            </template>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab3">
            <template v-for="(item,index) in warnData">
              <mt-cell :key="index" :title="item.name" :value="item.value + item.unit"></mt-cell>
            </template>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div v-show="sidebarView.monitorView" class="sidebar-monitor">
        <template v-for="(item,index) in monitorData" v-show="hasMonitor">
          <mt-button
            :key="index"
            class="monitor-button"
            size="large"
            type="primary"
            @click.native="monitorAction(item.id)"
          >{{item.name}}</mt-button>
        </template>
        <noData v-show="!hasMonitor"></noData>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import noData from "@/components/noData.vue";

import { TabContainer, TabContainerItem } from "mint-ui";
import common from "@/util/commonJs.js";

export default {
  name: "sidebar",
  components: {
    noData
  },
  props: {
    storeHouseData: Object,
    monitorData: Array
  },
  data() {
    return {
      popupVisible: false,
      sidebarView: {
        informationView: true,
        monitorView: false
      },
      active: "tab1",
      btnType: {
        tab1: "primary",
        tab2: "default",
        tab3: "default"
      },
      baseData: {
        storeHouseName: {
          name: "仓房名称",
          value: "—",
          default: "—",
          unit: ""
        },
        storeHouseType: {
          name: "仓房类型",
          value: "—",
          default: "—",
          unit: ""
        },
        operatorName: {
          name: "保管员",
          value: "—",
          default: "—",
          unit: ""
        },
        gbdName: {
          name: "粮食品种",
          value: "—",
          default: "—",
          unit: ""
        },
        num: {
          name: "数量",
          value: "—",
          default: "—",
          unit: "kg"
        },
        haverstYear: {
          name: "收货年份",
          value: "—",
          default: "—",
          unit: ""
        },
        storageName: {
          name: "存储性质",
          value: "—",
          default: "—",
          unit: ""
        },
        workStatus: {
          name: "作业情况",
          value: "无作业",
          default: "无作业",
          unit: ""
        }
      },
      grainData: {
        insideTemperature: {
          name: "仓温",
          value: "—",
          default: "—",
          unit: "°C"
        },
        outsideTemperature: {
          name: "气温",
          value: "—",
          default: "—",
          unit: "°C"
        },
        insideHumidity: {
          name: "仓湿",
          value: "—",
          default: "—",
          unit: "%"
        },
        outsideHumidity: {
          name: "气湿",
          value: "—",
          default: "—",
          unit: "%"
        },
        maxTemperature: {
          name: "最高粮温",
          value: "—",
          default: "—",
          unit: "°C"
        },
        minTemperature: {
          name: "最低粮温",
          value: "—",
          default: "—",
          unit: "°C"
        },
        avgTemperature: {
          name: "平均粮温",
          value: "—",
          default: "—",
          unit: "°C"
        }
      },
      warnData: {
        failedPoint: {
          name: "测温失败点数",
          value: "—",
          default: "—",
          unit: ""
        },
        pestSituation: {
          name: "虫害警报",
          value: "无",
          default: "无",
          unit: ""
        },
        highTemperatureSituation: {
          name: "高温警报",
          value: "无",
          default: "无",
          unit: ""
        }
      }
    };
  },
  watch: {
    popupVisible(val) {},
    storeHouseData: {
      handler(val) {
        this.updateBaseData(val);
      },
      deep: true
    }
  },
  computed: {
    hasMonitor() {
      return this.monitorData.length > 0;
    }
  },
  mounted() {},
  methods: {
    tabActive(tab) {
      this.active = tab;
      for (let key in this.btnType) {
        if (key === tab) {
          this.btnType[key] = "primary";
        } else {
          this.btnType[key] = "default";
        }
      }
    },
    showInformation(type) {
      this.popupVisible = !this.popupVisible;
      for (let key in this.sidebarView) {
        this.sidebarView[key] = false;
      }
      if (type === "sh-data") {
        this.sidebarView.informationView = true;
      } else if (type === "sh-monitor") {
        this.sidebarView.monitorView = true;
      }
    },
    updateBaseData(data) {
      for (let key in this.baseData) {
        this.baseData[key].value = common.hasValue(data.baseData[key])
          ? data.baseData[key]
          : this.baseData[key].default;
      }
      for (let key in this.grainData) {
        this.grainData[key].value = common.hasValue(data.grainData[key])
          ? data.grainData[key]
          : this.grainData[key].default;
      }
      for (let key in this.warnData) {
        this.warnData[key].value = common.hasValue(data.warnData[key])
          ? data.warnData[key]
          : this.warnData[key].default;
      }
    },
    monitorAction(id) {
      console.log(id);
    }
  }
};
</script>
<style lang="less" scoped>
.sidebar-main {
  position: absolute;
  right: 0;
  .sidebar-content {
    width: 80%;
    height: 100%;
    .sidebar-container {
      position: absolute;
      width: 100%;
      height: 80%;
      overflow-y: auto;
    }
    .tab-nav {
      padding: 0.5em;
    }
    .sidebar-monitor {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 10% 0 10% 0;
      .monitor-button {
        width: 60%;
        margin: 5% auto;
      }
    }
  }
}
</style>
