const dispatchLeaderOfficeDialogItems = [
  {
    type: "inputHidden",
    label: "考核方案指标Id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "原分配牵头部门id",
    name: "assedLeaderDepId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "考核方案KPI分配表Id",
    name: "asmSchemeKpiAssignId ",
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
    title: "责任处室分配",
    type: "block",
    name: "assignLeadOffice",
    span: 24,
    children: [
      {
        type: "select",
        label: "指派处室",
        name: "officeDepartmentId",
        multiple: false,
        data: [],
        span: 12,
        width: "150px"
      }
    ]
  }
];

const dispatchLeaderOfficeDialogBtns = [
  {
    flag: "saveSubmit",
    label: "保存提交",
    styleType: "primary"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];

export { dispatchLeaderOfficeDialogItems, dispatchLeaderOfficeDialogBtns };
