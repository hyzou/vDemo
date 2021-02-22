const fillStandDialogItems = [
  {
    type: "inputHidden",
    label: "数据id",
    name: "asmSchemeKpiId",
    span: 24,
    width: "150px"
  },
  {
    type: "inputHidden",
    label: "数据id",
    name: "asmShemeImplKpiId",
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
    title: "任务进展情况",
    type: "block",
    span: 24,
    children: [
      {
        type: "select",
        label: "任务完成情况",
        name: "finished",
        multiple: false,
        data: [
          {
            label: "已完成",
            value: "Y"
          },
          {
            label: "未完成",
            value: "N"
          }
        ],
        span: 12,
        width: "150px"
      },
      {
        type: "inputTable",
        label: "数据项",
        name: "implKpiVars",
        span: 24,
        width: "150px",
        headers: [
          {
            key: "name",
            title: "指标名称",
            disabled: true,
            inputType: "input"
          },
          {
            key: "targetValue",
            title: "目标值",
            disabled: true,
            inputType: "input"
          },
          {
            key: "value",
            title: "完成值",
            inputType: "input"
          }
        ],
        tableItems: {
          name: "",
          targetValue: "",
          value: ""
        }
      },
      {
        type: "textarea",
        label: "任务落实进展情况",
        name: "progress",
        span: 24,
        width: "150px"
      },
      {
        type: "fileshowList",
        label: "已上传依据",
        name: "progressFiles",
        span: 24,
        width: "150px"
      },
      {
        type: "upload",
        label: "任务落实依据",
        name: "fbFiles",
        choseBtn: "选取文件",
        uploadBtn: "上传",
        uploadTip: "只能上传jpg/png文件，且不超过500kb",
        span: 24,
        width: "150px"
      }
    ]
  }
];
const fillStandDialogBtns = [
  {
    flag: "saveSubmit",
    label: "保存提交",
    styleType: "primary"
  },
  {
    flag: "saveStuff",
    label: "保存草稿",
    styleType: "primary"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
export { fillStandDialogItems, fillStandDialogBtns };
