export default {
  name: [{ required: true, message: "请输入表彰名称", trigger: "blur" }],
  grantor: [{ required: true, message: "请输入表彰单位", trigger: "blur" }],
  asmSchemeId: [{ required: true, message: "请选择方案", trigger: "change" }],
  terms: [
    { required: true, message: "请输入表彰依据文件名称", trigger: "blur" }
  ]
};
