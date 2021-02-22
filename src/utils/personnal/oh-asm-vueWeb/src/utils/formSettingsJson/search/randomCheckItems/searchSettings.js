const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "queryInspectionItem_randomCheckItems"
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
    label: "检查事项",
    name: "name",
    span: 8
  },
  {
    type: "input",
    label: "检查依据",
    name: "basis",
    span: 8
  }
  // {
  //   type: "select",
  //   label: "检查方式",
  //   name: "mode",
  //   data:[
  //     {
  //       label:"",
  //       value:""
  //     }
  //   ],
  //   span: 8
  // }
];
export { searchFormBtns, searchFormItems };
