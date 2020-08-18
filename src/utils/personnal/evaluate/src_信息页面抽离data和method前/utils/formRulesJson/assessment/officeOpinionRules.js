export default {
  officeOpinions: [
    { required: true, message: "处室配合意见不能为空", trigger: "blur" }
  ],
  officeInputName: [
    { required: true, message: "填报人不能为空", trigger: "blur" }
  ],
  officeCheckName: [
    { required: true, message: "审核人不能为空", trigger: "blur" }
  ],
  officeId: [{ required: true, message: "配合处室不能为空", trigger: "blur" }]
};
