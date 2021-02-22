const randomReportsDialogBtns = [
  {
    flag: "saveView",
    size: "",
    icon: "",
    label: "上传数据",
    styleType: "primary",
    postUrl: "importFarmlandDef_randomReports"
  },
  {
    flag: "download",
    size: "small",
    icon: "",
    label: "下载模板",
    styleType: "primary"
  }
];
const randomReportsDialogItems = [
  {
    type: "upload",
    label: "相关附件",
    name: "relateFiles",
    choseBtn: "选取文件",
    uploadBtn: "上传",
    uploadTip: "只能上传jpg/png文件，且不超过500kb",
    span: 24,
    width: "80px"
  }
];
export { randomReportsDialogBtns, randomReportsDialogItems };
