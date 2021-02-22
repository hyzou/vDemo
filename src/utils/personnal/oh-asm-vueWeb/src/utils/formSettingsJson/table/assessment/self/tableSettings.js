const selfTableHeader = {
  other: [
    {
      prop: "status",
      sortForbid: true,
      propType: "statusDot",
      lable: "状态",
      width: "50px"
    },
    // {
    //   prop: "schemeName",
    //   sortForbid: true,
    //   lable: "方案名称"
    // },
    // {
    //   prop: "issueNo",
    //   sortForbid: true,
    //   lable: "期号"
    // },
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
      prop: "score",
      lable: "自评分",
      width: "90px"
    },
    {
      prop: "deductionReason",
      sortForbid: true,
      lable: "减分原因"
    },
    {
      prop: "rectifyDesc",
      sortForbid: true,
      lable: "落实情况"
    },
    // {
    //   prop: "assessedCityMOrgId__dsp",
    //   sortForbid: true,
    //   lable: "被考核牵头部门"
    // },
    {
      prop: "assessedCityCOrgId__dsp",
      sortForbid: true,
      lable: "被考核配合部门"
    },
    // 配合部门可能存在多个，意见不止一个，所以在详情里面查看
    // {
    //   prop: "commonMessage",
    //   sortForbid: true,
    //   lable: "配合部门意见"
    // },
    {
      prop: "assessdMOassigns__dsp",
      sortForbid: true,
      lable: "责任处室"
    },
    {
      prop: "operateBtns",
      sortForbid: true,
      lable: "操作",
      propType: "operateBtns",
      width: "150px"
    }
  ],
  office: [
    {
      prop: "status",
      sortForbid: true,
      propType: "statusDot",
      lable: "状态",
      width: "50px"
    },
    // {
    //   prop: "schemeName",
    //   sortForbid: true,
    //   lable: "方案名称"
    // },
    // {
    //   prop: "issueNo",
    //   sortForbid: true,
    //   lable: "期号"
    // },
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
      prop: "score",
      lable: "自评分",
      width: "90px"
    },
    {
      prop: "deductionReason",
      sortForbid: true,
      lable: "减分原因"
    },
    {
      prop: "rectifyDesc",
      sortForbid: true,
      lable: "落实情况"
    },
    // {
    //   prop: "assessedCityMOrgId__dsp",
    //   sortForbid: true,
    //   lable: "被考核牵头部门"
    // },
    {
      prop: "assessedCityCOrgId__dsp",
      sortForbid: true,
      lable: "被考核配合部门"
    },
    // 配合部门可能存在多个，意见不止一个，所以在详情里面查看
    // {
    //   prop: "commonMessage",
    //   sortForbid: true,
    //   lable: "配合部门意见"
    // },
    // {
    //   prop: "assessdMOassigns__dsp",
    //   sortForbid: true,
    //   lable: "责任处室"
    // },
    {
      prop: "operateBtns",
      sortForbid: true,
      lable: "操作",
      propType: "operateBtns",
      width: "150px"
    }
  ]
};

export { selfTableHeader };
