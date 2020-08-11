import window from "./window";
import w_fan from "./w_fan";
import v_fan from "./v_fan";
import two_speed_fan from "./two_speed_fan";
import c_fan from "./c_fan";
import air_cond from "./air_cond";
import vent from "./vent";
import valve from "./valve";

const registersSettings = [
  {
    name: "仓窗寄存器",
    type: "1001",
    formgroup: window
  },
  {
    name: "单向风机寄存器",
    type: "1003",
    formgroup: w_fan
  },
  {
    name: "双向风机寄存器",
    type: "1004",
    formgroup: v_fan
  },
  {
    name: "双速风机寄存器",
    type: "1006",
    formgroup: two_speed_fan
  },
  {
    name: "环流风机寄存器",
    type: "1005",
    formgroup: c_fan
  },
  {
    name: "空调寄存器",
    type: "2001",
    formgroup: air_cond
  },
  {
    name: "通风口寄存器",
    type: "1002",
    formgroup: vent
  },
  {
    name: "阀门寄存器",
    type: "4001",
    formgroup: valve
  }
];
export default registersSettings;
