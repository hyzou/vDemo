let rule = {
  roleid: [{ required: true, message: "请填写角色编码", trigger: "blur" }],
  rolename: [{ required: true, message: "请填写角色名称", trigger: "blur" }]
};

export default {
  rule
};
