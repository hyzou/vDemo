const departmentTableHeader = [
  {
    prop: "status",
    propType: "statusDot",
    lable: "状态",
    width: "50px",
    sortForbid: true
  },
  // {
  //   prop: "schemeName",
  //   lable: "方案名称",
  //   sortForbid: true
  // },
  {
    prop: "kpiName",
    lable: "考核任务",
    sortForbid: true
  },
  {
    prop: "criteria",
    lable: "评分标准",
    sortForbid: true
  },
  {
    prop: "kpiScore",
    lable: "分值",
    width: "80px"
  },
  {
    prop: "department_score",
    lable: "评审分",
    width: "90px"
  },
  {
    prop: "self_score",
    lable: "自评分",
    width: "90px"
  },
  {
    prop: "self_deductionReason",
    lable: "减分原因",
    sortForbid: true
  },
  {
    prop: "self_rectifyDesc",
    lable: "落实情况",
    sortForbid: true
  },
  {
    prop: "assessMOassigns__dsp",
    lable: "责任处室",
    sortForbid: true
  },
  {
    prop: "assessdOrgName",
    lable: "被考核市县",
    sortForbid: true
  },
  {
    prop: "assessedCityMOrgId__dsp",
    lable: "被考核牵头部门",
    sortForbid: true
  },
  {
    prop: "assessedCityCOrgId__dsp",
    lable: "被考核配合部门",
    sortForbid: true
  },
  {
    prop: "operateBtns",
    lable: "操作",
    propType: "operateBtns",
    width: "150px",
    sortForbid: true
  }
];

export { departmentTableHeader };
