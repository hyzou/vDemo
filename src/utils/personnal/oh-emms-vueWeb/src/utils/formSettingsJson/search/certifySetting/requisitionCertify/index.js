let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      postUrl: "getRequisitionCertifyList",
      styleType: "primary"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getRequisitionCertifyList"
    }
  ],
  searchFormItems = [
    {
      type: "cascader",
      label: "组织机构",
      name: "storeOrgId",
      linkName: "changeOrg",
      data: [],
      props: {
        children: "children",
        disabled: "disabled",
        checkStrictly: true,
        label: "text",
        value: "id",
        multiple: false
      },
      showAllLevels: false,
      filterable: true,
      disabled: false,
      clearable: true,
      debounce: 300,
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "调出库点",
      name: "storepointId",
      multiple: false,
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    },
    {
      type: "input",
      label: "送达地点",
      name: "destination",
      span: 8,
      width: "100px"
    },
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 8,
      width: "100px"
    },
    {
      type: "date",
      label: "单据时间",
      name: "businessDate",
      span: 8,
      dateType: "daterange",
      dateRangeSeparator: "至",
      dateStartPlaceholder: "开始日期",
      dateEndPlaceholder: "结束日期",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "100px"
    },
    {
      type: "select",
      label: "单据状态",
      name: "processinstStatus",
      multiple: false,
      filterable: false,
      data: [],
      span: 8,
      width: "100px"
    }
  ],
  materialSearchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getMaterialSummary"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getMaterialSummary"
    }
  ],
  materialSearchFormItems = [
    // {
    //   type: "select",
    //   label: "仓房",
    //   name: "storehouseId",
    //   multiple: false,
    //   filterable: true,
    //   data: [],
    //   span: 8,
    //   width: "50px"
    // },
    {
      type: "elTreeSelect",
      label: "物资类别",
      name: "emmsBasMaterialTypeId",
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
      name: "materialName",
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
