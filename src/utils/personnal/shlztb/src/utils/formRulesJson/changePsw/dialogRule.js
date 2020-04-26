let rule = {
  password: [{ required: true, message: "请填写原密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请填写新密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请填写确认新密码", trigger: "blur" }
  ]
};

export default {
  rule
};
