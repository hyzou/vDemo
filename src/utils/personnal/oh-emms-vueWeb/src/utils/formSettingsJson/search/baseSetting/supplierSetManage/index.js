let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getSupplierList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getSupplierList"
    }
  ],
  searchFormItems = [
    {
      type: "input",
      label: "编码",
      name: "code",
      span: 6,
      width: "100px"
    },
    {
      type: "input",
      label: "名称",
      name: "name",
      span: 6,
      width: "100px"
    },
    {
      type: "select",
      label: "类型",
      name: "supplierType",
      span: 6,
      width: "100px",
      data: [
        {
          value: "1",
          label: "供应商"
        },
        {
          value: "2",
          label: "捐赠人"
        }
      ]
    },
    {
      type: "select",
      label: "状态",
      name: "disabled",
      span: 6,
      width: "100px",
      data: [
        {
          value: "N",
          label: "启用"
        },
        {
          value: "Y",
          label: "禁用"
        }
      ]
    }
  ];
export { searchFormBtns, searchFormItems };
