const tableHeaderSettings = [
  {
    prop: "name",
    sortForbid: true,
    lable: "方案名称"
  },
  {
    prop: "chkDefItemId__dsp",
    sortForbid: true,
    lable: "检查事项名称"
  },
  {
    prop: "createdParse",
    lable: "创建时间"
  },
  {
    prop: "startDtParse",
    lable: "检查时间"
  },
  {
    prop: "status__dsp",
    sortForbid: true,
    lable: "检查状态"
  },
  {
    prop: "option",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    width: "180px"
  }
];

export { tableHeaderSettings };
