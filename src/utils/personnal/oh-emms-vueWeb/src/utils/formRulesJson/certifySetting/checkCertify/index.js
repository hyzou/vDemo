import { number } from "../../validator";

export default {
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  storehouseId: [{ required: true, message: "请选择仓房", trigger: "change" }],
  takingBy: [{ required: true, message: "请输入盘点人", trigger: "blur" }],
  actualNum: [
    { required: true, message: "请输入盘点数量", trigger: "blur" },
    { validator: number, trigger: "blur" }
  ]
};
