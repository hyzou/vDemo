const superviseFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 8,
    width: "100px",
    linkName: "searchScheme",
    data: []
  }
];

const superviseFormBtns = [
  {
    flag: "search",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "superviseList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清  除",
  //   styleType: "",
  //   postUrl: "superviseList"
  // }
];
const kpiSearchFormItems = [
  {
    type: "inputHidden",
    label: "阶段",
    name: "assessPhase",
    span: 8,
    width: "80px"
  },
  {
    type: "input",
    label: "考核任务",
    name: "kpiName",
    span: 8,
    width: "80px"
  },
  {
    type: "select",
    label: "状态",
    name: "schemeKpiStatus",
    span: 8,
    width: "80px",
    data: [
      {
        value: "1",
        label: "已完成"
      },
      {
        value: "0",
        label: "未完成"
      },
      {
        value: "2",
        label: "已发布"
      }
    ]
  },
  {
    type: "select",
    label: "指标筛选",
    name: "kpiFilter",
    span: 8,
    width: "100px",
    data: [
      {
        value: "random",
        label: "抽查指标"
      },
      {
        value: "all",
        label: "所有指标"
      }
    ]
  }
];
const kpiSearchFormBtns = [
  {
    flag: "search",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "distributeSuperviseList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清  除",
  //   styleType: "",
  //   postUrl: "distributeSuperviseList"
  // }
];
export {
  superviseFormItems,
  superviseFormBtns,
  kpiSearchFormItems,
  kpiSearchFormBtns
};
