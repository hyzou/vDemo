let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getMaterialTypeList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getMaterialTypeList"
    }
  ],
  searchFormItems = [
    {
      type: "input",
      label: "编码",
      name: "code",
      span: 8,
      width: "100px"
    },
    {
      type: "input",
      label: "名称",
      name: "name",
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "状态",
      name: "disabled",
      span: 8,
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
