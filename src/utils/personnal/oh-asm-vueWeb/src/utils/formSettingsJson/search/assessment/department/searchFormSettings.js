const searchFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 8,
    width: "100px",
    data: [],
    linkName: "scheme"
  },
  {
    type: "select",
    label: "被考核市县",
    name: "assessedOrgId",
    span: 8,
    width: "100px",
    data: []
  },
  {
    type: "input",
    label: "考核任务",
    name: "kpiName",
    span: 8,
    width: "100px"
  },
  {
    type: "select",
    label: "状态",
    name: "schemeKpiStatus",
    span: 8,
    width: "100px",
    data: [
      {
        value: "0",
        label: "未完成"
      },
      {
        value: "1",
        label: "已完成"
      },
      {
        value: "2",
        label: "已上报"
      }
    ]
  }
];

const searchFormBtns = [
  {
    flag: "search",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "departmentEvaluationList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清  除",
  //   styleType: "",
  //   postUrl: "departmentEvaluationList"
  // }
];

export { searchFormItems, searchFormBtns };
