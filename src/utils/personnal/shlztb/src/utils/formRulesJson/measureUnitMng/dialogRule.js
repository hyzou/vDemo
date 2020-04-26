let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  sysCode: [{ required: true, message: "请填写编码", trigger: "blur" }],
  status: [{ required: true, message: "请填写状态", trigger: "blur" }],
  type: [{ required: true, message: "请填写类型", trigger: "blur" }]
};

export default {
  rule
};
