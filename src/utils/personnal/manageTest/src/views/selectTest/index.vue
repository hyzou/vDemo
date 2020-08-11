<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-cell
      class="selectTestProcess"
      v-for="testProcess in testProcessList"
      :key="testProcess.id"
      :title="testProcess.name"
      @click.native="handleRouterTo(testProcess)"
      is-link
      :value="testProcess.status"
    >
      <!-- :label="testProcess.description" -->
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: "selectTest",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      formdata: {},
      headerOptionSettings: {
        hideleft: false,
        title: "选择测试流程",
        routePath: "equipmentList"
      }
    };
  },
  methods: {
    // 项目点击事件，测试流程点击跳转
    handleRouterTo(processObj) {
      this.$store.dispatch("setChosedProcess", processObj);
      this.$store.dispatch("setMainTestInfo", {
        key: "testProcessId",
        value: processObj.id
      });
      this.$store.dispatch("setMainTestInfo", {
        key: "testProcessStepId",
        value: 0
      });
      this.$router.push({ path: "preTestEqp" });
    },
    // 获取设备信息
    getDeviceConfig(testEqpId) {
      let _this = this;
      _this
        .$postData(_this.$api.getDeviceConfig, { deviceId: testEqpId })
        .then(xhr => {
          if (xhr && xhr.data) {
            _this.formdata = JSON.parse(xhr.data.testDeviceDto.deviceParameter);
          }
        });
    }
  },
  mounted() {
    if (
      this.$store.getters.mainTestInfo.testEqpId ||
      this.$store.getters.mainTestInfo.testEqpId === 0
    ) {
      if (this.$store.getters.mainTestInfo.testEqpId) {
        this.getDeviceConfig(this.$store.getters.mainTestInfo.testEqpId);
      }
    }
  },
  computed: {
    testProcessList() {
      let processlist = this.$store.getters.testProcess,
        processArr = [];
      processlist.map(process => {
        if (this.formdata.eqpTpye == process.type) {
          processArr = process.detailProcess;
        }
      });
      return processArr;
    }
  }
};
</script>
