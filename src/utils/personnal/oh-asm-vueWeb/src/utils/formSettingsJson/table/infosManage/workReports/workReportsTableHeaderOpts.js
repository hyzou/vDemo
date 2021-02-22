const workReportsTableHeaderMy = [
  {
    prop: "title",
    lable: "标题",
    width: "",
    clickVarKey: "id",
    sortForbid: true,
    clickable: true
  },
  {
    prop: "cmsChannelName",
    lable: "栏目名称",
    sortForbid: true,
    width: "150px"
  },
  {
    prop: "levelName",
    lable: "发布级别",
    sortForbid: true,
    width: "120px"
  },
  {
    prop: "created",
    lable: "创建日期",
    width: "220px"
  },
  {
    prop: "publishDt",
    lable: "发布时间",
    width: "220px"
  },
  {
    prop: "viewCount",
    lable: "浏览量",
    width: "120px"
  },
  {
    prop: "statusText",
    sortForbid: true,
    lable: "状态",
    width: "120px"
  }
];

const workReportsTableHeader = [
  {
    prop: "title",
    lable: "标题",
    width: "",
    clickVarKey: "id",
    sortForbid: true,
    clickable: true
  },
  {
    prop: "cmsChannelName",
    lable: "栏目名称",
    sortForbid: true,
    width: "250px"
  },
  {
    prop: "levelName",
    lable: "发布级别",
    sortForbid: true,
    width: "250px"
  },
  {
    prop: "publishByName",
    lable: "发布人",
    sortForbid: true,
    width: "250px"
  },
  {
    prop: "publishDt",
    lable: "发布日期",
    width: "250px"
  }
];

const workReportsTableHeaderCheck = [
  {
    prop: "title",
    lable: "标题",
    width: "",
    clickVarKey: "id",
    sortForbid: true,
    clickable: true
  },
  {
    prop: "cmsChannelName",
    lable: "栏目名称",
    sortForbid: true,
    width: "150px"
  },
  {
    prop: "levelName",
    lable: "发布级别",
    sortForbid: true,
    width: "150px"
  },
  {
    prop: "createdByName",
    lable: "送审人",
    sortForbid: true,
    width: ""
  },
  {
    prop: "updated",
    lable: "送审时间",
    width: ""
  }
];
export {
  workReportsTableHeader,
  workReportsTableHeaderMy,
  workReportsTableHeaderCheck
};
