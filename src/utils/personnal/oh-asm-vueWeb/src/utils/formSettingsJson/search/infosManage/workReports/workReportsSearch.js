const workReportsSearchBtns = [
  {
    flag: "search",
    size: "small",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getContentList_infosManageApi"
  }
  // {
  //   flag: "reset",
  //   size: "small",
  //   icon: "",
  //   label: "清除",
  //   styleType: "",
  //   postUrl: "addRegisterMember"
  // }
];
const workReportsSearchItems = [
  {
    type: "select",
    label: "栏目名称",
    multiple: false,
    hideItem: true,
    placeHolder: "请选择",
    filterable: false,
    name: "cmsChannelId",
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "select",
    label: "发布级别",
    multiple: false,
    placeHolder: "请选择",
    filterable: false,
    name: "level",
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "input",
    label: "标题",
    name: "title",
    span: 8,
    width: "100px"
  },
  {
    type: "input",
    label: "发布人",
    name: "publishByName",
    span: 8,
    width: "100px"
  },
  {
    type: "date",
    label: "时间",
    name: "publishDt",
    dateType: "daterange",
    dateRangeSeparator: "至",
    dateStartPlaceholder: "开始日期",
    dateEndPlaceholder: "结束日期",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    span: 8,
    width: "100px"
  }
];

const workReportsSearchItemsMy = [
  {
    type: "select",
    label: "栏目名称",
    multiple: false,
    hideItem: true,
    placeHolder: "请选择",
    filterable: false,
    name: "cmsChannelId",
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "select",
    label: "发布级别",
    multiple: false,
    placeHolder: "请选择",
    filterable: false,
    name: "level",
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "input",
    label: "标题",
    name: "title",
    span: 8,
    width: "100px"
  },
  {
    type: "date",
    label: "时间",
    name: "publishDt",
    dateType: "daterange",
    dateRangeSeparator: "至",
    dateStartPlaceholder: "开始日期",
    dateEndPlaceholder: "结束日期",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    span: 8,
    width: "100px"
  }
];
export {
  workReportsSearchBtns,
  workReportsSearchItems,
  workReportsSearchItemsMy
};
