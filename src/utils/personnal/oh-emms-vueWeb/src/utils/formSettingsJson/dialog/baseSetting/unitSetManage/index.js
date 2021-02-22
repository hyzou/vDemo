let addUnitButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/base/unit/addUnit"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editUnitButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/base/unit/updateUnit"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  unitContentItems = [
    {
      type: "inputHidden",
      label: "id",
      name: "emmsBasUnitId",
      span: 12,
      width: "70px"
    },
    {
      type: "input",
      label: "编码",
      name: "code",
      span: 12,
      width: "70px",
      disabled: true
    },
    {
      type: "input",
      label: "名称",
      name: "name",
      span: 12,
      width: "70px"
    },
    {
      type: "select",
      label: "状态",
      name: "disabled",
      placeHolder: "请选择",
      data: [
        {
          label: "启用",
          value: "N"
        },
        {
          label: "禁用",
          value: "Y"
        }
      ],
      span: 12,
      width: "70px"
    }
  ];
export { addUnitButton, editUnitButton, unitContentItems };
