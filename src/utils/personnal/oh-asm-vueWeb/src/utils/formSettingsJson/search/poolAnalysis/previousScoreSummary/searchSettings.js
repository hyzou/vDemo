const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getScoreHistory_poolAnalysis"
  }
];
const searchFormItems = [
  {
    type: "select",
    label: "发起考核机构",
    name: "assessOrgId",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "stepInput",
    label: "历年个数",
    name: "yearsNumber",
    step: 1,
    precision: 0,
    min: 1,
    max: 10,
    span: 8,
    width: "100px"
  }
];
export { searchFormBtns, searchFormItems };
