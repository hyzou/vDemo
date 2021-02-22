export default {
  year: [{ required: true, message: "年度不能为空", trigger: "blur" }],
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  criteria: [{ required: true, message: "请输入评分标准", trigger: "blur" }],
  serialNo: [
    { required: true, message: "请输入显示顺序(只能输入数字)", trigger: "blur" }
  ],
  // 考核方案
  issueNo: [{ required: true, message: "请选择期号", trigger: "change" }],
  score: [{ required: true, message: "请输入分值", trigger: "change" }],
  startDt: [
    {
      required: true,
      message: "请选择考核周期开始日期",
      trigger: "change"
    }
  ],
  // 自评
  selfStartDate: [
    {
      required: true,
      message: "请选择自评开始时间",
      trigger: "change"
    }
  ],
  selfEndDate: [
    {
      required: true,
      message: "请选择自评结束时间",
      trigger: "change"
    }
  ],
  selfCooperateEndDate: [
    {
      required: true,
      message: "请选择自评配合工作结束时间",
      trigger: "change"
    }
  ],
  selfWeight: [
    { required: true, message: "请输入自评权重比例", trigger: "change" }
  ],
  // 部门评审
  departmentStartDate: [
    {
      required: true,
      message: "请选择部门评审开始时间",
      trigger: "change"
    }
  ],
  departmentEndDate: [
    {
      required: true,
      message: "请选择部门评审结束时间",
      trigger: "change"
    }
  ],
  departmentWeight: [
    { required: true, message: "请输入部门评审权重比例", trigger: "change" }
  ],
  // 抽查
  spotCheckStartDate: [
    {
      required: true,
      message: "请选择抽查开始时间",
      trigger: "change"
    }
  ],
  spotCheckEndDate: [
    {
      required: true,
      message: "请选择抽查结束时间",
      trigger: "change"
    }
  ],
  spotCheckWeight: [
    { required: true, message: "请输入抽查权重比例", trigger: "change" }
  ],
  asmKpiIds: [{ required: true, message: "请选择抽查指标", trigger: "change" }],
  assessStrategy: [
    { required: true, message: "请选择评分策略", trigger: "change" }
  ],
  grossScore: [{ required: true, message: "请输入总分", trigger: "blur" }],
  manageOrg_MD: [
    { required: true, message: "请选择牵头部门", trigger: "change" }
  ],
  manageOrg: [{ required: true, message: "请选择牵头部门", trigger: "change" }],
  weight: [{ required: true, message: "请输入权重比例", trigger: "change" }],
  startDate: [
    {
      required: true,
      message: "请选择开始日期",
      trigger: "change"
    }
  ],
  endDate: [
    {
      required: true,
      message: "请选择结束日期",
      trigger: "change"
    }
  ]
};
