// 方案信息
const schemeFormItem = [
  {
    type: "inputHidden",
    label: "方案指标id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    title: "考核任务基本信息",
    type: "block",
    span: 24,
    name: "schemeMessage",
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
        type: "select",
        label: "市县",
        name: "district",
        span: 12,
        width: "150px",
        data: [],
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
        name: "kpiName",
        span: 24,
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
  }
];

// 分配市牵头， 市配合
const assignCityItem = [
  {
    type: "inputHidden",
    label: "已经保存过的数据",
    name: "old_manageOrg_MD",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "已经保存过的数据",
    name: "old_cooprateOrgs_CD",
    span: 24,
    width: "150px"
  },
  {
    title: "分配部门",
    type: "block",
    span: 24,
    name: "assignDepartmentMessage",
    children: [
      {
        type: "select",
        label: "牵头部门",
        name: "manageOrg_MD",
        span: 12,
        width: "150px",
        data: [],
        filterable: true
      },
      {
        type: "select",
        label: "配合部门",
        name: "cooprateOrgs_CD",
        span: 12,
        width: "150px",
        data: [],
        multiple: true,
        filterable: true
      }
    ]
  }
];

// 配合处室
const assignDepartmentCooprate = [
  {
    type: "inputHidden",
    label: "已经保存过的数据",
    name: "old_cooprateOrgs_CO",
    span: 24,
    width: "150px"
  },
  {
    title: "配合处室",
    type: "block",
    span: 24,
    name: "assignCooprateOfficeMessage",
    children: [
      {
        type: "select",
        label: "配合处室",
        name: "cooprateOrgs_CO",
        span: 12,
        width: "150px",
        data: [],
        multiple: true,
        filterable: true
      }
    ]
  }
];
// 责任处室
const assignDepartmentManage = [
  {
    type: "inputHidden",
    label: "已经保存过的数据",
    name: "old_manageOrg_MO",
    span: 24,
    width: "150px"
  },
  {
    title: "责任处室",
    type: "block",
    span: 24,
    name: "assignManageOrgOfficeMessage",
    children: [
      {
        type: "select",
        label: "责任处室",
        name: "manageOrg_MO",
        span: 12,
        width: "150px",
        data: [],
        multiple: true,
        filterable: true
      }
    ]
  }
];
// 分配按钮
const assignKpiButton = [
  {
    flag: "assignKpiSave",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/updateKpiAssign"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "退出",
    styleType: "",
    postUrl: ""
  }
];

// 自评配合部门意见
const selfCooprateMessage = [
  {
    title: "自评配合部门意见",
    type: "block",
    span: 24,
    name: "cooperateMessage",
    children: [
      {
        type: "inputTable",
        label: "配合工作情况",
        name: "coordinationList",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "cooperateOrgId__dsp",
            title: "配合部门",
            disabled: true
          },
          {
            key: "comment",
            title: "配合部门意见",
            disabled: true
          },
          {
            key: "fileName",
            title: "配合材料",
            disabled: true
          }
        ],
        tableItems: {
          cooperateOrgId__dsp: "",
          comment: "",
          fileName: ""
        }
      }
    ]
  }
];
// 自评牵头部门自评打分情况
const selfEvaluationMessage = [
  {
    title: "自评牵头部门打分情况",
    type: "block",
    span: 24,
    name: "selfMessage",
    children: [
      {
        type: "input",
        label: "部门名称",
        name: "assessedCityMOrgId__dsp",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "指标分数",
        name: "kpiScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "自评分",
        name: "self_score",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "打分依据",
        name: "self_yearwe",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "减分原因",
        name: "self_deductionReason",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "落实情况",
        name: "self_rectifyDesc",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "自评人",
        name: "self_assessBy",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "self_auditBy",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  }
];
// 部门评分
const departmentEvaluationMessage = [
  {
    type: "inputHidden",
    label: "阶段id",
    name: "department_asmShemeAssessId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "阶段id",
    name: "department_asmShemeAssessKpiId",
    span: 24,
    width: "150px"
  },
  {
    title: "部门评审",
    type: "block",
    span: 24,
    name: "departmentEvaluationMessage",
    children: [
      {
        type: "input",
        label: "指标分数",
        name: "kpiScore",
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        linkName: "score",
        type: "stepInput",
        label: "部门评分",
        name: "department_score",
        precision: 2,
        step: 0.1,
        min: 0,
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        hideItem: true,
        type: "radio",
        label: "是否减分",
        name: "department_deducted",
        span: 24,
        width: "150px",
        linkName: "deducted",
        data: [
          {
            label: "否",
            value: "N"
          },
          {
            label: "是",
            value: "Y"
          }
        ],
        disabled: true
      },
      {
        type: "date",
        label: "评审日期",
        name: "department_assessDt",
        span: 12,
        dateType: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true,
        width: "150px"
      },
      {
        type: "select",
        label: "部门名称",
        name: "department_mainOrgId",
        span: 12,
        width: "150px",
        disabled: true,
        data: []
      },
      {
        type: "input",
        label: "评分人",
        name: "department_assessBy",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "department_auditBy",
        disabled: true,
        span: 12,
        width: "150px"
      }
    ]
  }
];
// 抽查分
const spotCheckEvaluationMessage = [
  {
    type: "inputHidden",
    label: "阶段id",
    name: "spotCheck_asmShemeAssessId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "阶段id",
    name: "spotCheck_asmShemeAssessKpiId",
    span: 24,
    width: "150px"
  },
  {
    title: "抽查打分",
    type: "block",
    span: 24,
    name: "spotCheckEvaluationMessage",
    children: [
      {
        type: "input",
        label: "指标分数",
        name: "kpiScore",
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        linkName: "score",
        type: "stepInput",
        label: "抽查分",
        name: "spotCheck_score",
        precision: 2,
        step: 0.1,
        min: 0,
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        hideItem: true,
        type: "radio",
        label: "是否减分",
        name: "spotCheck_deducted",
        span: 24,
        width: "150px",
        linkName: "deducted",
        data: [
          {
            label: "否",
            value: "N"
          },
          {
            label: "是",
            value: "Y"
          }
        ],
        disabled: true
      },
      {
        type: "date",
        label: "抽查日期",
        name: "spotCheck_assessDt",
        span: 12,
        dateType: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "评分人",
        name: "spotCheck_assessBy",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "spotCheck_auditBy",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  }
];
export {
  schemeFormItem,
  assignCityItem,
  assignKpiButton,
  assignDepartmentCooprate,
  assignDepartmentManage,
  selfCooprateMessage,
  selfEvaluationMessage,
  departmentEvaluationMessage,
  spotCheckEvaluationMessage
};
