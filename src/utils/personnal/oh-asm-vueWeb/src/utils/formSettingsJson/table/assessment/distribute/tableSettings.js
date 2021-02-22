const distributeTableHeader = [
  {
    prop: "status",
    propType: "statusDot",
    lable: "状态",
    sortForbid: true,
    width: "50px"
  },
  {
    prop: "kpiName",
    sortForbid: true,
    lable: "考核任务"
  },
  {
    prop: "criteria",
    sortForbid: true,
    lable: "评分标准"
  },
  {
    prop: "kpiScore",
    lable: "分值",
    width: "80px"
  },
  {
    prop: "assessedProvinceMOrgId__dsp",
    sortForbid: true,
    lable: "考核牵头部门"
  },
  // {
  //   prop: "assessedProvinceCOrgId__dsp",
  //   lable: "考核配合部门"
  // },
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
    prop: "self_score",
    lable: "自评分",
    width: "90px"
  },
  {
    prop: "department_score",
    lable: "评审分",
    width: "90px"
  },
  {
    prop: "spotCheck_score",
    lable: "抽查分",
    width: "90px"
  },
  {
    prop: "operateBtns",
    lable: "操作",
    sortForbid: true,
    propType: "operateBtns"
  }
];

const selfKpiTableHeader = [
  {
    prop: "status",
    sortForbid: true,
    lable: "状态",
    propType: "statusDot",
    width: "70px"
  },
  {
    prop: "schemeName",
    sortForbid: true,
    lable: "方案名称"
  },
  {
    prop: "kpiName",
    sortForbid: true,
    lable: "考核任务"
  },
  {
    prop: "criteria",
    sortForbid: true,
    lable: "评分标准"
  },
  {
    prop: "kpiScore",
    lable: "分值",
    width: "80px"
  },
  {
    prop: "self_score",
    lable: "自评分",
    width: "90px"
  },
  {
    prop: "self_rectifyDesc",
    sortForbid: true,
    lable: "落实情况"
  },
  {
    prop: "self_deductionReason",
    sortForbid: true,
    lable: "减分原因"
  }
];
const departmentKpiTableHeader = [
  {
    prop: "status",
    sortForbid: true,
    lable: "状态",
    propType: "statusDot",
    width: "70px"
  },
  {
    prop: "schemeName",
    sortForbid: true,
    lable: "方案名称"
  },
  {
    prop: "assessdOrgName",
    sortForbid: true,
    lable: "被考核市县"
  },
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
    prop: "department_score",
    lable: "评审分",
    width: "90px"
  }
];
const spotCheckKpiTableHeader = [
  {
    prop: "status",
    sortForbid: true,
    lable: "状态",
    propType: "statusDot",
    width: "70px"
  },
  {
    prop: "schemeName",
    sortForbid: true,
    lable: "方案名称"
  },
  {
    prop: "assessdOrgName",
    sortForbid: true,
    lable: "被抽查市县"
  },
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
  }
];
export {
  distributeTableHeader,
  selfKpiTableHeader,
  departmentKpiTableHeader,
  spotCheckKpiTableHeader
};
