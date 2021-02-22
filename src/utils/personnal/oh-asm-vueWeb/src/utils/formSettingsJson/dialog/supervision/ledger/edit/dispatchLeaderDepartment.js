const dispatchLeaderDialogItems = [
  {
    type: "inputHidden",
    label: "考核方案指标Id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "考核方案KPI分配表Id",
    name: "asmSchemeKpiAssignId",
    span: 24,
    width: "150px"
  },
  {
    title: "年度考核任务基本信息",
    type: "block",
    span: 24,
    name: "spotCheckBase",
    children: [
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
        name: "assessedOrgId__dsp",
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        type: "elTree",
        label: "指标类目",
        name: "kpiIndextree",
        span: 24,
        disabled: true,
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
        name: "name",
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        type: "input",
        label: "指标分值",
        name: "score",
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        type: "textarea",
        label: "评分标准",
        name: "criteria",
        span: 24,
        width: "150px",
        rows: 4,
        disabled: true
      }
    ]
  },
  {
    title: "牵头部门分配",
    type: "block",
    span: 24,
    name: "assignLeadDep",
    children: [
      {
        type: "select",
        label: "牵头部门",
        name: "cityLeadDepartmentId",
        multiple: false,
        data: [],
        span: 12,
        width: "150px"
      },
      {
        type: "select",
        label: "配合部门",
        name: "cityCorpDepartmentId",
        multiple: true,
        data: [],
        span: 12,
        width: "150px"
      }
    ]
  }
];
const dispatchLeaderDialogBtns = [
  {
    flag: "saveLeader",
    label: "保存",
    styleType: "primary",
    postUrl: "dispatchKpiDistribution_supervision"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
export { dispatchLeaderDialogItems, dispatchLeaderDialogBtns };
