<template>
  <div class="manage">
    <myheader />
    <mt-field
      label="分机名"
      placeholder="请输入分机名"
      v-model="formdata.eqpName"
    ></mt-field>
    <mySelect
      :mySelectOption="connectTpyeOption"
      @myselectChange="getConnectTpyeValue"
    />
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
    <mySelect
      :mySelectOption="protocolOption"
      @myselectChange="getProtocolValue"
    />
    <mt-field
      label="Modbus地址"
      placeholder="请输入Modbus地址"
      v-model="formdata.ModbusAddress"
    ></mt-field>
    <div class="largeBtnContainer mb10">
      <mt-button size="large" type="primary" @click.native="saveEqpInfo"
        >保存</mt-button
      >
    </div>
    <div class="largeBtnContainer">
      <mt-button size="large" type="primary" @click.native="testEqpInfo"
        >测试</mt-button
      >
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
      formdata: {
        eqpName: "",
        connectTpye: "",
        eqpIp: "",
        eqpPort: "",
        protocol: "",
        ModbusAddress: ""
      },
      popupVisible: false,
      connectTpyeOption: {
        cellTitle: "连接类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: [{ label: "TCP连接", value: "tcp" }],
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      protocolOption: {
        cellTitle: "协议类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: [{ label: "Modbus", value: "mod" }],
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      }
    };
  },
  methods: {
    getConnectTpyeValue(val) {
      console.log(val);
      this.formdata.connectTpye = val[0].value;
      this.connectTpyeOption.cellValue = val[0].label + "▼";
      // this.$nextTick(function() {
      // 设置picker的初始值时放在nextTick里
      // if (this.$route.query.editType == "add") {
      //   this.slots[0].values.forEach((e, i) => {
      //     if (e.code == that.item.provincenum) {
      //       that.slots[0].defaultIndex = e.index; // that.slots[0].defaultIndex设置picker的初始值
      //       if (val[0]) {
      //         this.address.province = val[0].name;
      //         this.address.provinceid = val[0].code;
      //         this.gocity(val[0]);
      //       }
      //     }
      //   });
      // }
      // });
    },
    getProtocolValue(val) {
      console.log(val);
      this.formdata.protocol = val[0].value;
      this.protocolOption.cellValue = val[0].label + "▼";
    },
    saveEqpInfo() {
      console.log(this.formdata, "save");
      this.$router.push("home");
    },
    testEqpInfo() {
      console.log(this.formdata, "test");
      this.$router.push("equipmentList");
    }
  }
};
</script>
