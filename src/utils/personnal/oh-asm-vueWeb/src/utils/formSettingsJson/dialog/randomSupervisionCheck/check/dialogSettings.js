const checkRandomItemDialogBtns = [
  {
    flag: "print",
    label: "打印",
    styleType: "primary",
    postUrl: ""
  }
];
const checkRandomItemDialogItems = [
  {
    type: "input",
    label: "方案名称",
    name: "name",
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "date",
    label: "年度",
    name: "year",
    span: 12,
    disabled: true,
    valueFormat: "yyyy",
    format: "yyyy",
    width: "150px",
    dateType: "year"
  },
  {
    type: "date",
    label: "开始时间",
    name: "startDt",
    span: 12,
    disabled: true,
    // valueFormat: "yyyy",
    // format: "yyyy",
    width: "150px",
    dateType: "date"
  },
  {
    type: "date",
    label: "结束时间",
    name: "endDt",
    span: 12,
    disabled: true,
    // valueFormat: "yyyy",
    // format: "yyyy",
    width: "150px",
    dateType: "date"
  },
  {
    type: "select",
    label: "检查事项",
    name: "chkDefItemId",
    data: [],
    span: 12,
    disabled: true,
    width: "150px"
  },
  {
    type: "select",
    label: "组长",
    name: "groupLeader",
    span: 12,
    disabled: true,
    data: [],
    width: "150px"
  },
  {
    type: "select",
    label: "副组长",
    name: "deputyGroupLeader",
    span: 12,
    disabled: true,
    data: [],
    width: "150px"
  },
  {
    type: "select",
    label: "检查组成员",
    name: "groupMembers",
    multiple: true,
    span: 24,
    disabled: true,
    data: [],
    width: "150px"
  },
  {
    type: "select",
    label: "检查最小范围",
    name: "scopeTo",
    span: 12,
    disabled: true,
    data: [],
    width: "150px"
  },
  {
    type: "stepInput",
    label: "行政市个数",
    name: "cityNum",
    span: 12,
    disabled: true,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "stepInput",
    label: "区/县个数",
    hideItem: false,
    name: "countyNum",
    span: 12,
    disabled: true,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "stepInput",
    label: "乡/镇个数",
    hideItem: false,
    name: "townNum",
    span: 12,
    disabled: true,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "stepInput",
    label: "村/社区个数",
    hideItem: false,
    name: "villageNum",
    span: 12,
    disabled: true,
    min: 0,
    step: 1,
    precision: 0,
    width: "150px"
  },
  {
    type: "html",
    label: "检查范围(随机抽取)",
    name: "districtInfos__dsp",
    disabled: true,
    span: 24,
    width: "150px"
  },
  {
    type: "textarea",
    label: "检查总结",
    name: "summary",
    disabled: true,
    span: 24,
    width: "150px"
  }
];
export { checkRandomItemDialogBtns, checkRandomItemDialogItems };
