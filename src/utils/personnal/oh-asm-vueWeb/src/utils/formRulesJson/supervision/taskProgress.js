export default {
  asmSchemeId: [{ required: true, message: "请选择考核方案", trigger: "blur" }],
  progess: [
    { required: true, message: "考核工作进展情况不能为空", trigger: "blur" }
  ],
  highlight: [{ required: true, message: "工作亮点不能为空", trigger: "blur" }],
  weakLink: [{ required: true, message: "薄弱环节不能为空", trigger: "blur" }],
  reportBy: [{ required: true, message: "填报人不能为空", trigger: "blur" }]
};
