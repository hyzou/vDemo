import window from "./window";
import w_fan from "./w_fan";
import v_fan from "./v_fan";
import two_speed_fan from "./two_speed_fan";
import c_fan from "./c_fan";
import air_cond from "./air_cond";
import vent from "./vent";
import valve from "./valve";

const testProcessSettings = [
  {
    type: "1001",
    dscript: "仓窗-window",
    detailProcess: window
  },
  {
    type: "1003",
    dscript: "单向风机-w_fan",
    detailProcess: w_fan
  },
  {
    type: "1004",
    dscript: "双向风机-v_fan",
    detailProcess: v_fan
  },
  {
    type: "1006",
    dscript: "双速风机-two_speed_fan",
    detailProcess: two_speed_fan
  },
  {
    type: "1005",
    dscript: "环流风机-c_fan",
    detailProcess: c_fan
  },
  {
    type: "2001",
    dscript: "空调-air_cond",
    detailProcess: air_cond
  },
  {
    type: "1002",
    dscript: "通风口-vent",
    detailProcess: vent
  },
  {
    type: "4001",
    dscript: "阀门-valve",
    detailProcess: valve
  }
];

export default testProcessSettings;
