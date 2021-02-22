const editInfoFormBtns = [
  {
    flag: "saveEdit",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "cmsContentUpdate_infosManageApi"
  },
  {
    flag: "savePublish",
    size: "small",
    icon: "",
    label: "送审",
    styleType: "primary",
    postUrl: "cmsContentUpdate_infosManageApi"
  },
  {
    flag: "cancle",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: "addRegisterMember"
  }
];
const addInfoFormBtns = [
  {
    flag: "saveAdd",
    size: "",
    icon: "",
    label: "保存草稿",
    styleType: "primary",
    postUrl: "cmsContentInsert_infosManageApi"
  },
  {
    flag: "savePublish",
    size: "",
    icon: "",
    label: "送审",
    styleType: "primary",
    postUrl: "cmsContentInsert_infosManageApi"
  },
  {
    flag: "cancle",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: "addRegisterMember"
  }
];
const editInfoFormItems = [
  {
    type: "inputHidden",
    label: "contentId",
    multiple: false,
    placeHolder: "请选择",
    name: "cmsContentId",
    span: 13,
    width: "150px"
  },
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
    type: "fileshowList",
    label: "附件列表",
    name: "newFiles",
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
export { addInfoFormBtns, editInfoFormBtns, editInfoFormItems };
