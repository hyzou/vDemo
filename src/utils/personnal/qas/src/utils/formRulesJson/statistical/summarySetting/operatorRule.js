let rule = {
  title: [{ required: true, message: "请填写标题", trigger: "blur" }],
  productBreed: [
    { required: true, message: "请选择产品品种", trigger: "change" }
  ],
  link: [{ required: true, message: "请选择监管环节", trigger: "change" }],
  nature: [{ required: true, message: "请选择计划性质", trigger: "change" }]
};

export default {
  rule
};
