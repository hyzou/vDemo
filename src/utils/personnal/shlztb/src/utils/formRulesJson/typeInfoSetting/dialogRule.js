let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  code: [{ required: true, message: "请填写编码", trigger: "blur" }],
  status: [{ required: true, message: "请填写状态", trigger: "blur" }]
};

export default {
  rule
};
