let rule = {
  projectId: [{ required: true, message: "请选择专场", trigger: "change" }],
  scoreListStr: [
    { required: true, message: "请完整综合评分规则", trigger: "blur" }
  ],
  selfScore: [
    { required: true, message: "请完整综合评分规则", trigger: "blur" }
  ]
};
export default {
  rule
};
