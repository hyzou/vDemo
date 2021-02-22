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
const departmentAssessFormBtns = [
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
const departmentAssessFormItems = [
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
    name: "department_asmShemeAssessKpiId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "考核牵头部门id",
    name: "assessManageOrgId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "是否减分",
    name: "department_deducted",
    span: 12,
    width: "150px"
  },
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
  },
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
  },
  {
    title: "责任处室打分情况",
    type: "block",
    span: 24,
    name: "departmentAssessMessage",
    children: [
      {
        type: "inputTable",
        label: "责任处室打分情况",
        name: "departmentAssessTable",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "mainOrgId__dsp",
            title: "责任处室",
            disabled: true
          },
          {
            key: "score",
            title: "分值",
            disabled: true
          },
          {
            key: "deductionReason",
            title: "减分原因",
            disabled: true
          },
          {
            key: "rectifyDesc",
            title: "落实情况",
            disabled: true
          },
          {
            key: "fileName",
            title: "打分依据",
            disabled: true
          },
          {
            key: "assessBy",
            title: "评分人",
            disabled: true
          },
          {
            key: "auditBy",
            title: "审核人",
            disabled: true
          }
        ],
        tableItems: {
          mainOrgId__dsp: "",
          score: "",
          assessBy: "",
          auditBy: ""
        }
      }
    ]
  },
  {
    title: "评分",
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
        width: "150px"
      },
      {
        type: "date",
        label: "评审日期",
        name: "department_assessDt",
        span: 12,
        dateType: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "select",
        label: "部门名称",
        name: "mainOrgId",
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
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "department_auditBy",
        span: 12,
        width: "150px"
      }
    ]
  }
];
export {
  assessdDepartmentMessage,
  departmentAssessFormBtns,
  departmentAssessFormItems
};
