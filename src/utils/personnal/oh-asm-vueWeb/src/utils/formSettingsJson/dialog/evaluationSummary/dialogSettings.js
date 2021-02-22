const repeatCutScoreFormItems = [
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeAssessedId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "kpiScore",
    span: 24,
    width: "150px"
  },
  {
    type: "inputNumber",
    label: "重复分",
    name: "repeatCutScore",
    span: 12,
    width: "150px"
  }
];
const repeatCutScoreFormBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/assessed/update"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
export { repeatCutScoreFormItems, repeatCutScoreFormBtns };
