const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "pageProfessorList_randomProfessorMng"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "primary",
  //   postUrl: "queryInspectionItem_randomCheckItems"
  // }
];
const searchFormItems = [
  {
    type: "input",
    label: "姓名",
    name: "peopName",
    span: 8
  },
  {
    type: "input",
    label: "单位",
    name: "entName",
    span: 8
  },
  {
    type: "select",
    label: "专业",
    data: [],
    name: "peopMajor",
    span: 8
  }
];
export { searchFormBtns, searchFormItems };
