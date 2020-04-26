let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  graded: [
    { required: true, message: "请填写是否用于定等级", trigger: "change" }
  ],
  busintypeid: [
    { required: true, message: "请填写字典表类型", trigger: "change" }
  ],
  grainbreedId: [
    { required: true, message: "请填写粮食品种", trigger: "change" }
  ]
};

export default {
  rule
};
