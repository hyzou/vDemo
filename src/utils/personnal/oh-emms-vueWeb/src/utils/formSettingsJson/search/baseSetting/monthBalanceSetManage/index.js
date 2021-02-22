let monthBalanceFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "月结",
      postUrl: "reportServer",
      styleType: "primary"
    }
  ],
  monthBalanceFormItems = [
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
      name: "storepointId",
      linkName: "changeStorePoint",
      multiple: false,
      filterable: true,
      data: [],
      span: 8,
      width: "100px"
    },
    {
      type: "date",
      label: "月结时间",
      name: "strdate",
      span: 8,
      dateType: "month",
      format: "yyyy-MM",
      valueFormat: "yyyy-MM",
      width: "100px"
    }
  ];
export { monthBalanceFormBtns, monthBalanceFormItems };
