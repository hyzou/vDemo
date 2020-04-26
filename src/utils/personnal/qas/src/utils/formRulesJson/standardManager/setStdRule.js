let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  stdNo: [{ required: true, message: "请填写标准编码", trigger: "blur" }],
  strissuedDt: [
    { required: true, message: "请填写发布日期", trigger: "change" }
  ],
  criteriaTags: [
    { required: true, message: "请填写分类条件", trigger: "change" }
  ],
  type: [{ required: true, message: "请填写标准类型", trigger: "change" }],
  status: [{ required: true, message: "请填写状态", trigger: "change" }],
  productType: [
    { required: true, message: "请填写产品类别", trigger: "change" }
  ],
  issuedBy: [{ required: true, message: "请填写颁布组织", trigger: "change" }],
  // replacedStdNo: [
  //   { required: true, message: "请填写代替的标准编号", trigger: "blur" }
  // ],
  disable: [
    { required: true, message: "请填写代替的是否禁用", trigger: "change" }
  ]
};

export default {
  rule
};
