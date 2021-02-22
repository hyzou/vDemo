let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getReservePlanList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getReservePlanList"
    }
  ],
  searchFormItems = [
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 8,
      width: "80px"
    },
    {
      type: "date",
      label: "年份",
      name: "year",
      span: 8,
      dateType: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      width: "80px"
    },
    {
      type: "select",
      label: "流程状态",
      name: "processinstStatus",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "制单",
          value: "1"
        },
        {
          label: "已完成",
          value: "99"
        }
      ],
      span: 8,
      width: "80px"
    }
  ],
  materialSearchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getMaterialDetailList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getMaterialDetailList"
    }
  ],
  materialSearchFormItems = [
    {
      type: "input",
      label: "年份",
      name: "year",
      span: 8,
      disabled: true,
      width: "80px"
    },
    {
      type: "elTreeSelect",
      label: "物资类别",
      name: "basMaterialTypeId",
      span: 8,
      width: "100px",
      data: [],
      props: {
        children: "children",
        label: "text",
        value: "id"
      }
    },
    {
      type: "input",
      label: "物资名称",
      name: "basMaterialName",
      span: 8,
      width: "80px"
    }
  ];
export {
  searchFormBtns,
  searchFormItems,
  materialSearchFormBtns,
  materialSearchFormItems
};
