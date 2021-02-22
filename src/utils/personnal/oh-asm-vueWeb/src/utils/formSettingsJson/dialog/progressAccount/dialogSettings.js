const assignStandDialogBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const assignStandDialogItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "assessmentId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "数据id",
    name: "targetId",
    span: 24,
    width: "150px"
  },
  {
    title: "年度考核任务基本信息",
    type: "block",
    span: 24,
    name: "spotCheckBase",
    children: [
      {
        type: "input",
        label: "年度",
        name: "year",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "考核内容",
        name: "assessmentContent",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "重点考核事项",
        name: "assessmentItems",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "考核指标",
        name: "assessmentTarget",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "年度考核目标任务",
        name: "assessmentTargetTask",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "评分标准",
        name: "scoreStandard",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "指标分值",
        name: "targetScore",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  },
  {
    title: "牵头部门分配",
    type: "block",
    span: 24,
    name: "assignLeadDep",
    children: [
      {
        type: "select",
        label: "牵头部门",
        name: "cityLeadDepartmentId",
        multiple: false,
        data: [],
        span: 12,
        width: "150px"
      }
    ]
  }
];
export { assignStandDialogBtns, assignStandDialogItems };
