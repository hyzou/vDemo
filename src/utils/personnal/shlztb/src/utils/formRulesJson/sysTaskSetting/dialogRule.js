let rule = {
  name: [{ required: true, message: "请填写任务名", trigger: "blur" }],
  jobClass: [{ required: true, message: "请填写任务调用类", trigger: "blur" }],
  expressionType: [
    { required: true, message: "请选择表达式类型", trigger: "blur" }
  ],
  enabled: [{ required: true, message: "请选择是否可用", trigger: "blur" }],
  cronExpression: [
    { required: true, message: "请填写corn表达式", trigger: "blur" }
  ],
  simpleExpressionStartdate: [
    { required: true, message: "请选择简单表达式开始时间", trigger: "blur" }
  ],
  simpleExpressionInterval: [
    { required: true, message: "请选择简单表达式间隔时间", trigger: "blur" }
  ],
  group: [{ required: true, message: "请填写分组", trigger: "blur" }],
  simpleExpressionTimes: [
    { required: true, message: "请填写运行次数", trigger: "blur" }
  ]
};

export default {
  rule
};
