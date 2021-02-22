const selfAssessFormBtns = [
  {
    flag: "selfAssess",
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
const selfAssessFormItems = [
  {
    type: "inputHidden",
    label: "方案流程ID",
    name: "asmShemeAssessId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "自评id",
    name: "asmShemeAssessKpiId",
    span: 12,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "牵头部门",
    name: "assessedCityMOrgId",
    span: 12,
    width: "150px"
  },
  {
    title: "配合工作情况",
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
            inputType: "input"
          },
          {
            key: "score",
            title: "分值",
            inputType: "input",
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
            title: "自评人",
            disabled: true,
            inputType: "input"
          },
          {
            key: "auditBy",
            title: "审核人",
            disabled: true,
            inputType: "input"
          }
        ],
        tableItems: {
          mainOrgId__dsp: "",
          score: "",
          deductionReason: "",
          rectifyDesc: "",
          assessBy: "",
          auditBy: ""
        }
      }
    ]
  },
  {
    title: "自评",
    type: "block",
    span: 24,
    name: "selfAssessMessage",
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
        label: "自评分数",
        name: "score",
        precision: 2,
        step: 0.01,
        min: 0.0,
        span: 12,
        width: "150px"
      },
      {
        type: "textarea",
        label: "落实情况",
        name: "rectifyDesc",
        span: 24,
        width: "150px",
        rows: 3
      },
      {
        type: "upload",
        label: "打分依据",
        name: "scoreBasis",
        span: 24,
        width: "150px",
        choseBtn: "上传文件"
      },
      {
        type: "fileshowList",
        label: "打分依据文件列表",
        name: "files",
        span: 24,
        width: "150px",
        fileSettings: {
          hidedelete: true,
          hideFileSize: true,
          hideFileTime: true
        }
      },
      {
        type: "radio",
        label: "引用日常监督文件",
        name: "quoteFiles",
        span: 24,
        width: "150px",
        linkName: "quoteFiles",
        data: [
          {
            label: "否",
            value: "N"
          },
          {
            label: "是",
            value: "Y"
          }
        ]
      },
      {
        type: "inputTable",
        label: "日常监督文件列表",
        name: "dailyFilesList",
        selection: true, //需要选择框
        selectedListName: "selectedList",
        hideItem: true,
        hideAddBtn: true,
        span: 24,
        width: "150px",
        headers: [
          {
            key: "fileName",
            title: "名称",
            disabled: true,
            inputType: "input"
          },
          // {
          //   key: "fileType",
          //   title: "文件类型",
          //   disabled: true,
          //   inputType: "input"
          // },
          {
            key: "sortNum",
            title: "排序",
            inputType: "number"
          }
        ],
        tableItems: {
          fileName: "",
          // fileType: "",
          sortNum: ""
        }
      },
      {
        type: "radio",
        label: "是否减分",
        name: "deducted",
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
        disabled: true,
        hideItem: true
      },
      {
        type: "textarea",
        hideItem: true,
        label: "减分原因",
        name: "deductionReason",
        span: 24,
        width: "150px"
      },
      {
        type: "date",
        label: "自评日期",
        name: "assessDt",
        span: 12,
        dateType: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: "150px"
      },
      {
        type: "select",
        label: "自评单位",
        name: "mainOrgId",
        span: 12,
        width: "150px",
        disabled: true,
        data: []
      },
      {
        type: "input",
        label: "自评人",
        name: "assessBy",
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
export { selfAssessFormBtns, selfAssessFormItems };
