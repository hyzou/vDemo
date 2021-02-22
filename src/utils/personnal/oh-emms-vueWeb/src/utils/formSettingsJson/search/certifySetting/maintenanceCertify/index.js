let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      postUrl: "list_maintenanceCertify",
      styleType: "primary"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "list_maintenanceCertify"
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
      label: "库点",
      name: "storePointId",
      multiple: false,
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "单据状态",
      name: "status",
      multiple: false,
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
      label: "开单时间",
      name: "created",
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
      label: "类型",
      name: "type",
      multiple: false,
      filterable: false,
      data: [
        {
          label: "维修",
          value: "01"
        },
        {
          label: "保养",
          value: "02"
        }
      ],
      span: 8,
      width: "100px"
    }
    // {
    //   type: "input",
    //   label: "维修保养公司",
    //   name: "qaOrg",
    //   span: 8,
    //   width: "100px"
    // }
  ],
  materialSearchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getStockMaterialList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getStockMaterialList"
    }
  ],
  materialSearchFormItems = [
    {
      type: "select",
      label: "仓房",
      name: "storehouseId",
      multiple: false,
      filterable: true,
      data: [],
      span: 8,
      width: "50px"
    },
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
