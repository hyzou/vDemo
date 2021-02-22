const checkProvinceKpiDialogBtns = [];
const checkProvinceKpiDialogItems = [
  {
    type: "input",
    label: "年度考核目标任务",
    name: "assessmentTarget",
    span: 24,
    disabled: true,
    width: "150px"
  },
  {
    type: "textarea",
    label: "评分标准",
    name: "scoreStandard",
    rows: 4,
    span: 24,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "省牵头部门",
    name: "provinceLeadDepartment",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "省配合部门",
    name: "provinceCoordinationDepartment",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "分值",
    name: "targetScore",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "input",
    label: "自评分",
    name: "selfScore",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "textarea",
    label: "减分原因",
    name: "reason",
    span: 24,
    rows: 4,
    disabled: true,
    width: "150px"
  }
  // {
  //   type: "textarea",
  //   label: "整改措施",
  //   name: "measures",
  //   span: 24,
  //   rows: 4,
  //   disabled: true,
  //   width: "150px"
  // }
];
export { checkProvinceKpiDialogBtns, checkProvinceKpiDialogItems };
