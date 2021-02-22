const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "kpiConsultList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   postUrl: "kpiConsultList"
  // }
];
const searchFormItems = [
  // {
  //   type: "input",
  //   label: "期号",
  //   name: "schemeNoPatch",
  //   span: 8,
  //   width: "100px"
  // },
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 8,
    width: "100px",
    data: []
  },
  {
    type: "input",
    label: "考核任务",
    name: "kpiName__dsp",
    span: 8,
    width: "100px"
  },
  {
    type: "select",
    label: "牵头部门",
    name: "manageOrgId",
    span: 8,
    width: "100px",
    data: []
  },
  {
    type: "select",
    label: "配合部门",
    name: "cooprateOrgsId",
    span: 8,
    width: "100px",
    data: []
  }
];
export { searchFormBtns, searchFormItems };
