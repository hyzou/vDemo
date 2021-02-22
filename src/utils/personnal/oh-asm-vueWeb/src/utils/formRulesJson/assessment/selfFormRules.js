export default {
  score: [
    {
      required: true,
      message: "请输入分值，分值不可以大于指标分数",
      trigger: "change"
    }
  ],
  manageOrg_MO: [
    { required: true, message: "请选择责任处室", trigger: "change" }
  ],
  auditBy: [{ required: true, message: "请填写审核人", trigger: "blur" }],
  assessBy: [{ required: true, message: "请填写自评人", trigger: "blur" }],
  rectifyDesc: [{ required: true, message: "请填写落实情况", trigger: "blur" }],
  deductionReason: [
    { required: true, message: "请填写减分原因", trigger: "blur" }
  ],
  assessDt: { required: true, message: "请选择自评日期", trigger: "change" }
  // scoreBasis: { required: true, message: "请上传依据", trigger: "change" }
};
