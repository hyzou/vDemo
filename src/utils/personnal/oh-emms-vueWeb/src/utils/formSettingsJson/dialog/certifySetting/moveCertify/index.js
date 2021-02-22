let addButton = [
    {
      flag: "addIncome",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "add_moveCertify"
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
      flag: "updateIncome",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "update_moveCertify"
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
      name: "emmsDocMoveId",
      span: 12,
      width: "150px"
    },
    {
      type: "inputHidden",
      label: "processinstStatus",
      name: "processinstStatus",
      span: 12,
      width: "150px"
    },
    {
      type: "date",
      label: "开单时间",
      name: "created",
      span: 12,
      dateType: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      width: "150px",
      disabled: true
    },
    {
      type: "input",
      label: "移库单号",
      name: "docNo",
      span: 12,
      width: "150px",
      disabled: true
    },
    {
      type: "date",
      label: "单据日期",
      name: "businessDate",
      span: 12,
      dateType: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "150px"
    },
    {
      type: "hideSymbol",
      label: "单据日期",
      name: "spaceItem",
      span: 12,
      dateType: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "150px"
    },
    {
      type: "cascader",
      label: "移出存储单位",
      name: "outStoreOrgId",
      linkName: "outStoreOrgId",
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
      width: "150px"
    },
    {
      type: "cascader",
      label: "移入存储单位",
      name: "inStoreOrgId",
      linkName: "inStoreOrgId",
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
      width: "150px"
    },
    {
      type: "select",
      label: "移出库点",
      name: "outStorepointId",
      linkName: "outStorepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "移入库点",
      name: "inStorepointId",
      linkName: "inStorepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "150px"
    },
    // {
    //   type: "select",
    //   label: "移出仓房",
    //   name: "storepointId",
    //   linkName: "changeStorePoint",
    //   multiple: false,
    //   placeHolder: "请选择",
    //   filterable: true,
    //   data: [],
    //   span: 12,
    //   width: "150px"
    // },
    // {
    //   type: "select",
    //   label: "移入仓房",
    //   name: "storepointId",
    //   linkName: "changeStorePoint",
    //   multiple: false,
    //   placeHolder: "请选择",
    //   filterable: true,
    //   data: [],
    //   span: 12,
    //   width: "150px"
    // },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "150px",
      placeholder: ""
    }
  ];
export { addButton, editButton, contentItems };
