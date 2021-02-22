const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "getProgressList_supervision"
  }
];
const searchFormItems = {
  edit: [
    {
      type: "inputHidden",
      label:
        "控制数据权限，查看或者操作权限，默认为查看权限,即若不传参数则默认为false",
      name: "operate",
      span: 8
    },
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    },
    {
      type: "input",
      label: "填报人",
      name: "reportBy",
      span: 8,
      width: "100px"
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
    //   valueFormat: "yyyy-MM-dd",
    //   width: "100px"
    // }
  ],
  check: [
    {
      type: "inputHidden",
      label:
        "控制数据权限，查看或者操作权限，默认为查看权限,即若不传参数则默认为false",
      name: "operate",
      span: 8
    },
    {
      type: "select",
      label: "考核方案",
      name: "asmSchemeId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "填报机构",
      name: "assessedOrgId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    }
    // {
    //   type: "input",
    //   label: "填报人",
    //   name: "reportBy",
    //   span: 8,
    //   width: "100px"
    // },
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
    //   valueFormat: "yyyy-MM-dd",
    //   width: "100px"
    // }
  ]
};
export { searchFormBtns, searchFormItems };
