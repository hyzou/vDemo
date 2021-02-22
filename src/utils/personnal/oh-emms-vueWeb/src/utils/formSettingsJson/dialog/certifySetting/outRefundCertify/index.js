let addButton = [
    {
      flag: "addIncome",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "add_incomeCertify"
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
      postUrl: "update_incomeCertify"
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
      name: "emmsDocInoutId",
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
      type: "inputHidden",
      label: "sourceType",
      name: "sourceType",
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
      label: "退货单号",
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
      type: "select",
      label: "出库执行单号",
      linkName: "changesourceId",
      data: [],
      filterable: true,
      clearable: true,
      name: "sourceId",
      span: 12,
      width: "150px"
    },
    {
      type: "cascader",
      label: "承储单位",
      name: "storeOrgId",
      data: [],
      props: {
        children: "children",
        disabled: "disabled",
        checkStrictly: true,
        label: "text",
        value: "id",
        multiple: false
      },
      span: 12,
      disabled: true,
      width: "150px"
    },
    {
      type: "select",
      label: "库点",
      name: "storepointId",
      data: [],
      disabled: true,
      span: 12,
      width: "150px"
    },
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
