let rule = {
  orgname: [{ required: true, message: "请填写机构名称", trigger: "blur" }],
  orgtypeid: [{ required: true, message: "请填写机构类型", trigger: "blur" }],
  orgcode: [{ required: true, message: "请填写机构编码", trigger: "blur" }]
  // managerid: [{ required: true, message: "请填写机构负责人", trigger: "blur" }]
};

export default {
  rule
};
