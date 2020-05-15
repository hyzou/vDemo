/**
 * obj:{
 *  label:""设备名称,
 *  value:""设备编码,
 *  alias:""设备别名,
 *  typeEnumeration:""设备类型枚举,
 * }
 */

const eqpjson = [
  {
    label: "仓窗",
    value: "1001",
    alias: "window",
    typeEnumeration: "DeviceTypeEnum.WINDOW"
  },
  {
    label: "单向风机",
    value: "1003",
    alias: "w_fan",
    typeEnumeration: "DeviceTypeEnum.WINDOW_FAN"
  },
  {
    label: "双向风机",
    value: "1004",
    alias: "v_fan",
    typeEnumeration: "DeviceTypeEnum.VENT_FAN"
  },
  {
    label: "双速风机",
    value: "1006",
    alias: "two_speed_fan",
    typeEnumeration: "DeviceTypeEnum.TWO_SPEED_FAN"
  },
  {
    label: "环流风机",
    value: "1005",
    alias: "c_fan",
    typeEnumeration: "DeviceTypeEnum.CIRCULAR_FAN"
  },
  {
    label: "空调",
    value: "2001",
    alias: "air_cond",
    typeEnumeration: "DeviceTypeEnum.AIR_CONDITION"
  },
  {
    label: "通风口",
    value: "1002",
    alias: "vent",
    typeEnumeration: "DeviceTypeEnum.VENT"
  },
  {
    label: "阀门",
    value: "4001",
    alias: "valve",
    typeEnumeration: "DeviceTypeEnum.VALVE"
  }
];
export default eqpjson;
