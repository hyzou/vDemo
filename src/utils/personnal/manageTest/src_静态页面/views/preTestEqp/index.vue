<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-field
      label="设备名"
      placeholder="请输入设备名"
      v-model="formdata.eqpName"
    ></mt-field>
    <mt-field
      label="状态寄存器地址"
      placeholder="请输入状态寄存器地址"
      v-model="formdata.statusRegister"
    ></mt-field>
    <mt-field
      label="控制寄存器地址"
      placeholder="请输入控制寄存器地址"
      v-model="formdata.controlRegister"
    ></mt-field>
    <div class="pl15 mt15 mb15">
      <mt-cell :title="stepTestInfo.process[testStepId].tipsTitle"></mt-cell>
      <ul class="pl10 text-info">
        <li v-for="(tip, index) in tiplist" :key="index">
          {{ tip.tip }}
        </li>
      </ul>
    </div>
    <div class="pl15 mb15" v-if="stepTestInfo.process[testStepId].testItems">
      <mt-checklist
        class="page-part"
        title="状态寄存器"
        v-model="statusvalue"
        :options="statusItems"
      >
      </mt-checklist>
      <div>
        已获取到的状态值:
        <span v-for="status in statusvalue" :key="status">
          {{ status }}
        </span>
      </div>
      <mt-checklist
        class="page-part"
        title="控制寄存器"
        v-model="controlvalue"
        :options="controlItems"
      >
      </mt-checklist>
      <div>
        已获取到的状态值:
        <span v-for="status in controlvalue" :key="status">
          {{ status }}
        </span>
      </div>
    </div>
    <div>
      <div
        class="largeBtnContainer mb10"
        v-if="$route.query.controlType != 'tank'"
      >
        <template
          v-for="optBtn in stepTestInfo.process[testStepId].operateButtons"
        >
          <mt-button
            :key="optBtn.instruction"
            size="large"
            type="primary"
            @click.native="handleOperateEqp(optBtn.instruction)"
          >
            {{ optBtn.label }}
          </mt-button>
        </template>
      </div>
      <div class="largeBtnContainer clearfix">
        <template
          v-for="optBtn in stepTestInfo.process[testStepId].stepButtons"
        >
          <div :key="optBtn.instruction" class="harfBtnContainer">
            <mt-button
              size="large"
              type="primary"
              @click.native="handleStep(optBtn)"
            >
              {{ optBtn.label }}
            </mt-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "preTestEqp",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // 头部header配置项
      headerOptionSettings: {
        hideleft: false,
        title:
          this.$route.query.controlType == "tank" ? "柜控测试" : "程控测试",
        routePath: "selectTest"
      },
      // 状态寄存器返回的数值
      statusvalue: [],
      // 控制寄存器返回的数值
      controlvalue: [],
      // options: [],
      // 状态寄存器预设项目（供接受数据勾选用）
      statusItems: [],
      // 控制寄存器预设项目（供接受数据勾选用）
      controlItems: [],
      // 页面表单默认值
      formdata: {
        eqpName: "",
        stateRegisterIp: "",
        controlRegisterIp: ""
      },
      // 当前测试步骤id（第几步）
      testStepId: this.$route.query.testProcessStepId,
      // 当前设备测试总流程
      stepTestInfo: this.$store.getters.chosedProcess
    };
  },
  methods: {
    // 点击按钮进行程控，发送指令到后台，触发控制器
    handleOperateEqp(flag) {
      console.log(flag, "opt");
    },
    // 点击最下部按钮事件，下一步、结束测试、获取结果
    handleStep(btn) {
      if (btn.instruction == "nextStep") {
        this.testStepId = parseInt(this.testStepId) + 1;
      }
      if (btn.instruction == "getResult") {
        this.$router.push({ path: "testResult", query: this.$route.query });
      }
      if (btn.instruction == "stopTest") {
        let stopQuery = this.$route.query;
        delete stopQuery.testProcessId;
        this.$router.push({ path: "selectTest", query: stopQuery });
      }
    }
  },
  mounted() {
    if (this.$route.query.testEqpId || this.$route.query.testEqpId == 0) {
      this.formdata = this.$store.getters.testInfo[this.$route.query.testEqpId];
    }
  },
  computed: {
    // 监听当前页数据，展示提示信息
    tiplist() {
      let tiplistArr = [];
      if (this.$route.query.controlType == "tank") {
        tiplistArr = this.stepTestInfo.process[this.testStepId].tankTips;
      } else {
        tiplistArr = this.stepTestInfo.process[this.testStepId].tips;
      }
      return tiplistArr;
    }
  },
  watch: {
    // 监听当前测试步骤id，切换页面显示内容
    testStepId(newVal) {
      // this.options = [];
      this.statusItems = [];
      this.controlItems = [];
      let chkbox = [],
        chkarr = [];
      this.$store.getters.registers.map(register => {
        if (register.type == this.formdata.eqpTpye) {
          chkbox = register.formgroup;
        }
      });
      if (this.stepTestInfo.process[newVal].testItems) {
        this.stepTestInfo.process[newVal].testItems.split(",").map(item => {
          chkbox.map(chk => {
            if (item == chk.key) {
              chkarr.push(chk);
            }
          });
        });
      }
      chkarr.map(chkitem => {
        chkitem.value = this.formdata[chkitem.key];
        // this.options.push(chkitem);
        if (chkitem.controlType == "statusR") {
          this.statusItems.push(chkitem);
        }
        if (chkitem.controlType == "controlR") {
          this.controlItems.push(chkitem);
        }
      });
    }
  }
};
</script>
