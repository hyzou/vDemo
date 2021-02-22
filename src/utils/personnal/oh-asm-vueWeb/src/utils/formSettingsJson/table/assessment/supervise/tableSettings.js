const superviseTableHeader = {
  1: [
    {
      prop: "assessedOrgDistrict__dsp",
      sortForbid: true,
      lable: "被考核市（县）"
    },
    {
      prop: "processText",
      sortForbid: true,
      lable: "环节"
    },
    {
      prop: "cutSelf",
      lable: "自评扣分"
    },
    {
      prop: "cutHigher",
      lable: "评审扣分"
    },
    {
      prop: "cutRandom",
      lable: "抽查扣分"
    },
    {
      prop: "repeatCutScore",
      lable: "重复扣分"
    },
    {
      prop: "cutTotalScore",
      lable: "扣分合计"
    },
    {
      prop: "rewardScore",
      lable: "加分"
    },
    {
      prop: "totalScore",
      lable: "总得分"
    },
    {
      prop: "operateBtns",
      sortForbid: true,
      lable: "操作",
      propType: "operateBtns"
    }
  ],
  2: [
    {
      prop: "assessedOrgDistrict__dsp",
      sortForbid: true,
      lable: "被考核市（县）"
    },
    {
      prop: "processText",
      sortForbid: true,
      lable: "环节"
    },
    {
      prop: "cutSelf",
      lable: "自评扣分"
    },
    {
      prop: "cutHigher",
      lable: "评审扣分"
    },
    {
      prop: "cutRandom",
      lable: "抽查扣分"
    },
    {
      prop: "repeatCutScore",
      lable: "重复扣分"
    },
    {
      prop: "cutTotalScore",
      lable: "扣分合计"
    },
    {
      prop: "rewardScore",
      lable: "加分"
    },
    {
      prop: "totalScore",
      lable: "总得分"
    },
    {
      prop: "operateBtns",
      sortForbid: true,
      lable: "操作",
      propType: "operateBtns"
    }
  ]
};
const kpiTableHeader = [
  {
    prop: "status",
    propType: "statusDot",
    sortForbid: true,
    lable: "状态",
    width: "50px"
  },
  {
    prop: "kpiName",
    sortForbid: true,
    lable: "考核任务"
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
    prop: "assessedProvinceMOrgId__dsp",
    sortForbid: true,
    lable: "考核牵头部门"
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
export { superviseTableHeader, kpiTableHeader };
