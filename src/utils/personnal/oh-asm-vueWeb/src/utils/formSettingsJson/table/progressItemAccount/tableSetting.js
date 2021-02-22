const tableHeader = [
  {
    prop: "progress",
    lable: "落实进展",
    isHide: true
  },
  {
    prop: "name",
    sortForbid: true,
    lable: "年度考核任务"
  },
  {
    prop: "provinceLeadDepartment",
    sortForbid: true,
    lable: "省牵头部门"
  },
  {
    prop: "cityLeadDepartment__dsp",
    sortForbid: true,
    lable: "市牵头部门"
  },
  {
    prop: "option",
    sortForbid: true,
    lable: "操作",
    propType: "operateBtns",
    width: "150px"
  }
];
const expandContent = [
  {
    key: "finishedText",
    value: "完成情况："
  },
  {
    key: "progressVars",
    value: "数据项：",
    type: "table",
    subHeaders: [
      {
        prop: "targetName",
        label: "指标名称"
      },
      {
        prop: "targetValue",
        label: "目标值"
      },
      {
        prop: "value",
        label: "完成值"
      }
    ],
    subTableData: []
  },
  {
    key: "progress",
    value: "任务落实进展情况："
  },
  {
    key: "progressFiles",
    value: "任务落实依据：",
    type: "fileshowList",
    fileSettings: {
      hidedelete: true,
      hideFileSize: true,
      hideFileTime: true
    }
  },
  {
    key: "reportBy",
    value: "落实人："
  },
  {
    key: "progressDate",
    value: "落实日期："
  }
];
export { tableHeader, expandContent };
