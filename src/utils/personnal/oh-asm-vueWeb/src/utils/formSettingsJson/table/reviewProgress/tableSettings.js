const tableHeaderSettings = [
  {
    prop: "assessedOrgId__dsp",
    lable: "填报机构",
    sortForbid: true,
    width: "200px"
  },
  {
    prop: "progess",
    sortForbid: true,
    lable: "考核工作进展情况"
  },
  {
    prop: "reportBy",
    lable: "填报人",
    sortForbid: true,
    width: "100px"
  },
  {
    prop: "reportDateTime",
    lable: "填报日期",
    width: "160px"
  },
  {
    prop: "option",
    lable: "操作",
    propType: "operateBtns",
    sortForbid: true,
    width: "150px"
  }
];

export { tableHeaderSettings };
