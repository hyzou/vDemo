const spotCheckTableHeader = [
  {
    prop: "status",
    propType: "statusDot",
    sortForbid: true,
    lable: "状态",
    width: "50px"
  },
  // {
  //   prop: "issueNo",
  //   lable: "期号"
  // },
  {
    prop: "kpiName",
    sortForbid: true,
    lable: "考核任务"
  },
  // {
  //   prop: "criteria",
  //   lable: "评分标准"
  // },
  {
    prop: "kpiScore",
    lable: "分值",
    width: "80px"
  },
  {
    prop: "spotCheck_score",
    lable: "抽查分",
    width: "90px"
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
    sortForbid: true,
    lable: "减分原因"
  },
  {
    prop: "self_rectifyDesc",
    sortForbid: true,
    lable: "落实情况"
  },
  // {
  //   prop: "assessMOassigns__dsp",
  //   lable: "责任处室"
  // },
  {
    prop: "assessdOrgName",
    sortForbid: true,
    lable: "被考核市县"
  },
  {
    prop: "assessedCityMOrgId__dsp",
    sortForbid: true,
    lable: "被考核牵头部门"
  },
  {
    prop: "assessedCityCOrgId__dsp",
    sortForbid: true,
    lable: "被考核配合部门"
  },
  {
    prop: "operateBtns",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    width: "150px"
  }
];

export { spotCheckTableHeader };
