let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      postUrl: "reportServer",
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
      width: "120px"
    },
    {
      type: "select",
      label: "是否包含下级",
      name: "isHasChild",
      filterable: true,
      data: [{ label: "是", value: "Y" }, { label: "否", value: "N" }],
      span: 8,
      width: "120px"
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
      width: "120px"
    },
    {
      type: "select",
      label: "仓房",
      name: "storehouseId",
      multiple: false,
      filterable: true,
      data: [],
      span: 8,
      width: "120px"
    },
    {
      type: "select",
      label: "物资类别",
      name: "basMaterialTypeId",
      multiple: false,
      filterable: true,
      data: [],
      span: 8,
      width: "120px"
    },
    {
      type: "input",
      label: "物资名称",
      name: "basMaterialName",
      span: 8,
      width: "120px"
    }
  ];
export { searchFormBtns, searchFormItems };
