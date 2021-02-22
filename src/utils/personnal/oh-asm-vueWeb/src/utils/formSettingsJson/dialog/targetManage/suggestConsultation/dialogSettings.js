const suggestConsultationDialogFormItems = [
  {
    type: "inputHidden",
    label: "方案指标id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "本次征询的id",
    name: "asmSchemeConsulteId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "谁填写意见的id",
    name: "asmSchemeConsulteFbId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "反馈意见的机构ID",
    name: "fbOrgId",
    span: 24,
    width: "150px"
  },
  {
    type: "input",
    label: "期号",
    name: "issueNo",
    span: 12,
    width: "150px",
    disabled: true
  },
  // {
  //   type: "input",
  //   label: "市县",
  //   name: "assessOrgId__dsp",
  //   span: 12,
  //   width: "150px",
  //   disabled: true
  // },
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
    type: "textarea",
    label: "征询意见",
    name: "opinion",
    span: 24,
    width: "150px",
    rows: 3
  }
];
const suggestConsultationDialogFormBtns = [
  {
    flag: "submit",
    label: "提交至考核办",
    styleType: "primary",
    postUrl: "_data/scheme/kpiconsult/submitConsulteOption"
  },
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/kpiconsult/updateFeedBacks"
  },
  {
    flag: "cancle",
    label: "关闭",
    styleType: ""
  }
];
export {
  suggestConsultationDialogFormItems,
  suggestConsultationDialogFormBtns
};
