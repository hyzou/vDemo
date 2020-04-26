let rule = {
  qasBasItemId: [
    { required: true, message: "请填写检测指标", trigger: "change" }
  ],
  displayRefValue: [
    { required: true, message: "请填写标准值", trigger: "blur" }
  ],
  expr: [{ required: true, message: "请填写判定表达式", trigger: "blur" }],
  priority: [{ required: true, message: "请填写优先级", trigger: "blur" }]
};

export default {
  rule
};
