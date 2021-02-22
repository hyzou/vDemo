const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getLostKpiInfo_poolAnalysis"
  }
];
const searchFormItems = [
  {
    type: "select",
    label: "方案名称",
    name: "schemeId",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    data: [],
    span: 8,
    width: "100px"
  }
];
export { searchFormBtns, searchFormItems };
