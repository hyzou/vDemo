const searchFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 8,
    width: "80px",
    data: []
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
    flag: "submit",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "spotCheckEvaluationList"
  }
  // {
  //   flag: "cancel",
  //   size: "",
  //   icon: "",
  //   label: "清  除",
  //   styleType: "",
  //   postUrl: ""
  // }
];

export { searchFormItems, searchFormBtns };
