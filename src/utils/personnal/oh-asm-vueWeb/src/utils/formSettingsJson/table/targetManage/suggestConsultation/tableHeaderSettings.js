const kpiConsultTableHeader = [
  // {
  //   prop: "issueNo",
  //   lable: "期号",
  //   sortForbid: true,
  //   width: "200px"
  // },
  {
    prop: "kpiName",
    sortForbid: true,
    lable: "考核任务"
  },
  {
    prop: "kpiCriteria",
    sortForbid: true,
    lable: "评分标准"
  },
  {
    prop: "kpiScore",
    lable: "分值",
    width: "80px"
  },
  // {
  //   prop: "manageOrg__dsp",
  //   lable: "牵头部门",
  //   width: "300px"
  // },
  // {
  //   prop: "cooprateOrgs__dsp",
  //   lable: "配合部门",
  //   width: "300px"
  // },
  {
    prop: "opinion",
    sortForbid: true,
    lable: "修改意见"
  },
  {
    prop: "operateBtns",
    sortForbid: true,
    propType: "operateBtns",
    lable: "操作",
    width: "100"
  }
];
export { kpiConsultTableHeader };
