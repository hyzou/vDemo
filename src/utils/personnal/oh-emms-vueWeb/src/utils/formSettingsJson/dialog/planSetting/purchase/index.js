let addPurchaseButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/plan/purchase/insert"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editPurchaseButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/plan/purchase/updateData"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  purchaseContentItem = [
    {
      type: "inputHidden",
      label: "id",
      name: "emmsDocInoutId",
      span: 12,
      width: "150px"
    },
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 8,
      width: "100px",
      disabled: true
    },
    {
      type: "date",
      label: "年份",
      name: "year",
      span: 8,
      dateType: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      width: "100px"
    },
    {
      type: "date",
      label: "开单时间",
      name: "created",
      span: 8,
      dateType: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "timestamp",
      width: "100px",
      disabled: true
    },
    {
      type: "radio",
      label: "来源",
      name: "sourceType",
      linkName: "sourceChange",
      data: [
        { label: "储备购置", value: "PP" },
        { label: "应急购置", value: "NON" },
        { label: "补充购置", value: "SP" }
      ],
      span: 24,
      width: "100px"
    },
    {
      type: "select",
      label: "储备计划",
      name: "sourceId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "100px",
      hideItem: false
    },
    // {
    //   type: "input",
    //   label: "来源单号",
    //   hideItem: true,
    //   name: "sourceId",
    //   span: 12,
    //   width: "100px"
    // },
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
      width: "100px"
    },
    {
      type: "select",
      label: "库点",
      name: "storepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "100px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "100px",
      placeholder: ""
    }
  ];
export { addPurchaseButton, editPurchaseButton, purchaseContentItem };
