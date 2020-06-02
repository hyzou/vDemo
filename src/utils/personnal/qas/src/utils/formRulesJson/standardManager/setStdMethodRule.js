let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  stdNo: [{ required: true, message: "请填写编码", trigger: "blur" }],
  strissuedDt: [
    { required: true, message: "请填写发布日期", trigger: "change" }
  ],
  status: [{ required: true, message: "请填写状态", trigger: "change" }],
  productType: [
    { required: true, message: "请填写产品类别", trigger: "change" }
  ],
  issuedBy: [{ required: true, message: "请填写颁布组织", trigger: "change" }]
};

export default {
  rule
};
