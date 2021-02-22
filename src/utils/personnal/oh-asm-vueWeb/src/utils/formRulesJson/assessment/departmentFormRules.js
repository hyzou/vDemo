export default {
  department_score: [
    {
      required: true,
      message: "请输入分值，分值不可以大于指标分数",
      trigger: "change"
    }
  ],
  manageOrg_MO: [
    { required: true, message: "请选择责任处室", trigger: "change" }
  ],
  department_auditBy: [
    { required: true, message: "请填写审核人", trigger: "blur" }
  ],
  department_assessBy: [
    { required: true, message: "请填写评审人", trigger: "blur" }
  ],
  department_assessDt: {
    required: true,
    message: "请选择自评日期",
    trigger: "change"
  },
  // 抽查
  spotCheck_auditBy: [
    { required: true, message: "请填写审核人", trigger: "blur" }
  ],
  spotCheck_assessBy: [
    { required: true, message: "请填写评分人", trigger: "blur" }
  ],
  spotCheck_assessDt: {
    required: true,
    message: "请选择抽查日期",
    trigger: "change"
  },
  spotCheck_score: [
    {
      required: true,
      message: "请输入分值，分值不可以大于指标分数",
      trigger: "change"
    }
  ]
};
