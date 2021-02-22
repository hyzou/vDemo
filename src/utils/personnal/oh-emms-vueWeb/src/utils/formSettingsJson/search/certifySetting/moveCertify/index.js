let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      postUrl: "list_moveCertify",
      styleType: "primary"
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
    // {
    //   type: "select",
    //   label: "包含下级",
    //   name: "subordinate",
    //   multiple: false,
    //   placeHolder: "请选择",
    //   filterable: false,
    //   data: [
    //     {
    //       label: "是",
    //       value: "Y"
    //     },
    //     {
    //       label: "否",
    //       value: "N"
    //     }
    //   ],
    //   span: 8,
    //   width: "100px"
    // },
    {
      type: "select",
      label: "移出库点",
      name: "outStorepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "移入库点",
      name: "inStorepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
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
      type: "select",
      label: "单据状态",
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
      width: "100px"
    },
    {
      type: "date",
      label: "单据日期",
      name: "businessDate",
      span: 8,
      dateType: "daterange",
      dateRangeSeparator: "至",
      dateStartPlaceholder: "开始日期",
      dateEndPlaceholder: "结束日期",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "100px"
    }
  ],
  detailSearchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      postUrl: "getMaterialList",
      styleType: "primary"
    }
  ],
  detailSearchFormItems = [
    {
      type: "input",
      label: "物资名称",
      name: "name",
      span: 8,
      width: "80px"
    }
  ];
export {
  searchFormBtns,
  searchFormItems,
  detailSearchFormBtns,
  detailSearchFormItems
};
