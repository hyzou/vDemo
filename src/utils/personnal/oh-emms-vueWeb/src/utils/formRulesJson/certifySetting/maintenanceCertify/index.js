import { number } from "../../validator";

export default {
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storePointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  materialName: [{ required: true, message: "请选择物资", trigger: "change" }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
  serviceDate: [
    { required: true, message: "请选择维保日期", trigger: "change" }
  ],
  num: [
    { required: true, message: "请输入维保数量", trigger: "blur" },
    { validator: number, trigger: "blur" }
  ],
  eqNos: [{ required: true, message: "请输入维保物资序列号", trigger: "blur" }],
  result: [{ required: true, message: "请输入预期结果", trigger: "blur" }]
};
