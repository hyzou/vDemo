const schemeTableHeader = [
  {
    prop: "name",
    lable: "名称",
    sortForbid: true
  },
/*  {
    prop: "issueNo",
    lable: "期号",
    width: "200px",
    sortForbid: true
  },*/
  {
    prop: "manageOrgId__dsp",
    lable: "考核牵头部门",
    width: "200px",
    sortForbid: true
  },
  {
    prop: "cooprateOrgs__dsp",
    lable: "考核配合部门",
    width: "200px",
    sortForbid: true
  },
  {
    prop: "kpiScore",
    lable: "分值",
    width: "80px"
  },
  {
    prop: "operateBtns",
    propType: "operateBtns",
    lable: "操作",
    sortForbid: true
  }
];
const quoteSchemeTableHeader = [
  {
    prop: "issueNo",
    lable: "期号"
  },
  {
    prop: "name",
    lable: "名称"
  },
  {
    prop: "assessStrategy__dsp",
    lable: "评分策略"
  },
  {
    prop: "grossScore",
    lable: "总分"
  },
  {
    prop: "operateBtns",
    propType: "operateBtns",
    lable: "操作",
    width: "150"
  }
];
const quoteSchemeDetailTableHeader = [
  {
    prop: "text",
    lable: "名称"
  },
  {
    prop: "manageOrgId__dsp",
    lable: "考核牵头部门"
  },
  {
    prop: "cooprateOrgs__dsp",
    lable: "考核配合部门"
  },
  {
    prop: "kpiScore",
    lable: "分值"
  }
];
const schemeDetailTableHeader = [
  {
    prop: "name",
    lable: "名称"
  },
  {
    prop: "startDate",
    lable: "开始时间"
  },
  {
    prop: "endDate",
    lable: "结束时间"
  }
];
export {
  schemeTableHeader,
  quoteSchemeTableHeader,
  quoteSchemeDetailTableHeader,
  schemeDetailTableHeader
};
