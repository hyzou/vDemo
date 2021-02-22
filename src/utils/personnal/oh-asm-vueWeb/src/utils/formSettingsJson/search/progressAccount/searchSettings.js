const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getAllStandList_supervision"
  }
  // {
  //   flag: "clear",
  //   size: "",
  //   icon: "",
  //   label: "清除",
  //   styleType: "primary"
  // }
];
const searchFormItems = [
  {
    type: "select",
    label: "市县",
    name: "assessedOrgId",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    data: [
      {
        label: "杭州市",
        value: "330100"
      },
      {
        label: "宁波市",
        value: "330200"
      }
    ],
    span: 8
  },
  {
    type: "input",
    label: "填报人",
    name: "reportBy",
    span: 8
  },
  {
    type: "date",
    label: "填报日期",
    name: "reportDate",
    span: 8,
    dateType: "daterange",
    dateRangeSeparator: "至",
    dateStartPlaceholder: "开始日期",
    dateEndPlaceholder: "结束日期",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd"
  }
];
export { searchFormBtns, searchFormItems };
