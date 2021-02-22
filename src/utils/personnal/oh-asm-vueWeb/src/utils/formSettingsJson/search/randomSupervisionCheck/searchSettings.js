const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "pageScheme_randomSupervisionCheck"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "primary",
  //   postUrl: "pageScheme_randomSupervisionCheck"
  // }
];
const searchFormItems = [
  {
    type: "input",
    label: "方案名称",
    name: "name",
    span: 8,
    width: "100px"
  }
  // {
  //   type: "input",
  //   label: "检查依据",
  //   name: "basis",
  //   span: 8
  // }
];
export { searchFormBtns, searchFormItems };
