<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-cell
      v-for="testProcess in testProcessList"
      :key="testProcess.id"
      :title="testProcess.name"
      @click.native="handleRouterTo(testProcess)"
      is-link
      :value="testProcess.status"
      :label="testProcess.description"
    >
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
    handleRouterTo(processObj) {
      console.log(processObj);
      this.$store.dispatch("setChosedProcess", processObj);
      let queryObj = this.$route.query;
      queryObj.testProcessId = processObj.id;
      queryObj.testProcessStepId = 0;
      this.$router.push({ path: "preTestEqp", query: queryObj });
    }
  },
  mounted() {
    if (this.$route.query.testEqpId || this.$route.query.testEqpId == 0) {
      this.formdata = this.$store.getters.testInfo[this.$route.query.testEqpId];
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
