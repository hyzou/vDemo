let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getPurchaseList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getPurchaseList"
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
    //   name: "isHasChild",
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
      label: "库点",
      name: "storepointId",
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
      type: "date",
      label: "年份",
      name: "year",
      span: 8,
      dateType: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      width: "100px"
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
      postUrl: "getReservePlanMaterial"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getReservePlanMaterial"
    }
  ],
  materialSearchFormItems = [
    {
      type: "elTreeSelect",
      label: "物资类别",
      name: "materialTypeId",
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
      width: "100px"
    }
  ];
export {
  searchFormBtns,
  searchFormItems,
  materialSearchFormBtns,
  materialSearchFormItems
};
