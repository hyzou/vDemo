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
      <mt-cell
        v-for="equipment in equipmentList"
        :key="equipment.id"
        :title="equipment.title"
        @click.native="
          handleRouterTo(equipment.id, equipment.local, equipment.remote)
        "
        is-link
        :value="equipment.status"
      >
      </mt-cell>
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
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "设备分机",
        routePath: "home",
        rightIcon: "tianjia"
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
      this.$router.push({
        path: "addEqpExt",
        query: { eqpId: this.$route.query.eqpId }
      });
    },
    handleRouterTo(id, local, remote) {
      let routeQuery = this.$route.query;
      let query = {
        eqpId: routeQuery.eqpId,
        testEqpId: id,
        localTest: local,
        remoteTest: remote
      };
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
    getDeviceConfigList(eqpId) {
      if (!eqpId && eqpId != 0) {
        return;
      }
      let _this = this;
      _this
        .$postData(_this.$api.getDeviceList, {
          controllerId: eqpId
        })
        .then(xhr => {
          if (xhr && xhr.data && xhr.data.length > 0) {
            xhr.data.forEach(device => {
              let json = {
                id: device.deviceId,
                title: device.deviceName,
                status: "",
                local: null
              };
              if (device.localTestResult === "notDetected") {
                json.status = "柜控未测试,";
                json.local = false;
              } else {
                json.status = "柜控已测试,";
                json.local = true;
              }
              if (device.remoteTestResult === "notDetected") {
                json.status += "程控未测试";
                json.remote = false;
              } else {
                json.status += "程控已测试";
                json.remote = true;
              }
              _this.equipmentList.push(json);
            });
          }
        });
    }
  },
  mounted() {
    this.getControllerConfig(this.$route.query.eqpId);
    this.getDeviceConfigList(this.$route.query.eqpId);
  }
};
</script>
