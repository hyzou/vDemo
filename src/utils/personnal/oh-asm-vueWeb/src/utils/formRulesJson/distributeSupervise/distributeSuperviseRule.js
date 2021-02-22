export default {
  manageOrg_MD: [
    { required: true, message: "请选择牵头部门", trigger: "change" }
  ],
  // cooprateOrgs_CD: [
  //   { required: true, message: "请选择配合部门", trigger: "change" }
  // ],
  asmSchemeId: [{ required: true, message: "请选择方案", trigger: "change" }],
  assessedOrgids: [{ required: true, message: "请选择机构", trigger: "change" }],
  // 抽查
  startDt: [
    {
      required: true,
      message: "请选择抽查开始时间",
      trigger: "change"
    }
  ],
  endDt: [
    {
      required: true,
      message: "请选择抽查结束时间",
      trigger: "change"
    }
  ],
  weight: [
    { required: true, message: "请输入抽查权重比例", trigger: "change" }
  ],
  asmKpiIds: [{ required: true, message: "请选择抽查指标", trigger: "change" }],
  acceptScore: [{ required: true, message: "请选择打分规则", trigger: "change" }]
};
