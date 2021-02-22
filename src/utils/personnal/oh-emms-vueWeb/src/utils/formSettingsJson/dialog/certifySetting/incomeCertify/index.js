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
      label: "入库单号",
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
      type: "radio",
      label: "来源",
      hideItem: false,
      name: "sourceType",
      linkName: "dialogSourceType",
      data: [],
      span: 24,
      width: "150px"
    },
    {
      type: "hideSymbol",
      label: "",
      hideItem: true,
      name: "hideNull",
      span: 12,
      width: "150px"
    },
    {
      type: "cascader",
      label: "承储单位",
      name: "storeOrgId",
      linkName: "changeStoreOrg",
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
      label: "库点",
      name: "storepointId",
      linkName: "changeStorePoint",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      disabled: false,
      data: [],
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "来源单号",
      hideItem: true,
      name: "sourceId",
      linkName: "dialogSourceId",
      data: [],
      clearable: true,
      filterable: true,
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "供应商/捐赠人",
      name: "emmsBasSupplierId",
      data: [],
      filterable: true,
      clearable: true,
      span: 12,
      width: "150px"
    },
    {
      type: "input",
      label: "入库作业批次号",
      name: "batchNo",
      span: 12,
      width: "150px",
      placeholder: ""
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
