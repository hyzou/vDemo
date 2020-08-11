let searchItems = [
  {
    type: "select",
    label: "栏目名称",
    multiple: false,
    hideItem: true,
    placeHolder: "请选择",
    filterable: false,
    name: "subColumn",
    data: [
      {
        value: "workReports",
        label: "信息管理.工作简报"
      },
      {
        value: "notification",
        label: "信息管理.通知公告"
      },
      {
        value: "dataDownload",
        label: "信息管理.资料下载"
      },
      {
        value: "dynamic",
        label: "信息管理.各地动态"
      },
      {
        value: "inspectionFile",
        label: "信息管理.考核文件"
      },
      {
        value: "infosDistribution",
        label: "信息管理.信息报送"
      },
      {
        value: "inspectionReport",
        label: "信息管理.考核通报"
      },
      {
        value: "hangzhou",
        label: "信息管理.市(县)内信息.杭州"
      },
      {
        value: "essenceInfo",
        label: "信息管理.精华信息"
      }
    ],
    span: 8,
    width: "150px"
  },
  // {
  //   type: "elTreeSelect",
  //   label: "部门",
  //   name: "orgName",
  //   span: 8,
  //   width: "150px",
  //   props: {
  //     value: "orgId",
  //     label: "orgName",
  //     children: "children",
  //     choseOnlyLeaf: false
  //   },
  //   data: []
  // },
  // {
  //   type: "input",
  //   label: "附件名",
  //   name: "fileName",
  //   span: 8,
  //   width: "150px"
  // },
  {
    type: "input",
    label: "标题",
    name: "title",
    span: 8,
    width: "150px"
  },
  {
    type: "input",
    label: "发布人",
    name: "autor",
    span: 8,
    width: "150px"
  },
  {
    type: "date",
    label: "发布时间",
    name: "extd1",
    dateType: "daterange",
    dateRangeSeparator: "至",
    dateStartPlaceholder: "开始日期",
    dateEndPlaceholder: "结束日期",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    span: 8,
    width: "150px"
  }
];
export default searchItems;
