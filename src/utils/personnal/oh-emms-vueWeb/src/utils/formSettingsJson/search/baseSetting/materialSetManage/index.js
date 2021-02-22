let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      styleType: "primary",
      postUrl: "getMaterialList"
    },
    {
      flag: "clear",
      size: "",
      icon: "",
      label: "清除",
      styleType: "primary",
      postUrl: "getMaterialList"
    }
  ],
  searchFormItems = [
    // {
    //   type: "select",
    //   label: "物资类别",
    //   name: "emmsBasMaterialTypeId",
    //   span: 8,
    //   width: "100px",
    //   data: []
    // },
    // {
    //   type: "select",
    //   label: "包含下级",
    //   name: "isHasChild",
    //   span: 8,
    //   width: "100px",
    //   data: [
    //     {
    //       value: "Y",
    //       label: "是"
    //     },
    //     {
    //       value: "N",
    //       label: "否"
    //     }
    //   ]
    // },
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
      label: "物资名称",
      name: "name",
      span: 8,
      width: "100px"
    }
  ];
export { searchFormBtns, searchFormItems };
