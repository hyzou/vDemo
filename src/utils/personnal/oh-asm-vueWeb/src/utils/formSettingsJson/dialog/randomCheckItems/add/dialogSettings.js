const addRandomItemDialogBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "addInspectionItem_randomCheckItems"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const addRandomItemDialogItems = [
  {
    type: "input",
    label: "事项名称",
    name: "name",
    span: 24,
    width: "150px"
  },
  {
    type: "stepInput",
    label: "事项编号",
    controls: "false",
    precision: 0,
    step: 1,
    min: 1,
    name: "seq",
    span: 12,
    width: "150px"
  },
  {
    type: "stepInput",
    label: "检查频次(次/年)",
    controls: "false",
    precision: 0,
    step: 1,
    min: 1,
    name: "freq",
    span: 12,
    width: "150px"
  },
  {
    type: "select",
    label: "检查事项类型",
    name: "type",
    data: [
      {
        label: "双随机检查",
        value: "01"
      },
      {
        label: "责任制督查",
        value: "02"
      }
    ],
    span: 24,
    width: "150px"
  },
  {
    type: "input",
    label: "检查主体",
    name: "sponsor",
    span: 24,
    width: "150px"
  },
  // {
  //   type: "input",
  //   label: "检查项目",
  //   name: "year",
  //   span: 24,
  //   width: "150px"
  // },
  {
    type: "input",
    label: "检查方式",
    name: "mode",
    span: 24,
    width: "150px"
  },
  {
    type: "textarea",
    label: "检查依据",
    name: "basis",
    span: 24,
    width: "150px"
  },
  {
    type: "textarea",
    label: "检查内容及要求",
    name: "content",
    span: 24,
    width: "150px"
  },
  {
    type: "textarea",
    label: "备注",
    name: "note",
    span: 24,
    width: "150px"
  }
];
export { addRandomItemDialogBtns, addRandomItemDialogItems };
