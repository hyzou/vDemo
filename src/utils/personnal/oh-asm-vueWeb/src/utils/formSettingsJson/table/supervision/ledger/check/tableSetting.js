const tableHeader = [
  {
    prop: "progress",
    lable: "落实进展",
    isHide: true
  },
  {
    prop: "name",
    lable: "年度考核任务",
    sortForbid: true,
    width: "200px"
  },
  {
    prop: "criteria",
    sortForbid: true,
    lable: "评分标准"
  },
  {
    prop: "score",
    lable: "分值",
    width: "80px"
  },
  // {
  //   prop: "provinceLeadDepartment",
  //   lable: "省牵头部门"
  // },
  {
    prop: "assessedOrgId__dsp",
    sortForbid: true,
    lable: "被考核市县",
    width: "200px"
  },
  {
    prop: "cityLeadDepartment__dsp",
    sortForbid: true,
    lable: "被考核牵头部门",
    width: "200px"
  },
  {
    prop: "finished__dsp",
    sortForbid: true,
    lable: "任务完成情况",
    width: "120px"
  },
  {
    sortForbid: true,
    prop: "option",
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
  // {
  //   key: "kpiVarDistrictImplDetails",
  //   value: "数据项分解：",
  //   type: "table",
  //   subHeaders: [
  //     {
  //       prop: "targetName",
  //       label: "指标名称"
  //     },
  //     {
  //       prop: "district",
  //       label: "区域名称"
  //     },
  //     {
  //       prop: "value",
  //       label: "已累计完成值"
  //     }
  //   ],
  //   subTableData: []
  // },
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
