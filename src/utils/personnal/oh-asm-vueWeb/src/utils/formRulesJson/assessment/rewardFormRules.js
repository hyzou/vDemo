export default {
  asmSchemeId: [
    { required: true, message: "请选择考核方案", trigger: "change" }
  ],
  assessedOrgId: [
    { required: true, message: "请选择被考核市县", trigger: "change" }
  ],
  mainOrgId: [{ required: true, message: "请选择表彰单位", trigger: "change" }],
  asmSchemeRewardId: [
    { required: true, message: "请选择表彰项", trigger: "change" }
  ],
  score: [{ required: true, message: "请填写表彰分", trigger: "blur" }]
};
