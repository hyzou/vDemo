const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "PageDistrictEnable_randomDistrictMng"
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
    label: "地区名称",
    name: "name",
    span: 8
  },
  {
    type: "input",
    label: "地区编码",
    name: "code",
    span: 8
  }
  // {
  //   type: "select",
  //   label: "地区级别",
  //   data: [],
  //   name: "sysLevel",
  //   span: 8
  // }
];
export { searchFormBtns, searchFormItems };
