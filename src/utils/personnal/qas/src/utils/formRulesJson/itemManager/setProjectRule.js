let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  parentId: [{ required: true, message: "请填写所属检测项", trigger: "change" }]
};

export default {
  rule
};
