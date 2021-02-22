const tableHeaderSettings = [
  {
    prop: "status",
    propType: "statusDot",
    sortForbid: true,
    lable: "",
    width: "50px"
  },
  {
    prop: "assessmentTarget",
    lable: "年度考核目标任务",
    sortForbid: true,
    width: "400px"
  },
  {
    prop: "scoreStandard",
    lable: "评分标准",
    sortForbid: true,
    width: ""
  },
  {
    prop: "targetScore",
    lable: "分值",
    width: "80px"
  },
  {
    prop: "selfScore",
    lable: "自评分",
    width: "90px"
  },
  {
    prop: "operateBtns",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    isExpand: "true",
    width: "150px"
  }
];

export { tableHeaderSettings };
