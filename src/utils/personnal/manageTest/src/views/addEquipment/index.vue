<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <div class="bgfff">
      <mt-field
        label="分机名"
        placeholder="请输入分机名"
        v-model="formdata.eqpName"
      >
      </mt-field>
      <mySelect
        :mySelectOption="connectTpyeOptionSettings"
        @myselectChange="handleGetConnectTpyeValue"
      />
      <template v-if="formdata.connectTpye !== 'tcp'">
        <mySelect
          :mySelectOption="serialPortOptionSettings"
          @myselectChange="handleGetSerialPortValue"
        />
      </template>
      <template v-else>
        <mt-field
          label="IP地址"
          placeholder="请输入分机地址"
          v-model="formdata.eqpIp"
        ></mt-field>
        <mt-field
          label="端口"
          placeholder="请输入端口"
          v-model="formdata.eqpPort"
        ></mt-field>
      </template>
      <mySelect
        :mySelectOption="protocolOptionSettings"
        @myselectChange="handleGetProtocolValue"
      />
      <template v-for="param in paramlist">
        <mt-field
          :key="param.paramName"
          :label="param.paramDesc"
          placeholder="请输入"
          v-model="formdata[param.paramName]"
        ></mt-field>
      </template>
    </div>

    <div class="largeBtnContainer mt10 mb10">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('save')"
      >
        保存
      </mt-button>
    </div>
    <div class="largeBtnContainer">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('test')"
      >
        测试
      </mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addEquipment",
  components: {
    myheader: () => import("@/components/myheader"),
    mySelect: () => import("@/components/mySelect")
  },
  data() {
    return {
      // 头部状态栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "添加分机",
        routePath: "home"
      },
      // 串口下拉框配置数据
      serialPortOptionSettings: {
        cellTitle: "串口",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.serialPortDatas,
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      // 连接类型下拉框配置数据
      connectTpyeOptionSettings: {
        cellTitle: "连接类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.connectTpyeDatas,
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      // 协议类型下拉框配置数据
      protocolOptionSettings: {
        cellTitle: "协议类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.protocolDatas[
              this.$route.query.testType
            ],
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      // 页面表单数据
      formdata: {
        eqpName: "",
        connectTpye: "tcp",
        connectTpye_dsc: "",
        serialPort: "",
        serialPort_dsc: "",
        eqpIp: "",
        eqpPort: "",
        protocol: "",
        protocol_dsc: "",
        ModbusAddress: ""
      },
      // 协议参数列表
      paramlist: []
    };
  },
  methods: {
    // 连接类型下拉框事件绑定
    handleGetConnectTpyeValue(val) {
      let that = this;
      that.formdata.connectTpye = val[0].value;
      that.connectTpyeOptionSettings.cellValue = val[0].label + "▼";
      that.formdata.connectTpye_dsc = val[0].label;
      that.$nextTick(function() {
        // 设置picker的初始值时放在nextTick里
        if (that.$route.query && that.$route.query.eqpId) {
          that.connectTpyeOptionSettings.slots[0].values.forEach((e, i) => {
            if (
              e.value ==
              that.$store.getters.eqpInfo[that.$route.query.eqpId].connectTpye
            ) {
              that.connectTpyeOptionSettings.slots[0].defaultIndex = i; // that.slots[0].defaultIndex设置picker的初始值
            }
          });
        }
      });
    },
    // 协议类型下拉框事件绑定
    handleGetProtocolValue(val) {
      this.formdata.protocol = val[0].value;
      this.protocolOptionSettings.cellValue = val[0].label + "▼";
      this.formdata.protocol_dsc = val[0].label;
      this.paramlist = this.$store.getters.protocolParamsDatas[
        val[0].value
      ].paramList;
      this.paramlist.map(param => {
        this.formdata[param.paramName] = "";
      });
    },
    // 串口下拉框事件绑定
    handleGetSerialPortValue(val) {
      this.formdata.serialPort = val[0].value;
      this.serialPortOptionSettings.cellValue = val[0].label + "▼";
      this.formdata.serialPort_dsc = val[0].label;
    },
    // 底部操作按钮事件绑定
    handleSaveEqpInfo(type) {
      console.log(this.formdata, "save");
      if (
        !this.formdata.eqpName ||
        !this.formdata.connectTpye ||
        !this.formdata.protocol ||
        !this.formdata.ModbusAddress
      ) {
        this.$messagebox.alert("请完善必填项", "提示");
        return false;
      }
      if (this.formdata.connectTpye == "tcp") {
        if (!this.formdata.eqpIp || !this.formdata.eqpPort) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
      } else {
        if (!this.formdata.serialPort) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
      }
      this.$store.dispatch("setEqpInfo", this.formdata);
      if (type == "save") {
        this.$router.push("home");
      } else {
        this.$router.push({
          path: "equipmentList",
          query: { eqpId: this.$route.query.eqpId || 0 }
        });
      }
    }
  },
  mounted() {
    if (this.$route.query.eqpId || this.$route.query.eqpId == 0) {
      this.formdata = this.$store.getters.eqpInfo[this.$route.query.eqpId];
    }
  }
};
</script>
