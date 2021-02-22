const newProgressDialogBtns = [
  {
    flag: "saveStuff",
    label: "保存草稿",
    styleType: "primary"
  },
  {
    flag: "save",
    label: "提交",
    styleType: "primary"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const newProgressDialogItems = [
  {
    title: "填报内容",
    type: "block",
    span: 24,
    children: [
      {
        type: "select",
        label: "考核方案",
        name: "asmSchemeId",
        multiple: false,
        placeHolder: "请选择",
        filterable: true,
        data: [],
        span: 12,
        width: "150px"
      },
      {
        type: "textarea",
        label: "考核工作进展情况",
        name: "progess",
        span: 24,
        width: "150px"
      },
      {
        type: "textarea",
        label: "工作亮点(分条列出)",
        name: "highlight",
        span: 24,
        width: "150px"
      },
      {
        type: "textarea",
        label: "薄弱环节(分条列出)",
        name: "weakLink",
        span: 24,
        width: "150px"
      },
      {
        type: "input",
        label: "填报人",
        name: "reportBy",
        span: 12,
        width: "150px"
      },
      {
        type: "upload",
        label: "相关附件",
        name: "fbFiles",
        span: 13,
        width: "150px",
        choseBtn: "上传文件"
      }
    ]
  }
];
export { newProgressDialogBtns, newProgressDialogItems };
