const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getRewardApplyList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   postUrl: "getRewardApplyList"
  // }
];
const searchFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 6,
    width: "80px",
    data: [],
    linkName: "searchScheme"
  },
  {
    type: "select",
    label: "被考核市县",
    name: "assessedOrgId",
    linkName: "searchAssessdOrg",
    span: 6,
    width: "100px",
    data: []
  },
  {
    type: "select",
    label: "受表彰单位",
    name: "mainOrgId",
    span: 6,
    width: "100px",
    data: []
  },
  {
    type: "select",
    label: "表彰项",
    name: "asmSchemeRewardId",
    span: 6,
    width: "80px",
    data: []
  }
];
export { searchFormBtns, searchFormItems };
