<template>
  <div class="manage" v-if="formdata">
    <myheader
      :myheaderOption="headerOptionSettings"
      @myheaderRightFnc="handleMyheaderRightFnc"
    />
    <mt-cell title="分机名" :value="formdata.controllerName"></mt-cell>
    <mt-cell title="连接类型" :value="formdata.connectionType_dsc"></mt-cell>
    <template v-if="formdata.connectionType !== 'tcp'">
      <mt-cell title="串口" :value="formdata.port"></mt-cell>
    </template>
    <template v-else>
      <mt-cell title="IP地址" :value="formdata.host"></mt-cell>
      <mt-cell title="端口" :value="formdata.port"></mt-cell>
    </template>
    <mt-cell title="协议类型" :value="formdata.protocolType"></mt-cell>
    <template v-for="param in paramlist">
      <mt-cell
        v-if="formdata.protocolParameter[param.paramName]"
        :key="param.paramName"
        :title="param.paramDesc"
        :value="formdata.protocolParameter[param.paramName]"
      ></mt-cell>
    </template>
    <div v-if="equipmentList.length > 0">
      <div v-for="equipmentP in equipmentList" :key="equipmentP.deviceType">
        <div class="title">
          <mt-cell
            :title="equipmentP.deviceType_dsc"
            @click.native="equipmentP.expand = !equipmentP.expand"
          >
            <iconSvg iconClass="iconjiantoushang" v-show="equipmentP.expand" />
            <iconSvg iconClass="iconjiantouxia" v-show="!equipmentP.expand" />
          </mt-cell>
        </div>
        <div class="pl10 bgfff" v-show="equipmentP.expand">
          <mt-cell
            v-for="equipmentItem in equipmentP.deviceList"
            :key="equipmentItem.id"
            :title="equipmentItem.title"
            @click.native="handleRouterTo(equipmentItem.id, equipmentItem)"
            is-link
          >
            <span
              :class="
                equipmentItem.localTestResult !== '1'
                  ? 'text-danger'
                  : 'text-success'
              "
            >
              {{ equipmentItem.localTestStatus }}
            </span>
            <span
              :class="
                equipmentItem.remoteTestResult !== '1'
                  ? 'text-danger'
                  : 'text-success'
              "
            >
              {{ equipmentItem.remoteTestStatus }}
            </span>
            <!-- <span style="color: green">{{ equipmentItem.status }}</span> -->
          </mt-cell>
        </div>
      </div>
    </div>
    <div v-else>
      <mt-cell title="还没有测试过设备！"></mt-cell>
      <div class="largeBtnContainer">
        <mt-button
          size="large"
          type="primary"
          @click.native="handleMyheaderRightFnc"
        >
          添加设备
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "equipmentList",
  components: {
    myheader: () => import("@/components/myheader"),
    iconSvg: () => import("@/components/iconFontSvg")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "设备分机",
        routePath: "home",
        rightIcon: "icontianjia"
      },
      formdata: {},
      equipmentList: [],
      paramlist: [],
      // 控制器id
      controllerId: this.$route.query.eqpId ? this.$route.query.eqpId : ""
    };
  },
  methods: {
    handleMyheaderRightFnc() {
      this.$route.query.testEqpId = "";
      this.$router.push({
        path: "addEqpExt",
        query: this.$route.query
      });
    },
    handleRouterTo(id, item) {
      this.$store.dispatch("setPlcCanTestProgram", item.local);
      let routeQuery = this.$route.query;
      let query = Object.assign({}, routeQuery, {
        testEqpId: id
      });
      this.$router.push({ path: "addEqpExt", query: query });
    },
    //获取分机信息
    getControllerConfig(eqpId) {
      if (!eqpId && eqpId != 0) {
        return;
      }
      let _this = this;
      _this
        .$postData(_this.$api.getControllerConfig, {
          controllerId: eqpId
        })
        .then(xhr => {
          if (xhr && xhr.data) {
            _this.getDeviceConfigList(xhr.data);
            xhr.data.testControllerDto.connectionType_dsc =
              xhr.data.testControllerDto.connectionType == "serial"
                ? "串口"
                : "TCP";
            _this.paramlist =
              _this.$store.getters.protocolParamsDatas[
                xhr.data.testControllerDto.protocolType
              ].paramList;
            _this.formdata = xhr.data.testControllerDto;
            _this.controllerId = xhr.data.controllerId;
          }
        });
      // .catch(err => {});
    },
    //获取分机对应的设备列表
    getDeviceConfigList(data) {
      // if (!eqpId && eqpId != 0) {
      //   return;
      // }
      let _this = this;
      _this.$postData(_this.$api.getDeviceList, data).then(xhr => {
        if (xhr && xhr.data && xhr.data.length > 0) {
          let dataArr = [];
          xhr.data.forEach(device => {
            let json = {
              id: device.deviceId,
              title: device.deviceName,
              deviceType: device.deviceType,
              deviceType_dsc: "",
              status: "",
              localTestResult: device.localTestResult,
              remoteTestResult: device.remoteTestResult,
              localTestStatus: "",
              remoteTestStatus: "",
              local: null
            };
            _this.$store.getters.eqpTpyeDatas.map(type => {
              if (type.value == device.deviceType) {
                json.deviceType_dsc = type.label;
              }
            });
            if (device.localTestResult === "notDetected") {
              json.status = "柜控未测试,";
              json.localTestStatus = "柜控未测试,";
              json.local = false;
            } else if (device.localTestResult === "1") {
              json.status = "柜控测试成功,";
              json.localTestStatus = "柜控测试成功,";
              json.local = true;
            } else {
              json.status = "柜控测试失败,";
              json.localTestStatus = "柜控测试失败,";
              json.local = false;
            }
            if (device.remoteTestResult === "notDetected") {
              json.status += "程控未测试";
              json.remoteTestStatus = "程控未测试";
            } else if (device.remoteTestResult === "1") {
              json.status += "程控测试成功";
              json.remoteTestStatus = "程控测试成功";
            } else {
              json.status += "程控测试失败";
              json.remoteTestStatus = "程控测试失败";
            }
            dataArr.push(json);
          });
          dataArr.map(mapItem => {
            if (_this.equipmentList.length == 0) {
              _this.equipmentList.push({
                deviceType: mapItem.deviceType,
                deviceType_dsc: mapItem.deviceType_dsc,
                deviceList: [mapItem],
                expand: false
              });
            } else {
              let res = _this.equipmentList.some(item => {
                //判断相同日期，有就添加到当前项
                if (item.deviceType == mapItem.deviceType) {
                  item.deviceList.push(mapItem);
                  return true;
                }
              });
              if (!res) {
                //如果没找相同日期添加一个新对象
                _this.equipmentList.push({
                  deviceType: mapItem.deviceType,
                  deviceType_dsc: mapItem.deviceType_dsc,
                  deviceList: [mapItem],
                  expand: false
                });
              }
            }
          });
        }
      });
    }
  },
  mounted() {
    this.getControllerConfig(this.$route.query.eqpId);
  }
};
</script>
