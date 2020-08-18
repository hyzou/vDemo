let rule = {
  subColumn: [{ required: true, message: "请填写所属栏目", trigger: "blur" }],
  title: [{ required: true, message: "请填写标题", trigger: "blur" }],
  fileRelative: [
    { required: true, message: "请填写公司名称", trigger: "blur" }
  ],
  urlRelative: [{ required: true, message: "请填写联系电话", trigger: "blur" }]
};

export default {
  rule
};
