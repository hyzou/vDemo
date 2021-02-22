export default {
  year: [{ required: true, message: "请选择年份", trigger: "change" }],
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  sourceId: [{ required: true, message: "请选择储备计划", trigger: "change" }]
};
