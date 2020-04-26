let rule = {
  code: [{ required: true, message: "请填写编码", trigger: "blur" }],
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  value: [{ required: true, message: "请填写配置值", trigger: "blur" }]
};

export default {
  rule
};
