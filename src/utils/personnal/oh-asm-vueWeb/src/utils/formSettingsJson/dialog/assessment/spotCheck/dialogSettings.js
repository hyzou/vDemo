const assessdDepartmentMessage = [
  {
    title: "被考核部门",
    type: "block",
    span: 24,
    name: "assignDepartmentMessage",
    children: [
      {
        type: "input",
        label: "牵头部门",
        name: "assessedCityMOrgId__dsp",
        span: 12,
        width: "150px",
        disabled: true
      },
      {
        type: "input",
        label: "配合部门",
        name: "assessedCityCOrgId__dsp",
        span: 12,
        width: "150px",
        disabled: true
      }
    ]
  }
];
const spotCheckAssessFormBtns = [
  {
    flag: "departmentAssess",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/kpi/addAssessKpi"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const spotCheckAssessFormItems = [
  {
    type: "inputHidden",
    label: "方案流程ID",
    name: "asmShemeAssessId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "部门评分id",
    name: "spotCheck_asmShemeAssessKpiId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "打分机构",
    name: "mainOrgId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "是否减分",
    name: "spotCheck_deducted",
    span: 24,
    width: "150px"
  },
  {
    title: "自评-配合部门意见",
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
  },
  {
    title: "自评-牵头部门自评情况",
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
  },
  {
    title: "部门评审情况",
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
        label: "部门打分",
        name: "department_score",
        precision: 2,
        step: 0.1,
        min: 0,
        span: 12,
        width: "150px",
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
        name: "assessManageOrg_dsp",
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
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
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
        width: "150px"
      },
      {
        type: "input",
        label: "评分人",
        name: "spotCheck_assessBy",
        span: 12,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "spotCheck_auditBy",
        span: 12,
        width: "150px"
      }
    ]
  }
];
export {
  assessdDepartmentMessage,
  spotCheckAssessFormBtns,
  spotCheckAssessFormItems
};
