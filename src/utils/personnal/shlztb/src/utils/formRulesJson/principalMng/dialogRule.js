let rule = {
  loginPassword: [{ required: true, message: "请填写密码", trigger: "blur" }],
  memName: [{ required: true, message: "请填写姓名", trigger: "blur" }],
  companyName: [{ required: true, message: "请填写公司名称", trigger: "blur" }]
};

export default {
  rule
};
