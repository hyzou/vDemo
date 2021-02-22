const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "cooperateList"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   postUrl: "cooperateList"
  // }
];
const searchFormItems = [
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
  // {
  //   type: "date",
  //   label: "落实日期",
  //   name: "commitDate",
  //   span: 8,
  //   dateType: "datetime",
  //   format: "yyyy-MM-dd",
  //   valueFormat: "yyyy-MM-dd",
  //   width: "100px"
  // }
];
export { searchFormBtns, searchFormItems };
