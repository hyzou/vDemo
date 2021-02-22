const scoreCheckFormItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "assessmentId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "数据id",
    name: "targetId",
    span: 24,
    width: "150px"
  },
  {
    title: "自评配合部门意见",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "部门名称",
        name: "cityCoordinationDepartment",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "意见",
        name: "opinion",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "材料",
        name: "material",
        span: 24,
        disabled: true,
        width: "150px"
      }
    ]
  },
  {
    title: "自评牵头部门打分情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "部门名称",
        name: "cityLeadDepartment",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "指标分数",
        name: "targetScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "自评分",
        name: "selfScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "打分依据",
        name: "yearwe",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "减分原因",
        name: "reason",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "落实情况",
        name: "measures",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "自评人",
        name: "selfName",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "checkName",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  },
  {
    title: "考核牵头部门打分情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "部门名称",
        name: "provinceLeadDepartment",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "部门打分",
        name: "departmentScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "评分人",
        name: "departmentName",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "departmentCheckName",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  },
  {
    title: "抽查组打分情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "抽查打分",
        name: "spotCheckScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "评分人",
        name: "spotCheckName",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "spotCheckExamineName",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  },
  {
    title: "考核办评审打分情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "select",
        label: "采用打分规则",
        name: "acceptScore",
        data: [
          {
            label: "部门评分",
            value: "1"
          },
          {
            label: "抽查评分",
            value: "2"
          }
        ],
        span: 12,
        width: "150px"
      }
    ]
  }
];
const scoreCheckFormBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const lookSelfEvalutionFormItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "assessmentId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "数据id",
    name: "targetId",
    span: 24,
    width: "150px"
  },
  {
    title: "自评配合部门意见",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "部门名称",
        name: "cityCoordinationDepartment",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "意见",
        name: "opinion",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "材料",
        name: "material",
        span: 24,
        disabled: true,
        width: "150px"
      }
    ]
  },
  {
    title: "自评牵头部门打分情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "部门名称",
        name: "cityLeadDepartment",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "指标分数",
        name: "targetScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "自评分",
        name: "selfScore",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "打分依据",
        name: "yearwe",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "减分原因",
        name: "reason",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "落实情况",
        name: "measures",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "自评人",
        name: "selfName",
        span: 12,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "审核人",
        name: "checkName",
        span: 12,
        disabled: true,
        width: "150px"
      }
    ]
  }
];
const evaluationSubmitBtn = [
  {
    flag: "submit",
    label: "提交",
    styleType: "primary",
    postUrl: "_data/shemeAssess/shemeAssess/reportShemeAssess"
  },
  {
    flag: "cancel",
    label: "取消",
    styleType: ""
  }
];
const submitConfirmItems = [
  {
    title: "提交内容",
    type: "block",
    span: 24,
    children: [
      {
        type: "input",
        label: "方案",
        name: "schemeName",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "textarea",
        label: "被考核市县",
        name: "assessOrgName",
        span: 24,
        disabled: true,
        width: "150px"
      },
      {
        type: "input",
        label: "注意事项",
        name: "warningMsg",
        span: 24,
        disabled: true,
        width: "150px"
      }
    ]
  }
];
const submitConfirmBtn = [
  {
    flag: "submit",
    label: "确认",
    styleType: "primary",
    postUrl: "_data/shemeAssess/shemeAssess/reportShemeAssess"
  },
  {
    flag: "cancel",
    label: "取消",
    styleType: ""
  }
];
const submitKpiFormItems = [
  {
    type: "select",
    label: "方案",
    name: "asmSchemeId",
    // linkName: "submitScheme",
    span: 12,
    width: "150px",
    data: []
  }
];
const releaseKpiFormItems = {
  1: {
    "higher-assess": [
      {
        type: "inputHidden",
        label: "数据id",
        name: "asmSchemeId",
        span: 24,
        width: "150px"
      },
      {
        type: "select",
        label: "被考核市县",
        name: "assessedOrgids",
        span: 24,
        width: "150px",
        data: [],
        multiple: true
      }
    ],
    "random-assess": [
      {
        type: "inputHidden",
        label: "数据id",
        name: "asmSchemeId",
        span: 24,
        width: "150px"
      },
      {
        type: "select",
        label: "被考核市县",
        name: "assessedOrgids",
        span: 24,
        width: "150px",
        data: [],
        multiple: true
      }
    ]
  },

  2: {
    "higher-assess": [
      {
        type: "select",
        label: "方案",
        name: "asmSchemeId",
        linkName: "submitScheme",
        span: 12,
        width: "150px",
        data: []
      },
      {
        type: "select",
        label: "被考核市县",
        name: "assessedOrgids",
        span: 24,
        width: "150px",
        data: [],
        multiple: true
      }
    ],
    "random-assess": [
      {
        type: "select",
        label: "方案",
        name: "asmSchemeId",
        linkName: "spotCheckSubmitScheme",
        span: 12,
        width: "150px",
        data: []
      },
      {
        type: "select",
        label: "被考核市县",
        name: "assessedOrgids",
        span: 24,
        width: "150px",
        data: [],
        multiple: true
      }
    ]
  }
};
export {
  scoreCheckFormItems,
  scoreCheckFormBtns,
  lookSelfEvalutionFormItems,
  evaluationSubmitBtn,
  submitConfirmItems,
  submitConfirmBtn,
  submitKpiFormItems,
  releaseKpiFormItems
};
