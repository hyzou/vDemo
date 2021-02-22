export default {
  cooprateOrgs: [
    { required: true, message: "请选择配合处室", trigger: "change" }
  ],
  auditBy: [{ required: true, message: "请填写审核人", trigger: "blur" }],
  reportBy: [{ required: true, message: "请填写意见填报人", trigger: "blur" }],
  comment: [{ required: true, message: "请填写意见", trigger: "blur" }]
};
