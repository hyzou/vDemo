const rewardFormBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/schemeAssess/reward/insert"
  },
  {
    flag: "submit",
    label: "提交",
    styleType: "primary",
    postUrl: "_data/schemeAssess/reward/insert"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const rewardFormItems = [
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeAssessRewardId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "意见状态",
    name: "status",
    span: 12,
    width: "150px"
  },
  {
    type: "select",
    label: "考核方案",
    name: "asmSchemeId",
    span: 12,
    width: "150px",
    data: [],
    linkName: "scheme"
  },
  {
    type: "select",
    label: "被考核市县",
    name: "assessedOrgId",
    linkName: "assessedOrg",
    span: 12,
    width: "150px",
    data: []
  },
  {
    type: "select",
    label: "受表彰单位",
    name: "mainOrgId",
    span: 12,
    width: "150px",
    data: []
  },
  {
    type: "select",
    label: "表彰项",
    name: "asmSchemeRewardId",
    span: 12,
    width: "150px",
    data: []
  },
  {
    type: "upload",
    label: "材料",
    name: "files",
    span: 12,
    width: "150px",
    choseBtn: "上传文件"
  },
  {
    type: "fileshowList",
    label: "材料列表",
    name: "rewardFileList",
    span: 24,
    width: "150px",
    fileSettings: {
      hidedelete: false,
      hideFileSize: true,
      hideFileTime: true
    }
  },
  {
    type: "inputNumber",
    label: "表彰分",
    name: "score",
    span: 12,
    width: "150px"
  }
];
const rewardFormApprovalBtns = [
  {
    flag: "agree",
    label: "通过",
    styleType: "primary",
    postUrl: ""
  },
  {
    flag: "disagree",
    label: "不通过",
    styleType: "primary",
    postUrl: ""
  }
];
export { rewardFormItems, rewardFormBtns, rewardFormApprovalBtns };
