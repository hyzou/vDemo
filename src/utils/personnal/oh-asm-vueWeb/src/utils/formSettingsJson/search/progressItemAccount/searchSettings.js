const searchFormBtns = [
  {
    flag: "search",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getAllStandList_supervision"
  }
];
const searchFormItems = [
  {
    type: "select",
    label: "市县",
    width: "100px",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    name: "city",
    data: [],
    span: 8
  },
  {
    type: "date",
    label: "专项编号",
    name: "issueNo",
    span: 8,
    dateType: "year"
  },
  {
    type: "date",
    label: "落实日期",
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
