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
const opinionFormBtns = [
  {
    flag: "submit",
    label: "提交",
    styleType: "primary",
    postUrl: "_data/shemeAssess/comment/addComment"
  },
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/comment/addComment"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const opinionFormItems = [
  {
    type: "inputHidden",
    label: "方案流程ID",
    name: "asmShemeAssessId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "意见ID",
    name: "asmShemeAssessCommentId",
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
    title: "配合处室意见",
    type: "block",
    span: 24,
    name: "officeOpinion",
    children: [
      {
        type: "inputTable",
        label: "处室意见",
        name: "officeOpinionList",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "cooperateOrgId__dsp",
            title: "相关处室",
            disabled: true,
            inputType: "input"
          },
          {
            key: "comment",
            title: "配合部门意见",
            disabled: true,
            inputType: "input"
          },
          {
            key: "files",
            title: "配合材料",
            disabled: true,
            inputType: "input"
          },
          {
            key: "reportBy",
            title: "意见填报人",
            disabled: true,
            inputType: "input"
          },
          {
            key: "auditBy",
            title: "意见审核人",
            disabled: true,
            inputType: "input"
          }
        ],
        tableItems: {
          cooperateOrgId__dsp: "",
          comment: "",
          files: "",
          reportBy: "",
          auditBy: ""
        }
      }
    ]
  },
  {
    title: "意见填写",
    type: "block",
    span: 24,
    name: "opinion",
    children: [
      {
        type: "textarea",
        label: "配合意见",
        name: "comment",
        span: 24,
        width: "150px",
        rows: 3
      },
      {
        type: "upload",
        label: "配合材料",
        name: "material",
        span: 12,
        width: "150px",
        choseBtn: "上传文件"
      },
      {
        type: "select",
        label: "配合单位",
        name: "cooperateOrgId",
        span: 12,
        width: "150px",
        disabled: true,
        data: []
      },
      {
        type: "input",
        label: "意见填报人",
        name: "reportBy",
        span: 12,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "auditBy",
        span: 12,
        width: "150px"
      }
    ]
  }
];
const departmentAssessDetailItems = [
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
            disabled: true,
            placeHolder: " "
          },
          {
            key: "score",
            title: "分值",
            disabled: true,
            placeHolder: " ",
            inputType: "input"
          },
          {
            key: "deductionReason",
            title: "减分原因",
            disabled: true,
            placeHolder: " "
          },
          {
            key: "rectifyDesc",
            title: "落实情况",
            disabled: true,
            placeHolder: " "
          },
          {
            key: "fileName",
            title: "打分依据",
            disabled: true,
            placeHolder: " "
          },
          {
            key: "assessBy",
            title: "评分人",
            disabled: true,
            placeHolder: " ",
            inputType: "input"
          },
          {
            key: "auditBy",
            title: "审核人",
            disabled: true,
            placeHolder: " ",
            inputType: "input"
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
        type: "input",
        label: "部门名称",
        name: "orgName",
        span: 12,
        width: "150px"
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
  opinionFormBtns,
  opinionFormItems,
  departmentAssessDetailItems
};
