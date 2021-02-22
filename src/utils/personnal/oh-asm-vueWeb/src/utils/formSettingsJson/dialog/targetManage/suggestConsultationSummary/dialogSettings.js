const suggestConsultationDialogFormItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "targetId",
    span: 24,
    width: "150px"
  },
  {
    type: "group",
    title: "基本情况",
    span: 24
  },
  {
    type: "input",
    label: "期号",
    name: "issueNo",
    span: 12,
    width: "150px",
    disabled: true
  },
  {
    type: "input",
    label: "市县",
    name: "cityName",
    span: 12,
    width: "150px",
    disabled: true
  },
  {
    type: "elTree",
    label: "指标类目",
    name: "kpiIndextree",
    span: 24,
    width: "150px",
    treeSettings: {
      treeData: [],
      expandAll: false,
      nodeKey: "id",
      nodeExpand: false,
      defaultProps: {
        children: "children",
        label: "text"
      }
    }
  },
  {
    type: "input",
    label: "名称",
    name: "kpiName",
    span: 24,
    width: "150px",
    disabled: true
  },
  {
    type: "textarea",
    label: "评分标准",
    name: "kpiCriteria",
    span: 24,
    width: "150px",
    disabled: true,
    rows: 4
  },
  {
    type: "group",
    title: "意见列表",
    span: 24
  },
  {
    type: "textarea",
    label: "市县级征询意见",
    name: "cityOpinion",
    span: 24,
    width: "150px",
    rows: 3
  },
  {
    type: "inputTable",
    label: "意见列表",
    name: "coordinationList",
    span: 24,
    width: "150px",
    headers: [
      {
        key: "fbOrgId__dsp",
        title: "部门名称",
        disabled: true,
        inputType: "input"
      },
      {
        key: "opinion",
        title: "部门意见",
        disabled: true,
        placeHolder: " "
      }
    ],
    tableItems: {
      fbOrgId__dsp: "",
      fbOrgId: "",
      opinion: ""
    }
  }
];
const suggestConsultationDialogFormBtns = [
  // {
  //   flag: "publishTask",
  //   label: "发布为年度考核任务",
  //   styleType: "primary"
  // },
  // {
  //   flag: "editSave",
  //   label: "导出",
  //   styleType: "primary"
  // },
  {
    flag: "cancle",
    label: "退出",
    styleType: ""
  }
];
export {
  suggestConsultationDialogFormItems,
  suggestConsultationDialogFormBtns
};
