let addButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/impl/recover/add"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/impl/recover/add"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/impl/recover/updateImplRecover"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/impl/recover/updateImplRecover"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  contentItems = [
    {
      type: "inputHidden",
      label: "id",
      name: "emmsImplRecoverId",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 12,
      width: "120px",
      disabled: true
    },
    {
      type: "date",
      label: "开单时间",
      name: "created",
      span: 12,
      dateType: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      width: "120px",
      disabled: true
    },
    {
      type: "cascader",
      label: "承储单位",
      name: "storeOrgId",
      linkName: "changeDialogOrg",
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
      span: 12,
      width: "120px"
    },
    {
      type: "select",
      label: "库点",
      name: "storepointId",
      linkName: "changeDialogStorePoint",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "120px"
    },
    {
      type: "select",
      label: "出库单号",
      name: "emmsDocInoutId",
      multiple: false,
      filterable: false,
      data: [],
      span: 12,
      width: "120px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "120px",
      placeholder: ""
    }
  ],
  addMaterialButton = [
    {
      flag: "import",
      size: "",
      icon: "",
      label: "导入",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ];
export { addButton, editButton, contentItems, addMaterialButton };
