let rule = {
  name: [{ required: true, message: "请填写链接名称", trigger: "blur" }],
  href: [
    {
      type: "url",
      message: "请输入正确的网址。",
      trigger: "blur"
    }
  ]
};

export default {
  rule
};
