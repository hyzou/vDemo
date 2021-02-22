import { number } from "../../validator";
export default {
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  startDate: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
  num: [
    { required: true, message: "请输入发放数量", trigger: "blur" },
    { validator: number, trigger: "blur" }
  ],
  receiver: [{ required: true, message: "请输入领取人", trigger: "blur" }],
  receiveDate: [
    { required: true, message: "请选择发放时间", trigger: "change" }
  ]
};
