const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getAllotData_poolAnalysis"
  }
];
const searchFormItems = [
  // {
  //   type: "select",
  //   label: "被考核市县",
  //   name: "assessOrgId",
  //   multiple: false,
  //   placeHolder: "请选择",
  //   filterable: true,
  //   data: [
  //     {
  //       label: "杭州市",
  //       value: "100"
  //     }
  //   ],
  //   span: 8
  // },
  {
    type: "select",
    label: "方案名称",
    name: "schemeId",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    linkName: "schemeId",
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "select",
    label: "数据项名称",
    name: "varId",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    data: [],
    span: 8,
    width: "100px"
  }
];
export { searchFormBtns, searchFormItems };
