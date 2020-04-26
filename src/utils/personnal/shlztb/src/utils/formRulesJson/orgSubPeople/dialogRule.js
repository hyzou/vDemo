let rule = {
  userid: [{ required: true, message: "请填写用户登录名", trigger: "blur" }],
  password: [
    { required: true, message: "请填写用户登录密码", trigger: "blur" }
  ],
  confirmpassword: [
    { required: true, message: "请确认用户登录密码", trigger: "blur" }
  ],
  operatorname: [{ required: true, message: "请填写姓名", trigger: "blur" }],
  roleids: [{ required: true, message: "请选择人员角色", trigger: "blur" }]
};

export default {
  rule
};
