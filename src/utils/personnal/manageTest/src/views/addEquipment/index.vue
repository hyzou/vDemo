<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mt-field
        label="分机名"
        placeholder="请输入分机名"
        v-model="formdata.eqpName"
      >
      </mt-field>
    </div>
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mySelect
        :mySelectOption="connectTpyeOptionSettings"
        @myselectChange="handleGetConnectTpyeValue"
      />
    </div>
    <template v-if="formdata.connectTpye !== 'tcp'">
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mySelect
          :mySelectOption="serialPortOptionSettings"
          @myselectChange="handleGetSerialPortValue"
        />
      </div>
    </template>
    <template v-else>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mt-field
          label="IP地址"
          placeholder="请输入分机地址"
          v-model="formdata.eqpIp"
        ></mt-field>
      </div>
      <div class="positionRel">
        <span class="positionAbs text-danger symbolRequired">*</span>
        <mt-field
          label="端口"
          placeholder="请输入端口"
          v-model="formdata.eqpPort"
        ></mt-field>
      </div>
    </template>
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mySelect
        :mySelectOption="protocolOptionSettings"
        @myselectChange="handleGetProtocolValue"
      />
    </div>
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mt-field
        label="Modbus地址"
        placeholder="请输入Modbus地址"
        v-model="formdata.ModbusAddress"
      ></mt-field>
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
      headerOptionSettings: {
        hideleft: false,
        title: "添加分机",
        routePath: "home"
      },
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
      protocolOptionSettings: {
        cellTitle: "协议类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.protocolDatas,
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
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
      }
    };
  },
  methods: {
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
    handleGetProtocolValue(val) {
      this.formdata.protocol = val[0].value;
      this.protocolOptionSettings.cellValue = val[0].label + "▼";
      this.formdata.protocol_dsc = val[0].label;
    },
    handleGetSerialPortValue(val) {
      this.formdata.serialPort = val[0].value;
      this.serialPortOptionSettings.cellValue = val[0].label + "▼";
      this.formdata.serialPort_dsc = val[0].label;
    },
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
