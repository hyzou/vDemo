const tableHeaderSettings = [
  {
    prop: "seq",
    sortForbid: true,
    lable: "事项编号"
  },
  {
    prop: "name",
    sortForbid: true,
    lable: "检查事项名称"
  },
  {
    prop: "basis",
    sortForbid: true,
    lable: "检查依据"
  },
  {
    prop: "mode",
    sortForbid: true,
    lable: "检查方式"
  },
  {
    prop: "freq",
    sortForbid: true,
    lable: "检查频次(次/年)"
  },
  {
    prop: "option",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    width: "150px"
  }
];

export { tableHeaderSettings };
