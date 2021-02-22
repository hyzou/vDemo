const newInfoFormBtns = [
  {
    flag: "saveQuit",
    size: "",
    icon: "",
    label: "保存退出",
    styleType: "primary",
    postUrl: "addRegisterMember"
  },
  {
    flag: "saveContinue",
    size: "",
    icon: "",
    label: "保存继续",
    styleType: "primary",
    postUrl: "addRegisterMember"
  },
  {
    flag: "saveView",
    size: "",
    icon: "",
    label: "预览",
    styleType: "primary",
    postUrl: "addRegisterMember"
  },
  {
    flag: "reset",
    size: "",
    icon: "",
    label: "重置",
    styleType: "primary",
    postUrl: "addRegisterMember"
  }
];
const newInfoFormItems = [
  {
    type: "select",
    label: "所属栏目",
    multiple: false,
    placeHolder: "请选择",
    filterable: false,
    name: "cmsChannelId",
    data: [],
    span: 13,
    width: "150px"
  },
  {
    type: "input",
    label: "标题",
    name: "title",
    span: 13,
    width: "150px"
  },
  {
    type: "select",
    label: "发布级别",
    name: "level",
    multiple: false,
    placeHolder: "请选择",
    filterable: false,
    data: [],
    span: 13,
    width: "150px"
  },
  {
    type: "upload",
    label: "相关附件",
    name: "relateFiles",
    choseBtn: "选取文件",
    uploadBtn: "上传",
    uploadTip: "只能上传jpg/png文件，且不超过500kb",
    span: 24,
    width: "150px"
  },
  {
    type: "editor",
    label: "",
    name: "contentText",
    data: [],
    span: 24,
    width: "150px",
    config: {
      autoHeightEnabled: false,
      initialFrameHeight: 240,
      initialFrameWidth: "100%",
      serverUrl: "",
      UEDITOR_HOME_URL: "/ueditor/",
      zIndex: 100000,
      elementPathEnabled: false
    }
  }
];
export { newInfoFormBtns, newInfoFormItems };
