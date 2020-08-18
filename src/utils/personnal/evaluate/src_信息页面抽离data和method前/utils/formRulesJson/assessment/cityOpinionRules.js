export default {
  opinion: [{ required: true, message: "局配合意见不能为空", trigger: "blur" }],
  inputName: [
    { required: true, message: "意见填报人不能为空", trigger: "blur" }
  ],
  checkName: [{ required: true, message: "审核人不能为空", trigger: "blur" }],
  coordinationName: [
    { required: true, message: "配合单位不能为空", trigger: "blur" }
  ]
};
