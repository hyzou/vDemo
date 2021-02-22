const submitKpiSearchFormItems = [
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 8,
    width: "150px",
    data: []
  },
  {
    type: "select",
    label: "状态",
    name: "schemeKpiStatus",
    span: 8,
    width: "150px",
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
        label: "已提交"
      }
    ]
  }
];
const releaseKpiSearchFormItems = {
  "random-assess": [
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      linkName: "scheme",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "被抽查市县",
      name: "assessedOrgId",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "状态",
      name: "schemeKpiStatus",
      span: 8,
      width: "150px",
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
  ],
  "higher-assess": [
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      linkName: "scheme",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "被考核市县",
      name: "assessedOrgId",
      span: 8,
      width: "150px",
      data: []
    },
    {
      type: "select",
      label: "状态",
      name: "schemeKpiStatus",
      span: 8,
      width: "150px",
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
  ]
};
const kpiSearchFormBtns = [
  {
    flag: "submit",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "schemeKpiBySchemeId"
  }
  // {
  //   flag: "cancel",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "",
  //   postUrl: ""
  // }
];

export {
  submitKpiSearchFormItems,
  releaseKpiSearchFormItems,
  kpiSearchFormBtns
};
