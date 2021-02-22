import { number } from "../../validator";

export default {
  businessDate: [
    { required: true, message: "请选择单据日期", trigger: "change" }
  ],
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  qty: [
    { required: true, message: "请输入报废数量", trigger: "blur" },
    { validator: number, trigger: "blur" }
  ]
};
