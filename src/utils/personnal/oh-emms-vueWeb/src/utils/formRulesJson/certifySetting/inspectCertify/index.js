export default {
  businessDate: [
    { required: true, message: "请选择巡查日期", trigger: "blur" }
  ],
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  type: [{ required: true, message: "请选择巡查类型", trigger: "blur" }],
  inspectWork: [{ required: true, message: "请输入巡查工作", trigger: "blur" }]
};
