const distributeSuperviseFormItems = {
  edit: {
    1: [
      {
        type: "select",
        label: "考核方案",
        name: "asmSchemeId",
        span: 8,
        width: "100px",
        linkName: "searchScheme",
        data: []
      },
      // {
      //   type: "select",
      //   label: "被考核市县",
      //   name: "assessedOrgId",
      //   span: 8,
      //   width: "100px",
      //   data: []
      // },
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
        name: "status",
        span: 8,
        width: "100px",
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
      }
      // {
      //   type: "date",
      //   label: "落实日期",
      //   name: "startDt",
      //   span: 8,
      //   dateType: "datetime",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   width: "100px"
      // }
    ],
    2: [
      {
        type: "select",
        label: "考核方案",
        name: "asmSchemeId",
        span: 8,
        width: "100px",
        linkName: "searchScheme",
        data: []
      },
      // {
      //   type: "select",
      //   label: "被考核市县",
      //   name: "assessedOrgId",
      //   span: 8,
      //   width: "100px",
      //   data: []
      // },
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
        name: "status",
        span: 8,
        width: "100px",
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
      }
      // {
      //   type: "date",
      //   label: "落实日期",
      //   name: "startDt",
      //   span: 8,
      //   dateType: "datetime",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   width: "100px"
      // }
    ]
  },
  check: {
    1: [
      {
        type: "select",
        label: "考核方案",
        name: "asmSchemeId",
        span: 8,
        width: "100px",
        linkName: "searchScheme",
        data: []
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
        name: "status",
        span: 8,
        width: "100px",
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
      }
    ],
    2: [
      {
        type: "select",
        label: "考核方案",
        name: "asmSchemeId",
        span: 8,
        width: "100px",
        linkName: "searchScheme",
        data: []
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
      }
    ]
  }
};

const distributeSuperviseFormBtns = [
  {
    flag: "search",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "distributeSuperviseList_assessment"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清  除",
  //   styleType: "",
  //   postUrl: "distributeSuperviseList_assessment"
  // }
];

export { distributeSuperviseFormItems, distributeSuperviseFormBtns };
