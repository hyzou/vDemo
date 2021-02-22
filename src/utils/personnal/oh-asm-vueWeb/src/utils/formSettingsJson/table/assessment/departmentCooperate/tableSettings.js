const departmentCooperateTableHeader = [
  {
    prop: "issueNo",
    sortForbid: true,
    lable: "期号"
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
    prop: "departmentScore",
    lable: "评审分",
    width: "90px"
  },
  {
    prop: "selfScore",
    lable: "自评分",
    width: "90px"
  },
  {
    prop: "reason",
    sortForbid: true,
    lable: "减分原因"
  },
  {
    prop: "measures",
    sortForbid: true,
    lable: "落实情况"
  },
  {
    prop: "assessCOassigns__dsp",
    sortForbid: true,
    lable: "配合处室"
  },
  {
    prop: "assessdOrgName",
    sortForbid: true,
    lable: "被考核市县"
  },
  {
    prop: "assessedCityMOrgId__dsp",
    sortForbid: true,
    lable: "市牵头部门"
  },
  {
    prop: "assessedCityCOrgId__dsp",
    sortForbid: true,
    lable: "市配合部门"
  },
  {
    prop: "operateBtns",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    width: "150px"
  }
];

export { departmentCooperateTableHeader };
