const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getAllStandList_supervision"
  }
];
const searchFormItems = {
  normal: [
    {
      type: "select",
      label: "方案名称",
      width: "120px",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      name: "asmSchemeId",
      data: [],
      span: 8
    },
    {
      type: "input",
      label: "年度考核任务",
      width: "120px",
      name: "kpiNamePatch",
      span: 8
    },
    {
      type: "input",
      label: "评分标准",
      width: "120px",
      name: "criteria",
      span: 8
    },
    {
      type: "select",
      label: "被考核市县",
      width: "120px",
      name: "assessedOrgId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      hideItem: false,
      data: [],
      span: 8
    },
    {
      type: "select",
      label: "被考核牵头部门",
      width: "120px",
      name: "manageOrgId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      hideItem: false,
      data: [],
      span: 8
    },
    {
      type: "select",
      label: "任务完成情况",
      width: "120px",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      name: "condition_finished",
      data: [
        {
          label: "已完成",
          value: true
        },
        {
          label: "未完成",
          value: false
        }
      ],
      span: 8
    }
    // {
    //   type: "date",
    //   label: "填报日期",
    //   name: "reportDate",
    //   span: 8,
    //   dateType: "daterange",
    //   dateRangeSeparator: "至",
    //   dateStartPlaceholder: "开始日期",
    //   dateEndPlaceholder: "结束日期",
    //   format: "yyyy-MM-dd",
    //   valueFormat: "yyyy-MM-dd"
    // }
  ],
  special: [
    {
      type: "select",
      label: "方案名称",
      width: "120px",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      name: "asmSchemeId",
      data: [],
      span: 8
    },
    {
      type: "input",
      label: "年度考核任务",
      width: "120px",
      name: "kpiNamePatch",
      span: 8
    },
    {
      type: "input",
      label: "评分标准",
      width: "120px",
      name: "criteria",
      span: 8
    },
    {
      type: "select",
      label: "被考核市县",
      width: "120px",
      name: "assessedOrgId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      hideItem: false,
      data: [],
      span: 8
    },
    {
      type: "select",
      label: "被考核牵头部门",
      width: "120px",
      name: "manageOrgId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      hideItem: false,
      data: [],
      span: 8
    },
    {
      type: "select",
      label: "任务完成情况",
      width: "120px",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      name: "condition_finished",
      data: [
        {
          label: "已完成",
          value: true
        },
        {
          label: "未完成",
          value: false
        }
      ],
      span: 8
    }
    // {
    //   type: "date",
    //   label: "填报日期",
    //   name: "reportDate",
    //   span: 8,
    //   dateType: "daterange",
    //   dateRangeSeparator: "至",
    //   dateStartPlaceholder: "开始日期",
    //   dateEndPlaceholder: "结束日期",
    //   format: "yyyy-MM-dd",
    //   valueFormat: "yyyy-MM-dd"
    // }
  ]
};
export { searchFormBtns, searchFormItems };
