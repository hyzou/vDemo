const searchFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    linkName: "scheme",
    span: 8,
    width: "80px",
    data: []
  },
  {
    type: "select",
    label: "被考核市县",
    name: "assessedOrgId",
    span: 8,
    width: "150px",
    data: []
  }
];
const searchFormBtns = [
  {
    flag: "submit",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getSchemeAssessedSummary"
  }
  // {
  //   flag: "cancel",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "",
  //   postUrl: "getSchemeAssessedSummary"
  // }
];

export { searchFormItems, searchFormBtns };
