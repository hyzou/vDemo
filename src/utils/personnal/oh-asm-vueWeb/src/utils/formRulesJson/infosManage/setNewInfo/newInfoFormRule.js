const rule = {
  cmsChannelId: [
    { required: true, message: "请选择所属栏目", trigger: "change" }
  ],
  title: [{ required: true, message: "请填写标题", trigger: "blur" }],
  level: [{ required: true, message: "请选择发布级别", trigger: "change" }]
};

export default rule;
