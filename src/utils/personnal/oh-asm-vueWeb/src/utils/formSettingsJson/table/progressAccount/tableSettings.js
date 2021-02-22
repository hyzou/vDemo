const tableHeaderSettings = [
  {
    prop: "consultStatus",
    lable: "状态",
    propType: "statusDot",
    sortForbid: true,
    width: "50px"
  },
  {
    prop: "assessmentTargetTask",
    sortForbid: true,
    lable: "年度考核任务"
  },
  {
    prop: "provinceLeadDepartment",
    sortForbid: true,
    lable: "省牵头部门"
  },
  {
    prop: "cityLeadDepartment",
    sortForbid: true,
    lable: "市牵头部门"
  },
  {
    prop: "option",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    width: "150px"
  }
];

export { tableHeaderSettings };
