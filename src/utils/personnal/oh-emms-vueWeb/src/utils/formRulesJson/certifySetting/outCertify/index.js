export default {
  businessDate: [
    { required: true, message: "请输入单据日期", trigger: "blur" }
  ],
  sourceType: [{ required: true, message: "请选择来源", trigger: "blur" }],
  sourceId: [{ required: true, message: "请选择单号", trigger: "blur" }],
  storeOrgId: [{ required: true, message: "请选择承储单位", trigger: "blur" }],
  storepointId: [{ required: true, message: "请选择库点", trigger: "blur" }]
};
