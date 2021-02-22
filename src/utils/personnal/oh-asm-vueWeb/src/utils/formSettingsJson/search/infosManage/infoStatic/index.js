const infoStaticSearchBtns = [
  {
    flag: "search",
    size: "small",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getContentList_infosManageApi"
  }
];
const infoStaticSearchItems = [
  {
    type: "select",
    label: "栏目名称",
    multiple: false,
    placeHolder: "请选择",
    filterable: false,
    name: "cmsChannelId",
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "date",
    label: "发布时间",
    name: "publishYear",
    dateType: "year",
    format: "yyyy",
    valueFormat: "yyyy",
    span: 8,
    width: "100px"
  }
];
export { infoStaticSearchBtns, infoStaticSearchItems };
