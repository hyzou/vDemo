export default {
  selfScore: [{ required: true, message: "自评分不能为空", trigger: "blur" }],
  selfName: [{ required: true, message: "填报人不能为空", trigger: "blur" }],
  checkName: [{ required: true, message: "审核人不能为空", trigger: "blur" }],
  reduceScore: [
    { required: true, message: "是否减分不能为空", trigger: "blur" }
  ],
  reason: [{ required: true, message: "减分原因不能为空", trigger: "blur" }]
};
