const checkProgressDialogBtns = [];
const checkProgressDialogItems = [
  {
    type: "inputHidden",
    label: "考核工作进展情况",
    name: "asmShemeReportId",
    span: 24,
    width: "150px"
  },
  {
    title: "填报内容",
    type: "block",
    modelName: "content",
    span: 24,
    children: [
      {
        type: "textarea",
        label: "考核工作进展情况",
        name: "progess",
        disabled: true,
        span: 24,
        width: "150px"
      },
      {
        type: "textarea",
        label: "工作亮点(分条列出)",
        name: "highlight",
        disabled: true,
        span: 24,
        width: "150px"
      },
      {
        type: "textarea",
        label: "薄弱环节(分条列出)",
        name: "weakLink",
        disabled: true,
        span: 24,
        width: "150px"
      },
      {
        type: "input",
        label: "填报人",
        name: "reportBy",
        disabled: true,
        span: 12,
        width: "150px"
      },
      {
        type: "fileshowList",
        label: "已上传文件",
        name: "reportFiles",
        span: 13,
        fileSettings: {
          hidedelete: true
        },
        width: "150px"
      }
    ]
  }
];
export { checkProgressDialogBtns, checkProgressDialogItems };
