const evaluationSummaryTableHeader = [
  {
    prop: "assessedOrgId__dsp",
    lable: "被考核市县",
    sortForbid: true
  },
  {
    prop: "selfTotalScore",
    lable: "自评分"
  },
  {
    prop: "higherTotalScore",
    lable: "评审分"
  },
  {
    prop: "randomTotalScore",
    lable: "抽查分"
  },
  {
    prop: "kpiScore",
    lable: "指标总得分"
  },
  {
    prop: "repeatCutScore",
    lable: "重复分"
  },
  {
    prop: "rewardScore",
    lable: "表彰加分"
  },
  {
    prop: "totalScore",
    lable: "总分"
  },
  {
    prop: "operateBtns",
    lable: "操作",
    propType: "operateBtns",
    width: "150px",
    sortForbid: true
  }
];

export { evaluationSummaryTableHeader };
