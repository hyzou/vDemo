export default {
  // receivedName: [{ required: true, message: "请选择收件人", trigger: "blur" }],
  finished: [
    { required: true, message: "任务完成情况不能为空", trigger: "change" }
  ],
  progress: [
    { required: true, message: "任务落实进展情况不能为空", trigger: "blur" }
  ]
};
