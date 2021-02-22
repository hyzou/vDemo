export default {
  checkDate: [{ required: true, message: "请选择检测日期", trigger: "change" }],
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  checker: [{ required: true, message: "请输入检测人", trigger: "blur" }],
  qaOrg: [{ required: true, message: "请输入检测机构", trigger: "blur" }],
  materialName: [{ required: true, message: "请选择物资", trigger: "change" }]
};
