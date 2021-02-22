// 新增考核任务的 form
const schemeContentItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    type: "date",
    label: "年份",
    name: "year",
    valueFormat: "yyyy",
    format: "yyyy",
    span: 12,
    width: "150px",
    dateType: "year"
  },
  {
    type: "input",
    label: "方案名称",
    name: "name",
    span: 12,
    width: "150px"
  },
  {
    type: "date",
    label: "考核周期开始日期",
    name: "startDt",
    span: 12,
    dateType: "date",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    width: "150px"
  },
  {
    type: "date",
    label: "考核周期结束日期",
    name: "endDt",
    span: 12,
    dateType: "date",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    width: "150px"
  },
  {
    type: "select",
    label: "评分策略",
    name: "assessStrategy",
    linkName: "assessStrategy",
    span: 12,
    width: "150px",
    data: []
  },
  {
    type: "inputNumber",
    label: "总分",
    name: "grossScore",
    span: 12,
    width: "150px"
  },
  {
    type: "switch",
    label: "是否引用已有方案",
    name: "isQuote",
    linkName: "isQuote",
    activeValue: "1",
    activeColor: "",
    activeText: "是",
    inactiveValue: "0",
    inactiveColor: "",
    inactiveText: "否",
    span: 12,
    width: "150px"
  },
  {
    type: "input",
    label: "流程节点",
    name: "processinstStatus__dsp",
    span: 12,
    width: "150px",
    hideItem: true
  }
];
// 新增编辑 考核方案按钮
const addSchemeContentButton = [
  {
    flag: "nextStep",
    size: "small",
    icon: "",
    label: "下一步",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/addScheme"
  },
  // {
  //   flag: "save",
  //   size: "small",
  //   icon: "",
  //   label: "编辑保存",
  //   styleType: "primary",
  //   postUrl: "_data/scheme/formulate/updateScheme"
  // },
  {
    flag: "save",
    size: "small",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/addScheme"
  },
  {
    flag: "cancel",
    size: "small",
    icon: "",
    label: "退出",
    styleType: ""
  }
];
const editSchemeContentButton = [
  {
    flag: "save",
    size: "small",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/updateScheme"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "退出",
    styleType: ""
  }
];

// 指标表单组配置
const kpiContentItems = [
  {
    type: "inputHidden",
    label: "id",
    name: "asmKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmKpiIndexId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    title: "指标类目",
    type: "block",
    span: 24,
    name: "kpiIndex",
    children: [
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
      }
    ]
  },
  {
    title: "指标内容",
    type: "block",
    span: 24,
    name: "kpi",
    children: [
      // {
      //   type: "input",
      //   label: "名称",
      //   name: "name",
      //   span: 12,
      //   width: "150px"
      // },
      {
        type: "textarea",
        label: "评分标准",
        name: "criteria",
        span: 24,
        width: "150px",
        rows: 4
      },
      {
        type: "stepInput",
        label: "分值设定",
        name: "score",
        precision: 2,
        step: 0.1,
        min: 0,
        span: 12,
        width: "150px"
      },
      {
        type: "select",
        label: "是否公开",
        name: "shared",
        span: 12,
        width: "150px",
        data: [
          {
            value: "Y",
            label: "公开"
          },
          {
            value: "N",
            label: "不公开"
          }
        ]
      },
      {
        type: "inputNumber",
        label: "显示顺序",
        name: "serialNo",
        span: 12,
        width: "150px"
      },
      {
        type: "switch",
        label: "特定市分值设定",
        name: "isOpenSpecialCity",
        linkName: "isOpenSpecialCity",
        activeValue: "1",
        activeColor: "",
        activeText: "开启",
        inactiveValue: "0",
        inactiveColor: "",
        inactiveText: "关闭",
        span: 24,
        width: "150px"
      },
      {
        type: "inputTable",
        label: "特定市分值设定表",
        name: "specialCityScore",
        useType: "add",
        hideItem: true,
        span: 24,
        width: "150px",
        headers: [
          {
            key: "areaCode",
            title: "市县名称",
            inputType: "select",
            data: []
          },
          {
            key: "score",
            title: "分值",
            inputType: "number",
            precision: 2,
            step: 0.1,
            min: 0
          }
        ],
        tableItems: {
          areaCode: "",
          score: ""
        }
      },
      {
        type: "select",
        label: "已有数据项",
        name: "allTargetParams",
        linkName: "allTargetParams",
        span: 12,
        width: "150px",
        data: [],
        multiple: true,
        filterable: true
      },
      {
        type: "inputTable",
        label: "",
        name: "allTargetParamsList",
        useType: "add",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "name",
            title: "名称"
          },
          {
            key: "unit",
            title: "单位"
          }
        ],
        tableItems: {
          name: "",
          unit: ""
        }
      },
      {
        type: "inputTable",
        label: "新增数据项",
        name: "targetParams",
        useType: "add",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "name",
            title: "名称"
          },
          {
            key: "unit",
            title: "单位"
          }
        ],
        tableItems: {
          name: "",
          unit: ""
        }
      },
      {
        type: "select",
        label: "牵头部门",
        name: "manageOrg",
        span: 12,
        width: "150px",
        data: [],
        filterable: true
      },
      {
        type: "select",
        label: "配合部门",
        name: "cooprateOrgs",
        span: 12,
        width: "150px",
        data: [],
        multiple: true,
        filterable: true
      }
    ]
  }
];
const schemeInsideKpiContent = [
  {
    type: "inputHidden",
    label: "id",
    name: "asmKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmKpiIndexId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  // {
  //   type: "input",
  //   label: "名称",
  //   name: "name",
  //   span: 12,
  //   width: "150px"
  // },
  {
    type: "textarea",
    label: "评分标准",
    name: "criteria",
    span: 24,
    width: "150px",
    rows: 4
  },
  {
    type: "stepInput",
    label: "分值设定",
    name: "score",
    precision: 2,
    step: 0.1,
    min: 0,
    span: 12,
    width: "150px"
  },
  {
    type: "select",
    label: "是否公开",
    name: "shared",
    span: 12,
    width: "150px",
    data: [
      {
        value: "Y",
        label: "公开"
      },
      {
        value: "N",
        label: "不公开"
      }
    ]
  },
  {
    type: "inputNumber",
    label: "显示顺序",
    name: "serialNo",
    span: 12,
    width: "150px"
  },
  {
    type: "switch",
    label: "特定市分值设定",
    name: "isOpenSpecialCity",
    linkName: "addSchemeInsideIsOpenSpecialCity",
    activeValue: "1",
    activeColor: "",
    activeText: "开启",
    inactiveValue: "0",
    inactiveColor: "",
    inactiveText: "关闭",
    span: 24,
    width: "150px"
  },
  {
    type: "inputTable",
    label: "特定市分值设定表",
    name: "specialCityScore",
    useType: "add",
    hideItem: true,
    span: 24,
    width: "150px",
    headers: [
      {
        key: "areaCode",
        title: "市县名称",
        inputType: "select",
        data: []
      },
      {
        key: "score",
        title: "分值",
        inputType: "number",
        precision: 2,
        step: 0.1,
        min: 0
      }
    ],
    tableItems: {
      areaCode: "",
      score: ""
    }
  },
  {
    type: "select",
    label: "已有数据项",
    name: "allTargetParams",
    linkName: "addSchemeInsideAllTargetParams",
    span: 12,
    width: "150px",
    data: [],
    multiple: true,
    filterable: true
  },
  {
    type: "inputTable",
    label: "",
    name: "allTargetParamsList",
    useType: "add",
    span: 24,
    width: "150px",
    headers: [
      {
        key: "name",
        title: "名称"
      },
      {
        key: "unit",
        title: "单位"
      }
    ],
    tableItems: {
      name: "",
      unit: ""
    }
  },
  {
    type: "inputTable",
    label: "指标数据项",
    name: "targetParams",
    useType: "add",
    span: 24,
    width: "150px",
    headers: [
      {
        key: "name",
        title: "名称"
      },
      {
        key: "unit",
        title: "单位"
      }
    ],
    tableItems: {
      name: "",
      unit: ""
    }
  },
  {
    type: "select",
    label: "牵头部门",
    name: "manageOrg",
    span: 12,
    width: "150px",
    data: [],
    filterable: true
  },
  {
    type: "select",
    label: "配合部门",
    name: "cooprateOrgs",
    span: 12,
    width: "150px",
    data: [],
    multiple: true,
    filterable: true
  }
];
const addKpiItemButton = [
  {
    flag: "kpiSave",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/addKpi"
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
const editKpiItemButton = [
  {
    flag: "kpiEdit",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/updateKpi"
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
// 数据项设置
const dataSetContentItems = [
  {
    type: "inputTable",
    label: "",
    name: "targetParams",
    useType: "",
    span: 24,
    width: "0",
    headers: [],
    tableItems: {
      name: "",
      code: "",
      unit: ""
    }
  }
];
const dataSetContentButton = [
  {
    flag: "dataSetSave",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/formulate/updateKpiAllot"
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

const consultDateContentItems = [
  {
    title: "征询时间",
    type: "block",
    span: 24,
    name: "date",
    children: [
      {
        type: "date",
        label: "开始日期",
        name: "startDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "date",
        label: "结束日期",
        name: "endDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      }
    ]
  }
];
const consultDateContentButton = [
  {
    flag: "startConsulte",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/scheme/kpiconsult/startConsulte"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];
const processId = [
  {
    type: "inputHidden",
    label: "阶段名称",
    name: "name",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "方案id",
    name: "asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "流程id",
    name: "processinstId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "任务节点id",
    name: "taskId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "操作名称",
    name: "userAction",
    span: 24,
    width: "150px"
  }
];
const selfEvaluationContentItems = [
  {
    type: "inputHidden",
    label: "阶段id",
    name: "self_asmShemeAssessPhaseId",
    span: 24,
    width: "150px"
  },
  {
    title: "自评计划",
    type: "block",
    span: 24,
    name: "selfEvaluationMessage",
    children: [
      {
        type: "date",
        label: "开始日期",
        name: "selfStartDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "date",
        label: "结束日期",
        name: "selfEndDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      }
      // {
      //   type: "date",
      //   label: "配合工作结束日期",
      //   name: "selfCooperateEndDate",
      //   span: 12,
      //   dateType: "date",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   width: "150px"
      // }
      // {
      //   type: "stepInput",
      //   label: "权重(%)",
      //   name: "selfWeight",
      //   step: 1,
      //   min: 0,
      //   span: 12,
      //   width: "150px"
      // }
    ]
  }
];
const departmentEvaluationContentItems = [
  {
    type: "inputHidden",
    label: "阶段id",
    name: "department_asmShemeAssessPhaseId",
    span: 24,
    width: "150px"
  },
  {
    title: "部门评审计划",
    type: "block",
    span: 24,
    name: "departmentEvaluationMessage",
    children: [
      {
        type: "date",
        label: "开始日期",
        name: "departmentStartDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "date",
        label: "结束日期",
        name: "departmentEndDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "stepInput",
        label: "权重(%)",
        name: "departmentWeight",
        step: 1,
        min: 0,
        span: 12,
        width: "150px"
      }
    ]
  }
];
const schemePlanButton = [
  {
    flag: "schemePlan",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/schemePhase/batchAddPhase"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];
const editSchemePlanButton = [
  {
    flag: "schemePlan",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/schemePhase/batchUpdatePhase"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];
const evaluationContentButton = [
  {
    flag: "startEvaluation",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/schemePhase/addPhaseFlow"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];
const spotCheckContentItems = [
  {
    type: "inputHidden",
    label: "阶段id",
    name: "spotCheck_asmShemeAssessPhaseId",
    span: 24,
    width: "150px"
  },
  {
    title: "抽查组设定",
    type: "block",
    span: 24,
    name: "spotCheckGroupMessage",
    children: [
      {
        type: "date",
        label: "开始日期",
        name: "spotCheckStartDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "date",
        label: "结束日期",
        name: "spotCheckEndDate",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "stepInput",
        label: "权重(%)",
        name: "spotCheckWeight",
        step: 1,
        min: 0,
        span: 12,
        width: "150px"
      },
      {
        type: "select",
        label: "指标",
        name: "asmKpiIds",
        multiple: true,
        filterable: true,
        span: 24,
        width: "150px",
        data: []
      },
      {
        type: "inputTable",
        label: "抽查组",
        name: "updatedPhaseAcls",
        useType: "add",
        linkName: "updatedPhaseAcls",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "leader",
            title: "抽查组长",
            inputType: "select"
          },
          {
            key: "members",
            title: "抽查组员",
            inputType: "select",
            multiple: true
          },
          {
            key: "assessedOrgs",
            title: "抽查对象",
            inputType: "select",
            multiple: true
          },
          {
            key: "attention",
            title: "重点事项"
          },
          {
            key: "focus",
            title: "注意事项"
          }
        ],
        tableItems: {
          leader: [],
          members: [],
          assessedOrgs: [],
          attention: "",
          focus: ""
        }
      }
    ]
  }
];
const spotCheckContentButton = [
  {
    flag: "startSpotCheck",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/schemePhase/addAssessRandomPhase"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];

/**
 *  查看方案详情
 */
// 方案信息
const schemeMessageItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "asmSchemeId",
    span: 24,
    width: "150px"
  },
  {
    title: "方案",
    type: "block",
    span: 24,
    name: "schemeMessage",
    children: [
      {
        type: "date",
        label: "年份",
        name: "year",
        valueFormat: "yyyy",
        format: "yyyy",
        span: 12,
        width: "150px",
        dateType: "year"
      },
      {
        type: "input",
        label: "方案名称",
        name: "name",
        span: 12,
        width: "150px"
      },
      {
        type: "date",
        label: "考核周期开始日期",
        name: "startDt",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "date",
        label: "考核周期结束日期",
        name: "endDt",
        span: 12,
        dateType: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "select",
        label: "评分策略",
        name: "assessStrategy",
        // linkName: "assessStrategy",
        span: 12,
        width: "150px",
        data: []
      },
      {
        type: "input",
        label: "总分",
        name: "grossScore",
        span: 12,
        width: "150px"
      },
      {
        type: "switch",
        label: "是否引用已有方案",
        name: "isQuote",
        linkName: "isQuote",
        activeValue: "1",
        activeColor: "",
        activeText: "是",
        inactiveValue: "0",
        inactiveColor: "",
        inactiveText: "否",
        span: 12,
        width: "150px"
      },
      {
        type: "input",
        label: "流程节点",
        name: "processinstStatus__dsp",
        span: 12,
        width: "150px",
        hideItem: true
      }
    ]
  }
];
// 指标征询
const consulteMessageItems = [
  {
    title: "指标征询",
    type: "block",
    span: 24,
    name: "consulteMessage",
    children: [
      {
        type: "inputTable",
        label: "指标征询时间",
        name: "consultePhases",
        span: 24,
        width: "150px",
        headers: [
          // {
          //   key: "name",
          //   title: "名称",
          //   disabled: true,
          //   inputType: "input"
          // },
          {
            key: "startDate",
            title: "开始时间",
            disabled: true,
            inputType: "input"
          },
          {
            key: "endDate",
            title: "结束时间",
            disabled: true,
            inputType: "input"
          }
        ],
        tableItems: {
          // name: "",
          startDate: "",
          endDate: ""
        }
      }
    ]
  }
];
// 最终得分
const schemeTotalScore = [
  {
    title: "得分",
    type: "block",
    span: 24,
    name: "totalScore",
    children: [
      {
        type: "inputTable",
        label: "各被考核办得分",
        name: "assessedInfo",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "assessedOrgId__dsp",
            title: "被考核办",
            disabled: true,
            inputType: "input"
          },
          {
            key: "totalScore",
            title: "得分",
            disabled: true,
            inputType: "input",
            placeHolder: " "
          }
        ],
        tableItems: {
          assessedOrgId_dsp: "",
          totalScore: ""
        }
      }
    ]
  }
];

const editPhasesButton = [
  {
    flag: "editPhases",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "_data/shemeAssess/schemePhase/updatePhase"
  },
  {
    flag: "cancel",
    size: "",
    icon: "",
    label: "取消",
    styleType: "",
    postUrl: ""
  }
];

const dataItems = [
  {
    type: "inputHidden",
    label: "类型",
    name: "type",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "类目id",
    name: "asmKpiIndexId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "指标id",
    name: "asmKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputTable",
    label: "",
    name: "targetParams",
    useType: "add",
    span: 24,
    width: "0",
    headers: [
      {
        key: "name",
        title: "名称"
      },
      {
        key: "unit",
        title: "单位"
      }
    ],
    tableItems: {
      name: "",
      unit: ""
    }
  }
];
const addDataItemButton = [
  {
    flag: "addDataItems",
    size: "",
    icon: "",
    label: "保存",
    styleType: "primary",
    postUrl: "/_data/base/kpiIndex/addVars"
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
export {
  schemeContentItems,
  addSchemeContentButton,
  editSchemeContentButton,
  kpiContentItems,
  schemeInsideKpiContent,
  addKpiItemButton,
  editKpiItemButton,
  dataSetContentItems,
  dataSetContentButton,
  processId,
  consultDateContentItems,
  consultDateContentButton,
  selfEvaluationContentItems,
  departmentEvaluationContentItems,
  schemePlanButton,
  editSchemePlanButton,
  evaluationContentButton,
  spotCheckContentItems,
  spotCheckContentButton,
  editPhasesButton,
  schemeMessageItems,
  consulteMessageItems,
  schemeTotalScore,
  dataItems,
  addDataItemButton
};
