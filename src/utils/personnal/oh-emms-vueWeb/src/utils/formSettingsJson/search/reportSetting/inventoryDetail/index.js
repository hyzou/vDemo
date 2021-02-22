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
      type: "input",
      label: "物资编码",
      name: "code",
      span: 8,
      width: "100px"
    },
    {
      type: "input",
      label: "批次号",
      name: "batchNo",
      span: 8,
      width: "120px"
    },
    {
      type: "input",
      label: "物资名称",
      name: "emmsBasMaterialName",
      span: 8,
      width: "120px"
    },
    {
      type: "date",
      label: "年份",
      name: "inYear",
      span: 8,
      dateType: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      width: "100px"
    },
    {
      type: "select",
      label: "是否可回收物资",
      name: "isRecycled",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "是",
          value: "Y"
        },
        {
          label: "否",
          value: "N"
        }
      ],
      span: 8,
      width: "120px"
    }
  ];
export { searchFormBtns, searchFormItems };
