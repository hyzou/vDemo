const spotCheckContentItems = [
  {
    type: "inputHidden",
    label: "方案id",
    name: "asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "阶段id",
    name: "asmShemeAssessPhaseId",
    span: 24,
    width: "150px"
  },
  {
    type: "date",
    label: "开始日期",
    name: "startDt",
    span: 12,
    dateType: "date",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    width: "150px"
  },
  {
    type: "date",
    label: "结束日期",
    name: "endDt",
    span: 12,
    dateType: "date",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    width: "150px"
  },
  {
    type: "stepInput",
    label: "权重(%)",
    name: "weight",
    step: 1,
    min: 0,
    span: 12,
    width: "150px"
  },
  {
    type: "select",
    label: "指标",
    name: "asmKpiIds",
    multiple: true,
    filterable: true,
    span: 24,
    width: "150px",
    data: []
  },
  {
    type: "inputTable",
    label: "抽查组",
    name: "updatedPhaseAcls",
    useType: "add",
    linkName: "updatedPhaseAcls",
    span: 24,
    width: "150px",
    headers: [
      {
        key: "leader",
        title: "抽查组长",
        inputType: "select"
      },
      {
        key: "members",
        title: "抽查组员",
        inputType: "select",
        multiple: true
      },
      {
        key: "assessedOrgs",
        title: "抽查对象",
        inputType: "select",
        multiple: true
      },
      {
        key: "attention",
        title: "重点事项"
      },
      {
        key: "focus",
        title: "注意事项"
      }
    ],
    tableItems: {
      leader: [],
      members: [],
      assessedOrgs: [],
      attention: "",
      focus: ""
    }
  }
];
const spotCheckContentButton = [
  {
    flag: "startSpotCheck",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/schemePhase/addAssessRandomPhase"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];
const scoreCheckContentItems = [
  {
    type: "inputHidden",
    label: "方案id",
    name: "scoreCheck_asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    title: "考核办评审打分情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "select",
        label: "采用打分规则",
        name: "acceptScore",
        data: [
          {
            label: "部门评分",
            value: "1"
          },
          {
            label: "抽查评分",
            value: "2"
          }
        ],
        span: 12,
        width: "150px"
      }
    ]
  }
];
const scoreCheckContentBtn = [
  {
    flag: "scoreCheck",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/kpi/updateIgnoreAssessKpi"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];
export {
  spotCheckContentItems,
  spotCheckContentButton,
  scoreCheckContentItems,
  scoreCheckContentBtn
};
