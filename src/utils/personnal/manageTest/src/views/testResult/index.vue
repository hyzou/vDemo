<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-cell title="设备名" :value="formdata.eqpName"> </mt-cell>
    <mt-cell title="设备类型" :value="formdata.eqpTpye_dsc"> </mt-cell>
    <mt-cell
      class="testResultTitle"
      v-if="testResultFlag == 'false'"
      :title="testResultTitle"
    >
    </mt-cell>
    <div class="page-part" v-for="field in fieldlist" :key="field.key">
      <mt-cell :title="field.label">
        <span class="mr5">{{ field.defaultValue }}</span>
        <template v-if="field.type != 'ip'">
          <span
            class="mr5 text-danger"
            v-if="field.getSocketVal && field.testflag == 'false'"
            >{{ field.getSocketVal }}</span
          >
          <mt-badge v-if="field.testflag == 'true'" type="success"
            >成功</mt-badge
          >
          <mt-badge v-if="field.testflag == 'false'" type="error"
            >失败</mt-badge
          >
          <mt-badge v-if="field.testflag == 'noTest'" type="warning"
            >未测试</mt-badge
          >
        </template>
      </mt-cell>
    </div>

    <!-- <div class="largeBtnContainer mt10">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo()"
      >
        保存测试结果
      </mt-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "testResult",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "测试结果",
        routePath: "equipmentList"
      },
      formdata: {
        eqpName: "",
        eqpTpye: "",
        eqpTpye_dsc: ""
      },
      deviceId: this.$store.getters.mainTestInfo.testEqpId
        ? this.$store.getters.mainTestInfo.testEqpId
        : "",
      deviceInfo: {},
      testResultFlag: this.$store.getters.plcTestResult.split("_")[0],
      testResultTitle: this.$store.getters.plcTestResult.split("_")[1],
      controllerId: this.$store.getters.mainTestInfo.eqpId
        ? this.$store.getters.mainTestInfo.eqpId
        : "",
      controllerInfo: {},
      storePointId: this.$store.getters.userInfo.storePointId
    };
  },
  methods: {
    // 存储测试结果
    handleSaveEqpInfo() {
      let historyParam = {},
        testdata = [];
      this.fieldlist.map(field => {
        let obj = {};
        if (field.type == "target") {
          obj.vid = field.key;
          if (field.testflag == "true") {
            obj.value = "successed";
          } else if (field.testflag == "noTest") {
            obj.value = "notDetected";
          } else {
            obj.value = "failed";
          }
          testdata.push(obj);
        }
      });
      historyParam.storePointId = this.storePointId;
      historyParam.controllerId = this.controllerId;
      historyParam.deviceId = this.deviceId;
      historyParam.controllerName = this.controllerInfo.controllerName;
      historyParam.deviceName = this.deviceInfo.deviceName;
      historyParam.controlMode =
        this.$store.getters.mainTestInfo.controlType == "program"
          ? "remote"
          : "local"; //”local”柜控,”remote”程控
      historyParam.testCase = this.$store.getters.chosedProcess.name;
      historyParam.testResult = this.testResultFlag == "true" ? "1" : "0";
      historyParam.testData = testdata;
      historyParam.disableFlag = "0";
      historyParam.abnormal = this.controllerInfo.abnormal;
      historyParam.controllerType = this.controllerInfo.controllerType;
      historyParam.testConfigDto = {
        testControllerDto: this.controllerInfo,
        testDeviceDto: this.deviceInfo
      };
      this.getsaveHistory(historyParam);
    },
    // 根据分机id获取分机信息
    getControllerConfig() {
      this.$postData(this.$api.getControllerConfig, {
        controllerId: this.controllerId,
        storePointId: this.storePointId
      }).then(xhr => {
        this.controllerId = xhr.data.controllerId;
        this.controllerInfo = xhr.data.testControllerDto;
        this.getDeviceConfig();
      });
    },
    // 获取设备信息
    getDeviceConfig() {
      this.$postData(this.$api.getDeviceConfig, {
        deviceId: this.deviceId
      }).then(xhr => {
        if (xhr && xhr.data) {
          this.deviceId = xhr.data.deviceId;
          this.deviceInfo = xhr.data.testDeviceDto;
          this.formdata = JSON.parse(xhr.data.testDeviceDto.deviceParameter);
          this.handleSaveEqpInfo(xhr.data);
        }
      });
    },
    // 保存测试结果
    getsaveHistory(data) {
      this.$postData(this.$api.saveHistory, data, true).then(xhr => {
        if (xhr && xhr.data) {
          this.$messagebox.alert("您的测试结果已生成！");
        }
      });
    }
  },
  mounted() {
    this.getControllerConfig();
  },
  computed: {
    fieldlist() {
      let flist = [];
      this.$store.getters.registers.map(item => {
        if (item.type == this.formdata.eqpTpye) {
          flist = [...item.formgroup];
        }
      });
      let newObj = {};
      this.$store.getters.plcTestErrorInfo.map(errinfo => {
        errinfo.controlR.map(controlItem => {
          newObj[controlItem.key] = controlItem;
        });
        errinfo.statusR.map(controlItem => {
          newObj[controlItem.key] = controlItem;
        });
      });
      flist.map(item => {
        item.defaultValue = this.formdata[item.key];
        if (newObj[item.key] && newObj[item.key].getSocketVal) {
          item.getSocketVal = newObj[item.key].getSocketVal;
        }
        if (!newObj[item.key]) {
          item.getSocketVal = "";
        }
        if (!item.getSocketVal) {
          item.testflag = "noTest";
        } else {
          if (item.defaultValue == item.getSocketVal) {
            item.testflag = "true";
          } else {
            item.testflag = "false";
          }
        }
      });
      return flist;
    }
  }
};
</script>
