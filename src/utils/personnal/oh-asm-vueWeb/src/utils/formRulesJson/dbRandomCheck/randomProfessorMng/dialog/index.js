export default {
  peopName: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
  peopSex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
  peopIdcard: [
    { required: true, message: "身份证号码不能为空", trigger: "blur" }
  ],
  peopMphone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
  isCheckMan: [
    { required: true, message: "是否双随机专家不能为空", trigger: "blur" }
  ],
  checkerLevel: [
    { required: true, message: "双随机专家级别不能为空", trigger: "blur" }
  ]
};
