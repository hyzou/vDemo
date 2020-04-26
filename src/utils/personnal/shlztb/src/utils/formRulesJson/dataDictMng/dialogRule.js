let rule = {
  busintypename: [
    { required: true, message: "请填写业务类型名称", trigger: "blur" }
  ],
  busintypeid: [
    { required: true, message: "请填写业务类型编号", trigger: "blur" }
  ]
};

export default {
  rule
};
