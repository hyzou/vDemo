const protocol = {
  testEquipment: [
    // { label: "创联容微彩灯协议", value: "clrw-lt" },
    { label: "Modbus协议", value: "modbus", sectorName: "HOLDING_REGISTER" },
    // { label: "贝博协议", value: "gi-beibo" },
    // { label: "ohid协议", value: "	oh-id" },
    // { label: "西城tcp协议", value: "xicheng-jx" },
    // { label: "佳华tcp协议", value: "gi-jhtcp" },
    // { label: "佳华rtu协议", value: "gi-jhrtu" },
    { label: "S7协议", value: "s7", sectorName: "SMART_V" },
    { label: "ormon协议", value: "c-mode", sectorName: "" }
  ],
  testTemperature: [
    // { label: "ormon协议", value: "c-mode" },
    // { label: "Modbus协议", value: "modbus" },
    { label: "贝博协议", value: "gi-beibo", sectorName: "GRAIN_TEMP" },
    // { label: "ohid协议", value: "	oh-id" },
    { label: "西城tcp协议", value: "xicheng-jx", sectorName: "GRAIN_TEMP" },
    { label: "佳华tcp协议", value: "gi-jhtcp", sectorName: "GRAIN_TEMP" },
    { label: "佳华rtu协议", value: "gi-jhrtu", sectorName: "GRAIN_TEMP" }
    // { label: "S7协议", value: "s7" }
  ],
  testLight: [{ label: "创联容微彩灯协议", value: "clrw-lt" }],
  testWorm: [{ label: "ohid协议", value: "oh-id" }]
};
export default protocol;
