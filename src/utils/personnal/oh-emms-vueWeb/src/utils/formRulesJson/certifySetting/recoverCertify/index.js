export default {
  storeOrgId: [
    { required: true, message: "请选择承储单位", trigger: "change" }
  ],
  storepointId: [{ required: true, message: "请选择库点", trigger: "change" }],
  emmsDocInoutId: [
    { required: true, message: "请选择出库单号", trigger: "change" }
  ],
  actualNum: [{ required: true, message: "请输入回收数量", trigger: "blur" }]
};
